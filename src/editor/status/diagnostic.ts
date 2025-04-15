import * as vscode from 'vscode';
import * as Type from '../../type/type';
import * as __0x from '../../constant/shared/numeric';
import * as __$ from '../../constant/shared/symbol';
import { createCursorRange } from '../range';
import { DIAGNOSTIC_CONTENT_TEXT, DIAGNOSTIC_ENTRY_LIST, DIAGNOSTIC_GLYPH } from '../../constant/shared/object';
import { DECORATION_OPTION_CONFIG, DIAGNOSTIC_VISIBILITY_CONFIG } from '../../constant/config/object';
import { DIAGNOSTIC_CONTENT_TEXT_KEY } from '../../constant/config/enum';
import { updateDiagnostic } from '../../diagnostic/diagnostic';
import { resetDecoration } from '../editor';

const diagnosticContentText = {
    ...DIAGNOSTIC_CONTENT_TEXT
};

const lineGlyph = {
    ...DIAGNOSTIC_GLYPH
};

const diagnosticTextBuffer = {
    [__0x.allOkOverride]: [] as any[],
    [__0x.allOkNoOverride]: [] as any[],
    [__0x.editorOkWorkspaceWarn]: [] as any[],
    [__0x.editorOkWorkspaceErr]: [] as any[],
    [__0x.editorOkWorkspaceWarnErr]: [] as any[],
    [__0x.editorWarnWorkspaceWarn]: [] as any[],
    [__0x.editorWarnWorkspaceErr]: [] as any[],
    [__0x.editorWarnWorkspaceWarnErr]: [] as any[],
    [__0x.editorErrWorkspaceErr]: [] as any[],
    [__0x.editorErrWorkspaceWarnErr]: [] as any[],
    [__0x.editorWarnErrWorkspaceWarnErr]: [] as any[],
};

const setDiagonosticTextbuffer = (hexKey: number, decorationType) => {
    diagnosticTextBuffer[hexKey].push(...decorationType);
};

const reloadContentText = (): void => {
    for (const hexKey of DIAGNOSTIC_ENTRY_LIST) {
        diagnosticTextBuffer[hexKey].forEach(decorationType => decorationType.dispose());
        diagnosticTextBuffer[hexKey].splice(0);
        diagnosticContentText[hexKey].splice(0);
    }
};

const diagnosticVisibility = { ...DIAGNOSTIC_VISIBILITY_CONFIG } as Type.DiagnosticVisibilityType;

const allOkOf = {
    allok: __0x.allOkHexKey
};

const problemOf = {
    editor: __0x.editorHexKey,
    workspace: __0x.workspaceHexKey
};

const notationOf = {
    pre: __$.prefixSymbol,
    post: __$.postfixSymbol
};

const problemLineGlyph = (lineNumber: number[], line: number) => {
    const linePosition: any[] = [];
    let length = lineNumber.length;
    let up = false;
    let down = false;
    let equal = false;
    while (length--) {
        if (lineNumber[length] > line && !down) {
            down = true;
        } else if (lineNumber[length] < line && !up) {
            up = true;
        } else if (lineNumber[length] === line && !equal) {
            equal = true;
            down = false;
            up = false;
            break;
        }
        if (down && up) {
            break;
        }
    }
    linePosition.push(
        lineGlyph[__0x.openningBracket],
        equal ? lineGlyph[__0x.lineEqual] : "",
        up ? lineGlyph[__0x.lineUp] : "",
        down ? lineGlyph[__0x.lineDown] : "",
        lineGlyph[__0x.closingBracket]);
    return linePosition.join('');
};

const editorWarningSourceOf = {
    wrn: ({ state, line }) =>
        String(state[3])                    // state.editor.warning.total
        + problemLineGlyph(state[2], line)  // state.editor.warning.line
};

const editorErrorCountOf = {
    err: ({ state, line }) =>
        String(state[5])                    // state.editor.error.total 
        + problemLineGlyph(state[4], line)  // state.editor.error.line
};

const workspaceWarningSourceOf = {
    src: ({ state }) => String(state[6])    // state.workspace.warning.source
};

const workspaceWarningCountOf = {
    wrn: ({ state }) => String(state[7])    // state.workspace.warning.total
};

const workspaceErrorSourceOf = {
    src: ({ state }) => String(state[8])    // state.workspace.error.source
};
const workspaceErrorCountOf = {
    err: ({ state }) => String(state[9])    // state.workspace.error.total
};

const diagnosticOf = {
    rangeFunction: createCursorRange,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_PROBLEM_CONTENT_TEXT]: problemOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_ALL_OK_CONTENT_TEXT]: allOkOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_ALL_CONTENT_TEXT]: notationOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_WORKSPACE_CONTENT_TEXT]: notationOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_EDITOR_CONTENT_TEXT]: notationOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_EDITOR_CONTENT_TEXT]: {
        ...notationOf,
        ...editorWarningSourceOf,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_WORKSPACE_CONTENT_TEXT]: {
        ...notationOf,
        ...workspaceWarningSourceOf,
        ...workspaceWarningCountOf,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_EDITOR_CONTENT_TEXT]: {
        ...notationOf,
        ...editorErrorCountOf,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_WORKSPACE_CONTENT_TEXT]: {
        ...notationOf,
        ...workspaceErrorSourceOf,
        ...workspaceErrorCountOf
    },
};

type DecorationRenderAfterOption = {
    contentText?: string | any,
    color?: string,
    backgroundColor?: string,
    fontWeight?: string,
    fontStyle?: string,
    textDecoration?: string,
    margin?: string
} & {}

type RenderOption = {
    isWholeLine?: boolean,
    rangeBehavior?: any,
    after: {
    } & DecorationRenderAfterOption
}

const decorationOptionBuffer: RenderOption = { ...DECORATION_OPTION_CONFIG };

const renderDiagnosticText = (editor: vscode.TextEditor, signature: number, options, context) => (decoration: any, idx: number) => {
    decorationOptionBuffer.after = { ...decoration.after };
    if (typeof decoration.after.contentText !== 'string') {
        decorationOptionBuffer.after.contentText = decoration.after.contentText(context);
    };
    options.renderOptions = decorationOptionBuffer;
    editor.setDecorations(diagnosticTextBuffer[signature][idx], [options]);
};

const decorationOption = {
    range: {},
    renderOptions: {}
};

const context = {
    state: {},
    line: {}
};

const stateBuffer: (number | number[])[] = [0, 0, [], 0, [], 0, 0, 0, 0, 0];

const initializeStateBuffer = (digit: number) => {
    stateBuffer[0] = digit;
};

const diagnosticRenderSignature = (state: typeof stateBuffer): number => {
    const emask = (state[3] ? 1 << 1 : 0) | (state[5] ? 1 << 2 : 0);
    const wmask = (state[7] ? 1 << 1 : 0) | (state[9] ? 1 << 2 : 0);
    return (emask === 0 && wmask === 0) ? state[0] as number : ((emask ? emask << 5 : 1 << 5) | (wmask ? wmask << 2 : 1 << 2) | 0b10);
};

const refreshBuffer = (state) => {
    let idx = state.length;
    while (idx--) {
        stateBuffer[idx] = state[idx];
    }
};

const clearDiagnosticText = (setDecorations: vscode.TextEditor['setDecorations'], previousSignature: number[]): void => {
    diagnosticTextBuffer[previousSignature[0]]?.forEach(resetDecoration(setDecorations));
};

const diagnosticInfo = (decorationState) => (editor: vscode.TextEditor): void => {

    if (decorationState.eventTrigger[0] === __0x.diagnosticChanged) {
        const diagnosticState = updateDiagnostic(editor.document.uri);
        refreshBuffer(diagnosticState);
    }

    const signature = diagnosticRenderSignature(stateBuffer);
    decorationOption.range = diagnosticOf.rangeFunction(editor);
    context.line = editor.selection.start.line;
    context.state = stateBuffer;
    signature !== decorationState.diagnosticSignature[0] && clearDiagnosticText(editor.setDecorations, decorationState.diagnosticSignature);
    diagnosticContentText[signature].forEach(renderDiagnosticText(editor, signature, { ...decorationOption }, context));
    decorationState.diagnosticSignature[0] = signature;
};

const bindDiagnosticContentTextState = () => {
    return {
        functionOf: diagnosticOf,
        textOf: {
            contentText: diagnosticContentText,
            glyphList: lineGlyph
        },
        configOf: diagnosticVisibility
    };
};

export {
    diagnosticInfo,
    bindDiagnosticContentTextState,
    setDiagonosticTextbuffer,
    reloadContentText,
    clearDiagnosticText,
    initializeStateBuffer
};
