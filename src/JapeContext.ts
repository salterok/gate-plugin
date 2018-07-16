/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-07-05 00:18:32 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-16 22:27:56
 */

import * as antlr4ts from "antlr4ts";

import { JapeParserVisitor } from "./JapeParserVisitor";
import { Phase, NodeRange } from "./JapeSyntaxDefinitions";
import { JapeLexer } from "./parser/JapeLexer";

export class JapeContext {

    private map = new Map<string, Phase>();

    loadFromSource(key: string, source: string) {
        const cLexer = require("./parser/JapeLexer");
        const cParser = require("./parser/JapeParser");

        // const chars = new antlr4.InputStream(source);
        const chars = new antlr4ts.ANTLRInputStream(source);
        const lexer = new cLexer.JapeLexer(chars);
        const tokens = new antlr4ts.CommonTokenStream(lexer);
        const parser = new cParser.JapeParser(tokens);
        // parser.addParseListener(new JapeParserVisitor());
        parser.buildParseTrees = true;

        const tree = parser.program();

        const visitor = new JapeParserVisitor();

        const result = visitor.visit(tree);

        this.map.set(key, result);
        
        return result;
    }

    findRule(key: string, position: number) {
        const tree = this.map.get(key);
        if (!tree) {
            return undefined;
        }
        for (let index = 0; index < tree.rules.length; index++) {
            const rule = tree.rules[index];

            if (position >= rule.start && position < rule.stop) {
                return tree.rules[index];
            }

            if (position < rule.start) {
                return tree.rules[index - 1];
            }
        }
    }

    getReference(key: string, name: string, context: "annotation" | "macro"): JapeSymbolReference | null {
        const tree = this.map.get(key);
        if (!tree) {
            return null;
        }

        if (context === "macro") {
            const symbol = this.getSymbols(key).find(s => s.name === name);
            if (!symbol) {
                return null;
            }
            return { name, refs: [{ key: key, range: symbol.range }] };
        }
        
        const input = tree.inputs.find(i => i === name);
        if (!input) {
            return null;
        }
        return { name, refs: [] };
    }

    getSymbols(key: string) {
        const tree = this.map.get(key);
        if (!tree) {
            return [];
        }

        return tree.macros.map(m => ({
            name: m.name,
            range: m.place,
            start: m.start
        }));
    }

    static getLiteral(code: number) {
        const literal = JapeLexer.VOCABULARY.getLiteralName(code);
        return literal && literal.substring(1, literal.length - 1);
    }

}

export default new JapeContext();

export interface JapeSymbolReference {
    name: string;
    
    refs: {
        key: string;
        range: NodeRange;
    }[];
}