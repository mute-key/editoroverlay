import * as vscode from 'vscode';
import * as Type from '../../type/type';
import { DECORATION_STATE } from '../../constant/object';
import { unsetRangeOfHighlightStyle } from './highlight/highlight';

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

const unsetAndDisposeDecoration = (editor: vscode.TextEditor, decorationType: vscode.TextEditorDecorationType[]): [] => {
    decorationType?.forEach(decoration => {
        applyDecoration(editor, decoration, []);
        decoration.dispose();
    });
    return [];
};

const resetAllDecoration = (decorationState: Type.DecorationStateType) => {

    if (decorationState.statusText) {
        decorationState.statusText.forEach((decorationType) => decorationType.dispose());
    }

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

const isDecorationChanged = (editor: vscode.TextEditor, decorationState: Type.DecorationStateType, selectionKind: Type.DecorationInfoPropType) => {
    if (decorationState.appliedHighlight.applied && (decorationState.appliedHighlight.applied.MASK !== selectionKind.MASK)) {
        unsetRangeOfHighlightStyle(editor);
    }
    decorationState.appliedHighlight.applied = selectionKind;
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
    isDecorationChanged,
};