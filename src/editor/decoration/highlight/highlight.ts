import * as vscode from 'vscode';
import * as Type from '../../../type/type';
import * as __0x from '../../../constant/shared/numeric';
import { createLineRange, createRangeNNNN, createRangeSPEP, blankRange } from '../../range';
import { applyDecoration } from '../../editor';
import { HIGHLIGHT_BORDER_POSITION_INFO, HIGHLIGHT_STYLE_LIST, SELECTION_KIND_LIST } from '../../../constant/shared/object';

const highlightStyleList = {
    ...HIGHLIGHT_STYLE_LIST
} as unknown as Type.HighlightStyleListType;

const borderPositionInfo = {
    ...HIGHLIGHT_BORDER_POSITION_INFO,
} as unknown as Type.BorderPositionInfoType;

const resetHighlight = (setDecorations, range) => (highlight) => setDecorations(highlight, range);
// const resetHighlight = (setDecorations, range) => (highlight) => setDecorations(highlight, range);

const cursorOnlyHighlightRange = (editor: vscode.TextEditor, previousKey: number[]): void => {
    // const borderConfig: Type.BorderPositionParserType = borderPositionInfo[borderConfigSymlink] as Type.BorderPositionParserType;
    
    // highlightStyleList[previousKey[0]].forEach(resetHighlight(editor.setDecorations, resetRange));

    clearPrevious(editor.setDecorations, previousKey, blankRange);

    applyDecoration(editor.setDecorations, highlightStyleList[__0x.cursorOnly][0], [createLineRange(editor.selection.active)]);

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

    clearPrevious(editor.setDecorations, previousKey, blankRange);

    applyDecoration(editor.setDecorations, highlightStyleList[__0x.singleLine][0], [createRangeSPEP(editor.selection.start, editor.selection.end)]);
};

const multiLineHighlightRange = (editor: vscode.TextEditor, previousKey: number[]) => {

    // highlightStyleList[previousKey[0]].forEach(resetHighlight(editor.setDecorations, resetRange));

    clearPrevious(editor.setDecorations, previousKey, blankRange);

    // index 0 - top border
    // index 1 - bottom border
    // index 2 - background color only for the range inbetween 0 and 1.

    applyDecoration(editor.setDecorations, highlightStyleList[__0x.multiLine][0], [createLineRange(editor.selection.start)]);
    applyDecoration(editor.setDecorations, highlightStyleList[__0x.multiLine][1], [createLineRange(editor.selection.end)]);
    applyDecoration(editor.setDecorations, highlightStyleList[__0x.multiLine][2], [editor.selection]);
};

const multiCursorHighlightRange = (editor: vscode.TextEditor, previousKey: number[]): void => {
    // const editor = vscode.window.activeTextEditor as vscode.TextEditor;
    // resetDecorationRange(editor, highlightStyleList[previousKey[0]]);
    // highlightStyleList[previousKey[0]].forEach(resetHighlight(editor.setDecorations, resetRange));

    clearPrevious(editor.setDecorations, previousKey, blankRange);

    // index 0 - selection area
    // index 1 - to apply background color on line until cursor position.
    applyDecoration(editor.setDecorations, highlightStyleList[__0x.multiCursor][0], editor.selections.reduce((acc: vscode.Range[], selection: vscode.Selection) => {
        acc.push(createRangeSPEP(selection.start, selection.active));
        return acc;
    }, [] as vscode.Range[]));
    applyDecoration(editor.setDecorations, highlightStyleList[__0x.multiCursor][1], editor.selections.reduce((acc: vscode.Range[], selection: vscode.Selection) => {
        acc.push(createRangeNNNN(selection.active.line, 0, selection.active.line, selection.active.character));
        return acc;
    }, [] as vscode.Range[]));
};

const clearBuffer = (setDecorations: vscode.TextEditor["setDecorations"], resetRange: vscode.Range[]) => (buffer: vscode.TextEditorDecorationType): void => setDecorations(buffer, resetRange);

const clearPrevious = (setDecorations: vscode.TextEditor["setDecorations"], previousKey: number[], resetRange: vscode.Range[]): void => {
    switch (previousKey[0]) {
        case __0x.HEX_SELECTION_TYPE.CURSOR_ONLY:
            highlightStyleList[__0x.HEX_SELECTION_TYPE.CURSOR_ONLY]?.forEach(clearBuffer(setDecorations, resetRange));
            break;
        case __0x.HEX_SELECTION_TYPE.SINGLE_LINE:
            highlightStyleList[__0x.HEX_SELECTION_TYPE.SINGLE_LINE]?.forEach(clearBuffer(setDecorations, resetRange));
            break;
        case __0x.HEX_SELECTION_TYPE.MULTI_LINE:
            highlightStyleList[__0x.HEX_SELECTION_TYPE.MULTI_LINE]?.forEach(clearBuffer(setDecorations, resetRange));
            break;
        case __0x.HEX_SELECTION_TYPE.MULTI_CURSOR:
            highlightStyleList[__0x.HEX_SELECTION_TYPE.MULTI_CURSOR]?.forEach(clearBuffer(setDecorations, resetRange));
            break;
        default: break;
    }
};

const unsetRangeOfHighlightStyle = (editor: vscode.TextEditor) => {
    SELECTION_KIND_LIST.forEach(highlight => {
        // resetDecorationRange(editor, highlightStyleList[highlight]);
    });
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
    unsetRangeOfHighlightStyle,
    cursorOnlyHighlightRange,
    singelLineHighlightRange,
    multiLineHighlightRange,
    multiCursorHighlightRange,
};