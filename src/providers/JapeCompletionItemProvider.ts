/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-08-08 23:45:29 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-08-08 23:49:38
 */

import * as vscode from "vscode";
import { CompletionItemKind } from "vscode";
import * as _ from "lodash";

import { JapeContext } from "../JapeContext";
import { JapeLexer } from "../parser/JapeLexer";
import { japeCtx } from "../VsCodeContext";

export class JapeCompletionItemProvider implements vscode.CompletionItemProvider {
    public provideCompletionItems(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken):
        Thenable<vscode.CompletionItem[]> {
            const char = document.getText(new vscode.Range(position.translate(0, -1), position));

            console.log("input:", char);
            if (char === JapeContext.getLiteral(JapeLexer.ALIAS_SEPARATOR)) {
                const rule = japeCtx.findRule(document.fileName, position.line);
                if (rule) {
                    return Promise.resolve(
                        rule.block.aliases.map(
                            a => new vscode.CompletionItem(a, CompletionItemKind.Reference)
                        )
                    );
                }
            }
            if (char === JapeContext.getLiteral(JapeLexer.ACCESSOR)) {
                const rule = japeCtx.findRule(document.fileName, position.line);
                if (rule) {
                    const token = japeCtx.getTokenBefore(document.fileName, document.offsetAt(position.translate(0, -1)), JapeLexer.IDENTIFIER);

                    if (!token) {
                        return null as any;
                    }

                    const annotations = japeCtx.findAnnotations(token.text || "");
                    
                    return Promise.resolve(
                        _.flatten(annotations.map(
                            a => a.features.map(f => new vscode.CompletionItem(f.name, CompletionItemKind.Field))
                        ))
                    );
                }
            }

            return null as any;
    }
}
