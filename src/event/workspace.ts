import * as vscode from 'vscode';
import * as config from '../configuration/load';

const configChanged = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
        if (event) {
            // event.affectsConfiguration()
            const loadConfig = config.loaConfiguration(context);
        }
    });
};

export {
    configChanged
};