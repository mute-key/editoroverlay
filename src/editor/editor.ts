import * as vscode from 'vscode';
import * as Type from '../type/type';
import * as __0x from '../constant/numeric';
import Regex from '../util/regex.collection';
import { HIGHLIGHT_STYLE_SYMBOL_LIST, RENDER_GROUP_SET, SELECTION_KIND } from '../constant/object';
import { bindStatusContentTextState } from './decoration/status/selection';
import { selectionInfo } from './decoration/status/selection';
import { bindDiagnosticContentTextState, diagnosticInfo } from './decoration/status/diagnostic';

const renderGroupSet = {
    ...RENDER_GROUP_SET,
    __proto__: null
} as unknown as Type.RenderGroupSet;

const updateIndentOption = (editor: vscode.TextEditor): void => {
    const bindTo = bindStatusContentTextState();
    bindTo.infoOf.size = Number(editor.options.tabSize ?? editor.options.indentSize ?? 4);
    bindTo.infoOf.type = editor.options.insertSpaces ? '\n' : '\t';
    bindTo.infoOf.regex = editor.options.insertSpaces
        ? Regex.indentAndEOLRegex(bindTo.infoOf.size)
        : Regex.tagtAndEOLRegex;
};

const prepareRenderGroup = (config: Type.ConfigInfoReadyType): Type.RenderGroupSetProperty => {
    const selection = config.generalConfigInfo.selectionTextEnabled ? selectionInfo : undefined;
    const diagnostic = config.generalConfigInfo.diagnosticTextEnabled ? diagnosticInfo : undefined;
    const bindDiagnostic = bindDiagnosticContentTextState();
    const diagonosticAvaliabity = {
        [__0x.cursorOnly]: bindDiagnostic.configOf.displayWhenCursorOnly,
        [__0x.singleLine]: bindDiagnostic.configOf.displayWhenSingleLine,
        [__0x.multiLine]: bindDiagnostic.configOf.displayWhenMultiLine,
        [__0x.multiCursor]: bindDiagnostic.configOf.displayWhenMultiCursor,
        __proto__: null
    };

    HIGHLIGHT_STYLE_SYMBOL_LIST.forEach(selectionKey => {
        if (SELECTION_KIND[selectionKey]) {
            renderGroupSet[selectionKey] = {
                type: SELECTION_KIND[selectionKey],
                selection: selection,
                diagnostic: diagonosticAvaliabity[selectionKey] ? diagnostic : undefined,
                __proto__: null
            } as Type.RenderGroupSetProperty;
        }
    });

    return renderGroupSet[__0x.cursorOnly] as Type.RenderGroupSetProperty;
};


const minifyEditor = (editor: vscode.TextEditor) => {
    
    // editor.document,
    // editor.selection
    // editor.selections
    // // editor.setDecorations
    // editor.document.getText
    // editor.document.lineAt

    // editor.selection.active
    // editor.selection.anchor
    // editor.selection.start
    // editor.selection.end


    // editor.selection.active.line,
    // editor.selection.active.character

    // editor.selection.start.line
    // editor.selection.start.character
    // editor.selection.end.line
    // editor.selection.end.character
    


    
    
};

const renderGroupIs = (editor: vscode.TextEditor): Type.RenderGroupSetProperty => {
    if (editor.selections.length === 1) {
        if (editor.selections[0].isEmpty) {
            return renderGroupSet[__0x.cursorOnly];
        }

        if (!editor.selections[0].isSingleLine) {
            return renderGroupSet[__0x.multiLine];
        } else {
            return renderGroupSet[__0x.singleLine];
        }
    } else {
        return renderGroupSet[__0x.multiCursor];;
    }
};

export {
    updateIndentOption,
    renderGroupIs,
    prepareRenderGroup

};