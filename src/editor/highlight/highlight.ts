import type * as D from '../../type/type.d';

import * as vscode from 'vscode';
import * as __0x from '../../constant/shared/numeric';
import { HIGHLIGHT_BORDER_POSITION_INFO, HIGHLIGHT_STYLE_LIST } from '../../constant/shared/object';
import { createLineRange, createRangeSPEP, blankRange } from '../range';
import { applyDecoration } from '../editor';

export {
    hightlightCoordinator,
    bindHighlightStyleState,
    clearEveryHighlight,
    cursorOnlyHighlightRange,
    singelLineHighlightRange,
    multiLineHighlightRange,
    multiCursorHighlightRange,
};

const highlightStyleList = {
    ...HIGHLIGHT_STYLE_LIST
} as unknown as D.Decoration.Tp.HighlightStyleList;

const borderPositionInfo = {
    ...HIGHLIGHT_BORDER_POSITION_INFO,
} as unknown as D.Decoration.Tp.BorderPositionInfoType;

const cursorOnlyHighlightRange = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]): void => {
    __0x.cursorOnly !== previousKey[0] && clearEveryHighlight(editor);
    applyDecoration(editor.setDecorations, highlightStyleList[__0x.cursorOnly][0], [createLineRange(editor.selection.active)]);
};

const singelLineHighlightRange = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]): void => {
    __0x.singleLine !== previousKey[0] && clearHighlight(editor.setDecorations, previousKey, blankRange);
    applyDecoration(editor.setDecorations, highlightStyleList[__0x.singleLine][0], [createRangeSPEP(editor.selection.start, editor.selection.end)]);
};

const multiLineRangeCH = [
    [Object.create(null)] as any | vscode.Range[],
    [Object.create(null)],
    [Object.create(null)],
];

const renderMultiLineHighlight = (setDecorations: D.Editor.Tp.RenderOverlay, range: vscode.Range[]) => (highlight: vscode.TextEditorDecorationType, idx: number) => setDecorations(highlight, range[idx] as unknown as readonly vscode.Range[] | readonly vscode.DecorationOptions[]);

const multiLineHighlightRange = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]) => {
    __0x.multiLine !== previousKey[0] && clearHighlight(editor.setDecorations, previousKey, blankRange);
    multiLineRangeCH[0][0] = editor.document.lineAt(editor.selection.start).range; // createLineRange();
    multiLineRangeCH[1][0] = editor.document.lineAt(editor.selection.end).range; // createLineRange();
    multiLineRangeCH[2][0] = editor.selection;
    highlightStyleList[__0x.multiLine].forEach(renderMultiLineHighlight(editor.setDecorations, multiLineRangeCH));
};

const multiCursorHighlightRange = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]): void => {
    clearHighlight(editor.setDecorations, previousKey, blankRange);
    applyDecoration(editor.setDecorations, highlightStyleList[__0x.multiCursor][0], [...editor.selections]);
    applyDecoration(editor.setDecorations, highlightStyleList[__0x.multiCursor][1], [...editor.selections]);
};

const clearBuffer = (setDecorations: vscode.TextEditor["setDecorations"], resetRange: vscode.Range[]) => (buffer: vscode.TextEditorDecorationType): void => setDecorations(buffer, resetRange);

const clearHighlight = (setDecorations: vscode.TextEditor["setDecorations"], previousKey: D.Numeric.Key.Hex[], resetRange: vscode.Range[]): void => {
    switch (previousKey[0]) {
        case __0x.cursorOnly:
            highlightStyleList[__0x.cursorOnly].forEach(clearBuffer(setDecorations, resetRange));
            break;
        case __0x.singleLine:
            highlightStyleList[__0x.singleLine].forEach(clearBuffer(setDecorations, resetRange));
            break;
        case __0x.multiLine:
            highlightStyleList[__0x.multiLine].forEach(clearBuffer(setDecorations, resetRange));
            break;
        case __0x.multiCursor:
            highlightStyleList[__0x.multiCursor].forEach(clearBuffer(setDecorations, resetRange));
            break;
        default: break;
    }
};

const clearEveryHighlight = (editor: vscode.TextEditor) => {
    clearHighlight(editor.setDecorations, [__0x.cursorOnly], blankRange);
    clearHighlight(editor.setDecorations, [__0x.singleLine], blankRange);
    clearHighlight(editor.setDecorations, [__0x.multiLine], blankRange);
    clearHighlight(editor.setDecorations, [__0x.multiCursor], blankRange);
};

const coordinatorSplit: D.Decoration.Intf.CoordinatorSplitType = {
    [__0x.cursorOnly]: (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]) => cursorOnlyHighlightRange(editor, previousKey),
    [__0x.singleLine]: (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]) => singelLineHighlightRange(editor, previousKey),
    [__0x.multiLine]: (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]) => multiLineHighlightRange(editor, previousKey),
    [__0x.multiCursor]: (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]) => multiCursorHighlightRange(editor, previousKey)
};

const hightlightCoordinator = (currentKey: number, previousKey: D.Numeric.Key.Hex[]) => {
    coordinatorSplit[currentKey](previousKey);
};

const bindHighlightStyleState = () => {
    return {
        styleOf: highlightStyleList,
        infoOf: borderPositionInfo
    };
};