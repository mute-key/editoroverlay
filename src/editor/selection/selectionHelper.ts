/** 
 * it think its more descrte to hint that reader the function will be 
 * linear, fragment of function chain if the function is/can 
 * be-complete without return statement. 
 * 
 * thie module has collection of the funcitons that to help editor selection references 
 * and direct mutations if they are malformed.
 * 
 * 
 */
import type * as D from '../../type/type';

import * as vscode from 'vscode';
import { createLineSelection } from '../range';

export {
    sortSelection,
    sortSelectionsIfNot,
    normalizeToEmptySelections,
};

/**
 * local type declaration, that should or will strictly stay in this module only
 */
declare namespace L {
    type SelectionMutation = (editor: vscode.TextEditor) => vscode.Selection[];
}

const rangeToCursor = (selection: vscode.Selection): vscode.Selection => createLineSelection(selection.end);

const sortBasedEndLine = (a: vscode.Selection, b: vscode.Selection): number => a.end.line - b.end.line;

const ifRangesNeedSort = (selection: vscode.Selection, index: number, selections: readonly vscode.Selection[]): boolean => index === 0 || selections[index - 1] <= selection;

const isEmptyRange = (selection: vscode.Selection): boolean => selection.isEmpty;

const sortSelection: L.SelectionMutation = (editor: vscode.TextEditor): vscode.Selection[] =>  editor.selections = [...editor.selections].sort(sortBasedEndLine);

const toEmptySelections: L.SelectionMutation = (editor: vscode.TextEditor): vscode.Selection[] => editor.selections = editor.selections.map(rangeToCursor);

const hasEmptyRange = (selections: readonly vscode.Selection[]): boolean => selections.find(isEmptyRange) !== undefined;

const sortSelectionsIfNot = (editor: vscode.TextEditor): boolean => {
    if (editor.selections.every(ifRangesNeedSort)) {
        mutateSelections(editor, sortSelection);
        return true;
    }
    return false;
};

const normalizeToEmptySelections = (editor: vscode.TextEditor) : boolean => {
    if (hasEmptyRange(editor.selections)) {
        mutateSelections(editor, toEmptySelections);
        return true;
    }
    return false;
};

const mutateSelections = async (editor: vscode.TextEditor, resolve: L.SelectionMutation) => await resolve(editor);