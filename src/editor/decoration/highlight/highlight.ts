import * as vscode from 'vscode';
import * as Type from '../../../type/type';
import * as __0x from '../../../constant/numeric';
import Range from '../../range';
import { HIGHLIGHT_BORDER_POSITION_INFO, HIGHLIGHT_STYLE_LIST, HIGHLIGHT_STYLE_SYMBOL_LIST } from '../../../constant/object';
import { applyDecoration, resetDecorationRange } from '../decoration';
// import { DECORATION_STYLE_KEY, DECORATION_TYPE_MASK, SELECTION_TYPE } from '../../../constant/enum';

const highlightStyleList = {
    ...HIGHLIGHT_STYLE_LIST,
    __proto__: null
} as unknown as Type.HighlightStyleListType;

const borderPositionInfo = {
    ...HIGHLIGHT_BORDER_POSITION_INFO,
    __proto__: null,
} as unknown as Type.BorderPositionInfoType;

const cursorOnlyHighlightRange = (previousKey): void => {

    // const borderConfig: Type.BorderPositionParserType = borderPositionInfo[borderConfigSymlink] as Type.BorderPositionParserType;

    const editor = vscode.window.activeTextEditor;
    if (editor) {
        // index 0 - border applied decoration on selection
        // index 1 - background only decoration

        resetDecorationRange(editor, highlightStyleList[previousKey]);

        applyDecoration(editor, highlightStyleList[__0x.cursorOnly][0], [Range.createRangeSPEP(editor.selection.active, editor.selection.active)]);
    }

    // return [{
    //     decoration: highlightStyleList[__0x.cursorOnly][0],
    //     range: [Range.createRangeSPEP(editor.selection.active, editor.selection.active)],
    //     __proto__: null
    // }];

    // if (borderConfig.isWholeLine) {
    // }

    // if (borderConfig.beforeCursor) {
    //     return [{
    //         decoration: textEditorHighlight[0],
    //         range: [Range.createRangeNNNN(editor.selection.active.line, 0, editor.selection.active.line, editor.selection.active.character)],
    //         __proto__: null
    //     }];
    // }

    // if (borderConfig.afterCursor) {
    //     return [{
    //         decoration: textEditorHighlight[0],
    //         range: [Range.createRangeNNEP(editor.selection.active.line, editor.selection.active.character, editor.document.lineAt(editor.selection.active.line).range.end)],
    //         __proto__: null
    //     },
    //     {
    //         decoration: textEditorHighlight[1],
    //         range: [Range.createRangeNNNN(editor.selection.active.line, 0, editor.selection.active.line, editor.selection.active.character)],
    //         __proto__: null
    //     }];
    // }
    // return [];
};

const singelLineHighlightRange = (previousKey): void => {


    const editor = vscode.window.activeTextEditor;

    if (editor) {
        // index 0 - single line decoration on selection
        // index 1 - background color only decoration <- this is todo. maybe. problem is this deco is not whole line. :(
        // [!] review to differentiate zero border decoraiton for wholeLine background and not-wholeLine background.

        applyDecoration(editor, highlightStyleList[__0x.singleLine][0], [Range.createRangeSPEP(editor.selection.start, editor.selection.end)]);

        // return [{
        //     decoration: highlightStyleList[__0x.singleLine][0],
        //     range: [Range.createRangeSPEP(editor.selection.start, editor.selection.end)],
        //     __proto__: null
        // }];
    };
};

const multiLineHighlightRange = (previousKey) => {



    const editor = vscode.window.activeTextEditor;

    if (editor) {
        resetDecorationRange(editor, highlightStyleList[previousKey]);

        // index 0 - top border
        // index 1 - bottom border
        // index 2 - background color only for the range inbetween 0 and 1.

        applyDecoration(editor, highlightStyleList[__0x.multiLine][0], [Range.createRangeSPEP(editor.selection.start, editor.selection.start)]);
        applyDecoration(editor, highlightStyleList[__0x.multiLine][1], [Range.createRangeSPEP(editor.selection.end, editor.selection.end)]);
        applyDecoration(editor, highlightStyleList[__0x.multiLine][2], [editor.selection]);
    }


    // return [{
    //     decoration: highlightStyleList[__0x.multiLine][0],
    //     range: [Range.createRangeSPEP(editor.selection.start, editor.selection.start)],
    //     __proto__: null
    // }, {
    //     decoration: highlightStyleList[__0x.multiLine][1],
    //     range: [Range.createRangeSPEP(editor.selection.end, editor.selection.end)],
    //     __proto__: null
    // }, {
    //     decoration: highlightStyleList[__0x.multiLine][2],
    //     range: [editor.selection],
    //     __proto__: null
    // }];
};

const multiCursorHighlightRange = (previousKey): void => {
    const editor = vscode.window.activeTextEditor;



    if (editor) {
        resetDecorationRange(editor, highlightStyleList[previousKey]);

        // index 0 - selection area
        // index 1 - to apply background color on line until cursor position.
        applyDecoration(editor, highlightStyleList[__0x.multiCursor][0], editor.selections.reduce((acc: vscode.Range[], selection: vscode.Selection) => {
            acc.push(Range.createRangeSPEP(selection.start, selection.active));
            return acc;
        }, [] as vscode.Range[]));
        applyDecoration(editor, highlightStyleList[__0x.multiCursor][1], editor.selections.reduce((acc: vscode.Range[], selection: vscode.Selection) => {
            acc.push(Range.createRangeNNNN(selection.active.line, 0, selection.active.line, selection.active.character));
            return acc;
        }, [] as vscode.Range[]));
    }

    // return [{
    //     decoration: highlightStyleList[__0x.multiCursor][0],
    //     range: editor.selections.reduce((acc: vscode.Range[], selection: vscode.Selection) => {
    //         acc.push(Range.createRangeSPEP(selection.start, selection.active));
    //         return acc;
    //     }, [] as vscode.Range[]),
    //     __proto__: null
    // },
    // {
    //     decoration: highlightStyleList[__0x.multiCursor][1],
    //     range: editor.selections.reduce((acc: vscode.Range[], selection: vscode.Selection) => {
    //         acc.push(Range.createRangeNNNN(selection.active.line, 0, selection.active.line, selection.active.character));
    //         return acc;
    //     }, [] as vscode.Range[]),
    //     __proto__: null
    // }];
};

const unsetRangeOfHighlightStyle = (editor: vscode.TextEditor) => {
    HIGHLIGHT_STYLE_SYMBOL_LIST.forEach(highlight => {
        resetDecorationRange(editor, highlightStyleList[highlight]);
    });
};

const coordinatorSplit: Type.CoordinatorSplitType = {
    [__0x.cursorOnly]: (previousKey) => cursorOnlyHighlightRange(previousKey),
    [__0x.singleLine]: (previousKey) => singelLineHighlightRange(previousKey),
    [__0x.multiLine]: (previousKey) => multiLineHighlightRange(previousKey),
    [__0x.multiCursor]: (previousKey) => multiCursorHighlightRange(previousKey),
    __proto__: null
};

const hightlightCoordinator = (currentKey: symbol, previousKey: symbol) => {
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
    unsetRangeOfHighlightStyle
};