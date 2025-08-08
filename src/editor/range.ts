import * as vscode from 'vscode';

const rangeMetadata = {
    diagnosticLineDelta: 1,
    autoInlineDatumPoint: 0,
    datumPointOfEditor: 0
};

const setAutoInlineDatumPoint = (percentage: number): number => rangeMetadata.autoInlineDatumPoint = percentage;

const updateRangeMetadata = (editor: vscode.TextEditor): void => {
    let lc = editor.document.lineCount;
    const length: number[] = [];
    while (lc--) {
        length.push(editor.document.lineAt(lc).range.end.character);
    }
    rangeMetadata.datumPointOfEditor = Math.ceil(Math.max(...length) * (rangeMetadata.autoInlineDatumPoint / 100));
};

/**
 * true if nextline range exceed range datum range
 * false if nextline does not exceed datum range
 * 
 * @param editor 
 * @returns 
 */
const checkRangeLengthDatum = (editor: vscode.TextEditor, delta: number): boolean => {
    const nextLineLength = editor.document.lineAt(editor.selection.end.line + delta).range.end.character;
    const currentLineLineLength = editor.document.lineAt(editor.selection.end.line).range.end.character;
    return (nextLineLength > currentLineLineLength) && (nextLineLength > rangeMetadata.datumPointOfEditor);
};

/**
 * true if end line of the editor
 * false if not end line of the editor
 * 
 * @param editor 
 * @returns 
 */
const checkEndOfDocDelta = (editor: vscode.TextEditor, delta: number): boolean => ((editor.selection.end.line + delta) === editor.document.lineCount);

const createRangeNNNN = (startLine: number, startChar: number, endLine: number, endChar: number): vscode.Range =>
    new vscode.Range(new vscode.Position(startLine, startChar), new vscode.Position(endLine, endChar));

const createRangeSPEP = (start: vscode.Position, end: vscode.Position): vscode.Range =>
    new vscode.Range(start, end);

const createRangeNNEP = (line: number, startChar: number, end: vscode.Position): vscode.Range =>
    new vscode.Range(new vscode.Position(line, startChar), end);

const createCursorRange = (editor: vscode.TextEditor): vscode.Range => {
    const position = new vscode.Position(editor.selection.end.line, editor.selection.end.character);
    return new vscode.Range(position, position);
};

const createCursorRangeLine = (lineDelta: number) => (editor: vscode.TextEditor): vscode.Range => {
    return editor.document.lineAt(editor.selection.end.line + (checkEndOfDocDelta(editor, lineDelta) ? 0 : rangeMetadata.diagnosticLineDelta)).range;
};

const createCursorRangeLineAuto = (lineDelta: number) => (editor: vscode.TextEditor): vscode.Range => {
    return editor.document.lineAt(editor.selection.end.line + (checkEndOfDocDelta(editor, lineDelta) ? 0 : checkRangeLengthDatum(editor, lineDelta) ? 0 : 1)).range;
};

const createLineRange = (position: vscode.Position): vscode.Range =>
    new vscode.Range(position, position);

const createStartEndRangeOfSelection = (selection: vscode.Selection): vscode.Range =>
    createRangeSPEP(selection.start, selection.end);

const blankRange = [] as vscode.Range[];

const lineCountOfRange = (selection: vscode.Range | vscode.Selection): boolean => selection.isSingleLine;

export {
    createRangeNNNN,
    createRangeSPEP,
    createRangeNNEP,
    createCursorRange,
    createLineRange,
    createCursorRangeLine,
    createCursorRangeLineAuto,
    createStartEndRangeOfSelection,
    blankRange,
    updateRangeMetadata,
    setAutoInlineDatumPoint
};