import * as vscode from 'vscode';
import * as Type from '../../type/type';
import { DECORATION_STATE } from '../../constant/object';
import { unsetRangeOfHighlightStyle } from './highlight/highlight';
import { doesNotMatch } from 'assert';

const decorationState = {
    ...DECORATION_STATE,
    __proto__: null
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
    decorationType.forEach(decoration => applyDecoration(editor, decoration, []));
};

const unsetAndDisposeDecoration = (editor: vscode.TextEditor, decorationType: vscode.TextEditorDecorationType[]) => {
    // console.log(decorationState);
    // decorationState.forEach((decoration) => {
    //     applyDecoration(editor, decoration, []);
    //     decoration.dispose();
    //     // console.log(decoration)
    // });
    let idx = decorationType.length | 0;
    while (idx--) {
        applyDecoration(editor, decorationType[idx], []);
        decorationType[idx].dispose();
        delete decorationType[idx];
        // delete decorationType[idx];
    }

    return [];
};

const resetAllDecoration = (decorationState: Type.DecorationStateType) => {

    // if (decorationState.statusText) {
    //     decorationState.statusText.forEach((decorationType) => decorationType.dispose());
    // }

    vscode.window.visibleTextEditors.forEach(editor => {
        if (decorationState.appliedHighlight.ofDecorationType !== undefined) {
            decorationState.appliedHighlight.ofDecorationType.forEach(decoration => {
                applyDecoration(editor, decoration, []);
            });
        }
    });
};

const createEditorDecorationType = (styleAppliedConfig: any): vscode.TextEditorDecorationType => {
    return vscode.window.createTextEditorDecorationType(styleAppliedConfig as vscode.DecorationRenderOptions);
};

const isHighlightChanged = (editor: vscode.TextEditor, decorationState: Type.DecorationStateType, mask: number) => {
    if (decorationState.appliedHighlight.applied) {
        if ((decorationState.appliedHighlight.applied.MASK !== mask)) {
            unsetRangeOfHighlightStyle(editor);
        }
    }
};

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
    isHighlightChanged,
};