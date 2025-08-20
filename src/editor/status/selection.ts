import * as vscode from 'vscode';
import * as __0x from '../../constant/shared/numeric';
import * as regex from '../../collection/regex';
import { INDENT_INFO, SELECTION_CONTENT_TEXT, SELECTION_KIND_LIST } from '../../constant/shared/object';
import { SELECTION_CONTENT_TEXT_CONFIG_KEY } from '../../constant/config/enum';
import { DECORATION_OPTION_CONFIG } from '../../constant/config/object';
import { createLineRange, createLineEndSelection, blankRange, sortBasedEndLine, hasEmptyRange, ifRangesNeedSort, rangeToCursor } from '../range';
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
    [__0x.multiCursorText]: [],
    [__0x.multiCursorEdit]: []
};

/**
 * object that will store render options 
 */
const selectionDecorationOption: Record<number, any[] | [][] | [D.Decoration.Intf.RenderOption][]> = {
    [__0x.cursorOnlyText]: [],
    [__0x.singleLineText]: [],
    [__0x.multiLineText]: [],
    [__0x.multiCursorText]: [],
    [__0x.multiCursorEdit]: []
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

const columnFromSelection = (editor: vscode.TextEditor, idx: number = 0, delta = 0): number | string => {
    const col = editor.selections[idx].active.character + delta;
    const end = editor.document.lineAt(editor.selections[idx].active.line).text.length + delta;
    return (col === end ? col : col + '/' + end);
};

/**
 * mutli-cursor selection function collections
 */
const multiCursorFn = {
    // nth: ({ idx }) => idx,
    col: ({ editor, idx }) => columnFromSelection(editor, idx),
    zCol: ({ editor, idx }) => columnFromSelection(editor, idx, 1),
    count: ({ editor }: { editor: vscode.TextEditor }) => editor.selections.length,
    ln: ({ editor, idx }) => editor.selections[idx].end.line + 1,
    lc: ({ editor, pos }: { editor: vscode.TextEditor, pos: number }) => {
        return editor.selection.isSingleLine ? editor.selections.length : editor.selections.length * (editor.selections[pos].end.line - editor.selections[pos].start.line + 1);
    },
    char: ({ editor, pos }: { editor: vscode.TextEditor, pos: number }) => {
        //  char
        if (editor.selection.isSingleLine) {
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
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_EDIT]: { ...columns, ...multiCursorOf },
};

const cols: Record<string, RegExp> = {
    col: regex.column,
    zCol: regex.zeroColumn,
};

const line: Record<string, RegExp> = {
    char: regex.character,
    ln: regex.lineNumber
};

const lineExtra: Record<string, RegExp> = {
    lc: regex.lineCount,
    charOnly: regex.characterOnly
};

const cursor: Record<string, RegExp> = {
    nth: regex.nth,
    count: regex.selectionCount,
};

const SelectionTextRegex: Record<string, Record<string, RegExp>> = {
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: { ...cols, ...line, },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: { ...line },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: { ...line, ...lineExtra },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: { ...line, ...lineExtra },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: { ...cursor, ...line, ...lineExtra },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_EDIT]: { ...cursor, ...cols, ...line },
};

const composeRenderOption = (hexKey: any, contentText: any): D.Decoration.Intf.RenderOption => {
    return {
        get range() {
            return rangePointerTable[hexKey];
        },
        renderOptions: contentText
    };
};

const setDeocorationOption = (hexKey: number, renderOptionHex?: number[]): void => {
    selectionTextBuffer[hexKey].forEach((option, idx) => {
        const renderOption: any = [];
        renderOptionHex?.forEach(hex => {
            renderOption.push(composeRenderOption(hex, selectionContentText[hex].contentText[idx]));
        });
        selectionDecorationOption[hexKey].push(renderOption);
    });
};

// 유니온 타입 필요함
const selectionStatusFunctionChain: Record<number, any[]> = {
    [__0x.cursorOnlyText]: [],
    [__0x.singleLineText]: [],
    [__0x.multiLineText]: [],
    [__0x.multiCursorText]: [],
    [__0x.multiCursorEdit]: []
};

const selectionStatusDecorationOption = {
    [__0x.cursorOnlyText]: {
        renderOptionHex: [__0x.cursorOnlyText],
        fnObject: { ...lineNumber, ...columns }
    },
    [__0x.singleLineText]: {
        renderOptionHex: [__0x.singleLineText],
        fnObject: { ...lineNumber, ...characterCount }
    },
    [__0x.multiLineText]: {
        renderOptionHex: [__0x.multiLineAnchorText, __0x.multiLineCursorText],
        fnObject: { ...lineNumber, ...multiLineFn }
    },
    [__0x.multiCursorText]: {
        renderOptionHex: [__0x.multiCursorText],
        fnObject: { ...multiCursorFn }
    },
    [__0x.multiCursorEdit]: {
        renderOptionHex: [], // __0x.multiCursorEdit
        fnObject: { ...multiCursorFn }
    }
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

    if (selectionDecorationOption[hexKey].length > 0) {
        selectionDecorationOption[hexKey] = [];
    }

    const option = selectionStatusDecorationOption[hexKey];
    setDeocorationOption(hexKey, option.renderOptionHex);
    buildFunctionChain(hexKey, placeholder, option.fnObject);
};

/**
 * reference replication for the selection status
 * 
 * @param placehoder 
 * @param object 
 */
const syncRefernceTable = (placehoder: string, hexKey: number, refObj: object): void => {
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
        case __0x.multiCursorText:
            multiCursorTextRef[placehoder] = refObj;
            break;
        case __0x.multiCursorEdit:
            multiCursorEditRef[placehoder] = refObj;
            break;
        default: break;
    }
};

const contentTextFuncBuffered: D.Selection.Tp.BufferedFuncSignature = (setDecorations, buffer) => (renderOption, idx) => {
    setDecorations(buffer[idx], renderOption);
};

const functionChain: D.Selection.Tp.FunctionChain = (statusRef, args) => ([fnName, fnChain]) => {
    statusRef[fnName].contentText = fnChain(args).toString();
};

const functionChainAccumulater: D.Selection.Tp.FunctionChain = (statusRef, args) => ([fnName, fnChain]) => {
    if (fnName === 'char') {
        multiCursorAccumulated[fnName] += fnChain(args);
        statusRef[fnName].contentText = multiCursorAccumulated[fnName].toString();
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
const cursorOnlySelection: D.Editor.Tp.RenderGroupFuncSign = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]): void => {
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
const singleLineSelection: D.Editor.Tp.RenderGroupFuncSign = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]): void => {
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

const multilineSelection: D.Editor.Tp.RenderGroupFuncSign = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]): void => {
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

const multiCursorTextRef: Record<string, undefined | vscode.DecorationInstanceRenderOptions> = {
    nth: undefined,
    count: undefined,
    ln: undefined,
    lc: undefined,
    char: undefined,
};

const multiCursorEditRef: Record<string, undefined | vscode.DecorationInstanceRenderOptions> = {
    nth: undefined,
    count: undefined,
    ln: undefined,
    col: undefined,
    zCol: undefined,
};

const multiCursorState: Record<string, any | number | boolean | vscode.Selection[]> = {
    context: {
        editor: {} as any | vscode.TextEditor,
        pos: 0,
        char: 0,
        idx: 0,
    },
    selections: [] as vscode.Selection[],
    statusIndex: 1,
    duplicateEntryIdx: undefined,
    baseLine: -1,
    currentLine: -1,
    index: 1,
    indexList: [],
    lastSelectionCount: 0,
};


const multiCursorAccumulated: Record<string, number> = {
    nth: 0,
    count: 0,
    ln: 0,
    lc: 0,
    char: 0,
};

const clearMultiCursorState = (): void => {
    LineSelectionBuffer.splice(0);
    multiCursorState.selections = [];
    multiCursorState.index = 1;
    multiCursorState.statusIndex = 1;
    multiCursorState.duplicateEntryIdx = undefined;
    multiCursorState.baseLine = -1;
    multiCursorState.context.pos = 0;
    multiCursorState.context.editor = {};
    multiCursorAccumulated.nth = 0;
    multiCursorAccumulated.count = 0;
    multiCursorAccumulated.ln = 0;
    multiCursorAccumulated.lc = 0;
    multiCursorAccumulated.char = 0;
    multiCursorGroup.list = [];
    multiCursorGroup.idx = 0;
    multiCursorFlag.lastCount = 0;
};


const multiCursorTextPlaceholder: Record<string, null | number> = {
    nth: null,
    ln: null
};

const multiCursorEditPlaceholder: Record<string, null | number> = {
    nth: null,
    ln: null,
    col: null,
    zCol: null,
};

const multiCursorGroup = {
    list: [] as any | [][],
    idx: 0
};

const multiCursorTextPosition = (placeholder: string, position: number): void => {
    // nth | ln
    if (Object.hasOwn(multiCursorTextPlaceholder, placeholder)) {
        multiCursorTextPlaceholder[placeholder] = position;
    }
};

const multiCursorEditPosition = (placeholder: string, position: number): void => {
    // nth | ln | col | zCol
    if (Object.hasOwn(multiCursorEditPlaceholder, placeholder)) {
        multiCursorEditPlaceholder[placeholder] = position;
    }
};

const pushMultiCursorOption = (hexKey: number, selectionIndex: number, atomic: any[]) => (contentText: string | any, idx: number): void => {
    const found = atomic.find((e) => e.toString() === idx.toString()) !== undefined;
    selectionDecorationOption[hexKey][idx].push({
        get range() {
            return multiCursorState.selections[selectionIndex];
        },
        renderOptions: found ? { ...contentText } : contentText
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

const appendNthIndex: D.Selection.Tp.IndexFnSignature = (index = 0): void => multiCursorState.indexList.push(index);

const prependNthIndex: D.Selection.Tp.IndexFnSignature = (index = 0): void => multiCursorState.indexList.unshift(index);

const prependNthLastIndex: D.Selection.Tp.IndexFnSignature = (calibration = 0): void => appendNthIndex(multiCursorState.indexList[multiCursorState.indexList.length - 1] + calibration);

const duplicateEntryStep: Record<number, any[]> = {
    [__0x.recurringLine0]: [appendNthIndex],
    [__0x.recurringLine1]: [pushCursorIndex, pushCursorGroup, () => appendNthIndex(multiCursorState.statusIndex)],
    [__0x.recurringLine2]: [() => appendNthIndex(multiCursorState.statusIndex)],
    [__0x.recurringLine3]: [pushCursorGroup, pushCursorIndex, () => prependNthLastIndex(-1)],
    [__0x.recurringLine4]: [() => appendNthIndex(multiCursorState.statusIndex)],
    [__0x.recurringLine5]: [() => prependNthLastIndex(1), pushCursorIndex,],
    [__0x.recurringLine6]: [pushCursorIndex, () => appendNthIndex(multiCursorState.statusIndex)],
    [__0x.recurringLine7]: [pushCursorIndex, () => appendNthIndex(multiCursorState.statusIndex)],
    [__0x.recurringLine8]: [pushCursorIndex, prependNthIndex],
    [__0x.recurringLine9]: [pushCursorGroup, pushCursorIndex, prependNthIndex, () => { ; multiCursorState.statusIndex = 1; multiCursorState.baseLine = multiCursorState.currentLine; }]
};

const entryStep: Record<number, any[]> = {
    [0]: [],
    [__0x.nonRecurringLine0]: [() => { multiCursorState.statusIndex = 1; }, () => { multiCursorState.baseLine = multiCursorState.currentLine; }, pushCursorGroup, pushCursorIndex],
    [__0x.nonRecurringLine1]: [pushCursorIndex,],
};

const duplicateLineSignature = (selectionIndex: number): number => {
    return (multiCursorState.currentLine < multiCursorState.baseLine ? __0x.MULTI_CURSOR_SELECTION_FLAG.TO_SHIFT_INDEX : 0)
        + (multiCursorGroup.idx > 0 ? __0x.MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED : 0)
        + (multiCursorState.currentLine === multiCursorState.baseLine ? __0x.MULTI_CURSOR_SELECTION_FLAG.ON_BASELINE : 0)
        + (ifOnLastSelection(selectionIndex) ? __0x.MULTI_CURSOR_SELECTION_FLAG.AS_LAST_SELECTION : 0)
        + (ifDuplicateIndexIsNotlast() ? __0x.MULTI_CURSOR_SELECTION_FLAG.DUPLICATE_LINE_NOT_AS_LAST_SELECTION : 0);
};

const nonDuplicateLineSignature = (): number => {
    return ((multiCursorState.currentLine < multiCursorState.baseLine) ? __0x.MULTI_CURSOR_SELECTION_FLAG.TO_SHIFT_INDEX : 0)
        + ((multiCursorGroup.idx > 0) ? __0x.MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED : 0);
};

const fnStep = (fn: D.Selection.Tp.IndexFnSignature): void => fn();

/**
 * 
 * 
 * @param selectionIndex 
 * @returns 
 */
const multiCursorDecorationOption = (hexKey: number, selectionIndex: number, placehoder, renderOption): void => {
    const duplicateEntry = checkIfDuplicateLine(multiCursorState.context.editor.selections[multiCursorState.index].end.line);
    if (duplicateEntry !== undefined) {
        multiCursorState.duplicateEntryIdx = duplicateEntry;
        multiCursorState.indexList = selectionDecorationOption[hexKey][placehoder['nth']][multiCursorState.duplicateEntryIdx].renderOptions.after.indexList;
        duplicateEntryStep[duplicateLineSignature(selectionIndex)].forEach(fnStep);
        return;
    }

    entryStep[nonDuplicateLineSignature()].forEach(fnStep);
    LineSelectionBuffer.push([multiCursorState.selections[selectionIndex].end.line, selectionIndex]);
    renderOption.forEach((fn) => fn[0](hexKey, fn[1]));
    selectionContentText[hexKey].contentText.forEach(pushMultiCursorOption(hexKey, selectionIndex, [placehoder['nth']]));
};

const nthRenderOption = (hexKey: number, cidx: number) => {
    selectionContentText[hexKey].contentText[cidx].after = {
        ...selectionContentText[hexKey].contentText[cidx].after,
        groupIndex: parseInt(multiCursorGroup.idx.toString()),
        baseIndex: multiCursorGroup.list[multiCursorGroup.idx],
        indexList: [multiCursorState.statusIndex],
        get contentText() {
            return this.indexList.map(i => i + this.baseIndex[0]).join(',');
        },
    };
};

const colRenderOption = (hexKey: number, cidx: number) => {
    selectionContentText[hexKey].contentText[cidx].after = {
        ...selectionContentText[hexKey].contentText[cidx].after,
        position: [],
        get contentText() {
            return this.position.join(',');
        },
    };
};

const setRangePointer = (refObject: vscode.Range[]) => (selection: vscode.Selection, idx: number): vscode.Selection => refObject[idx] = selection;

const renderMultiCursor = (setDecorations: D.Editor.Tp.RenderOverlay, decorationOption: D.Selection.Tp.MultiCursorRenderOption) => (decorationType: vscode.TextEditorDecorationType, idx: number): void => setDecorations(decorationType, decorationOption[idx]);

const increaseIndex = (): void => {
    multiCursorState.index++;
    multiCursorState.statusIndex++;
};

const prepareMultiCursor = (editor: vscode.TextEditor, baseLine: number, index: number = 0): void => {
    multiCursorState.index = index;
    multiCursorGroup.list.push([0]);
    multiCursorState.context.editor = editor;
    multiCursorState.context.pos = multiCursorState.index;
    multiCursorState.baseLine = baseLine;
};

const renderMultiCursorText = () => {

};

const addMultiCursorSelection = (selection: vscode.Selection): void => {

    multiCursorState.selections.push(selection);
    multiCursorState.currentLine = multiCursorState.selections[multiCursorState.index].end.line;
    selectionStatusFunctionChain[__0x.multiCursorText].forEach(functionChainAccumulater(multiCursorTextRef, multiCursorState.context));
    multiCursorDecorationOption(
        __0x.multiCursorText,
        multiCursorState.index,
        multiCursorTextPlaceholder,
        [[nthRenderOption, multiCursorTextPlaceholder.nth]]
    );
    increaseIndex();
};

/**
 * col 하고 zCol 두개는 따로 함수로 뺴야겟다 
 * 이건 contentText 스타일도 따로 배열로 관리해야겟다 
 * 같은 라인에 커서가 하나 이상일때 그래서 배열로 ([0, 1...]/20)?, nth 자체는 선택영역과 같은 배열 형태로 
 * 
 * multiCursorFn 에서 바인딩 새로 추가하고 editor 받고 index 받자.
 * 애초에 editor.selections 자체를 정렬한뒤 렌더링 함수를 호출하면된다 
 * 이게 하나씩 쌓아가는 방식이 아니니까 상관없다
 * 
 * 이 기능을 완성하고 나면 두개를 함쳐서 코드 스플릿과 코드 압축 그리고 스트림라이닝 셋다 해야한다 
 * 
 * 지금 이미 이 모듈이 너무 커서 따로 확장모듈로 코드를 좀 뺴야 읽을만 한거같다 
 * 그게 아니면 스크롤에만 한세월이다 
 * 
 * 값이 같은 값을 가지는 참조형 contentText 와 복사형 contentText 두개가 필요하다 
 * 
 * @param editor 
 */
const addMultiCursorEdit = (editor: vscode.TextEditor) => {
    multiCursorState.baseLine = 0;
    multiCursorState.selections = editor.selections;
    multiCursorState.context.editor = editor;

    const renderOptionList: any[] = [];

    if (multiCursorEditPlaceholder.nth) {
        renderOptionList.push([nthRenderOption, multiCursorEditPlaceholder.nth]);
    }

    if (multiCursorEditPlaceholder.col) {
        renderOptionList.push([colRenderOption, multiCursorEditPlaceholder.col]);
    }

    if (multiCursorEditPlaceholder.zCol) {
        renderOptionList.push([colRenderOption, multiCursorEditPlaceholder.zCol]);
    }

    multiCursorState.selections.forEach((s, idx) => {
        multiCursorState.currentLine = s.end.line;
        multiCursorState.currentLine = multiCursorState.selections[idx].end.line;
        multiCursorState.context.idx = idx;
        selectionStatusFunctionChain[__0x.multiCursorEdit].forEach(functionChainAccumulater(multiCursorEditRef, multiCursorState.context));
        multiCursorDecorationOption(
            __0x.multiCursorEdit,
            idx,
            multiCursorEditPlaceholder,
            renderOptionList);
        increaseIndex();
    });
};

const multiCursorFlag = {
    lastCount: 0 as number,
    mode: __0x.multiCursor,
    all: [__0x.multiCursor],
    text: [__0x.multiCursorText],
    edit: [__0x.multiCursorEdit],
};

const renderMultiCursorWrapper = (multiCursorKind: D.Numeric.Key.Hex, setDecorations: D.Editor.Tp.RenderOverlay,): void =>
    selectionTextBuffer[multiCursorKind]
        .forEach(
            renderMultiCursor(
                setDecorations,
                selectionDecorationOption[multiCursorKind]));

const nextOccurrence = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]): void => {
    console.log('nextOccurrence');

    if (__0x.multiCursor !== previousKey[0]) {
        clearBufferOfhexkey(editor.setDecorations, previousKey);
        clearMultiCursorState();
        prepareMultiCursor(editor, 0);
        addMultiCursorSelection(editor.selection);
    }

    addMultiCursorSelection(editor.selections[multiCursorState.index]);
    multiCursorState.selections.forEach(setRangePointer(rangePointerTable[__0x.multiCursorText] as vscode.Range[]));
    renderMultiCursorWrapper(__0x.multiCursorText, editor.setDecorations);
};

const allOccurrence = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]): void => {
    clearBufferOfhexkey(editor.setDecorations, previousKey);
    clearMultiCursorState();
    prepareMultiCursor(editor, 0);
    editor.selections.forEach(addMultiCursorSelection);
    multiCursorState.selections.forEach(setRangePointer(rangePointerTable[__0x.multiCursorText] as vscode.Range[]));
    renderMultiCursorWrapper(__0x.multiCursorText, editor.setDecorations);
};

const clearBufferWrapper = (setDecorations: D.Editor.Tp.RenderOverlay) => (key: D.Numeric.Key.Hex) => clearBufferOfhexkey(setDecorations, [key]);

const cursorOnEndOfLines = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]): void => {

    if (multiCursorFlag.mode !== __0x.multiCursorEdit) {
        clearBufferOfhexkey(editor.setDecorations, previousKey);
        isSelectionNeedSort(editor);
    } else {
        [previousKey[0], multiCursorFlag.text[0]].forEach(clearBufferWrapper(editor.setDecorations));
    }

    clearMultiCursorState();
    prepareMultiCursor(editor, editor.selection.end.line);
    addMultiCursorEdit(editor);
    renderMultiCursorWrapper(__0x.multiCursorEdit, editor.setDecorations);
};

const addCursor = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]): void => {
    if (multiCursorFlag.mode !== __0x.multiCursorEdit) {
        clearBufferOfhexkey(editor.setDecorations, previousKey);
        isSelectionNeedSort(editor);
    } else {
        [previousKey[0], multiCursorFlag.text[0]].forEach(clearBufferWrapper(editor.setDecorations));
    }

    clearMultiCursorState();
    prepareMultiCursor(editor, editor.selection.end.line);
    addMultiCursorEdit(editor);
    renderMultiCursorWrapper(__0x.multiCursorEdit, editor.setDecorations);
};

const emptySelections = (editor: vscode.TextEditor): vscode.Selection[] =>
    [...editor.selections].map(rangeToCursor);

const sortSelection = (editor: vscode.TextEditor): vscode.Selection[] =>
    [...editor.selections].sort(sortBasedEndLine);

const isSelectionNeedSort = (editor: vscode.TextEditor): false | vscode.Selection[] =>
    editor.selections.every(ifRangesNeedSort) &&
    overrideSelections(editor, sortSelection);

const isNewCursorNeedSort = (editor: vscode.TextEditor): false | vscode.Selection[] =>
    multiCursorState.baseLine > editor.selections[multiCursorFlag.lastCount - 1].end.line &&
    overrideSelections(editor, sortSelection);

const isSelectionEmpty = (editor: vscode.TextEditor): false | vscode.Selection[] =>
    hasEmptyRange(editor.selections) &&
    overrideSelections(editor, emptySelections);

const overrideSelections = (editor: vscode.TextEditor, mutation: any): vscode.Selection[] =>
    editor.selections = mutation(editor);


const multiCursorSelection: D.Editor.Tp.RenderGroupFuncSign = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]): void => {
    // if inital selection is not empty, meaning, searching occurences
    if (!editor.selection.isEmpty) {
        // if selection count increamented more than 1, meaning, it is not next occurences
        if (multiCursorFlag.lastCount + 1 < editor.selections.length) {
            allOccurrence(editor, previousKey);
        } else {
            nextOccurrence(editor, previousKey);
        }
        multiCursorFlag.mode = __0x.multiCursorText;
    } else {
        // inital selection is empty, and any cursor after inital selection should also be cursor (empty selections)
        if (multiCursorFlag.lastCount + 1 < editor.selections.length) {
            // adding cursers at the end of selected lines
            isSelectionEmpty(editor);
            cursorOnEndOfLines(editor, previousKey);
        } else if (multiCursorFlag.lastCount === editor.selections.length && multiCursorFlag.lastCount !== 0) {
            // cursor is moving/editing selected lines
            // should only change the overlays
            // @FIX
        } else {
            // @FIX
            isNewCursorNeedSort(editor);
            addCursor(editor, previousKey);
        }
        multiCursorFlag.mode = __0x.multiCursorEdit;
    }
    multiCursorFlag.lastCount = editor.selections.length;
};

const clearSelectionTextBuffer = (editor: vscode.TextEditor): void => {
    SELECTION_KIND_LIST?.forEach(hexKey => clearBufferOfhexkey(editor.setDecorations, [hexKey]));
};

const clearDisposeBuffer = (setDecorations: vscode.TextEditor["setDecorations"]) => (buffer: vscode.TextEditorDecorationType): void => {
    setDecorations(buffer, blankRange);
    buffer.dispose();
};

const clearMultiCursor = (hexKey: D.Numeric.Key.Hex, setDecorations: D.Editor.Tp.RenderOverlay) => {
    selectionTextBuffer[hexKey].forEach(resetDecoration(setDecorations));
    let l = selectionDecorationOption[hexKey].length;
    while (l--) {
        selectionDecorationOption[hexKey][l] = [];
    }
};

const multiCursorFlush = {
    [__0x.multiCursor]: (setDecorations: D.Editor.Tp.RenderOverlay) => {
        clearMultiCursorState();
        multiCursorFlush[__0x.multiCursorText](setDecorations);
        multiCursorFlush[__0x.multiCursorEdit](setDecorations);

    },
    [__0x.multiCursorText]: (setDecorations: D.Editor.Tp.RenderOverlay) => clearMultiCursor(__0x.multiCursorText, setDecorations),
    [__0x.multiCursorEdit]: (setDecorations: D.Editor.Tp.RenderOverlay) => clearMultiCursor(__0x.multiCursorEdit, setDecorations),
};

const clearBufferOfhexkey = (setDecorations: D.Editor.Tp.RenderOverlay, previousKey: D.Numeric.Key.Hex[]): void => {
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
            multiCursorFlush[__0x.multiCursor](setDecorations);
            break;
        case __0x.multiCursorText:
            multiCursorFlush[__0x.multiCursorText](setDecorations);
            break;
        case __0x.multiCursorEdit:
            multiCursorFlush[__0x.multiCursorEdit](setDecorations);
            break;
        default:
            break;
    }
};

const bindStatusContentTextState = (): D.Selection.Intf.BindContentTextState => {
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
    syncRefernceTable,
    multiCursorTextPosition,
    multiCursorEditPosition,
    SelectionTextRegex
};
