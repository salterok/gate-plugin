/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-08-08 23:46:04 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2019-02-10 15:29:17
 */

import { Position, Range, Location, TextDocument, CancellationToken, SymbolInformation, SymbolKind } from "vscode-languageserver";
import { JapeContext } from "../JapeContext";

export class JapeDocumentSymbolProvider {
    constructor(private japeCtx: JapeContext) {
    }
    
    provideDocumentSymbols(document: TextDocument, token: CancellationToken): SymbolInformation[] {
        const symbols = this.japeCtx.getSymbols(document.uri);

        const items = symbols.map(s => {
            return SymbolInformation.create(
                s.name,
                SymbolKind.Struct,
                Range.create(
                    Position.create(s.range.start.line, s.range.start.character),
                    Position.create(s.range.start.line, s.range.end.character),
                ),
                s.name,
            );
        });

        return items;
    }

}
