/**
 * [ src/selection/selection.ts ]
 * 
 * this is the main module for currrent selection overlay functions.
 * 
 * only multiCursor has been codesplit due to it's longer codebase,
 * but perhaps it is also ideal to codesplit other cursor types as 
 * well in the future. 
 * 
 * this module has very heavy use of pointer-like/references, 
 * and some part of the code is still not complete, yet. 
 * 
 * this module is somewhat like module-level singleton pattern code
 * itself, i guess those store will be refactored in the future 
 * but i am just not sure yet.
 * 
 * some of the cold-path code is still messy in a way, 
 * i can refactor them later.
 * 
 * hot-path codes are not too bad.
 * 
 */
import type * as D from '../../type/type';

import * as vscode from 'vscode';
import * as hex from '../../numeric/hexadecimal';
import * as bin from '../../numeric/binary';
import * as dec from '../../numeric/decimal';
import * as regex from '../../collection/regex';
import { INDENT_INFO, SELECTION_CONTENT_TEXT, SELECTION_KIND_LIST, SELECTION_KIND_LIST_EXCLUDE_MULTI_CURSOR } from '../../constant/shared/object';
import { SELECTION_CONTENT_TEXT_CONFIG_KEY } from '../../constant/config/enum';
import { DECORATION_OPTION_CONFIG } from '../../constant/config/object';
import { createLineRange, blankRange } from '../range';
import { resetDecoration } from '../editor';
import { addCursor, allOccurrence, cursorMovement, cursorOnEndOfLines, firstSelectionAsBaseLine, nextOccurrence, nextOccurrenceInit, normalizeEditorSelection, sortEditorSelection } from './multiCursor/multiCursor';
import { replicateColsRenderOption, replicateNthRenderOption, colRenderOptionOverride, nthRenderOptionOverride } from './multiCursor/renderOption';

export {
    bindStatusContentTextState,
    setMultiCursorTextPosition,
    setMultiCursorEditPosition,
    setSelectionTextbuffer,
    setMultiCursorContentRef,
    setMultiCursorContext,
    setContextAccmulator,
    clearSelectionTextBuffer,
    syncRefernceTable,
    SelectionTextRegex,
    clearMultiCursorState,
    forceDispatchEditorChange,
    clearMultiCursorRenderOption,
    cursorOnlySelection,
    singleLineSelection,
    multilineSelection,
    multiCursorSelection,
};

/**
 * memory for decorationRenderOption objects
 * 
 */
const selectionContentText = {
    ...SELECTION_CONTENT_TEXT
} as D.Status.Intf.StatusContentText;

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
    [hex.cursorOnlyText]: [],
    [hex.singleLineText]: [],
    [hex.multiLineText]: [],
    [hex.multiCursorText]: [],
    [hex.multiCursorEdit]: []
};

/**
 * object that will store render options 
 */
const selectionDecorationOption: Record<D.Numeric.Key.Hex, any[] | [][] | [D.Decoration.Intf.RenderOption][]> = {
    [hex.cursorOnlyText]: [],
    [hex.singleLineText]: [],
    [hex.multiLineText]: [],
    [hex.multiCursorText]: [],
    [hex.multiCursorEdit]: []
};

const rangePointerTable: Record<D.Numeric.Key.Hex, undefined | [] | vscode.Range | vscode.Range[]> = {
    [hex.cursorOnlyText]: undefined,
    [hex.singleLineText]: undefined,
    [hex.multiLineAnchorText]: undefined,
    [hex.multiLineCursorText]: undefined,
    [hex.multiCursorText]: [],
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
    lc: hex.multiLineLineCountHex,
    char: hex.multiLineChararcterHex,
    charOnly: hex.multiLineChararcterOnlyHex
};

/**
 * need to be renamed from symlink to hexLink. 
 * it used symbols before but symbols are slow. 
 * 
 * hex.multiLineLineCountHex => total lines in selection
 * hex.multiLineChararcterHex => total characters in seleciton
 */
const multiLineFn = {
    lc: (editor: vscode.TextEditor) =>
        ((editor.selection.end.line - editor.selection.start.line) + 1),
    char: (editor: vscode.TextEditor) =>
        editor.document.getText(editor.selection).length,
    charOnly: (editor: vscode.TextEditor) =>
        editor.document.getText(editor.selection).replace(indentInfo.regex as RegExp, "").length
};

const columnOfIndex = (editor: vscode.TextEditor, idx: number = 0, delta = 0): number | string => {
    const col = editor.selections[idx].active.character + delta;
    const end = editor.document.lineAt(editor.selections[idx].active.line).text.length + delta;
    return (col === end ? col : col + '/' + end);
};

/**
 * mutli-cursor selection function collections
 */
const multiCursorFn: D.Selection.Intf.MultiCursorFunc = {
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

/**
 * @link src/numeric/decimal.ts
 * 
 * placeholder objects module to keep the auto regex split with style intacted 
 * so that indivisual styles can be applied to renderOption objects as in configuration. 
 * 
 * old methods were using symbol constants to mark exact position in array of renderOptions 
 * and set the contentText, which has been refactored into using references 
 * of the object to assign the contentText in renderOption.after object.
 * 
 */
const multiCursorOf: Record<string, number> = {
    col: dec.multiCursorLineCol,
    zCol: dec.multiCursorLineZCol,
    count: dec.multiCursorLineCountFull,
    nth: dec.multiCursorLineNth,
    ln: dec.multiCursorLineNumber,
    lc: dec.multiCursorLineCount,
    char: dec.multiCursorLineCharacter,
};

/**
 * renderOption dynamic contentText function stacks for selection status block. 
 * 
 * this object will only be used as a function reference hex number only 
 * to indicate if the contentText need to have dynamic values, 
 * in all fairness, it is not necesary as position is worked out by regex
 * and the function will be called by references, not by anonymous function anymore.
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
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_EDIT]: multiCursorOf,
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

const SelectionTextRegex: D.Regex.Tp.SelectionRegexObject = {
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

const setDeocorationOption = (cursorType: D.Numeric.Key.Hex, renderOptionHex: D.Numeric.Key.Hex[]): void => {
    selectionTextBuffer[cursorType].forEach((option, idx) => {
        const renderOption: any = [];
        renderOptionHex.forEach(hex => {
            renderOption.push(composeRenderOption(hex, selectionContentText[hex]?.contentText[idx]));
        });
        selectionDecorationOption[cursorType].push(renderOption);
    });
};

const selectionStatusFunctionChain: Record<D.Numeric.Key.Hex, any[]> = {
    [hex.cursorOnlyText]: [],
    [hex.singleLineText]: [],
    [hex.multiLineText]: [],
    [hex.multiCursorText]: [],
    [hex.multiCursorEdit]: []
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

    const selectionStatusDecorationOption = {
        [hex.cursorOnlyText]: {
            renderOptionHex: [hex.cursorOnlyText],
            fnObject: { ...lineNumber, ...columns }
        },
        [hex.singleLineText]: {
            renderOptionHex: [hex.singleLineText],
            fnObject: { ...lineNumber, ...characterCount }
        },
        [hex.multiLineText]: {
            renderOptionHex: [hex.multiLineAnchorText, hex.multiLineCursorText],
            fnObject: { ...lineNumber, ...multiLineFn }
        },
        [hex.multiCursorText]: {
            renderOptionHex: [hex.multiCursorText],
            fnObject: { ...multiCursorFn }
        },
        [hex.multiCursorEdit]: {
            renderOptionHex: [hex.multiCursorEdit],
            fnObject: { ...multiCursorFn }
        }
    };

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
        case hex.cursorOnly:
            cursorOnlyStatusRef[placeholder] = refObj;
            break;
        case hex.singleLine:
            singleLinetatusRef[placeholder] = refObj;
            break;
        case hex.multiLine:
            multiLinetatusRef[placeholder] = refObj;
            break;
        case hex.multiCursorText:
            multiCursorTextRef[placeholder] = refObj;
            break;
        case hex.multiCursorEdit:
            multiCursorEditRef[placeholder] = refObj;
            break;
        default:
            break;
    }
};

const contentTextFuncBuffered: D.Selection.Tp.BufferedFuncSignature = (setDecorations, buffer) => (renderOption, idx): void => {
    setDecorations(buffer[idx], renderOption);
};

const functionChain: D.Selection.Tp.FunctionChain = (statusRef, args) => ([fnName, fnChain]) => {
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

const setMultiCursorContentRef = (): void => {
    const multiCursorTextRef = selectionContentText[hex.multiCursorText];
    if (multiCursorTextRef !== undefined) {
        textContext.contentText = multiCursorTextRef.contentText;
    }

    const multiCursorEditRef = selectionContentText[hex.multiCursorEdit];
    if (multiCursorEditRef !== undefined) {
        editContext.contentText = multiCursorEditRef.contentText;
    }
};

const setContextAccmulator = (): void => {
    textContext.accumulate = functionChainAccumulater(multiCursorFnContext, multiCursorAccumulated, multiCursorTextRef);
    editContext.accumulate = functionChainAccumulater(multiCursorFnContext, multiCursorAccumulated, multiCursorEditRef);
};

const setMultiCursorContext = (): void => {
    if (multiCursorTextKeyPosition.nth) {
        nthRenderOptionOverride(selectionContentText[hex.multiCursorText]?.contentText[multiCursorTextKeyPosition.nth], textContext);
        textContext.positionList.set(multiCursorTextKeyPosition.nth, replicateNthRenderOption);
    }

    if (multiCursorEditKeyPosition.nth) {
        nthRenderOptionOverride(selectionContentText[hex.multiCursorEdit]?.contentText[multiCursorEditKeyPosition.nth], editContext);
        editContext.positionList.set(multiCursorEditKeyPosition.nth, replicateNthRenderOption);
    }

    if (multiCursorEditKeyPosition.col) {
        colRenderOptionOverride(selectionContentText[hex.multiCursorEdit]?.contentText[multiCursorEditKeyPosition.col], columnOfIndex, 1, editContext);
        editContext.positionList.set(multiCursorEditKeyPosition.col, replicateColsRenderOption);
    } else if (multiCursorEditKeyPosition.zCol) {
        colRenderOptionOverride(selectionContentText[hex.multiCursorEdit]?.contentText[multiCursorEditKeyPosition.zCol], columnOfIndex, 0, editContext);
        editContext.positionList.set(multiCursorEditKeyPosition.zCol, replicateColsRenderOption);
    }
};

//::==============================================================================
//:: render-handling focused functions
//::==============================================================================

const clearBufferOfhexkey = (setDecorations: D.Editor.Tp.RenderOverlay, previousCursor: D.Numeric.Key.Hex[]): void => {
    switch (previousCursor[0]) {
        case hex.cursorOnly:
            selectionTextBuffer[hex.cursorOnlyText].forEach(resetDecoration(setDecorations));
            break;
        case hex.singleLine:
            selectionTextBuffer[hex.singleLineText].forEach(resetDecoration(setDecorations));
            break;
        case hex.multiLine:
            selectionTextBuffer[hex.multiLineText].forEach(resetDecoration(setDecorations));
            break;
        case hex.multiCursor:
            clearMultiCursorState();
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
const cursorOnlySelection = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]): void => {

    hex.cursorOnly !== previousKey[0] && clearSelectionTextBuffer(editor, SELECTION_KIND_LIST);

    selectionStatusFunctionChain[hex.cursorOnlyText].forEach(functionChain(cursorOnlyStatusRef, { editor }));

    rangePointerTable[hex.cursorOnlyText] = createLineRange(editor.selection.active);

    selectionDecorationOption[hex.cursorOnlyText]
        .forEach(
            contentTextFuncBuffered(
                editor.setDecorations,
                selectionTextBuffer[hex.cursorOnlyText]));
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
const singleLineSelection = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]): void => {

    hex.singleLine !== previousKey[0] && clearBufferOfhexkey(editor.setDecorations, previousKey);

    selectionStatusFunctionChain[hex.singleLineText].forEach(functionChain(singleLinetatusRef, { editor }));

    rangePointerTable[hex.singleLineText] = createLineRange(editor.selection.active);

    selectionDecorationOption[hex.singleLineText]
        .forEach(
            contentTextFuncBuffered(
                editor.setDecorations,
                selectionTextBuffer[hex.singleLineText]));
};

const multiLinetatusRef: Record<string, undefined | vscode.DecorationInstanceRenderOptions> = {
    ln: undefined,
    lc: undefined,
    char: undefined,
    charOnly: undefined,
};

/**
 * because the multiLine overlay requries two overlay status on both anchor 
 * and active, the renderOption will be in 2d array using, hex.multiLineAnchorText 
 * and hex.multiLineCursorText as in setSelectionTextbuffer function. then the 
 * renderOption will be stored in selectionDecorationOption as a 1D array as 
 * double data channel with two differernt range with its renderOption object.
 * 
 * this effectivley forces the anchor and active overlay configurations to have 
 * same length of renderOptions of arraies but it is not mandataory as far as i know.
 * 
 * and because those renderOptions are in a single 1D array, you only need to 
 * iterate the renderOption nore more than once while both anchor and active 
 * renderOption sharing the same decorationType API object. 
 * 
 * 
 * @param editor 
 * @param previousKey 
 */
const multilineSelection = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]): void => {

    hex.multiLine !== previousKey[0] && clearBufferOfhexkey(editor.setDecorations, previousKey);

    selectionStatusFunctionChain[hex.multiLineText].forEach(functionChain(multiLinetatusRef, editor));

    rangePointerTable[hex.multiLineAnchorText] = createLineRange(editor.selection.anchor);
    rangePointerTable[hex.multiLineCursorText] = createLineRange(editor.selection.active);

    selectionDecorationOption[hex.multiLineText]
        .forEach(
            contentTextFuncBuffered(
                editor.setDecorations,
                selectionTextBuffer[hex.multiLineText]));
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

const functionChainAccumulater: D.Selection.Tp.FunctionChainAccumulater = (context, Accumulated, statusRef) => ([fnName, fnChain]) => {
    switch (fnName) {
        case 'char':
            Accumulated[fnName] += fnChain(context);
            statusRef[fnName].contentText = Accumulated[fnName].toString();
            break;
        default:
            statusRef[fnName].contentText = fnChain(context).toString();
            break;
    }
};

const multiCursorOeverlay: D.Selection.Intf.MultiCursorOverlay = {
    baseIndexRefBuffer: [],
    indexListRefBuffer: [],
    calibration: 0
};

const multiCursorFnContext: D.Selection.Intf.MulticursorLineFuncContext = {
    editor: vscode.window.activeTextEditor as vscode.TextEditor,
    pos: 0,
    char: 0,
    idx: 0,
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
    ln: null,
};

const multiCursorEditKeyPosition: Record<string, null | number> = {
    nth: null,
    // ln: null,
    col: null,
    zCol: null,
};

const multiCursorState: D.Selection.Intf.MultiCursorState = {
    strategyKey: 0,
    // ... SELECTION_STATE ...
    selectionReference: [],
    selectionBuffer: [] as vscode.Selection[],
    lineBuffer: new Map(),
    cursorIndex: 0,
    // ... LINE_STATE ...
    baseLine: -1,
    currentLine: -1,
    previousLine: -1,
    duplicateOverlayIndex: -1,
    // ... LAST_SELECTION ...
    lastCount: 0,
    // ... OVERLAY_STATE ...
    overlayIndex: 0,
    overlay: multiCursorOeverlay,
};


const textContext: D.Selection.Intf.MultiCursorContext = {
    renderOption: selectionDecorationOption[hex.multiCursorText],
    statusFnChain: selectionStatusFunctionChain[hex.multiCursorText],
    accumulate: undefined,
    lineFn: multiCursorFnContext,
    positionList: new Map(),
    baseIndex: [] as number[],
    indexList: [] as number[],
    contentText: [],
};

const editContext: D.Selection.Intf.MultiCursorContext = {
    renderOption: selectionDecorationOption[hex.multiCursorEdit],
    statusFnChain: selectionStatusFunctionChain[hex.multiCursorEdit],
    accumulate: undefined,
    lineFn: multiCursorFnContext,
    positionList: new Map(),
    baseIndex: [] as number[],
    indexList: [] as number[],
    columnList: [],
    contentText: [],
};

const clearMultiCursorState = (): boolean => {
    multiCursorState.strategyKey = 0;
    multiCursorState.selectionBuffer.length = 0;
    multiCursorState.lineBuffer.clear();
    multiCursorState.cursorIndex = 0;
    multiCursorState.baseLine = -1;
    multiCursorState.currentLine = -1;
    multiCursorState.previousLine = -1;
    multiCursorState.duplicateOverlayIndex = -1;
    multiCursorState.lastCount = 0;
    multiCursorState.overlayIndex = 0;
    multiCursorState.overlay.baseIndexRefBuffer.length = 0;
    multiCursorState.overlay.indexListRefBuffer.length = 0;
    multiCursorState.overlay.calibration = 0;
    setMultiCursorContentRef();
    resetMultiCursorCounters();
    clearMultiCursorRenderOption(hex.multiCursorText, multiCursorFnContext.editor.setDecorations);
    clearMultiCursorRenderOption(hex.multiCursorEdit, multiCursorFnContext.editor.setDecorations);
    return true;
};


const setRangePointer = (refObject: vscode.Range[]) => (selection: vscode.Selection, idx: number): vscode.Selection => refObject[idx] = selection;

const renderMultiCursor = (setDecorations: D.Editor.Tp.RenderOverlay, decorationOption: D.Selection.Tp.MultiCursorRenderOption) => (decorationType: vscode.TextEditorDecorationType, idx: number): void => setDecorations(decorationType, decorationOption[idx]);

const renderMultiCursorWrapper = (cursorType: D.Numeric.Key.Hex, setDecorations: D.Editor.Tp.RenderOverlay,): void => {
    return selectionTextBuffer[cursorType]
        .forEach(
            renderMultiCursor(
                setDecorations,
                selectionDecorationOption[cursorType]));
};

const clearMultiCursorRenderOption = (cursorType: D.Numeric.Key.Hex, setDecorations: D.Editor.Tp.RenderOverlay) => {
    selectionTextBuffer[cursorType].forEach(resetDecoration(setDecorations));
    selectionDecorationOption[cursorType].forEach((option, idx) => {
        selectionDecorationOption[cursorType][idx].length = 0;
    });
};


const multiCursorResetInfusion = (state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.MultiCursorContext): void => {
    clearMultiCursorState();
    clearMultiCursorRenderOption(hex.multiCursorText, context.lineFn.editor.setDecorations);
    clearMultiCursorRenderOption(hex.multiCursorEdit, context.lineFn.editor.setDecorations);
};

const getContextKind = (ifEditMode: boolean): D.Selection.Intf.MultiCursorContext => {
    return ifEditMode ? editContext : textContext;
};

const getMultiCursorKind = (ifEditMode: boolean): D.Numeric.Key.Hex => {
    return ifEditMode ? (hex.multiCursorText + bin.editBitPosition) as D.Numeric.Key.Hex : hex.multiCursorText;
};

const isEditMode = (strategyKey: number): boolean => {
    return (strategyKey & bin.editBitPosition) === bin.editBitPosition;
};

/**
 * Each axiom should have a single comparison, allowing it to represent
 * a truly atomic state. A certain set of these axioms can then be used 
 * to represent a very specific state. Constants should be named explicitly 
 * to provide deterministic information about their purpose and meaning.
 * 
 * Bits 0-3 are reserved for metadata. Bits 2 and 3 are intentionally left 
 * empty for future implementations when the need arises.
 * 
 * Bit ranges for each section:
 * 
 * 0-3: Metadata
 * 4-7: Selection malformation
 * 8-11: Count
 * 12-15: Predictable new sequence
 * 16-23: Line position type comparisons
 */
const multiCursorStatusAxiom = (isFirstEmpty: boolean, isCurrentEmpty: boolean, currentCount: number, lastCount: number, baseLine: number, previousLine: number, currentLine: number): number => {
    const initalizeState: boolean = baseLine === -1;
    const normalizeSelectios: boolean = isFirstEmpty !== isCurrentEmpty;
    const lastCountzero: boolean = lastCount === 0;
    const countIsEqaul: boolean = lastCount === currentCount;
    const countLeap: boolean = currentCount > 2;
    const isIncreaseCursorByOne: boolean = currentCount - lastCount === 1;

    const newPositionBeforePrevious: boolean = currentLine < previousLine;;
    const newPositionEqualPrevious: boolean = currentLine === previousLine;
    const newPositionNextPrevious: boolean = currentLine > previousLine;

    const basePositionBeforePosition: boolean = previousLine < currentLine;
    const basePositionEqualPosition: boolean = currentLine === baseLine;
    const basePositionNextPosition: boolean = currentLine > baseLine;

    /**
     * these magic numbers does not need to be in constant module as these
     * are single serving numbers to push the bit position to create a 
     * state signature.
     * 
     */
    const state = 0
        /* matadata section, 0-3 */
        | (isFirstEmpty ? 1 << 0 : 0)
        | (isCurrentEmpty ? 1 << 1 : 0)
        /* selection malformation section, 4-7 */
        | (normalizeSelectios ? 1 << 4 : 0)
        | (initalizeState ? 1 << 5 : 0)
        /* count section, 8-11 */
        | (lastCountzero ? 1 << 8 : 0)
        | (countIsEqaul ? 1 << 9 : 0)
        | (countLeap ? 1 << 10 : 0)
        /* if new status is predictable sequence, 12-15 */
        | (isIncreaseCursorByOne ? 1 << 12 : 0)
        /* line position type comparions, 16-23 */
        | (newPositionBeforePrevious ? 1 << 16 : 0)
        | (newPositionEqualPrevious ? 1 << 17 : 0)
        | (newPositionNextPrevious ? 1 << 18 : 0)
        | (basePositionBeforePosition ? 1 << 19 : 0)
        | (basePositionEqualPosition ? 1 << 20 : 0)
        | (basePositionNextPosition ? 1 << 21 : 0)
        ;

    return stateFunctinRoute[state];
};


/**
 * state route table, this is the object to re-map the state signature to 
 * coresponding multi-cursor function signature. this is not very smart way
 * but this will have at least overhead to re-map the status signature 
 * into correct function signature.
 * 
 * some variable names are hard to identify, maybe i will refactor those 
 * enum names later, in conjunction with moving multiCursorFuncMap object
 * to multiCursor.ts
 * 
 */
const stateFunctinRoute: Record<number, D.Numeric.Key.Bin> = {
    [bin.MULTI_CURSOR_STATE.NEXT_OCCURRENCE_INIT]: bin.nextOccurrenceInit,
    [bin.MULTI_CURSOR_STATE.NEXT_OCCURRENCE_0]: bin.nextOccurrence,
    [bin.MULTI_CURSOR_STATE.NEXT_OCCURRENCE_1]: bin.nextOccurrence,
    [bin.MULTI_CURSOR_STATE.NEXT_OCCURRENCE_2]: bin.nextOccurrence,
    [bin.MULTI_CURSOR_STATE.NEXT_OCCURRENCE_3]: bin.nextOccurrence,
    [bin.MULTI_CURSOR_STATE.NEXT_OCCURRENCE_4]: bin.nextOccurrence,
    [bin.MULTI_CURSOR_STATE.NEXT_OCCURRENCE_5]: bin.nextOccurrence,
    [bin.MULTI_CURSOR_STATE.ALL_OCCURRENCE]: bin.allOccurrence,
    [bin.MULTI_CURSOR_STATE.CURSOR_ON_END_OF_LINES_0]: bin.cursorOnEndOfLines,
    [bin.MULTI_CURSOR_STATE.CURSOR_ON_END_OF_LINES_1]: bin.cursorOnEndOfLines,
    [bin.MULTI_CURSOR_STATE.ADD_CURSOR_SEQUENTIAL]: bin.addCursorSequential,
    [bin.MULTI_CURSOR_STATE.ADD_CURSOR_REORDER_0]: bin.addCursorReorder,
    [bin.MULTI_CURSOR_STATE.ADD_CURSOR_REORDER_1]: bin.addCursorReorder,
    [bin.MULTI_CURSOR_STATE.ADD_CURSOR_REORDER_2]: bin.addCursorReorder,
    [bin.MULTI_CURSOR_STATE.ADD_CURSOR_REORDER_3]: bin.addCursorReorder,
    [bin.MULTI_CURSOR_STATE.MOVEMENT_0]: bin.movement,
    [bin.MULTI_CURSOR_STATE.MOVEMENT_1]: bin.movement,
    [bin.MULTI_CURSOR_STATE.MOVEMENT_2]: bin.movement,
    [bin.MULTI_CURSOR_STATE.MOVEMENT_3]: bin.movement,
    [bin.MULTI_CURSOR_STATE.MOVEMENT_4]: bin.movement,
    [bin.MULTI_CURSOR_STATE.MOVEMENT_5]: bin.movement,
    [bin.MULTI_CURSOR_STATE.RESET_TO_CURSOR_ONLY_0]: bin.resetToCursorOnly,
    [bin.MULTI_CURSOR_STATE.RESET_TO_CURSOR_ONLY_1]: bin.resetToCursorOnly,
    [bin.MULTI_CURSOR_STATE.RESET_TO_CURSOR_ONLY_2]: bin.resetToCursorOnly,
    [bin.MULTI_CURSOR_STATE.RESET_TO_CURSOR_ONLY_3]: bin.resetToCursorOnly,
    [bin.MULTI_CURSOR_STATE.RESET_TO_CURSOR_ONLY_4]: bin.resetToCursorOnly,
    [bin.MULTI_CURSOR_STATE.RESET_TO_CURSOR_ONLY_5]: bin.resetToCursorOnly,
};

/**
 * this is the function sequence list map object to perform the necessary functions in correct order
 * perhaps this object can be put in ./multiCursor/multiCursor.ts as well? 
 * 
 * santizations function list
 * - multiCursorResetInfusion
 * - sortEditorSelection
 * - normalizeEditorSelection
 * 
 */
const multiCursorFuncMap: Record<D.Numeric.Key.Bin, any[]> = {
    [/** 16_ */ bin.nextOccurrenceInit]: [multiCursorResetInfusion, firstSelectionAsBaseLine, nextOccurrenceInit],
    [/** 32_ */ bin.nextOccurrence]: [nextOccurrence],
    [/** 64_ */ bin.allOccurrence]: [multiCursorResetInfusion, firstSelectionAsBaseLine, sortEditorSelection, allOccurrence],
    [/** 17_ */ bin.cursorOnEndOfLines]: [multiCursorResetInfusion, firstSelectionAsBaseLine, sortEditorSelection, cursorOnEndOfLines],
    [/** 33_ */ bin.addCursorSequential]: [normalizeEditorSelection, addCursor],
    [/** 65_ */ bin.addCursorReorder]: [multiCursorResetInfusion, firstSelectionAsBaseLine, sortEditorSelection, normalizeEditorSelection, cursorOnEndOfLines],
    [/** 129 */ bin.movement]: [multiCursorResetInfusion, firstSelectionAsBaseLine, cursorMovement],
    [/** 1__ */ bin.resetToCursorOnly]: [sortEditorSelection, normalizeEditorSelection, multiCursorResetInfusion, firstSelectionAsBaseLine, cursorOnEndOfLines],
    // [/** 0__ */ bin.resetToCursorOnlyFromSelection]: [sortEditorSelection, normalizeEditorSelection, multiCursorResetInfusion, firstSelectionAsBaseLine, cursorOnEndOfLines],
};

/**
 * this function will prevent selections mixing empty and non-empty selections.
 * basically, this function will check if new selection is inconsistant from 
 * initial selection, then it will truncate the last selection from editor.selections.
 * 
 * not perfect, but this will do for now and won't crash the runtime. i need more 
 * time to think about how to fix this.
 * 
 * @param editor 
 * @returns 
 */
const cursorMalformationGuard = (editor: vscode.TextEditor): boolean => {
    if (editor.selection.isEmpty !== editor.selections[editor.selections.length - 1].isEmpty) {
        editor.selections = [...editor.selections.slice(0, editor.selections.length - 1)];
        return true;
    }
    return false;
};

const callFnChain: D.Selection.Tp.FnChainSignature = (state, context) => (fn: any) => fn(state, context);

/**
 * [ multiCursorSelection ]
 * 
 * this is probably most complicated selection status overlay function in this module...
 * 
 * the function will check if inital selection and last selection are same (isEmpty), 
 * the reason is, selection is always more than 1 when multiCursorSelection is called from
 * editor.ts.
 * 
 * next, the function will check if the state is from initial state by checking strategyKey
 * and if the state is in intial state, i will clear whatever was rendered previously from
 * differernt types of cursor types excluding mulitcursor. multiCursor overlays will be 
 * handled in multiCursorFuncMap object with multiCursorResetInfusion function.
 * 
 * then the function will parse the state object, and get state signature in 
 * multiCursorStatusAxiom function and re-map the state signuature into function 
 * signautre so it can call correct overlay control function list array; in multiCursorFuncMap. 
 * 
 * when .strategyKey has correct function list key, it will check the mode (text/edit overlay)
 * and set it on local boolean editMode. 
 * 
 * editMode will be a boolean to compound the bit opeartion between signatures and 
 * it will also decide which context object to be set in callFnChain. key-pair array will 
 * be executed in iteration, (callFnChain), range, renderOptions and other overlay controls 
 * will be handled by the moduels inside ./multiCursor/*.ts.
 * 
 * once all renderOption objects are ready, renderMultiCursorWrapper will be called to 
 * render overlays to finalize the function. 
 * 
 * at last, function will set lastCount in state in order to backward reference 
 * how many selections were in current function call.
 * 
 * 
 * @param editor 
 * @param previousCursor 
 */
const multiCursorSelection = (editor: vscode.TextEditor, previousKey: D.Numeric.Key.Hex[]): void => {

    cursorMalformationGuard(editor);

    multiCursorState.strategyKey === 0 && clearSelectionTextBuffer(editor, SELECTION_KIND_LIST_EXCLUDE_MULTI_CURSOR);

    const zLength: number = editor.selections.length - 1;

    multiCursorState.strategyKey = multiCursorStatusAxiom(
        editor.selection.isEmpty,
        editor.selections[zLength].isEmpty,
        editor.selections.length,
        multiCursorState.lastCount,
        multiCursorState.baseLine,
        multiCursorState.previousLine,
        editor.selections[zLength].end.line);

    const editMode: boolean = isEditMode(multiCursorState.strategyKey);

    multiCursorFuncMap[multiCursorState.strategyKey as D.Numeric.Key.Bin].forEach(callFnChain(multiCursorState, getContextKind(editMode)));
    renderMultiCursorWrapper(getMultiCursorKind(editMode), editor.setDecorations);
    multiCursorState.lastCount = editor.selections.length;
};

const forceDispatchEditorChange = (editor: vscode.TextEditor): void => {
    multiCursorFnContext.editor = editor;
};

const clearSelectionTextBuffer = (editor: vscode.TextEditor, selectionList: readonly D.Numeric.Key.Hex[] = SELECTION_KIND_LIST): void => {
    selectionList.forEach(hexKey => clearBufferOfhexkey(editor.setDecorations, [hexKey]));
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
