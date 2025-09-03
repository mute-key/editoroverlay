import * as D from '../../type/type.d';

import * as vscode from 'vscode';
import * as __0x from '../../constant/shared/numeric';
import * as regex from '../../collection/regex';
import { INDENT_INFO, SELECTION_CONTENT_TEXT, SELECTION_KIND_LIST } from '../../constant/shared/object';
import { SELECTION_CONTENT_TEXT_CONFIG_KEY } from '../../constant/config/enum';
import { DECORATION_OPTION_CONFIG } from '../../constant/config/object';
import { createLineRange, blankRange } from '../range';
import { resetDecoration } from '../editor';
import { colRenderOptionOverride, duplicateEntryStep, entryStep, firstSelectionAsBaseLine, fnStepDispatchBinder, ifOnLastSelection, increaseIndex, lastSelectionAsBaseLine, normalizeToEmptySelections, nthRenderOptionOverride, pushNthIndexGroup, sortSelectionsIfNeeded, stepFunctionSignature } from './selection/stateHandlers';

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
const selectionTextBuffer: Record<D.Numeric.Key.Hex, vscode.TextEditorDecorationType[]> = {
    [__0x.cursorOnlyText]: [],
    [__0x.singleLineText]: [],
    [__0x.multiLineText]: [],
    [__0x.multiCursorText]: [],
    [__0x.multiCursorEdit]: []
};

/**
 * object that will store render options 
 */
const selectionDecorationOption: Record<D.Numeric.Key.Hex, any[] | [][] | [D.Decoration.Intf.RenderOption][]> = {
    [__0x.cursorOnlyText]: [],
    [__0x.singleLineText]: [],
    [__0x.multiLineText]: [],
    [__0x.multiCursorText]: [],
    [__0x.multiCursorEdit]: []
};

const rangePointerTable: Record<D.Numeric.Key.Hex, undefined | [] | vscode.Range | vscode.Range[]> = {
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
    col: ({ editor, idx }) => columnFromSelection(editor, idx, 1),
    zCol: ({ editor, idx }) => columnFromSelection(editor, idx),
    count: ({ editor }: { editor: vscode.TextEditor }) => editor.selections.length,
    ln: ({ editor, idx }) => editor.selections[idx].end.line + 1,
    lc: ({ editor, pos }: { editor: vscode.TextEditor, pos: number }) => {
        return editor.selection.isSingleLine ? editor.selections.length : editor.selections.length * (editor.selections[pos].end.line - editor.selections[pos].start.line + 1);
    },
    char: ({ editor, pos }: { editor: vscode.TextEditor, pos: number }) => {
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

const composeRenderOption = (cursorType: D.Numeric.Key.Hex, contentText: any): D.Decoration.Intf.RenderOption => {
    return {
        get range() {
            return rangePointerTable[cursorType];
        },
        renderOptions: contentText
    };
};

const setDeocorationOption = (cursorType: D.Numeric.Key.Hex, renderOptionHex?: D.Numeric.Key.Hex[]): void => {
    selectionTextBuffer[cursorType].forEach((option, idx) => {
        const renderOption: any = [];
        renderOptionHex?.forEach(hex => {
            renderOption.push(composeRenderOption(hex, selectionContentText[hex].contentText[idx]));
        });
        selectionDecorationOption[cursorType].push(renderOption);
    });
};

const selectionStatusFunctionChain: Record<D.Numeric.Key.Hex, any[]> = {
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

const buildFunctionChain = (cursorType: D.Numeric.Key.Hex, placeholder: any[], statusFunciton: any) => {
    placeholder.forEach((position) => {
        if (Object.hasOwn(statusFunciton, position[1])) {
            selectionStatusFunctionChain[cursorType].push([position[1], statusFunciton[position[1]]]);
        }
    });
};

/**
 * prepare selection status block buffer with pre-created vscode.decorationType(s)
 * so they do not need to be recreated on refresh. creating decorationType is costly, 
 * and it put some overhead by regenerating it's unique key as well as 
 * to vscode decoration registry.
 * 
 * @param cursorType 
 * @param size 
 * @returns 
 */
const setSelectionTextbuffer = (cursorType: D.Numeric.Key.Hex, length: number, placeholder: any[]): void => {

    decorationOptionBuffer.isWholeLine = true;
    decorationOptionBuffer.rangeBehavior = vscode.DecorationRangeBehavior.ClosedClosed;

    let lengthBuffer = length;
    while (lengthBuffer--) {
        const decorationType = vscode.window.createTextEditorDecorationType(decorationOptionBuffer);
        selectionTextBuffer[cursorType].push(decorationType);
    }

    if (selectionDecorationOption[cursorType].length > 0) {
        selectionDecorationOption[cursorType] = [];
    }

    const option = selectionStatusDecorationOption[cursorType];
    setDeocorationOption(cursorType, option.renderOptionHex);
    buildFunctionChain(cursorType, placeholder, option.fnObject);
};

/**
 * reference replication for the selection status
 * 
 * @param placeholder 
 * @param object 
 */
const syncRefernceTable = (placeholder: string, cursorType: D.Numeric.Key.Hex, refObj: object): void => {
    switch (cursorType) {
        case __0x.cursorOnly:
            cursorOnlyStatusRef[placeholder] = refObj;
            break;
        case __0x.singleLine:
            singleLinetatusRef[placeholder] = refObj;
            break;
        case __0x.multiLine:
            multiLinetatusRef[placeholder] = refObj;
            break;
        case __0x.multiCursorText:
            multiCursorTextRef[placeholder] = refObj;
            break;
        case __0x.multiCursorEdit:
            multiCursorEditRef[placeholder] = refObj;
            break;
        default: break;
    }
};

const contentTextFuncBuffered: D.Selection.Tp.BufferedFuncSignature = (setDecorations, buffer) => (renderOption, idx): void => {
    return setDecorations(buffer[idx], renderOption);
};

const functionChain: D.Selection.Tp.FunctionChain = (args, statusRef) => ([fnName, fnChain]) => {
    statusRef[fnName].contentText = fnChain(args).toString();
};

const cursorOnlyStatusRef: Record<string, any | vscode.DecorationInstanceRenderOptions> = {
    ln: undefined,
    col: undefined,
    zCol: undefined,
};


const setMultiCursorTextPosition = (placeholder: string, position: number): void => {
    // nth | ln
    if (Object.hasOwn(multiCursorTextKeyPosition, placeholder)) {
        multiCursorTextKeyPosition[placeholder] = position;
    }
};

const setMultiCursorEditPosition = (placeholder: string, position: number): void => {
    // nth | ln | col | zCol
    if (Object.hasOwn(multiCursorEditKeyPosition, placeholder)) {
        multiCursorEditKeyPosition[placeholder] = position;
    }
};

const setMultiCursorContext = (): void => {
    multiCursorTextPosition.push(...Object.values(multiCursorTextKeyPosition).filter(pos => pos !== null));
    textContext.contentText = selectionContentText[__0x.multiCursorText].contentText;

    if (multiCursorTextKeyPosition.nth) {
        nthRenderOptionOverride(selectionContentText[__0x.multiCursorText].contentText[multiCursorTextKeyPosition.nth], textContext);
    }

    multiCursorEditPosition.push(...Object.values(multiCursorEditKeyPosition).filter(pos => pos !== null));
    editContext.contentText = selectionContentText[__0x.multiCursorEdit].contentText;

    if (multiCursorEditKeyPosition.nth) {
        nthRenderOptionOverride(selectionContentText[__0x.multiCursorEdit].contentText[multiCursorEditKeyPosition.nth], editContext);
    }

    if (multiCursorEditKeyPosition.col) {
        colRenderOptionOverride(selectionContentText[__0x.multiCursorEdit].contentText[multiCursorEditKeyPosition.col], editContext);
    }

    if (multiCursorEditKeyPosition.zCol) {
        colRenderOptionOverride(selectionContentText[__0x.multiCursorEdit].contentText[multiCursorEditKeyPosition.zCol], editContext);
    }
};


//::==============================================================================
//:: render-handling focused functions
//::==============================================================================

const clearBufferOfhexkey = (previousCursor: D.Numeric.Key.Hex[], setDecorations: D.Editor.Tp.RenderOverlay,): void => {
    switch (previousCursor[0]) {
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
            resetMultiCursorCounters();
            clearMultiCursor(__0x.multiCursorText, setDecorations);
            clearMultiCursor(__0x.multiCursorEdit, setDecorations);
            break;
        case __0x.multiCursorText:
            clearMultiCursor(__0x.multiCursorText, setDecorations);
            break;
        case __0x.multiCursorEdit:
            clearMultiCursor(__0x.multiCursorEdit, setDecorations);
            break;
        default:
            break;
    }
};

/**
 * render function implementation for cursorOnly selection status block
 * 
 * @param editor 
 * @param previousCursor 
 */
const cursorOnlySelection: D.Editor.Tp.RenderGroupFuncSign = (editor: vscode.TextEditor, previousCursor: never | D.Numeric.Key.Hex[]): void => {
    clearSelectionTextBuffer(editor);

    selectionStatusFunctionChain[__0x.cursorOnlyText].forEach(functionChain({ editor }, cursorOnlyStatusRef));

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
 * @param previousCursor 
 */
const singleLineSelection: D.Editor.Tp.RenderGroupFuncSign = (editor: vscode.TextEditor, previousCursor: D.Numeric.Key.Hex[]): void => {
    clearBufferOfhexkey(previousCursor, editor.setDecorations);

    selectionStatusFunctionChain[__0x.singleLineText].forEach(functionChain({ editor }, singleLinetatusRef));

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

const multilineSelection: D.Editor.Tp.RenderGroupFuncSign = (editor: vscode.TextEditor, previousCursor: D.Numeric.Key.Hex[]): void => {
    __0x.multiLine !== previousCursor[0] && clearBufferOfhexkey(previousCursor, editor.setDecorations);

    selectionStatusFunctionChain[__0x.multiLineText].forEach(functionChain(editor, multiLinetatusRef));

    rangePointerTable[__0x.multiLineAnchorText] = createLineRange(editor.selection.anchor);
    rangePointerTable[__0x.multiLineCursorText] = createLineRange(editor.selection.active);

    selectionDecorationOption[__0x.multiLineText]
        .forEach(
            contentTextFuncBuffered(
                editor.setDecorations,
                selectionTextBuffer[__0x.multiLineText]));
};

const multiCursorOeverlay: D.Selection.Intf.MultiCursorOverlay = {
    // buffer: [] as D.Selection.Intf.MultiCursorIndexReferences[],
    baseIndexRefBuffer: [],
    indexListRefBuffer: [],
    calibration: 0,
    newBase: false,
};

/**
 * 
 * @prop overlayIndex: overlay index, 
 * @prop cursorIndex: current index of selection
 * @prop cursorNth: this is actual value of index to be displayed, 
 *                  +1 of cursorIndex by its nature
 */
const multiCursorState: D.Selection.Intf.MultiCursorState = { // 
    /* --- SELECTION STATE --- */
    selectionBuffer: [] as vscode.Selection[],
    lineBuffer: new Map(),
    cursorIndex: 0,
    /* --- LINE STATE --- */
    indexList: [],
    columnList: [],
    baseLine: -1,
    currentLine: -1,
    previousLine: -1,
    duplicateOverlayIndex: -1,
    /* --- LAST SELECTION --- */
    lastSelection: undefined,
    lastSelectionCount: 0,
    /* --- OVERLAY STATE --- */
    overlayIndex: 0,
    overlay: multiCursorOeverlay,
};

const clearMultiCursorState = (): boolean => {
    multiCursorState.selectionBuffer.length = 0;
    multiCursorState.lineBuffer.clear();
    multiCursorState.indexList.length = 0;
    multiCursorState.columnList.length = 0;
    multiCursorState.overlayIndex = 0;
    multiCursorState.cursorIndex = 0;
    multiCursorState.baseLine = -1;
    multiCursorState.currentLine = -1;
    multiCursorState.duplicateOverlayIndex = -1;
    multiCursorState.lastSelection = undefined;
    multiCursorState.lastSelectionCount = 0;
    multiCursorState.overlayIndex = 0;
    multiCursorOeverlay.baseIndexRefBuffer.length = 0;
    multiCursorOeverlay.indexListRefBuffer.length = 0;
    multiCursorOeverlay.calibration = 0;
    multiCursorFlag.lastCount = 0;
    // multiCursorGroup.baseBuffer.length = 0;
    // multiCursorGroup.idx = 0;
    clearMultiCursor(__0x.multiCursorText, multiCursorFnContext.editor.setDecorations);
    clearMultiCursor(__0x.multiCursorEdit, multiCursorFnContext.editor.setDecorations);
    return true;
};


const multiCursorTextRef: D.Selection.Intf.MultiCursorTextRef = {
    nth: undefined,
    count: undefined,
    ln: undefined,
    lc: undefined,
    char: undefined,
};

const multiCursorEditRef: D.Selection.Intf.MultiCursorEditRef = {
    nth: undefined,
    count: undefined,
    ln: undefined,
    col: undefined,
    zCol: undefined,
};

const functionChainAccumulater = (context, statusRef) => ([fnName, fnChain]) => {
    if (fnName === 'char') {
        multiCursorAccumulated[fnName] += fnChain(context);
        statusRef[fnName].contentText = multiCursorAccumulated[fnName].toString();
    } else {
        statusRef[fnName].contentText = fnChain(context).toString();
    }
};

const multiCursorFlag: D.Selection.Intf.MultiCursorFlag = {
    lastCount: 0,
    sorted: false,
    mode: __0x.multiCursor,
    all: [__0x.multiCursor],
    text: [__0x.multiCursorText],
    edit: [__0x.multiCursorEdit],
};

const multiCursorTextPosition: number[] = [];

const multiCursorEditPosition: number[] = [];

/**
 * this is due to the editor wiil never be undefined when the function is called 
 * converting the vscode.window.activeTextEditor to will let it bypass 
 * null check (undefined). i understand that this will not be agreed with 
 * everyone but i am convinced to ok to to bypass it. 
 * 
 */
const multiCursorFnContext: D.Selection.Intf.MultiCursorOverlayContext = {
    editor: vscode.window.activeTextEditor as vscode.TextEditor,
    pos: 0,
    char: 0,
    idx: 0,
};

const textContext = {
    accumulate: functionChainAccumulater(multiCursorFnContext, multiCursorTextRef),
    // fnChain: selectionStatusFunctionChain[__0x.multiCursorText],
    // renderOption: selectionDecorationOption[__0x.multiCursorText],
    lineFn: multiCursorFnContext,
    flag: multiCursorFlag,
    baseIndex: [],
    indexList: [],
    baseIndexBuffer: [],
    indexListBuffer: [],
    contentText: {},
};

const editContext = {
    accumulate: functionChainAccumulater(multiCursorFnContext, multiCursorEditRef),
    fnChain: selectionStatusFunctionChain[__0x.multiCursorEdit],
    position: multiCursorEditPosition,
    lineFn: multiCursorFnContext,
    flag: multiCursorFlag,
    columnList: undefined,
    baseIndex: undefined,
    indexList: undefined,
    contentText: {},
};

const multiCursorAccumulated: Record<string, number> = {
    nth: 0,
    count: 0,
    ln: 0,
    lc: 0,
    char: 0,
};

const resetMultiCursorCounters = (): void => {
    multiCursorAccumulated.nth = 0;
    multiCursorAccumulated.count = 0;
    multiCursorAccumulated.ln = 0;
    multiCursorAccumulated.lc = 0;
    multiCursorAccumulated.char = 0;
};

const multiCursorTextKeyPosition: Record<string, null | number> = {
    nth: null,
    ln: null
};

const multiCursorEditKeyPosition: Record<string, null | number> = {
    nth: null,
    // ln: null,
    col: null,
    zCol: null,
};

const setRangePointer = (refObject: vscode.Range[]) => (selection: vscode.Selection, idx: number): vscode.Selection => refObject[idx] = selection;

const renderMultiCursor = (setDecorations: D.Editor.Tp.RenderOverlay, decorationOption: D.Selection.Tp.MultiCursorRenderOption) => (decorationType: vscode.TextEditorDecorationType, idx: number): void => setDecorations(decorationType, decorationOption[idx]);

const addBaseIndex = (baseIndex: number[]) => (i: number) => {
    return i + baseIndex[0];
};

const pushMultiCursorOption = (selectionBuffer, overlay, cursorIndex, context) => (contentText: any, idx: number): void => {
    let contentTextBuffer = contentText;

    if (multiCursorTextPosition.find((e) => e === idx) !== undefined) {
        console.log('multiCursorTextPosition', context.baseIndex[0]);
        contentTextBuffer = { ...contentText };
        contentTextBuffer.after = {
            ...contentText.after,
            baseIndex: context.baseIndex,
            indexList: [cursorIndex],
            get contentText() {
                return this.indexList.map(addBaseIndex(this.baseIndex)).join(',');
            },
        };

        // this references are to reduce the search step for the 
        // array object for the post process
        context.baseIndex = contentTextBuffer.after.baseIndex;
        context.indexList = contentTextBuffer.after.indexList;

        overlay.indexListRefBuffer.push(context.indexList);
    }

    selectionDecorationOption[__0x.multiCursorText][idx].push({
        selectionBufferIndex: selectionBuffer.length - 1,
        get range() {
            /**
             * the range of these object are should only be a references, due to the 
             * selection list is not sorted and will not be sorted
             */
            return selectionBuffer[this.selectionBufferIndex];
        },
        renderOptions: contentTextBuffer
    });
};

const duplicateLineSignature = (duplicateEntryIdx: number = -1, calibration, baseline: number, currentLine: number, previousLine: number, lineBufferLength: number): D.Numeric.Key.Bin => {
    return (currentLine < baseline ? __0x.MULTI_CURSOR_SELECTION_FLAG.TO_SHIFT_INDEX as D.Numeric.Key.Bin : 0)
        + (calibration > 0 ? __0x.MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED as D.Numeric.Key.Bin : 0)
        + (currentLine === baseline ? __0x.MULTI_CURSOR_SELECTION_FLAG.ON_BASELINE as D.Numeric.Key.Bin : 0)
        + (currentLine === previousLine ? __0x.MULTI_CURSOR_SELECTION_FLAG.AS_LAST_SELECTION as D.Numeric.Key.Bin : 0)
        + (lineBufferLength > (duplicateEntryIdx + 1) ? __0x.MULTI_CURSOR_SELECTION_FLAG.NOT_AS_LAST_SELECTION as D.Numeric.Key.Bin : 0) as D.Numeric.Key.Bin;
};

const nonDuplicateLineSignature = (selectionLength: number, baseLine: number, currentLine: number, calibration: number): D.Numeric.Key.Bin => {
    return (currentLine < baseLine ? __0x.MULTI_CURSOR_SELECTION_FLAG.TO_SHIFT_INDEX as D.Numeric.Key.Bin : 0)
        + (calibration > 0 ? __0x.MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED as D.Numeric.Key.Bin : 0) 
        + (selectionLength === 2 ? __0x.MULTI_CURSOR_SELECTION_FLAG.INIT as D.Numeric.Key.Bin : 0) as D.Numeric.Key.Bin;
};

const multiCursorIndexControl = (state: D.Selection.Intf.MultiCursorState, context): boolean => {

    const duplicateEntryIdx = state.lineBuffer.get(state.currentLine); // 이거 배열인 이유가 있엇네 아 

    if (duplicateEntryIdx !== undefined) {

        const sign = duplicateLineSignature(duplicateEntryIdx, state.overlay.calibration, state.baseLine, state.currentLine, state.previousLine, state.lineBuffer.size);
        console.log('duplicateLineSignature', sign, duplicateEntryIdx, state.currentLine, state.baseLine);
        const step = duplicateEntryStep[sign];
        step.forEach(fnStepDispatchBinder(state, context));
        return true;
    }

    // context.baseIndex.length = 0;
    // context.indexList.length = 0;

    const sign = nonDuplicateLineSignature(state.selectionBuffer.length, state.baseLine, state.currentLine, state.overlay.calibration);
    entryStep[sign].forEach(fnStepDispatchBinder(state, context));

    return false;
};

const multiCursorTextDecoration = (state: D.Selection.Intf.MultiCursorState, context: any): void => {

    if (multiCursorIndexControl(state, context)) {
        increaseIndex(state);
        state.previousLine = state.currentLine;
        return; // EOF 
    }

    state.lineBuffer.set(state.currentLine, state.overlayIndex);

    increaseIndex(state);
    selectionContentText[__0x.multiCursorText].contentText.forEach(pushMultiCursorOption(state.selectionBuffer, state.overlay, state.cursorIndex, context));
    // pushNthIndexGroup(state, context);
    state.previousLine = state.currentLine;
};

const multiCursorEditDecoration = (state: D.Selection.Intf.MultiCursorState, context: D.Selection.Tp.LineHandlerContext): void => {
    if (!multiCursorIndexControl(state, context)) {
        return; // EOF 
    }


    state.lineBuffer.set(state.currentLine, state.cursorIndex);

    // state.lineBuffer.push([{ ...multiCursorLineBuffer }]);

    // renderOption.forEach((fn) => fn[0](__0x.multiCursorEdit, fn[1])); 
    // // 오버레이 후처리 

    // context
    //     .contentText
    //     .forEach(
    //         pushMultiCursorOption(
    //             __0x.multiCursorEdit,
    //             state.selectionBuffer,
    //             state.cursorIndex,
    //             context.position));
};

const addMultiCursorEdit = (state, context) => {
    state.baseLine = 0;
    state.selectionBuffer = [...context.lineFn.editor.selections];
    // context.lineFn.editor = editor;
    state.selectionBuffer.forEach((s, idx) => {
        // multiCursorState.currentLine = multiCursorState.selectionBuffer[idx].end.line;
        state.currentLine = s.end.line;
        context.idx = idx;
        state.cursorIndex = idx;
        selectionStatusFunctionChain[__0x.multiCursorText].forEach(context.accumulate);
        multiCursorEditDecoration(state, context);

        // 흠 되긴 하는데, 이거 정확하게 어떤 메타데이터를 렌더링 할지 구분해야한다
        state.columnList.push(columnFromSelection(context.lineFn.editor, idx, 0)); // < 참조 되는건 확실함 

        increaseIndex(state);
    });
};

//::==============================================================================
//:: multi-cursor rendering entry handler
//::==============================================================================

const allOccurrence = (state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.TextContext): void => {
    sortSelectionsIfNeeded(context.lineFn.editor);
    // prepareMultiCursor(state);
    context.lineFn.editor.selections.forEach((selection: vscode.Selection) => {
        addMultiCursorSelection(selection, state, context);
    });
    // state.selectionBuffer.forEach(setRangePointer(rangePointerTable[__0x.multiCursorText] as vscode.Range[]));
};

const addMultiCursorSelection = (selection: vscode.Selection, state, context): void => {
    state.selectionBuffer.push(selection);
    state.currentLine = selection.end.line;
    selectionStatusFunctionChain[__0x.multiCursorText].forEach(context.accumulate); // 이것도 context 로 빼자 
    multiCursorTextDecoration(state, context);
};

const nextOccurrenceInit = (state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.TextContext): void => {
    sortSelectionsIfNeeded(context.lineFn.editor);
    context.lineFn.editor.selections.forEach((selection: vscode.Selection) => {

        addMultiCursorSelection(selection, state, context);
    });
    // addMultiCursorSelection(context.lineFn.editor.selections[0], state, context);
    // addMultiCursorSelection(context.lineFn.editor.selections[1], state, context);
    // state.selectionBuffer.forEach(setRangePointer(rangePointerTable[__0x.multiCursorText] as vscode.Range[]));
};

const nextOccurrence = (state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.TextContext): void => {
    addMultiCursorSelection(context.lineFn.editor.selections[multiCursorFlag.lastCount], state, context);
    // state.selectionBuffer.forEach(setRangePointer(rangePointerTable[__0x.multiCursorText] as vscode.Range[]));
};

const cursorOnEndOfLines = (state, context): void => {
    // prepareMultiCursor(context.lineFn.editor.selection.end.line);
    normalizeToEmptySelections(context.lineFn.editor);
    addMultiCursorEdit(state, context);
};

const cursorMovement = (state, context): void => {
    clearMultiCursor(__0x.multiCursorEdit, context.lineFn.editor.setDecorations); // < 래퍼 필요하다 
    // prepareMultiCursor(context.lineFn.editor.selection.end.line);
    addMultiCursorEdit(state, context);
};

const addCursor = (state, context) => {
    sortSelectionsIfNeeded(context.lineFn.editor);
    normalizeToEmptySelections(context.lineFn.editor);
    // prepareMultiCursor(context.lineFn.editor.selections[context.lineFn.editor.selections.length - 1].end.line);
    addMultiCursorEdit(state, context);
};

//::==============================================================================
//:: render-handling focused functions
//::==============================================================================

const renderMultiCursorWrapper = (cursorType: D.Numeric.Key.Hex, setDecorations: D.Editor.Tp.RenderOverlay,): void => {
    return selectionTextBuffer[cursorType]
        .forEach(
            renderMultiCursor(
                setDecorations,
                selectionDecorationOption[cursorType]));
};

const clearMultiCursor = (cursorType: D.Numeric.Key.Hex, setDecorations: D.Editor.Tp.RenderOverlay) => {
    selectionTextBuffer[cursorType].forEach(resetDecoration(setDecorations));
    selectionDecorationOption[cursorType].forEach((option, idx) => {
        selectionDecorationOption[cursorType][idx].length = 0;
    });
};

const multiCursorFnStack = {
    [__0x.allOccurrence]: [firstSelectionAsBaseLine, allOccurrence],
    [__0x.nextOccurrence]: [nextOccurrence],
    [__0x.nextOccurrenceInit]: [firstSelectionAsBaseLine, nextOccurrenceInit],
    [__0x.cursorOnEndOfLines]: [firstSelectionAsBaseLine, cursorOnEndOfLines],
    [__0x.movement]: [firstSelectionAsBaseLine, cursorMovement],
    [__0x.addCursor]: [lastSelectionAsBaseLine, addCursor],
};

const callFnChain: D.Selection.Tp.FnChainSignature = (state, context) => (fn: any) => fn(state, context);

const multiCursorStrategy = (isEmpty: boolean, lastCount: number, length: number): D.Numeric.Key.Hex => {
    return !isEmpty
        ? lastCount === 0 && length === 2
            ? __0x.nextOccurrenceInit
            : (lastCount + 2) < length
                ? __0x.allOccurrence
                : __0x.nextOccurrence
        : lastCount === 0 && length === 1
            ? __0x.cursorOnEndOfLines
            : (lastCount === length && lastCount !== 0)
                ? __0x.movement
                : __0x.addCursor;
};

const multiCursorSelection: D.Editor.Tp.RenderGroupFuncSign = (editor: vscode.TextEditor, previousCursor: D.Numeric.Key.Hex[]): void => {

    // not sure OR operator will give the comiler that stratkey is the number, this is experimental try
    const stratKey = multiCursorStrategy(
        editor.selection.isEmpty,
        multiCursorFlag.lastCount,
        editor.selections.length) | 0;

    const isEdit: number = stratKey & 0x01;

    stratKey & 0x08 && clearMultiCursorState() && clearBufferOfhexkey(previousCursor, editor.setDecorations);

    multiCursorFnStack[stratKey].forEach(callFnChain(multiCursorState, isEdit ? editContext : textContext));
    renderMultiCursorWrapper(__0x.multiCursorText + isEdit as D.Numeric.Key.Hex, editor.setDecorations);
    multiCursorFlag.lastCount = editor.selections.length;
};

const forceDispatchEditorChange = (editor: vscode.TextEditor): void => {
    multiCursorFnContext.editor = editor;
};

const clearSelectionTextBuffer = (editor: vscode.TextEditor): void => {
    SELECTION_KIND_LIST?.forEach(cursorType => clearBufferOfhexkey([cursorType], editor.setDecorations));
};

const clearDisposeBuffer = (setDecorations: vscode.TextEditor["setDecorations"]) => (buffer: vscode.TextEditorDecorationType): void => {
    setDecorations(buffer, blankRange);
    buffer.dispose();
};

const bindStatusContentTextState = (): D.Selection.Intf.BindContentTextState => {
    return {
        functionOf: selectionOf,
        textOf: selectionContentText,
        infoOf: indentInfo
    };
};

export {
    /*--- configuration functions ---*/
    bindStatusContentTextState,
    setMultiCursorTextPosition,
    setMultiCursorEditPosition,
    setSelectionTextbuffer,
    setMultiCursorContext,
    clearSelectionTextBuffer,
    syncRefernceTable,
    SelectionTextRegex,
    clearMultiCursorState,
    forceDispatchEditorChange,
    /*--- render functions ---*/
    cursorOnlySelection,
    singleLineSelection,
    multilineSelection,
    multiCursorSelection,
};
