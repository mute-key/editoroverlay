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

const decorationState = { ...DECORATION_STATE } as D.Decoration.Intf.State;

const createEditorDecorationType = (styleAppliedConfig: any): vscode.TextEditorDecorationType => vscode.window.createTextEditorDecorationType(styleAppliedConfig as vscode.DecorationRenderOptions);;

const applyDecoration = (setDecorations: D.Editor.Tp.RenderOverlay, decoraiton: vscode.TextEditorDecorationType, range: vscode.Range[]): void => setDecorations(decoraiton, range);

/**
 * [ self-explantory ]
 * can be used for callback for high-order function or direct function call
 * 
 * 
 * @param setDecorations 
 * @returns 
 */
const resetDecoration = (setDecorations: D.Editor.Tp.RenderOverlay) => (decoration: vscode.TextEditorDecorationType) => setDecorations(decoration, blankRange);

/**
 * I assuemd using array to store value in object would be faster than mutating the object as it would be a reference.
 * at this point, i am not sure if there is a significant advantage, however this respond smoother in my experience so far. 
 * maybe drop the array in future but keeping it as is for now.
 * 
 * now that i am thinking making those state tracking numeric values as array, 
 * existing in stack, instead of heap perhaps; making not be targeted by garbage collector
 * unless it is explicitly uses references of array that hold numeric value ot state.
 * 
 * this, in fact could be slower but it will guarantee to stay on the memory.
 * 
 */
const clearDecorationState = (decorationState: D.Decoration.Intf.State): void => {
    decorationState.eventTrigger[0] = hex.noEvent;
    decorationState.appliedHighlight[0] = hex.cursorOnly;
    decorationState.diagnosticSignature[0] = bin.allOkOverride;
};

const clearAll = (editor: vscode.TextEditor): void => {
    clearEveryHighlight(editor);
    clearDiagnosticText(editor.setDecorations);
    clearSelectionTextBuffer(editor, SELECTION_KIND_LIST);
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

const setFunctionList = (config: D.Config.Intf.ConfigReady, fnStack: typeof renderFnStack, highlightList: D.Editor.Intf.RenderGroup, selectionList: D.Editor.Intf.RenderGroup) => (numKey: D.Numeric.Key.Hex): void => {

    const renderFuncBuffer: any[] = [];

    renderFuncBuffer.push(highlightList[numKey]);

    if (config.generalConfigInfo.selectionTextEnabled) {
        renderFuncBuffer.push(selectionList[numKey]);
    }

    if (config.generalConfigInfo.diagnosticTextEnabled && (numKey === hex.cursorOnly || numKey === hex.singleLine)) {
        renderFuncBuffer.push(editModeCheck);
    } else if (config.generalConfigInfo.diagnosticTextEnabled) {
        renderFuncBuffer.push(diagnosticInfo(decorationState));
    }

    // this method will also refresh whole rendering function stack 
    // if configuration is changed and whole features needs to be
    //  reloaded just in case. 
    fnStack[numKey] = [...renderFuncBuffer];
};

/**
 * buffer for rendering function call stack
 */
const renderFnStack: Record<D.Numeric.Key.Hex, any[]> = {
    [hex.cursorOnly]: [],
    [hex.singleLine]: [],
    [hex.multiLine]: [],
    [hex.multiCursor]: []
};

/**
 * build render function list.
 * 
 * @param config 
 */
const prepareRenderGroup = (config: D.Config.Intf.ConfigReady): void => {

    const highlightList: D.Editor.Intf.RenderGroup = {
        [hex.cursorOnly]: cursorOnlyHighlightRange,
        [hex.singleLine]: singelLineHighlightRange,
        [hex.multiLine]: multiLineHighlightRange,
        [hex.multiCursor]: multiCursorHighlightRange
    };

    const selectionList: D.Editor.Intf.RenderGroup = {
        [hex.cursorOnly]: cursorOnlySelection,
        [hex.singleLine]: singleLineSelection,
        [hex.multiLine]: multilineSelection,
        [hex.multiCursor]: multiCursorSelection
    };

    SELECTION_KIND_LIST.forEach(setFunctionList(config, renderFnStack, highlightList, selectionList));
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

type LineFn = (arg0: vscode.TextEditor, arg1: D.Numeric.Key.Hex[]) => void

/**
 * function call chain
 * 
 * @param editor current active editor
 * @param numKey previous selection type hexKey in array to unset previous selection decoration
 * @returns 
 */
const fnList = (editor: vscode.TextEditor, numKey: D.Numeric.Key.Hex[]) => (fn: LineFn) => fn(editor, numKey);

/**
 * call function call chain based on user cursor/selelction type
 * 
 * @param editor current active editor
 * @param numKey previous selection type hexKey in array to unset previous selection decoration
 * @returns 
 */
const renderGroupIs = (editor: vscode.TextEditor, numKey: D.Numeric.Key.Hex[]) => {

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