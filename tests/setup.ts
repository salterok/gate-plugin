/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-09-17 19:28:30 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-09-25 20:30:14
 */
import * as antlr4ts from "antlr4ts";
import * as _ from "lodash";
import { assert } from "chai";
import { JapeLexer } from "../src/parser/JapeLexer";
import { JapeParser } from "../src/parser/JapeParser";
import { JapeParserVisitor } from "../src/JapeParserVisitor";

function _tokenize(text: string) {
    const chars = new antlr4ts.ANTLRInputStream(text);
    const lexer = new JapeLexer(chars);
    const tokenStream = new antlr4ts.CommonTokenStream(lexer);

    tokenStream.fill();
    return tokenStream.getTokens().map(token => _.pick(token, ["type", "text", "line", "charPositionInLine"]));
}

function _checkTokens(text: string, expectedTokens: any[], match = true) {
    const tokens = _tokenize(text);

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

function _parse<T>(text: string, fn: (parser: JapeParser, visitor: JapeParserVisitor) => T): T {

    const chars = new antlr4ts.ANTLRInputStream(text);
    const lexer = new JapeLexer(chars);
    const tokenStream = new antlr4ts.CommonTokenStream(lexer);

    tokenStream.fill();
    const parser = new JapeParser(tokenStream);
    parser.buildParseTree = true;

    const visitor = new JapeParserVisitor();
    
    return fn(parser, visitor);;
}

declare global {
    function checkTokens(text: string, expectedTokens: any[], match?: boolean): void;
    function parse<T>(text: string, fn: (parser: JapeParser, visitor: JapeParserVisitor) => T): T;
}

Object.assign(global, {
    checkTokens: _checkTokens,
    parse: _parse,
});
