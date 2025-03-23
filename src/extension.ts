import * as vscode from 'vscode';
import { initialize } from './initialize';

export function activate(context: vscode.ExtensionContext) {
    initialize(context).then((eventList: void | vscode.Disposable[]) => {
        if (eventList) {
            context.subscriptions.push(...eventList);
        }
    });
}

export function deactivate() {
    
}