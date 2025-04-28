import * as vscode from 'vscode';
import * as Type from '../../type/type';
import * as __0x from '../../constant/shared/numeric';
import { INDENT_INFO, SELECTION_CONTENT_TEXT, SELECTION_KIND_LIST } from '../../constant/shared/object';
import { SELECTION_CONTENT_TEXT_CONFIG_KEY } from '../../constant/config/enum';
import { DECORATION_OPTION_CONFIG } from '../../constant/config/object';
import { createLineRange, blankRange } from '../range';
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
    [__0x.multiLineText]: [] as vscode.TextEditorDecorationType[],
    [__0x.multiCursorText]: [] as vscode.TextEditorDecorationType[]
};

const selectionDecorationOption = {
    [__0x.cursorOnlyText]: [] as any,
    [__0x.singleLineText]: [] as any,
    [__0x.multiLineText]: [] as any,
    [__0x.multiCursorText]: [] as any
};

const rangePointerTable = {
    [__0x.cursorOnlyText]: undefined as any | vscode.Range,
    [__0x.singleLineText]: undefined as any | vscode.Range,
    [__0x.multiLineAnchorText]: undefined as any | vscode.Range,
    [__0x.multiLineCursorText]: undefined as any | vscode.Range,
    [__0x.multiCursorText]: [] as any | vscode.Range[]
};

/**
 * will work as deocorationRenderOption buffer, but will not be copied
 * becuase the api will consume the object and references in this object will
 * automatically be de-referenced by the api as they are consumed.
 */
const decorationOptionBuffer = { ...DECORATION_OPTION_CONFIG } as Type.DecorationRenderOptionType;

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
    charOnly: __0x.multiLineChararcterOnlyHex
};

/**
 * need to be renamed from symlink to hexLink. 
 * it used symbols before but symbols are slow. 
 * 
 * __0x.multiLineLineCountHex => total lines in selection
 * __0x.multiLineChararcterHex => total characters in seleciton
 */
const multiLineFn = {
    lc: (editor: vscode.TextEditor) =>
        ((editor.selection.end.line - editor.selection.start.line) + 1),
    char: (editor: vscode.TextEditor) =>
        editor.document.getText(editor.selection).length,
    charOnly: (editor: vscode.TextEditor) =>
        editor.document.getText(editor.selection).replace(indentInfo.regex as RegExp, "").length
};

/**
 * mutli-cursor selection function collections
 */
const multiCursorFn = {
    // nth: ({ idx }) => idx,
    count: ({ editor }) => 1,
    // ln: ({ idx, editor }) => editor.selections[idx].end.line + 1,
    lc: ({ editor, pos }) => {
        return editor.selections[0].isSingleLine ? editor.selections.length : (editor.selections[pos].end.line - editor.selections[pos].start.line + 1);
    },
    char: ({ editor, pos }) => {
        //  char
        if (editor.selections[0].isSingleLine) {
            return (editor.selections[pos].end.character - editor.selections[pos].start.character);
        }
        const text = editor.document.getText(editor.selections[pos]);
        return text.replace(indentInfo[__0x.regex], "").length;
    },
};

const multiCursorOf = {
    nth: __0x.multiCursorLineNthHex,
    count: __0x.multiCursorLineCountHex,
    ln: __0x.multiCursorLineLineNumberHex,
    lc: __0x.multiCursorLineLineCountHex,
    char: __0x.multiCursorLineCharacterHex,
};

/**
 * calcultation function stacks for selection status block. 
 * 
 * this object will only be used as a function reference hex number only 
 * to indicate if the contentText need to have dynamic values, 
 * in all fairness, it is not necesary as position is worked out by regex
 * and the function will be called by reference, not by anonymous function anymore.
 * this can be removed but keeping it in case if future implementation require pre-preparing 
 * regarding with contentText with this method.
 * 
 */
const selectionOf: Type.ContentTextStateType = {
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: { ...columns, ...lineNumber },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: { ...lineNumber, ...characterCount },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: { ...lineNumber, ...multiLineOf },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: { ...lineNumber, ...multiLineOf },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: multiCursorOf,
};

const composeRenderOption = (hexKey, contentText) => {
    return {
        get range() {
            return rangePointerTable[hexKey];
        },
        renderOptions: contentText
    };
};

const setDeocorationOption = (hexKey: number) => {
    selectionContentText[hexKey].contentText.forEach((contentText) => {
        selectionDecorationOption[hexKey].push([composeRenderOption(hexKey, contentText)]);
    });
};

const selectionStatusFunctionChain = {
    [__0x.cursorOnlyText]: [] as any,
    [__0x.singleLineText]: [] as any,
    [__0x.multiLineText]: [] as any,
    [__0x.multiCursorText]: [] as any
};

const buildFunctionChain = (hexKey: number, placehoder, statusFunciton) => {
    placehoder.forEach((position) => {
        if (Object.hasOwn(statusFunciton, position[1])) {
            selectionStatusFunctionChain[hexKey].push([position[1], statusFunciton[position[1]]]);
        }
    });
};

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
const setSelectionTextbuffer = (hexKey: number, length: number, placeholder): void => {

    decorationOptionBuffer.isWholeLine = true;
    decorationOptionBuffer.rangeBehavior = vscode.DecorationRangeBehavior.ClosedClosed;

    let lengthBuffer = length;
    while (lengthBuffer--) {
        const decorationType = vscode.window.createTextEditorDecorationType(decorationOptionBuffer);
        selectionTextBuffer[hexKey].push(decorationType);
    }

    selectionDecorationOption[hexKey]?.splice(0);
    switch (hexKey) {
        case __0x.cursorOnlyText:
            setDeocorationOption(hexKey);
            buildFunctionChain(__0x.cursorOnlyText, placeholder, { ...lineNumber, ...columns });
            break;
        case __0x.singleLineText:
            setDeocorationOption(hexKey);
            buildFunctionChain(__0x.singleLineText, placeholder, { ...lineNumber, ...characterCount });
            break;
        case __0x.multiLineText:
            selectionDecorationOption[hexKey].length = length;
            selectionDecorationOption[hexKey].fill(...[]);
            selectionTextBuffer[hexKey].forEach((option, idx) => {
                selectionDecorationOption[hexKey][idx] = [];
                selectionDecorationOption[hexKey][idx].push(
                    composeRenderOption(__0x.multiLineAnchorText, selectionContentText[__0x.multiLineAnchorText].contentText[idx]),
                    composeRenderOption(__0x.multiLineCursorText, selectionContentText[__0x.multiLineCursorText].contentText[idx])
                );
            });
            buildFunctionChain(__0x.multiLineText, placeholder, { ...lineNumber, ...multiLineFn });
            break;
        case __0x.multiCursorText:
            selectionContentText[hexKey].contentText.forEach(() => {
                selectionDecorationOption[hexKey].push([]);
            });
            buildFunctionChain(hexKey, placeholder, { ...multiCursorFn });
            break;
        default: break;
    }
};

/**
 * reference replication for the selection status
 * 
 * @param placehoder 
 * @param object 
 */
const syncrefernceTable = (placehoder: string, hexKey: number, refObj: object): void => {
    switch (hexKey) {
        case __0x.cursorOnly:
            cursorOnlyStatusRef[placehoder] = refObj;
            break;
        case __0x.singleLine:
            singleLinetatusRef[placehoder] = refObj;
            break;
        case __0x.multiLine:
            multiLinetatusRef[placehoder] = refObj;
            break;
        case __0x.multiCursor:
            multiCursorStatusRef[placehoder] = refObj;
            break;
        default: break;
    }
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
type BufferedFuncSignature = (setDecorations: vscode.TextEditor['setDecorations'], buffer: vscode.TextEditorDecorationType[]) => (renderOption: any | vscode.DecorationRenderOptions, idx: number) => void

const contentTextFuncBuffered: BufferedFuncSignature = (setDecorations, buffer) => (renderOption, idx) => {
    setDecorations(buffer[idx], renderOption);
};

const functionChain = (statusRef, args) => ([fnName, fnChain]) => {
    statusRef[fnName].contentText = fnChain(args).toString();
};

const functionChainAccumulate = (statusRef, args) => ([fnName, fnChain]) => {
    multiCursorCounter[fnName] += fnChain(args);
    statusRef[fnName].contentText = multiCursorCounter[fnName].toString();
};

const cursorOnlyStatusRef = {
    ln: undefined as any | vscode.DecorationInstanceRenderOptions,
    col: undefined as any | vscode.DecorationInstanceRenderOptions,
    zCol: undefined as any | vscode.DecorationInstanceRenderOptions,
};

/**
 * render function implementation for cursorOnly selection status block
 * 
 * @param editor 
 * @param previousKey 
 */
const cursorOnlySelection = (editor: vscode.TextEditor, previousKey: number[]): void => {
    clearSelectionTextBuffer(editor);

    selectionStatusFunctionChain[__0x.cursorOnlyText].forEach(functionChain(cursorOnlyStatusRef, { editor }));

    rangePointerTable[__0x.cursorOnlyText] = createLineRange(editor.selection.active);

    selectionDecorationOption[__0x.cursorOnlyText]
        .forEach(
            contentTextFuncBuffered(
                editor.setDecorations,
                selectionTextBuffer[__0x.cursorOnlyText]));
};

const singleLinetatusRef = {
    ln: undefined as any | vscode.DecorationInstanceRenderOptions,
    char: undefined as any | vscode.DecorationInstanceRenderOptions,
};

/**
 * render function implementation for singleLine selection status block
 * 
 * @param editor 
 * @param previousKey 
 */
const singleLineSelection = (editor: vscode.TextEditor, previousKey: number[]): void => {
    clearBufferOfhexkey(editor.setDecorations, previousKey);

    selectionStatusFunctionChain[__0x.singleLineText].forEach(functionChain(singleLinetatusRef, { editor }));

    rangePointerTable[__0x.singleLineText] = createLineRange(editor.selection.active);

    selectionDecorationOption[__0x.singleLineText]
        .forEach(
            contentTextFuncBuffered(
                editor.setDecorations,
                selectionTextBuffer[__0x.singleLineText]));
};

const multiLinetatusRef = {
    ln: undefined as any | vscode.DecorationInstanceRenderOptions,
    lc: undefined as any | vscode.DecorationInstanceRenderOptions,
    char: undefined as any | vscode.DecorationInstanceRenderOptions,
    charOnly: undefined as any | vscode.DecorationInstanceRenderOptions,
};

const multilineSelection = (editor: vscode.TextEditor, previousKey: number[]) => {
    __0x.multiLine !== previousKey[0] && clearBufferOfhexkey(editor.setDecorations, previousKey);

    selectionStatusFunctionChain[__0x.multiLineText].forEach(functionChain(multiLinetatusRef, editor));

    rangePointerTable[__0x.multiLineAnchorText] = createLineRange(editor.selection.anchor);
    rangePointerTable[__0x.multiLineCursorText] = createLineRange(editor.selection.active);

    selectionDecorationOption[__0x.multiLineText]
        .forEach(
            contentTextFuncBuffered(
                editor.setDecorations,
                selectionTextBuffer[__0x.multiLineText]));
};

const multiCursorStatusRef: Record<string, any | vscode.DecorationInstanceRenderOptions> = {
    nth: undefined,
    count: undefined,
    ln: undefined,
    lc: undefined,
    char: undefined,
};

const multiCursorState: Record<string, any | number | boolean | vscode.Selection[]> = {
    context: {
        editor: {} as any | vscode.TextEditor,
        pos: 0,
        char: 0,
    },
    selections: [] as vscode.Selection[],
    accumulate: false,
    nthPosition: 1,
    statusIndex: 1,
    baseLine: -1,
    baseShift: false,
    index: 0,
};

const multiCursorCounter: Record<string, number> = {
    nth: 0,
    count: 0,
    ln: 0,
    lc: 0,
    char: 0,
};

const clearMultiCursorState = () => {
    multiCursorState.selections = [];
    multiCursorState.index = 0;
    multiCursorState.statusIndex = 0;
    multiCursorState.context.pos = 0;
    multiCursorState.baseShift = false;
    multiCursorState.baseLine = -1;
    multiCursorState.context.editor = {};
    multiCursorCounter.nth = 0;
    multiCursorCounter.count = 0;
    multiCursorCounter.ln = 0;
    multiCursorCounter.lc = 0;
    multiCursorCounter.char = 0;
};

const shiftPreviousIndex = (selectionIndex, decorationOption, nth) => (_option, idx) => {
    if (idx < selectionIndex - (multiCursorState.statusIndex) - 1) {
        decorationOption[nth][idx].renderOptions.after.shiftIndex(1);
    }
};

const multiCursorOption = (option, selectionIndex, nth) => (contentText, idx) => {
    option[idx].push({
        get range() {
            return multiCursorState.selections[selectionIndex];
        },
        renderOptions: idx === nth ? { ...contentText } : contentText
    });
};

const insertMultiCursor = (selectionIndex: number) => {
    const nth = multiCursorState.nthPosition;
    if (multiCursorState.selections[selectionIndex].end.line < multiCursorState.baseLine) {
        if (!multiCursorState.baseShift) {
            multiCursorState.statusIndex = 0;
            multiCursorState.baseShift = true;
        }

        selectionDecorationOption[__0x.multiCursorText][nth]
            .forEach(
                shiftPreviousIndex(
                    selectionIndex,
                    selectionDecorationOption[__0x.multiCursorText],
                    multiCursorState.nthPosition));
    }

    if (selectionIndex > 0 && multiCursorState.selections[selectionIndex - 1].end.line === multiCursorState.selections[selectionIndex].end.line) {
        selectionDecorationOption[__0x.multiCursorText][nth][selectionIndex - 1].renderOptions.after.addIndex(multiCursorState.statusIndex + 1);
        return;
    }

    const nthPlaceholder = selectionContentText[__0x.multiCursorText].contentText[nth];
    nthPlaceholder.after = {
        ...nthPlaceholder.after,
        indexList: [multiCursorState.statusIndex + 1],
        addIndex(i) {
            this.indexList.push(i);
        },
        shiftIndex(shift) {
            this.indexList.forEach((i, idx) => this.indexList[idx] += shift);
        },
        get contentText() {
            return this.indexList.join(',');
        },
    };

    selectionContentText[__0x.multiCursorText]
        .contentText
        .forEach(
            multiCursorOption(
                selectionDecorationOption[__0x.multiCursorText],
                selectionIndex,
                nth));
};

const setRangerPointer = (table) => (selection, idx) => table[idx] = selection;

const renderMultiCursor = (setDecorations, decorationOption) => (decorationType, idx) => setDecorations(decorationType, decorationOption[idx]);

const multiCursorSelection = (editor: vscode.TextEditor, previousKey: number[]): void => {

    __0x.multiCursor !== previousKey[0] && (() => {
        clearBufferOfhexkey(editor.setDecorations, previousKey);
        clearMultiCursorState();
        multiCursorState.context.editor = editor;
        multiCursorState.context.pos = multiCursorState.index;
        multiCursorState.selections.push(editor.selections[0]);
        selectionStatusFunctionChain[__0x.multiCursorText].forEach(functionChainAccumulate(multiCursorStatusRef, multiCursorState.context));
        insertMultiCursor(multiCursorState.index);
        multiCursorState.baseLine = editor.selections[0].end.line;
        multiCursorState.index++;
        multiCursorState.statusIndex++;
    })();



    const selection = editor.selections[multiCursorState.index];
    multiCursorState.selections.push(selection);

    selectionStatusFunctionChain[__0x.multiCursorText].forEach(functionChainAccumulate(multiCursorStatusRef, multiCursorState.context));

    insertMultiCursor(multiCursorState.index);
    multiCursorState.index++;
    multiCursorState.statusIndex++;

    multiCursorState.selections.forEach(setRangerPointer(rangePointerTable[__0x.multiCursorText]));
    selectionTextBuffer[__0x.multiCursorText].forEach(renderMultiCursor(editor.setDecorations, selectionDecorationOption[__0x.multiCursorText]));
};

const clearSelectionTextBuffer = (editor: vscode.TextEditor): void => {
    SELECTION_KIND_LIST?.forEach(hexKey => clearBufferOfhexkey(editor.setDecorations, [hexKey]));
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
            selectionTextBuffer[__0x.multiLineText].forEach(resetDecoration(setDecorations));
            break;
        case __0x.multiCursor:
            clearMultiCursorState();
            selectionTextBuffer[__0x.multiCursorText].forEach(resetDecoration(setDecorations));
            selectionDecorationOption[__0x.multiCursorText].forEach((option, idx) => {
                selectionDecorationOption[__0x.multiCursorText][idx] = [];
            });
            break;
        default:
            break;
    }
};

type BindContentTextStateType = {
    functionOf: Type.ContentTextStateType,
    textOf: Type.StatusContentTextType,
    infoOf: Type.IndentInfoType
}

const bindStatusContentTextState = (): BindContentTextStateType => {
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