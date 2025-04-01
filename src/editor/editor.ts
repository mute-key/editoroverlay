import * as vscode from 'vscode';
import * as Type from '../type/type';
import * as __0x from '../constant/shared/numeric';
import Regex from '../util/regex.collection';
import { HIGHLIGHT_STYLE_SYMBOL_LIST, RENDER_GROUP_SET, SELECTION_KIND } from '../constant/object';
import { bindStatusContentTextState } from './decoration/status/selection';
import { bindDiagnosticContentTextState, diagnosticInfo } from './decoration/status/diagnostic';
import { selectionInfo } from './decoration/status/selection';

const renderGroupSet = {
    ...RENDER_GROUP_SET
} as unknown as Type.RenderGroupSet;

const renderGroupOfKey = (key: number) => renderGroupSet[key]

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
        [__0x.multiCursor]: bindDiagnostic.configOf.displayWhenMultiCursor
    };


    HIGHLIGHT_STYLE_SYMBOL_LIST.forEach(selectionKey => {

        if (SELECTION_KIND[selectionKey]) {
            renderGroupSet[selectionKey] = {
                highlight: selectionKey,
                selection: selection,
                diagnostic: diagonosticAvaliabity[selectionKey] ? diagnostic : undefined
            } as Type.RenderGroupSetProperty;
        }
    });

    return renderGroupSet[__0x.cursorOnly] as Type.RenderGroupSetProperty;
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
    prepareRenderGroup,
    renderGroupIs,
    renderGroupOfKey
};