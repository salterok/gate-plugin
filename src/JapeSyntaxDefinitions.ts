/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-01 23:50:26 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-07 03:48:10
 */

export class Phase {
    name: string;
    inputs: string[];

    rules: Rule[];
    // macros: Macro[];
}

export class Rule {
    name: string;
    priority: number = 1;
    blocks: RuleBlock;
}

export class RuleBlock {

    constructor(init: Partial<RuleBlock>) {
        this.blocks = init.blocks;
        this.entries = init.entries;
        this.alias = init.alias;
    }

    blocks: RuleBlock[];
    entries: RuleClause[][];
    alias: string;
}

export class RuleClause {

    constructor(init: Partial<RuleClause>) {
        this.path = init.path;
        this.operation = init.operation;
        this.value = init.value;
    }

    path: string[];
    operation: string;
    value: string;
}
