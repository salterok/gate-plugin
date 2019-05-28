/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2019-02-06 10:34:37 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2019-05-28 22:17:36
 */

import { IConnection, TextDocuments, CancellationToken } from "vscode-languageserver";

import { createDirectLoader } from "./VsCodeContext";
import { JapeContext } from "./JapeContext";
import { JapeCompletionItemProvider, JapeDocumentSymbolProvider, JapeDefinitionProvider } from "./providers";
import _ = require("lodash");
import { telemetry } from "./telemetry";
import { toLocalPath } from "./utils";

export interface ExtensionSettings {
	unstable: {};
}

export async function activate(config: ExtensionSettings, connection: IConnection, documents: TextDocuments) {
    const fileLoader = createDirectLoader();
    const folders = await connection.workspace.getWorkspaceFolders();
    (fileLoader as any).base = decodeURIComponent((folders && folders[0].uri) || "/").replace("file:///", "");
    const japeCtx = new JapeContext(fileLoader);

    // await (connection.window as any).withProgress({ location: vscode.ProgressLocation.Window, title: "Finishing VS Gate Plugin installation..." }, (p: any) => {
    //     return new Promise((resolve, reject) => {
    //         let b = 0;
    //         let a = setInterval(() => {
    //             b++;
    //             p.report({ message: b < 5 ? "Fist!!!" : "Last!!!" });
    //             if (b > 10) {
    //                 clearInterval(a);
    //                 resolve();
    //             }
    //         }, 1000);
    //     });
    // });

    type Enchance<Type> = Type & {
        get<T = any>(path: string, defaultValue?: T): T;
    };

    function enchance<T>(obj: T): Enchance<T> {
        return Object.setPrototypeOf({ ...obj }, {
            get<T = any>(path: string, defaultValue?: T): T {
                return _.get(this, path, defaultValue);
            }
        });
    }

    
    const unstableFeatures = enchance(config.unstable as unknown);

    // enableCompletions
    const completionProvider = new JapeCompletionItemProvider(japeCtx);
    connection.onCompletion((params, token) => {
        const document = documents.get(params.textDocument.uri);
        if (!document) {
            return;
        }
        return completionProvider.provideCompletionItems(document, params.position, token, params.context);
    });

    // enableSymbols
    const symbolsProvider = new JapeDocumentSymbolProvider(japeCtx);
    connection.onDocumentSymbol((params, token) => {
        const document = documents.get(params.textDocument.uri);
        if (!document) {
            return;
        }
        return symbolsProvider.provideDocumentSymbols(document, token);
    });

    // enableDefinitions
    const definitionProvider = new JapeDefinitionProvider(japeCtx);
    connection.onDefinition((params, token) => {
        const document = documents.get(params.textDocument.uri);
        if (!document) {
            return;
        }
        return definitionProvider.provideDefinition(document, params.position, token);
    });

    if (unstableFeatures.get<boolean>("loadPipelines") === true) {
        japeCtx.loadPipelines().catch(telemetry.error);
    }


    documents.onDidChangeContent(e => {
        if (e.document.languageId === "jape" || e.document.uri.endsWith(".jape")) {
            console.log("Change", e.document.version, e.document.uri);
            japeCtx.load(toLocalPath(e.document.uri), e.document.version, e.document.getText());
        }
    });


    connection.onRequest("gate-plugin/display-lexer-output", getLexerOutput);

    async function getLexerOutput(data: any) {
        try {
            console.log("bvppv", data);

            const module = japeCtx._get(toLocalPath(data.filename));
            if (!module) {
                return;
            }
    
            const tokens = module.tokenStream.getTokens();
            return tokens
                .filter(token => token.startIndex >= data.start && token.stopIndex <= data.end)
                .map(token => {
                    return {
                        text: token.text,
                        type: JapeContext.getSymbolicName(token.type),
                    }
                });
        }
        catch (err) {
            console.error(err);
            return;
        }
    }

    // documents.onDidOpen(e => {
    //     if (e.document.languageId === "jape" || e.document.uri.endsWith(".jape")) {
    //         japeCtx.load(e.document.uri, e.document.version, e.document.getText());
    //     }
    // })
}