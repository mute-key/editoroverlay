import * as vscode from 'vscode';
import * as Type from '../../type/type';
import { 
    applyDecoration 
} from './decoration';
import {
    createRangeNNNN,
    createRangeSPEP,
    createRangeNNEP 
} from '../range';

const cursorOnlyDecorationWithRange: Type.SelectionTypeToDecorationFunc = (context): Type.DecorationWithRangeType[] => {
    const { editor, borderConfig, textEditorDecoration } = context;
    // index 0 - border applied decoration on selection
    // index 1 - background only decoration

    if (borderConfig.isWholeLine) {
        return [{
            decoration: textEditorDecoration[0],
            range: [createRangeSPEP(editor.selection.active, editor.selection.active)]
        }];
    }

    if (borderConfig.beforeCursor) {
        return [{
            decoration: textEditorDecoration[0],
            range: [createRangeNNNN(editor.selection.active.line, 0, editor.selection.active.line, editor.selection.active.character)]
        }];
    }

    if (borderConfig.afterCursor) {
        return [{
            decoration: textEditorDecoration[0],
            range: [createRangeNNEP(editor.selection.active.line, editor.selection.active.character, editor.document.lineAt(editor.selection.active.line).range.end
            )]
        },
        {
            decoration: textEditorDecoration[1],
            range: [createRangeNNNN(editor.selection.active.line, 0, editor.selection.active.line, editor.selection.active.character)]
        }];
    }
    return [];
};

const singelLineDecorationWithRange: Type.SelectionTypeToDecorationFunc = ({ editor, borderConfig, textEditorDecoration }): Type.DecorationWithRangeType[] => {

    // index 0 - single line decoration on selection
    // index 1 - background color only decoration <- this is todo. maybe. problem is this deco is not whole line. :(
    // [!] review to differentiate zero border decoraiton for wholeLine background and not-wholeLine background.

    return [{
        decoration: textEditorDecoration[0],
        range: [createRangeSPEP(editor.selection.start, editor.selection.end)]
    }];
};

const multiLineDecorationWithRange: Type.SelectionTypeToDecorationFunc = ({ editor, borderConfig, textEditorDecoration }): Type.DecorationWithRangeType[] => {
    if (borderConfig.borderPosition === 'left') {

        // index 0, 1, 2 are the same left only decoration.
        // they had to be wholeLine but it was anomaly.

        return [{
            decoration: textEditorDecoration[2],
            range: [createRangeNNNN(editor.selection.start.line, editor.selection.start.character, editor.selection.end.line, editor.selection.end.character)]
        },];
    } else {

        // index 0 - top border
        // index 1 - bottom border
        // index 2 - background color only for the range inbetween 0 and 1.
        // [!] review to differentiate zero border decoraiton for wholeLine background and not-wholeLine background.

        const decorationWithRange: Type.DecorationWithRangeType[] = [];

        decorationWithRange.push({
            decoration: textEditorDecoration[0],
            range: [createRangeSPEP(editor.selection.start, editor.selection.start)]
        },
        {
            decoration: textEditorDecoration[1],
            range: [createRangeSPEP(editor.selection.end, editor.selection.end)]
        });

        if (Math.abs(editor.selection.start.line - editor.selection.end.line) > 1) {
            decorationWithRange.push({
                decoration: textEditorDecoration[2],
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

            applyDecoration(editor, textEditorDecoration[2], []);
        }
        return decorationWithRange;
    }
};

const multiCursorDecorationWithRange: Type.SelectionTypeToDecorationFunc = ({ editor, borderConfig, textEditorDecoration }): Type.DecorationWithRangeType[] => {

    // index 0 - selection area
    // index 1 - to apply background color on line until cursor position.

    return [{
        decoration: textEditorDecoration[0],
        range: editor.selections.reduce((acc: vscode.Range[], selection: vscode.Selection) => {
            acc.push(createRangeSPEP(selection.start, selection.active));
            return acc;
        }, [] as vscode.Range[])
    },
    {
        decoration: textEditorDecoration[1],
        range: editor.selections.reduce((acc: vscode.Range[], selection: vscode.Selection) => {
            acc.push(createRangeNNNN(selection.active.line, 0, selection.active.line, selection.active.character));
            return acc;
        }, [] as vscode.Range[])
    }];
};

export {
    cursorOnlyDecorationWithRange,
    singelLineDecorationWithRange,
    multiLineDecorationWithRange,
    multiCursorDecorationWithRange
};