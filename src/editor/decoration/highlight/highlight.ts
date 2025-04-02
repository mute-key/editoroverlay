import * as vscode from 'vscode';
import * as Type from '../../../type/type';
import * as __0x from '../../../constant/shared/numeric';
import { createLineRange, createRangeNNNN, createRangeSPEP } from '../../range';
import { applyDecoration, resetDecorationRange } from '../decoration';
import { HIGHLIGHT_BORDER_POSITION_INFO, HIGHLIGHT_STYLE_LIST, SELECTION_KIND_LIST } from '../../../constant/shared/object';

const highlightStyleList = {
    ...HIGHLIGHT_STYLE_LIST
} as unknown as Type.HighlightStyleListType;

const borderPositionInfo = {
    ...HIGHLIGHT_BORDER_POSITION_INFO,
} as unknown as Type.BorderPositionInfoType;

const cursorOnlyHighlightRange = (editor: vscode.TextEditor, previousKey: number): void => {
    // const borderConfig: Type.BorderPositionParserType = borderPositionInfo[borderConfigSymlink] as Type.BorderPositionParserType;

    resetDecorationRange(editor, highlightStyleList[previousKey]);

    applyDecoration(editor, highlightStyleList[__0x.cursorOnly][0], [createLineRange(editor.selection.active)]);

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

const singelLineHighlightRange = (editor: vscode.TextEditor, previousKey: number): void => {
    // const editor = vscode.window.activeTextEditor as vscode.TextEditor;
    resetDecorationRange(editor, highlightStyleList[previousKey]);
    applyDecoration(editor, highlightStyleList[__0x.singleLine][0], [createRangeSPEP(editor.selection.start, editor.selection.end)]);
};

const multiLineHighlightRange = (editor: vscode.TextEditor, previousKey: number) => {
    resetDecorationRange(editor, highlightStyleList[previousKey]);

    // index 0 - top border
    // index 1 - bottom border
    // index 2 - background color only for the range inbetween 0 and 1.

    applyDecoration(editor, highlightStyleList[__0x.multiLine][0], [createLineRange(editor.selection.start)]);
    applyDecoration(editor, highlightStyleList[__0x.multiLine][1], [createLineRange(editor.selection.end)]);
    applyDecoration(editor, highlightStyleList[__0x.multiLine][2], [editor.selection]);


};

const multiCursorHighlightRange = (editor: vscode.TextEditor, previousKey: number): void => {
    // const editor = vscode.window.activeTextEditor as vscode.TextEditor;
    resetDecorationRange(editor, highlightStyleList[previousKey]);

    // index 0 - selection area
    // index 1 - to apply background color on line until cursor position.
    applyDecoration(editor, highlightStyleList[__0x.multiCursor][0], editor.selections.reduce((acc: vscode.Range[], selection: vscode.Selection) => {
        acc.push(createRangeSPEP(selection.start, selection.active));
        return acc;
    }, [] as vscode.Range[]));
    applyDecoration(editor, highlightStyleList[__0x.multiCursor][1], editor.selections.reduce((acc: vscode.Range[], selection: vscode.Selection) => {
        acc.push(createRangeNNNN(selection.active.line, 0, selection.active.line, selection.active.character));
        return acc;
    }, [] as vscode.Range[]));

};

const unsetRangeOfHighlightStyle = (editor: vscode.TextEditor) => {
    SELECTION_KIND_LIST.forEach(highlight => {
        resetDecorationRange(editor, highlightStyleList[highlight]);
    });
};

const coordinatorSplit: Type.CoordinatorSplitType = {
    [__0x.cursorOnly]: (editor: vscode.TextEditor, previousKey: number) => cursorOnlyHighlightRange(editor, previousKey),
    [__0x.singleLine]: (editor: vscode.TextEditor, previousKey: number) => singelLineHighlightRange(editor, previousKey),
    [__0x.multiLine]: (editor: vscode.TextEditor, previousKey: number) => multiLineHighlightRange(editor, previousKey),
    [__0x.multiCursor]: (editor: vscode.TextEditor, previousKey: number) => multiCursorHighlightRange(editor, previousKey)
};

const hightlightCoordinator = (currentKey: number, previousKey: number) => {
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