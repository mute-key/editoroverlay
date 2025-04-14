import * as vscode from 'vscode';
import * as Type from '../../type/type';
import * as __0x from '../../constant/shared/numeric';
import { INDENT_INFO, SELECTION_CONTENT_TEXT, SELECTION_KIND_LIST } from '../../constant/shared/object';
import { SELECTION_CONTENT_TEXT_CONFIG_KEY } from '../../constant/config/enum';
import { DECORATION_OPTION_CONFIG } from '../../constant/config/object';
import { createLineRange, blankRange, createStartEndRangeOfSelection } from '../range';
import { resetDecoration } from '../editor';
import { compareNumbers } from '../../util/util';

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
    [__0x.multiCursorText]: [] as any[]
};

const decorationOptionBuffer = { ...DECORATION_OPTION_CONFIG } as Type.DecorationRenderOptionType;

const setSelectionTextbuffer = (hexKey: number, size: number): void => {
    decorationOptionBuffer.isWholeLine = true;
    decorationOptionBuffer.rangeBehavior = vscode.DecorationRangeBehavior.ClosedClosed;
    if (hexKey === __0x.multiCursorText) {
        return;
    }
    
    selectionTextBuffer[hexKey].splice(0);
    selectionTextBuffer[hexKey].push(...selectionContentText[hexKey].contentText.map((decorationOption, idx) => {
        decorationOptionBuffer.after = { ...decorationOption.after };
        return vscode.window.createTextEditorDecorationType(decorationOption);
    }));
};

const columnDelta = (editor, delta = 0): string => {
    const col = editor.selection.active.character + delta;
    const end = editor.document.lineAt(editor.selection.active.line).text.length + delta;
    return (col === end ? col : col + '/' + end);
};

const columns = {
    col: ({ editor }) => columnDelta(editor, 1),
    zCol: ({ editor }) => columnDelta(editor)
};

const characterCount = {
    char: ({ editor }): number => {
        return editor.selection.end.character - editor.selection.start.character;
    }
};

const lineNumber = {
    ln: ({ editor }): number => {
        return editor.selection.active.line + 1;
    }
};

const multiLineOf = {
    lc: __0x.multiLineLineCountHex,
    char: __0x.multiLineChararcterHex,
};

const multilineFunctionSymLink = {
    [__0x.multiLineLineCountHex]: (editor: vscode.TextEditor) => ((editor.selection.end.line - editor.selection.start.line) + 1),
    [__0x.multiLineChararcterHex]: (editor: vscode.TextEditor) => editor.document.getText(editor.selection).replace(indentInfo[__0x.regex] as RegExp, "").length
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
                charCount = charCount + text.replace(indentInfo[__0x.regex], "").length;
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

const contentTextFunc = (buffer: vscode.TextEditorDecorationType[], context, option) => (contentText: any | vscode.DecorationRenderOptions, idx: number): void => {
    option.renderOptions = contentText;
    if (typeof contentText.after.contentText !== 'string') {
        decorationOptionBuffer.after = { ...contentText.after };
        decorationOptionBuffer.after.contentText = String(decorationOptionBuffer.after.contentText(context));
        option.renderOptions = decorationOptionBuffer;
    }
    context.editor.setDecorations(buffer[idx], [option]);
};

const cursorOnlySelection = (editor: vscode.TextEditor, previousKey: number[]): void => {
    clearSelectionTextBuffer(editor);
    const context = {
        idx: 0,
        editor: editor
    };
    const buffer = selectionTextBuffer[__0x.cursorOnlyText];
    const option = {
        range: createLineRange(editor.selection.active),
        renderOptions: {}
    };
    selectionContentText[__0x.cursorOnlyText].contentText
        .forEach(
            contentTextFunc(
                buffer,
                context,
                option));
};

const singleLineSelection = (editor: vscode.TextEditor, previousKey: number[]): void => {
    clearBufferOfhexkey(editor.setDecorations, previousKey);
    const context = {
        idx: 0,
        editor: editor
    };
    const buffer = selectionTextBuffer[__0x.singleLineText];
    const option = {
        range: createLineRange(editor.selection.active),
        renderOptions: {}
    };
    selectionContentText[__0x.singleLineText]
        .contentText
        .forEach(
            contentTextFunc(
                buffer,
                context,
                option));
};

const contentTextFuncBuffered = (
    setDecorations: vscode.TextEditor['setDecorations'],
    buffer: vscode.TextEditorDecorationType[],
    decorationOption,
    range: vscode.Range,
    countBuffer: Record<number, number | null>) => (
        decorationType: any | vscode.DecorationRenderOptions,
        idx: number) => {
        decorationOption.range = range;
        decorationOption.renderOptions = decorationType;
        if (typeof decorationType.after.contentText !== 'string') {
            const numlink = decorationType.after.contentText;
            if (countBuffer[numlink] === null) {
                countBuffer[numlink] = multilineFunctionSymLink[numlink](vscode.window.activeTextEditor);
            }
            decorationOptionBuffer.after = { ...decorationType.after };
            decorationOptionBuffer.after.contentText = String(countBuffer[numlink]);
            decorationOption.renderOptions = decorationOptionBuffer;
        }
        setDecorations(buffer[idx], [decorationOption]);
    };

const decorationOptionGrid = {
    range: undefined,
    renderOptions: undefined
};

const multilineSelection = (editor: vscode.TextEditor, previousKey: number[]): void => {
    __0x.multiLine !== previousKey[0] && clearBufferOfhexkey(editor.setDecorations, previousKey);
    const multiLineBuffer: Record<number, number | null> = {
        [__0x.multiLineLineCountHex]: null,
        [__0x.multiLineChararcterHex]: null
    };
    selectionContentText[__0x.multiLineAnchorText]
        .contentText
        .forEach(
            contentTextFuncBuffered(
                editor.setDecorations,
                selectionTextBuffer[__0x.multiLineAnchorText],
                { ...decorationOptionGrid },
                createLineRange(editor.selection.anchor),
                multiLineBuffer));
    selectionContentText[__0x.multiLineCursorText]
        .contentText
        .forEach(
            contentTextFuncBuffered(
                editor.setDecorations,
                selectionTextBuffer[__0x.multiLineCursorText],
                { ...decorationOptionGrid },
                createLineRange(editor.selection.active),
                multiLineBuffer));
};

const multiCursorSelection = (editor: vscode.TextEditor, previousKey: number[]): void => {
    clearBufferOfhexkey(editor.setDecorations, previousKey);
    const statusLine: number[] = [];
    const selectionText = selectionContentText[__0x.multiCursorText].contentText;
    const context: Type.ContentTextFuncContext = {
        idx: 0,
        editor: editor
    };

    const selectionReorder = {};

    let lineIdx = 0;
    while (lineIdx < editor.selections.length) {
        const lineNo = editor.selections[lineIdx].start.line;
        if (!Object.hasOwn(selectionReorder, lineNo)) {
            selectionReorder[lineNo] = [0, undefined];
        }

        const lineSet = new Set(statusLine);
        if (lineSet.has(editor.selections[lineIdx].end.line)) {
            selectionReorder[editor.selections[lineIdx].start.line][0] += 1;
            lineIdx++;
            continue;
        }

        selectionReorder[editor.selections[lineIdx].start.line][0] += 1;
        selectionReorder[editor.selections[lineIdx].start.line][1] = editor.selections[lineIdx];
        statusLine.push(editor.selections[lineIdx].end.line);
        lineIdx++;
    }

    let cursorIdx = 1;

    for (const lineKey of Object.keys(selectionReorder).map(line => Number(line)).sort(compareNumbers)) {

        const selectionTextInfo: vscode.TextEditorDecorationType[] = selectionText.map(selection => vscode.window.createTextEditorDecorationType(selection));
        const option = {
            range: createStartEndRangeOfSelection(selectionReorder[lineKey][1]),
            renderOptions: {}
        };

        const idxBuffer: number[] = [];

        for (let pos = cursorIdx; pos < cursorIdx + selectionReorder[lineKey][0]; pos++) {
            idxBuffer.push(pos);
        }

        context.idx = idxBuffer.join(',');

        selectionText
            .forEach(
                contentTextFunc(
                    selectionTextInfo,
                    context,
                    option));
        selectionTextBuffer[__0x.multiCursorText].push(selectionTextInfo);
        cursorIdx += selectionReorder[lineKey][0];
    }
};

const clearSelectionTextBuffer = (editor: vscode.TextEditor): void => {
    SELECTION_KIND_LIST.forEach(hexKey => clearBufferOfhexkey(editor.setDecorations, [hexKey]));
};

const clearDisposeBuffer = (setDecorations: vscode.TextEditor["setDecorations"]) =>
    (buffer: vscode.TextEditorDecorationType): void => {
        setDecorations(buffer, blankRange);
        buffer.dispose();
    };

const clearBufferOfhexkey = (setDecorations: vscode.TextEditor["setDecorations"], previousKey: number[]): void => {
    switch (previousKey[0]) {
        case __0x.cursorOnly:
            selectionTextBuffer[__0x.cursorOnlyText].forEach(resetDecoration(setDecorations));
            break;
        case __0x.singleLine:
            selectionTextBuffer[__0x.singleLineText].forEach(resetDecoration(setDecorations));
            break;
        case __0x.multiLine:
            selectionTextBuffer[__0x.multiLineAnchorText].forEach(resetDecoration(setDecorations));
            selectionTextBuffer[__0x.multiLineCursorText].forEach(resetDecoration(setDecorations));
            break;
        case __0x.multiCursor:
            for (const selection of selectionTextBuffer[__0x.multiCursorText]) {
                selection.forEach(clearDisposeBuffer(setDecorations));
            }
            selectionTextBuffer[__0x.multiCursorText].splice(0);
            break;
        default:
            break;
    }
};

const selectionTextInfoSplit = {
    [__0x.cursorOnly]: (editor: vscode.TextEditor, previousKey: number[]) => cursorOnlySelection(editor, previousKey),
    [__0x.singleLine]: (editor: vscode.TextEditor, previousKey: number[]) => singleLineSelection(editor, previousKey),
    [__0x.multiLine]: (editor: vscode.TextEditor, previousKey: number[]) => multilineSelection(editor, previousKey),
    [__0x.multiCursor]: (editor: vscode.TextEditor, previousKey: number[]) => multiCursorSelection(editor, previousKey)
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
    setSelectionTextbuffer,
    clearSelectionTextBuffer,
    cursorOnlySelection,
    singleLineSelection,
    multilineSelection,
    multiCursorSelection
};