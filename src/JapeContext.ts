/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-07-05 00:18:32 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-09-27 20:12:20
 */

import * as antlr4ts from "antlr4ts";
import * as path from "path";
import * as _ from "lodash";

import { JapeParserVisitor } from "./JapeParserVisitor";
import { Module, SinglePhase, NodeRange, MultiPhase, Phase, Annotation } from "./JapeSyntaxDefinitions";
import { JapeLexer } from "./parser/JapeLexer";
import { JapeParser } from "./parser/JapeParser";
import { TransducerPipeline } from "./TransducerPipeline";

export class JapeContext {

    private map = new Map<string, Module>();
    private pipelineMap = new Map<string, TransducerPipeline>();
    private pipeline: TransducerPipeline | undefined;

    constructor(private fileLoader: FileLoader) {
        
    }

    load(key: string, version: number, source: string) {
        console.log("Load", version, key);
        let module = this.map.get(key);
        if (module && module.version === version) {
            return module;
        }

        try {
            console.time(`Parsing ${key}`);
            const result = this.parse(source);

            if (!module) {
                module = {} as Module;
                this.map.set(key, module);
            }

            module.version = version;
            module.phase = result.phase;
            module.tokenStream = result.tokenStream;

            return module;
        }
        catch (err) {
            console.error(key, err.message);
        }
        finally {
            console.timeEnd(`Parsing ${key}`);
        }

    }

    parse(source: string): Pick<Module, "phase" | "tokenStream"> {
        const chars = new antlr4ts.ANTLRInputStream(source);
        const lexer = new JapeLexer(chars);
        const tokenStream = new antlr4ts.CommonTokenStream(lexer);
        const parser = new JapeParser(tokenStream);

        const tree = parser.program();
        const visitor = new JapeParserVisitor();
        const phase = visitor.visit(tree);
        
        return {
            phase,
            tokenStream,
        };
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
            const module = this.load(file, meta.version, meta.text);

            if (!module) {
                continue;
            }

            if (module.phase instanceof MultiPhase) {
                const pipeline = await this.createPipeline(file, module as Module<MultiPhase>);
                pipelines.push(pipeline);
            }
        }

        // select longest pipeline as root
        // TODO: support multiple non-related pipelines
        this.pipeline = _.maxBy(pipelines, pipeline => pipeline.length);
    }

    private async createPipeline(filename: string, module: Module<MultiPhase>): Promise<TransducerPipeline> {
        console.info(`MultiPhase ${module.phase.name} found in ${filename}. Creating pipeline with ${module.phase.phaseNames.length} entries`);
        let pipeline = this.pipelineMap.get(filename);
        if (pipeline) {
            return pipeline;
        }

        pipeline = new TransducerPipeline(filename, module, this);

        const dirname = path.dirname(filename);
        
        for (const phaseName of module.phase.phaseNames) {
            const filePath = path.join(dirname, phaseName + ".jape");
            let module = this.map.get(filePath);

            if (!module) {
                const meta = await this.fileLoader.load(filePath);
                if (meta) {
                    module = this.load(filePath, meta.version, meta.text);
                }
            }
            
            if (!module) {
                continue;
            }

            if (module.phase instanceof MultiPhase) {
                const innerPipeline = await this.createPipeline(filePath, module as Module<MultiPhase>);
                console.info(`Insert inner pipeline ${innerPipeline.module.phase.name} into ${phaseName} entry of ${pipeline.module.phase.name}`);
                pipeline.addChild(phaseName, innerPipeline);
            }
            else {
                pipeline.addChild(phaseName, module as Module<SinglePhase>);
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
        const module = this.map.get(key);
        if (!module) {
            return null;
        }
        const stream = module.tokenStream;

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

        const annotations: Annotation[] = [];
        this.pipeline.traverse(module => {
            module.phase.rules.map(rule => {
                const items = rule.annotations.filter(a => a.name === name);
                annotations.push(...items);
            });
        });

        return annotations;
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
        if (tree && tree.phase instanceof SinglePhase) {
            return tree.phase;
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
