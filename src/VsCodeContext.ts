/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-07-17 14:15:40 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-07-17 18:11:18
 */

import { JapeContext } from "./JapeContext";
import * as vscode from "vscode";


export const japeCtx = new JapeContext({
    async allFiles(glob: string): Promise<string[]> {
        const files = await vscode.workspace.findFiles(glob);
        
        return files.map(file => file.fsPath);
    },
    async load(file: string): Promise<{ version: number; text: string; } | null> {
        const doc = await vscode.workspace.openTextDocument(file);

        if (!doc) {
            return null;
        }
        return { text: doc.getText(), version: doc.version };
    }
});
