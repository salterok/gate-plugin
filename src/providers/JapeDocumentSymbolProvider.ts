/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-08-08 23:46:04 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-08-08 23:48:27
 */

import * as vscode from "vscode";
import { japeCtx } from "../VsCodeContext";

export class JapeDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
    provideDocumentSymbols(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.SymbolInformation[]> {
        const symbols = japeCtx.getSymbols(document.fileName);

        const items = symbols.map(s => {
            return new vscode.SymbolInformation(
                s.name, 
                vscode.SymbolKind.Struct, 
                s.name, 
                new vscode.Location(document.uri, 
                    new vscode.Range(
                        new vscode.Position(s.range.start.line, s.range.start.character),
                        new vscode.Position(s.range.start.line, s.range.end.character),
                    )
                )
            )
        });

        return Promise.resolve(items);
    }

}
