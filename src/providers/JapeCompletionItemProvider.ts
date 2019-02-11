/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-08-08 23:45:29 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2019-02-10 15:29:02
 */

import { CompletionItemKind, CompletionItem, TextDocument, Position, CancellationToken, CompletionContext, Range } from "vscode-languageserver";
import * as _ from "lodash";

import { JapeContext } from "../JapeContext";
import { JapeLexer } from "../parser/JapeLexer";
import { translate } from "../utils";

export class JapeCompletionItemProvider {

    constructor(private japeCtx: JapeContext) {
    }

    public provideCompletionItems(
        document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext | undefined):
        Thenable<CompletionItem[]> {
            const char = document.getText(Range.create(translate(position, 0, -1), position));

            console.log("input:", char);
            if (char === JapeContext.getLiteral(JapeLexer.ALIAS_SEPARATOR)) {
                const rule = this.japeCtx.findRule(document.uri, position.line);
                if (rule) {
                    return Promise.resolve(
                        rule.block.aliases.map(
                            alias => {
                                const item = CompletionItem.create(alias);
                                item.kind = CompletionItemKind.Reference;
                                return item;
                            }
                        )
                    );
                }
            }
            if (char === JapeContext.getLiteral(JapeLexer.ACCESSOR)) {
                // TODO: check if looking into specific annotation in lhs or into label in rhs
                const rule = this.japeCtx.findRule(document.uri, position.line);
                if (rule) {
                    const token = this.japeCtx.getTokenBefore(document.uri, document.offsetAt(translate(position, 0, -1)), JapeLexer.IDENTIFIER);

                    if (!token) {
                        return null as any;
                    }

                    const annotations = this.japeCtx.findAnnotations(token.text || "");
                    
                    return Promise.resolve(
                        _.flatten(annotations.map(
                            a => a.features.map(
                                feature => {
                                    const item = CompletionItem.create(feature.name);
                                    item.kind = CompletionItemKind.Field;
                                    return item;
                                }
                            )
                        ))
                    );
                }
            }

            return null as any;
    }
}
