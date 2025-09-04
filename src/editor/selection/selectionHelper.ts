import type * as D from '../../type/type';

import * as vscode from 'vscode';
import { createLineSelection, hasEmptyRange } from '../range';

export {
    sortSelectionsIfNeeded,
    normalizeToEmptySelections,
    firstSelectionAsBaseLine,
    lastSelectionAsBaseLine,
};

const firstSelectionAsBaseLine = (state: D.Selection.Intf.MultiCursorState, context: any): void => {
    state.baseLine = context.lineFn.editor.selection.end.line;
    state.cursorIndex = 0;
};

const lastSelectionAsBaseLine = (state: D.Selection.Intf.MultiCursorState, context: any): void => {
    state.baseLine = context.lineFn.editor.selections[state.lastCount - 1].end.line;
};

const rangeToCursor = (selection: vscode.Selection) => createLineSelection(selection.end);

const sortBasedEndLine = (a: vscode.Selection, b: vscode.Selection): number => a.end.line - b.end.line;

const ifRangesNeedSort = (selection: vscode.Selection, index: number, selections: readonly vscode.Selection[]): boolean => (index === 0) || selections[index - 1] <= selection;

const toEmptySelections = (selections: readonly vscode.Selection[]): vscode.Selection[] => [...selections].map(rangeToCursor);

const sortSelection = (selections: readonly vscode.Selection[]): vscode.Selection[] => [...selections].sort(sortBasedEndLine);

const sortSelectionsIfNeeded = (editor: vscode.TextEditor): boolean => editor.selections.every(ifRangesNeedSort) && mutateSelections(editor, sortSelection);

const normalizeToEmptySelections = (editor: vscode.TextEditor): boolean => hasEmptyRange(editor.selections) && mutateSelections(editor, toEmptySelections);

const mutateSelections = (editor: vscode.TextEditor, mutation: any): boolean => {
    editor.selections = mutation(editor.selections);
    return true;
};