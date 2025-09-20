import type * as D from '../../type/type.d';

import * as vscode from 'vscode';
import * as hex from '../../numeric/hexadecimal';
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
} as D.Decoration.Tp.HighlightStyleList;

const borderPositionInfo = {
    ...HIGHLIGHT_BORDER_POSITION_INFO,
} as D.Decoration.Tp.BorderPositionInfoType;

const cursorOnlyHighlightRange = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]): void => {
    hex.cursorOnly !== previousKey[0] && clearEveryHighlight(editor);
    applyDecoration(editor.setDecorations, highlightStyleList[hex.cursorOnly][0], [createLineRange(editor.selection.active)]);
};

const singelLineHighlightRange = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]): void => {
    hex.singleLine !== previousKey[0] && clearHighlight(editor.setDecorations, previousKey, blankRange);
    applyDecoration(editor.setDecorations, highlightStyleList[hex.singleLine][0], [createRangeSPEP(editor.selection.start, editor.selection.end)]);
};

const multiLineRangeCache = [] as any | vscode.Range[];

const renderMultiLineHighlight = (setDecorations: D.Editor.Tp.RenderOverlay, range: vscode.Range[]) => (highlight: vscode.TextEditorDecorationType, idx: number) => setDecorations(highlight, range as unknown as readonly vscode.Range[] | readonly vscode.DecorationOptions[]);

const multiLineHighlightRange = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]) => {
    hex.multiLine !== previousKey[0] && clearHighlight(editor.setDecorations, previousKey, blankRange);
    multiLineRangeCache[0] = createLineRange(editor.selection.start); // editor.document.lineAt(editor.selection.start).range; // createLineRange();
    multiLineRangeCache[1] = createLineRange(editor.selection.end); // editor.document.lineAt(editor.selection.end).range; // createLineRange();
    multiLineRangeCache[2] = editor.selection;
    highlightStyleList[hex.multiLine].forEach(renderMultiLineHighlight(editor.setDecorations, multiLineRangeCache));
};

const multiCursorHighlightRange = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]): void => {
    clearHighlight(editor.setDecorations, previousKey, blankRange);
    applyDecoration(editor.setDecorations, highlightStyleList[hex.multiCursor][0], [...editor.selections]);
    applyDecoration(editor.setDecorations, highlightStyleList[hex.multiCursor][1], [...editor.selections]);
};

const clearBuffer = (setDecorations: vscode.TextEditor["setDecorations"], resetRange: vscode.Range[]) => (buffer: vscode.TextEditorDecorationType): void => setDecorations(buffer, resetRange);

const clearHighlight = (setDecorations: vscode.TextEditor["setDecorations"], previousKey: D.Numeric.Key.Hex[], resetRange: vscode.Range[]): void => {
    switch (previousKey[0]) {
        case hex.cursorOnly:
            highlightStyleList[hex.cursorOnly].forEach(clearBuffer(setDecorations, resetRange));
            break;
        case hex.singleLine:
            highlightStyleList[hex.singleLine].forEach(clearBuffer(setDecorations, resetRange));
            break;
        case hex.multiLine:
            highlightStyleList[hex.multiLine].forEach(clearBuffer(setDecorations, resetRange));
            break;
        case hex.multiCursor:
            highlightStyleList[hex.multiCursor].forEach(clearBuffer(setDecorations, resetRange));
            break;
        default: break;
    }
};

const clearEveryHighlight = (editor: vscode.TextEditor) => {
    clearHighlight(editor.setDecorations, [hex.cursorOnly], blankRange);
    clearHighlight(editor.setDecorations, [hex.singleLine], blankRange);
    clearHighlight(editor.setDecorations, [hex.multiLine], blankRange);
    clearHighlight(editor.setDecorations, [hex.multiCursor], blankRange);
};

const coordinatorSplit: D.Decoration.Intf.CoordinatorSplitType = {
    [hex.cursorOnly]: (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]) => cursorOnlyHighlightRange(editor, previousKey),
    [hex.singleLine]: (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]) => singelLineHighlightRange(editor, previousKey),
    [hex.multiLine]: (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]) => multiLineHighlightRange(editor, previousKey),
    [hex.multiCursor]: (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]) => multiCursorHighlightRange(editor, previousKey)
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