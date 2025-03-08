import * as vscode from 'vscode';
import * as Type from './type/type.d';
import {
    DECORATION_STYLE_KEY,
    STATUS_CONTENT_TEXT_CONFIG_KEY
} from './constant/enum';
import {
    createRangeSPEP,
} from './editor';
import {
    createEditorDecorationType,
    applyDecoration
} from './decoration';

const cursorOnlyContentTextState: (string | Type.ContentTextFuncSignature)[] = [];
const singleLineContentTextState: (string | Type.ContentTextFuncSignature)[] = [];
const multiLineCursorContentTextState: (string | Type.ContentTextFuncSignature)[] = [];
const multiLineAnchorContentTextState: (string | Type.ContentTextFuncSignature)[] = [];
const multiCursorContentTextState: (string | Type.ContentTextWithIndexFuncSignature)[] = [];

const contentTextState = {
    [STATUS_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: (statusContentText) => {
        if (statusContentText[STATUS_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT].contentText) {
            cursorOnlyContentTextState.splice(0);
            cursorOnlyContentTextState.push(...statusContentText[STATUS_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT].contentText);
        }
    },
    [STATUS_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: (statusContentText) => {
        if (statusContentText[STATUS_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT].contentText) {
            singleLineContentTextState.splice(0);
            singleLineContentTextState.push(...statusContentText[STATUS_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT].contentText);
        }
    },
    [STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: (statusContentText) => {
        if (statusContentText[STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT].contentText) {
            multiLineCursorContentTextState.splice(0);
            multiLineCursorContentTextState.push(...statusContentText[STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT].contentText);
        }
    },
    [STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: (statusContentText) => {
        if (statusContentText[STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT].contentText) {
            multiLineAnchorContentTextState.splice(0);
            multiLineAnchorContentTextState.push(...statusContentText[STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT].contentText);
        }
    },
    [STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: (statusContentText) => {
        if (statusContentText[STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT].contentText) {
            multiCursorContentTextState.splice(0);
            multiCursorContentTextState.push(...statusContentText[STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT].contentText);
        }
    },
};

const statusOf: Type.StatusOfType = {
    [STATUS_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: {
        ln: ({editor}) => editor.selection.active.line + 1,
        col: ({editor}) => {
            const col = editor.selection.active.character + 1;
            const end = editor.document.lineAt(editor.selection.active.line).text.length + 1;
            return (col === end ? col : col + '/' + end);
        },
        zCol: ({editor}) => {
            const col = editor.selection.active.character;
            const end = editor.document.lineAt(editor.selection.active.line).text.length;
            return (col === end ? col : col + '/' + end);
        }
    },
    [STATUS_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: {
        ln: ({editor}) => editor.selection.active.line + 1,
        char: ({editor}) => Math.abs(editor.selection.end.character - editor.selection.start.character),
    },
    [STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: {
        ln: ({editor}) => editor.selection.active.line + 1,
        lc: ({editor}) => (Math.abs(editor.selection.end.line - editor.selection.start.line) + 1),
        char: ({editor, indent}) => editor.document.getText(editor.selection).replace(indent.regex, "").length
    },
    [STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: {
        ln: ({editor}) => editor.selection.anchor.line + 1,
        lc: ({editor}) => (Math.abs(editor.selection.end.line - editor.selection.start.line) + 1),
        char: ({editor, indent}) => editor.document.getText(editor.selection).replace(indent.regex, "").length,  
    },
    [STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: {
        nth: ({idx}) => idx,
        count: ({editor}) => editor.selections.length,
        ln: ({idx, editor}) => editor.selections[idx].end.line + 1,
        lc: ({editor}) => {
            let idx = 0;
            let lineCount = 0;
            const length = editor.selections.length;
            const isSingleLine = editor.selections[0].start.line === editor.selections[0].end.line;
            const lineDiff = isSingleLine ? 1 : Math.abs(editor.selections[0].end.line - editor.selections[0].start.line) + 1;

            while (idx < length) {
                if (isSingleLine) {
                    lineCount = lineCount + lineDiff;
                } else {
                    lineCount = lineCount + lineDiff;
                }
                idx++;
            }
            return lineCount;
        },
        char: ({editor, indent}) => {
            let idx = 0;
            let charCount = 0;
            const length = editor.selections.length;
            const isSingleLine = editor.selections[0].start.line === editor.selections[0].end.line;

            while (idx < length) {
                if (isSingleLine) {
                    charCount = charCount + (editor.selections[idx].end.character - editor.selections[idx].start.character);
                } else {
                    const text = editor.document.getText(editor.selections[idx]);
                    charCount = charCount + text.replace(indent.regex, "").length;
                }
                idx++;
            }
            return charCount;
        }
    },
};

const cursorOnlyStatus = (editor: vscode.TextEditor): Type.StatusTextInfoType[] => {
    const context = {
        editor: editor,
    };

    return [{
        contentText: cursorOnlyContentTextState.map(entry => typeof entry === 'string' ? entry : entry(context)).join(''),
        range: createRangeSPEP(editor.selection.active, editor.selection.active),
        isWholeLine: true
    }];
};

const singleLineStatus = (editor: vscode.TextEditor): Type.StatusTextInfoType[] => {
    const context = {
        editor: editor,
    };

    return [{
        contentText: singleLineContentTextState.map(entry => typeof entry === 'string' ? entry : entry(context)).join(''),
        range: createRangeSPEP(editor.selection.active, editor.selection.active),
        isWholeLine: true
    }];
};

const multilineStatus = (editor: vscode.TextEditor, indent: Type.IndentType): Type.StatusTextInfoType[] => {

    const context = {
        editor: editor,
        indent: indent
    };

    return [{
        contentText: multiLineCursorContentTextState.map(entry => typeof entry === 'string' ? entry : entry(context)).join(''),
        range: createRangeSPEP(editor.selection.anchor, editor.selection.anchor),
        isWholeLine: true
    }, {
        contentText: multiLineAnchorContentTextState.map(entry => typeof entry === 'string' ? entry : entry(context)).join(''),
        range: createRangeSPEP(editor.selection.active, editor.selection.active),
        isWholeLine: true
    }];

};

const multiCursorStatus = (editor: vscode.TextEditor, indent: Type.IndentType): Type.StatusTextInfoType[] => {

    const statusTextInfo: Type.StatusTextInfoType[] = [];
    const statusLine: number[] = [];
    
    let idx = editor.selections.length;

    while (idx--) {
        const lineSet = new Set(statusLine);
        if (lineSet.has(editor.selections[idx].end.line)) {
            continue;
        }

        const context = {
            idx: idx, 
            editor: editor,
            indent: indent
        };

        statusTextInfo.push({
            contentText: multiCursorContentTextState.map(entry => typeof entry === 'string' ? entry : entry(context)).join(''),
            range: createRangeSPEP(editor.selections[idx].start, editor.selections[idx].end),
            isWholeLine: true
        });

        statusLine.push(editor.selections[idx].end.line);

        idx++;
    }
    return statusTextInfo;
};

const statusDecorationType = (statusTextInfo: Type.StatusTextInfoType, statusDecorationType: Type.StatusDecorationType): Type.StatusDecorationReadyType => {
    statusDecorationType.isWholeLine = statusTextInfo.isWholeLine;
    statusDecorationType.after.contentText = statusTextInfo.contentText;
    return statusDecorationType as Type.StatusDecorationReadyType;
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
        decorationState.statusText = [];
    }
};

const statusTextInfoSplit = (editor: vscode.TextEditor, indent: Type.IndentType): Type.statusTextInfoSplitType => {
    return {
        [DECORATION_STYLE_KEY.CURSOR_ONLY]: () => cursorOnlyStatus(editor),
        [DECORATION_STYLE_KEY.SINGLE_LINE]: () => singleLineStatus(editor),
        [DECORATION_STYLE_KEY.MULTI_LINE]: () => multilineStatus(editor, indent),
        [DECORATION_STYLE_KEY.MULTI_CURSOR]: () => multiCursorStatus(editor, indent),
    };
};

const statusText = (editor: vscode.TextEditor, decorationState: Type.DecorationStateType, statusInfo: Type.StatusInfoType, type: Type.DecorationInfoPropType): void => {
    const statusTextInfo = statusTextInfoSplit(editor, statusInfo.indent)[type.KEY]();
    const statusInfoList: vscode.TextEditorDecorationType[] = [];
    let length: number = statusTextInfo.length;

    while (length--) {
        const editorDecoration = createEditorDecorationType(statusDecorationType(statusTextInfo[length], statusInfo.statusDecoration));
        applyDecoration(editor, editorDecoration, [statusTextInfo[length].range]);
        statusInfoList.push(editorDecoration);
    }

    disposeStatusInfo(decorationState);

    decorationState.statusText = statusInfoList;
};

const bindContentTextState = (type: string): Type.BindContentTextStateType => {
    return {
        statusOf: statusOf[type],
        contentTextState: contentTextState[type]
    };
};

export {
    statusText,
    disposeStatusInfo,
    bindContentTextState
};