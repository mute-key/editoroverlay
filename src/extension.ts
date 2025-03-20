import * as vscode from 'vscode';
import { initialize } from './initialize';

export function activate(context: vscode.ExtensionContext) {
    initialize(context).then((event: void | vscode.Disposable[]) => {
        if (event) {
            context.subscriptions.push(...event);
        }
    });
}

export function deactivate() {
    
}