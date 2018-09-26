/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-09-25 19:07:45 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-09-25 20:27:01
 */

import { assert } from "chai";

function parseRule(text: string) {
    return parse(text, (parser, visitor) => {
        return visitor.visitRuleDecl(parser.ruleDecl());
    });
}

function parseRuleEntry(text: string) {
    return parse(text, (parser, visitor) => {
        return visitor.visitRuleEntry(parser.ruleEntry());
    });
}

function parseRuleClause(text: string) {
    return parse(text, (parser, visitor) => {
        return visitor.visitRuleClause(parser.ruleClause());
    });
}

describe("parser", function() {

    describe("rule", function() {

        describe("shape", function() {

            const text = `
                Rule: IngredientName
                Priority: 1
                (
                    { Lookup.majorType == "ingredient" }
                ): label
                --> 
                :label.IngredientName = { rule = "IngredientName" }
            `;

            it("name", function() {
                const result = parseRule(text);
        
                assert.equal(result.name, "IngredientName");
            });

        });
        
        describe.skip("context", function() {

            const text = `
                Rule: YearContext1
                (
                    {Token.string == "in"} |
                    {Token.string == "by"} 
                )
                (YEAR)
                :date -->
                :date.Timex = {kind = "date", rule = "YearContext1"}
            `;

            const text2 = `
                Macro: Emailaddress1
                (
                    {Token.string == ‘<’}
                )
                (
                    (EMAIL)
                )
                :email
                (
                    {Token.string == ‘>’}
                )
            `;

            it("behind", function() {
                const result = parseRule(text);
        
                assert.equal(result.name, "IngredientName");
            });



            it("ahead", function() {
                const result = parseRule(text2);
        
                assert.equal(result.name, "IngredientName");
            });

            it("behind & ahead", function() {
                const result = parseRule(text2);
        
                assert.equal(result.name, "IngredientName");
            });

        });
    });

    describe("rule entry", function() {

        describe("clause count", function() {
            it("zero clause", function() {
                assert.throws(() => {
                    const text = `
                        { }
                    `;
    
                    const result = parseRuleEntry(text);
            
                    assert.equal(result.clauses.length, 0);
                });
                
            });
    
            it("single clause", function() {
                const text = `
                    { Lookup.majorType == "ingredient" }
                `;
    
                const result = parseRuleEntry(text);
        
                assert.equal(result.clauses.length, 1);
            });
    
            it("multi clause", function() {
                const text = `
                    { Lookup.majorType == "ingredient", Lookup.minorType == "liquid", Lookup.custom == "bb" }
                `;
    
                const result = parseRuleEntry(text);
        
                assert.equal(result.clauses.length, 3);
            });
        });

        it("full", function() {
            const text = `
                Lookup.majorType == "ingredient"
            `;

            const result = parseRuleClause(text);

            assert.sameOrderedMembers(result.path, ["Lookup", "majorType"]);
            assert.equal(result.operation, "==");
            assert.equal(result.value, '"ingredient"');
        });

        it("only type", function() {
            const text = `
                { Lookup }
            `;

            const result = parseRuleEntry(text);

            assert.sameOrderedMembers(result.clauses[0].path, ["Lookup"]);
            assert.equal(result.clauses[0].operation, undefined);
            assert.equal(result.clauses[0].value, undefined);
        });

        it("only type negation", function() {
            const text = `
                { !Lookup }
            `;

            const result = parseRuleEntry(text);

            assert.sameOrderedMembers(result.clauses[0].path, ["Lookup"]);
            assert.equal(result.clauses[0].operation, undefined);
            assert.equal(result.clauses[0].value, undefined);
        });

        it("constraint negation", function() {
            const text = `
                { !Token.string ==~ "[Dd]e" }
            `;

            const result = parseRuleEntry(text);

            assert.sameOrderedMembers(result.clauses[0].path, ["Token", "string"]);
        });

        it("only type custom", function() {
            const text = `
                { "html:table" }
            `;

            const result = parseRuleEntry(text);

            assert.sameOrderedMembers(result.clauses[0].path, ['"html:table"']);
            assert.equal(result.clauses[0].operation, undefined);
            assert.equal(result.clauses[0].value, undefined);
        });

        it("custom features", function() {
            const text = `
                { element."xsi:type" == "xs:string" }
            `;

            const result = parseRuleEntry(text);

            assert.sameOrderedMembers(result.clauses[0].path, ["element", '"xsi:type"']);
            assert.equal(result.clauses[0].value, '"xs:string"');
        });

        describe("operations", function() {

            it("equal", function() {
                const text = `
                    { Lookup.majorType == "ingredient", Lookup.minorType != "liquid" }
                `;
    
                const result = parseRuleEntry(text);
    
                assert.equal(result.clauses[0].operation, "==");
                assert.equal(result.clauses[1].operation, "!=");
            });    
    
            it("strong comparison", function() {
                const text = `
                    { Token.string > "aardvark", Token.length < 10 }
                `;
    
                const result = parseRuleEntry(text);
    
                assert.equal(result.clauses[0].operation, ">");
                assert.equal(result.clauses[1].operation, "<");
            });

            it("weak comparison", function() {
                const text = `
                    { Token.length >= 2, Token.length <= 10 }
                `;
    
                const result = parseRuleEntry(text);
    
                assert.equal(result.clauses[0].operation, ">=");
                assert.equal(result.clauses[1].operation, "<=");
            });

            it("regular expression", function() {
                const text = `
                    { Token.string =~ "[Dd]ogs", Token.string !~ "(?i)hello" }
                `;
    
                const result = parseRuleEntry(text);
    
                assert.equal(result.clauses[0].operation, "=~");
                assert.equal(result.clauses[1].operation, "!~");
            });

            it("whole string regular expression", function() {
                const text = `
                    { Token.string ==~ "[Dd]ogs", Token.string !=~ "(?i)hello" }
                `;
    
                const result = parseRuleEntry(text);
    
                assert.equal(result.clauses[0].operation, "==~");
                assert.equal(result.clauses[1].operation, "!=~");
            });
    
            it("contains", function() {
                const text = `
                    { X contains Y, X notContains Y },
                `;
    
                const result = parseRuleEntry(text);
    
                assert.equal(result.clauses[0].operation, "contains");
                assert.equal(result.clauses[1].operation, "notContains");
            });

            it("within", function() {
                const text = `
                    { X within Y, X notWithin Y }
                `;
    
                const result = parseRuleEntry(text);
    
                assert.equal(result.clauses[0].operation, "within");
                assert.equal(result.clauses[1].operation, "notWithin");
            });

            it("within other constraint", function() {
                const text = `
                    { X within { Y.foo == bar } }
                `;

                const result = parseRuleEntry(text);

                assert.equal(result.clauses[0].operation, "contains");
            });

        });

        describe("meta properties", function() {
            it.skip("", function() {
                const text = `
                    { Lookup@length > 5, Lookup@string ==~ "\s*Text", Lookup@cleanString ==~ "Text" }
                `;
    
                const result = parseRuleEntry(text);
    
                assert.sameOrderedMembers(result.clauses[0].path, ["Lookup", "length"]);
                assert.equal(result.clauses[1].path, ["Lookup", "string"]);
                assert.equal(result.clauses[2].path, ["Lookup", "cleanString"]);
            });
        });
        

        it.skip("", function() {
            const text = `
                Lookup.majorType == "ingredient"
            `;

            const result = parseRuleClause(text);

            assert.equal(result.operation, "==");
        });

    });
    

});
