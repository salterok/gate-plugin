/*
 * @Author: salterok 
 * @Date: 2018-02-15 23:21:27 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-07 04:06:44
 */

import * as vscode from "vscode";

import { CompletionItemKind } from "vscode";

import japeCtx, { JapeContext } from "./JapeContext";
import { JapeLexer } from "./parser/JapeLexer";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vscode-gate" is now active!');

    const JAPE_MODE: vscode.DocumentFilter = { language: 'jape', scheme: 'file' };

    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(
            JAPE_MODE, new JapeCompletionItemProvider(), '.', ':')
    );

    vscode.workspace.onDidChangeTextDocument(e => {
        // console.log("Edit", e.document.fileName, e.contentChanges);
        console.time("Parse: " + e.document.fileName);
        japeCtx.loadFromSource(e.document.fileName, e.document.getText());
        console.timeEnd("Parse: " + e.document.fileName);
    });
    vscode.workspace.onDidOpenTextDocument(e => {
        if (e.fileName.endsWith(".jape")) {
            console.log("Open", e.fileName);
            japeCtx.loadFromSource(e.fileName, e.getText());
        }
    });

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);
}

class JapeCompletionItemProvider implements vscode.CompletionItemProvider {
    public provideCompletionItems(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken):
        Thenable<vscode.CompletionItem[]> {
            const char = document.getText(new vscode.Range(position.translate(0, -1), position));

            console.log("input:", char);
            if (char === JapeContext.getSymbol(JapeLexer.ALIAS_SEPARATOR)) {
                const rule = japeCtx.findRule(document.fileName, position.line);
                if (rule) {
                    return Promise.resolve(
                        rule.blocks.aliases.map(
                            a => new vscode.CompletionItem(a, CompletionItemKind.Reference)
                        )
                    );
                }
            }

            return null;
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}