/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-09-17 19:46:45 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-09-17 19:56:56
 */

import { JapeLexer } from "../../../src/parser/JapeLexer";

describe("single phase", function() {

    describe("input", function() {
        
        it("basic", function() {
            const text = `
                Rule: RuleName
                ()
            `;
    
            checkTokens(text, [
                { type: JapeLexer.RULE },
                null,
                { type: JapeLexer.IDENTIFIER, text: "RuleName" },
                { type: JapeLexer.GROUP_OPEN },
                { type: JapeLexer.GROUP_CLOSE },
            ]);
        });

        it("with priority", function() {
            const text = `
                Rule: RuleName
                Priority: 1
                ()
            `;
    
            checkTokens(text, [
                { type: JapeLexer.RULE },
                null,
                { type: JapeLexer.IDENTIFIER, text: "RuleName" },
                { type: JapeLexer.PRIORITY },
                null,
                { type: JapeLexer.INT, text: "1" },
                { type: JapeLexer.GROUP_OPEN },
                { type: JapeLexer.GROUP_CLOSE },
            ]);
        });
    
        it("with alias and rhs", function() {
            const text = `
                Rule: RuleName
                (): label
                --> 
                :label.SomeName = { }
            `;
    
            checkTokens(text, [
                { type: JapeLexer.RULE },
                null,
                { type: JapeLexer.IDENTIFIER, text: "RuleName" },
                { type: JapeLexer.GROUP_OPEN },
                { type: JapeLexer.GROUP_CLOSE },
                { type: JapeLexer.ALIAS_SEPARATOR },
                { type: JapeLexer.IDENTIFIER },
                { type: JapeLexer.RHS_SEPARATOR },
                { type: JapeLexer.ALIAS_SEPARATOR },
                { type: JapeLexer.IDENTIFIER },
                { type: JapeLexer.ACCESSOR },
                { type: JapeLexer.IDENTIFIER },
                { type: JapeLexer.ASSIGNMENT },
                { type: JapeLexer.RULE_ENTRY_OPEN },
                { type: JapeLexer.RULE_ENTRY_CLOSE },
            ]);
        });

        it("empty rhs no alias", function() {
            const text = `
                Rule: RuleName
                ()
                -->
                {}
            `;
    
            checkTokens(text, [
                { type: JapeLexer.RULE },
                null,
                { type: JapeLexer.IDENTIFIER, text: "RuleName" },
                { type: JapeLexer.GROUP_OPEN },
                { type: JapeLexer.GROUP_CLOSE },
                { type: JapeLexer.RHS_SEPARATOR },
                { type: JapeLexer.RULE_ENTRY_OPEN },
                { type: JapeLexer.RULE_ENTRY_CLOSE },
            ]);
        });

    });
    
});
