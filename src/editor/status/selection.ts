import * as vscode from 'vscode';
import * as __0x from '../../constant/shared/numeric';
import { INDENT_INFO, SELECTION_CONTENT_TEXT, SELECTION_KIND_LIST } from '../../constant/shared/object';
import { BORDER_POSITION_MASK, SELECTION_CONTENT_TEXT_CONFIG_KEY } from '../../constant/config/enum';
import { DECORATION_OPTION_CONFIG } from '../../constant/config/object';
import { createLineRange, blankRange } from '../range';
import { resetDecoration } from '../editor';

import type * as D from '../../type/type.d';

/**
 * memory for decorationRenderOption objects
 * 
 */
const selectionContentText = {
    ...SELECTION_CONTENT_TEXT
} as unknown as D.Status.Intf.StatusContentText;

const indentInfo = {
    ...INDENT_INFO
} as D.Status.Intf.IndentInfo;

/**
 * buffer that will store styled decroationType objects in fixed width array.
 * it is because creating or change in size is costly operation instead of using 
 * fixed array. array in general is very well optimized but it is stil be very 
 * advantageous not to recreate or change the size of array and use the memory 
 * that are already allocated in all cases, especially in iteration operation.
 * 
 */
const selectionTextBuffer: Record<number, vscode.TextEditorDecorationType[]> = {
    [__0x.cursorOnlyText]: [],
    [__0x.singleLineText]: [],
    [__0x.multiLineText]: [],
    [__0x.multiCursorText]: []
};


/**
 * object that will store render options 
 */
const selectionDecorationOption: Record<number, any[] | [][] | [D.Decoration.Intf.RenderOption][]> = {
    [__0x.cursorOnlyText]: [],
    [__0x.singleLineText]: [],
    [__0x.multiLineText]: [],
    [__0x.multiCursorText]: []
};

const rangePointerTable: Record<number, undefined | [] | vscode.Range | vscode.Range[]> = {
    [__0x.cursorOnlyText]: undefined,
    [__0x.singleLineText]: undefined,
    [__0x.multiLineAnchorText]: undefined,
    [__0x.multiLineCursorText]: undefined,
    [__0x.multiCursorText]: [],
};

/**
 * will work as deocorationRenderOption buffer, but will not be copied
 * becuase the api will consume the object and references in this object will
 * automatically be de-referenced by the api as they are consumed.
 */
const decorationOptionBuffer = { ...DECORATION_OPTION_CONFIG } as D.Decoration.Intf.RenderInstanceOption;

/**
 * editor character in line index/column calculator
 * 
 * @param editor 
 * @param delta 
 * @returns 
 */
const columnDelta = (editor: vscode.TextEditor, delta = 0): number | string => {
    const col = editor.selection.active.character + delta;
    const end = editor.document.lineAt(editor.selection.active.line).text.length + delta;
    return (col === end ? col : col + '/' + end);
};

/**
 * index type 
 */
const columns = {
    col: ({ editor }: { editor: vscode.TextEditor }) => columnDelta(editor, 1),
    zCol: ({ editor }: { editor: vscode.TextEditor }) => columnDelta(editor)
};

/**
 * character count in single line
 */
const characterCount = {
    char: ({ editor }: { editor: vscode.TextEditor }): number => {
        return editor.selection.end.character - editor.selection.start.character;
    }
};

/**
 * current line number, (.line is zero based)
 */
const lineNumber = {
    ln: ({ editor }: { editor: vscode.TextEditor }): number => {
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
    count: ({ editor }: { editor: vscode.TextEditor }) => editor.selections.length,
    // ln: ({ idx, editor }) => editor.selections[idx].end.line + 1,
    lc: ({ editor, pos }: { editor: vscode.TextEditor, pos: number }) => {
        return editor.selections[0].isSingleLine ? editor.selections.length : editor.selections.length * (editor.selections[pos].end.line - editor.selections[pos].start.line + 1);
    },
    char: ({ editor, pos }: { editor: vscode.TextEditor, pos: number }) => {
        //  char
        if (editor.selections[0].isSingleLine) {
            return (editor.selections[pos].end.character - editor.selections[pos].start.character);
        }
        const text = editor.document.getText(editor.selections[pos]);
        return text.replace(indentInfo.regex as RegExp, "").length;
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
const selectionOf: D.Status.Tp.ContentTextState = {
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: { ...columns, ...lineNumber },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: { ...lineNumber, ...characterCount },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: { ...lineNumber, ...multiLineOf },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: { ...lineNumber, ...multiLineOf },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: multiCursorOf,
};

const composeRenderOption = (hexKey: any, contentText: any): D.Decoration.Intf.RenderOption => {
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

const selectionStatusFunctionChain: Record<number, any[]> = {
    [__0x.cursorOnlyText]: [] as any,
    [__0x.singleLineText]: [] as any,
    [__0x.multiLineText]: [] as any,
    [__0x.multiCursorText]: [] as any
};

const buildFunctionChain = (hexKey: number, placehoder: any[], statusFunciton: any) => {
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
const setSelectionTextbuffer = (hexKey: number, length: number, placeholder: any[]): void => {

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
            selectionDecorationOption[hexKey].fill([]);
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
        default:
            break;
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

const functionChain: D.Selection.Tp.FunctionChain = (statusRef, args) => ([fnName, fnChain]) => {
    statusRef[fnName].contentText = fnChain(args).toString();
};

const functionChainAccumulate: D.Selection.Tp.FunctionChain = (statusRef, args) => ([fnName, fnChain]) => {
    if (fnName === 'char') {
        multiCursorCounter[fnName] += fnChain(args);
        statusRef[fnName].contentText = multiCursorCounter[fnName].toString();
    } else {
        statusRef[fnName].contentText = fnChain(args).toString();
    }
};

const cursorOnlyStatusRef: Record<string, any | vscode.DecorationInstanceRenderOptions> = {
    ln: undefined,
    col: undefined,
    zCol: undefined,
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

const singleLinetatusRef: Record<string, undefined | vscode.DecorationInstanceRenderOptions> = {
    ln: undefined,
    char: undefined,
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

const multiLinetatusRef: Record<string, undefined | vscode.DecorationInstanceRenderOptions> = {
    ln: undefined,
    lc: undefined,
    char: undefined,
    charOnly: undefined,
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
    nthPosition: 1,
    statusIndex: 1,
    duplicateEntryIdx: undefined,
    baseLine: -1,
    currentLine: -1,
    index: 0,
    duplicateLine: undefined,
    indexList: []
};

const multiCursorCounter: Record<string, number> = {
    nth: 0,
    count: 0,
    ln: 0,
    lc: 0,
    char: 0,
};

const clearMultiCursorState = () => {
    LineSelectionBuffer.splice(0);
    multiCursorState.selections = [];
    multiCursorState.index = 0;
    multiCursorState.statusIndex = 1;
    multiCursorState.duplicateEntryIdx = undefined;
    multiCursorState.baseLine = -1;
    multiCursorState.context.pos = 0;
    multiCursorState.context.editor = {};
    multiCursorCounter.nth = 0;
    multiCursorCounter.count = 0;
    multiCursorCounter.ln = 0;
    multiCursorCounter.lc = 0;
    multiCursorCounter.char = 0;
    multiCursorGroup.list = [];
    multiCursorGroup.idx = 0;
};

const multiCursorGroup = {
    list: [] as any | [][],
    idx: 0
};

const multiCursorPosition = (placeholder: string, position: number): void => {
    if (placeholder === 'nth') {
        multiCursorState.nthPosition = position;
    }
};

const pushMultiCursorOption = (selectionIndex: number, nth: number) => (contentText: string | any, idx: number): void => {

    const ifNth = idx === nth;

    let renderOption = ifNth ? { ...contentText } : contentText;
    if (ifNth) {
        renderOption.after = { ...contentText.after };
    }

    selectionDecorationOption[__0x.multiCursorText][idx].push({
        get range() {
            return multiCursorState.selections[selectionIndex];
        },
        renderOptions: { ...renderOption }
    });
};

/**
 * 
 */
const LineSelectionBuffer: [number, number][] = [];

const checkIfDuplicateLine = (lineNumber: number): number | undefined => {
    let l = LineSelectionBuffer.length;
    while (l--) {
        if (LineSelectionBuffer[l][0] === lineNumber) {
            return l;
        }
    }
    return undefined;
};

const ifOnLastSelection = (selectionIndex: number): boolean => {
    return selectionIndex > 0 && multiCursorState.currentLine === multiCursorState.selections[selectionIndex - 1].end.line;
};

const ifDuplicateIndexIsNotlast = (): boolean => LineSelectionBuffer.length > multiCursorState.duplicateEntryIdx + 1;

const pushCursorIndex = (calibration: number = 0): void => {
    let l = multiCursorGroup.idx + calibration;
    while (l--) {
        multiCursorGroup.list[l][0] += 1;
    }
};

const pushCursorGroup = (): void => {
    multiCursorGroup.idx += 1;
    multiCursorGroup.list.push([0]);
};

const appendNthIndex = (index: number = 0): void => multiCursorState.indexList.push(index);

const prependNthIndex = (index: number = 0): void => multiCursorState.indexList.unshift(index);

const prependNthLastIndex = (calibration: number = 0): void => appendNthIndex(multiCursorState.indexList[multiCursorState.indexList.length - 1] + calibration);

const duplicateEntryStep: Record<number, any[]> = {
    [__0x.recurringLine0]: [appendNthIndex],
    [__0x.recurringLine1]: [pushCursorIndex, pushCursorGroup, () => appendNthIndex(multiCursorState.statusIndex)],
    [__0x.recurringLine2]: [() => appendNthIndex(multiCursorState.statusIndex)],
    [__0x.recurringLine3]: [pushCursorGroup, pushCursorIndex, () => prependNthLastIndex(-1)],
    [__0x.recurringLine4]: [() => appendNthIndex(multiCursorState.statusIndex)],
    [__0x.recurringLine5]: [() => prependNthLastIndex(1), pushCursorIndex,],
    [__0x.recurringLine6]: [pushCursorIndex, () => appendNthIndex(multiCursorState.statusIndex)],
    [__0x.recurringLine7]: [pushCursorIndex, () => appendNthIndex(multiCursorState.statusIndex)],
    [__0x.recurringLine8]: [pushCursorIndex, () => prependNthIndex()],
};

const nonDuplicateEntryStep: Record<number, any[]> = {
    [__0x.nonRecurringLine0]: [() => { multiCursorState.statusIndex = 1; }, () => { multiCursorState.baseLine = multiCursorState.currentLine; }, pushCursorGroup, pushCursorIndex,],
    [__0x.nonRecurringLine1]: [pushCursorIndex,],
};

const duplicateSelectionSignature = (selectionIndex: number): number => {
    return (multiCursorState.currentLine < multiCursorState.baseLine ? __0x.MULTI_CURSOR_SELECTION_SIGNATURE.TO_SHIFT_INDEX : 0)
        + (multiCursorGroup.idx > 0 ? __0x.MULTI_CURSOR_SELECTION_SIGNATURE.INDEX_SHIFTED : 0)
        + (multiCursorState.currentLine === multiCursorState.baseLine ? __0x.MULTI_CURSOR_SELECTION_SIGNATURE.ON_BASELINE : 0)
        + (ifOnLastSelection(selectionIndex) ? __0x.MULTI_CURSOR_SELECTION_SIGNATURE.AS_LAST_SELECTION : 0)
        + (ifDuplicateIndexIsNotlast() ? __0x.MULTI_CURSOR_SELECTION_SIGNATURE.DUPLICATE_LINE_NOT_AS_LAST_SELECTION : 0);
};

const nonDuplicateSelectionSignature = (): number => {
    return ((multiCursorState.currentLine < multiCursorState.baseLine) ? __0x.MULTI_CURSOR_SELECTION_SIGNATURE.TO_SHIFT_INDEX : 0)
        + ((multiCursorGroup.idx > 0) ? __0x.MULTI_CURSOR_SELECTION_SIGNATURE.INDEX_SHIFTED : 0);
};

const fnStep = (fn: any): void => fn();

/**
 * 
 * 
 * @param selectionIndex 
 * @returns 
 */
const multiCursorDecorationOption = (selectionIndex: number): void => {
    multiCursorState.currentLine = multiCursorState.selections[selectionIndex].end.line;

    const nth = multiCursorState.nthPosition;
    const duplicateEntry = checkIfDuplicateLine(multiCursorState.currentLine);

    if (duplicateEntry !== undefined) {
        multiCursorState.duplicateEntryIdx = duplicateEntry;
        multiCursorState.indexList = selectionDecorationOption[__0x.multiCursorText][multiCursorState.nthPosition][multiCursorState.duplicateEntryIdx].renderOptions.after.indexList;
        duplicateEntryStep[duplicateSelectionSignature(selectionIndex)].forEach(fnStep);
        return;
    } else {
        nonDuplicateEntryStep[nonDuplicateSelectionSignature()].forEach(fnStep);
    }

    LineSelectionBuffer.push([multiCursorState.selections[selectionIndex].end.line, selectionIndex]);

    const nthRenderInstanceOption = selectionContentText[__0x.multiCursorText].contentText[nth];
    nthRenderInstanceOption.after = {
        ...selectionContentText[__0x.multiCursorText].contentText[nth].after,
        groupIndex: parseInt(multiCursorGroup.idx.toString()),
        baseIndex: multiCursorGroup.list[multiCursorGroup.idx],
        indexList: [multiCursorState.statusIndex],
        get contentText() {
            return this.indexList.map(i => i + this.baseIndex[0]).join(',');
        },
    };

    selectionContentText[__0x.multiCursorText]
        .contentText
        .forEach(
            pushMultiCursorOption(
                selectionIndex,
                nth));
};

const setRangerPointer = (refObject: vscode.Range[]) => (selection: vscode.Selection, idx: number): vscode.Selection => refObject[idx] = selection;

const renderMultiCursor = (setDecorations: vscode.TextEditor['setDecorations'], decorationOption: D.Selection.Tp.MultiCursorRenderOption) => (decorationType: vscode.TextEditorDecorationType, idx: number): void => setDecorations(decorationType, decorationOption[idx]);

const increaseIndex = (): void => {
    multiCursorState.index++;
    multiCursorState.statusIndex++;
};

const addMultiCursorEntry = (selection: vscode.Selection): void => {
    multiCursorState.selections.push(selection);
    selectionStatusFunctionChain[__0x.multiCursorText].forEach(functionChainAccumulate(multiCursorStatusRef, multiCursorState.context));
    multiCursorDecorationOption(multiCursorState.index);
    increaseIndex();
};

const multiCursorSelection = (editor: vscode.TextEditor, previousKey: number[]): void => {

    __0x.multiCursor !== previousKey[0] && (() => {
        clearBufferOfhexkey(editor.setDecorations, previousKey);
        clearMultiCursorState();
        multiCursorGroup.list.push([0]);
        multiCursorState.context.editor = editor;
        multiCursorState.context.pos = multiCursorState.index;
        addMultiCursorEntry(editor.selections[0]);
        multiCursorState.baseLine = editor.selections[0].end.line;
    })();

    /**
     * todo: need new case when selection is not a singleLine
     */
    addMultiCursorEntry(editor.selections[multiCursorState.index]);
    multiCursorState.selections.forEach(setRangerPointer(rangePointerTable[__0x.multiCursorText] as vscode.Range[]));
    selectionTextBuffer[__0x.multiCursorText].forEach(renderMultiCursor(editor.setDecorations, selectionDecorationOption[__0x.multiCursorText]));

};

const clearSelectionTextBuffer = (editor: vscode.TextEditor): void => {
    SELECTION_KIND_LIST?.forEach(hexKey => clearBufferOfhexkey(editor.setDecorations, [hexKey]));
};

const clearDisposeBuffer = (setDecorations: vscode.TextEditor["setDecorations"]) => (buffer: vscode.TextEditorDecorationType): void => {
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
    functionOf: D.Status.Tp.ContentTextState,
    textOf: D.Status.Intf.StatusContentText,
    infoOf: D.Status.Intf.IndentInfo
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
    syncrefernceTable,
    multiCursorPosition
};