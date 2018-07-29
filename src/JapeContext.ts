/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-07-05 00:18:32 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-07-17 19:12:26
 */

import * as antlr4ts from "antlr4ts";
import * as path from "path";

import { JapeParserVisitor } from "./JapeParserVisitor";
import { SinglePhase, NodeRange, MultiPhase, Phase } from "./JapeSyntaxDefinitions";
import { JapeLexer } from "./parser/JapeLexer";
import { TransducerPipeline } from "./TransducerPipeline";

export class JapeContext {

    private map = new Map<string, Phase>();
    private pipelineMap = new Map<string, TransducerPipeline>();
    private pipelines: TransducerPipeline[] = [];

    constructor(private fileLoader: FileLoader) {
        
    }

    loadFromSource(key: string, source: string) {
        console.time(`Parsing ${key}`);
        const cLexer = require("./parser/JapeLexer");
        const cParser = require("./parser/JapeParser");

        // const chars = new antlr4.InputStream(source);
        const chars = new antlr4ts.ANTLRInputStream(source);
        const lexer = new cLexer.JapeLexer(chars);
        const tokens = new antlr4ts.CommonTokenStream(lexer);
        const parser = new cParser.JapeParser(tokens);
        // parser.addParseListener(new JapeParserVisitor());
        parser.buildParseTrees = true;

        try {
            const tree = parser.program();

            const visitor = new JapeParserVisitor();

            const result = visitor.visit(tree);

            this.map.set(key, result);
            
            return result;
        }
        catch (err) {
            console.error(key, err);
        }
        finally {
            console.timeEnd(`Parsing ${key}`);
        }
    }

    async loadPipelines(initialFile: string) {
        console.info(`loadPipelines`, initialFile);
        const files = [initialFile].concat(await this.fileLoader.allFiles("**/*.jape"));
        
        for (const file of files) {
            const meta = await this.fileLoader.load(file);
            if (!meta) {
                continue;
            }
            const phase = this.loadFromSource(file, meta.text);

            if (phase instanceof MultiPhase) {
                const pipeline = await this.createPipeline(initialFile, phase);
                this.pipelines.push(pipeline);
            }
        }
    }

    private async createPipeline(filename: string, phase: MultiPhase): Promise<TransducerPipeline> {
        console.info(`MultiPhase ${phase.name} found in ${filename}. Creating pipeline with ${phase.phaseNames.length} entries`);
        let pipeline = this.pipelineMap.get(filename);
        if (pipeline) {
            return pipeline;
        }

        pipeline = new TransducerPipeline(filename, phase, this);

        const dirname = path.dirname(filename);
        
        for (const phaseName of phase.phaseNames) {
            const filePath = path.join(dirname, phaseName + ".jape");
            const phase = this.map.get(filePath);
            
            // this.pipelineMap.delete(filePath);

            if (phase) {
                pipeline.addPhase(phaseName, phase);
            }
            else {
                const meta = await this.fileLoader.load(filePath);
                if (meta) {
                    const phase = this.loadFromSource(filePath, meta.text);
                    if (phase instanceof MultiPhase) {
                        const innerPipeline = await this.createPipeline(filePath, phase);
                        console.info(`Rollup inner pipeline ${innerPipeline.phase.name} into ${phaseName} entry of ${pipeline.phase.name}`);
                        pipeline.addPhase(phaseName, innerPipeline.phase);
                    }
                    else {
                        if (phase) {
                            pipeline.addPhase(phaseName, phase);
                        }
                    }
                }
            }
        }

        return pipeline;
    }

    findRule(key: string, position: number) {
        const tree = this._get(key);
        if (!tree) {
            return undefined;
        }
        for (let index = 0; index < tree.rules.length; index++) {
            const rule = tree.rules[index];

            if (position >= rule.range.start.line && position < rule.range.end.line) {
                return tree.rules[index];
            }

            if (position < rule.range.start.line) {
                return tree.rules[index - 1];
            }
        }
    }

    getReference(key: string, name: string, context: "annotation" | "macro"): JapeSymbolReference | null {
        const tree = this._get(key);
        if (!tree) {
            return null;
        }

        if (context === "macro") {
            const symbol = this.getSymbols(key).find(s => s.name === name);
            if (!symbol) {
                return null;
            }
            return { name, refs: [{ key: key, range: symbol.range }] };
        }
        
        const input = tree.inputs.find(i => i === name);
        if (!input) {
            return null;
        }
        return { name, refs: [] };
    }

    getSymbols(key: string) {
        const tree = this._get(key);
        if (!tree) {
            return [];
        }

        return tree.macros.map(m => ({
            name: m.name,
            range: m.range,
        }));
    }

    static getLiteral(code: number) {
        const literal = JapeLexer.VOCABULARY.getLiteralName(code);
        return literal && literal.substring(1, literal.length - 1);
    }


    _get(key: string): SinglePhase | null {
        const tree = this.map.get(key);
        if (tree instanceof SinglePhase) {
            return tree;
        }
        return null;
    }

}


export interface JapeSymbolReference {
    name: string;
    
    refs: {
        key: string;
        range: NodeRange;
    }[];
}

export interface FileLoader {
    load(path: string): Promise<{ version: number; text: string } | null>;
    allFiles(glob: string): Promise<string[]>;
}
