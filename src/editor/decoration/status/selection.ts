import * as vscode from 'vscode';
import * as Type from '../../../type/type';
import { DECORATION_STYLE_KEY, STATUS_CONTENT_TEXT_CONFIG_KEY } from '../../../constant/enum';
import { STATUS_CONTENT_TEXT } from '../../../constant/object';
import { createActiveRange, createAnchorRange, createStartEndRangeOfSelection } from '../../range';

const selectionContentText = { ...STATUS_CONTENT_TEXT } as Type.StatusContentTextType;

const selectionOf: Type.ContentTextStateType = {
    [STATUS_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: {
        ln: ({ editor }) => editor.selection.active.line + 1,
        col: ({ editor }) => {
            const col = editor.selection.active.character + 1;
            const end = editor.document.lineAt(editor.selection.active.line).text.length + 1;
            return (col === end ? col : col + '/' + end);
        },
        zCol: ({ editor }) => {
            const col = editor.selection.active.character;
            const end = editor.document.lineAt(editor.selection.active.line).text.length;
            return (col === end ? col : col + '/' + end);
        }
    },
    [STATUS_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: {
        ln: ({ editor }) => editor.selection.active.line + 1,
        char: ({ editor }) => Math.abs(editor.selection.end.character - editor.selection.start.character),
    },
    [STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: {
        ln: ({ editor }) => editor.selection.active.line + 1,
        lc: ({ editor }) => (Math.abs(editor.selection.end.line - editor.selection.start.line) + 1),
        char: ({ editor, indent }) => editor.document.getText(editor.selection).replace(indent.regex, "").length
    },
    [STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: {
        ln: ({ editor }) => editor.selection.anchor.line + 1,
        lc: ({ editor }) => (Math.abs(editor.selection.end.line - editor.selection.start.line) + 1),
        char: ({ editor, indent }) => editor.document.getText(editor.selection).replace(indent.regex, "").length,
    },
    [STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: {
        nth: ({ idx }) => idx,
        count: ({ editor }) => editor.selections.length,
        ln: ({ idx, editor }) => editor.selections[idx].end.line + 1,
        lc: ({ editor }) => {
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
        char: ({ editor, indent }) => {
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

const contentTextFunc = (context: Type.ContentTextFuncContext, contentText: any[]): Type.DecorationRenderOptionType[] => {
    return contentText.map(decorationOption => {
        if (typeof decorationOption.after.contentText !== 'string') {
            const decorationOptionFunc = Object.assign({}, decorationOption);
            decorationOptionFunc.after.contentText = String(decorationOption.after.contentText(context));
            return decorationOptionFunc;
        }
        return decorationOption;
    });
};

const cursorOnlySelection: Type.ContentTextFuncSignature = (context): Type.StatusTextInfoType[] => {

    return [{
        contentText: contentTextFunc(context, selectionContentText[STATUS_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT] as any[]),
        range: createActiveRange(context.editor)
    }];
};

const singleLineSelection: Type.ContentTextFuncSignature = (context): Type.StatusTextInfoType[] => {
    return [{
        contentText: contentTextFunc(context, selectionContentText[STATUS_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT] as any[]),
        range: createActiveRange(context.editor)
    }];
};

const multilineSelection: Type.ContentTextFuncSignature = (context): Type.StatusTextInfoType[] => {

    return [{
        contentText: contentTextFunc(context, selectionContentText[STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT] as any[]),
        range: createAnchorRange(context.editor)
    }, {
        contentText: contentTextFunc(context, selectionContentText[STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT] as any[]),
        range: createActiveRange(context.editor)
    }];
};

const multiCursorSelection: Type.ContentTextFuncSignature = (context): Type.StatusTextInfoType[] => {

    const statusTextInfo: Type.StatusTextInfoType[] = [];
    const statusLine: number[] = [];

    let idx = context.editor.selections.length;

    while (idx--) {
        const lineSet = new Set(statusLine);
        if (lineSet.has(context.editor.selections[idx].end.line)) {
            continue;
        }

        context.idx = idx + 1;

        statusTextInfo.push({
            contentText: contentTextFunc(context, selectionContentText[STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT] as any[]),
            range: createStartEndRangeOfSelection(context.editor.selections[idx])
        });

        statusLine.push(context.editor.selections[idx].end.line);
    }
    return statusTextInfo;
};

const selectionTextInfoSplit = (editor: vscode.TextEditor, indent: Type.IndentReadyType): Type.statusTextInfoSplitType => {

    const context: Type.ContentTextFuncContext = {
        idx: 0,
        editor: editor,
        indent: indent
    };

    return {
        [DECORATION_STYLE_KEY.CURSOR_ONLY]: () => cursorOnlySelection(context),
        [DECORATION_STYLE_KEY.SINGLE_LINE]: () => singleLineSelection(context),
        [DECORATION_STYLE_KEY.MULTI_LINE]: () => multilineSelection(context),
        [DECORATION_STYLE_KEY.MULTI_CURSOR]: () => multiCursorSelection(context),
    };
};

const selectionInfo = (editor: vscode.TextEditor, indentInfo: Type.IndentReadyType, type: Type.DecorationInfoPropType): Type.StatusTextInfoType[] => {
    return selectionTextInfoSplit(editor, indentInfo)[type.KEY]();
};

const bindStatusContentTextState = (): Type.BindContentTextStateType => {
    return {
        functionOf: selectionOf,
        textOf: selectionContentText
    };
};

export {
    selectionInfo,
    bindStatusContentTextState
};