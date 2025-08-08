import * as vscode from 'vscode';
import * as __0x from '../constant/shared/numeric';
import * as regex from '../collection/regex';
import { DECORATION_STATE, SELECTION_KIND_LIST } from '../constant/shared/object';
import { bindStatusContentTextState, clearSelectionTextBuffer } from './status/selection';
import { clearDiagnosticText, diagnosticInfo } from './status/diagnostic';
import { cursorOnlyHighlightRange, singelLineHighlightRange, multiLineHighlightRange, multiCursorHighlightRange, clearEveryHighlight } from './highlight/highlight';
import { cursorOnlySelection, singleLineSelection, multilineSelection, multiCursorSelection } from './status/selection';
import { blankRange, updateRangeMetadata } from './range';

import type * as D from '../type/type.d';

const decorationState = { ...DECORATION_STATE } as unknown as D.Decoration.Intf.State;

const createEditorDecorationType = (styleAppliedConfig: any): vscode.TextEditorDecorationType => vscode.window.createTextEditorDecorationType(styleAppliedConfig as vscode.DecorationRenderOptions);;

const applyDecoration = (setDecorations: vscode.TextEditor['setDecorations'], decoraiton: vscode.TextEditorDecorationType, range: vscode.Range[]): void => setDecorations(decoraiton, range);

/**
 * [ self-explantory ]
 * can be used for callback for high-order function or direct function call
 * 
 * 
 * @param setDecorations 
 * @returns 
 */
const resetDecoration = (setDecorations: vscode.TextEditor['setDecorations']) => (decoration: vscode.TextEditorDecorationType) => setDecorations(decoration, blankRange);

/**
 * I assuemd using array to store value in object would be faster than mutating the object as it would be a reference.
 * at this point, i am not sure if there is a significant advantage, however this respond smoother in my experience so far. 
 * maybe drop the array in future but keeping it as is for now.
 * 
 */
const clearDecorationState = (decorationState: D.Decoration.Intf.State): void => {
    decorationState.eventTrigger[0] = __0x.noEvent;
    decorationState.appliedHighlight[0] = __0x.cursorOnly;
    decorationState.diagnosticSignature[0] = __0x.allOkOverride;
};

const clearAll = (editor: vscode.TextEditor): void => {
    clearEveryHighlight(editor);
    clearSelectionTextBuffer(editor);
    clearDiagnosticText(editor.setDecorations);
};

const resetAllDecoration = (): void => vscode.window.visibleTextEditors.forEach(clearAll);

/**
 * when a user change indent option of the viewing editor
 * 
 * @param editor 
 */
const updateIndentOption = (editor: vscode.TextEditor): void => {
    const bindTo = bindStatusContentTextState();
    bindTo.infoOf.size = Number(editor.options.tabSize ?? editor.options.indentSize ?? 4);
    bindTo.infoOf.type = editor.options.insertSpaces ? '\n' : '\t';
    bindTo.infoOf.regex = editor.options.insertSpaces
        ? regex.indentAndEOLRegex(bindTo.infoOf.size)
        : regex.tabAndEOLRegex;
};

/**
 * build render function list.
 * 
 * @param config 
 */
const prepareRenderGroup = (config: D.Config.Intf.ConfigReady): void => {
    renderFnStack[__0x.cursorOnly].splice(0);
    renderFnStack[__0x.singleLine].splice(0);
    renderFnStack[__0x.multiLine].splice(0);
    renderFnStack[__0x.multiCursor].splice(0);

    const highlightList: D.Editor.Intf.RenderGroup = {
        [__0x.cursorOnly]: cursorOnlyHighlightRange,
        [__0x.singleLine]: singelLineHighlightRange,
        [__0x.multiLine]: multiLineHighlightRange,
        [__0x.multiCursor]: multiCursorHighlightRange
    };

    const selectionList: D.Editor.Intf.RenderGroup = {
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
        } else if (config.generalConfigInfo.diagnosticTextEnabled) {
            callList.push(diagnosticInfo(decorationState));
        }

        renderFnStack[numKey].push(...callList);
    });
};

/**
 * this is for; if selection change event trigged but the event is triggered by user typing by 
 * tracking the selection line that previously triggered selection change event.
 * this is because the diagnostic block could be re-rendered twice by selection change event
 * as well as dignostic change event.
 * 
 * @param editor 
 */
const editModeCheck = (editor: vscode.TextEditor): void => {
    if (editor.selections[0].start.line !== decorationState.previousLine[0]) {
        diagnosticInfo(decorationState)(editor);
    }

    if (editor.document.isDirty) {
        updateRangeMetadata(editor);
    }

    decorationState.previousLine[0] = editor.selections[0].start.line;
};

/**
 * buffer for rendering function call stack
 */
const renderFnStack: Record<number, any[]> = {
    [__0x.cursorOnly]: [] as any[],
    [__0x.singleLine]: [] as any[],
    [__0x.multiLine]: [] as any[],
    [__0x.multiCursor]: [] as any[]
};

type LineFn = (arg0: vscode.TextEditor, arg1: number[]) => void

/**
 * function call chain
 * 
 * @param editor current active editor
 * @param numKey previous selection type hexKey in array to unset previous selection decoration
 * @returns 
 */
const fnList = (editor: vscode.TextEditor, numKey: number[]) => (fn: LineFn) => fn(editor, numKey);

/**
 * call function call chain based on user cursor/selelction type
 * 
 * @param editor current active editor
 * @param numKey previous selection type hexKey in array to unset previous selection decoration
 * @returns 
 */
const renderGroupIs = (editor: vscode.TextEditor, numKey: number[]): number => {
    const fnBind = fnList(editor, numKey);
    if (editor.selections.length === 1) {
        if (editor.selections[0].isEmpty) {                 // cursor only
            renderFnStack[__0x.cursorOnly].forEach(fnBind);
            return __0x.cursorOnly;
        }
        if (!editor.selections[0].isSingleLine) {           // multi-line, wanted to reduce the execution step
            renderFnStack[__0x.multiLine].forEach(fnBind);
            return __0x.multiLine;
        } else {                                            // single-line
            renderFnStack[__0x.singleLine].forEach(fnBind);
            return __0x.singleLine;
        }
    } else {                                                // multi-cursor
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
