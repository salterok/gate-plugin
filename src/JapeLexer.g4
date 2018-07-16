
lexer grammar JapeLexer;

WS
    : [ \r\t\n]+ -> skip
    ;
BLOCK_COMMENT
    : '/*' .*? '*/' -> skip
	;
LINE_COMMENT
	: '//' ~[\r\n]* -> skip
	;


INPUT: 'Input';
PHASE: 'Phase';
MULTI_PHASE: 'MultiPhase';
PHASES: 'Phases';
OPTIONS: 'Options';
RULE: 'Rule';
MACRO: 'Macro';
PRIORITY: 'Priority';
TEMPLATE: 'Template';

INT: [1-9] [0-9]*;

IDENTIFIER
    : [a-zA-Z] [a-zA-Z0-9_]* 
    | '"' IDENTIFIER '"'
    ;

STRING
    : '"' .*? '"'
    ;

ASSIGNMENT: '=';
ACCESSOR: '.';
VIRTUAL_ACCESSOR: '@';
ENTRIES_SEPARATOR: ',';
RULE_SEPARATOR: '|';
GROUP_OPEN: '(';
GROUP_CLOSE: ')';
ALIAS_SEPARATOR: ':';
RULE_ENTRY_OPEN: '{';
RULE_ENTRY_CLOSE: '}';
RULE_KLEENE_OPERATOR: '?' | '*' | '+';

RHS_SEPARATOR: '-->';

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

// TODO: add contains, notContains, within, notWithin operators
