import * as vscode from 'vscode';
import * as Type from './type/type.d';
import {
    regex
} from './util';
import {
    DECORATION_INFO
} from './constant/object';

const editorIndentOption = (config: Type.ConfigInfoReadyType, editor: vscode.TextEditor): void => {
    config.status.indent.size = Number(editor.options.tabSize ?? editor.options.indentSize ?? 4);
    config.status.indent.type = editor.options.insertSpaces ? '\n' : '\t';
    config.status.indent.regex = editor.options.insertSpaces
        ? regex.indentAndEOLRegex(config.status.indent.size)
        : regex.tagtAndEOLRegex;
};

const getSelectionType = (editor: vscode.TextEditor): Type.DecorationInfoPropType | undefined => {

    if (editor.selections.length === 1) {
        if (editor.selections[0].isEmpty) {
            return DECORATION_INFO.CURSOR_ONLY;
        } else {
            if (editor.selections[0].isSingleLine) {
                return DECORATION_INFO.SINGLE_LINE;
            } else {
                return DECORATION_INFO.MULTI_LINE;
            }
        }
    } else if (editor.selections.length > 1) {
        return DECORATION_INFO.MULTI_CURSOR;
    }
};

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
    editorIndentOption,
    getSelectionType,
    createRangeNNNN,
    createRangeSPEP,
    createRangeNNEP,
};