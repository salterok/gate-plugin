/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-07-17 14:15:40 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2019-02-11 22:35:26
 */

export function createVsCodeLoader() {
    const vscode = require("vscode") as any;
    return {
        async allFiles(glob: string): Promise<string[]> {
            const files = await vscode.workspace.findFiles(glob) as any[];
            
            return files.map(file => file.fsPath);
        },
        async load(file: string): Promise<{ version: number; text: string; } | null> {
            const doc = await vscode.workspace.openTextDocument(file);

            if (!doc) {
                return null;
            }
            return { text: doc.getText(), version: doc.version };
        }
    };
};

import * as fs from "fs";
import * as glob from "glob";

export function createDirectLoader() {
    return {
        async allFiles(globPattern: string): Promise<string[]> {
            return new Promise((resolve, reject) => {
                glob(globPattern, (err, files) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(files)
                });
            });
        },
        async load(file: string): Promise<{ version: number; text: string; } | null> {
            return new Promise((resolve) => {
                fs.readFile(file, { encoding: "utf-8" }, (err, file) => {
                    if (err) {
                        return resolve(null);
                    }
                    return resolve({ text: file, version: 0 });
                }); 
            });
        }
    };
};


import { IConnection } from "vscode-languageserver";

export function createLpLoader(connection: IConnection) {
    return {
        async allFiles(glob: string): Promise<string[]> {
            const files = await connection.sendRequest("workspace/xfiles", { base: "" }) as any[];
            
            return files.map(file => file.uri);
        },
        async load(file: string): Promise<{ version: number; text: string; } | null> {
            const doc = await connection.sendRequest("textDocument/xcontent", { textDocument: { uri: file } }) as any;
    
            if (!doc) {
                return null;
            }
            return { text: doc.content, version: doc.version };
        }
    }
};
