/*
 * @Author: salterok 
 * @Date: 2018-02-15 23:21:27 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-08-07 16:59:42
 */

import * as vscode from "vscode";
import _ = require("lodash");
import { CompletionItemKind } from "vscode";

import "./ErrorPatcher";

import { JapeContext } from "./JapeContext";
import { JapeLexer } from "./parser/JapeLexer";
import { Place } from "./utils";

import { japeCtx } from "./VsCodeContext";

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "vscode-gate" is now active!');

    const JAPE_MODE: vscode.DocumentFilter = { language: 'jape', scheme: 'file' };

    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(
            JAPE_MODE, 
            new JapeCompletionItemProvider(), 
            '.', 
            ':'
        ),
        vscode.languages.registerDocumentSymbolProvider(
            JAPE_MODE, 
            new JapeDocumentSymbolProvider()
        ),
        vscode.languages.registerDefinitionProvider(
            JAPE_MODE, 
            new GoDefinitionProvider()
        ),
    );

    const activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor) {
        japeCtx.loadPipelines(activeTextEditor.document.fileName).catch(console.error);
    }

    vscode.workspace.onDidChangeTextDocument(e => {
        // console.log("Edit", e.document.fileName, e.contentChanges);
        japeCtx.loadFromSource(e.document.fileName, e.document.getText());
    });
    vscode.workspace.onDidOpenTextDocument(e => {
        if (e.fileName.endsWith(".jape")) {
            console.log("Open", e.fileName);
            japeCtx.loadFromSource(e.fileName, e.getText());
        }
    });
}

class JapeCompletionItemProvider implements vscode.CompletionItemProvider {
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

class JapeDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
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

class GoDefinitionProvider implements vscode.DefinitionProvider {
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

// this method is called when your extension is deactivated
export function deactivate() {
}