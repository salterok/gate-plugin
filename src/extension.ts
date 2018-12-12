/*
 * @Author: salterok 
 * @Date: 2018-02-15 23:21:27 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-12-12 19:46:23
 */

// const moduleAlias = require("module-alias");

// moduleAlias.addAlias("grpc", "@grpc/grpc-js");

import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

process.on("unhandledRejection", function() {
    console.log("unhandledRejection", arguments)
});

import { prepareTelemetry } from "./telemetry/loader";

import "./ErrorPatcher";

import { japeCtx } from "./VsCodeContext";
import { JapeCompletionItemProvider, JapeDocumentSymbolProvider, JapeDefinitionProvider } from "./providers";

export async function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration("gate-plugin");

    
    const TELEMETRY_ALLOWED_FLAG = "telemetry.allowed";
    const telemetryEnabled = vscode.workspace.getConfiguration("telemetry").get<boolean>("enableTelemetry") || config.get<boolean>(TELEMETRY_ALLOWED_FLAG);

    // const loading = prepareTelemetry(telemetryEnabled);

    // if (typeof loading.then === "function") {

    // }


    // in case telemetryEnabled = undefined user does not give an answer yet
    if (telemetryEnabled === undefined) {
        const ALLOW_OPTION = "Allow for this extension";
        const userResponse = vscode.window.showInformationMessage("Some experimental features has been disabled as telemetry gathering disabled in your workspace " + telemetryEnabled, "Let it be", ALLOW_OPTION);

        userResponse.then(decision => {
            console.log("User select", decision);

            if (decision === undefined) {
                return;
            }
            // TODO: register such options in config
            config.update(TELEMETRY_ALLOWED_FLAG, decision === ALLOW_OPTION, vscode.ConfigurationTarget.Global);
        });
    }



    const { telemetry, setDefaultLabels } = await import("./telemetry");

    const packageJSON = JSON.parse(fs.readFileSync(path.join(context.extensionPath, "package.json"), { encoding: "utf8" }));

    setDefaultLabels({
        machineId: vscode.env.machineId,
        sessionId: vscode.env.sessionId,
        version: packageJSON.version,
    });


    telemetry.info();
    

    await vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: "Finishing VS Gate Plugin installation..." }, (p) => {
        return new Promise((resolve, reject) => {
            let b = 0;
            let a = setInterval(() => {
                b++;
                p.report({ message: b < 5 ? "Fist!!!" : "Last!!!" });
                if (b > 10) {
                    clearInterval(a);
                    resolve();
                }
            }, 1000);
        });
    });
    
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

    if (unstableFeatures.get<boolean>("enableDefinitions") === true) {
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