/*
 * @Author: salterok 
 * @Date: 2018-02-19 23:27:35 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-07 03:47:40
 */

import { JapeParserVisitor as IJapeParserVisitor } from "./parser/JapeParserVisitor";
import { AbstractParseTreeVisitor } from "antlr4ts/tree";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import * as P from "./parser/JapeParser";

import { Phase, Rule, RuleBlock, RuleClause } from "./JapeSyntaxDefinitions";

export class JapeParserVisitor extends AbstractParseTreeVisitor<{}> implements IJapeParserVisitor<{}> {

    defaultResult() {
        return { __default: true };
    }

    visitProgram(ctx: P.ProgramContext): Phase {
        const phase = new Phase();

        phase.name = this.visitPhaseDecl(ctx.phaseDecl());

        const inputDeclCtx = ctx.inputDecl();
        if (inputDeclCtx) {
            const items = inputDeclCtx.map(ctx => this.visitInputDecl(ctx));        
            phase.inputs = items.reduce((acc, val) => acc.concat(val), []);
        }
        else {
            phase.inputs = [];
        }
        phase.rules = ctx.ruleDecl().map(ruleCtx => this.visitRuleDecl(ruleCtx));

        return phase;
    }

    visitPhaseDecl(ctx: P.PhaseDeclContext) {
        return ctx.IDENTIFIER().text;
    }

    visitInputDecl(ctx: P.InputDeclContext) {
        return ctx.IDENTIFIER().map(node => node.text);
    }

    visitRuleDecl(ctx: P.RuleDeclContext): Rule {
        const rule = new Rule();
        rule.name = this.visitRuleName(ctx.ruleName());
        const priorityCtx = ctx.rulePriority();
        if (priorityCtx) {
            rule.priority = this.visitRulePriority(ctx.rulePriority());
        }

        rule.blocks = this.visitRuleBlock(ctx.ruleBlock());

        // debugger;
        return rule;
    }

    visitRuleBlock(ctx: P.RuleBlockContext): RuleBlock {
        const blocks = ctx.ruleBlock().map(block => {
            return this.visitRuleBlock(block);
        });

        const entries = ctx.ruleEntry().map(entry => {
            return this.visitRuleEntry(entry);
        });

        return new RuleBlock({
            blocks,
            entries,
            alias: ctx.ALIAS_SEPARATOR() ? ctx.IDENTIFIER().text : undefined
        });
    }

    visitRuleEntry(ctx: P.RuleEntryContext): RuleClause[] {
        return ctx.ruleClause().map(clause => {
            return this.visitRuleClause(clause);
        });
    }

    visitRuleClause(ctx: P.RuleClauseContext): RuleClause {
        return new RuleClause({
            path: ctx.IDENTIFIER().map(node => node.text),
            operation: ctx.COMPARE().text,
            value: ctx.value().text
        });
    }

    visitRuleName(ctx: P.RuleNameContext) {
        if (ctx.childCount === 3) {
            return ctx.getChild(2).text;
        }
        return "";
    }

    visitRulePriority(ctx: P.RulePriorityContext) {
        return parseInt(ctx.INT().text);
    }
}
