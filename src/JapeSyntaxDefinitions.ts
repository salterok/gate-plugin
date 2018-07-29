/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-01 23:50:26 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-07-17 14:51:32
 */

import { ParserRuleContext } from "antlr4ts";
import { Place } from "./utils";

class SourceBlock {
    readonly range: NodeRange;

    constructor(ctx: NodeRange | ParserRuleContext) {
        this.range = ctx instanceof ParserRuleContext ? Place.rangeFromToken(ctx) : ctx;
    }
}

export class MultiPhase {
    name!: string;
    phaseNames!: string[];

    phases!: Map<string, Phase>;
}

export class SinglePhase {
    name!: string;
    inputs!: string[];
    options!: PhaseOptions;

    macros!: Rule[];
    rules!: Rule[];
    // macros: Macro[];
}

export type Phase = SinglePhase | MultiPhase;

export class PhaseOptions extends Map<string, string> {
    
}

export class Rule extends SourceBlock {
    name!: string;
    priority: number = 1;
    block!: GroupEntry;
    annotations!: Annotation[];
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

export class Annotation {
    name!: string;
    features!: AnnotationFeature[];
}

export class AnnotationFeature {
    name!: string;
    value!: string; // just string for now
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
