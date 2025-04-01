import * as vscode from 'vscode';
import * as Type from '../../../type/type';
import * as __0x from '../../../constant/shared/numeric';
import { createLineRange } from '../../range';
import { SELECTION_CONTENT_TEXT_CONFIG_KEY } from '../../../constant/enum';
import { DECORATION_OPTION_CONFIG, INDENT_INFO, SELECTION_CONTENT_TEXT } from '../../../constant/object';
import { resetDecorationRange } from '../decoration';

const selectionContentText = {
    ...SELECTION_CONTENT_TEXT
} as unknown as Type.StatusContentTextType;

const indentInfo = {
    ...INDENT_INFO
} as Type.IndentInfoType;

const selectionTextBuffer = {
    [__0x.cursorOnlyText]: [] as vscode.TextEditorDecorationType[],
    [__0x.singleLineText]: [] as vscode.TextEditorDecorationType[],
    [__0x.multiLineAnchorText]: [] as vscode.TextEditorDecorationType[],
    [__0x.multiLineCursorText]: [] as vscode.TextEditorDecorationType[],
    [__0x.multiCursorText]: [] as vscode.TextEditorDecorationType[]
};

const decorationOptionBuffer = { ...DECORATION_OPTION_CONFIG } as Type.DecorationRenderOptionType

const setSelectionTextbufferSize = (hex: number, size: number): void => {
    const buffer = selectionContentText[hex].contentText.map((decorationOption, idx) => {
        decorationOptionBuffer.after = { ...decorationOption.after }
        return vscode.window.createTextEditorDecorationType(decorationOption);
    });

    if (hex === __0x.multiCursorText) {
        selectionTextBuffer[__0x.multiCursor] = [Object.seal(buffer), []];
        return;
    }

    selectionTextBuffer[hex] = Object.seal(buffer);
};

const sealBuffer = (): void => {
    Object.seal(selectionTextBuffer[__0x.cursorOnly]);
    Object.seal(selectionTextBuffer[__0x.singleLine]);
    Object.seal(selectionTextBuffer[__0x.multiLine]);
    Object.seal(selectionTextBuffer[__0x.multiCursor]);
};

const columnDelta = (editor, delta = 0): any => {
    const col = editor.selection.active.character + delta;
    const end = editor.document.lineAt(editor.selection.active.line).text.length + delta;
    return (col === end ? col : col + '/' + end);
};

const columns = {
    col: ({editor}): string => String(columnDelta(editor, 1)),
    zCol: ({editor}): string => String(columnDelta(editor)),
};

const characterCount = {
    char: ({editor}): string => String(editor.selection.end.character - editor.selection.start.character)
};

const lineNumber = {
    ln: ({editor}): string => String(editor.selection.active.line + 1),
};

const multiLineOf = {
    lc: __0x.multiLineLineCountSym,
    char: __0x.multiLineChararcterSym,
};

const multilineFunctionSymLink = {
    [__0x.multiLineLineCountSym]: (editor): string => String((editor.selection.end.line - editor.selection.start.line) + 1),
    [__0x.multiLineChararcterSym]: (editor): string => String(editor.document.getText(editor.selection).replace(indentInfo.regex as RegExp, "").length)
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

const resetRange = [];

const contentTextFunc = (context, contentText, range: vscode.Range[], hexKey: number) => {

    const buffer = selectionTextBuffer[hexKey];
    const option = { range: range[0], renderOptions: {} }
    contentText.forEach((decorationOption, pos) => {

        context.editor.setDecorations(buffer[pos], resetRange)

        option.renderOptions = decorationOption;

        if (typeof contentText[pos].after.contentText !== 'string') {
            decorationOptionBuffer.after = { ...contentText[pos].after }
            decorationOptionBuffer.after.contentText = String(contentText[pos].after.contentText(context));
            option.renderOptions = decorationOptionBuffer;
        }

        context.editor.setDecorations(buffer[pos], [option]);
    })
}

const cursorOnlySelection = (): void => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {

        const context = {
            idx: 0,
            editor: editor
        }

        contentTextFunc(
            context,
            selectionContentText[__0x.cursorOnlyText].contentText,
            [createLineRange(editor.selection.active)],
            __0x.cursorOnlyText)
    }
};

const singleLineSelection = (): void => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {

        const context = {
            idx: 0,
            editor: editor
        }

        contentTextFunc(
            context,
            selectionContentText[__0x.singleLineText].contentText,
            [createLineRange(editor.selection.active)],
            __0x.singleLineText)
    }
};

const renderOptionBuffer = [{
    range: {},
    renderOptions: {}
}]

const contentTextFuncBufferedWrapper = (contentText, selectionBuffer, range, buffer) => {

    const editor = vscode.window.activeTextEditor as vscode.TextEditor

    contentText.forEach((decorationType, idx) => {
        const content = decorationType.after.contentText;
        let decoration = decorationType;

        editor.setDecorations(selectionBuffer[idx], resetRange);

        if (typeof content !== "string") {

            if (buffer[content] === null) {
                buffer[content] = multilineFunctionSymLink[content](editor);
            }

            decorationOptionBuffer.after = { ...decorationType.after }
            decorationOptionBuffer.after.contentText = String(buffer[content]);
            decoration = decorationOptionBuffer;
        }

        renderOptionBuffer[0].range = range;
        renderOptionBuffer[0].renderOptions = decoration;

        editor.setDecorations(selectionBuffer[idx], renderOptionBuffer)
    })
}


const multilineSelection = (): void => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const multiLineBuffer: Record<number, number | null> = {
            [__0x.multiLineLineCountSym]: null,
            [__0x.multiLineChararcterSym]: null
        };

        contentTextFuncBufferedWrapper(
            selectionContentText[__0x.multiLineAnchorText].contentText,
            selectionTextBuffer[__0x.multiLineAnchorText],
            createLineRange(editor.selection.anchor),
            multiLineBuffer)
        contentTextFuncBufferedWrapper(
            selectionContentText[__0x.multiLineCursorText].contentText,
            selectionTextBuffer[__0x.multiLineCursorText],
            createLineRange(editor.selection.active),
            multiLineBuffer)

        // selectionContentText[__0x.multiLineAnchorText]
        //     .contentText
        //     .forEach(
        //         contentTextFuncBuffered(
        //             selectionTextBuffer[__0x.multiLineAnchorText],
        //             createLineRange(editor.selection.anchor),
        //             multiLineBuffer
        //         ))

        // selectionContentText[__0x.multiLineCursorText]
        //     .contentText
        //     .forEach(
        //         contentTextFuncBuffered(
        //             selectionTextBuffer[__0x.multiLineCursorText],
        //             createLineRange(editor.selection.active),
        //             multiLineBuffer
        //         ))
    }



};

const multiCursorSelection = (): any[] => {

    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const selectionTextInfo: any[] = [];
        const statusLine: number[] = [];
        const context: Type.ContentTextFuncContext = {
            idx: 0,
            editor: editor
        }

        let idx = 0;

        while (idx--) {
            const lineSet = new Set(statusLine);
            if (lineSet.has(editor.selections[idx].end.line)) {
                continue;
            }

            idx = idx + 1;
            // selectionTextInfo.push([
            //     contentTextFunc(context, selectionContentText[__0x.multiCursorText].contentText as any[]),
            //     Range.createStartEndRangeOfSelection(editor.selections[idx])
            // ]);

            // selectionTextInfo.push({
            //     contentText: contentTextFunc({ idx, editor }, selectionContentText[__0x.multiCursorText].contentText as any[]),
            //     range: Range.createStartEndRangeOfSelection(editor.selections[idx])
            // });

            statusLine.push(editor.selections[idx].end.line);
        }
        return selectionTextInfo;
    }
    return [];
};

const selectionTextInfoSplit = {
    [__0x.cursorOnly]: () => cursorOnlySelection(),
    [__0x.singleLine]: () => singleLineSelection(),
    [__0x.multiLine]: () => multilineSelection(),
    [__0x.multiCursor]: () => multiCursorSelection()
};

const clearBufferStack = (editor: vscode.TextEditor) => {
    resetDecorationRange(editor, selectionTextBuffer[__0x.cursorOnlyText])
    resetDecorationRange(editor, selectionTextBuffer[__0x.singleLineText])
    resetDecorationRange(editor, selectionTextBuffer[__0x.multiLineAnchorText])
    resetDecorationRange(editor, selectionTextBuffer[__0x.multiLineCursorText])
};

const clearPrevious = (previousKey: number) => {
    const editor = vscode.window.activeTextEditor as vscode.TextEditor;

    switch (previousKey) {
        case __0x.cursorOnly:
            resetDecorationRange(editor, selectionTextBuffer[__0x.cursorOnlyText])
        case __0x.singleLine:
            resetDecorationRange(editor, selectionTextBuffer[__0x.singleLineText])
        case __0x.multiLine:
            resetDecorationRange(editor, selectionTextBuffer[__0x.multiLineAnchorText])
            resetDecorationRange(editor, selectionTextBuffer[__0x.multiLineCursorText])
        case __0x.multiCursor:
        // selectionTextBuffer[__0x.multiCursorText].forEach(disposeDecoration);
        default: break;
    }
};

const selectionInfo = (highlightKey: number, previousKey: number) => {
    if (highlightKey !== previousKey) {
        clearPrevious(previousKey);
    }

    selectionTextInfoSplit[highlightKey]();
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
    bindStatusContentTextState,
    setSelectionTextbufferSize,
    sealBuffer,
    clearBufferStack,
    cursorOnlySelection,
    singleLineSelection,
    multilineSelection,
    multiCursorSelection,
};