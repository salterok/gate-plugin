/*
 * @Author: salterok 
 * @Date: 2018-02-15 23:21:27 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-09-27 19:09:55
 */

import * as vscode from "vscode";
import "./ErrorPatcher";

import { japeCtx } from "./VsCodeContext";
import { JapeCompletionItemProvider, JapeDocumentSymbolProvider, JapeDefinitionProvider } from "./providers";

export function activate(context: vscode.ExtensionContext) {
    
    const unstableFeatures = vscode.workspace.getConfiguration("gate-plugin.unstable");

    const JAPE_MODE: vscode.DocumentFilter = { language: 'jape', scheme: 'file' };

    if (unstableFeatures.get<boolean>("enableCompletions") === true) {
        context.subscriptions.push(
            vscode.languages.registerCompletionItemProvider(
                JAPE_MODE, 
                new JapeCompletionItemProvider(), 
                '.', 
                ':'
            )
        );
    }

    if (unstableFeatures.get<boolean>("enableSymbols") === true) {
        context.subscriptions.push(
            vscode.languages.registerDocumentSymbolProvider(
                JAPE_MODE, 
                new JapeDocumentSymbolProvider()
            )
        );
    }

    if (unstableFeatures.get<boolean>("enableDifinitions") === true) {
        context.subscriptions.push(
            vscode.languages.registerDefinitionProvider(
                JAPE_MODE, 
                new JapeDefinitionProvider()
            )
        );
    }

    if (unstableFeatures.get<boolean>("loadPipelines") === true) {
        const activeTextEditor = vscode.window.activeTextEditor;
        if (activeTextEditor) {
            japeCtx.loadPipelines(activeTextEditor.document.fileName).catch(console.error);
        }
    }

    vscode.workspace.onDidChangeTextDocument(e => {
        if (e.document.languageId === "jape" || e.document.fileName.endsWith(".jape")) {
            japeCtx.load(e.document.fileName, e.document.version, e.document.getText());
        }
    });
    vscode.workspace.onDidOpenTextDocument(e => {
        if (e.languageId === "jape" || e.fileName.endsWith(".jape")) {
            japeCtx.load(e.fileName, e.version, e.getText());
        }
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}