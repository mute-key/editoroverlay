import * as vscode from 'vscode';
import * as Type from '../type/type';
import * as __0x from '../constant/shared/numeric';
import Regex from '../util/regex.collection';
import { HIGHLIGHT_STYLE_SYMBOL_LIST, RENDER_GROUP_SET, SELECTION_KIND } from '../constant/object';
import { bindStatusContentTextState } from './decoration/status/selection';
import { bindDiagnosticContentTextState, diagnosticInfo } from './decoration/status/diagnostic';
import { selectionInfo } from './decoration/status/selection';
import { cursorOnlyHighlightRange, singelLineHighlightRange, multiLineHighlightRange, multiCursorHighlightRange } from './decoration/highlight/highlight'
import { cursorOnlySelection, singleLineSelection, multilineSelection, multiCursorSelection } from './decoration/status/selection'

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

const cursorOnlyRenderGroup = (previousKey) => {
    cursorOnlyHighlightRange(previousKey)
    cursorOnlySelection()
}

const singleLineRenderGoup = (previousKey) => {
    singelLineHighlightRange(previousKey)
    singleLineSelection()
}

const multiLineRenderGroup = (previousKey) => {
    multiLineHighlightRange(previousKey)
    multilineSelection()
}

const multiCursorRenderGroup = (previousKey) => {
    multiCursorHighlightRange(previousKey)
    multiCursorSelection()
}

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
    const renderGroupBind = {
        [__0x.cursorOnly]: cursorOnlyRenderGroup,
        [__0x.singleLine]: singleLineRenderGoup,
        [__0x.multiLine]: multiLineRenderGroup,
        [__0x.multiCursor]: multiCursorRenderGroup,
    };

    HIGHLIGHT_STYLE_SYMBOL_LIST.forEach(selectionKey => {

        if (SELECTION_KIND[selectionKey]) {
            renderGroupSet[selectionKey] = renderGroupBind[selectionKey];

            // () => {
                // as Type.RenderGroupSetProperty
                // highlight: selectionKey,
                // selection: selection,
                // diagnostic: diagonosticAvaliabity[selectionKey] ? diagnostic : undefined
            // };
        }
    });

    return renderGroupSet[__0x.cursorOnly] as Type.RenderGroupSetProperty;
};

const renderGroupIs = (editor: vscode.TextEditor, previousKey: number) => {
    if (editor.selections.length === 1) {
        if (editor.selections[0].isEmpty) {
            renderGroupSet[__0x.cursorOnly](previousKey);
            return __0x.cursorOnly;
        }

        if (!editor.selections[0].isSingleLine) {
            renderGroupSet[__0x.multiLine](previousKey);
            return __0x.multiLine;
        } else {
            renderGroupSet[__0x.singleLine](previousKey);
            return __0x.singleLine;
        }
    } else {
        renderGroupSet[__0x.multiCursor](previousKey);
        return __0x.multiCursor;
    }
};

export {
    updateIndentOption,
    prepareRenderGroup,
    renderGroupIs,
    renderGroupOfKey
};