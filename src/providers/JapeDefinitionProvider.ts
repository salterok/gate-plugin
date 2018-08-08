/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-08-08 23:46:49 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-08-08 23:51:12
 */

import * as vscode from "vscode";
import { Place } from "../utils";
import { japeCtx } from "../VsCodeContext";

export class JapeDefinitionProvider implements vscode.DefinitionProvider {
    provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Definition> {
        const range = document.getWordRangeAtPosition(position);
        if (!range) {
            return null;
        }
        const name = document.getText(range);
        console.log("provideDefinition", name);


        const reference = japeCtx.getReference(document.fileName, name, "macro");
        if (!reference) {
            return null;
        }

        const locations = reference.refs.map(ref => new vscode.Location(
            document.uri,
            Place.toVsCodeRange(ref.range),
        ));
        return Promise.resolve(locations);
    }

}
