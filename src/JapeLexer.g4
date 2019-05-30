
lexer grammar JapeLexer;

tokens { JAVA_CODE, PHASE_NAME }

@lexer::members {
private _multiPhase = false;
private _phasesEntered = false;
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
    this.type = JapeLexer.JAVA_CODE;
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

MULTI_PHASE: 'MultiPhase' { this._multiPhase = true; };
PHASES: 'Phases' { this._phasesEntered = true; };

IMPORTS: 'Imports' { this._javaImports = true; };
INPUT: 'Input';
PHASE: 'Phase';
OPTIONS: 'Options';
RULE: 'Rule' { this._rhsMode = false; };
MACRO: 'Macro' { this._rhsMode = false; };
PRIORITY: 'Priority';
TEMPLATE: 'Template' { this._rhsMode = false; };

INT: [0-9]+;

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

ASSIGNMENT: '=' { this._justHitAssignment = true; };
ACCESSOR: '.';
VIRTUAL_ACCESSOR: '@';
ENTRIES_SEPARATOR: ',';
RULE_SEPARATOR: '|';
NEGATION: '!';
GROUP_OPEN: '(';
GROUP_CLOSE: ')';
RANGE_OPEN: '[';
RANGE_CLOSE: ']';
ALIAS_SEPARATOR: ':' {
    this._justHitAssignment = false;
    if (this._multiPhase && this._phasesEntered) {
        this.mode(JapeLexer.MULTI_PHASE_MODE);
    };
};
RULE_ENTRY_OPEN: '{' {
    if (this._javaImports) {
        this.pushMode(JapeLexer.JAVA_BLOCK_MODE);
        this._javaImports = false;
    };
    if (this._rhsMode && !this._justHitAssignment) {
        this.pushMode(JapeLexer.JAVA_BLOCK_MODE)
    };    
    this._justHitAssignment = false;
};
RULE_ENTRY_CLOSE: '}' {
    this._justHitAssignment = false;
};
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

mode JAVA_BLOCK_MODE;

fragment BLOCK_CONTENT: ~[{}]+;

OPEN_BRACE: '{' { this._curlyBraceOpenCnt++; } -> more;
CLOSE_BRACE: '}' { this.exitOnCloseBracketMatch(); };

ANY: . -> more;

mode MULTI_PHASE_MODE;

PHASE_NAME: ~[\r\n]+;

TO_SKIP: (BLOCK_COMMENT | LINE_COMMENT | WS | EOF) -> skip;

