/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2019-02-03 06:49:16 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2019-02-12 00:13:35
 */
import { IConnection, createConnection, TextDocuments, ProposedFeatures, InitializeParams } from "vscode-languageserver";

import { prepareTelemetry } from "./telemetry/loader";

import "./ErrorPatcher";

// Create a connection for the server. The connection uses Node's IPC as a transport
let connection: IConnection = createConnection(ProposedFeatures.all);

// Create a simple text document manager. The text document manager
// supports full document sync only
let documents: TextDocuments = new TextDocuments();

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// After the server has started the client sends an initialize request. The server receives
// in the passed params the rootPath of the workspace plus the client capabilities. 
let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;
let hasDiagnosticRelatedInformationCapability: boolean = false;

connection.onInitialize((params: InitializeParams) => {
	let capabilities = params.capabilities;

	// Does the client support the `workspace/configuration` request?
	// If not, we will fall back using global settings
	hasConfigurationCapability =
        Boolean(capabilities.workspace && !!capabilities.workspace.configuration);
	hasWorkspaceFolderCapability =
        Boolean(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
	hasDiagnosticRelatedInformationCapability =
		Boolean(capabilities.textDocument &&
		capabilities.textDocument.publishDiagnostics &&
		capabilities.textDocument.publishDiagnostics.relatedInformation);

	return {
		capabilities: {
			textDocumentSync: documents.syncKind,
			// Tell the client that the server supports code completion
			completionProvider: {
                triggerCharacters: [".", ":"]
				// resolveProvider: true
			}
		}
	};
});

connection.onInitialized(a => {
    console.log("Initialized", a);
})

connection.onDidChangeConfiguration((change) => {
	let settings = <Settings>change.settings;
    console.log("onDidChangeConfiguration", settings);
    
    initialize(settings);
});

import { ExtensionSettings } from "./languageServer";

export interface Settings {
	"gate-plugin": ExtensionSettings;
}

async function initialize(settings: Settings) {
    // const TELEMETRY_ALLOWED_FLAG = "telemetry.allowed";
    // const telemetryEnabled = vscode.workspace.getConfiguration("telemetry").get<boolean>("enableTelemetry") || config.get<boolean>(TELEMETRY_ALLOWED_FLAG);
    const telemetryEnabled = true;

    const loading = prepareTelemetry(telemetryEnabled);

    if (typeof loading.then === "function") {
        await loading;
    }


    // in case telemetryEnabled = undefined user does not give an answer yet
    // if (telemetryEnabled === undefined) {
    //     const ALLOW_OPTION = "Allow for this extension";
    //     const userResponse = vscode.window.showInformationMessage("Some experimental features has been disabled as telemetry gathering disabled in your workspace " + telemetryEnabled, "Let it be", ALLOW_OPTION);

    //     userResponse.then(decision => {
    //         console.log("User select", decision);

    //         if (decision === undefined) {
    //             return;
    //         }
    //         // TODO: register such options in config
    //         config.update(TELEMETRY_ALLOWED_FLAG, decision === ALLOW_OPTION, vscode.ConfigurationTarget.Global);
    //     });
    // }

    const { telemetry, setDefaultLabels } = await import("./telemetry");

    setDefaultLabels({
        machineId: process.env.machineId,
        sessionId: process.env.sessionId,
        version: process.env["extension-version"], // language client version
        // TODO: add language server version too
        host: process.env.editorHost,
    });

    const { activate } = await import("./languageServer");

    await activate(settings["gate-plugin"], connection, documents);
}

// Listen on the connection
connection.listen();