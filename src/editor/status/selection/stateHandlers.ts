import type * as D from '../../../type/type.d';

import * as vscode from 'vscode';
import * as __0x from '../../../constant/shared/numeric';
import { sortBasedEndLine, hasEmptyRange, ifRangesNeedSort, rangeToCursor } from '../../range';

// const ifDuplicateIndexIsNotlast = (duplicateEntryIdx: number): boolean => LineSelectionBuffer.length > multiCursorState.duplicateEntryIdx + 1;

const pushNthIndexGroup = (state: D.Selection.Intf.MultiCursorState, context: any): void => {
    // context.baseIndex.push(0);
    // context.indexList.push(state.cursorIndex);
};

const increaseIndex = (state: D.Selection.Intf.MultiCursorState): void => {
    state.cursorIndex++;
    state.overlayIndex++;
};

const toEmptySelections = (selections: readonly vscode.Selection[]): vscode.Selection[] => [...selections].map(rangeToCursor);

const sortSelection = (selections: readonly vscode.Selection[]): vscode.Selection[] => [...selections].sort(sortBasedEndLine);

const sortSelectionsIfNeeded = (editor: vscode.TextEditor): boolean => editor.selections.every(ifRangesNeedSort) && mutateSelections(editor, sortSelection);

const normalizeToEmptySelections = (editor: vscode.TextEditor): boolean => hasEmptyRange(editor.selections) && mutateSelections(editor, toEmptySelections);

const mutateSelections = (editor: vscode.TextEditor, mutation: any): boolean => {
    editor.selections = mutation(editor.selections);
    return true;
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

const pushCursorGroup = {
    sign: __0x.overlayControl,
    body: (overlay: D.Selection.Intf.MultiCursorOverlay, baseIndex: number[]): void => {
        overlay.baseIndexRefBuffer.push(baseIndex);
    }
};

const appendNthIndex = {
    sign: __0x.indexOnlyControl,
    body: (index: number = 0, indexList: number[]): void => {
        indexList.push(index + 1);
    }
};

const prependNthIndex = {
    sign: __0x.indexOnlyControl,
    body: (index: number = 0, indexList: number[]): void => {
        indexList.unshift(index + 1);
    }
};

const prependNthLastIndex = {
    sign: __0x.indexOnlyControl,
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


const duplicateEntryStep = {
    [/* 05 */ __0x.recurringLine0]: [appendNthIndex],
    [/* 01 */ __0x.recurringLine1]: [pushCursorIndex, pushCursorGroup, appendNthIndex],
    [/* 12 */ __0x.recurringLine2]: [appendNthIndex],
    [/* 04 */ __0x.recurringLine3]: [pushCursorGroup, pushCursorIndex, (indexList: number[]) => prependNthLastIndex.body(-1, indexList)],
    [/* 08 */ __0x.recurringLine4]: [appendNthIndex],
    [/* 06 */ __0x.recurringLine5]: [(indexList: number[]) => prependNthLastIndex.body(1, indexList), pushCursorIndex,],
    [/* 10 */ __0x.recurringLine6]: [pushCursorIndex, appendNthIndex],
    [/* 14 */ __0x.recurringLine7]: [pushCursorIndex, appendNthIndex],
    [/* 18 */ __0x.recurringLine8]: [pushCursorIndex, prependNthIndex],
    [/* 20 */ __0x.recurringLine9]: [pushCursorGroup, pushCursorIndex, prependNthIndex, resetOverlayIndex]
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

const createBaseIndex = {
    sign: __0x.contextControl,
    body: (overlay, ctx) => {
        ctx.baseIndex = [0];
    }
};

const initBaseIndex = {
    sign: __0x.contextControl,
    body: (overlay, ctx) => {
        ctx.baseIndex = [overlay.calibration];
    }
};


const entryStep: Record<D.Numeric.Key.Bin, any[]> = {
    [/* _0 */ __0x.nonRecurringLine0]: [initBaseIndex],
    [/* _1 */ __0x.nonRecurringLine1]: [increaseCalibration, pushCursorIndex, createBaseIndex, pushCursorGroup, resetCurrentIndex, equalizeLineState],
    [/* _2 */ __0x.nonRecurringLine2]: [pushCursorIndex],
    [/* _3 */ __0x.nonRecurringLine3]: [createBaseIndex, pushCursorIndex, resetCurrentIndex, equalizeLineState],
    [/* 32 */ __0x.nonRecurringLine4]: [pushCursorGroup],
};

const stepFunctionSignature = {
    [/* 576 */ __0x.stateOnlyControl]: (fn, state, ctx) => fn(state),
    [/* 577 */ __0x.indexOnlyControl]: (fn, state, ctx) => fn(state.cursorIndex, ctx.indexList),
    [/* 578 */ __0x.overlayControl]: (fn, state, ctx) => fn(state.overlay, ctx.baseIndex),
    [/* 578 */ __0x.contextControl]: (fn, state, ctx) => fn(state.overlay, ctx),
};

const firstSelectionAsBaseLine = (state: D.Selection.Intf.MultiCursorState, context: any): void => {
    state.baseLine = context.lineFn.editor.selection.end.line;
    state.cursorIndex = 0;
    // state.overlay[state.overlayIndex].buffer.push(0);
};

const lastSelectionAsBaseLine = (state: D.Selection.Intf.MultiCursorState, context: any): void => {
    state.baseLine = context.lineFn.editor.selections[context.lineFn.editor.selections.length - 1].end.line;
};

const nthRenderOptionOverride = (contentText: vscode.DecorationInstanceRenderOptions & any, context): void => {
    const addBaseIndex = (baseIndex: number[]) => (i: number) => {
        return Number(i) + Number(baseIndex[0]);
    };

    contentText.after = {
        ...contentText.after,
        baseIndex: [],
        indexList: [],
        get contentText() {
            return this.indexList.map(addBaseIndex(this.baseIndex)).join(',');
        },
    };

    context.baseIndex = contentText.after.baseIndex;
    context.indexList = contentText.after.indexList;
};

const colRenderOptionOverride = (contentText: vscode.DecorationInstanceRenderOptions & any, context): void => {
    contentText.after = {
        ...contentText.after,
        column: [],
        get contentText() {
            return this.column.join(', ');
        },
    };

    context.columnList = contentText.after.column;
};

const fnStepDispatchBinder = (state: D.Selection.Intf.MultiCursorState, context) => (fn: any): void => {
    // console.log(fn.sign);
    return stepFunctionSignature[fn.sign](fn.body, state, context);
};

export {
    stepFunctionSignature,
    duplicateEntryStep,
    fnStepDispatchBinder,
    entryStep,
    firstSelectionAsBaseLine,
    lastSelectionAsBaseLine,
    ifOnLastSelection,
    pushNthIndexGroup,
    increaseIndex,
    sortSelectionsIfNeeded,
    normalizeToEmptySelections,
    nthRenderOptionOverride,
    colRenderOptionOverride
};