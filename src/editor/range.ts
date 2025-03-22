import * as vscode from 'vscode';
import * as Type from '../type/type';

// "disabled",
// "IfOutOfVisibleRange",
// "previousLine",
// "nextLine"

const createRangeNNNN = (startLine: number, startChar: number, endLine: number, endChar: number): vscode.Range =>
    new vscode.Range(
        new vscode.Position(startLine, startChar),
        new vscode.Position(endLine, endChar));

const createRangeSPEP = (start: vscode.Position, end: vscode.Position): vscode.Range =>
    new vscode.Range(start, end);

const createRangeNNEP = (line: number, startChar: number, end: vscode.Position): vscode.Range =>
    new vscode.Range(
        new vscode.Position(line, startChar),
        end);

const createCursorRange = (editor: vscode.TextEditor, lineDelta: number = 0): vscode.Range =>
    new vscode.Range(
        new vscode.Position(editor.selection.end.line + lineDelta, editor.selection.end.character),
        new vscode.Position(editor.selection.end.line + lineDelta, editor.selection.end.character));

const createActiveRange = (editor: vscode.TextEditor): vscode.Range =>
    createRangeSPEP(editor.selection.active, editor.selection.active);

const createAnchorRange = (editor: vscode.TextEditor): vscode.Range =>
    createRangeSPEP(editor.selection.anchor, editor.selection.anchor);

const createStartEndRangeOfSelection = (selection: vscode.Selection): vscode.Range =>
    createRangeSPEP(selection.start, selection.end);

const Range = {
    createRangeNNNN: createRangeNNNN,
    createRangeSPEP: createRangeSPEP,
    createRangeNNEP: createRangeNNEP,
    createCursorRange: createCursorRange,
    createActiveRange: createActiveRange,
    createAnchorRange: createAnchorRange,
    createStartEndRangeOfSelection: createStartEndRangeOfSelection,
};

export default Range ;