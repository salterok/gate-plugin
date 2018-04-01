// Generated from ./src/JapeParser.g4 by ANTLR 4.6-SNAPSHOT


import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';

import { ProgramContext } from './JapeParser';
import { InputDeclContext } from './JapeParser';
import { PhaseDeclContext } from './JapeParser';
import { RuleDeclContext } from './JapeParser';
import { RuleNameContext } from './JapeParser';
import { RulePriorityContext } from './JapeParser';
import { RuleBlockContext } from './JapeParser';
import { RuleEntryContext } from './JapeParser';
import { RuleClauseContext } from './JapeParser';
import { RhsContext } from './JapeParser';
import { RhsEntryContext } from './JapeParser';
import { JapeRhsContext } from './JapeParser';
import { JapeRhsAnnotationContext } from './JapeParser';
import { JapeRhsAnnotationFieldContext } from './JapeParser';
import { ValueContext } from './JapeParser';


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `JapeParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface JapeParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `JapeParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;

	/**
	 * Visit a parse tree produced by `JapeParser.inputDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInputDecl?: (ctx: InputDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `JapeParser.phaseDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPhaseDecl?: (ctx: PhaseDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `JapeParser.ruleDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRuleDecl?: (ctx: RuleDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `JapeParser.ruleName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRuleName?: (ctx: RuleNameContext) => Result;

	/**
	 * Visit a parse tree produced by `JapeParser.rulePriority`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRulePriority?: (ctx: RulePriorityContext) => Result;

	/**
	 * Visit a parse tree produced by `JapeParser.ruleBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRuleBlock?: (ctx: RuleBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `JapeParser.ruleEntry`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRuleEntry?: (ctx: RuleEntryContext) => Result;

	/**
	 * Visit a parse tree produced by `JapeParser.ruleClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRuleClause?: (ctx: RuleClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `JapeParser.rhs`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRhs?: (ctx: RhsContext) => Result;

	/**
	 * Visit a parse tree produced by `JapeParser.rhsEntry`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRhsEntry?: (ctx: RhsEntryContext) => Result;

	/**
	 * Visit a parse tree produced by `JapeParser.japeRhs`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJapeRhs?: (ctx: JapeRhsContext) => Result;

	/**
	 * Visit a parse tree produced by `JapeParser.japeRhsAnnotation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJapeRhsAnnotation?: (ctx: JapeRhsAnnotationContext) => Result;

	/**
	 * Visit a parse tree produced by `JapeParser.japeRhsAnnotationField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJapeRhsAnnotationField?: (ctx: JapeRhsAnnotationFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `JapeParser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue?: (ctx: ValueContext) => Result;
}

