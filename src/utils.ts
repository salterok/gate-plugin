/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-07-12 03:04:15 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-16 22:53:51
 */

import * as vscode from "vscode";
import { Token } from "antlr4ts"
import { NodeRange, NodePosition } from "./JapeSyntaxDefinitions";

export class Place {

    static positionFromToken(token: Token | undefined): NodePosition {
        if (!token) {
            throw new Error("Token is not defined");
        }
        return { line: token.line - 1, character: token.charPositionInLine };
    }

    static rangeFromToken(start: Token, end: Token | undefined): NodeRange {
        if (!end) {
            throw new Error("Token is not defined");
        }
        return { start: Place.positionFromToken(start), end: Place.positionFromToken(start) };
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
