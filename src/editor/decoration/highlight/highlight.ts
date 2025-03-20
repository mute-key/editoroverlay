import * as vscode from 'vscode';
import * as Type from '../../../type/type';
import { applyDecoration } from '../decoration';
import { createRangeNNNN, createRangeSPEP, createRangeNNEP } from '../../range';
import { DECORATION_STYLE_KEY } from '../../../constant/enum';

const cursorOnlyHighlightRange: Type.SelectionTypeToDecorationFunc = (context): Type.DecorationWithRangeType[] => {
    const { editor, borderConfig, textEditorHighlight } = context;
    // index 0 - border applied decoration on selection
    // index 1 - background only decoration

    if (borderConfig.isWholeLine) {
        return [{
            decoration: textEditorHighlight[0],
            range: [createRangeSPEP(editor.selection.active, editor.selection.active)]
        }];
    }

    if (borderConfig.beforeCursor) {
        return [{
            decoration: textEditorHighlight[0],
            range: [createRangeNNNN(editor.selection.active.line, 0, editor.selection.active.line, editor.selection.active.character)]
        }];
    }

    if (borderConfig.afterCursor) {
        return [{
            decoration: textEditorHighlight[0],
            range: [createRangeNNEP(editor.selection.active.line, editor.selection.active.character, editor.document.lineAt(editor.selection.active.line).range.end
            )]
        },
        {
            decoration: textEditorHighlight[1],
            range: [createRangeNNNN(editor.selection.active.line, 0, editor.selection.active.line, editor.selection.active.character)]
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
        range: [createRangeSPEP(editor.selection.start, editor.selection.end)]
    }];
};

const multiLineHighlightRange: Type.SelectionTypeToDecorationFunc = ({ editor, borderConfig, textEditorHighlight }): Type.DecorationWithRangeType[] => {
    if (borderConfig.borderPosition === 'left') {

        // index 0, 1, 2 are the same left only decoration.
        // they had to be wholeLine but it was anomaly.

        return [{
            decoration: textEditorHighlight[2],
            range: [createRangeNNNN(editor.selection.start.line, editor.selection.start.character, editor.selection.end.line, editor.selection.end.character)]
        },];
    } else {

        // index 0 - top border
        // index 1 - bottom border
        // index 2 - background color only for the range inbetween 0 and 1.
        // [!] review to differentiate zero border decoraiton for wholeLine background and not-wholeLine background.

        const highlightRange: Type.DecorationWithRangeType[] = [];

        highlightRange.push({
            decoration: textEditorHighlight[0],
            range: [createRangeSPEP(editor.selection.start, editor.selection.start)]
        },
            {
                decoration: textEditorHighlight[1],
                range: [createRangeSPEP(editor.selection.end, editor.selection.end)]
            });

        if (Math.abs(editor.selection.start.line - editor.selection.end.line) > 1) {
            highlightRange.push({
                decoration: textEditorHighlight[2],
                range: [createRangeNNNN(editor.selection.start.line + 1, editor.selection.start.character, editor.selection.end.line - 1, editor.selection.end.character)]
            });
        } else {

            // found this another exception where this background decoration not being reset when range shrink.
            // this background decoraiton being applied on selection range expand as it should, but does not reset
            // when abs(cursor - ancher) is than 1.
            // the background decoration overlaps with cursor/anchor line on shrink when abs() is 1,
            // making it backgound applied twice.
            // if the abs(cursor - ancher) is less than 1, meaning it goes into single-line, decoration type changes
            // and this decoration is automatically reset at that point.
            // so this is a way to reset this decoration without changing the decoration type as well as with minimum steps.

            applyDecoration(editor, textEditorHighlight[2], []);
        }
        return highlightRange;
    }
};

const multiCursorHighlightRange: Type.SelectionTypeToDecorationFunc = ({ editor, textEditorHighlight }): Type.DecorationWithRangeType[] => {

    // index 0 - selection area
    // index 1 - to apply background color on line until cursor position.

    return [{
        decoration: textEditorHighlight[0],
        range: editor.selections.reduce((acc: vscode.Range[], selection: vscode.Selection) => {
            acc.push(createRangeSPEP(selection.start, selection.active));
            return acc;
        }, [] as vscode.Range[])
    },
    {
        decoration: textEditorHighlight[1],
        range: editor.selections.reduce((acc: vscode.Range[], selection: vscode.Selection) => {
            acc.push(createRangeNNNN(selection.active.line, 0, selection.active.line, selection.active.character));
            return acc;
        }, [] as vscode.Range[])
    }];
};

const coordinatorSplit: Type.CoordinatorSplitType = {
    [DECORATION_STYLE_KEY.CURSOR_ONLY]: (context: Type.SelectionHighlightKindContext) => cursorOnlyHighlightRange(context),
    [DECORATION_STYLE_KEY.SINGLE_LINE]: (context: Type.SelectionHighlightKindContext) => singelLineHighlightRange(context),
    [DECORATION_STYLE_KEY.MULTI_LINE]: (context: Type.SelectionHighlightKindContext) => multiLineHighlightRange(context),
    [DECORATION_STYLE_KEY.MULTI_CURSOR]: (context: Type.SelectionHighlightKindContext) => multiCursorHighlightRange(context),
};

/**
 * decoraiton range should be depends of the border position, current setup is with default border styles.
 * 
 * @param
 * @returns
 * 
 */
const hightlightCoordinator: Type.DecorationCoordinatorFunc = ({ editor, configInfo, decorationInfo, decorationState }): Type.DecorationWithRangeType[] => {
    
    const textEditorHighlight = decorationState.highlightStyleList[decorationInfo.KEY] as vscode.TextEditorDecorationType[];
    const borderConfig: Type.BorderPositionParserType = configInfo.borderPositionInfo[decorationInfo.KEY] as Type.BorderPositionParserType;

    return coordinatorSplit[decorationInfo.KEY]({
        editor,
        borderConfig,
        textEditorHighlight
    });
};

export {
    hightlightCoordinator,
};