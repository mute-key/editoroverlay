import * as vscode from 'vscode';
import * as Type from '../../../type/type';
import * as $ from '../../../constant/symbol';
import Range from '../../range';
import { SELECTION_CONTENT_TEXT_CONFIG_KEY } from '../../../constant/enum';
import { INDENT_INFO, SELECTION_CONTENT_TEXT } from '../../../constant/object';

const selectionContentText = {
    ...SELECTION_CONTENT_TEXT,
    __proto__: null
} as unknown as Type.StatusContentTextType;

const indentInfo = { 
    ...INDENT_INFO, 
    __proto__: null 
} as Type.IndentInfoType;

const columnDelta = (editor, delta = 0) => {
    const col = editor.selection.active.character + delta;
    const end = editor.document.lineAt(editor.selection.active.line).text.length + delta;
    return (col === end ? col : col + '/' + end);
};

const columns = {
    col: ({ editor }) => columnDelta(editor, 1),
    zCol: ({ editor }) => columnDelta(editor),
};

const characterCount = {
    char: ({ editor }) => (editor.selection.end.character - editor.selection.start.character)
};

const lineNumber = {
    ln: ({ editor }) => editor.selection.active.line + 1,
};

const multiLineOf = {
    lc: $.multiLineLineCountSym  as symbol,
    char: $.multiLineChararcterSym  as symbol,
};

const multilineFunctionSymLink = {
    [$.multiLineLineCountSym as symbol]: (editor) => String((editor.selection.end.line - editor.selection.start.line) + 1),
    [$.multiLineChararcterSym as symbol]: (editor) => String(editor.document.getText(editor.selection).replace(indentInfo.regex as RegExp, "").length),
    __proto__: null
};

const multiCursorOf = {
    nth: ({ idx }) => idx,
    count: ({ editor }) => editor.selections.length,
    ln: ({ idx, editor }) => editor.selections[idx].end.line + 1,
    lc: ({ editor }) => {
        let idx = 0;
        let lineCount = 0;
        const length = editor.selections.length;
        const isSingleLine = editor.selections[0].start.line === editor.selections[0].end.line;
        const lineDiff = isSingleLine ? 1 : (editor.selections[0].end.line - editor.selections[0].start.line) + 1;

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
    char: ({ editor }) => {
        let idx = 0;
        let charCount = 0;
        const length = editor.selections.length;
        const isSingleLine = editor.selections[0].start.line === editor.selections[0].end.line;

        while (idx < length) {
            if (isSingleLine) {
                charCount = charCount + (editor.selections[idx].end.character - editor.selections[idx].start.character);
            } else {
                const text = editor.document.getText(editor.selections[idx]);
                charCount = charCount + text.replace(indentInfo.regex, "").length;
            }
            idx++;
        }
        return charCount;
    }
};

const selectionOf: Type.ContentTextStateType = {
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: { ...columns, ...lineNumber },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: { ...lineNumber, ...characterCount },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: { ...lineNumber, ...multiLineOf },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: { ...lineNumber, ...multiLineOf },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: multiCursorOf,
};

const contentTextFunctionSymlink = (editor: vscode.TextEditor, { contentText, position }: Type.ContentTextSymlinkKind, buffer: any): Type.DecorationRenderOptionType[] => {
    position.forEach(([pos, sym]) => {
        if (!buffer[sym]) {
            buffer[sym] = multilineFunctionSymLink[sym](editor);
        }
        contentText[pos].after.contentText = String(buffer[sym]);
    });
    return contentText;
};

const contentTextFunc = (context: Type.ContentTextFuncContext, contentText: any): Type.DecorationRenderOptionType[] => {
    return contentText.map(decorationOption => {
        if (typeof decorationOption.after.contentText === 'string') {
            return decorationOption;
        }

        const decorationOptionFunc = { ...decorationOption, __proto__: null };
        decorationOptionFunc.after = { ...decorationOption.after, __proto__: null };
        decorationOptionFunc.after.contentText = String(decorationOption.after.contentText(context));
        return decorationOptionFunc;
    });
};

const cursorOnlySelection = ({ editor }: Type.ContentTextFuncContext): Type.StatusTextInfoType[] => {
    return [{
        contentText: contentTextFunc({ idx: 0, editor, __proto__: null }, selectionContentText[$.cursorOnlyText].contentText as any[]),
        range: Range.createActiveRange(editor),
        __proto__: null
    }];
};

const singleLineSelection = ({ editor }: Type.ContentTextFuncContext): Type.StatusTextInfoType[] => {
    return [{
        contentText: contentTextFunc({ idx: 0, editor, __proto__: null }, selectionContentText[$.singleLineText].contentText as any[]),
        range: Range.createActiveRange(editor),
        __proto__: null
    }];
};

const multilineSelection = ({ editor }: Type.ContentTextFuncContext): Type.StatusTextInfoType[] => {

    const buffer = {
        [$.multiLineLineCountSym as symbol]: undefined,
        [$.multiLineChararcterSym as symbol]: undefined
    };

    const anchor = contentTextFunctionSymlink(editor, selectionContentText[$.multiLineAnchorText] as Type.ContentTextSymlinkKind, buffer);
    const cursor = contentTextFunctionSymlink(editor, selectionContentText[$.multiLineCursorText] as Type.ContentTextSymlinkKind, buffer);

    return [{
        contentText: anchor,
        range: Range.createAnchorRange(editor),
        __proto__: null
    }, {
        contentText: cursor,
        range: Range.createActiveRange(editor),
        __proto__: null
    }];
};

const multiCursorSelection = ({ idx, editor }: Type.ContentTextFuncContext): Type.StatusTextInfoType[] => {

    const selectionTextInfo: Type.StatusTextInfoType[] = [];
    const statusLine: number[] = [];

    while (idx--) {
        const lineSet = new Set(statusLine);
        if (lineSet.has(editor.selections[idx].end.line)) {
            continue;
        }

        idx = idx + 1;

        selectionTextInfo.push({
            contentText: contentTextFunc({ idx, editor, __proto__: null }, selectionContentText[$.multiCursorText].contentText as any[]),
            range: Range.createStartEndRangeOfSelection(editor.selections[idx]),
            __proto__: null
        });

        statusLine.push(editor.selections[idx].end.line);
    }
    return selectionTextInfo;
};

const selectionTextInfoSplit = (context: Type.ContentTextFuncContext): Type.SelectionTextInfoSplitType => {
    return {
        [$.cursorOnly]: () => cursorOnlySelection(context),
        [$.singleLine]: () => singleLineSelection(context),
        [$.multiLine]: () => multilineSelection(context),
        [$.multiCursor]: () => multiCursorSelection(context),
        __proto__: null
    };
};

const selectionInfo = (editor: vscode.TextEditor, type: Type.DecorationInfoPropType): Type.StatusTextInfoType[] => {

    const context: Type.ContentTextFuncContext = {
        idx: 0,
        editor: editor,
        __proto__: null
    };

    return selectionTextInfoSplit(context)[type.KEY]();
};

const bindStatusContentTextState = (): Type.BindContentTextStateType => {
    return {
        functionOf: selectionOf,
        textOf: selectionContentText,
        infoOf: indentInfo
    };
};

export {
    selectionInfo,
    bindStatusContentTextState
};