import type * as D from '../../type/type';

import * as vscode from 'vscode';
import * as bin from '../../numeric/bin';
import { normalizeToEmptySelections, sortSelectionsIfNot } from './selectionHelper';
import { rangeDescriptor, rangeGetter, setGetterProp } from './renderOption';
import { dispatchFnStep, duplicateEntryStep, entryStep } from './overlayPosition';

export {
    allOccurrence,
    nextOccurrenceInit,
    nextOccurrence,
    cursorOnEndOfLines,
    cursorMovement,
    addCursor,
    ifOnLastSelection,
    finalizeIndexState,
    firstSelectionAsBaseLine,
    lastSelectionAsBaseLine,
    sortEditorSelection,
    normalizeEditorSelection
};

// const ifDuplicateIndexIsNotlast = (duplicateEntryIdx: number): boolean => LineSelectionBuffer.length > multiCursorState.duplicateEntryIdx + 1;

const duplicateLineSignature = (duplicateEntryIdx: number = -1, calibration: number, baseline: number, currentLine: number, previousLine: number, lineBufferLength: number): D.Numeric.Key.Bin => {
    return (currentLine < baseline ? bin.MULTI_CURSOR_SELECTION_FLAG.TO_SHIFT_INDEX as D.Numeric.Key.Bin : 0)
        + (calibration > 0 ? bin.MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED as D.Numeric.Key.Bin : 0)
        + (currentLine === baseline ? bin.MULTI_CURSOR_SELECTION_FLAG.ON_BASELINE as D.Numeric.Key.Bin : 0)
        + (currentLine === previousLine ? bin.MULTI_CURSOR_SELECTION_FLAG.AS_LAST_SELECTION as D.Numeric.Key.Bin : 0)
        + (lineBufferLength > (duplicateEntryIdx + 1) ? bin.MULTI_CURSOR_SELECTION_FLAG.NOT_AS_LAST_SELECTION as D.Numeric.Key.Bin : 0) as D.Numeric.Key.Bin;
};

const nonDuplicateLineSignature = (selectionLength: number, baseLine: number, currentLine: number, calibration: number): D.Numeric.Key.Bin => {
    return (currentLine < baseLine ? bin.MULTI_CURSOR_SELECTION_FLAG.TO_SHIFT_INDEX as D.Numeric.Key.Bin : 0)
        + (calibration > 0 ? bin.MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED as D.Numeric.Key.Bin : 0)
        + (selectionLength === 1 && calibration === 0 ? bin.MULTI_CURSOR_SELECTION_FLAG.INIT as D.Numeric.Key.Bin : 0) as D.Numeric.Key.Bin;
};

const pushMultiCursorOption = (state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.MultiCursorContext) => (contentText: any, idx: number): void => {
    let contentTextBuffer = contentText;
    const positionData = context.positionList.get(idx);

    if (positionData !== undefined) {
        contentTextBuffer = positionData(contentText, state, context);
    }

    const renderOption = {
        selectionBufferIndex: state.selectionBuffer.length - 1,
        selectionBuffer: state.selectionBuffer,
        renderOptions: contentTextBuffer
    };

    setGetterProp(renderOption, rangeGetter, rangeDescriptor as PropertyDescriptor );
    context.renderOption[idx].push(renderOption);
};

const multiCursorIndexControl = (state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.MultiCursorContext): boolean => {

    state.duplicateOverlayIndex = state.lineBuffer.get(state.currentLine);

    const dispatcher = dispatchFnStep(state, context);

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
    context.contentText.forEach(pushMultiCursorOption(state, context));
};

const multiCursorEditDecoration = (state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.MultiCursorContext): void => {
    if (multiCursorIndexControl(state, context)) {
        finalizeIndexState(state);
        context.columnList?.push(state.selectionBuffer.length - 1);
        return; // end of function
    }

    state.lineBuffer.set(state.currentLine, state.overlayIndex);
    finalizeIndexState(state);
    context.contentText.forEach(pushMultiCursorOption(state, context));
};

const decoratorBinder = (selection: vscode.Selection, decorator: typeof multiCursorTextDecoration | typeof multiCursorEditDecoration, state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.MultiCursorContext) => {
    context.lineFn.idx = state.cursorIndex;
    state.currentLine = selection.end.line;
    state.selectionBuffer.push(selection);
    context.statusFnChain.forEach(context.accumulate);
    decorator(state, context);
};

const decoratorIterator = (decorationKind: typeof multiCursorTextDecoration | typeof multiCursorEditDecoration, state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.MultiCursorContext) => (selection: vscode.Selection): void => {
    decoratorBinder(selection, decorationKind, state, context);
};

const cursorOnEndOfLines = (state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.MultiCursorContext): void => {
    context.lineFn.editor.selections.forEach(decoratorIterator(multiCursorEditDecoration, state, context));
};

const cursorMovement = (state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.MultiCursorContext): void => {
    context.lineFn.editor.selections.forEach(decoratorIterator(multiCursorEditDecoration, state, context));
};

const addCursor = (state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.MultiCursorContext) => {
    decoratorBinder(context.lineFn.editor.selections[state.lastCount], multiCursorEditDecoration, state, context);
};

const allOccurrence = (state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.MultiCursorContext): void => {
    context.lineFn.editor.selections.forEach(decoratorIterator(multiCursorTextDecoration, state, context));
};

const nextOccurrenceInit = (state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.MultiCursorContext): void => {
    decoratorBinder(context.lineFn.editor.selections[0], multiCursorTextDecoration, state, context);
    decoratorBinder(context.lineFn.editor.selections[1], multiCursorTextDecoration, state, context);
};

const nextOccurrence = (state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.MultiCursorContext): void => {
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


const firstSelectionAsBaseLine = (state: D.Selection.Intf.MultiCursorState, context: any): void => {
    state.baseLine = context.lineFn.editor.selection.end.line;
    state.cursorIndex = 0;
};

const lastSelectionAsBaseLine = (state: D.Selection.Intf.MultiCursorState, context: any): void => {
    state.baseLine = context.lineFn.editor.selections[state.lastCount - 1].end.line;
};

const sortEditorSelection = (state: D.Selection.Intf.MultiCursorState, context: any): void => {
    if (sortSelectionsIfNot(context.lineFn.editor)) {
        state.baseLine = context.lineFn.editor.selection.end.line;
        state.currentLine = context.lineFn.editor.selections[context.lineFn.editor.selections.length - 1].end.line;
    }
};

const normalizeEditorSelection = (state: D.Selection.Intf.MultiCursorState, context: any): void => {
    normalizeToEmptySelections(context.lineFn.editor);
};