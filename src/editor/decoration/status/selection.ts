import * as vscode from 'vscode';
import * as Type from '../../../type/type';
import * as __0x from '../../../constant/shared/numeric';
import { INDENT_INFO, SELECTION_CONTENT_TEXT } from '../../../constant/shared/object';
import { DECORATION_OPTION_CONFIG } from '../../../constant/config/object';
import { SELECTION_CONTENT_TEXT_CONFIG_KEY } from '../../../constant/config/enum';
import { createLineRange } from '../../range';
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
    Object.seal(selectionTextBuffer[__0x.cursorOnlyText]);
    Object.seal(selectionTextBuffer[__0x.singleLineText]);
    Object.seal(selectionTextBuffer[__0x.multiLineAnchorText]);
    Object.seal(selectionTextBuffer[__0x.multiLineCursorText]);
    Object.seal(selectionTextBuffer[__0x.multiCursorText]);
};

const columnDelta = (editor, delta = 0): any => {
    const col = editor.selection.active.character + delta;
    const end = editor.document.lineAt(editor.selection.active.line).text.length + delta;
    return (col === end ? col : col + '/' + end);
};

const columns = {
    col: ({ editor }) => columnDelta(editor, 1),
    zCol: ({ editor }) => columnDelta(editor)
};

const characterCount = {
    char: ({ editor }): string => String(editor.selection.end.character - editor.selection.start.character)
};

const lineNumber = {
    ln: ({ editor }): string => String(editor.selection.active.line + 1),
};

const multiLineOf = {
    lc: __0x.multiLineLineCountSym,
    char: __0x.multiLineChararcterSym,
};

const multilineFunctionSymLink = {
    [__0x.multiLineLineCountSym]: (editor: vscode.TextEditor): string => String((editor.selection.end.line - editor.selection.start.line) + 1),
    [__0x.multiLineChararcterSym]: (editor: vscode.TextEditor): string => String(editor.document.getText(editor.selection).replace(indentInfo.regex as RegExp, "").length)
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

const resetRange = Object.seal([] as vscode.Range[]);

const contentTextFunc = (buffer: vscode.TextEditorDecorationType[], context, option) => (contentText: any | vscode.DecorationRenderOptions, idx: number): void => {

    option.renderOptions = contentText;

    if (typeof contentText.after.contentText !== 'string') {
        decorationOptionBuffer.after = { ...contentText.after }
        decorationOptionBuffer.after.contentText = String(decorationOptionBuffer.after.contentText(context));
        option.renderOptions = decorationOptionBuffer;
    }

    context.editor.setDecorations(buffer[idx], [option]);
}

const cursorOnlySelection = (editor: vscode.TextEditor, previousKey: number[]): void => {

    clearPrevious(editor.setDecorations, previousKey, resetRange)

    const context = {
        idx: 0,
        editor: editor
    };

    const buffer = selectionTextBuffer[__0x.cursorOnlyText];

    const option = {
        range: createLineRange(editor.selection.active),
        renderOptions: {}
    };

    selectionContentText[__0x.cursorOnlyText]
        .contentText
        .forEach(
            contentTextFunc(
                buffer,
                context,
                option,
            ));
};

const singleLineSelection = (editor: vscode.TextEditor, previousKey: number[]): void => {
    clearPrevious(editor.setDecorations, previousKey, resetRange)

    const context = {
        idx: 0,
        editor: editor
    }

    const buffer = selectionTextBuffer[__0x.cursorOnlyText];

    const option = {
        range: createLineRange(editor.selection.active),
        renderOptions: {}
    };

    selectionContentText[__0x.cursorOnlyText]
        .contentText
        .forEach(
            contentTextFunc(
                buffer,
                context,
                option,
            ));
};

const contentTextFuncBuffered = (
    setDecorations: vscode.TextEditor['setDecorations'], 
    buffer: vscode.TextEditorDecorationType[], 
    decorationOption, 
    range: vscode.Range, 
    countButter: Record<number, number | null>) => (
        decorationType: any | vscode.DecorationRenderOptions, 
        idx: number) => {

    decorationOption.range = range
    decorationOption.renderOptions = decorationType;

    if (typeof decorationType.after.contentText !== 'string') {
        const numlink = decorationType.after.contentText

        if (countButter[numlink] === null) {
            countButter[numlink] = multilineFunctionSymLink[numlink](vscode.window.activeTextEditor);
        }

        decorationOptionBuffer.after = { ...decorationType.after }
        decorationOptionBuffer.after.contentText = String(countButter[numlink]);
        decorationOption.renderOptions = decorationOptionBuffer;
    }

    setDecorations(buffer[idx], [decorationOption])
}

const decorationOptionGrid = {
    range: undefined,
    renderOptions: undefined,
}

const multilineSelection = (editor: vscode.TextEditor, previousKey: number[]): void => {

    clearPrevious(editor.setDecorations, previousKey, resetRange)

    const multiLineBuffer: Record<number, number | null> = {
        [__0x.multiLineLineCountSym]: null,
        [__0x.multiLineChararcterSym]: null
    };

    const anchorRange = createLineRange(editor.selection.anchor);

    selectionContentText[__0x.multiLineAnchorText]
        .contentText
        .forEach(
            contentTextFuncBuffered(
                editor.setDecorations,
                selectionTextBuffer[__0x.multiLineAnchorText],
                { ...decorationOptionGrid },
                anchorRange,
                multiLineBuffer
            ))

    const activeRange = createLineRange(editor.selection.active);

    selectionContentText[__0x.multiLineCursorText]
        .contentText
        .forEach(
            contentTextFuncBuffered(
                editor.setDecorations,
                selectionTextBuffer[__0x.multiLineCursorText],
                { ...decorationOptionGrid },
                activeRange,
                multiLineBuffer
            ))
};

const multiCursorSelection = (editor: vscode.TextEditor, previousKey: number[]): any[] => {

    clearPrevious(editor.setDecorations, previousKey, resetRange)

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
};

const selectionTextInfoSplit = {
    [__0x.cursorOnly]: (editor, previousKey) => cursorOnlySelection(editor, previousKey),
    [__0x.singleLine]: (editor, previousKey) => singleLineSelection(editor, previousKey),
    [__0x.multiLine]: (editor, previousKey) => multilineSelection(editor, previousKey),
    [__0x.multiCursor]: (editor, previousKey) => multiCursorSelection(editor, previousKey)
};

const clearBufferStack = (editor: vscode.TextEditor) => {
    resetDecorationRange(editor, selectionTextBuffer[__0x.cursorOnlyText])
    resetDecorationRange(editor, selectionTextBuffer[__0x.singleLineText])
    resetDecorationRange(editor, selectionTextBuffer[__0x.multiLineAnchorText])
    resetDecorationRange(editor, selectionTextBuffer[__0x.multiLineCursorText])
};

const clearBuffer = (setDecorations: vscode.TextEditor["setDecorations"], resetRange: vscode.Range[]) => (buffer: vscode.TextEditorDecorationType): void => setDecorations(buffer, resetRange);

const clearPrevious = (setDecorations: vscode.TextEditor["setDecorations"], previousKey: number[], resetRange: vscode.Range[]): void => {

    switch (previousKey[0]) {
        case __0x.cursorOnly:
            selectionTextBuffer[__0x.cursorOnlyText]?.forEach(clearBuffer(setDecorations, resetRange));
            break;
        case __0x.singleLine:
            selectionTextBuffer[__0x.singleLineText]?.forEach(clearBuffer(setDecorations, resetRange));
            break;
        case __0x.multiLine:
            selectionTextBuffer[__0x.multiLineAnchorText]?.forEach(clearBuffer(setDecorations, resetRange));
            selectionTextBuffer[__0x.multiLineCursorText]?.forEach(clearBuffer(setDecorations, resetRange));
            break;
        case __0x.multiCursor:
            selectionTextBuffer[__0x.multiCursorText]?.forEach(clearBuffer(setDecorations, resetRange));
            break;
        default: break;
    }
};

const bindStatusContentTextState = (): Type.BindContentTextStateType => {
    return {
        functionOf: selectionOf,
        textOf: selectionContentText,
        infoOf: indentInfo
    };
};

export {
    bindStatusContentTextState,
    setSelectionTextbufferSize,
    sealBuffer,
    clearBufferStack,
    cursorOnlySelection,
    singleLineSelection,
    multilineSelection,
    multiCursorSelection,
};