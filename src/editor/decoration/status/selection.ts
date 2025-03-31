import * as vscode from 'vscode';
import * as Type from '../../../type/type';
import * as __0x from '../../../constant/shared/numeric';
import Range from '../../range';
import { SELECTION_CONTENT_TEXT_CONFIG_KEY } from '../../../constant/enum';
import { DECORATION_OPTION_CONFIG, INDENT_INFO, SELECTION_CONTENT_TEXT } from '../../../constant/object';
import { createEditorDecorationType, disposeDecoration } from '../decoration';

const selectionContentText = {
    ...SELECTION_CONTENT_TEXT
} as unknown as Type.StatusContentTextType;

const indentInfo = {
    ...INDENT_INFO
} as Type.IndentInfoType;

const selectionTextBuffer = {
    [__0x.reset]: [] as any[],
    [__0x.cursorOnlyText]: [] as any[],
    [__0x.singleLineText]: [] as any[],
    [__0x.multiLineAnchorText]: [] as any[],
    [__0x.multiLineCursorText]: [] as any[],
    [__0x.multiCursorText]: [] as any[],
};

const setSelectionTextbufferSize = (key: number, size: number): void => {
    const emptyDecoration = createEditorDecorationType({});
    const buffer = new Array(size).fill(emptyDecoration);

    if (key === __0x.multiCursorText) {
        selectionTextBuffer[__0x.multiCursor] = [Object.seal(buffer), []];
        return;
    }

    selectionTextBuffer[key] = Object.seal(buffer);
};

const sealBuffer = (): void => {
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
    [__0x.multiLineChararcterSym]: (editor) => String(editor.document.getText(editor.selection).replace(indentInfo.regex as RegExp, "").length)
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

const contentTextFunc = (context: Type.ContentTextFuncContext, contentText: any, range, key: number): void => {
    contentText.forEach((decorationOption, idx) => {
        const decorationOptionFunc = { ...decorationOption };
        decorationOptionFunc.after = { ...decorationOption.after };

        if (typeof decorationOption.after.contentText !== 'string') {
            decorationOptionFunc.after.contentText = String(decorationOption.after.contentText(context));
        }

        const decoration = vscode.window.createTextEditorDecorationType(decorationOptionFunc);
        // context.editor.setDecorations(clone, [range(context.editor)])
        // context.editor.setDecorations(decoration, [range(context.editor)])
        // context.editor.setDecorations(selectionTextBuffer[key][idx], [])
        // selectionTextBuffer[key][idx].dispose();
        // selectionTextBuffer[key][idx] = clone;
    });
};

const cursorOnlySelection = (): void => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        contentTextFunc(
            { idx: 0, editor },
            selectionContentText[__0x.cursorOnlyText].contentText,
            Range.createActiveRange,
            __0x.cursorOnlyText);
    }
};

const singleLineSelection = (): void => {
    const editor = vscode.window.activeTextEditor;

    if (editor) {




        // return [
        //     [contentTextFunc({ idx: 0, editor }, selectionContentText[__0x.singleLineText].contentText as any[]),
        //     Range.createActiveRange(editor)]
        // ];
    }
    // return []

    // return [{
    //     contentText: contentTextFunc({ idx: 0, editor }, selectionContentText[__0x.singleLineText].contentText as any[]),
    //     range: Range.createActiveRange(editor)
    // }];
};

const decorationOptionBuffer = { ...DECORATION_OPTION_CONFIG } as Type.DecorationRenderOptionType

const contentTextFunctionSymlink = (editor, range, key, multiLineBuffer) => (decorationOption, idx) => {
    decorationOptionBuffer.after = { ...decorationOption.after }
    const text = decorationOptionBuffer.after.contentText;
    if (typeof text !== 'string') {
        if (multiLineBuffer[text] === null) {
            multiLineBuffer[text] = multilineFunctionSymLink[text](editor);
        }
        decorationOptionBuffer.after.contentText = String(multiLineBuffer[text]);
    }

    const decoration = vscode.window.createTextEditorDecorationType(decorationOptionBuffer);
    // const clone = { ...decoration };
    // console.log(clone)
    
    editor.setDecorationsFast(decoration, [range(editor)])
    // editor.setDecorations(selectionTextBuffer[key][idx], [])
    selectionTextBuffer[key][idx].dispose();
    selectionTextBuffer[key][idx] = decoration;

    // decoration
}

const multilineSelection = (): void => {
    const editor = vscode.window.activeTextEditor
    const multiLineBuffer: Record<number, number | null> = {
        [__0x.multiLineLineCountSym]: null,
        [__0x.multiLineChararcterSym]: null
    };

    if (editor !== undefined) {
        selectionContentText[__0x.multiLineAnchorText]
            .contentText
            .forEach(
                contentTextFunctionSymlink(
                    editor,
                    Range.createAnchorRange,
                    __0x.multiLineAnchorText,
                    multiLineBuffer));

        selectionContentText[__0x.multiLineCursorText]
            .contentText
            .forEach(
                contentTextFunctionSymlink(
                    editor,
                    Range.createActiveRange,
                    __0x.multiLineCursorText,
                    multiLineBuffer));

        // multiLineBuffer[__0x.multiLineLineCountSym] = null
        // multiLineBuffer[__0x.multiLineChararcterSym] = null
    }
};

const multiCursorSelection = (): any[] => {

    const editor = vscode.window.activeTextEditor;

    if (editor !== undefined) {
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

const selectionTextInfoSplit: Type.SelectionTextInfoSplitType = {
    [__0x.cursorOnly]: () => cursorOnlySelection(),
    [__0x.singleLine]: () => singleLineSelection(),
    [__0x.multiLine]: () => multilineSelection(),
    [__0x.multiCursor]: () => multiCursorSelection()
};

const clearPrevious = (previousKey: number) => {
    switch (previousKey) {
        case __0x.cursorOnly:
            disposeDecoration(selectionTextBuffer[__0x.cursorOnlyText])
        case __0x.singleLine:
            disposeDecoration(selectionTextBuffer[__0x.singleLineText])
        case __0x.multiLine:
            disposeDecoration(selectionTextBuffer[__0x.multiLineAnchorText])
            disposeDecoration(selectionTextBuffer[__0x.multiLineCursorText])
        case __0x.multiCursor:
            selectionTextBuffer[__0x.multiCursorText].forEach(disposeDecoration);
        default: break;
    }
};

const selectionInfo = (highlightKey: number, previousKey: number) => {
    if (highlightKey != previousKey) {
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
    sealBuffer
};