/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-09-17 18:07:18 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-09-17 19:36:12
 */

import { JapeLexer } from "../../../src/parser/JapeLexer";

describe("multi phase", function() {
    it("regular", function() {        
        const text = `
            MultiPhase: Main

            Phases:
            basic
            result
        `;

        checkTokens(text, [
            { type: JapeLexer.MULTI_PHASE },
            null,
            { type: JapeLexer.IDENTIFIER, text: "Main" },
            { type: JapeLexer.PHASES },
            null,
            { type: JapeLexer.PHASE_NAME, text: "basic" },
            { type: JapeLexer.PHASE_NAME, text: "result" },
        ]);
    });

    it("with relative path", function() {
        const text = `
            MultiPhase: Main

            Phases:
            quantity/index
            ingredients/index
        `;

        checkTokens(text, [
            { type: JapeLexer.MULTI_PHASE },
            null,
            { type: JapeLexer.IDENTIFIER, text: "Main" },
            { type: JapeLexer.PHASES },
            null,
            { type: JapeLexer.PHASE_NAME, text: "quantity/index" },
            { type: JapeLexer.PHASE_NAME, text: "ingredients/index" },
        ]);
    });

    it("with white spaces", function() {
        const text = `
            MultiPhase: Main

            Phases:
              basic  
                    quantity/index  
            
        `;

        checkTokens(text, [
            { type: JapeLexer.MULTI_PHASE },
            null,
            { type: JapeLexer.IDENTIFIER, text: "Main" },
            { type: JapeLexer.PHASES },
            null,
            { type: JapeLexer.PHASE_NAME, text: "basic  " },
            { type: JapeLexer.PHASE_NAME, text: "quantity/index  " },
        ]);
    });

    it("with blank lines", function() {
        const text = `
            MultiPhase: Main

            Phases:
            
            basic

            quantity/index

            ingredients/index
        `;

        checkTokens(text, [
            { type: JapeLexer.MULTI_PHASE },
            null,
            { type: JapeLexer.IDENTIFIER, text: "Main" },
            { type: JapeLexer.PHASES },
            null,
            { type: JapeLexer.PHASE_NAME, text: "basic" },
            { type: JapeLexer.PHASE_NAME, text: "quantity/index" },
            { type: JapeLexer.PHASE_NAME, text: "ingredients/index" },
        ]);
    });

    it("no phases", function() {
        const text = `
            MultiPhase: Main

            some other stuff
        `;

        checkTokens(text, [
            { type: JapeLexer.MULTI_PHASE },
            null,
            { type: JapeLexer.IDENTIFIER, text: "Main" },
            { type: JapeLexer.PHASE_NAME },
        ], false);

    });
});
