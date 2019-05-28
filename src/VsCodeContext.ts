/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-07-17 14:15:40 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2019-05-28 15:31:33
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

import { toUrl, toLocalPath } from "./utils";

export function createDirectLoader() {
    return {
        async allFiles(globPattern: string): Promise<string[]> {
            return new Promise((resolve, reject) => {
                glob(globPattern, { absolute: true }, (err, files) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(files.map(f => toUrl(f)))
                });
            });
        },
        async load(file: string): Promise<{ version: number; text: string; } | null> {
            return new Promise((resolve) => {
                fs.readFile(toLocalPath(file), { encoding: "utf-8" }, (err, file) => {
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
