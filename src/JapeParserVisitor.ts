/*
 * @Author: salterok 
 * @Date: 2018-02-19 23:27:35 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-12 02:00:23
 */

import { JapeParserVisitor as IJapeParserVisitor } from "./parser/JapeParserVisitor";
import { AbstractParseTreeVisitor } from "antlr4ts/tree";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import * as P from "./parser/JapeParser";

import * as D from "./JapeSyntaxDefinitions";

export class JapeParserVisitor extends AbstractParseTreeVisitor<D.Phase> implements IJapeParserVisitor<{}> {

    defaultResult() {
        return { __default: true } as any;
    }

    visitProgram(ctx: P.ProgramContext): D.Phase {
        const phase = new D.Phase();

        phase.name = this.visitPhaseDecl(ctx.phaseDecl());

        const inputDeclCtx = ctx.inputDecl();
        if (inputDeclCtx) {
            const items = inputDeclCtx.map(ctx => this.visitInputDecl(ctx));        
            phase.inputs = items.reduce((acc, val) => acc.concat(val), []);
        }
        else {
            phase.inputs = [];
        }

        const optionsDeclCtx = ctx.optionsDecl();
        if (optionsDeclCtx) {
            phase.options = this.visitOptionsDecl(optionsDeclCtx);
        }

        // TODO: parse macros
        phase.macros = ctx.macroDecl().map(macroCtx => this.visitMacroDecl(macroCtx));
        phase.rules = ctx.ruleDecl().map(ruleCtx => this.visitRuleDecl(ruleCtx));

        return phase;
    }

    visitPhaseDecl(ctx: P.PhaseDeclContext) {
        return ctx.IDENTIFIER().text;
    }

    visitInputDecl(ctx: P.InputDeclContext) {
        return ctx.IDENTIFIER().map(node => node.text);
    }

    visitOptionsDecl(ctx: P.OptionsDeclContext): D.PhaseOptions {
        const options = new Map();
        const identifiers = ctx.IDENTIFIER();
        if (identifiers.length % 2 === 0) {
            for (let index = 0; index < identifiers.length; index += 2) {
                const key = identifiers[index].text;
                const value = identifiers[index + 1].text;
                options.set(key, value);
            }
        }
        return options;
    }

    visitMacroDecl(ctx: P.MacroDeclContext): D.Rule {
        const rule = new D.Rule();
        rule.name = this.visitMacroName(ctx.macroName());

        rule.block = this.visitRuleBlock(ctx.ruleBlock());

        rule.start = ctx.start.line;

        if (!ctx.stop) {
            const error = new Error("ctx.stop is undefined");
            (error as any).data = ctx;
            throw error;
        }
        rule.stop = ctx.stop.line;

        return rule;
    }

    visitRuleDecl(ctx: P.RuleDeclContext): D.Rule {
        const rule = new D.Rule();
        rule.name = this.visitRuleName(ctx.ruleName());
        const priorityCtx = ctx.rulePriority();
        if (priorityCtx) {
            rule.priority = this.visitRulePriority(priorityCtx);
        }

        rule.block = this.visitRuleBlock(ctx.ruleBlock());

        rule.start = ctx.start.line;

        if (!ctx.stop) {
            const error = new Error("ctx.stop is undefined");
            (error as any).data = ctx;
            throw error;
        }
        rule.stop = ctx.stop.line;

        return rule;
    }

    visitRuleBlock(ctx: P.RuleBlockContext): D.GroupEntry {
        const group = this.visitRuleBlockContent(ctx.ruleBlockContent());
        const alias = ctx.ALIAS_SEPARATOR() && ctx.IDENTIFIER();

        return new D.GroupEntry(
            group,
            alias && alias.text
        );
    }

    visitRuleBlockContent(ctx: P.RuleBlockContentContext): D.BlockContent[] {
        const groupCtx = ctx.GROUP_OPEN();
        const nameCtx = ctx.IDENTIFIER();
        const ruleBlockCtx = ctx.ruleBlockContent();

        if (groupCtx) {
            const items = this.visitRuleBlockContent(ruleBlockCtx[0]);
            return [new D.GroupEntry(items, nameCtx && nameCtx.text)];
        }

        if (nameCtx) {
            return [new D.NameReference(nameCtx.text)];
        }

        const ruleEntryCtx = ctx.ruleEntry();

        if (ruleEntryCtx) {
            return [this.visitRuleEntry(ruleEntryCtx)];
        }

        const items: D.BlockContent[] = [];
        for (const contentCtx of ruleBlockCtx) {
            const parts = this.visitRuleBlockContent(contentCtx);
            items.push(...parts);
        }

        return items;
    }

    visitRuleEntry(ctx: P.RuleEntryContext): D.RuleEntry {
        const clauses = ctx.ruleClause().map(clause => {
            return this.visitRuleClause(clause);
        });
        return new D.RuleEntry(clauses);
    }

    visitRuleClause(ctx: P.RuleClauseContext): D.RuleClause {
        const compare = ctx.COMPARE();
        const value = ctx.value();
        return new D.RuleClause({
            path: ctx.IDENTIFIER().map(node => node.text),
            operation: compare && compare.text,
            value: value && value.text
        });
    }

    visitRuleName(ctx: P.RuleNameContext) {
        return ctx.IDENTIFIER().text;
    }

    visitMacroName(ctx: P.MacroNameContext) {
        return ctx.IDENTIFIER().text;
    }

    visitRulePriority(ctx: P.RulePriorityContext) {
        return parseInt(ctx.INT().text);
    }
}
