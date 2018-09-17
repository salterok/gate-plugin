/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-09-17 19:28:30 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-09-17 19:35:03
 */
import * as antlr4ts from "antlr4ts";
import * as _ from "lodash";
import { assert } from "chai";
import { JapeLexer } from "../src/parser/JapeLexer";

function tokenize(text: string) {
    const chars = new antlr4ts.ANTLRInputStream(text);
    const lexer = new JapeLexer(chars);
    const tokenStream = new antlr4ts.CommonTokenStream(lexer);

    tokenStream.fill();
    return tokenStream.getTokens().map(token => _.pick(token, ["type", "text", "line", "charPositionInLine"]));
}

function _checkTokens(text: string, expectedTokens: any[], match = true) {
    const tokens = tokenize(text);

    // remove fields that was not specified as expected
    for (let index = 0; index < expectedTokens.length; index++) {
        if (!expectedTokens[index]) {
            delete expectedTokens[index];
            delete tokens[index];
        }
        if (tokens[index]) {
            tokens[index] = _.pick(tokens[index], _.keys(expectedTokens[index])) as any;
        }
    }
    tokens.length = expectedTokens.length;

    if (match) {
        assert.sameDeepOrderedMembers(tokens, expectedTokens);
    }
    else {
        assert.notSameDeepOrderedMembers(tokens, expectedTokens);
    }
}

declare global {
    function checkTokens(text: string, expectedTokens: any[], match?: boolean): void;
}

Object.assign(global, {
    checkTokens: _checkTokens,
});
