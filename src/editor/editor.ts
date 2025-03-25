import * as vscode from 'vscode';
import * as Type from '../type/type';
import * as $ from '../constant/symbol';
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
        [$.cursorOnly]: bindDiagnostic.configOf.displayWhenCursorOnly,
        [$.singleLine]: bindDiagnostic.configOf.displayWhenSingleLine,
        [$.multiLine]: bindDiagnostic.configOf.displayWhenMultiLine,
        [$.multiCursor]: bindDiagnostic.configOf.displayWhenMultiCursor,
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

    return renderGroupSet[$.cursorOnly] as Type.RenderGroupSetProperty;
};

function renderGroupIs(editor: vscode.TextEditor): Type.RenderGroupSetProperty {
    // console.log(renderGroupSet)
    if (editor.selections.length === 1) {
        if (editor.selections[0].isEmpty) {
            return renderGroupSet[$.cursorOnly];
        }

        if (!editor.selections[0].isSingleLine) {
            return renderGroupSet[$.multiLine];
        } else {
            return renderGroupSet[$.singleLine];
        }
    } else {
        return renderGroupSet[$.multiCursor];;
    }
};

export {
    updateIndentOption,
    renderGroupIs,
    prepareRenderGroup

};