import * as vscode from 'vscode';
import * as Type from './type/type.d';

const applyDecoration = (
    editor: vscode.TextEditor, 
    decoraiton: vscode.TextEditorDecorationType, 
    range: vscode.Range[]
) =>  editor.setDecorations(decoraiton, range);

const createEditorDecorationType = (
    styleAppliedConfig: Type.DecorationStyleConfigType
) => vscode.window.createTextEditorDecorationType(styleAppliedConfig);

const disposeDecoration = (
    decorationList: vscode.TextEditorDecorationType[]
) => decorationList.forEach((decorationType) => {
    decorationType.dispose();
});

export {
    applyDecoration,
    disposeDecoration,
    createEditorDecorationType
};