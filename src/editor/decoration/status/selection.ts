import * as vscode from 'vscode';
import * as Type from '../../../type/type';
import * as __0x from '../../../constant/numeric';
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


const selectionTextBuffer = {
    [__0x.cursorOnly]: [] as any[],
    [__0x.singleLine]: [] as any[],
    [__0x.multiLine]: [] as any[],
    [__0x.multiCursor]: (() => [] as any[])(),
};

const setSelectionTextbufferSize = (key: number, size: number) => {

    const buffer = new Array(size).fill(Object.create(null));

    if (key === __0x.cursorOnlyText) {
        selectionTextBuffer[__0x.cursorOnly][0] = Object.seal(buffer);
    }
    if (key === __0x.singleLineText) {
        selectionTextBuffer[__0x.singleLine][0] = Object.seal(buffer);
    }
    if (key === __0x.multiLineAnchorText) {
        selectionTextBuffer[__0x.multiLine].push(Object.seal(buffer));
    }
    if (key === __0x.multiLineCursorText) {
        selectionTextBuffer[__0x.multiLine].push(Object.seal(buffer));
    }
    if (key === __0x.multiCursorText) {
        // selectionTextBuffer[__0x.multiCursor] = [Object.seal(buffer)];
    }
};

const sealBuffer = () => {
    Object.seal(selectionTextBuffer[__0x.cursorOnly]);
    Object.seal(selectionTextBuffer[__0x.singleLine]);
    Object.seal(selectionTextBuffer[__0x.multiLine]);
    Object.seal(selectionTextBuffer[__0x.multiCursor]);
};

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
    lc: __0x.multiLineLineCountSym,
    char: __0x.multiLineChararcterSym,
};

const multilineFunctionSymLink = {
    [__0x.multiLineLineCountSym]: (editor) => String((editor.selection.end.line - editor.selection.start.line) + 1),
    [__0x.multiLineChararcterSym]: (editor) => String(editor.document.getText(editor.selection).replace(indentInfo.regex as RegExp, "").length),
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
    },
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

const cursorOnlySelection = ({ editor }: Type.ContentTextFuncContext): any[] => {
    return [
        [contentTextFunc({ idx: 0, editor, __proto__: null }, selectionContentText[__0x.cursorOnlyText].contentText as any[]),
        Range.createActiveRange(editor)]
    ];
    // return [{
    //     contentText: contentTextFunc({ idx: 0, editor, __proto__: null }, selectionContentText[__0x.cursorOnlyText].contentText as any[]),
    //     range: Range.createActiveRange(editor),
    //     __proto__: null
    // }];
};

const singleLineSelection = ({ editor }: Type.ContentTextFuncContext): any[] => {
    return [
        [contentTextFunc({ idx: 0, editor, __proto__: null }, selectionContentText[__0x.singleLineText].contentText as any[]),
        Range.createActiveRange(editor)]
    ];

    // return [{
    //     contentText: contentTextFunc({ idx: 0, editor, __proto__: null }, selectionContentText[__0x.singleLineText].contentText as any[]),
    //     range: Range.createActiveRange(editor),
    //     __proto__: null
    // }];
};

const multilineSelection = ({ editor }: Type.ContentTextFuncContext): any[] => {

    const buffer = {
        [__0x.multiLineLineCountSym]: undefined,
        [__0x.multiLineChararcterSym]: undefined,
        __proto__: null
    };

    const anchor = contentTextFunctionSymlink(editor, selectionContentText[__0x.multiLineAnchorText] as Type.ContentTextSymlinkKind, buffer);
    const cursor = contentTextFunctionSymlink(editor, selectionContentText[__0x.multiLineCursorText] as Type.ContentTextSymlinkKind, buffer);

    return [
        [anchor.reverse(), Range.createAnchorRange(editor)],
        [cursor.reverse(), Range.createActiveRange(editor)]
    ];
    // return [{
    //     contentText: anchor,
    //     range: Range.createAnchorRange(editor),
    //     __proto__: null
    // }, {
    //     contentText: cursor,
    //     range: Range.createActiveRange(editor),
    //     __proto__: null
    // }];
};

const multiCursorSelection = ({ idx, editor }: Type.ContentTextFuncContext): any[] => {

    const selectionTextInfo: any[] = [];
    const statusLine: number[] = [];

    while (idx--) {
        const lineSet = new Set(statusLine);
        if (lineSet.has(editor.selections[idx].end.line)) {
            continue;
        }

        idx = idx + 1;
        selectionTextInfo.push([
            contentTextFunc({ idx, editor, __proto__: null }, selectionContentText[__0x.multiCursorText].contentText as any[]),
            Range.createStartEndRangeOfSelection(editor.selections[idx])
        ]);

        // selectionTextInfo.push({
        //     contentText: contentTextFunc({ idx, editor, __proto__: null }, selectionContentText[__0x.multiCursorText].contentText as any[]),
        //     range: Range.createStartEndRangeOfSelection(editor.selections[idx]),
        //     __proto__: null
        // });

        statusLine.push(editor.selections[idx].end.line);
    }
    return selectionTextInfo;
};

const selectionTextInfoSplit = (context: Type.ContentTextFuncContext): Type.SelectionTextInfoSplitType => {
    return {
        [__0x.cursorOnly]: () => cursorOnlySelection(context),
        [__0x.singleLine]: () => singleLineSelection(context),
        [__0x.multiLine]: () => multilineSelection(context),
        [__0x.multiCursor]: () => multiCursorSelection(context),
        __proto__: null
    };
};

const selectionInfo = (editor: vscode.TextEditor, type: Type.DecorationInfoPropType) => {

    const context: Type.ContentTextFuncContext = {
        idx: 0,
        editor: editor,
        __proto__: null
    };

    selectionTextInfoSplit(context)[type.KEY]();
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