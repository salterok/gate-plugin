/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-01 23:50:26 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-02 02:11:41
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
    blocks: RuleBlock[];
    entries: RuleClause[][];
    alias: string;
}

export class RuleClause {
    path: string[];
    operation: string;
    value: string;
}
