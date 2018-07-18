
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

IMPORTS: 'Imports' -> pushMode(JAVA), skip;
// IMPORTS2: IMPORTS ALIAS_SEPARATOR RULE_ENTRY_OPEN -> pushMode(JAVA);

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

OTHER: . -> skip;

mode JAVA;

OPEN: '{' -> mode(JAVA_BLOCK), skip;
OTHER_JAVA: . -> skip;

mode JAVA_BLOCK;

fragment BLOCK_CONTENT: ~[{}]+;


CONTENT
    : BLOCK_CONTENT -> skip;

CONTENT_BLOCK: '{' (BLOCK_CONTENT|CONTENT_BLOCK) '}' -> skip;

CLOSE: '}' -> popMode, skip;
