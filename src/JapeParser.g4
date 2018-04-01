parser grammar JapeParser;

options { tokenVocab=JapeLexer; }


program:
    phaseDecl
    (inputDecl)*
    (ruleDecl)*
    ;

inputDecl:
    INPUT ALIAS_SEPARATOR IDENTIFIER+;
    
phaseDecl:
    PHASE ALIAS_SEPARATOR IDENTIFIER;

// -------------------- RULE --------------------------
ruleDecl
    : ruleName rulePriority? ruleBlock RHS_SEPARATOR rhs
    ;

ruleName
    : RULE ALIAS_SEPARATOR IDENTIFIER
    ;

rulePriority
    : PRIORITY ALIAS_SEPARATOR INT
    ;

ruleBlock
    : GROUP_OPEN (ruleEntry|ruleBlock) (RULE_SEPARATOR (ruleEntry|ruleBlock))* GROUP_CLOSE (ALIAS_SEPARATOR IDENTIFIER)?
    ;

ruleEntry
    : RULE_ENTRY_OPEN ruleClause (ENTRIES_SEPARATOR ruleClause)* RULE_ENTRY_CLOSE
    ;

ruleClause
    : IDENTIFIER (ACCESSOR IDENTIFIER)? (COMPARE value)?
    ;

// -------------------- RHS --------------------------
rhs
    : rhsEntry (ENTRIES_SEPARATOR rhsEntry)*
    ;

rhsEntry
    : japeRhs
    ;

japeRhs
    : ALIAS_SEPARATOR IDENTIFIER ACCESSOR IDENTIFIER ASSIGNMENT japeRhsAnnotation
    ;

japeRhsAnnotation
    : RULE_ENTRY_OPEN japeRhsAnnotationField (ENTRIES_SEPARATOR japeRhsAnnotationField)* RULE_ENTRY_CLOSE
    ;

japeRhsAnnotationField
    : IDENTIFIER ASSIGNMENT value
    ;

// -------------------- BASIC -------------------------
value
    : IDENTIFIER
    | STRING
    | INT
    ;
