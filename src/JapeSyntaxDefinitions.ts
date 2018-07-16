/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-01 23:50:26 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-16 23:37:23
 */

interface SourceBlock {
    start: number;
    stop: number;
}

export class MultiPhase {
    name!: string;
    phaseNames!: string[];
}

export class Phase {
    name!: string;
    inputs!: string[];
    options!: PhaseOptions;

    macros!: Rule[];
    rules!: Rule[];
    // macros: Macro[];
}

export class PhaseOptions extends Map<string, string> {
    
}

export class Rule {
    name!: string;
    priority: number = 1;
    block!: GroupEntry;

    place!: NodeRange;
    
    start!: number;
    stop!: number;


}

export class RuleEntry {
    constructor(public clauses: RuleClause[]) {
        this.clauses = clauses;
    }
}

export class RuleClause {

    constructor(init: RuleClause) {
        this.path = init.path;
        this.operation = init.operation;
        this.value = init.value;
    }

    path: string[];
    operation: string | undefined;
    value: string | undefined;
}

export class GroupEntry {
    constructor(entries: BlockContent[], alias: string | undefined) {
        this.entries = entries;
        this.alias = alias;
    }

    entries: BlockContent[];
    alias: string | undefined;

    get aliases(): string[] {
        const nestedAliases = this.entries.map(block => 
            block instanceof GroupEntry 
                ? block.alias 
                : undefined
            )
        .filter(a => a);
    
        return [
            this.alias, 
            ...nestedAliases
        ].filter(a => a) as string[];
    }
}

export class NameReference {
    constructor(public name: string) {
        
    }
}

export interface NodePosition {
    line: number;
    character: number;
}

export interface NodeRange {
    start: NodePosition;
    end: NodePosition;
}

export type BlockContent = NameReference | RuleEntry | GroupEntry;
