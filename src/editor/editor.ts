import * as vscode from 'vscode';
import * as Type from '../type/type';
import Regex from '../util/regex.collection';

const editorIndentOption = (editor?: vscode.TextEditor): Type.IndentType => {
    const indentSize = Number(editor?.options.tabSize ?? editor?.options.indentSize ?? 4);
    const indentType = editor?.options.insertSpaces ? '\n' : '\t';
    const editorRegex = editor?.options.insertSpaces
        ? Regex.indentAndEOLRegex(indentSize)
        : Regex.tagtAndEOLRegex;

    return {
        size: indentSize ? indentSize : undefined,
        type: indentType ? indentType : undefined,
        regex: editorRegex ? editorRegex : undefined
    };
};

const updateIndentOption = (editor: vscode.TextEditor, indent: Type.IndentReadyType): void => {
    indent.size = Number(editor.options.tabSize ?? editor.options.indentSize ?? 4);
    indent.type = editor.options.insertSpaces ? '\n' : '\t';
    indent.regex = editor.options.insertSpaces
        ? Regex.indentAndEOLRegex(indent.size)
        : Regex.tagtAndEOLRegex;
};

export {
    editorIndentOption,
    updateIndentOption,
};