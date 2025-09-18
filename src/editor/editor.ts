import type * as D from '../type/type.d';

import * as vscode from 'vscode';
import * as hex from '../numeric/hexadecimal';
import * as bin from '../numeric/binary';
import * as regex from '../collection/regex';
import { DECORATION_STATE, SELECTION_KIND_LIST } from '../constant/shared/object';
import { clearDiagnosticText, diagnosticInfo } from './status/diagnostic';
import { cursorOnlyHighlightRange, singelLineHighlightRange, multiLineHighlightRange, multiCursorHighlightRange, clearEveryHighlight } from './highlight/highlight';
import { cursorOnlySelection, singleLineSelection, multilineSelection, multiCursorSelection, bindStatusContentTextState, clearSelectionTextBuffer } from './selection/selection';
import { blankRange, updateRangeMetadata } from './range';

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

const decorationState = { ...DECORATION_STATE };

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
 * at this point, i am not sure if there is a significan advantage, however this respond smoother in my experience so far. 
 * maybe drop the array in future but keeping it as is for now.
 * 
 */
const clearDecorationState = (decorationState: D.Editor.Tp.DecorationState): void => {
    decorationState.eventTrigger[0] = hex.noEvent;
    decorationState.appliedHighlight[0] = hex.cursorOnly;
    decorationState.diagnosticSignature[0] = bin.allOkOverride;
};

const clearAll = (editor: vscode.TextEditor): void => {
    clearEveryHighlight(editor);
    // clearSelectionTextBuffer(editor); << this cause issues for cross-os; related to SELECTION_KIND_LIST.
    clearDiagnosticText(editor.setDecorations);
};

const resetAllDecoration = (): void => vscode.window.visibleTextEditors.forEach(clearAll);

/**
 * perhaps i need to move this function to selection.ts later on.
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
    renderFnStack[hex.cursorOnly].splice(0);
    renderFnStack[hex.singleLine].splice(0);
    renderFnStack[hex.multiLine].splice(0);
    renderFnStack[hex.multiCursor].splice(0);

    const highlightList = {
        [hex.cursorOnly]: cursorOnlyHighlightRange,
        [hex.singleLine]: singelLineHighlightRange,
        [hex.multiLine]: multiLineHighlightRange,
        [hex.multiCursor]: multiCursorHighlightRange
    };

    const selectionList = {
        [hex.cursorOnly]: cursorOnlySelection,
        [hex.singleLine]: singleLineSelection,
        [hex.multiLine]: multilineSelection,
        [hex.multiCursor]: multiCursorSelection
    };

    SELECTION_KIND_LIST.forEach(numKey => {

        const callList: any[] = [];

        callList.push(highlightList[numKey]);

        if (config.generalConfigInfo.selectionTextEnabled) {
            callList.push(selectionList[numKey]);
        }

        if (config.generalConfigInfo.diagnosticTextEnabled && (numKey === hex.cursorOnly || numKey === hex.singleLine)) {
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
    [hex.cursorOnly]: [] as any[],
    [hex.singleLine]: [] as any[],
    [hex.multiLine]: [] as any[],
    [hex.multiCursor]: [] as any[]
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
const renderGroupIs = (editor: vscode.TextEditor, numKey: number[]): D.Numeric.Key.Hex => {
    const fnBind = fnList(editor, numKey);
    if (editor.selections.length === 1) {
        if (editor.selections[0].isEmpty) {                 // cursor only
            renderFnStack[hex.cursorOnly].forEach(fnBind);
            return hex.cursorOnly;
        }
        if (!editor.selections[0].isSingleLine) {           // multi-line, wanted to reduce the execution step
            renderFnStack[hex.multiLine].forEach(fnBind);
            return hex.multiLine;
        } else {                                            // single-line
            renderFnStack[hex.singleLine].forEach(fnBind);
            return hex.singleLine;
        }
    } else {                                                // multi-cursor
        renderFnStack[hex.multiCursor].forEach(fnBind);
        return hex.multiCursor;
    }
};

const bindEditorDecoration = () => {
    return {
        stateOf: decorationState
    };
};