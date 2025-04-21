import * as vscode from 'vscode';
import * as Type from '../../type/type';
import * as __0x from '../../constant/shared/numeric';
import { HIGHLIGHT_BORDER_POSITION_INFO, HIGHLIGHT_STYLE_LIST } from '../../constant/shared/object';
import { createLineRange, createRangeNNNN, createRangeSPEP, blankRange } from '../range';
import { applyDecoration } from '../editor';

const highlightStyleList = {
    ...HIGHLIGHT_STYLE_LIST
} as unknown as Type.HighlightStyleListType;

const borderPositionInfo = {
    ...HIGHLIGHT_BORDER_POSITION_INFO,
} as unknown as Type.BorderPositionInfoType;

const cursorOnlyHighlightRange = (editor: vscode.TextEditor, previousKey: number[]): void => {
    __0x.cursorOnly !== previousKey[0] && clearEveryHighlight(editor);
    
    applyDecoration(editor.setDecorations, highlightStyleList[__0x.cursorOnly][0], [createLineRange(editor.selection.active)]);
    // const borderConfig: Type.BorderPositionParserType = borderPositionInfo[borderConfigSymlink] as Type.BorderPositionParserType;
    // highlightStyleList[previousKey[0]].forEach(resetHighlight(editor.setDecorations, resetRange));
    // if (borderConfig.beforeCursor) {
    //     return [{
    //         decoration: textEditorHighlight[0],
    //         range: [Range.createRangeNNNN(editor.selection.active.line, 0, editor.selection.active.line, editor.selection.active.character)],
    //     }];
    // }
    // if (borderConfig.afterCursor) {
    //     return [{
    //         decoration: textEditorHighlight[0],
    //         range: [Range.createRangeNNEP(editor.selection.active.line, editor.selection.active.character, editor.document.lineAt(editor.selection.active.line).range.end)],
    //     },
    //     {
    //         decoration: textEditorHighlight[1],
    //         range: [Range.createRangeNNNN(editor.selection.active.line, 0, editor.selection.active.line, editor.selection.active.character)],
    //     }];
    // }
    // return [];
};

const singelLineHighlightRange = (editor: vscode.TextEditor, previousKey: number[]): void => {
    // const editor = vscode.window.activeTextEditor as vscode.TextEditor;
    // resetDecorationRange(editor, highlightStyleList[previousKey[0]]);
    // applyDecoration(editor, highlightStyleList[__0x.singleLine][0], [createRangeSPEP(editor.selection.start, editor.selection.end)]);
    // highlightStyleList[previousKey[0]].forEach(resetHighlight(editor.setDecorations, resetRange));
    // editor.setDecorations(highlightStyleList[__0x.singleLine][0], [createRangeSPEP(editor.selection.start, editor.selection.end)]);
    __0x.singleLine !== previousKey[0] && clearHighlight(editor.setDecorations, previousKey, blankRange);
    applyDecoration(editor.setDecorations, highlightStyleList[__0x.singleLine][0], [createRangeSPEP(editor.selection.start, editor.selection.end)]);
};

const multiLineHighlightRange = (editor: vscode.TextEditor, previousKey: number[]) => {
    __0x.multiLine !== previousKey[0] && clearHighlight(editor.setDecorations, previousKey, blankRange);
    // index 0 - top border
    // index 1 - bottom border
    // index 2 - background color only for the range inbetween 0 and 1.
    applyDecoration(editor.setDecorations, highlightStyleList[__0x.multiLine][0], [createLineRange(editor.selection.start)]);
    applyDecoration(editor.setDecorations, highlightStyleList[__0x.multiLine][1], [createLineRange(editor.selection.end)]);
    applyDecoration(editor.setDecorations, highlightStyleList[__0x.multiLine][2], [editor.selection]);
};

const multiCursorHighlightRange = (editor: vscode.TextEditor, previousKey: number[]): void => {
    clearHighlight(editor.setDecorations, previousKey, blankRange);
    // index 0 - selection area
    // index 1 - to apply background color on line until cursor position.
    applyDecoration(editor.setDecorations, highlightStyleList[__0x.multiCursor][0], [...editor.selections]);
    applyDecoration(editor.setDecorations, highlightStyleList[__0x.multiCursor][1], [...editor.selections]);
};

const clearBuffer = (setDecorations: vscode.TextEditor["setDecorations"], resetRange: vscode.Range[]) => (buffer: vscode.TextEditorDecorationType): void => setDecorations(buffer, resetRange);

const clearHighlight = (setDecorations: vscode.TextEditor["setDecorations"], previousKey: number[], resetRange: vscode.Range[]): void => {
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

const coordinatorSplit: Type.CoordinatorSplitType = {
    [__0x.cursorOnly]: (editor: vscode.TextEditor, previousKey: number[]) => cursorOnlyHighlightRange(editor, previousKey),
    [__0x.singleLine]: (editor: vscode.TextEditor, previousKey: number[]) => singelLineHighlightRange(editor, previousKey),
    [__0x.multiLine]: (editor: vscode.TextEditor, previousKey: number[]) => multiLineHighlightRange(editor, previousKey),
    [__0x.multiCursor]: (editor: vscode.TextEditor, previousKey: number[]) => multiCursorHighlightRange(editor, previousKey)
};

const hightlightCoordinator = (currentKey: number, previousKey: number[]) => {
    coordinatorSplit[currentKey](previousKey);
};

const bindHighlightStyleState = () => {
    return {
        styleOf: highlightStyleList,
        infoOf: borderPositionInfo
    };
};

export {
    hightlightCoordinator,
    bindHighlightStyleState,
    clearEveryHighlight,
    cursorOnlyHighlightRange,
    singelLineHighlightRange,
    multiLineHighlightRange,
    multiCursorHighlightRange,
};