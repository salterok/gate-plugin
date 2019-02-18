/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2019-02-06 10:34:37 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2019-02-12 00:25:25
 */

import { IConnection, TextDocuments, CancellationToken } from "vscode-languageserver";

import { createDirectLoader } from "./VsCodeContext";
import { JapeContext } from "./JapeContext";
import { JapeCompletionItemProvider, JapeDocumentSymbolProvider, JapeDefinitionProvider } from "./providers";
import _ = require("lodash");
import { telemetry } from "./telemetry";

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

    if (unstableFeatures.get<boolean>("enableCompletions") === true) {
        const completionProvider = new JapeCompletionItemProvider(japeCtx);
        connection.onCompletion((params, token) => {
            const document = documents.get(params.textDocument.uri);
            if (!document) {
                return;
            }
            return completionProvider.provideCompletionItems(document, params.position, token, params.context);
        });
    }

    if (unstableFeatures.get<boolean>("enableSymbols") === true) {
        const completionProvider = new JapeDocumentSymbolProvider(japeCtx);
        connection.onDocumentSymbol((params, token) => {
            const document = documents.get(params.textDocument.uri);
            if (!document) {
                return;
            }
            return completionProvider.provideDocumentSymbols(document, token);
        });
    }

    if (unstableFeatures.get<boolean>("enableDefinitions") === true) {
        const completionProvider = new JapeDefinitionProvider(japeCtx);
        connection.onDefinition((params, token) => {
            const document = documents.get(params.textDocument.uri);
            if (!document) {
                return;
            }
            return completionProvider.provideDefinition(document, params.position, token);
        });
    }

    if (unstableFeatures.get<boolean>("loadPipelines") === true) {
        japeCtx.loadPipelines().catch(telemetry.error);
    }


    documents.onDidChangeContent(e => {
        if (e.document.languageId === "jape" || e.document.uri.endsWith(".jape")) {
            console.log("Change", e.document.version, e.document.uri);
            japeCtx.load(e.document.uri, e.document.version, e.document.getText());
        }
    });

    // documents.onDidOpen(e => {
    //     if (e.document.languageId === "jape" || e.document.uri.endsWith(".jape")) {
    //         japeCtx.load(e.document.uri, e.document.version, e.document.getText());
    //     }
    // })
}