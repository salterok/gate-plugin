// Generated from ./src/JapeParser.g4 by ANTLR 4.6-SNAPSHOT


import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { FailedPredicateException } from 'antlr4ts/FailedPredicateException';
import { NotNull } from 'antlr4ts/Decorators';
import { NoViableAltException } from 'antlr4ts/NoViableAltException';
import { Override } from 'antlr4ts/Decorators';
import { Parser } from 'antlr4ts/Parser';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { ParserATNSimulator } from 'antlr4ts/atn/ParserATNSimulator';
import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';
import { RecognitionException } from 'antlr4ts/RecognitionException';
import { RuleContext } from 'antlr4ts/RuleContext';
import { RuleVersion } from 'antlr4ts/RuleVersion';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Token } from 'antlr4ts/Token';
import { TokenStream } from 'antlr4ts/TokenStream';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';

import { JapeParserListener } from './JapeParserListener';
import { JapeParserVisitor } from './JapeParserVisitor';


export class JapeParser extends Parser {
	public static readonly WS=1;
	public static readonly BLOCK_COMMENT=2;
	public static readonly LINE_COMMENT=3;
	public static readonly INPUT=4;
	public static readonly PHASE=5;
	public static readonly PHASES=6;
	public static readonly RULE=7;
	public static readonly MACRO=8;
	public static readonly PRIORITY=9;
	public static readonly TEMPLATE=10;
	public static readonly INT=11;
	public static readonly IDENTIFIER=12;
	public static readonly STRING=13;
	public static readonly ASSIGNMENT=14;
	public static readonly ACCESSOR=15;
	public static readonly ENTRIES_SEPARATOR=16;
	public static readonly RULE_SEPARATOR=17;
	public static readonly GROUP_OPEN=18;
	public static readonly GROUP_CLOSE=19;
	public static readonly ALIAS_SEPARATOR=20;
	public static readonly RULE_ENTRY_OPEN=21;
	public static readonly RULE_ENTRY_CLOSE=22;
	public static readonly RHS_SEPARATOR=23;
	public static readonly COMPARE=24;
	public static readonly RULE_program = 0;
	public static readonly RULE_inputDecl = 1;
	public static readonly RULE_phaseDecl = 2;
	public static readonly RULE_ruleDecl = 3;
	public static readonly RULE_ruleName = 4;
	public static readonly RULE_rulePriority = 5;
	public static readonly RULE_ruleBlock = 6;
	public static readonly RULE_ruleEntry = 7;
	public static readonly RULE_ruleClause = 8;
	public static readonly RULE_rhs = 9;
	public static readonly RULE_rhsEntry = 10;
	public static readonly RULE_japeRhs = 11;
	public static readonly RULE_japeRhsAnnotation = 12;
	public static readonly RULE_japeRhsAnnotationField = 13;
	public static readonly RULE_value = 14;
	public static readonly ruleNames: string[] = [
		"program", "inputDecl", "phaseDecl", "ruleDecl", "ruleName", "rulePriority", 
		"ruleBlock", "ruleEntry", "ruleClause", "rhs", "rhsEntry", "japeRhs", 
		"japeRhsAnnotation", "japeRhsAnnotationField", "value"
	];

	private static readonly _LITERAL_NAMES: (string | undefined)[] = [
		undefined, undefined, undefined, undefined, "'Input'", "'Phase'", "'Phases'", 
		"'Rule'", "'Macro'", "'Priority'", "'Template'", undefined, undefined, 
		undefined, "'='", "'.'", "','", "'|'", "'('", "')'", "':'", "'{'", "'}'", 
		"'-->'"
	];
	private static readonly _SYMBOLIC_NAMES: (string | undefined)[] = [
		undefined, "WS", "BLOCK_COMMENT", "LINE_COMMENT", "INPUT", "PHASE", "PHASES", 
		"RULE", "MACRO", "PRIORITY", "TEMPLATE", "INT", "IDENTIFIER", "STRING", 
		"ASSIGNMENT", "ACCESSOR", "ENTRIES_SEPARATOR", "RULE_SEPARATOR", "GROUP_OPEN", 
		"GROUP_CLOSE", "ALIAS_SEPARATOR", "RULE_ENTRY_OPEN", "RULE_ENTRY_CLOSE", 
		"RHS_SEPARATOR", "COMPARE"
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(JapeParser._LITERAL_NAMES, JapeParser._SYMBOLIC_NAMES, []);

	@Override
	@NotNull
	public get vocabulary(): Vocabulary {
		return JapeParser.VOCABULARY;
	}

	@Override
	public get grammarFileName(): string { return "JapeParser.g4"; }

	@Override
	public get ruleNames(): string[] { return JapeParser.ruleNames; }

	@Override
	public get serializedATN(): string { return JapeParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(JapeParser._ATN, this);
	}
	@RuleVersion(0)
	public program(): ProgramContext {
		let _localctx: ProgramContext = new ProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, JapeParser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 30;
			this.phaseDecl();
			this.state = 34;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===JapeParser.INPUT) {
				{
				{
				this.state = 31;
				this.inputDecl();
				}
				}
				this.state = 36;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 40;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===JapeParser.RULE) {
				{
				{
				this.state = 37;
				this.ruleDecl();
				}
				}
				this.state = 42;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public inputDecl(): InputDeclContext {
		let _localctx: InputDeclContext = new InputDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, JapeParser.RULE_inputDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 43;
			this.match(JapeParser.INPUT);
			this.state = 44;
			this.match(JapeParser.ALIAS_SEPARATOR);
			this.state = 46; 
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 45;
				this.match(JapeParser.IDENTIFIER);
				}
				}
				this.state = 48; 
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ( _la===JapeParser.IDENTIFIER );
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public phaseDecl(): PhaseDeclContext {
		let _localctx: PhaseDeclContext = new PhaseDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, JapeParser.RULE_phaseDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 50;
			this.match(JapeParser.PHASE);
			this.state = 51;
			this.match(JapeParser.ALIAS_SEPARATOR);
			this.state = 52;
			this.match(JapeParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public ruleDecl(): RuleDeclContext {
		let _localctx: RuleDeclContext = new RuleDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, JapeParser.RULE_ruleDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 54;
			this.ruleName();
			this.state = 56;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===JapeParser.PRIORITY) {
				{
				this.state = 55;
				this.rulePriority();
				}
			}

			this.state = 58;
			this.ruleBlock();
			this.state = 59;
			this.match(JapeParser.RHS_SEPARATOR);
			this.state = 60;
			this.rhs();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public ruleName(): RuleNameContext {
		let _localctx: RuleNameContext = new RuleNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, JapeParser.RULE_ruleName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 62;
			this.match(JapeParser.RULE);
			this.state = 63;
			this.match(JapeParser.ALIAS_SEPARATOR);
			this.state = 64;
			this.match(JapeParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public rulePriority(): RulePriorityContext {
		let _localctx: RulePriorityContext = new RulePriorityContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, JapeParser.RULE_rulePriority);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 66;
			this.match(JapeParser.PRIORITY);
			this.state = 67;
			this.match(JapeParser.ALIAS_SEPARATOR);
			this.state = 68;
			this.match(JapeParser.INT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public ruleBlock(): RuleBlockContext {
		let _localctx: RuleBlockContext = new RuleBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, JapeParser.RULE_ruleBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 70;
			this.match(JapeParser.GROUP_OPEN);
			this.state = 73;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JapeParser.RULE_ENTRY_OPEN:
				{
				this.state = 71;
				this.ruleEntry();
				}
				break;
			case JapeParser.GROUP_OPEN:
				{
				this.state = 72;
				this.ruleBlock();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 82;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===JapeParser.RULE_SEPARATOR) {
				{
				{
				this.state = 75;
				this.match(JapeParser.RULE_SEPARATOR);
				this.state = 78;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case JapeParser.RULE_ENTRY_OPEN:
					{
					this.state = 76;
					this.ruleEntry();
					}
					break;
				case JapeParser.GROUP_OPEN:
					{
					this.state = 77;
					this.ruleBlock();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				this.state = 84;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 85;
			this.match(JapeParser.GROUP_CLOSE);
			this.state = 88;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===JapeParser.ALIAS_SEPARATOR) {
				{
				this.state = 86;
				this.match(JapeParser.ALIAS_SEPARATOR);
				this.state = 87;
				this.match(JapeParser.IDENTIFIER);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public ruleEntry(): RuleEntryContext {
		let _localctx: RuleEntryContext = new RuleEntryContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, JapeParser.RULE_ruleEntry);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 90;
			this.match(JapeParser.RULE_ENTRY_OPEN);
			this.state = 91;
			this.ruleClause();
			this.state = 96;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===JapeParser.ENTRIES_SEPARATOR) {
				{
				{
				this.state = 92;
				this.match(JapeParser.ENTRIES_SEPARATOR);
				this.state = 93;
				this.ruleClause();
				}
				}
				this.state = 98;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 99;
			this.match(JapeParser.RULE_ENTRY_CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public ruleClause(): RuleClauseContext {
		let _localctx: RuleClauseContext = new RuleClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, JapeParser.RULE_ruleClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 101;
			this.match(JapeParser.IDENTIFIER);
			this.state = 104;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===JapeParser.ACCESSOR) {
				{
				this.state = 102;
				this.match(JapeParser.ACCESSOR);
				this.state = 103;
				this.match(JapeParser.IDENTIFIER);
				}
			}

			this.state = 108;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===JapeParser.COMPARE) {
				{
				this.state = 106;
				this.match(JapeParser.COMPARE);
				this.state = 107;
				this.value();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public rhs(): RhsContext {
		let _localctx: RhsContext = new RhsContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, JapeParser.RULE_rhs);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 110;
			this.rhsEntry();
			this.state = 115;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===JapeParser.ENTRIES_SEPARATOR) {
				{
				{
				this.state = 111;
				this.match(JapeParser.ENTRIES_SEPARATOR);
				this.state = 112;
				this.rhsEntry();
				}
				}
				this.state = 117;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public rhsEntry(): RhsEntryContext {
		let _localctx: RhsEntryContext = new RhsEntryContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, JapeParser.RULE_rhsEntry);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 118;
			this.japeRhs();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public japeRhs(): JapeRhsContext {
		let _localctx: JapeRhsContext = new JapeRhsContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, JapeParser.RULE_japeRhs);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 120;
			this.match(JapeParser.ALIAS_SEPARATOR);
			this.state = 121;
			this.match(JapeParser.IDENTIFIER);
			this.state = 122;
			this.match(JapeParser.ACCESSOR);
			this.state = 123;
			this.match(JapeParser.IDENTIFIER);
			this.state = 124;
			this.match(JapeParser.ASSIGNMENT);
			this.state = 125;
			this.japeRhsAnnotation();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public japeRhsAnnotation(): JapeRhsAnnotationContext {
		let _localctx: JapeRhsAnnotationContext = new JapeRhsAnnotationContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, JapeParser.RULE_japeRhsAnnotation);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 127;
			this.match(JapeParser.RULE_ENTRY_OPEN);
			this.state = 128;
			this.japeRhsAnnotationField();
			this.state = 133;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===JapeParser.ENTRIES_SEPARATOR) {
				{
				{
				this.state = 129;
				this.match(JapeParser.ENTRIES_SEPARATOR);
				this.state = 130;
				this.japeRhsAnnotationField();
				}
				}
				this.state = 135;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 136;
			this.match(JapeParser.RULE_ENTRY_CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public japeRhsAnnotationField(): JapeRhsAnnotationFieldContext {
		let _localctx: JapeRhsAnnotationFieldContext = new JapeRhsAnnotationFieldContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, JapeParser.RULE_japeRhsAnnotationField);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 138;
			this.match(JapeParser.IDENTIFIER);
			this.state = 139;
			this.match(JapeParser.ASSIGNMENT);
			this.state = 140;
			this.value();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public value(): ValueContext {
		let _localctx: ValueContext = new ValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, JapeParser.RULE_value);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 142;
			_la = this._input.LA(1);
			if ( !((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << JapeParser.INT) | (1 << JapeParser.IDENTIFIER) | (1 << JapeParser.STRING))) !== 0)) ) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x03\x1A\x93\x04\x02"+
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07"+
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04"+
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x03\x02\x03\x02\x07\x02#\n\x02"+
		"\f\x02\x0E\x02&\v\x02\x03\x02\x07\x02)\n\x02\f\x02\x0E\x02,\v\x02\x03"+
		"\x03\x03\x03\x03\x03\x06\x031\n\x03\r\x03\x0E\x032\x03\x04\x03\x04\x03"+
		"\x04\x03\x04\x03\x05\x03\x05\x05\x05;\n\x05\x03\x05\x03\x05\x03\x05\x03"+
		"\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03"+
		"\b\x03\b\x03\b\x05\bL\n\b\x03\b\x03\b\x03\b\x05\bQ\n\b\x07\bS\n\b\f\b"+
		"\x0E\bV\v\b\x03\b\x03\b\x03\b\x05\b[\n\b\x03\t\x03\t\x03\t\x03\t\x07\t"+
		"a\n\t\f\t\x0E\td\v\t\x03\t\x03\t\x03\n\x03\n\x03\n\x05\nk\n\n\x03\n\x03"+
		"\n\x05\no\n\n\x03\v\x03\v\x03\v\x07\vt\n\v\f\v\x0E\vw\v\v\x03\f\x03\f"+
		"\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x03"+
		"\x0E\x07\x0E\x86\n\x0E\f\x0E\x0E\x0E\x89\v\x0E\x03\x0E\x03\x0E\x03\x0F"+
		"\x03\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x02\x02\x02\x11\x02\x02"+
		"\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16"+
		"\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02\x02\x03\x03\x02\r\x0F\x90\x02 \x03"+
		"\x02\x02\x02\x04-\x03\x02\x02\x02\x064\x03\x02\x02\x02\b8\x03\x02\x02"+
		"\x02\n@\x03\x02\x02\x02\fD\x03\x02\x02\x02\x0EH\x03\x02\x02\x02\x10\\"+
		"\x03\x02\x02\x02\x12g\x03\x02\x02\x02\x14p\x03\x02\x02\x02\x16x\x03\x02"+
		"\x02\x02\x18z\x03\x02\x02\x02\x1A\x81\x03\x02\x02\x02\x1C\x8C\x03\x02"+
		"\x02\x02\x1E\x90\x03\x02\x02\x02 $\x05\x06\x04\x02!#\x05\x04\x03\x02\""+
		"!\x03\x02\x02\x02#&\x03\x02\x02\x02$\"\x03\x02\x02\x02$%\x03\x02\x02\x02"+
		"%*\x03\x02\x02\x02&$\x03\x02\x02\x02\')\x05\b\x05\x02(\'\x03\x02\x02\x02"+
		"),\x03\x02\x02\x02*(\x03\x02\x02\x02*+\x03\x02\x02\x02+\x03\x03\x02\x02"+
		"\x02,*\x03\x02\x02\x02-.\x07\x06\x02\x02.0\x07\x16\x02\x02/1\x07\x0E\x02"+
		"\x020/\x03\x02\x02\x0212\x03\x02\x02\x0220\x03\x02\x02\x0223\x03\x02\x02"+
		"\x023\x05\x03\x02\x02\x0245\x07\x07\x02\x0256\x07\x16\x02\x0267\x07\x0E"+
		"\x02\x027\x07\x03\x02\x02\x028:\x05\n\x06\x029;\x05\f\x07\x02:9\x03\x02"+
		"\x02\x02:;\x03\x02\x02\x02;<\x03\x02\x02\x02<=\x05\x0E\b\x02=>\x07\x19"+
		"\x02\x02>?\x05\x14\v\x02?\t\x03\x02\x02\x02@A\x07\t\x02\x02AB\x07\x16"+
		"\x02\x02BC\x07\x0E\x02\x02C\v\x03\x02\x02\x02DE\x07\v\x02\x02EF\x07\x16"+
		"\x02\x02FG\x07\r\x02\x02G\r\x03\x02\x02\x02HK\x07\x14\x02\x02IL\x05\x10"+
		"\t\x02JL\x05\x0E\b\x02KI\x03\x02\x02\x02KJ\x03\x02\x02\x02LT\x03\x02\x02"+
		"\x02MP\x07\x13\x02\x02NQ\x05\x10\t\x02OQ\x05\x0E\b\x02PN\x03\x02\x02\x02"+
		"PO\x03\x02\x02\x02QS\x03\x02\x02\x02RM\x03\x02\x02\x02SV\x03\x02\x02\x02"+
		"TR\x03\x02\x02\x02TU\x03\x02\x02\x02UW\x03\x02\x02\x02VT\x03\x02\x02\x02"+
		"WZ\x07\x15\x02\x02XY\x07\x16\x02\x02Y[\x07\x0E\x02\x02ZX\x03\x02\x02\x02"+
		"Z[\x03\x02\x02\x02[\x0F\x03\x02\x02\x02\\]\x07\x17\x02\x02]b\x05\x12\n"+
		"\x02^_\x07\x12\x02\x02_a\x05\x12\n\x02`^\x03\x02\x02\x02ad\x03\x02\x02"+
		"\x02b`\x03\x02\x02\x02bc\x03\x02\x02\x02ce\x03\x02\x02\x02db\x03\x02\x02"+
		"\x02ef\x07\x18\x02\x02f\x11\x03\x02\x02\x02gj\x07\x0E\x02\x02hi\x07\x11"+
		"\x02\x02ik\x07\x0E\x02\x02jh\x03\x02\x02\x02jk\x03\x02\x02\x02kn\x03\x02"+
		"\x02\x02lm\x07\x1A\x02\x02mo\x05\x1E\x10\x02nl\x03\x02\x02\x02no\x03\x02"+
		"\x02\x02o\x13\x03\x02\x02\x02pu\x05\x16\f\x02qr\x07\x12\x02\x02rt\x05"+
		"\x16\f\x02sq\x03\x02\x02\x02tw\x03\x02\x02\x02us\x03\x02\x02\x02uv\x03"+
		"\x02\x02\x02v\x15\x03\x02\x02\x02wu\x03\x02\x02\x02xy\x05\x18\r\x02y\x17"+
		"\x03\x02\x02\x02z{\x07\x16\x02\x02{|\x07\x0E\x02\x02|}\x07\x11\x02\x02"+
		"}~\x07\x0E\x02\x02~\x7F\x07\x10\x02\x02\x7F\x80\x05\x1A\x0E\x02\x80\x19"+
		"\x03\x02\x02\x02\x81\x82\x07\x17\x02\x02\x82\x87\x05\x1C\x0F\x02\x83\x84"+
		"\x07\x12\x02\x02\x84\x86\x05\x1C\x0F\x02\x85\x83\x03\x02\x02\x02\x86\x89"+
		"\x03\x02\x02\x02\x87\x85\x03\x02\x02\x02\x87\x88\x03\x02\x02\x02\x88\x8A"+
		"\x03\x02\x02\x02\x89\x87\x03\x02\x02\x02\x8A\x8B\x07\x18\x02\x02\x8B\x1B"+
		"\x03\x02\x02\x02\x8C\x8D\x07\x0E\x02\x02\x8D\x8E\x07\x10\x02\x02\x8E\x8F"+
		"\x05\x1E\x10\x02\x8F\x1D\x03\x02\x02\x02\x90\x91\t\x02\x02\x02\x91\x1F"+
		"\x03\x02\x02\x02\x0F$*2:KPTZbjnu\x87";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!JapeParser.__ATN) {
			JapeParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(JapeParser._serializedATN));
		}

		return JapeParser.__ATN;
	}

}

export class ProgramContext extends ParserRuleContext {
	public phaseDecl(): PhaseDeclContext {
		return this.getRuleContext(0, PhaseDeclContext);
	}
	public inputDecl(): InputDeclContext[];
	public inputDecl(i: number): InputDeclContext;
	public inputDecl(i?: number): InputDeclContext | InputDeclContext[] {
		if (i === undefined) {
			return this.getRuleContexts(InputDeclContext);
		} else {
			return this.getRuleContext(i, InputDeclContext);
		}
	}
	public ruleDecl(): RuleDeclContext[];
	public ruleDecl(i: number): RuleDeclContext;
	public ruleDecl(i?: number): RuleDeclContext | RuleDeclContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RuleDeclContext);
		} else {
			return this.getRuleContext(i, RuleDeclContext);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return JapeParser.RULE_program; }
	@Override
	public enterRule(listener: JapeParserListener): void {
		if (listener.enterProgram) listener.enterProgram(this);
	}
	@Override
	public exitRule(listener: JapeParserListener): void {
		if (listener.exitProgram) listener.exitProgram(this);
	}
	@Override
	public accept<Result>(visitor: JapeParserVisitor<Result>): Result {
		if (visitor.visitProgram) return visitor.visitProgram(this);
		else return visitor.visitChildren(this);
	}
}


export class InputDeclContext extends ParserRuleContext {
	public INPUT(): TerminalNode { return this.getToken(JapeParser.INPUT, 0); }
	public ALIAS_SEPARATOR(): TerminalNode { return this.getToken(JapeParser.ALIAS_SEPARATOR, 0); }
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JapeParser.IDENTIFIER);
		} else {
			return this.getToken(JapeParser.IDENTIFIER, i);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return JapeParser.RULE_inputDecl; }
	@Override
	public enterRule(listener: JapeParserListener): void {
		if (listener.enterInputDecl) listener.enterInputDecl(this);
	}
	@Override
	public exitRule(listener: JapeParserListener): void {
		if (listener.exitInputDecl) listener.exitInputDecl(this);
	}
	@Override
	public accept<Result>(visitor: JapeParserVisitor<Result>): Result {
		if (visitor.visitInputDecl) return visitor.visitInputDecl(this);
		else return visitor.visitChildren(this);
	}
}


export class PhaseDeclContext extends ParserRuleContext {
	public PHASE(): TerminalNode { return this.getToken(JapeParser.PHASE, 0); }
	public ALIAS_SEPARATOR(): TerminalNode { return this.getToken(JapeParser.ALIAS_SEPARATOR, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(JapeParser.IDENTIFIER, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return JapeParser.RULE_phaseDecl; }
	@Override
	public enterRule(listener: JapeParserListener): void {
		if (listener.enterPhaseDecl) listener.enterPhaseDecl(this);
	}
	@Override
	public exitRule(listener: JapeParserListener): void {
		if (listener.exitPhaseDecl) listener.exitPhaseDecl(this);
	}
	@Override
	public accept<Result>(visitor: JapeParserVisitor<Result>): Result {
		if (visitor.visitPhaseDecl) return visitor.visitPhaseDecl(this);
		else return visitor.visitChildren(this);
	}
}


export class RuleDeclContext extends ParserRuleContext {
	public ruleName(): RuleNameContext {
		return this.getRuleContext(0, RuleNameContext);
	}
	public ruleBlock(): RuleBlockContext {
		return this.getRuleContext(0, RuleBlockContext);
	}
	public RHS_SEPARATOR(): TerminalNode { return this.getToken(JapeParser.RHS_SEPARATOR, 0); }
	public rhs(): RhsContext {
		return this.getRuleContext(0, RhsContext);
	}
	public rulePriority(): RulePriorityContext | undefined {
		return this.tryGetRuleContext(0, RulePriorityContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return JapeParser.RULE_ruleDecl; }
	@Override
	public enterRule(listener: JapeParserListener): void {
		if (listener.enterRuleDecl) listener.enterRuleDecl(this);
	}
	@Override
	public exitRule(listener: JapeParserListener): void {
		if (listener.exitRuleDecl) listener.exitRuleDecl(this);
	}
	@Override
	public accept<Result>(visitor: JapeParserVisitor<Result>): Result {
		if (visitor.visitRuleDecl) return visitor.visitRuleDecl(this);
		else return visitor.visitChildren(this);
	}
}


export class RuleNameContext extends ParserRuleContext {
	public RULE(): TerminalNode { return this.getToken(JapeParser.RULE, 0); }
	public ALIAS_SEPARATOR(): TerminalNode { return this.getToken(JapeParser.ALIAS_SEPARATOR, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(JapeParser.IDENTIFIER, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return JapeParser.RULE_ruleName; }
	@Override
	public enterRule(listener: JapeParserListener): void {
		if (listener.enterRuleName) listener.enterRuleName(this);
	}
	@Override
	public exitRule(listener: JapeParserListener): void {
		if (listener.exitRuleName) listener.exitRuleName(this);
	}
	@Override
	public accept<Result>(visitor: JapeParserVisitor<Result>): Result {
		if (visitor.visitRuleName) return visitor.visitRuleName(this);
		else return visitor.visitChildren(this);
	}
}


export class RulePriorityContext extends ParserRuleContext {
	public PRIORITY(): TerminalNode { return this.getToken(JapeParser.PRIORITY, 0); }
	public ALIAS_SEPARATOR(): TerminalNode { return this.getToken(JapeParser.ALIAS_SEPARATOR, 0); }
	public INT(): TerminalNode { return this.getToken(JapeParser.INT, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return JapeParser.RULE_rulePriority; }
	@Override
	public enterRule(listener: JapeParserListener): void {
		if (listener.enterRulePriority) listener.enterRulePriority(this);
	}
	@Override
	public exitRule(listener: JapeParserListener): void {
		if (listener.exitRulePriority) listener.exitRulePriority(this);
	}
	@Override
	public accept<Result>(visitor: JapeParserVisitor<Result>): Result {
		if (visitor.visitRulePriority) return visitor.visitRulePriority(this);
		else return visitor.visitChildren(this);
	}
}


export class RuleBlockContext extends ParserRuleContext {
	public GROUP_OPEN(): TerminalNode { return this.getToken(JapeParser.GROUP_OPEN, 0); }
	public GROUP_CLOSE(): TerminalNode { return this.getToken(JapeParser.GROUP_CLOSE, 0); }
	public ruleEntry(): RuleEntryContext[];
	public ruleEntry(i: number): RuleEntryContext;
	public ruleEntry(i?: number): RuleEntryContext | RuleEntryContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RuleEntryContext);
		} else {
			return this.getRuleContext(i, RuleEntryContext);
		}
	}
	public ruleBlock(): RuleBlockContext[];
	public ruleBlock(i: number): RuleBlockContext;
	public ruleBlock(i?: number): RuleBlockContext | RuleBlockContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RuleBlockContext);
		} else {
			return this.getRuleContext(i, RuleBlockContext);
		}
	}
	public RULE_SEPARATOR(): TerminalNode[];
	public RULE_SEPARATOR(i: number): TerminalNode;
	public RULE_SEPARATOR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JapeParser.RULE_SEPARATOR);
		} else {
			return this.getToken(JapeParser.RULE_SEPARATOR, i);
		}
	}
	public ALIAS_SEPARATOR(): TerminalNode | undefined { return this.tryGetToken(JapeParser.ALIAS_SEPARATOR, 0); }
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(JapeParser.IDENTIFIER, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return JapeParser.RULE_ruleBlock; }
	@Override
	public enterRule(listener: JapeParserListener): void {
		if (listener.enterRuleBlock) listener.enterRuleBlock(this);
	}
	@Override
	public exitRule(listener: JapeParserListener): void {
		if (listener.exitRuleBlock) listener.exitRuleBlock(this);
	}
	@Override
	public accept<Result>(visitor: JapeParserVisitor<Result>): Result {
		if (visitor.visitRuleBlock) return visitor.visitRuleBlock(this);
		else return visitor.visitChildren(this);
	}
}


export class RuleEntryContext extends ParserRuleContext {
	public RULE_ENTRY_OPEN(): TerminalNode { return this.getToken(JapeParser.RULE_ENTRY_OPEN, 0); }
	public ruleClause(): RuleClauseContext[];
	public ruleClause(i: number): RuleClauseContext;
	public ruleClause(i?: number): RuleClauseContext | RuleClauseContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RuleClauseContext);
		} else {
			return this.getRuleContext(i, RuleClauseContext);
		}
	}
	public RULE_ENTRY_CLOSE(): TerminalNode { return this.getToken(JapeParser.RULE_ENTRY_CLOSE, 0); }
	public ENTRIES_SEPARATOR(): TerminalNode[];
	public ENTRIES_SEPARATOR(i: number): TerminalNode;
	public ENTRIES_SEPARATOR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JapeParser.ENTRIES_SEPARATOR);
		} else {
			return this.getToken(JapeParser.ENTRIES_SEPARATOR, i);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return JapeParser.RULE_ruleEntry; }
	@Override
	public enterRule(listener: JapeParserListener): void {
		if (listener.enterRuleEntry) listener.enterRuleEntry(this);
	}
	@Override
	public exitRule(listener: JapeParserListener): void {
		if (listener.exitRuleEntry) listener.exitRuleEntry(this);
	}
	@Override
	public accept<Result>(visitor: JapeParserVisitor<Result>): Result {
		if (visitor.visitRuleEntry) return visitor.visitRuleEntry(this);
		else return visitor.visitChildren(this);
	}
}


export class RuleClauseContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JapeParser.IDENTIFIER);
		} else {
			return this.getToken(JapeParser.IDENTIFIER, i);
		}
	}
	public ACCESSOR(): TerminalNode | undefined { return this.tryGetToken(JapeParser.ACCESSOR, 0); }
	public COMPARE(): TerminalNode | undefined { return this.tryGetToken(JapeParser.COMPARE, 0); }
	public value(): ValueContext | undefined {
		return this.tryGetRuleContext(0, ValueContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return JapeParser.RULE_ruleClause; }
	@Override
	public enterRule(listener: JapeParserListener): void {
		if (listener.enterRuleClause) listener.enterRuleClause(this);
	}
	@Override
	public exitRule(listener: JapeParserListener): void {
		if (listener.exitRuleClause) listener.exitRuleClause(this);
	}
	@Override
	public accept<Result>(visitor: JapeParserVisitor<Result>): Result {
		if (visitor.visitRuleClause) return visitor.visitRuleClause(this);
		else return visitor.visitChildren(this);
	}
}


export class RhsContext extends ParserRuleContext {
	public rhsEntry(): RhsEntryContext[];
	public rhsEntry(i: number): RhsEntryContext;
	public rhsEntry(i?: number): RhsEntryContext | RhsEntryContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RhsEntryContext);
		} else {
			return this.getRuleContext(i, RhsEntryContext);
		}
	}
	public ENTRIES_SEPARATOR(): TerminalNode[];
	public ENTRIES_SEPARATOR(i: number): TerminalNode;
	public ENTRIES_SEPARATOR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JapeParser.ENTRIES_SEPARATOR);
		} else {
			return this.getToken(JapeParser.ENTRIES_SEPARATOR, i);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return JapeParser.RULE_rhs; }
	@Override
	public enterRule(listener: JapeParserListener): void {
		if (listener.enterRhs) listener.enterRhs(this);
	}
	@Override
	public exitRule(listener: JapeParserListener): void {
		if (listener.exitRhs) listener.exitRhs(this);
	}
	@Override
	public accept<Result>(visitor: JapeParserVisitor<Result>): Result {
		if (visitor.visitRhs) return visitor.visitRhs(this);
		else return visitor.visitChildren(this);
	}
}


export class RhsEntryContext extends ParserRuleContext {
	public japeRhs(): JapeRhsContext {
		return this.getRuleContext(0, JapeRhsContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return JapeParser.RULE_rhsEntry; }
	@Override
	public enterRule(listener: JapeParserListener): void {
		if (listener.enterRhsEntry) listener.enterRhsEntry(this);
	}
	@Override
	public exitRule(listener: JapeParserListener): void {
		if (listener.exitRhsEntry) listener.exitRhsEntry(this);
	}
	@Override
	public accept<Result>(visitor: JapeParserVisitor<Result>): Result {
		if (visitor.visitRhsEntry) return visitor.visitRhsEntry(this);
		else return visitor.visitChildren(this);
	}
}


export class JapeRhsContext extends ParserRuleContext {
	public ALIAS_SEPARATOR(): TerminalNode { return this.getToken(JapeParser.ALIAS_SEPARATOR, 0); }
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JapeParser.IDENTIFIER);
		} else {
			return this.getToken(JapeParser.IDENTIFIER, i);
		}
	}
	public ACCESSOR(): TerminalNode { return this.getToken(JapeParser.ACCESSOR, 0); }
	public ASSIGNMENT(): TerminalNode { return this.getToken(JapeParser.ASSIGNMENT, 0); }
	public japeRhsAnnotation(): JapeRhsAnnotationContext {
		return this.getRuleContext(0, JapeRhsAnnotationContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return JapeParser.RULE_japeRhs; }
	@Override
	public enterRule(listener: JapeParserListener): void {
		if (listener.enterJapeRhs) listener.enterJapeRhs(this);
	}
	@Override
	public exitRule(listener: JapeParserListener): void {
		if (listener.exitJapeRhs) listener.exitJapeRhs(this);
	}
	@Override
	public accept<Result>(visitor: JapeParserVisitor<Result>): Result {
		if (visitor.visitJapeRhs) return visitor.visitJapeRhs(this);
		else return visitor.visitChildren(this);
	}
}


export class JapeRhsAnnotationContext extends ParserRuleContext {
	public RULE_ENTRY_OPEN(): TerminalNode { return this.getToken(JapeParser.RULE_ENTRY_OPEN, 0); }
	public japeRhsAnnotationField(): JapeRhsAnnotationFieldContext[];
	public japeRhsAnnotationField(i: number): JapeRhsAnnotationFieldContext;
	public japeRhsAnnotationField(i?: number): JapeRhsAnnotationFieldContext | JapeRhsAnnotationFieldContext[] {
		if (i === undefined) {
			return this.getRuleContexts(JapeRhsAnnotationFieldContext);
		} else {
			return this.getRuleContext(i, JapeRhsAnnotationFieldContext);
		}
	}
	public RULE_ENTRY_CLOSE(): TerminalNode { return this.getToken(JapeParser.RULE_ENTRY_CLOSE, 0); }
	public ENTRIES_SEPARATOR(): TerminalNode[];
	public ENTRIES_SEPARATOR(i: number): TerminalNode;
	public ENTRIES_SEPARATOR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JapeParser.ENTRIES_SEPARATOR);
		} else {
			return this.getToken(JapeParser.ENTRIES_SEPARATOR, i);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return JapeParser.RULE_japeRhsAnnotation; }
	@Override
	public enterRule(listener: JapeParserListener): void {
		if (listener.enterJapeRhsAnnotation) listener.enterJapeRhsAnnotation(this);
	}
	@Override
	public exitRule(listener: JapeParserListener): void {
		if (listener.exitJapeRhsAnnotation) listener.exitJapeRhsAnnotation(this);
	}
	@Override
	public accept<Result>(visitor: JapeParserVisitor<Result>): Result {
		if (visitor.visitJapeRhsAnnotation) return visitor.visitJapeRhsAnnotation(this);
		else return visitor.visitChildren(this);
	}
}


export class JapeRhsAnnotationFieldContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(JapeParser.IDENTIFIER, 0); }
	public ASSIGNMENT(): TerminalNode { return this.getToken(JapeParser.ASSIGNMENT, 0); }
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return JapeParser.RULE_japeRhsAnnotationField; }
	@Override
	public enterRule(listener: JapeParserListener): void {
		if (listener.enterJapeRhsAnnotationField) listener.enterJapeRhsAnnotationField(this);
	}
	@Override
	public exitRule(listener: JapeParserListener): void {
		if (listener.exitJapeRhsAnnotationField) listener.exitJapeRhsAnnotationField(this);
	}
	@Override
	public accept<Result>(visitor: JapeParserVisitor<Result>): Result {
		if (visitor.visitJapeRhsAnnotationField) return visitor.visitJapeRhsAnnotationField(this);
		else return visitor.visitChildren(this);
	}
}


export class ValueContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(JapeParser.IDENTIFIER, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(JapeParser.STRING, 0); }
	public INT(): TerminalNode | undefined { return this.tryGetToken(JapeParser.INT, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return JapeParser.RULE_value; }
	@Override
	public enterRule(listener: JapeParserListener): void {
		if (listener.enterValue) listener.enterValue(this);
	}
	@Override
	public exitRule(listener: JapeParserListener): void {
		if (listener.exitValue) listener.exitValue(this);
	}
	@Override
	public accept<Result>(visitor: JapeParserVisitor<Result>): Result {
		if (visitor.visitValue) return visitor.visitValue(this);
		else return visitor.visitChildren(this);
	}
}


