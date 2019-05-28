/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-07-05 00:18:32 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2019-05-28 16:53:56
 */

import * as antlr4ts from "antlr4ts";
import * as path from "path";
import * as _ from "lodash";

import { JapeParserVisitor } from "./JapeParserVisitor";
import { Module, SinglePhase, NodeRange, MultiPhase, Phase, Annotation, Rule } from "./JapeSyntaxDefinitions";
import { JapeLexer } from "./parser/JapeLexer";
import { JapeParser } from "./parser/JapeParser";
import { TransducerPipeline } from "./TransducerPipeline";
import { RecognitionException, Recognizer } from "antlr4ts";
import { toUrl, toLocalPath } from "./utils";

export class JapeContext {

    private map = new Map<string, Module>();
    private pipelineMap = new Map<string, TransducerPipeline>();
    private pipeline: TransducerPipeline | undefined;

    constructor(private fileLoader: FileLoader) {
        
    }

    load(key: string, version: number, source: string) {
        console.log("Load", version, key);
        let module = this._get(key);
        if (module && module.version === version) {
            return module;
        }

        try {
            console.time(`Parsing ${key}`);
            const result = this.parse(source, key);

            if (!module) {
                module = {} as Module;
                this._set(key, module);
            }

            module.version = version;
            module.phase = result.phase;
            module.tokenStream = result.tokenStream;
            module.filename = toUrl(key);

            return module;
        }
        catch (err) {
            console.error(key, err.message || err);
        }
        finally {
            console.timeEnd(`Parsing ${key}`);
        }

    }

    parse(source: string, file: string): Pick<Module, "phase" | "tokenStream"> {
        const chars = new antlr4ts.ANTLRInputStream(source);
        const lexer = new JapeLexer(chars);
        const tokenStream = new antlr4ts.CommonTokenStream(lexer);
        const parser = new JapeParser(tokenStream);

        parser.removeErrorListeners();
        const basePath = (this.fileLoader as any).base;
        parser.addErrorListener({
            syntaxError(recognizer: Recognizer<any, any>,
                offendingSymbol: any,
                line: number,
                charPositionInLine: number,
                msg: string,
                e: RecognitionException) {
                    console.warn(`${msg.substr(0, 100)}\n|> ${basePath}/${file}:${line}:${charPositionInLine + 1}`);
            }
        });

        const tree = parser.program();
        const visitor = new JapeParserVisitor();
        const phase = visitor.visit(tree);
        
        return {
            phase,
            tokenStream,
        };
    }

    async loadPipelines() {
        const { telemetry } = await import("./telemetry");
        // telemetry.info();

        const start = Date.now();

        const files = await this.fileLoader.allFiles("**/*.jape");

        const pipelines: TransducerPipeline[] = [];
        
        for (const file of files) {
            const pipeline = await this.processAsModule(file);
            if (pipeline) {
                pipelines.push(pipeline);
            }
        }

        // select longest pipeline as root
        // TODO: support multiple non-related pipelines
        this.pipeline = _.maxBy(pipelines, pipeline => pipeline.length);
        
        telemetry.notifyPipelineStats(Date.now() - start, { phasesCnt: this.pipeline!.length, multiPhasesCtn: pipelines.length, pipelineDepth: this.pipeline!.depth });
    }

    private async createPipeline(filename: string, module: Module<MultiPhase>): Promise<TransducerPipeline> {
        console.info(`MultiPhase ${module.phase.name} found in ${filename}. Creating pipeline with ${module.phase.phaseNames.length} entries`);
        let pipeline = this.pipelineMap.get(filename);
        if (pipeline) {
            return pipeline;
        }

        pipeline = new TransducerPipeline(filename, module, this);

        const dirname = path.dirname(toLocalPath(filename));
        
        for (const phaseName of module.phase.phaseNames) {
            const filePath = path.join(dirname, phaseName + ".jape");
            await this.processAsModule(filePath, pipeline, phaseName);
        }

        return pipeline;
    }
    
    async processAsModule(file: string, parentPipeline?: TransducerPipeline, phaseName?: string): Promise<TransducerPipeline | undefined> {
        console.assert(Boolean(parentPipeline) === Boolean(phaseName), "Phase name and parent pipeline should be both provided or omitted");
        let module = this._get(file);
        if (module && module.version === 0) {
            return;
        }
        const meta = await this.fileLoader.load(file);
        if (!meta) {
            return;
        }
        module = this.load(file, meta.version, meta.text);

        if (!module) {
            return;
        }

        if (module.phase instanceof MultiPhase) {
            const innerPipeline = await this.createPipeline(file, module as Module<MultiPhase>);
            if (parentPipeline) {
                console.info(`Insert inner pipeline ${innerPipeline.module.phase.name} into ${phaseName} entry of ${parentPipeline.module.phase.name}`);
                parentPipeline.addChild(phaseName!, innerPipeline);
            }
            else {
                return innerPipeline;
            }
        }
        else {
            if (parentPipeline) {
                parentPipeline.addChild(phaseName!, module as Module<SinglePhase>);
            }
        }
    }

    findRule(key: string, position: number) {
        const tree = this._getSinglePhase(key);
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
        const module = this._get(key);
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

    getReference(key: string, name: string): JapeSymbolReference | null {
        const tree = this._getSinglePhase(key);
        if (!tree) {
            return null;
        }

        let stopped = false;
        if (this.pipeline) {
            const symbols = this.pipeline.traverse(module => {
                if (stopped) {
                    return [];
                }
                if (module.filename === key) {
                    stopped = true;
                }
                
                return this.getSymbols(module.filename);
            });

            const symbol = _.flatten(symbols).find(s => s.name === name);
            if (!symbol) {
                return null;
            }
            return { name, refs: [{ key: key, range: symbol.range, filename: symbol.filename }] };
        }
        
        const input = tree.inputs.find(i => i === name);
        if (!input) {
            return null;
        }
        return { name, refs: [] };
    }

    getSymbols(key: string) {
        const tree = this._getSinglePhase(key);
        if (!tree) {
            return [];
        }

        const annotations = [];
        for (const rule of tree.rules) {
            for (const annotation of rule.annotations) {
                // TODO: provide annotation place instead of whole rule
                annotations.push({
                    name: annotation.name,
                    range: rule.range,
                    filename: key,
                });
            }
        }

        return [
            ...tree.macros.map(m => ({
                name: m.name,
                range: m.range,
                filename: key,
            })),
            ...annotations,
        ];
    }

    static getLiteral(code: number) {
        const literal = JapeLexer.VOCABULARY.getLiteralName(code);
        return literal && literal.substring(1, literal.length - 1);
    }


    _getSinglePhase(key: string): SinglePhase | null {
        const tree = this._get(key);
        if (tree && tree.phase instanceof SinglePhase) {
            return tree.phase;
        }
        return null;
    }

    _get(key: string): Module<Phase> | undefined {
        return this.map.get(toUrl(key));
    }

    _set(key: string, module: Module) {
        this.map.set(toUrl(key), module);
    }
}


export interface JapeSymbolReference {
    name: string;
    
    refs: {
        key: string;
        range: NodeRange;
        filename: string;
    }[];
}

export interface FileLoader {
    load(path: string): Promise<{ version: number; text: string } | null>;
    allFiles(glob: string): Promise<string[]>;
}
