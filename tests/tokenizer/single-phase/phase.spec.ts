/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-09-17 19:41:56 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-09-17 19:43:56
 */

import { JapeLexer } from "../../../src/parser/JapeLexer";

describe("single phase", function() {

    describe("input", function() {
        
        it("regular", function() {
            const text = `
                Phase: PhaseName
            `;
    
            checkTokens(text, [
                { type: JapeLexer.PHASE },
                null,
                { type: JapeLexer.IDENTIFIER, text: "PhaseName" },
            ]);
        });

        it("custom name", function() {
            const text = `
                Phase: "Some name_with  spaces"
            `;
    
            checkTokens(text, [
                { type: JapeLexer.PHASE },
                null,
                { type: JapeLexer.IDENTIFIER, text: '"Some name_with  spaces"' },
            ]);
        });

    });

});
