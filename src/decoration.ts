import * as vscode from 'vscode';

const applyDecoration = (editor: vscode.TextEditor, decoraiton: vscode.TextEditorDecorationType, range: vscode.Range[]): void => {
    editor.setDecorations(decoraiton, range);
};

const createEditorDecorationType = (styleAppliedConfig) => {
    return vscode.window.createTextEditorDecorationType(styleAppliedConfig);
};

export {
    applyDecoration,
    createEditorDecorationType
};
