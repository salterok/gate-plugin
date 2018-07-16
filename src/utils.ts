/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-07-12 03:04:15 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-16 21:57:14
 */

import { Token } from "antlr4ts"
import { NodePlace, NodePosition } from "./JapeSyntaxDefinitions";

export class Place {

    static positionFromToken(token: Token | undefined): NodePosition {
        if (!token) {
            throw new Error("Token is not defined");
        }
        return { line: token.line - 1, character: token.charPositionInLine };
    }

    static rangeFromToken(start: Token, end: Token | undefined): NodePlace {
        if (!end) {
            throw new Error("Token is not defined");
        }
        return { start: Place.positionFromToken(start), end: Place.positionFromToken(start) };
    }
}
