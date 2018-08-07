/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-07-05 00:18:32 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-08-07 16:21:44
 */

import * as antlr4ts from "antlr4ts";
import * as path from "path";
import * as _ from "lodash";

import { JapeParserVisitor } from "./JapeParserVisitor";
import { SinglePhase, NodeRange, MultiPhase, Phase, Annotation } from "./JapeSyntaxDefinitions";
import { JapeLexer } from "./parser/JapeLexer";
import { JapeParser } from "./parser/JapeParser";
import { TransducerPipeline } from "./TransducerPipeline";

export class JapeContext {

    private map = new Map<string, Phase>();
    private meta = new Map<string, antlr4ts.CommonTokenStream>();
    private pipelineMap = new Map<string, TransducerPipeline>();
    private pipeline: TransducerPipeline | undefined;

    constructor(private fileLoader: FileLoader) {
        
    }

    loadFromSource(key: string, source: string) {
        console.time(`Parsing ${key}`);

        // const chars = new antlr4.InputStream(source);
        const chars = new antlr4ts.ANTLRInputStream(source);
        const lexer = new JapeLexer(chars);
        const tokens = new antlr4ts.CommonTokenStream(lexer);
        const parser = new JapeParser(tokens);
        // parser.addParseListener(new JapeParserVisitor());
        // parser.buildParseTree = true;
        // parser.buildParseTrees = true;

        try {
            const tree = parser.program();
            
            const visitor = new JapeParserVisitor();

            const result = visitor.visit(tree);

            this.map.set(key, result);
            this.meta.set(key, tokens);
            
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

        const pipelines: TransducerPipeline[] = [];
        
        for (const file of files) {
            const meta = await this.fileLoader.load(file);
            if (!meta) {
                continue;
            }
            const phase = this.loadFromSource(file, meta.text);

            if (phase instanceof MultiPhase) {
                const pipeline = await this.createPipeline(file, phase);
                pipelines.push(pipeline);
            }
        }

        // select longest pipeline as root
        // TODO: support multiple non-related pipelines
        this.pipeline = _.maxBy(pipelines, pipeline => pipeline.phase.length);
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

            if (position >= rule.range.start.line && position <= rule.range.end.line) {
                return tree.rules[index];
            }

            if (position < rule.range.start.line) {
                return tree.rules[index - 1];
            }
        }
    }

    getTokenBefore(key: string, index: number, token: number) {
        const stream = this.meta.get(key);
        if (!stream) {
            return null;
        }

        const tokenAfter = stream.getTokens().find(t => t.startIndex >= index || (t.startIndex <= index && t.stopIndex >= index));
        if (!tokenAfter) {
            return null;
        }
        const targetToken = stream.get(tokenAfter.tokenIndex - 1);
        
        return targetToken;
    }

    findAnnotations(name: string): Annotation[] {
        if (!this.pipeline) {
            return [];
        }

        function findInMultiPhase(phase: MultiPhase): Annotation[] {
            const items = Array.from(phase.phases.values())
                .map(phase => 
                    phase instanceof SinglePhase 
                        ? phase.rules.map(rule => rule.annotations.filter(a => a.name === name))
                        : findInMultiPhase(phase)
                );

            return _.flattenDeep(items).filter(i => i) as Annotation[];
        }

        return findInMultiPhase(this.pipeline.phase);
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
