import * as vscode from 'vscode';
import * as Type from '../type/type';
import Regex from '../util/regex.collection';
import { SELECTION_TYPE } from '../constant/enum';
import { RENDER_GROUP_SET, SELECTION_KIND } from '../constant/object';
import { bindStatusContentTextState } from './decoration/status/selection';
import { selectionInfo } from './decoration/status/selection';
import { bindDiagnosticContentTextState, diagnosticInfo } from './decoration/status/diagnostic';

const renderGroupSet = { ...RENDER_GROUP_SET } as unknown as Type.RenderGroupSet;

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
        [SELECTION_TYPE.CURSOR_ONLY]: bindDiagnostic.configOf.displayWhenCursorOnly,
        [SELECTION_TYPE.SINGLE_LINE]: bindDiagnostic.configOf.displayWhenSingleLine,
        [SELECTION_TYPE.MULTI_LINE]: bindDiagnostic.configOf.displayWhenMultiLine,
        [SELECTION_TYPE.MULTI_CURSOR]: bindDiagnostic.configOf.displayWhenMultiCursor,
    };

    Object.keys(renderGroupSet).forEach(selectionKey => {
        if (SELECTION_KIND[selectionKey]) {
            renderGroupSet[selectionKey] = {
                type: SELECTION_KIND[selectionKey],
                selection: selection,
                diagnostic: diagonosticAvaliabity[selectionKey] ? diagnostic : undefined
            } as Type.RenderGroupSetProperty;
        }
    });

    return renderGroupSet[SELECTION_TYPE.CURSOR_ONLY] as Type.RenderGroupSetProperty;
};

const renderGroupIs = (editor: vscode.TextEditor): Type.RenderGroupSetProperty | undefined => {
    if (editor.selections.length === 1) {
        if (editor.selections[0].isEmpty) {
            return renderGroupSet[SELECTION_TYPE.CURSOR_ONLY];
        }

        if (editor.selections[0].isSingleLine) {
            return renderGroupSet[SELECTION_TYPE.SINGLE_LINE];
        } else {
            return renderGroupSet[SELECTION_TYPE.MULTI_LINE];
        }
    }

    if (editor.selections.length > 1) {
        return renderGroupSet[SELECTION_TYPE.MULTI_CURSOR];;
    }
};

export {
    updateIndentOption,
    renderGroupIs,
    prepareRenderGroup

};