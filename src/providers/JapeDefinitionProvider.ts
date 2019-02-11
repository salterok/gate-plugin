/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-08-08 23:46:49 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2019-02-10 15:29:07
 */

import { Position, Range, Location, TextDocument, CancellationToken, SymbolInformation, SymbolKind, Definition } from "vscode-languageserver";
import { Place } from "../utils";
import { JapeContext } from "../JapeContext";

export class JapeDefinitionProvider {
    constructor(private japeCtx: JapeContext) {
    }
    
    provideDefinition(document: TextDocument, position: Position, token: CancellationToken): Thenable<Definition> | null {
        const range = document.getWordRangeAtPosition(position);
        if (!range) {
            return null;
        }
        const name = document.getText(range);
        console.log("provideDefinition", name);


        const reference = this.japeCtx.getReference(document.uri, name, "macro");
        if (!reference) {
            return null;
        }

        const locations = reference.refs.map(ref => Location.create(
            document.uri,
            Place.toVsCodeRange(ref.range),
        ));
        return Promise.resolve(locations);
    }

}
