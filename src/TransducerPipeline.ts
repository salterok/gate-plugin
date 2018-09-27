/*
* @Author: Sergiy Samborskiy 
* @Date: 2018-07-17 13:02:36 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-07-17 19:11:17
*/

import { JapeContext } from "./JapeContext";
import * as path from "path";
import { Module, Phase, SinglePhase, MultiPhase } from "./JapeSyntaxDefinitions";

type Child = Module<SinglePhase> | TransducerPipeline;

export class TransducerPipeline {
    private japeCtx: JapeContext;
    public filename: string;
    public module: Module<MultiPhase>;

    childModules = new Map<string, Child>();

    constructor(filename: string, module: Module<MultiPhase>, japeCtx: JapeContext) {
        this.filename = filename;
        this.module = module;
        this.japeCtx = japeCtx;
    }

    get length(): number {
        // do not count self as pipeline item
        return Array
            .from(this.childModules, ([_, child]) => child instanceof TransducerPipeline ? child.length : 1)
            .reduce((acc, val) => acc + val, 0);
    }

    addChild(name: string, child: Child): boolean {
        if (!this.module.phase.phaseNames.includes(name)) {
            return false;
        }

        if (!this.childModules.has(name)) {
            this.childModules.set(name, child);
        }
        return true;
    }

    traverse<T>(mapper: (module: Module<SinglePhase>) => T): T[] {
        const items: T[] = [];

        for (const child of this.childModules.values()) {
            if (child instanceof TransducerPipeline) {
                items.push(...child.traverse(mapper));
            }
            else {
                items.push(mapper(child));
            }
        }

        return items;
    }
}

export interface FileLoader {
    load(path: string): Promise<{ version: number; text: string } | null>;
    allFiles(glob: string): Promise<string[]>;
}
