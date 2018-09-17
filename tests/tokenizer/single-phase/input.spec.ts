/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-09-17 19:36:01 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-09-17 19:42:40
 */

import { JapeLexer } from "../../../src/parser/JapeLexer";

describe("single phase", function() {

    describe("input", function() {
        
        it("regular", function() {
            const text = `
                Input: Dependency1 Dependency2
            `;
    
            checkTokens(text, [
                { type: JapeLexer.INPUT },
                null,
                { type: JapeLexer.IDENTIFIER, text: "Dependency1" },
                { type: JapeLexer.IDENTIFIER, text: "Dependency2"},
            ]);
        });
    
        it("with formating", function() {
            const text = `
                Input: Dependency1 Dependency2
                    Dependency3     Dependency4     Dependency5
                    Dependency6
            `;
    
            checkTokens(text, [
                { type: JapeLexer.INPUT },
                null,
                { type: JapeLexer.IDENTIFIER, text: "Dependency1" },
                { type: JapeLexer.IDENTIFIER, text: "Dependency2"},
                { type: JapeLexer.IDENTIFIER, text: "Dependency3"},
                { type: JapeLexer.IDENTIFIER, text: "Dependency4"},
                { type: JapeLexer.IDENTIFIER, text: "Dependency5"},
                { type: JapeLexer.IDENTIFIER, text: "Dependency6"},
            ]);
        });

    });
    
});
