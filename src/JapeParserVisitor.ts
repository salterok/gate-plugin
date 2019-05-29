/*
 * @Author: salterok 
 * @Date: 2018-02-19 23:27:35 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2019-05-30 01:01:56
 */

import { JapeParserVisitor as IJapeParserVisitor } from "./parser/JapeParserVisitor";
import { AbstractParseTreeVisitor } from "antlr4ts";
import * as P from "./parser/JapeParser";

import * as D from "./JapeSyntaxDefinitions";

export class JapeParserVisitor extends AbstractParseTreeVisitor<D.Phase> implements IJapeParserVisitor<{} | undefined> {

    defaultResult() {
        return { __default: true } as any;
    }

    visitProgram(ctx: P.ProgramContext): D.SinglePhase | D.MultiPhase {
        const single = ctx.singlePhase();

        if (single) {
            return this.visitSinglePhase(single);
        }
        const multi = ctx.multiPhase();
        if (multi) {
            return this.visitMultiPhase(multi);
        }
        throw new Error("Can't parse file with jape grammar");
    }
    
    visitMultiPhase(ctx: P.MultiPhaseContext): D.MultiPhase {
        const phase = new D.MultiPhase();

        phase.name = this.visitMultiPhaseDecl(ctx.multiPhaseDecl());
        phase.phaseNames = this.visitPhasesDecl(ctx.phasesDecl());

        return phase;
    }

    visitMultiPhaseDecl(ctx: P.MultiPhaseDeclContext) {
        return ctx.IDENTIFIER().text;
    }

    visitPhasesDecl(ctx: P.PhasesDeclContext) {
        return ctx.PHASE_NAME().map(node => node.text.trim());
    }

    visitSinglePhase(ctx: P.SinglePhaseContext): D.SinglePhase {
        const phase = new D.SinglePhase();

        phase.name = this.visitPhaseDecl(ctx.phaseDecl());

        const inputDeclCtx = ctx.inputDecl();
        if (inputDeclCtx) {
            const items = inputDeclCtx.map(ctx => this.visitInputDecl(ctx));        
            phase.inputs = items.reduce((acc, val) => acc.concat(val), []);
        }
        else {
            phase.inputs = [];
        }

        phase.templates = [];
        for (const decl of ctx.templateDecl()) {
            const template = this.visitTemplateDecl(decl);
            phase.templates.push(template);
        }

        for (const decl of ctx.optionsDecl()) {
            const options = this.visitOptionsDecl(decl);
            phase.options = options;
        }
        
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

    visitTemplateDecl(ctx: P.TemplateDeclContext): D.PhaseTemplate {
        const template = new D.PhaseTemplate();

        template.name = ctx.IDENTIFIER().text;
        template.value = ctx.refValue().text;
        
        return template;
    }

    visitMacroDecl(ctx: P.MacroDeclContext): D.Rule {
        const rule = new D.Rule(ctx);
        rule.name = this.visitMacroName(ctx.macroName());

        rule.block = this.visitRuleBlock(ctx.ruleBlock());

        return rule;
    }

    visitRuleDecl(ctx: P.RuleDeclContext): D.Rule {
        const rule = new D.Rule(ctx);
        rule.name = this.visitRuleName(ctx.ruleName());
        const priorityCtx = ctx.rulePriority();
        if (priorityCtx) {
            rule.priority = this.visitRulePriority(priorityCtx);
        }

        rule.block = this.visitRuleBlock(ctx.ruleBlock());
        rule.annotations = this.visitRhs(ctx.rhs());

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

        // TODO: handle context operations
        const entry = ctx.ruleEntry();

        const value = ctx.refValue();
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

    visitRhs(ctx: P.RhsContext): D.Annotation[] {
        const annotations = [];

        const rhsContextArray = ctx.rhs();
        for (const rhsContext of rhsContextArray) {
            annotations.push(...this.visitRhs(rhsContext));
        }

        const rhsEntryCtx = ctx.rhsEntry();
        if (rhsEntryCtx) {
            const annotation = this.visitRhsEntry(rhsEntryCtx);
            if (annotation) {
                annotations.push(annotation);
            }
        }

        return annotations;
    }

    visitRhsEntry(ctx: P.RhsEntryContext): D.Annotation | undefined {
        const japeRhsContext = ctx.japeRhs();
        if (!japeRhsContext) {
            // do nothing with java rhs blocks
            return undefined;
        }

        return this.visitJapeRhs(japeRhsContext);
    }

    visitJapeRhs(ctx: P.JapeRhsContext): D.Annotation {
        const annotation = new D.Annotation();

        annotation.name = ctx.IDENTIFIER(1).text;
        annotation.features = this.visitJapeRhsAnnotation(ctx.japeRhsAnnotation());

        return annotation;
    }

    visitJapeRhsAnnotation(ctx: P.JapeRhsAnnotationContext): D.AnnotationFeature[] {
        return ctx.japeRhsAnnotationField().map(this.visitJapeRhsAnnotationField.bind(this));
    }

    visitJapeRhsAnnotationField(ctx: P.JapeRhsAnnotationFieldContext): D.AnnotationFeature {
        const feature = new D.AnnotationFeature();

        feature.name = ctx.IDENTIFIER().text;
        feature.value = this.visitJapeRhsAnnotationFieldValue(ctx.japeRhsAnnotationFieldValue());

        return feature;
    }

    visitJapeRhsAnnotationFieldValue(ctx: P.JapeRhsAnnotationFieldValueContext): string {
        return ctx.text; // just all text for now
    }
}
