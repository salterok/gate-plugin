/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-07-12 03:04:15 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2019-05-28 14:33:31
 */

import { Position, Range } from "vscode-languageserver";
import { Token, ParserRuleContext } from "antlr4ts"
import { NodeRange, NodePosition } from "./JapeSyntaxDefinitions";

export function translate(position: Position, line: number, char: number) {
    return Position.create(position.line + line, position.character + char);
}

export function using(position: Position, char: number | undefined, line: number | undefined) {
    return Position.create(
        typeof line === "number" ? line : position.line,
        typeof char === "number" ? char : position.character, 
    );
}

export function getWordRangeAtPosition(text: string, position: NodePosition, pattern?: string) {
    throw new Error("not implemented");
}

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
        return Position.create(pos.line, pos.character);
    }

    static toVsCodeRange(range: NodeRange): Range {
        return Range.create(
            Place.toVsCodePosition(range.start),
            Place.toVsCodePosition(range.end),
        );
    }
}


import * as path from "path";
import * as URL from "url";

export function toUrl(filename: string) {
    filename = decodeURIComponent(filename);
    if (process.platform === "win32") {
        if (filename.match(/^[a-z]:/i)) {
            filename = "file:///" + filename;
        }
    }
    const url = URL.parse(filename);
    if (url.protocol !== "file:") { // TODO: support others protocols
        return "file:///" + path.normalize(filename);
    }
    return url.protocol + "///" + path.normalize(url.path || "").replace(/^[\/\\]/i, "");
}

export function toLocalPath(filename: string) {
    return (URL.parse(toUrl(filename)).path || "").replace(/^[\/\\]/i, "");
}
