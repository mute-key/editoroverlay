import * as vscode from 'vscode';
import * as Type from '../type/type';
import * as __0x from '../constant/shared/numeric';
import * as regex from '../util/regex.collection';
import { DECORATION_STATE, SELECTION_KIND_LIST } from '../constant/shared/object';
import { bindStatusContentTextState, clearSelectionTextBuffer } from './status/selection';
import { clearDiagnosticText, diagnosticInfo } from './status/diagnostic';
import { cursorOnlyHighlightRange, singelLineHighlightRange, multiLineHighlightRange, multiCursorHighlightRange, clearEveryHighlight } from './highlight/highlight';
import { cursorOnlySelection, singleLineSelection, multilineSelection, multiCursorSelection } from './status/selection';
import { blankRange } from './range';

const decorationState = { ...DECORATION_STATE };

const createEditorDecorationType = (styleAppliedConfig: any): vscode.TextEditorDecorationType => vscode.window.createTextEditorDecorationType(styleAppliedConfig as vscode.DecorationRenderOptions);;

const applyDecoration = (setDecorations: vscode.TextEditor['setDecorations'], decoraiton: vscode.TextEditorDecorationType, range: vscode.Range[]): void => setDecorations(decoraiton, range);

const resetDecoration = (setDecorations: vscode.TextEditor['setDecorations']) => (decoration: vscode.TextEditorDecorationType) => setDecorations(decoration, blankRange);

const clearDecorationState = (decorationState) => {
    decorationState.eventTrigger[0] = __0x.noEvent;
    decorationState.appliedHighlight[0] = __0x.cursorOnly;
    decorationState.diagnosticSignature[0] = __0x.allOkOverride;
};

const clearAll = (editor: vscode.TextEditor): void => {
    clearEveryHighlight(editor);
    clearSelectionTextBuffer(editor);
    clearDiagnosticText(editor.setDecorations, decorationState.diagnosticSignature);
};

const resetAllDecoration = () => vscode.window.visibleTextEditors.forEach(clearAll);

const updateIndentOption = (editor: vscode.TextEditor): void => {
    const bindTo = bindStatusContentTextState();
    bindTo.infoOf.size = Number(editor.options.tabSize ?? editor.options.indentSize ?? 4);
    bindTo.infoOf.type = editor.options.insertSpaces ? '\n' : '\t';
    bindTo.infoOf.regex = editor.options.insertSpaces
        ? regex.indentAndEOLRegex(bindTo.infoOf.size)
        : regex.tagtAndEOLRegex;
};

const prepareRenderGroup = (config: Type.ConfigInfoReadyType): void => {
    renderFnStack[__0x.cursorOnly].splice(0);
    renderFnStack[__0x.singleLine].splice(0);
    renderFnStack[__0x.multiLine].splice(0);
    renderFnStack[__0x.multiCursor].splice(0);

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

        if (config.generalConfigInfo.diagnosticTextEnabled && (numKey === __0x.cursorOnly || numKey === __0x.singleLine)) {
            callList.push(editModeCheck);
        } else {
            callList.push(diagnosticInfo(decorationState));
        }

        renderFnStack[numKey].push(...callList);
    });
};

const editModeCheck = (editor: vscode.TextEditor) => {
    if (editor.selections[0].start.line !== decorationState.previousLine[0]) {
        diagnosticInfo(decorationState)(editor);
    }
    decorationState.previousLine[0] = editor.selections[0].start.line;
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
        renderFnStack[__0x.multiCursor].forEach(fnBind);
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
    resetDecoration
};
