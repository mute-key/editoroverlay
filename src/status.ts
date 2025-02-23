import * as vscode from 'vscode';
import * as Type from './type/type.d';
import {
    DECORATION_STYLE_KEY
} from './constant/enum';
import {
    NO_CONFIGURATION_GENERAL_DEFAULT
} from './constant/object';
import {
    hexToRgbaStringLiteral
} from './util';
import {
    createRangeSPEP,
} from './editor';
import {
    createEditorDecorationType,
    applyDecoration
} from './decoration';

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

const cursorOnlyStatus = (editor: vscode.TextEditor, type: Type.DecorationInfoPropType): Type.StatusInfoType[] => {
    return [{
        contentText: statusOf[type.KEY].contentText(editor.selection.active.character),
        range: createRangeSPEP(editor.selection.active, editor.selection.active),
        isWholeLine: true
    }];
};

const singleLineStatus = (editor: vscode.TextEditor, type: Type.DecorationInfoPropType): Type.StatusInfoType[] => {
    return [{
        contentText: statusOf[type.KEY].contentText(Math.abs(editor.selection.end.character - editor.selection.start.character)),
        range: createRangeSPEP(editor.selection.active, editor.selection.active),
        isWholeLine: true
    }];
};

const multilineStatus = (editor: vscode.TextEditor, status: Type.StatusType, type: Type.DecorationInfoPropType): Type.StatusInfoType[] => {
    
    const text = editor.document.getText(editor.selection);
    const count = text.replace(status.indent.regex, "").length;
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
};

const multiCursorStatus = (editor: vscode.TextEditor, status: Type.StatusType, type: Type.DecorationInfoPropType): Type.StatusInfoType[] => {
    let length = editor.selections.length;
    let idx = 0;
    let charCount = 0;
    let lineCount = 0;
    let isSingleLine = editor.selections[0].start.line === editor.selections[0].end.line;
    let lineDiff = 0;
    const statusInfo: Type.StatusInfoType[] = [];
    const statusLine: number[] = [];

    lineDiff = isSingleLine ? 1 : Math.abs(editor.selections[0].end.line - editor.selections[0].start.line) + 1;

    while (idx < length) {
        if (isSingleLine) {
            charCount = charCount + (editor.selections[idx].end.character - editor.selections[idx].start.character);
            lineCount = lineCount + lineDiff;
        } else {
            const text = editor.document.getText(editor.selections[idx]);
            charCount = charCount + text.replace(status.indent.regex, "").length;
            lineCount = lineCount + lineDiff;
        }
        idx++;
    }

    idx = length;
    
    while (idx--) {
        const lineSet = new Set(statusLine);
        if (lineSet.has(editor.selections[idx].end.line)) {
            continue;
        }

        statusInfo.push({
            contentText: statusOf[type.KEY].contentText(idx + 1, length, lineCount, charCount),
            range: createRangeSPEP(editor.selections[idx].start, editor.selections[idx].end),
            isWholeLine: true
        });

        statusLine.push(editor.selections[idx].end.line);

        idx++;
    }
    return statusInfo;
};

const statusInfoSplit = (editor: vscode.TextEditor, status: Type.StatusType, type: Type.DecorationInfoPropType): Type.statusInfoSplitType => {

    return {
        [DECORATION_STYLE_KEY.CURSOR_ONLY]: () => cursorOnlyStatus(editor, type),
        [DECORATION_STYLE_KEY.SINGLE_LINE]: () => singleLineStatus(editor, type),
        [DECORATION_STYLE_KEY.MULTI_LINE]: () => multilineStatus(editor, status, type),
        [DECORATION_STYLE_KEY.MULTI_CURSOR]: () => multiCursorStatus(editor, status, type),
    };
};

const statusDecorationType = (statusInfo: Type.StatusInfoType, generalConfig: Type.GeneralConfigInfoType): Type.StatusDecorationReadyType => {

    // config need to be polished...

    const textColor = generalConfig.statusTextColor;
    const textOpacity = generalConfig.statusTextOpacity;
    const defaultColor = NO_CONFIGURATION_GENERAL_DEFAULT.statusTextColor;
    const defaultOpacity = NO_CONFIGURATION_GENERAL_DEFAULT.statusTextOpacity;

    // initialy was using shallow copied object but it is slower.
    // this method reponse better.

    // generalConfig.statusTextBackgroundColor
    return {
        isWholeLine: statusInfo.isWholeLine,
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        after: {
            contentText: statusInfo.contentText,
            color: hexToRgbaStringLiteral(textColor, textOpacity, defaultColor, defaultOpacity),
            backgroundColor: generalConfig.statusTextBackgroundColor,
            fontWeight: 'light',
            fontStyle: 'italic',
            textDecoration: 'none',
            margin: '0 0 0 20px',
        } as const
    };
};

const setStatusDecoration = (
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

/**
 * status decoration needs to be displosed in order to recreate with 
 * different content text, meaning to display the status info text.
 * 
 * @param status 
 */
const disposeStatusInfo = (status: Type.StatusReadyType): void => {
    let length = status.decorationType.length;
    while (length--) {
        status.decorationType[length].dispose();
        delete status.decorationType[length];
    }
};

const status = (editor: vscode.TextEditor, status: Type.StatusType, generalConfig: Type.GeneralConfigInfoType, type: Type.DecorationInfoPropType): void => {
    const statusInfo = statusInfoSplit(editor, status, type)[type.KEY]();

    // editor.revealRange(editor.selection, vscode.TextEditorRevealType.Default);
    // console.log(createRangeNNNN(0,0,0,0), vscode.TextEditorRevealType.InCenterIfOutsideViewport);

    if (status.decorationType) {
        disposeStatusInfo(status as Type.StatusReadyType);
        status.decorationType = setStatusDecoration(editor, statusInfo, generalConfig);
    } else {
        status.decorationType = setStatusDecoration(editor, statusInfo, generalConfig);
    }
};

export {
    status
};