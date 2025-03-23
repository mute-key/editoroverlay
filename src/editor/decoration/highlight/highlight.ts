import * as vscode from 'vscode';
import * as Type from '../../../type/type';
import Range from '../../range';
import { HIGHLIGHT_BORDER_POSITION_INFO, HIGHLIGHT_STYLE_LIST, HIGHLIGHT_STYLE_SYMBOL_LIST } from '../../../constant/object';
// import { DECORATION_STYLE_KEY, DECORATION_TYPE_MASK, SELECTION_TYPE } from '../../../constant/enum';
import { resetDecorationRange } from '../decoration';
import * as $ from '../../../constant/symbol';

const highlightStyleList = { ...HIGHLIGHT_STYLE_LIST } as unknown as Type.HighlightStyleListType;

const borderPositionInfo = { ...HIGHLIGHT_BORDER_POSITION_INFO } as unknown as Type.BorderPositionInfoType;

const cursorOnlyHighlightRange: Type.SelectionTypeToDecorationFunc = (context): Type.DecorationWithRangeType[] => {
    const { editor, borderConfig, textEditorHighlight } = context;
    // index 0 - border applied decoration on selection
    // index 1 - background only decoration

    if (borderConfig.isWholeLine) {
        return [{
            decoration: textEditorHighlight[0],
            range: [Range.createRangeSPEP(editor.selection.active, editor.selection.active)]
        }];
    }

    if (borderConfig.beforeCursor) {
        return [{
            decoration: textEditorHighlight[0],
            range: [Range.createRangeNNNN(editor.selection.active.line, 0, editor.selection.active.line, editor.selection.active.character)]
        }];
    }

    if (borderConfig.afterCursor) {
        return [{
            decoration: textEditorHighlight[0],
            range: [Range.createRangeNNEP(editor.selection.active.line, editor.selection.active.character, editor.document.lineAt(editor.selection.active.line).range.end
            )]
        },
        {
            decoration: textEditorHighlight[1],
            range: [Range.createRangeNNNN(editor.selection.active.line, 0, editor.selection.active.line, editor.selection.active.character)]
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
        range: [Range.createRangeSPEP(editor.selection.start, editor.selection.end)]
    }];
};

const multiLineHighlightRange: Type.SelectionTypeToDecorationFunc = ({ editor, textEditorHighlight }): Type.DecorationWithRangeType[] => {

    // index 0 - top border
    // index 1 - bottom border
    // index 2 - background color only for the range inbetween 0 and 1.

    return [{
        decoration: textEditorHighlight[0],
        range: [Range.createRangeSPEP(editor.selection.start, editor.selection.start)]
    }, {
        decoration: textEditorHighlight[1],
        range: [Range.createRangeSPEP(editor.selection.end, editor.selection.end)]
    }, {
        decoration: textEditorHighlight[2],
        range: [editor.selection]
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
        }, [] as vscode.Range[])
    },
    {
        decoration: textEditorHighlight[1],
        range: editor.selections.reduce((acc: vscode.Range[], selection: vscode.Selection) => {
            acc.push(Range.createRangeNNNN(selection.active.line, 0, selection.active.line, selection.active.character));
            return acc;
        }, [] as vscode.Range[])
    }];
};

const unsetRangeOfHighlightStyle = (editor: vscode.TextEditor) => {
    // const l = highlightStyleList.length;
    // console.log(l);
    // for ()

    HIGHLIGHT_STYLE_SYMBOL_LIST.forEach(highlight => {
        resetDecorationRange(editor, highlightStyleList[highlight]);
    });
    // for (const [key, highlight] of ) {
    // if (key === SELECTION_TYPE.MULTI_LINE) {
    //     break;
    // }
    // }
};

const coordinatorSplit: Type.CoordinatorSplitType = {
    [$.cursorOnly]: (context: Type.SelectionHighlightKindContext) => cursorOnlyHighlightRange(context),
    [$.singleLine]: (context: Type.SelectionHighlightKindContext) => singelLineHighlightRange(context),
    [$.multiLine]: (context: Type.SelectionHighlightKindContext) => multiLineHighlightRange(context),
    [$.multiCursor]: (context: Type.SelectionHighlightKindContext) => multiCursorHighlightRange(context),

};

/**
 * decoraiton range should be depends of the border position, current setup is with default border styles.
 * 
 * @param
 * @returns
 * 
 */
const hightlightCoordinator: Type.DecorationCoordinatorFunc = ({ editor, renderGroup, decorationState }): Type.DecorationWithRangeType[] => {

    const textEditorHighlight = highlightStyleList[renderGroup.type.KEY] as vscode.TextEditorDecorationType[];
    const borderConfig: Type.BorderPositionParserType = borderPositionInfo[renderGroup.type.KEY] as Type.BorderPositionParserType;

    return coordinatorSplit[renderGroup.type.KEY]({
        editor,
        decorationState,
        borderConfig,
        textEditorHighlight
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