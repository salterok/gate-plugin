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
    PHASES ALIAS_SEPARATOR PHASE_NAME*
    ;

// -------------- single phase -------------------

singlePhase:
    importsDecl?
    phaseDecl
    (inputDecl)*
    (optionsDecl | templateDecl)*
    (ruleDecl|macroDecl)*
    ;

importsDecl:
    IMPORTS ALIAS_SEPARATOR RULE_ENTRY_OPEN JAVA_CODE RULE_ENTRY_CLOSE;

inputDecl:
    INPUT ALIAS_SEPARATOR IDENTIFIER+;
    
phaseDecl:
    PHASE ALIAS_SEPARATOR IDENTIFIER;

optionsDecl:
    OPTIONS ALIAS_SEPARATOR (IDENTIFIER ASSIGNMENT IDENTIFIER)+;

templateDecl:
    TEMPLATE ALIAS_SEPARATOR IDENTIFIER ASSIGNMENT refValue;

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
    : GROUP_OPEN ruleBlockContent GROUP_CLOSE ruleBlockContentQuantifier? (ALIAS_SEPARATOR IDENTIFIER)?
    ;

ruleBlockContent
    : ruleBlockContent RULE_SEPARATOR? ruleBlockContent
    | GROUP_OPEN ruleBlockContent GROUP_CLOSE ruleBlockContentQuantifier? (ALIAS_SEPARATOR IDENTIFIER)?
    | ruleEntry
    | IDENTIFIER
    ;

ruleBlockContentQuantifier
    : RULE_KLEENE_OPERATOR
    | RANGE_OPEN INT (ENTRIES_SEPARATOR INT)? RANGE_CLOSE
    ;

ruleEntry
    : RULE_ENTRY_OPEN ruleClause (ENTRIES_SEPARATOR ruleClause)* RULE_ENTRY_CLOSE
    ;

ruleClause
    : IDENTIFIER
    | IDENTIFIER CONTEXT_OPERATORS (ruleEntry|IDENTIFIER)
    | IDENTIFIER (ACCESSOR|VIRTUAL_ACCESSOR) IDENTIFIER COMPARE refValue 
    ;

// -------------------- RHS --------------------------
rhs
    : rhs ENTRIES_SEPARATOR rhs
    | rhsEntry
    ;

rhsEntry
    : japeRhs
    | (ALIAS_SEPARATOR IDENTIFIER)? RULE_ENTRY_OPEN JAVA_CODE RULE_ENTRY_CLOSE
    ;

japeRhs
    : ALIAS_SEPARATOR IDENTIFIER ACCESSOR name=IDENTIFIER ASSIGNMENT japeRhsAnnotation
    ;

japeRhsAnnotation
    : RULE_ENTRY_OPEN RULE_ENTRY_CLOSE
    | RULE_ENTRY_OPEN japeRhsAnnotationField (ENTRIES_SEPARATOR japeRhsAnnotationField)* RULE_ENTRY_CLOSE
    ;

japeRhsAnnotationField
    : IDENTIFIER ASSIGNMENT japeRhsAnnotationFieldValue
    ;

japeRhsAnnotationFieldValue
    : 
    | ALIAS_SEPARATOR IDENTIFIER ACCESSOR IDENTIFIER (ACCESSOR|VIRTUAL_ACCESSOR) IDENTIFIER
    | refValue
    ;

// -------------------- BASIC -------------------------

refValue
    : value
    | RANGE_OPEN IDENTIFIER (IDENTIFIER ASSIGNMENT refValue)* RANGE_CLOSE
    ;

value
    : IDENTIFIER
    | STRING
    | INT
    ;
