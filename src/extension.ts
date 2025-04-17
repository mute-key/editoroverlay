import * as vscode from 'vscode';
import { initialize } from './initialize';

/**
 * extension subscription binder. 
 * 
 * will wait for all configurations are load and ready, 
 * then subscript the disposable that include events, commands and etc.
 * 
 * @param context 
 */
export function activate(context: vscode.ExtensionContext) {
    initialize(context).then((disposableList: void | vscode.Disposable[]) => {
        if (disposableList) {
            context.subscriptions.push(...disposableList);
        }
    });
}

export function deactivate() {
    
}