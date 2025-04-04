import * as vscode from 'vscode';
import * as Type from '../type/type';
import * as __0x from '../constant/shared/numeric';
import Regex from '../util/regex.collection';
import { DECORATION_STATE, SELECTION_KIND_LIST } from '../constant/shared/object';
import { SELECTION_KIND } from '../constant/config/object';
import { bindStatusContentTextState, clearSelectionTextBuffer } from './decoration/status/selection';
import { bindDiagnosticContentTextState, diagnosticInfo } from './decoration/status/diagnostic';
import { cursorOnlyHighlightRange, singelLineHighlightRange, multiLineHighlightRange, multiCursorHighlightRange, clearEveryHighlight } from './decoration/highlight/highlight'
import { cursorOnlySelection, singleLineSelection, multilineSelection, multiCursorSelection } from './decoration/status/selection'

const decorationState = {
    ...DECORATION_STATE,
    __proto__: null,
} as unknown as Type.DecorationStateType;

const updateIndentOption = (editor: vscode.TextEditor): void => {
    const bindTo = bindStatusContentTextState();
    bindTo.infoOf.size = Number(editor.options.tabSize ?? editor.options.indentSize ?? 4);
    bindTo.infoOf.type = editor.options.insertSpaces ? '\n' : '\t';
    bindTo.infoOf.regex = editor.options.insertSpaces
        ? Regex.indentAndEOLRegex(bindTo.infoOf.size)
        : Regex.tagtAndEOLRegex;
};

const applyDecoration = (setDecorations: vscode.TextEditor['setDecorations'], decoraiton: vscode.TextEditorDecorationType, range: vscode.Range[]): void => setDecorations(decoraiton, range);

const resetAllDecoration = () => {
    vscode.window.visibleTextEditors.forEach(editor => {
        clearEveryHighlight(editor)
        clearSelectionTextBuffer(editor);
    });
};

const createEditorDecorationType = (styleAppliedConfig: any): vscode.TextEditorDecorationType => vscode.window.createTextEditorDecorationType(styleAppliedConfig as vscode.DecorationRenderOptions);;

const clearDecorationState = (decorationState: Type.DecorationStateType) => {
    decorationState.appliedHighlight[0] = __0x.reset;
};

const prepareRenderGroup = (config: Type.ConfigInfoReadyType): void => {
    const bindDiagnostic = bindDiagnosticContentTextState();
    const diagonosticAvaliabity = {
        [__0x.cursorOnly]: bindDiagnostic.configOf.displayWhenCursorOnly,
        [__0x.singleLine]: bindDiagnostic.configOf.displayWhenSingleLine,
        [__0x.multiLine]: bindDiagnostic.configOf.displayWhenMultiLine,
        [__0x.multiCursor]: bindDiagnostic.configOf.displayWhenMultiCursor
    };

    const highlightList = {
        [__0x.cursorOnly]: cursorOnlyHighlightRange,
        [__0x.singleLine]: singelLineHighlightRange,
        [__0x.multiLine]: multiLineHighlightRange,
        [__0x.multiCursor]: multiCursorHighlightRange
    };

    const selectionList = {
        [__0x.cursorOnly]: cursorOnlySelection,
        [__0x.singleLine]: singleLineSelection,
        [__0x.multiLine]: multilineSelection,
        [__0x.multiCursor]: multiCursorSelection
    };

    SELECTION_KIND_LIST.forEach(numKey => {

        const callList: any[] = [];

        callList.push(highlightList[numKey]);

        if (config.generalConfigInfo.selectionTextEnabled) {
            callList.push(selectionList[numKey]);
        }

        if (config.generalConfigInfo.diagnosticTextEnabled && diagonosticAvaliabity[numKey]) {
            callList.push(diagnosticInfo);
        }

        renderFnStack[numKey].push(...callList);
        Object.seal(renderFnStack[numKey]);
    });

    for (const strKey in Object.keys(bindDiagnostic)) {
        delete bindDiagnostic[strKey];
    }
    for (const numKey in Object.keys(highlightList)) {
        delete highlightList[numKey];
    }
    for (const numKey in Object.keys(selectionList)) {
        delete selectionList[numKey];
    }
    for (const numKey in Object.keys(diagonosticAvaliabity)) {
        delete diagonosticAvaliabity[numKey];
    }
};

const renderFnStack = {
    [__0x.cursorOnly]: [] as any[],
    [__0x.singleLine]: [] as any[],
    [__0x.multiLine]: [] as any[],
    [__0x.multiCursor]: [] as any[]
};

const fnList = (editor: vscode.TextEditor, numKey: number[]) => fn => fn(editor, numKey);

const renderGroupIs = (editor: vscode.TextEditor, numKey: number[]): number => {
    const fnBind = fnList(editor, numKey);
    if (editor.selections.length === 1) {
        if (editor.selections[0].isEmpty) {
            renderFnStack[__0x.cursorOnly].forEach(fnBind);
            return __0x.cursorOnly;
        }
        if (!editor.selections[0].isSingleLine) {
            renderFnStack[__0x.multiLine].forEach(fnBind);
            return __0x.multiLine;
        } else {
            renderFnStack[__0x.singleLine].forEach(fnBind);
            return __0x.singleLine;
        }
    } else {
        renderFnStack[__0x.multiCursor].forEach(fnBind)
        return __0x.multiCursor;
    }
};

const bindEditorDecoration = () => {
    return {
        stateOf: decorationState
    };
};

export {
    updateIndentOption,
    clearDecorationState,
    applyDecoration,
    createEditorDecorationType,
    resetAllDecoration,
    prepareRenderGroup,
    renderGroupIs,
    bindEditorDecoration,
};