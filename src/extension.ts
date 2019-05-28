/*
 * @Author: salterok 
 * @Date: 2018-02-15 23:21:27 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2019-05-28 22:23:54
 */

// const moduleAlias = require("module-alias");

// moduleAlias.addAlias("grpc", "@grpc/grpc-js");

import * as vscode from "vscode";
import { ServerOptions, TransportKind, LanguageClient, LanguageClientOptions } from "vscode-languageclient";
import * as fs from "fs";
import * as path from "path";

process.on("unhandledRejection", function() {
    console.log("unhandledRejection", arguments)
});

let client: LanguageClient;

export async function activate(context: vscode.ExtensionContext) {
    const packageJSON = JSON.parse(fs.readFileSync(path.join(context.extensionPath, "package.json"), { encoding: "utf8" }));
    
	let serverModule = context.asAbsolutePath("out/server.js");
    
    // TODO: check if in debug mode to change some launch options
	let options = {
        env: {
            machineId: vscode.env.machineId,
            sessionId: vscode.env.sessionId,
            "extension-version": packageJSON.version,
            editorHost: `vscode@${vscode.version}`,

            // overwrite some wrong env that gots copied even when spawning new process
            ELECTRON_RUN_AS_NODE: undefined,
        },
        execArgv: ["--nolazy", "--inspect=6009"],
    };
	
	// If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
	let serverOptions: ServerOptions = {
		run : { module: serverModule, transport: TransportKind.ipc, options, runtime: "node" },
		debug: { module: serverModule, transport: TransportKind.ipc, options, runtime: "node" }
    }
    
	let clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: "file", language: "jape" }],
		synchronize: {
			configurationSection: ["gate-plugin", "telemetry"],
			fileEvents: vscode.workspace.createFileSystemWatcher("**/*.jape")
		}
    }
    
    client = new LanguageClient("gate-plugin", "Jape Language Server", serverOptions, clientOptions);
    const serverHandle = client.start();

    vscode.commands.registerTextEditorCommand("gate-plugin/display-lexer-output", async (doc) => {
        let start = doc.document.offsetAt(doc.selection.start);
        let end = doc.document.offsetAt(doc.selection.end);
        if (doc.selection.isEmpty) {
            start = 0;
            end = doc.document.getText().length;
        }
        const result = await client.sendRequest("gate-plugin/display-lexer-output", {
            start,
            end,
            filename: doc.document.uri.toString(),
            version: doc.document.version,
        }) as string;

        if (result) {
            const doc = await vscode.workspace.openTextDocument({
                content: JSON.stringify(result, null, 4),
                language: "json"
            });
            vscode.window.showTextDocument(doc, {
                viewColumn: vscode.ViewColumn.Two,
                preserveFocus: true,
            })
        }
    });

    // TODO: implement xfiles/xcontent
    // client.onReady().then(() => {
    //     client.onRequest("workspace/xfiles", (params, opts) => {
    //         console.log("Received onRequest workspace/xfiles", params, opts);

    //         const base = params.base ? vscode.workspace.asRelativePath(params.base) : "";

    //         return vscode.workspace.findFiles(`${base}**/*.*`).then(uris => uris.map(uri => ({ uri: uri.toString() })));
    //     });

    //     client.onRequest("textDocument/xcontent", (params, opts) => {
    //         console.log("Received onRequest textDocument/xcontent", params, opts);
    
    //         return vscode.workspace.openTextDocument(vscode.Uri.parse(params.textDocument.uri));
    //     });
    // });

    context.subscriptions.push(serverHandle);
}

export function deactivate() {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
