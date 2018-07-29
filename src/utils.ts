/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-07-12 03:04:15 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-16 22:53:51
 */

import * as vscode from "vscode";
import { Token, ParserRuleContext } from "antlr4ts"
import { NodeRange, NodePosition } from "./JapeSyntaxDefinitions";

export class Place {

    static positionFromToken(token: Token | undefined): NodePosition {
        if (!token) {
            throw new Error("Token is not defined");
        }
        return { line: token.line - 1, character: token.charPositionInLine };
    }

    static rangeFromToken(ctxNode: ParserRuleContext): NodeRange
    static rangeFromToken(start: Token, end: Token | undefined): NodeRange
    static rangeFromToken(ctxNode: Token | ParserRuleContext, end?: Token | undefined): NodeRange {
        let startNode = ctxNode instanceof ParserRuleContext ? ctxNode.start : ctxNode;
        let endNode = ctxNode instanceof ParserRuleContext ? ctxNode.stop : end;

        if (!endNode) {
            throw new Error("Token is not defined");
        }
        return { start: Place.positionFromToken(startNode), end: Place.positionFromToken(endNode) };
    }

    static toVsCodePosition(pos: NodePosition) {
        return new vscode.Position(pos.line, pos.character);
    }

    static toVsCodeRange(range: NodeRange) {
        return new vscode.Range(
            Place.toVsCodePosition(range.start),
            Place.toVsCodePosition(range.end),
        );
    }
}
