/*
* @Author: Sergiy Samborskiy 
* @Date: 2018-07-17 13:02:36 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-07-17 19:11:17
*/

import { JapeContext } from "./JapeContext";
import * as path from "path";
import { Phase, MultiPhase } from "./JapeSyntaxDefinitions";

export class TransducerPipeline {
    private japeCtx: JapeContext;
    public filename: string;
    public phase: MultiPhase;
    
    constructor(filename: string, phase: MultiPhase, japeCtx: JapeContext) {
        this.filename = filename;
        this.phase = phase;
        this.japeCtx = japeCtx;
    }

    addPhase(filename: string, phase: Phase): boolean {
        const name = path.relative(this.filename, filename);
        if (!this.phase.phaseNames.includes(name)) {
            return false;
        }

        if (!this.phase.phases.has(name)) {
            this.phase.phases.set(name, phase);
        }
        return true;
    }
}

export interface FileLoader {
    load(path: string): Promise<{ version: number; text: string } | null>;
    allFiles(glob: string): Promise<string[]>;
}
