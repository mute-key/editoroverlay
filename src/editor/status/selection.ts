import * as vscode from 'vscode';
import * as Type from '../../type/type';
import * as __0x from '../../constant/shared/numeric';
import { INDENT_INFO, SELECTION_CONTENT_TEXT, SELECTION_KIND_LIST } from '../../constant/shared/object';
import { SELECTION_CONTENT_TEXT_CONFIG_KEY } from '../../constant/config/enum';
import { DECORATION_OPTION_CONFIG } from '../../constant/config/object';
import { createLineRange, blankRange, createStartEndRangeOfSelection } from '../range';
import { resetDecoration } from '../editor';

/**
 * memory for decorationRenderOption objects
 * 
 */
const selectionContentText = {
    ...SELECTION_CONTENT_TEXT
} as unknown as Type.StatusContentTextType;


const indentInfo = {
    ...INDENT_INFO
} as Type.IndentInfoType;

/**
 * buffer that will store styled decroationType objects in fixed width array.
 * it is because creating or change in size is costly operation instead of using 
 * fixed array. array in general is very well optimized but it is stil be very 
 * advantageous not to recreate or change the size of array and use the memory 
 * that are already allocated in all cases, especially in iteration operation.
 * 
 */
const selectionTextBuffer = {
    [__0x.cursorOnlyText]: [] as vscode.TextEditorDecorationType[],
    [__0x.singleLineText]: [] as vscode.TextEditorDecorationType[],
    [__0x.multiLineAnchorText]: [] as vscode.TextEditorDecorationType[],
    [__0x.multiLineCursorText]: [] as vscode.TextEditorDecorationType[],
    [__0x.multiCursorText]: [] as any[]
};

/**
 * will work as deocorationRenderOption buffer, but will not be copied
 * becuase the api will consume the object and references in this object will
 * automatically be de-referenced by the api as they are consumed.
 */
const decorationOptionBuffer = { ...DECORATION_OPTION_CONFIG } as Type.DecorationRenderOptionType;

/**
 * prepare selection status block buffer with pre-created vscode.decorationType(s)
 * so they do not need to be recreated on refresh. creating decorationType is costly, 
 * and it put some overhead by regenerating it's unique key as well as 
 * to vscode decoration registry.
 * 
 * @param hexKey 
 * @param size 
 * @returns 
 */
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

/**
 * editor character in line index/column calculator
 * 
 * @param editor 
 * @param delta 
 * @returns 
 */
const columnDelta = (editor, delta = 0): string => {
    const col = editor.selection.active.character + delta;
    const end = editor.document.lineAt(editor.selection.active.line).text.length + delta;
    return (col === end ? col : col + '/' + end);
};

/**
 * index type 
 */
const columns = {
    col: ({ editor }) => columnDelta(editor, 1),
    zCol: ({ editor }) => columnDelta(editor)
};

/**
 * character count in single line
 */
const characterCount = {
    char: ({ editor }): number => {
        return editor.selection.end.character - editor.selection.start.character;
    }
};

/**
 * current line number, (.line is zero based)
 */
const lineNumber = {
    ln: ({ editor }): number => {
        return editor.selection.active.line + 1;
    }
};

/**
 * multiLine selection status buffer, 
 */
const multiLineOf = {
    lc: __0x.multiLineLineCountHex,
    char: __0x.multiLineChararcterHex,
};

/**
 * need to be renamed from symlink to hexLink. 
 * it used symbols before but symbols are slow. 
 * 
 * __0x.multiLineLineCountHex => total lines in selection
 * __0x.multiLineChararcterHex => total characters in seleciton
 */
const multilineFn = {
    lc: (editor: vscode.TextEditor) => ((editor.selection.end.line - editor.selection.start.line) + 1),
    char: (editor: vscode.TextEditor) => editor.document.getText(editor.selection).replace(indentInfo[__0x.regex] as RegExp, "").length
};

/**
 * mutli-cursor selection function collections
 */
const multiCursorOf = {
    nth: ({ idx }) => idx,
    count: ({ editor }) => editor.selections.length,
    ln: ({ idx, editor }) => editor.selections[idx].end.line + 1,
    lc: __0x.multiCursorLineCountHex,
    char: __0x.multiLineChararcterHex,
};

const multiCursorOfFnHexLink = {
    lc: ({ editor }) => {
        return editor.selections.length * Math.abs(editor.selections[0].end.line - editor.selections[0].start.line + 1);
    },
    char: ({ editor }) => {
        let idx = 0;
        let charCount = 0;
        const length = editor.selections.length;
        while (idx < length) {
            if (editor.selections[0].isSingleLine) {
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

/**
 * calcultation function stacks for selection status block. 
 * 
 * this object will only be used as a function reference table
 * so the each decorationRenderOption can call it's required functions without 
 * searching for the functions to call to get the selection status values.
 * 
 */
const selectionOf: Type.ContentTextStateType = {
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: { ...columns, ...lineNumber },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: { ...lineNumber, ...characterCount },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: { ...lineNumber, ...multiLineOf },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: { ...lineNumber, ...multiLineOf },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: multiCursorOf,
};

/**
 * set decorationRenderOption to range on pre-created decroationType list in buffer based on index.
 * 
 * this funciton is a callback attachment for selectionContentText object based on 
 * selection hexKey of __0x.cursorOnly, __0x.singleLine or __0x.multiLine.
 * 
 * if contentText of decorationRenderOption is a function reference, call the function 
 * with given the context to get the selection status values
 * 
 */
const contentTextFunc = (buffer: vscode.TextEditorDecorationType[], context, option) => (contentText: any | vscode.DecorationRenderOptions, idx: number): void => {
    option.renderOptions = contentText;
    if (typeof contentText.after.contentText !== 'string') {
        decorationOptionBuffer.after = { ...contentText.after };
        decorationOptionBuffer.after.contentText = String(decorationOptionBuffer.after.contentText(context));
        option.renderOptions = decorationOptionBuffer;
    }
    context.editor.setDecorations(buffer[idx], [option]);
};

/**
 * render function implementation for cursorOnly selection status block
 * 
 * @param editor 
 * @param previousKey 
 */
const cursorOnlySelection = (editor: vscode.TextEditor, previousKey: number[]): void => {
    clearSelectionTextBuffer(editor);                           // clear all other selection status buffer
    const context = {                                           // status function context
        idx: 0,
        editor: editor
    };
    const buffer = selectionTextBuffer[__0x.cursorOnlyText];    // get pre-created decorationType buffer
    const option = {                                            // options to be passed to decroationType
        range: createLineRange(editor.selection.active),
        renderOptions: {}
    };
    selectionContentText[__0x.cursorOnlyText]                   // iteration of decorationRenderOption objects
        .contentText
        .forEach(
            contentTextFunc(
                buffer,
                context,
                option));
};

/**
 * render function implementation for singleLine selection status block
 * 
 * @param editor 
 * @param previousKey 
 */
const singleLineSelection = (editor: vscode.TextEditor, previousKey: number[]): void => {
    clearBufferOfhexkey(editor.setDecorations, previousKey);    // clear previous selection status decoration rendered
    const context = {                                           // status function context
        idx: 0,
        editor: editor
    };
    const buffer = selectionTextBuffer[__0x.singleLineText];    // get pre-created decorationType buffer
    const option = {                                            // options to be passed to decroationType
        range: createLineRange(editor.selection.active),
        renderOptions: {}
    };
    selectionContentText[__0x.singleLineText]                   // iteration of decorationRenderOption objects
        .contentText
        .forEach(
            contentTextFunc(
                buffer,
                context,
                option));
};

/**
 * forEach callback function for multilines
 * 
 * @param setDecorations 
 * @param buffer 
 * @param channel 
 * @param countBuffer 
 * @returns 
 */

type BufferedFuncSignature = (
    setDecorations: vscode.TextEditor['setDecorations'],
    buffer: vscode.TextEditorDecorationType[],
    channel: number,
) => (
    renderOption: any | vscode.DecorationRenderOptions,
    idx: number
) => void

const contentTextFuncBuffered: BufferedFuncSignature = (setDecorations, buffer, channel) => (renderOption, idx) => {
    renderBufferCH[channel][0].renderOptions = renderOption;   // set decorationRenderOption as is
    setDecorations(buffer[idx], renderBufferCH[channel]);      // render on range channel 0 = anchor, 1 = active cursor
};

const optionGrid = {
    range: {},
    renderOptions: {}
};

/**
 * pre-create array for decroationOption array for both anchor and cursor
 * so that contentTextFuncBuffered() does not need to create an array on 
 * calling setDecoration, 
 */
const renderBufferCH = [
    [Object.create(optionGrid)],
    [Object.create(optionGrid)],
];

const multiLineStatusRef = {
    lc: {} as any | vscode.DecorationInstanceRenderOptions,
    char: {} as any | vscode.DecorationInstanceRenderOptions
};

const syncReference = (placehoder: string, object): void => {
    multiLineStatusRef[placehoder] = object;
};

const multilineSelection = (editor: vscode.TextEditor, previousKey: number[]): void => {
    __0x.multiLine !== previousKey[0] && clearBufferOfhexkey(editor.setDecorations, previousKey);
    
    multiLineStatusRef.lc.contentText = multilineFn.lc(editor).toString();
    multiLineStatusRef.char.contentText = multilineFn.char(editor).toString();

    renderBufferCH[0][0].range = createLineRange(editor.selection.anchor);
    renderBufferCH[1][0].range = createLineRange(editor.selection.active);

    selectionContentText[__0x.multiLineAnchorText]                  // iterate decorationRenderOption objects 
        .contentText
        .forEach(
            contentTextFuncBuffered(                                // callback attach to render decorationRenderObject 
                editor.setDecorations,                              // on pre-created decorationType that already are in registry
                selectionTextBuffer[__0x.multiLineAnchorText],
                0));                                                // buffer channel index, 0 is anchor, 1 is active cursor

    selectionContentText[__0x.multiLineCursorText]
        .contentText
        .forEach(
            contentTextFuncBuffered(
                editor.setDecorations,
                selectionTextBuffer[__0x.multiLineCursorText],
                1));
};

const asendingByLineNo = (a: vscode.Selection, b: vscode.Selection): number => (a.end.line - b.end.line);

const multiCursorIndexBuffer: number[] = [];

const multiCursorOfStatus = {
    lc: -1,
    char: -1
};
/**
 * 
 * 
 * @param editor 
 * @param previousKey 
 */
const multiCursorSelection = (editor: vscode.TextEditor, previousKey: number[]): void => {
    clearBufferOfhexkey(editor.setDecorations, previousKey);

    const selectionText = selectionContentText[__0x.multiCursorText].contentText;
    const sorted = [...editor.selections].sort(asendingByLineNo);

    for (let idx = 0; idx < sorted.length; idx++) {
        if (idx + 1 < sorted.length && (sorted[idx].end.line === sorted[idx + 1].end.line)) {
            multiCursorIndexBuffer.push(idx + 1);
            idx++;
            continue;
        }

        const context = {
            idx: '',
            editor: editor
        };

        const selectionTextInfo: vscode.TextEditorDecorationType[] = selectionText.map(decorationOption => vscode.window.createTextEditorDecorationType(decorationOption));

        multiCursorIndexBuffer.push(idx + 1);
        context.idx = multiCursorIndexBuffer.join(',');

        selectionText
            .forEach(
                contentTextFunc(
                    selectionTextInfo,
                    context,
                    { ...optionGrid, range: createStartEndRangeOfSelection(sorted[idx]) }));

        selectionTextBuffer[__0x.multiCursorText].push(selectionTextInfo);
        multiCursorIndexBuffer.splice(0);
    }
    // });

    // let ridx = editor.selections.length;

    // while (ridx--) {



    // const lineSet = new Set(statusLine);

    // if (lineSet.has(sorted[context.idx].end.line)) {
    //     continue;
    // }

    // 

    // const option = {
    //     range: createStartEndRangeOfSelection(sorted[context.idx]),
    //     renderOptions: {}
    // };

    // selectionText
    //     .forEach(
    //         contentTextFunc(
    //             selectionTextInfo,
    //             context,
    //             option));


    // selectionTextBuffer[__0x.multiCursorText].push(selectionTextInfo);

    // statusLine.push(sorted[context.idx].end.line);
    // }


    // while (lineIdx < editor.selections.length) {
    //     const lineNo = editor.selections[lineIdx].start.line;
    //     if (!Object.hasOwn(selectionReorder, lineNo)) {
    //         selectionReorder[lineNo] = [0, undefined];
    //     }

    //     const lineSet = new Set(statusLine);
    //     if (lineSet.has(editor.selections[lineIdx].end.line)) {
    //         selectionReorder[editor.selections[lineIdx].start.line][0] += 1;
    //         lineIdx++;
    //         continue;
    //     }

    //     selectionReorder[editor.selections[lineIdx].start.line][0] += 1;
    //     selectionReorder[editor.selections[lineIdx].start.line][1] = editor.selections[lineIdx];
    //     statusLine.push(editor.selections[lineIdx].end.line);
    //     lineIdx++;
    // }

    // let cursorIdx = 1;
    // const context: Type.ContentTextFuncContext = {
    //     idx: 0,
    //     editor: editor
    // };

    // for (const lineKey of Object.keys(selectionReorder).map(line => Number(line)).sort(compareNumbers)) {

    //     const selectionTextInfo: vscode.TextEditorDecorationType[] = selectionText.map(selection => vscode.window.createTextEditorDecorationType(selection));
    //     const option = {
    //         range: createStartEndRangeOfSelection(selectionReorder[lineKey][1]),
    //         renderOptions: {}
    //     };

    //     const idxBuffer: number[] = [];

    //     for (let pos = cursorIdx; pos < cursorIdx + selectionReorder[lineKey][0]; pos++) {
    //         idxBuffer.push(pos);
    //     }

    //     context.idx = idxBuffer.join(',');

    //     selectionText
    //         .forEach(
    //             contentTextFunc(
    //                 selectionTextInfo,
    //                 context,
    //                 option));
    //     selectionTextBuffer[__0x.multiCursorText].push(selectionTextInfo);
    //     cursorIdx += selectionReorder[lineKey][0];
    // }
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
    multiCursorSelection,
    syncReference
};