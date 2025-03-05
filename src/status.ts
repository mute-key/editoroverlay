import * as vscode from 'vscode';
import * as Type from './type/type.d';
import {
    DECORATION_STYLE_KEY
} from './constant/enum';
import {
    createRangeSPEP,
} from './editor';
import {
    createEditorDecorationType,
    applyDecoration
} from './decoration';

const statusOf: Type.StatusOfType = {
    [DECORATION_STYLE_KEY.CURSOR_ONLY]: {
        contentText: (col: string, end: string) => col === end ? `< Editing ... At (Col ${col})` : `< Editing ... At (Col ${col}/${end})`
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

const cursorOnlyStatus = (editor: vscode.TextEditor, type: Type.DecorationInfoPropType): Type.StatusTextInfoType[] => {
    return [{
        contentText: statusOf[type.KEY].contentText(editor.selection.active.character, editor.document.lineAt(editor.selection.active.line).text.length),
        range: createRangeSPEP(editor.selection.active, editor.selection.active),
        isWholeLine: true
    }];
};

const singleLineStatus = (editor: vscode.TextEditor, type: Type.DecorationInfoPropType): Type.StatusTextInfoType[] => {
    return [{
        contentText: statusOf[type.KEY].contentText(Math.abs(editor.selection.end.character - editor.selection.start.character)),
        range: createRangeSPEP(editor.selection.active, editor.selection.active),
        isWholeLine: true
    }];
};

const multilineStatus = (editor: vscode.TextEditor, indent: Type.IndentType, type: Type.DecorationInfoPropType): Type.StatusTextInfoType[] => {
    
    const text = editor.document.getText(editor.selection);
    const count = text.replace(indent.regex as RegExp, "").length;
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

const multiCursorStatus = (editor: vscode.TextEditor, indent: Type.IndentType, type: Type.DecorationInfoPropType): Type.StatusTextInfoType[] => {
    let length = editor.selections.length;
    let idx = 0;
    let charCount = 0;
    let lineCount = 0;
    let isSingleLine = editor.selections[0].start.line === editor.selections[0].end.line;
    let lineDiff = 0;
    const statusTextInfo: Type.StatusTextInfoType[] = [];
    const statusLine: number[] = [];

    lineDiff = isSingleLine ? 1 : Math.abs(editor.selections[0].end.line - editor.selections[0].start.line) + 1;

    while (idx < length) {
        if (isSingleLine) {
            charCount = charCount + (editor.selections[idx].end.character - editor.selections[idx].start.character);
            lineCount = lineCount + lineDiff;
        } else {
            const text = editor.document.getText(editor.selections[idx]);
            charCount = charCount + text.replace(indent.regex as RegExp, "").length;
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

        statusTextInfo.push({
            contentText: statusOf[type.KEY].contentText(idx + 1, length, lineCount, charCount),
            range: createRangeSPEP(editor.selections[idx].start, editor.selections[idx].end),
            isWholeLine: true
        });

        statusLine.push(editor.selections[idx].end.line);

        idx++;
    }
    return statusTextInfo;
};

const statusDecorationType = (statusTextInfo: Type.StatusTextInfoType, statusText: Type.StatusDecorationType): Type.StatusDecorationReadyType => {
    statusText.isWholeLine = statusTextInfo.isWholeLine;
    statusText.after.contentText = statusTextInfo.contentText;
    return statusText as Type.StatusDecorationReadyType;
};

/**
 * status decoration needs to be displosed in order to recreate with 
 * different content text, meaning to display the status info text.
 * 
 * @param status 
 */
const disposeStatusInfo = (decorationState: Type.DecorationStateType): void => {
    if (decorationState.statusText) {
        let length = decorationState.statusText.length;
        while (length--) {
            decorationState.statusText[length].dispose();
        }
        decorationState.statusText = undefined;
    } 
};

const statusTextInfoSplit = (editor: vscode.TextEditor, indent: Type.IndentType , type: Type.DecorationInfoPropType): Type.statusTextInfoSplitType => {
    return {
        [DECORATION_STYLE_KEY.CURSOR_ONLY]: () => cursorOnlyStatus(editor, type),
        [DECORATION_STYLE_KEY.SINGLE_LINE]: () => singleLineStatus(editor, type),
        [DECORATION_STYLE_KEY.MULTI_LINE]: () => multilineStatus(editor, indent, type),
        [DECORATION_STYLE_KEY.MULTI_CURSOR]: () => multiCursorStatus(editor, indent, type),
    };
};

const status = (editor: vscode.TextEditor, decorationState: Type.DecorationStateType, statusInfo: Type.StatusInfoType, type: Type.DecorationInfoPropType): void => {
    const statusTextInfo = statusTextInfoSplit(editor, statusInfo.indent, type)[type.KEY]();
    const statusInfoList: vscode.TextEditorDecorationType[] = [];
    let length: number = statusTextInfo.length;

    while (length--) {
        const editorDecoration = createEditorDecorationType(statusDecorationType(statusTextInfo[length], statusInfo.statusText));
        applyDecoration(editor, editorDecoration, [statusTextInfo[length].range]);
        statusInfoList.push(editorDecoration);
    }

    disposeStatusInfo(decorationState);  

    decorationState.statusText =  statusInfoList;
};

export {
    status,
    disposeStatusInfo
};