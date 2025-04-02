import * as vscode from 'vscode';
import * as Type from '../../type/type';
import * as __0x from '../../constant/shared/numeric';
import { clearBufferStack } from './status/selection';
import { unsetRangeOfHighlightStyle } from './highlight/highlight';
import { DECORATION_STATE } from '../../constant/shared/object';

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

const resetAllDecoration = () => {
    vscode.window.visibleTextEditors.forEach(editor => {
        unsetRangeOfHighlightStyle(editor)
        clearBufferStack(editor);
    });
};

const createEditorDecorationType = (styleAppliedConfig: any): vscode.TextEditorDecorationType => {
    return vscode.window.createTextEditorDecorationType(styleAppliedConfig as vscode.DecorationRenderOptions);
};

const bindEditorDecoration = () => {
    return {
        stateOf: decorationState
    };
};

const clearDecorationState = (decorationState: Type.DecorationStateType) => {
    decorationState.appliedHighlight[0] = __0x.reset;
};

export {
    bindEditorDecoration,
    applyDecoration,
    disposeDecoration,
    resetDecorationRange,
    createEditorDecorationType,
    resetAllDecoration,
    clearDecorationState
};