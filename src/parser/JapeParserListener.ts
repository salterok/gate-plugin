// Generated from ./src/JapeParser.g4 by ANTLR 4.6-SNAPSHOT


import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';

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
 * This interface defines a complete listener for a parse tree produced by
 * `JapeParser`.
 */
export interface JapeParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `JapeParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `JapeParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `JapeParser.inputDecl`.
	 * @param ctx the parse tree
	 */
	enterInputDecl?: (ctx: InputDeclContext) => void;
	/**
	 * Exit a parse tree produced by `JapeParser.inputDecl`.
	 * @param ctx the parse tree
	 */
	exitInputDecl?: (ctx: InputDeclContext) => void;

	/**
	 * Enter a parse tree produced by `JapeParser.phaseDecl`.
	 * @param ctx the parse tree
	 */
	enterPhaseDecl?: (ctx: PhaseDeclContext) => void;
	/**
	 * Exit a parse tree produced by `JapeParser.phaseDecl`.
	 * @param ctx the parse tree
	 */
	exitPhaseDecl?: (ctx: PhaseDeclContext) => void;

	/**
	 * Enter a parse tree produced by `JapeParser.ruleDecl`.
	 * @param ctx the parse tree
	 */
	enterRuleDecl?: (ctx: RuleDeclContext) => void;
	/**
	 * Exit a parse tree produced by `JapeParser.ruleDecl`.
	 * @param ctx the parse tree
	 */
	exitRuleDecl?: (ctx: RuleDeclContext) => void;

	/**
	 * Enter a parse tree produced by `JapeParser.ruleName`.
	 * @param ctx the parse tree
	 */
	enterRuleName?: (ctx: RuleNameContext) => void;
	/**
	 * Exit a parse tree produced by `JapeParser.ruleName`.
	 * @param ctx the parse tree
	 */
	exitRuleName?: (ctx: RuleNameContext) => void;

	/**
	 * Enter a parse tree produced by `JapeParser.rulePriority`.
	 * @param ctx the parse tree
	 */
	enterRulePriority?: (ctx: RulePriorityContext) => void;
	/**
	 * Exit a parse tree produced by `JapeParser.rulePriority`.
	 * @param ctx the parse tree
	 */
	exitRulePriority?: (ctx: RulePriorityContext) => void;

	/**
	 * Enter a parse tree produced by `JapeParser.ruleBlock`.
	 * @param ctx the parse tree
	 */
	enterRuleBlock?: (ctx: RuleBlockContext) => void;
	/**
	 * Exit a parse tree produced by `JapeParser.ruleBlock`.
	 * @param ctx the parse tree
	 */
	exitRuleBlock?: (ctx: RuleBlockContext) => void;

	/**
	 * Enter a parse tree produced by `JapeParser.ruleEntry`.
	 * @param ctx the parse tree
	 */
	enterRuleEntry?: (ctx: RuleEntryContext) => void;
	/**
	 * Exit a parse tree produced by `JapeParser.ruleEntry`.
	 * @param ctx the parse tree
	 */
	exitRuleEntry?: (ctx: RuleEntryContext) => void;

	/**
	 * Enter a parse tree produced by `JapeParser.ruleClause`.
	 * @param ctx the parse tree
	 */
	enterRuleClause?: (ctx: RuleClauseContext) => void;
	/**
	 * Exit a parse tree produced by `JapeParser.ruleClause`.
	 * @param ctx the parse tree
	 */
	exitRuleClause?: (ctx: RuleClauseContext) => void;

	/**
	 * Enter a parse tree produced by `JapeParser.rhs`.
	 * @param ctx the parse tree
	 */
	enterRhs?: (ctx: RhsContext) => void;
	/**
	 * Exit a parse tree produced by `JapeParser.rhs`.
	 * @param ctx the parse tree
	 */
	exitRhs?: (ctx: RhsContext) => void;

	/**
	 * Enter a parse tree produced by `JapeParser.rhsEntry`.
	 * @param ctx the parse tree
	 */
	enterRhsEntry?: (ctx: RhsEntryContext) => void;
	/**
	 * Exit a parse tree produced by `JapeParser.rhsEntry`.
	 * @param ctx the parse tree
	 */
	exitRhsEntry?: (ctx: RhsEntryContext) => void;

	/**
	 * Enter a parse tree produced by `JapeParser.japeRhs`.
	 * @param ctx the parse tree
	 */
	enterJapeRhs?: (ctx: JapeRhsContext) => void;
	/**
	 * Exit a parse tree produced by `JapeParser.japeRhs`.
	 * @param ctx the parse tree
	 */
	exitJapeRhs?: (ctx: JapeRhsContext) => void;

	/**
	 * Enter a parse tree produced by `JapeParser.japeRhsAnnotation`.
	 * @param ctx the parse tree
	 */
	enterJapeRhsAnnotation?: (ctx: JapeRhsAnnotationContext) => void;
	/**
	 * Exit a parse tree produced by `JapeParser.japeRhsAnnotation`.
	 * @param ctx the parse tree
	 */
	exitJapeRhsAnnotation?: (ctx: JapeRhsAnnotationContext) => void;

	/**
	 * Enter a parse tree produced by `JapeParser.japeRhsAnnotationField`.
	 * @param ctx the parse tree
	 */
	enterJapeRhsAnnotationField?: (ctx: JapeRhsAnnotationFieldContext) => void;
	/**
	 * Exit a parse tree produced by `JapeParser.japeRhsAnnotationField`.
	 * @param ctx the parse tree
	 */
	exitJapeRhsAnnotationField?: (ctx: JapeRhsAnnotationFieldContext) => void;

	/**
	 * Enter a parse tree produced by `JapeParser.value`.
	 * @param ctx the parse tree
	 */
	enterValue?: (ctx: ValueContext) => void;
	/**
	 * Exit a parse tree produced by `JapeParser.value`.
	 * @param ctx the parse tree
	 */
	exitValue?: (ctx: ValueContext) => void;
}

