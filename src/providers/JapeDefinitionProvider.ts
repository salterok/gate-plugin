/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-08-08 23:46:49 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2019-05-28 16:47:48
 */

import { Position, Range, Location, TextDocument, CancellationToken, SymbolInformation, SymbolKind, Definition } from "vscode-languageserver";
import { Place, getWordRangeAtPosition, toUrl as toUri } from "../utils";
import { JapeContext } from "../JapeContext";

export class JapeDefinitionProvider {
    constructor(private japeCtx: JapeContext) {
    }
    
    provideDefinition(document: TextDocument, position: Position, token: CancellationToken): Thenable<Definition> | null {
        // const range = getWordRangeAtPosition(document.getText(), position);
        // if (!range) {
        //     return null;
        // }
        // const name = document.getText(range);
        // console.log("provideDefinition", name);

        let name = "";
        // TODO: implement better way to convert offset to line+char to get retrieve token
        var module = this.japeCtx._get(document.uri);
        if (module) {
            const tokens = module.tokenStream.getTokens().filter(token => {
                const inLineRange = token.charPositionInLine <= position.character + 1 && token.charPositionInLine + token.text!.length >= position.character + 1;
                return token.line === position.line + 1 && inLineRange;
            });
            if (tokens.length > 0) {
                name = tokens[0].text!;
            }
        }

        const reference = this.japeCtx.getReference(toUri(document.uri), name);
        if (!reference) {
            return null;
        }

        const locations = reference.refs.map(ref => Location.create(
            ref.filename,
            Place.toVsCodeRange(ref.range),
        ));
        return Promise.resolve(locations);
    }

}
