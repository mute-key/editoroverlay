import * as vscode from 'vscode';

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

const createCursorRange = (editor: vscode.TextEditor): vscode.Range => {
    const position = new vscode.Position(editor.selection.end.line, editor.selection.end.character)
    return new vscode.Range(position, position);
}

const createCursorRangePreviousLine = (editor: vscode.TextEditor, lineDelta: number = 1): vscode.Range => {
    const endLine = editor.selection.end.line;
    const position = new vscode.Position(editor.selection.start.line !== 0 ? endLine - lineDelta : endLine, editor.selection.end.character)
    return new vscode.Range(position, position);
}

const createCursorRangeNextLine = (editor: vscode.TextEditor, lineDelta: number = 1): vscode.Range => {
    const position = new vscode.Position(editor.selection.end.line + lineDelta, editor.selection.end.character);
    return new vscode.Range(position, position);
}

const createLineRange = (position: vscode.Position): vscode.Range =>
    new vscode.Range(position, position);

const createStartEndRangeOfSelection = (selection: vscode.Selection): vscode.Range =>
    createRangeSPEP(selection.start, selection.end);

// const blankRange = Object.seal([] as vscode.Range[]);
const blankRange = [] as vscode.Range[];

export {
    createRangeNNNN,
    createRangeSPEP,
    createRangeNNEP,
    createCursorRange,
    createLineRange,
    createCursorRangeNextLine,
    createCursorRangePreviousLine,
    createStartEndRangeOfSelection,
    blankRange
};