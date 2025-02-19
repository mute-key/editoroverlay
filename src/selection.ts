import * as vscode from 'vscode';
import * as Type from './type/type.d';
import { 
    hexToRgbaStringLiteral 
} from './util';
import {
    applyDecoration,
    createEditorDecorationType
} from './decoration';
import {
    NO_CONFIGURATION_GENERAL_DEFAULT,
    DECORATION_STYLE_KEY
} from './constant';

const createRangeNNNN = (sLine: number, sChar: number, eLine: number, eChar: number) => {
    return new vscode.Range(new vscode.Position(sLine, sChar), new vscode.Position(eLine, eChar));
};

const createRangeSPEP = (start: vscode.Position, end: vscode.Position) => {
    return new vscode.Range(start, end);
};

const createRangeNNEP = (line: number, char: number, end: vscode.Position) => {
    return new vscode.Range(new vscode.Position(line, char), end);
};

const statusOf: Type.StatusOfType = {
    [DECORATION_STYLE_KEY.CURSOR_ONLY]: {
        contentText: (col: string) => `< Editing ... At (Col ${col})`,
    },
    [DECORATION_STYLE_KEY.SINGLE_LINE]: {
        contentText: (characters: string) => `< Selection ... Of (${characters} Characters)`,
    },
    [DECORATION_STYLE_KEY.MULTI_LINE]: {
        contentText: (lines: string, characters: string, position: string) =>
            `< Selection ${position} ... Of (${lines} Lines, ${characters} Characters, Indent/EOL Ignored)`,
    },
    [DECORATION_STYLE_KEY.MULTI_CURSOR]: {
        contentText: (nth: string, selectionCount: string, lines: string, characters: string) =>
            `< Multi Selection ... Of (${nth} of ${selectionCount}, with Total ${lines} Lines ${characters} Characters )`,
    },
};

const statusInfoSplit = (editor: vscode.TextEditor, status: Type.StatusType, type: Type.DecorationInfoPropType): Type.statusInfoSplitType => {

    return {
        [DECORATION_STYLE_KEY.CURSOR_ONLY]: () => [{
            contentText: statusOf[type.KEY].contentText(editor.selection.active.character),
            range: createRangeSPEP(editor.selection.active, editor.selection.active),
            isWholeLine: true
        }],
        [DECORATION_STYLE_KEY.SINGLE_LINE]: () => [{
            contentText: statusOf[type.KEY].contentText(Math.abs(editor.selection.end.character - editor.selection.start.character)),
            range: createRangeSPEP(editor.selection.active, editor.selection.active),
            isWholeLine: true
        }],
        [DECORATION_STYLE_KEY.MULTI_LINE]: () => {
            const text = editor.document.getText(editor.selection);
            const count = text.replace(status.indent.regex, "").length;
            // const count = text.length;
            const args = Math.abs(editor.selection.end.line - editor.selection.start.line) + 1;

            return [{
                contentText: statusOf[type.KEY].contentText(args, count, 'Anchor'),
                range: createRangeSPEP(editor.selection.anchor, editor.selection.anchor),
                isWholeLine: true
            }, {
                contentText: statusOf[type.KEY].contentText(args, count, 'Cursor'),
                range: createRangeSPEP(editor.selection.active, editor.selection.active),
                isWholeLine: true
            }];
        },
        [DECORATION_STYLE_KEY.MULTI_CURSOR]: () => {
            let length = editor.selections.length;
            let idx = 0;
            let charCount = 0;
            let lineCount = 0;
            let isSingleLine = editor.selections[0].start.line === editor.selections[0].end.line;
            let lineDiff = 0;
            const statusInfo: Type.StatusInfoType[] = [];
            if (isSingleLine) {
                lineDiff = 1;
            } else {
                lineDiff = Math.abs(editor.selections[0].end.line - editor.selections[0].start.line) + 1;
            }

            while (idx < length) {
                if (isSingleLine) {
                    charCount = charCount + (editor.selections[idx].end.character - editor.selections[idx].start.character);
                    lineCount = lineCount + lineDiff;
                } else {

                }
                idx++;
            }

            idx = 0;

            while (idx < length) {
                // createRangeNNNN(
                // editor.selections[idx].start.line + 1, editor.selections[idx].start.character, 
                // editor.selections[idx].end.line + 1, editor.selections[idx].end.character)

                statusInfo.push({
                    contentText: statusOf[type.KEY].contentText(idx + 1, length, lineCount, charCount),
                    range: createRangeSPEP(editor.selections[idx].start, editor.selections[idx].end),
                    isWholeLine: true
                });
                idx++;
            }
            return statusInfo;
        },
    };
};

const statusDecorationType = (statusInfo: Type.StatusInfoType, generalConfig: Type.GeneralConfigInfoType) => {

    // config need to be polished... 

    return {
        isWholeLine: statusInfo.isWholeLine,
        after: {
            contentText: statusInfo.contentText,
            color: hexToRgbaStringLiteral(generalConfig.statusTextColor as string, generalConfig.statusTextOpacity as number, NO_CONFIGURATION_GENERAL_DEFAULT.statusTextColor as string, NO_CONFIGURATION_GENERAL_DEFAULT.statusTextOpacity),
            fontWeight: 'light',
            fontStyle: 'italic',
            textDecoration: 'none',
            margin: '0 0 0 20px',
            width: '100wh',
        }
    };
};

const setStatusInfoDecoration = (
    editor: vscode.TextEditor,
    statusInfo: Type.StatusInfoType[],
    generalConfig: Type.GeneralConfigInfoType
): vscode.TextEditorDecorationType[] => {

    const statusInfoList: vscode.TextEditorDecorationType[] = [];
    let length = statusInfo.length;

    while (length--) {
        const editorDecoration = createEditorDecorationType(statusDecorationType(statusInfo[length], generalConfig));
        applyDecoration(editor, editorDecoration, [statusInfo[length].range]);
        statusInfoList.push(editorDecoration);
    }

    return statusInfoList;
};

const disposeStatusInfo = (status: Type.StatusReadyType): void => {
    let length = status.decorationType.length;
    while (length--) {
        status.decorationType[length].dispose();
    }
};

const status = (editor: vscode.TextEditor, status: Type.StatusType, generalConfig: Type.GeneralConfigInfoType, type: Type.DecorationInfoPropType) => {
    const statusInfo = statusInfoSplit(editor, status, type)[type.KEY]();

    if (status.decorationType) {
        disposeStatusInfo(status as Type.StatusReadyType);
        status.decorationType = undefined;
        status.decorationType = setStatusInfoDecoration(editor, statusInfo, generalConfig);
    } else {
        status.decorationType = setStatusInfoDecoration(editor, statusInfo, generalConfig);
    }
};

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

        decorationWithRange.push(...[{
            decoration: textEditorDecoration[0],
            range: [createRangeSPEP(editor.selection.start, editor.selection.start)]
        },
        {
            decoration: textEditorDecoration[1],
            range: [createRangeSPEP(editor.selection.end, editor.selection.end)]
        }]);

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
    status,
    cursorOnlyDecorationWithRange,
    singelLineDecorationWithRange,
    multiLineDecorationWithRange,
    multiCursorDecorationWithRange
};