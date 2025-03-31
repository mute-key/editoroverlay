import * as vscode from 'vscode';
import * as Type from '../../type/type';
import { DECORATION_STATE } from '../../constant/object';

const decorationState = {
    ...DECORATION_STATE
} as unknown as Type.DecorationStateType;

const applyDecoration = (editor: vscode.TextEditor, decoraiton: vscode.TextEditorDecorationType, range: vscode.Range[]): void => {
    editor.setDecorations(decoraiton, range);
};

const disposeDecoration = (highlightStyleList: vscode.TextEditorDecorationType[] = []) => {
    highlightStyleList.forEach((decorationType): void => {
        decorationType.dispose();
    });
};

const resetDecorationRange = (editor: vscode.TextEditor, decorationType: vscode.TextEditorDecorationType[]): void => {
    decorationType?.forEach(decoration => applyDecoration(editor, decoration, []));
};

const unsetAndDisposeDecoration = (editor: vscode.TextEditor, decorationType: vscode.TextEditorDecorationType[]) => {
    let idx = decorationType.length | 0;
    while (idx--) {
        applyDecoration(editor, decorationType[idx], []);
        decorationType[idx].dispose();
    }
};

const resetAllDecoration = (decorationState: Type.DecorationStateType) => {

    // if (decorationState.statusText) {
    //     decorationState.statusText.forEach((decorationType) => decorationType.dispose());
    // }

    // vscode.window.visibleTextEditors.forEach(editor => {
    //     if (decorationState.appliedHighlight.ofDecorationType !== undefined) {
    //         decorationState.appliedHighlight.ofDecorationType.forEach(decoration => {
    //             applyDecoration(editor, decoration, []);
    //         });
    //     }
    // });
};

const createEditorDecorationType = (styleAppliedConfig: any): vscode.TextEditorDecorationType => {
    return vscode.window.createTextEditorDecorationType(styleAppliedConfig as vscode.DecorationRenderOptions);
};

// const isHighlightChanged = (renderGroup) => {
    
    
    
// };

const bindEditorDecoration = () => {
    return {
        stateOf: decorationState
    };
};

export {
    bindEditorDecoration,
    applyDecoration,
    disposeDecoration,
    resetDecorationRange,
    unsetAndDisposeDecoration,
    createEditorDecorationType,
    resetAllDecoration,
    // isHighlightChanged,
};