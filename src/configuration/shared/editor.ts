import * as vscode from 'vscode';
import { getWorkspaceConfiguration } from './configuration';

const updateEditorConfiguration = (key: string, value: any): void => {
    const editorConfig = vscode.workspace.getConfiguration("editor");
    if (value === null || value === 'null' || String(value).length === 0) {
        // this will add setting as string literal 'null'. 
        editorConfig.update(key, null, vscode.ConfigurationTarget.Global);
    } else {
        editorConfig.update(key, value, vscode.ConfigurationTarget.Global);
    }
};

const writeEditorConfiguration = (): void => {
    const editorConfig = getWorkspaceConfiguration("editor");
    editorConfig.update("renderLineHighlight", 'gutter', vscode.ConfigurationTarget.Global);
    editorConfig.update("roundedSelection", false, vscode.ConfigurationTarget.Global);
    // this is cool but not necessary.
    // editorConfig.update("cursorBlinking", 'phase', vscode.ConfigurationTarget.Global);
    // editorConfig.update("cursorSmoothCaretAnimation", 'on', vscode.ConfigurationTarget.Global);
};

export {
    writeEditorConfiguration,
    updateEditorConfiguration
};