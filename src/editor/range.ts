import * as vscode from 'vscode';


const createRangeNNNN = (startLine: number, startChar: number, endLine: number, endChar: number): vscode.Range => {
    return new vscode.Range(new vscode.Position(startLine, startChar), new vscode.Position(endLine, endChar));
};

const createRangeSPEP = (start: vscode.Position, end: vscode.Position): vscode.Range => {
    return new vscode.Range(start, end);
};

const createRangeNNEP = (line: number, startChar: number, end: vscode.Position): vscode.Range => {
    return new vscode.Range(new vscode.Position(line, startChar), end);
};

export {
    createRangeNNNN,
    createRangeSPEP,
    createRangeNNEP
};