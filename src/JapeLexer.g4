
lexer grammar JapeLexer;

tokens { JAVA_CODE }

@lexer::members {
private _curlyBraceOpenCnt = 0;
private _javaImports = false;
private _rhsMode = false;
private _justHitAssignment = false;

private exitOnCloseBracketMatch() {
    if (this._curlyBraceOpenCnt > 0) {
        this.more();
        this._curlyBraceOpenCnt--;
        return;
    }
    this._curlyBraceOpenCnt = 0;
    this._input.seek(this.inputStream.index - 1);
    this.type = this.constructor.JAVA_CODE;
    this.emit();
    this.popMode();
}

}

WS
    : [ \r\t\n]+ -> skip
    ;
BLOCK_COMMENT
    : '/*' .*? '*/' -> skip
	;
LINE_COMMENT
	: '//' ~[\r\n]* -> skip
	;

IMPORTS: 'Imports' { this._javaImports = true; };
INPUT: 'Input';
PHASE: 'Phase';
MULTI_PHASE: 'MultiPhase';
PHASES: 'Phases';
OPTIONS: 'Options';
RULE: 'Rule' { this._rhsMode = false; };
MACRO: 'Macro' { this._rhsMode = false; };
PRIORITY: 'Priority';
TEMPLATE: 'Template' { this._rhsMode = false; };

INT: [1-9] [0-9]*;

CONTEXT_OPERATORS
    : 'contains'
    | 'notContains'
    | 'within'
    | 'notWithin'
    ;

IDENTIFIER
    : [a-zA-Z] [a-zA-Z0-9_]* 
    | '"' IDENTIFIER '"'
    ;

STRING
    : '"' .*? '"'
    ;

ASSIGNMENT: '=' { this._justHitAssignment = this._rhsMode; };
ACCESSOR: '.';
VIRTUAL_ACCESSOR: '@';
ENTRIES_SEPARATOR: ',';
RULE_SEPARATOR: '|';
GROUP_OPEN: '(';
GROUP_CLOSE: ')';
RANGE_OPEN: '[';
RANGE_CLOSE: ']';
ALIAS_SEPARATOR: ':';
RULE_ENTRY_OPEN: '{' {
    if (this._javaImports) {
        this.pushMode(JapeLexer.JAVA_BLOCK)
    };
    if (this._rhsMode && !this._justHitAssignment) {
        this.pushMode(JapeLexer.JAVA_BLOCK)
    };
    this._javaImports = false;
    this._justHitAssignment = false;
};
RULE_ENTRY_CLOSE: '}';
RULE_KLEENE_OPERATOR: '?' | '*' | '+';

COMPARE
    : '=='
    | '=~'
    | '!='
    | '!~'
    | '>'
    | '<'
    | '<='
    | '>='
    | '==~'
    | '!=~'
    ;

RHS_SEPARATOR: '-->' { this._rhsMode = true; };

// OTHER: . -> skip;

mode JAVA_BLOCK;

fragment BLOCK_CONTENT: ~[{}]+;

OPEN_BRACE: '{' { this._curlyBraceOpenCnt++; } -> more;
CLOSE_BRACE: '}' { this.exitOnCloseBracketMatch(); };

ANY: . -> more;
