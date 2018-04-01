// Generated from ./src/JapeLexer.g4 by ANTLR 4.6-SNAPSHOT


import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { CharStream } from 'antlr4ts/CharStream';
import { Lexer } from 'antlr4ts/Lexer';
import { LexerATNSimulator } from 'antlr4ts/atn/LexerATNSimulator';
import { NotNull } from 'antlr4ts/Decorators';
import { Override } from 'antlr4ts/Decorators';
import { RuleContext } from 'antlr4ts/RuleContext';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';


export class JapeLexer extends Lexer {
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
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE"
	];

	public static readonly ruleNames: string[] = [
		"WS", "BLOCK_COMMENT", "LINE_COMMENT", "INPUT", "PHASE", "PHASES", "RULE", 
		"MACRO", "PRIORITY", "TEMPLATE", "INT", "IDENTIFIER", "STRING", "ASSIGNMENT", 
		"ACCESSOR", "ENTRIES_SEPARATOR", "RULE_SEPARATOR", "GROUP_OPEN", "GROUP_CLOSE", 
		"ALIAS_SEPARATOR", "RULE_ENTRY_OPEN", "RULE_ENTRY_CLOSE", "RHS_SEPARATOR", 
		"COMPARE"
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
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(JapeLexer._LITERAL_NAMES, JapeLexer._SYMBOLIC_NAMES, []);

	@Override
	@NotNull
	public get vocabulary(): Vocabulary {
		return JapeLexer.VOCABULARY;
	}


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(JapeLexer._ATN, this);
	}

	@Override
	public get grammarFileName(): string { return "JapeLexer.g4"; }

	@Override
	public get ruleNames(): string[] { return JapeLexer.ruleNames; }

	@Override
	public get serializedATN(): string { return JapeLexer._serializedATN; }

	@Override
	public get modeNames(): string[] { return JapeLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x02\x1A\xBF\b\x01"+
		"\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06"+
		"\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r"+
		"\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t"+
		"\x12\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t"+
		"\x17\x04\x18\t\x18\x04\x19\t\x19\x03\x02\x06\x025\n\x02\r\x02\x0E\x02"+
		"6\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03?\n\x03\f\x03"+
		"\x0E\x03B\v\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x04\x03\x04"+
		"\x03\x04\x03\x04\x07\x04M\n\x04\f\x04\x0E\x04P\v\x04\x03\x04\x03\x04\x03"+
		"\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03"+
		"\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03"+
		"\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t"+
		"\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\v\x03\v\x03"+
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\f\x03\f\x07\f\x86\n\f\f\f\x0E"+
		"\f\x89\v\f\x03\r\x03\r\x07\r\x8D\n\r\f\r\x0E\r\x90\v\r\x03\r\x03\r\x03"+
		"\r\x03\r\x05\r\x96\n\r\x03\x0E\x03\x0E\x07\x0E\x9A\n\x0E\f\x0E\x0E\x0E"+
		"\x9D\v\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x11\x03"+
		"\x11\x03\x12\x03\x12\x03\x13\x03\x13\x03\x14\x03\x14\x03\x15\x03\x15\x03"+
		"\x16\x03\x16\x03\x17\x03\x17\x03\x18\x03\x18\x03\x18\x03\x18\x03\x19\x03"+
		"\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x05\x19\xBE\n\x19\x04@\x9B"+
		"\x02\x02\x1A\x03\x02\x03\x05\x02\x04\x07\x02\x05\t\x02\x06\v\x02\x07\r"+
		"\x02\b\x0F\x02\t\x11\x02\n\x13\x02\v\x15\x02\f\x17\x02\r\x19\x02\x0E\x1B"+
		"\x02\x0F\x1D\x02\x10\x1F\x02\x11!\x02\x12#\x02\x13%\x02\x14\'\x02\x15"+
		")\x02\x16+\x02\x17-\x02\x18/\x02\x191\x02\x1A\x03\x02\t\x05\x02\v\f\x0F"+
		"\x0F\"\"\x04\x02\f\f\x0F\x0F\x03\x023;\x03\x022;\x04\x02C\\c|\x05\x02"+
		"2;C\\c|\x04\x02>>@@\xC8\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02"+
		"\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02"+
		"\r\x03\x02\x02\x02\x02\x0F\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02"+
		"\x13\x03\x02\x02\x02\x02\x15\x03\x02\x02\x02\x02\x17\x03\x02\x02\x02\x02"+
		"\x19\x03\x02\x02\x02\x02\x1B\x03\x02\x02\x02\x02\x1D\x03\x02\x02\x02\x02"+
		"\x1F\x03\x02\x02\x02\x02!\x03\x02\x02\x02\x02#\x03\x02\x02\x02\x02%\x03"+
		"\x02\x02\x02\x02\'\x03\x02\x02\x02\x02)\x03\x02\x02\x02\x02+\x03\x02\x02"+
		"\x02\x02-\x03\x02\x02\x02\x02/\x03\x02\x02\x02\x021\x03\x02\x02\x02\x03"+
		"4\x03\x02\x02\x02\x05:\x03\x02\x02\x02\x07H\x03\x02\x02\x02\tS\x03\x02"+
		"\x02\x02\vY\x03\x02\x02\x02\r_\x03\x02\x02\x02\x0Ff\x03\x02\x02\x02\x11"+
		"k\x03\x02\x02\x02\x13q\x03\x02\x02\x02\x15z\x03\x02\x02\x02\x17\x83\x03"+
		"\x02\x02\x02\x19\x95\x03\x02\x02\x02\x1B\x97\x03\x02\x02\x02\x1D\xA0\x03"+
		"\x02\x02\x02\x1F\xA2\x03\x02\x02\x02!\xA4\x03\x02\x02\x02#\xA6\x03\x02"+
		"\x02\x02%\xA8\x03\x02\x02\x02\'\xAA\x03\x02\x02\x02)\xAC\x03\x02\x02\x02"+
		"+\xAE\x03\x02\x02\x02-\xB0\x03\x02\x02\x02/\xB2\x03\x02\x02\x021\xBD\x03"+
		"\x02\x02\x0235\t\x02\x02\x0243\x03\x02\x02\x0256\x03\x02\x02\x0264\x03"+
		"\x02\x02\x0267\x03\x02\x02\x0278\x03\x02\x02\x0289\b\x02\x02\x029\x04"+
		"\x03\x02\x02\x02:;\x071\x02\x02;<\x07,\x02\x02<@\x03\x02\x02\x02=?\v\x02"+
		"\x02\x02>=\x03\x02\x02\x02?B\x03\x02\x02\x02@A\x03\x02\x02\x02@>\x03\x02"+
		"\x02\x02AC\x03\x02\x02\x02B@\x03\x02\x02\x02CD\x07,\x02\x02DE\x071\x02"+
		"\x02EF\x03\x02\x02\x02FG\b\x03\x02\x02G\x06\x03\x02\x02\x02HI\x071\x02"+
		"\x02IJ\x071\x02\x02JN\x03\x02\x02\x02KM\n\x03\x02\x02LK\x03\x02\x02\x02"+
		"MP\x03\x02\x02\x02NL\x03\x02\x02\x02NO\x03\x02\x02\x02OQ\x03\x02\x02\x02"+
		"PN\x03\x02\x02\x02QR\b\x04\x02\x02R\b\x03\x02\x02\x02ST\x07K\x02\x02T"+
		"U\x07p\x02\x02UV\x07r\x02\x02VW\x07w\x02\x02WX\x07v\x02\x02X\n\x03\x02"+
		"\x02\x02YZ\x07R\x02\x02Z[\x07j\x02\x02[\\\x07c\x02\x02\\]\x07u\x02\x02"+
		"]^\x07g\x02\x02^\f\x03\x02\x02\x02_`\x07R\x02\x02`a\x07j\x02\x02ab\x07"+
		"c\x02\x02bc\x07u\x02\x02cd\x07g\x02\x02de\x07u\x02\x02e\x0E\x03\x02\x02"+
		"\x02fg\x07T\x02\x02gh\x07w\x02\x02hi\x07n\x02\x02ij\x07g\x02\x02j\x10"+
		"\x03\x02\x02\x02kl\x07O\x02\x02lm\x07c\x02\x02mn\x07e\x02\x02no\x07t\x02"+
		"\x02op\x07q\x02\x02p\x12\x03\x02\x02\x02qr\x07R\x02\x02rs\x07t\x02\x02"+
		"st\x07k\x02\x02tu\x07q\x02\x02uv\x07t\x02\x02vw\x07k\x02\x02wx\x07v\x02"+
		"\x02xy\x07{\x02\x02y\x14\x03\x02\x02\x02z{\x07V\x02\x02{|\x07g\x02\x02"+
		"|}\x07o\x02\x02}~\x07r\x02\x02~\x7F\x07n\x02\x02\x7F\x80\x07c\x02\x02"+
		"\x80\x81\x07v\x02\x02\x81\x82\x07g\x02\x02\x82\x16\x03\x02\x02\x02\x83"+
		"\x87\t\x04\x02\x02\x84\x86\t\x05\x02\x02\x85\x84\x03\x02\x02\x02\x86\x89"+
		"\x03\x02\x02\x02\x87\x85\x03\x02\x02\x02\x87\x88\x03\x02\x02\x02\x88\x18"+
		"\x03\x02\x02\x02\x89\x87\x03\x02\x02\x02\x8A\x8E\t\x06\x02\x02\x8B\x8D"+
		"\t\x07\x02\x02\x8C\x8B\x03\x02\x02\x02\x8D\x90\x03\x02\x02\x02\x8E\x8C"+
		"\x03\x02\x02\x02\x8E\x8F\x03\x02\x02\x02\x8F\x96\x03\x02\x02\x02\x90\x8E"+
		"\x03\x02\x02\x02\x91\x92\x07$\x02\x02\x92\x93\x05\x19\r\x02\x93\x94\x07"+
		"$\x02\x02\x94\x96\x03\x02\x02\x02\x95\x8A\x03\x02\x02\x02\x95\x91\x03"+
		"\x02\x02\x02\x96\x1A\x03\x02\x02\x02\x97\x9B\x07$\x02\x02\x98\x9A\v\x02"+
		"\x02\x02\x99\x98\x03\x02\x02\x02\x9A\x9D\x03\x02\x02\x02\x9B\x9C\x03\x02"+
		"\x02\x02\x9B\x99\x03\x02\x02\x02\x9C\x9E\x03\x02\x02\x02\x9D\x9B\x03\x02"+
		"\x02\x02\x9E\x9F\x07$\x02\x02\x9F\x1C\x03\x02\x02\x02\xA0\xA1\x07?\x02"+
		"\x02\xA1\x1E\x03\x02\x02\x02\xA2\xA3\x070\x02\x02\xA3 \x03\x02\x02\x02"+
		"\xA4\xA5\x07.\x02\x02\xA5\"\x03\x02\x02\x02\xA6\xA7\x07~\x02\x02\xA7$"+
		"\x03\x02\x02\x02\xA8\xA9\x07*\x02\x02\xA9&\x03\x02\x02\x02\xAA\xAB\x07"+
		"+\x02\x02\xAB(\x03\x02\x02\x02\xAC\xAD\x07<\x02\x02\xAD*\x03\x02\x02\x02"+
		"\xAE\xAF\x07}\x02\x02\xAF,\x03\x02\x02\x02\xB0\xB1\x07\x7F\x02\x02\xB1"+
		".\x03\x02\x02\x02\xB2\xB3\x07/\x02\x02\xB3\xB4\x07/\x02\x02\xB4\xB5\x07"+
		"@\x02\x02\xB50\x03\x02\x02\x02\xB6\xB7\x07?\x02\x02\xB7\xBE\x07?\x02\x02"+
		"\xB8\xBE\t\b\x02\x02\xB9\xBA\x07>\x02\x02\xBA\xBE\x07?\x02\x02\xBB\xBC"+
		"\x07@\x02\x02\xBC\xBE\x07?\x02\x02\xBD\xB6\x03\x02\x02\x02\xBD\xB8\x03"+
		"\x02\x02\x02\xBD\xB9\x03\x02\x02\x02\xBD\xBB\x03\x02\x02\x02\xBE2\x03"+
		"\x02\x02\x02\v\x026@N\x87\x8E\x95\x9B\xBD\x03\b\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!JapeLexer.__ATN) {
			JapeLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(JapeLexer._serializedATN));
		}

		return JapeLexer.__ATN;
	}

}

