import * as vscode from 'vscode';
import * as Type from '../../type/type';
import * as __0x from '../../constant/shared/numeric';
import { INDENT_INFO, SELECTION_CONTENT_TEXT, SELECTION_KIND_LIST } from '../../constant/shared/object';
import { NULL_COLLECTION, SELECTION_CONTENT_TEXT_CONFIG_KEY } from '../../constant/config/enum';
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
    [__0x.multiCursorText]: [] as any
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
const multiLineFn = {
    lc: (editor: vscode.TextEditor) => ((editor.selection.end.line - editor.selection.start.line) + 1),
    char: (editor: vscode.TextEditor) => editor.document.getText(editor.selection).replace(indentInfo[__0x.regex] as RegExp, "").length
};

/**
 * mutli-cursor selection function collections
 */
const multiCursorFn = {
    nth: ({ idx }) => idx,
    count: ({ editor }) => editor.selections.length,
    ln: ({ idx, editor }) => editor.selections[idx].end.line + 1,
    lc: ({ editor, pos }) => {
        return editor.selections[0].isSingleLine ? editor.selections.length : editor.selections.length * (editor.selections[pos].end.line - editor.selections[pos].start.line + 1);
    },
    char: ({ editor, pos }) => {
        if (editor.selections[0].isSingleLine) {
            return (editor.selections[pos].end.character - editor.selections[pos].start.character);
        }
        const text = editor.document.getText(editor.selections[pos]);
        return text.replace(indentInfo[__0x.regex], "").length;
    },
};

const multiCursorOf = {
    nth: () => 0,
    count: () => 0,
    ln: () => 0,
    lc: () => 0,
    char: () => 0,
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
 * reference replication for the selection status
 * 
 * @param placehoder 
 * @param object 
 */
const syncrefernceTable = (placehoder: string, refObj: object): void => {
    refernceTable[placehoder] = refObj;
};

/** 
 * status reference replica for line count and character count
 * */
const refernceTable = {
    // multl line refefecen objects
    mln_lc: {} as any | vscode.DecorationInstanceRenderOptions,
    mln_char: {} as any | vscode.DecorationInstanceRenderOptions,
    //  multl cursor refefecen objects
    mcs_nth: {} as any | vscode.DecorationInstanceRenderOptions,
    mcs_count: {} as any | vscode.DecorationInstanceRenderOptions,
    mcs_ln: {} as any | vscode.DecorationInstanceRenderOptions,
    mcs_lc: {} as any | vscode.DecorationInstanceRenderOptions,
    mcs_char: {} as any | vscode.DecorationInstanceRenderOptions,
};

const optionGrid = {
    range: {},
    renderOptions: {}
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
type BufferedFuncSignature = (setDecorations: vscode.TextEditor['setDecorations'], buffer: vscode.TextEditorDecorationType[], channel: number,) => (renderOption: any | vscode.DecorationRenderOptions, idx: number) => void

const contentTextFuncBuffered: BufferedFuncSignature = (setDecorations, buffer, channel) => (renderOption, idx) => {
    renderBufferCH[channel][0].renderOptions = renderOption;   // set decorationRenderOption as is
    setDecorations(buffer[idx], renderBufferCH[channel]);      // render on range channel 0 = anchor, 1 = active cursor
};

/**
 * pre-create array for decroationOption array for both anchor and cursor
 * so that contentTextFuncBuffered() does not need to create an array on 
 * calling setDecoration, 
 */
const renderBufferCH = [
    [Object.create(optionGrid)],
    [Object.create(optionGrid)],
    [Object.create(optionGrid)],
    [Object.create(optionGrid)],
    [Object.create(optionGrid)],
];

const multilineSelection = (editor: vscode.TextEditor, previousKey: number[]): void => {
    __0x.multiLine !== previousKey[0] && clearBufferOfhexkey(editor.setDecorations, previousKey);

    refernceTable
        .mln_lc
        .contentText = multiLineFn.lc(editor).toString();           // update selection status references
    refernceTable
        .mln_char
        .contentText = multiLineFn.char(editor).toString();

    renderBufferCH[0][0]
        .range = createLineRange(editor.selection.anchor);          // set range on decoration channel 
    renderBufferCH[1][0]
        .range = createLineRange(editor.selection.active);

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

// mcs_nth: {} as any | vscode.DecorationInstanceRenderOptions,
// mcs_count: {} as any | vscode.DecorationInstanceRenderOptions,
// mcs_ln: {} as any | vscode.DecorationInstanceRenderOptions,
// mcs_lc: {} as any | vscode.DecorationInstanceRenderOptions,
// mcs_char: {} as any | vscode.DecorationInstanceRenderOptions,

// const multiCursorIndexBuffer: number[] = [];

const asendingByLineNo = (a: vscode.Selection, b: vscode.Selection): number => (a.end.line - b.end.line);



const selectionBuffer = [] as any; // as [number, vscode.DecroationType[], vscode.Range]

const decorationBuffer = [[], [], [], [], []] as any;

const contentTextFuncRefOnly = (setDecorations, option) => (decorationOption) => {
    const decorationType = vscode.window.createTextEditorDecorationType(decorationOption);
    option.renderOptions = decorationOption;    // set decorationRenderOption as is
    setDecorations(decorationType, [option]);   // render on range channel 0 = anchor, 1 = active cursor
    return decorationType;
};

const multiCursorContext = {
    idx: "",
    editor: Object.create(null),
    pos: 0
};

const multiCursorMeta = {
    cursorPosition: 0,
    lc: 0,
    char: 0,
};

const multiCursorBufferCh = [{ ...optionGrid }];

const multiCursorStatus = (editor, pos) => {
    const selectionText = selectionContentText[__0x.multiCursorText].contentText;
    optionGrid.range = editor.selections[pos];
    const selectionTextInfo = selectionText.map(contentTextFuncRefOnly(editor.setDecorations, optionGrid));
    return [pos + 1, selectionTextInfo, editor.selections[pos]];
};

const updateStatus = (editor: vscode.TextEditor) => {

    // multiCursorBufferCh[0].range = 
    // multiCursorBufferCh[0].renderOptions = selectionContentText[__0x.multiCursorText].contentText[7];
    // editor.setDecorations(selectionTextBuffer[__0x.multiCursorText][0][1][7], editor.selections);
    // editor.setDecorations(selectionTextBuffer[__0x.multiCursorText][0][1][7], selectionContentText[__0x.multiCursorText].contentText[7]);
    // const buffer = selectionTextBuffer[__0x.multiCursorText];
    // let length = buffer.length;
    // while (length--) {

    //     multiCursorBufferCh[0].range = buffer[length][2];
    //     multiCursorBufferCh[0].renderOptions = selectionContentText[__0x.multiCursorText].contentText[5];
    //     editor.setDecorations(buffer[length][1][5], multiCursorBufferCh as any);
    //     multiCursorBufferCh[0].renderOptions = selectionContentText[__0x.multiCursorText].contentText[7];
    //     editor.setDecorations(buffer[length][1][7], multiCursorBufferCh as any);

    //     // renderBufferCH[1][0].range = buffer[length][2];
    // }
};

/**
 * 
 * 
 * @param editor  
 * @param previousKey 
 */
const multiCursorSelection = (editor: vscode.TextEditor, previousKey: number[]): void => {
    __0x.multiCursor !== previousKey[0] && (() => {
        clearBufferOfhexkey(editor.setDecorations, previousKey);

        multiCursorMeta.cursorPosition = 0;
        multiCursorMeta.lc = 0;
        multiCursorMeta.char = 0;

        selectionTextBuffer[__0x.multiCursorText].push(multiCursorStatus(editor, multiCursorMeta.cursorPosition));
        multiCursorMeta.cursorPosition++;
        multiCursorContext.idx = '';
        multiCursorContext.editor = editor;
        multiCursorContext.pos = multiCursorMeta.cursorPosition;
    })();

    multiCursorContext.editor = editor;
    multiCursorContext.pos = multiCursorMeta.cursorPosition;
    refernceTable.mcs_lc.contentText = multiCursorFn.lc(multiCursorContext).toString();
    multiCursorMeta.char = multiCursorMeta.char + multiCursorFn.char(multiCursorContext);
    refernceTable.mcs_char.contentText = multiCursorMeta.char.toString();
    updateStatus(editor);

    selectionTextBuffer[__0x.multiCursorText].push(multiCursorStatus(editor, multiCursorMeta.cursorPosition));

    multiCursorMeta.cursorPosition++;


    // console.log(selectionTextBuffer[__0x.multiCursorText]);

    // let widx = 0;
    // while (widx < targetSelection.length) {

    //     const context = {
    //         idx: '',
    //         editor: editor,
    //         pos: multiCursorState[1]
    //     };

    //     const selectionText = selectionContentText[__0x.multiCursorText].contentText;
    //     const selectionTextInfo = selectionText.map(decorationOption => vscode.window.createTextEditorDecorationType(decorationOption));
    //     const range = createStartEndRangeOfSelection(editor.selections[multiCursorState[1]]);

    //     const option = { ...optionGrid };
    //     option.range = range;

    //     selectionText
    //         .forEach(
    //             contentTextFunc(
    //                 selectionTextInfo,
    //                 context,
    //                 option));



    //     multiCursorState[2] += multiCursorFn.lc(context);
    //     multiCursorState[3] += multiCursorFn.char(context);

    //     refernceTable
    //         .mcs_lc
    //         .contentText = multiCursorState[2].toString();
    //     refernceTable
    //         .mcs_char
    //         .contentText = multiCursorState[3].toString();
    //     multiCursorState[1]++;
    //     widx++;
    // }

    // console.log(selectionTextBuffer[__0x.multiCursorText]);
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
                selection[1].forEach(clearDisposeBuffer(setDecorations));
            }
            selectionTextBuffer[__0x.multiCursorText] = [];
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
    syncrefernceTable
};