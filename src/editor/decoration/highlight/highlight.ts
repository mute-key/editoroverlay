import * as vscode from 'vscode';
import * as Type from '../../../type/type';
import * as $ from '../../../constant/symbol';
import Range from '../../range';
import { HIGHLIGHT_BORDER_POSITION_INFO, HIGHLIGHT_STYLE_LIST, HIGHLIGHT_STYLE_SYMBOL_LIST } from '../../../constant/object';
import { resetDecorationRange } from '../decoration';
// import { DECORATION_STYLE_KEY, DECORATION_TYPE_MASK, SELECTION_TYPE } from '../../../constant/enum';

const highlightStyleList = {
    ...HIGHLIGHT_STYLE_LIST,
    __proto__: null
} as unknown as Type.HighlightStyleListType;

const borderPositionInfo = {
    ...HIGHLIGHT_BORDER_POSITION_INFO,
    __proto__: null,
} as unknown as Type.BorderPositionInfoType;

const cursorOnlyHighlightRange: Type.SelectionTypeToDecorationFunc = ({ editor, borderConfigSymlink, textEditorHighlight }): Type.DecorationWithRangeType[] => {

    const borderConfig: Type.BorderPositionParserType = borderPositionInfo[borderConfigSymlink] as Type.BorderPositionParserType;

    // index 0 - border applied decoration on selection
    // index 1 - background only decoration

    if (borderConfig.isWholeLine) {
        return [{
            decoration: textEditorHighlight[0],
            range: [Range.createRangeSPEP(editor.selection.active, editor.selection.active)],
            __proto__: null
        }];
    }

    if (borderConfig.beforeCursor) {
        return [{
            decoration: textEditorHighlight[0],
            range: [Range.createRangeNNNN(editor.selection.active.line, 0, editor.selection.active.line, editor.selection.active.character)],
            __proto__: null
        }];
    }

    if (borderConfig.afterCursor) {
        return [{
            decoration: textEditorHighlight[0],
            range: [Range.createRangeNNEP(editor.selection.active.line, editor.selection.active.character, editor.document.lineAt(editor.selection.active.line).range.end)],
            __proto__: null
        },
        {
            decoration: textEditorHighlight[1],
            range: [Range.createRangeNNNN(editor.selection.active.line, 0, editor.selection.active.line, editor.selection.active.character)],
            __proto__: null
        }];
    }
    return [];
};

const singelLineHighlightRange: Type.SelectionTypeToDecorationFunc = ({ editor, textEditorHighlight }): Type.DecorationWithRangeType[] => {

    // index 0 - single line decoration on selection
    // index 1 - background color only decoration <- this is todo. maybe. problem is this deco is not whole line. :(
    // [!] review to differentiate zero border decoraiton for wholeLine background and not-wholeLine background.

    return [{
        decoration: textEditorHighlight[0],
        range: [Range.createRangeSPEP(editor.selection.start, editor.selection.end)],
        __proto__: null
    }];
};

const multiLineHighlightRange = ({ editor, textEditorHighlight }): Type.DecorationWithRangeType[] => {

    // index 0 - top border
    // index 1 - bottom border
    // index 2 - background color only for the range inbetween 0 and 1.

    return [{
        decoration: textEditorHighlight[0],
        range: [Range.createRangeSPEP(editor.selection.start, editor.selection.start)],
        __proto__: null
    }, {
        decoration: textEditorHighlight[1],
        range: [Range.createRangeSPEP(editor.selection.end, editor.selection.end)],
        __proto__: null
    }, {
        decoration: textEditorHighlight[2],
        range: [editor.selection],
        __proto__: null
    }];
};

const multiCursorHighlightRange: Type.SelectionTypeToDecorationFunc = ({ editor, textEditorHighlight }): Type.DecorationWithRangeType[] => {

    // index 0 - selection area
    // index 1 - to apply background color on line until cursor position.

    return [{
        decoration: textEditorHighlight[0],
        range: editor.selections.reduce((acc: vscode.Range[], selection: vscode.Selection) => {
            acc.push(Range.createRangeSPEP(selection.start, selection.active));
            return acc;
        }, [] as vscode.Range[]),
        __proto__: null
    },
    {
        decoration: textEditorHighlight[1],
        range: editor.selections.reduce((acc: vscode.Range[], selection: vscode.Selection) => {
            acc.push(Range.createRangeNNNN(selection.active.line, 0, selection.active.line, selection.active.character));
            return acc;
        }, [] as vscode.Range[]),
        __proto__: null
    }];
};

const unsetRangeOfHighlightStyle = (editor: vscode.TextEditor) => {
    HIGHLIGHT_STYLE_SYMBOL_LIST.forEach(highlight => {
        resetDecorationRange(editor, highlightStyleList[highlight]);
    });
};

const coordinatorSplit: Type.CoordinatorSplitType = {
    [$.cursorOnly]: (context: Type.SelectionHighlightKindContext) => cursorOnlyHighlightRange(context),
    [$.singleLine]: (context: Type.SelectionHighlightKindContext) => singelLineHighlightRange(context),
    [$.multiLine]: (context: Type.SelectionHighlightKindContext) => multiLineHighlightRange(context),
    [$.multiCursor]: (context: Type.SelectionHighlightKindContext) => multiCursorHighlightRange(context),
    __proto__: null
};

const hightlightCoordinator = (editor, renderGroupKey) => {

    const textEditorHighlight = highlightStyleList[renderGroupKey] as vscode.TextEditorDecorationType[];
    return coordinatorSplit[renderGroupKey]({
        editor,
        textEditorHighlight,
        borderConfigSymlink: renderGroupKey,
        __proto__: null,
    });
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