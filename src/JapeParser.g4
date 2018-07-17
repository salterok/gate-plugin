parser grammar JapeParser;

options { tokenVocab=JapeLexer; }


program
    : multiPhase
    | singlePhase
    ;

// -------------- multi phase -------------------
multiPhase: 
    multiPhaseDecl
    phasesDecl
    ;


multiPhaseDecl:
    MULTI_PHASE ALIAS_SEPARATOR IDENTIFIER;

phasesDecl:
    PHASES ALIAS_SEPARATOR IDENTIFIER*
    ;

// -------------- single phase -------------------

singlePhase:
    phaseDecl
    (inputDecl)*
    optionsDecl?
    (ruleDecl|macroDecl)*
    ;

inputDecl:
    INPUT ALIAS_SEPARATOR IDENTIFIER+;
    
phaseDecl:
    PHASE ALIAS_SEPARATOR IDENTIFIER;

optionsDecl:
    OPTIONS ALIAS_SEPARATOR (IDENTIFIER ASSIGNMENT IDENTIFIER)+;

// -------------------- MACRO --------------------------
// TODO: check if macro can have priority, seems like can't
macroDecl
    : macroName ruleBlock
    ;

macroName
    : MACRO ALIAS_SEPARATOR IDENTIFIER
    ;
    
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
    : GROUP_OPEN ruleBlockContent GROUP_CLOSE RULE_KLEENE_OPERATOR? (ALIAS_SEPARATOR IDENTIFIER)?
    ;

ruleBlockContent
    : ruleBlockContent RULE_SEPARATOR? ruleBlockContent
    | GROUP_OPEN ruleBlockContent GROUP_CLOSE RULE_KLEENE_OPERATOR? (ALIAS_SEPARATOR IDENTIFIER)?
    | ruleEntry
    | IDENTIFIER
    ;

ruleEntry
    : RULE_ENTRY_OPEN ruleClause (ENTRIES_SEPARATOR ruleClause)* RULE_ENTRY_CLOSE
    ;

ruleClause
    : IDENTIFIER
    | IDENTIFIER CONTEXT_OPERATORS IDENTIFIER
    | IDENTIFIER (ACCESSOR|VIRTUAL_ACCESSOR) IDENTIFIER COMPARE value 
    ;

// -------------------- RHS --------------------------
rhs
    : rhs ENTRIES_SEPARATOR rhs
    | rhsEntry
    ;

rhsEntry
    : japeRhs
    | (ALIAS_SEPARATOR IDENTIFIER)? RULE_ENTRY_OPEN .*? RULE_ENTRY_CLOSE
    ;

japeRhs
    : ALIAS_SEPARATOR IDENTIFIER ACCESSOR IDENTIFIER ASSIGNMENT japeRhsAnnotation
    ;

japeRhsAnnotation
    : RULE_ENTRY_OPEN japeRhsAnnotationField (ENTRIES_SEPARATOR japeRhsAnnotationField)* RULE_ENTRY_CLOSE
    ;

japeRhsAnnotationField
    : IDENTIFIER ASSIGNMENT japeRhsAnnotationFieldValue
    ;

japeRhsAnnotationFieldValue
    : 
    | ALIAS_SEPARATOR IDENTIFIER ACCESSOR IDENTIFIER (ACCESSOR|VIRTUAL_ACCESSOR) IDENTIFIER
    | value
    ;

// -------------------- BASIC -------------------------
value
    : IDENTIFIER
    | STRING
    | INT
    ;
