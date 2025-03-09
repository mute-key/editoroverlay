import * as vscode from 'vscode';
import * as Type from '../type/type';
import {
    regex
} from '../util/util';
import {
    DECORATION_INFO
} from '../constant/object';

const editorIndentOption = (statusInfo: Type.StatusInfoType, editor: vscode.TextEditor): void => {
    statusInfo.indent.size = Number(editor.options.tabSize ?? editor.options.indentSize ?? 4);
    statusInfo.indent.type = editor.options.insertSpaces ? '\n' : '\t';
    statusInfo.indent.regex = editor.options.insertSpaces
        ? regex.indentAndEOLRegex(statusInfo.indent.size)
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

export {
    editorIndentOption,
    getSelectionType
};