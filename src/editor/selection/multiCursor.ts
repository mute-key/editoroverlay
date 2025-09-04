import type * as D from '../../type/type';

import * as vscode from 'vscode';
import * as __0x from '../../constant/shared/numeric';
import { normalizeToEmptySelections, sortSelectionsIfNeeded } from './selectionHelper';
import { colDescriptor, contentTextGetter, nthDescriptor, rangeDescriptor, rangeGetter, setGetterProp } from './renderOption';

export {
    allOccurrence,
    nextOccurrenceInit,
    nextOccurrence,
    cursorOnEndOfLines,
    cursorMovement,
    addCursor,
    stepFuncSignature,
    duplicateEntryStep,
    fnStepDispatcher,
    entryStep,
    ifOnLastSelection,
    finalizeIndexState,
    nthRenderOptionOverride,
    colRenderOptionOverride
};

// const ifDuplicateIndexIsNotlast = (duplicateEntryIdx: number): boolean => LineSelectionBuffer.length > multiCursorState.duplicateEntryIdx + 1;

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
        + (selectionLength === 1 && calibration === 0 ? __0x.MULTI_CURSOR_SELECTION_FLAG.INIT as D.Numeric.Key.Bin : 0) as D.Numeric.Key.Bin;
};


const pushMultiCursorOption = (selectionBuffer, overlay, cursorIndex, context) => (contentText: any, idx: number): void => {
    let contentTextBuffer = contentText;

    if (context.positionList.find((e) => e === idx) !== undefined) {
        contentTextBuffer = { ...contentText };
        contentTextBuffer.after = {
            ...contentText.after,
            baseIndex: context.baseIndex,
            indexList: [cursorIndex],
        };

        setGetterProp(contentTextBuffer.after, contentTextGetter, nthDescriptor);

        // this references are to reduce the search step for the 
        // array object for the post process
        context.baseIndex = contentTextBuffer.after.baseIndex;
        context.indexList = contentTextBuffer.after.indexList;
        overlay.indexListRefBuffer.push(context.indexList);
    }

    const renderOption = {
        selectionBufferIndex: selectionBuffer.length - 1,
        selectionBuffer: selectionBuffer,
        renderOptions: contentTextBuffer
    };

    setGetterProp(renderOption, rangeGetter, rangeDescriptor);
    context.renderOption[idx].push(renderOption);
};

const multiCursorIndexControl = (state: D.Selection.Intf.MultiCursorState, context): boolean => {

    state.duplicateOverlayIndex = state.lineBuffer.get(state.currentLine);

    const dispatcher = fnStepDispatcher(state, context);

    if (state.duplicateOverlayIndex !== undefined) {
        const signature = duplicateLineSignature(state.duplicateOverlayIndex, state.overlay.calibration, state.baseLine, state.currentLine, state.previousLine, state.lineBuffer.size);
        const fnStep = duplicateEntryStep[signature];
        fnStep.forEach(dispatcher);
        return true;
    }

    const signature = nonDuplicateLineSignature(state.selectionBuffer.length, state.baseLine, state.currentLine, state.overlay.calibration);
    entryStep[signature].forEach(dispatcher);
    return false;
};


const multiCursorTextDecoration = (state: D.Selection.Intf.MultiCursorState, context: any): void => {
    if (multiCursorIndexControl(state, context)) {
        finalizeIndexState(state);
        return; // end of function
    }

    state.lineBuffer.set(state.currentLine, state.overlayIndex);
    finalizeIndexState(state);
    context.contentText.forEach(pushMultiCursorOption(state.selectionBuffer, state.overlay, state.cursorIndex, context));
};

const multiCursorEditDecoration = (state: D.Selection.Intf.MultiCursorState, context: D.Selection.Tp.LineHandlerContext): void => {
    if (multiCursorIndexControl(state, context)) {
        finalizeIndexState(state);
        return; // EOF 
    }

    state.lineBuffer.set(state.currentLine, state.cursorIndex);
    finalizeIndexState(state);
    context.contentText.forEach(pushMultiCursorOption(state.selectionBuffer, state.overlay, state.cursorIndex, context));
};

const decoratorBinder = (selection, decorator: typeof multiCursorTextDecoration | typeof multiCursorEditDecoration, state, context) => {
    state.currentLine = selection.end.line;
    state.selectionBuffer.push(selection);
    context.statusFnChain.forEach(context.accumulate);
    decorator(state, context);
};

const cursorOnEndOfLines = (state, context): void => {
    normalizeToEmptySelections(context.lineFn.editor);
    decoratorBinder(context.lineFn.editor.selections[0], multiCursorEditDecoration, state, context);
    decoratorBinder(context.lineFn.editor.selections[1], multiCursorEditDecoration, state, context);
};

const cursorMovement = (state, context): void => {
    // decoratorBinder(context.lineFn.editor.selections[state.lastCount], multiCursorEditDecoration, state, context);
};

const addCursor = (state, context) => {
    console.log('addCursor', state.lastCount);
    decoratorBinder(context.lineFn.editor.selections[state.lastCount], multiCursorEditDecoration, state, context);
    // sortSelectionsIfNeeded(context.lineFn.editor);
    // normalizeToEmptySelections(context.lineFn.editor);
    // addMultiCursorEdit(state, context);
};

const allOccurrence = (state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.TextContext): void => {
    sortSelectionsIfNeeded(context.lineFn.editor) && context.lineFn.editor.selections.forEach((selection: vscode.Selection) => {
        decoratorBinder(selection, multiCursorTextDecoration, state, context);
    });
};

const nextOccurrenceInit = (state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.TextContext): void => {
    decoratorBinder(context.lineFn.editor.selections[0], multiCursorTextDecoration, state, context);
    decoratorBinder(context.lineFn.editor.selections[1], multiCursorTextDecoration, state, context);
};

const nextOccurrence = (state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.TextContext): void => {
    decoratorBinder(context.lineFn.editor.selections[state.lastCount], multiCursorTextDecoration, state, context);
};

const finalizeIndexState = (state: D.Selection.Intf.MultiCursorState): void => {
    state.previousLine = state.currentLine;
    state.cursorIndex++;
    state.overlayIndex++;
};

const ifOnLastSelection = (selectionIndex: number, currentLine: number, lastLine: number): boolean => {
    return selectionIndex > 0 && currentLine === lastLine;
};

const pushCursorIndex = {
    sign: __0x.overlayControl,
    body: (overlay: D.Selection.Intf.MultiCursorOverlay, indexList: number[]): void => {
        let l = overlay.calibration;
        while (l--) {
            overlay.baseIndexRefBuffer[l][0] += 1;
        }
    }
};

/** push baseIndex value array reference into the overlay state buffer */
const pushCursorGroup = {
    sign: __0x.baseIndexControl,
    body: (overlay: D.Selection.Intf.MultiCursorOverlay, baseIndex: number[]): void => {
        overlay.baseIndexRefBuffer.push(baseIndex);
    }
};

const appendNthIndex = {
    sign: __0x.indexListControl,
    body: (index: number = 0, indexList: number[]): void => {
        indexList.push(index + 1);
    }
};

const prependNthIndex = {
    sign: __0x.indexListControl,
    body: (index: number = 0, indexList: number[]): void => {
        indexList.unshift(indexList[0] - 1);
    }
};

const prependNthLastIndex = {
    sign: __0x.indexListControl,
    body: (indexPadding: number = 0, indexList: number[]): void => {
        appendNthIndex.body(indexList[indexList.length - 1] + indexPadding, indexList);
    }
};

const resetOverlayIndex = {
    sign: __0x.stateOnlyControl,
    body: (state: D.Selection.Intf.MultiCursorState) => {
        state.overlayIndex = 1;
        state.baseLine = state.currentLine;
    }
};

const increaseCalibration = {
    sign: __0x.overlayControl,
    body: (overlay, ctx) => {
        overlay.calibration++;
    }
};

const createBaseIndex = {
    sign: __0x.contextOnlyControl,
    body: (ctx) => {
        ctx.baseIndex = [0];
    }
};

const resetCurrentIndex = {
    sign: __0x.stateOnlyControl,
    body: (state: D.Selection.Intf.MultiCursorState) => {
        state.cursorIndex = 0;
    }
};

const equalizeLineState = {
    sign: __0x.stateOnlyControl,
    body: (state: D.Selection.Intf.MultiCursorState) => {
        state.baseLine = state.currentLine;
    }
};

const allocateIndexList = {
    sign: __0x.stateContextControl,
    body: (state, ctx) => {
        ctx.indexList = state.overlay.indexListRefBuffer[state.duplicateOverlayIndex];
    }
};

const duplicateEntryStep = {
    [/* 05 */ __0x.recurringLine0]: [appendNthIndex],
    [/* 01 */ __0x.recurringLine1]: [pushCursorIndex, pushCursorGroup, appendNthIndex],
    [/* 12 */ __0x.recurringLine2]: [pushCursorGroup, appendNthIndex],
    [/* 04 */ __0x.recurringLine3]: [pushCursorGroup, pushCursorIndex, (indexList: number[]) => prependNthLastIndex.body(-1, indexList)],
    [/* 08 */ __0x.recurringLine4]: [appendNthIndex],
    [/* 06 */ __0x.recurringLine5]: [(indexList: number[]) => prependNthLastIndex.body(1, indexList), pushCursorIndex,],
    [/* 10 */ __0x.recurringLine6]: [pushCursorIndex, appendNthIndex],
    [/* 14 */ __0x.recurringLine7]: [pushCursorIndex, appendNthIndex],
    [/* 18 */ __0x.recurringLine8]: [allocateIndexList, prependNthIndex, pushCursorIndex], // #FIX
    [/* 20 */ __0x.recurringLine9]: [increaseCalibration, pushCursorIndex, createBaseIndex, pushCursorGroup, resetCurrentIndex, equalizeLineState, allocateIndexList, prependNthIndex]
};

const initBaseIndex = {
    sign: __0x.overlayControl,
    body: (overlay, ctx) => {
        ctx.baseIndex = [overlay.calibration];
    }
};

const entryStep: Record<D.Numeric.Key.Bin, any[]> = {
    [/* _0 */ __0x.nonRecurringLine0]: [],
    [/* _1 */ __0x.nonRecurringLine1]: [increaseCalibration, pushCursorIndex, createBaseIndex, pushCursorGroup, resetCurrentIndex, equalizeLineState],
    [/* _2 */ __0x.nonRecurringLine2]: [pushCursorIndex],
    [/* _3 */ __0x.nonRecurringLine3]: [createBaseIndex, pushCursorIndex, resetCurrentIndex, equalizeLineState],
    [/* 32 */ __0x.nonRecurringLine4]: [initBaseIndex, pushCursorGroup],
};

const stepFuncSignature: Record<number, any> = {
    [/* 578 */ __0x.stateOnlyControl]: (fn, state) => fn(state),
    [/* 580 */ __0x.contextOnlyControl]: (fn, ctx) => fn(ctx),
    [/* 577 */ __0x.stateContextControl]: (fn, state, ctx) => fn(state, ctx),
    [/* 579 */ __0x.overlayControl]: (fn, state, ctx) => fn(state.overlay, ctx),
    [/* 581 */ __0x.indexListControl]: (fn, state, ctx) => fn(state.cursorIndex, ctx.indexList),
    [/* 583 */ __0x.baseIndexControl]: (fn, state, ctx) => fn(state.overlay, ctx.baseIndex),
};

const fnStepDispatcher = (state: D.Selection.Intf.MultiCursorState, context) => (fn: any): void => {
    return (fn.sign & __0x.isSttCtxFnSign)
        ? stepFuncSignature[fn.sign](fn.body, state, context)
        : (fn.sign & __0x.sttOrCtxFnSign)
            ? stepFuncSignature[fn.sign](fn.body, state)
            : stepFuncSignature[fn.sign](fn.body, context);
};

const nthRenderOptionOverride = (contentText: vscode.DecorationInstanceRenderOptions & any, context): void => {
    contentText.after = {
        ...contentText.after, baseIndex: [0], indexList: [],
    };

    setGetterProp(contentText.after, contentTextGetter, nthDescriptor);
    context.baseIndex = contentText.after.baseIndex;
    context.indexList = contentText.after.indexList;
};

const colRenderOptionOverride = (contentText: vscode.DecorationInstanceRenderOptions & any, context): void => {
    contentText.after = {
        ...contentText.after, column: [],
    };

    setGetterProp(contentText.after, contentTextGetter, colDescriptor);
    context.columnList = contentText.after.column;
};
