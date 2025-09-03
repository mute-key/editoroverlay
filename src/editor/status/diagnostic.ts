import type * as D from '../../type/type';

import * as vscode from 'vscode';
import * as __0x from '../../constant/shared/numeric';
import * as __$ from '../../constant/shared/symbol';
import * as regex from '../../collection/regex';
import { createCursorRange } from '../range';
import { DIAGNOSTIC_CONTENT_TEXT, DIAGNOSTIC_ENTRY_LIST, DIAGNOSTIC_GLYPH } from '../../constant/shared/object';
import { DECORATION_OPTION_CONFIG, DIAGNOSTIC_VISIBILITY_CONFIG } from '../../constant/config/object';
import { DIAGNOSTIC_CONTENT_TEXT_KEY } from '../../constant/config/enum';
import { updateDiagnostic } from '../../diagnostic/diagnostic';
import { resetDecoration } from '../editor';


const diagnosticContentText = {
    ...DIAGNOSTIC_CONTENT_TEXT
} as unknown as D.Diagnostic.Intf.DiagnosticContentText;

const lineGlyph = {
    ...DIAGNOSTIC_GLYPH
} as unknown as D.Diagnostic.Intf.LineGlyph;

const diagnosticStatusBuffer = [] as (any | vscode.TextEditorDecorationType)[];

const composeRenderOption = (renderSignature: number, renderOptions: any[]) => {
    renderOptions.forEach(option => {
        if (typeof option.after.contentText === 'number' && Object.hasOwn(diagnosticReferenceTable, option.after.contentText)) {
            diagnosticReferenceTable[option.after.contentText] = option.after;
            diggnosticStateList.push(option.after.contentText);
        }

        diagnosticContentText[renderSignature].push([{
            get range() {
                return diagnosticReferenceTable.rangeReference;
            },
            renderOptions: option
        }]);
    });
};

const diagnosticReferenceTable = {
    rangeReference: undefined as any | vscode.Range,
    [__0x.editorWarningTotal]: undefined as any,
    [__0x.editorErrorTotal]: undefined as any,
    [__0x.workspaceWarningSource]: undefined as any,
    [__0x.workspaceWarningTotal]: undefined as any,
    [__0x.workspaceErrorSource]: undefined as any,
    [__0x.workspaceErrorTotal]: undefined as any,
};

const setDiagonosticTextbuffer = (): void => {

    const lengthList = [] as any | number[];
    DIAGNOSTIC_ENTRY_LIST.forEach(hexKey => {
        lengthList.push([hexKey, diagnosticContentText[hexKey].length]);
    });

    decorationOptionBuffer.isWholeLine = true;
    decorationOptionBuffer.rangeBehavior = vscode.DecorationRangeBehavior.ClosedClosed;

    const max = Math.max(...lengthList.map((list: number[]) => list[1]));
    let idx = max;

    diagnosticStatusBuffer?.forEach(decorationType => decorationType.dispose());
    diagnosticStatusBuffer?.splice(0);
    while (idx--) {
        diagnosticStatusBuffer.push(vscode.window.createTextEditorDecorationType(decorationOptionBuffer));
    }

    lengthList.forEach((length: number[]) => {
        let deltaIdx = max - length[1];
        while (deltaIdx--) {
            diagnosticContentText[length[0]].push([]);
        }
    });
};

const clearDiagnosticTextState = (): void => {
    for (const hexKey of DIAGNOSTIC_ENTRY_LIST) {
        diagnosticContentText[hexKey] = [];
    }
};

const diagnosticVisibility = { ...DIAGNOSTIC_VISIBILITY_CONFIG } as D.Diagnostic.Intf.DiagnosticVisibility;

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

const diagnosticOf = {
    rangeFunction: createCursorRange,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_PROBLEM_CONTENT_TEXT]: problemOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_ALL_OK_CONTENT_TEXT]: allOkOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_ALL_CONTENT_TEXT]: notationOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_WORKSPACE_CONTENT_TEXT]: notationOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_EDITOR_CONTENT_TEXT]: notationOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_EDITOR_CONTENT_TEXT]: {
        ...notationOf,
        wrn: __0x.editorWarningTotal,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_EDITOR_CONTENT_TEXT]: {
        ...notationOf,
        err: __0x.editorErrorTotal,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_WORKSPACE_CONTENT_TEXT]: {
        ...notationOf,
        src: __0x.workspaceErrorSource,
        err: __0x.workspaceErrorTotal
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_WORKSPACE_CONTENT_TEXT]: {
        ...notationOf,
        src: __0x.workspaceWarningSource,
        wrn: __0x.workspaceWarningTotal,
    },
};


const okRegex = {
    allok: regex.allok,
};

const problemRegex = {
    editor: regex.editor,
    workspace: regex.workspace,
};

const notationRegex = {
    pre: regex.prefix,
    post: regex.postfix,
};

const warningTotalRegex = {
    wrn: regex.warning,
};

const sourceRegex = {
    src: regex.source,
};

const errorTotalRegex = {
    err: regex.error,
};

const diagnosticTextRegex: Record<string, D.Regex.Tp.DiagnosticContentTextUnion> = {
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_PROBLEM_CONTENT_TEXT]: problemRegex,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_ALL_OK_CONTENT_TEXT]: okRegex,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_ALL_CONTENT_TEXT]: notationRegex,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_WORKSPACE_CONTENT_TEXT]: notationRegex,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_EDITOR_CONTENT_TEXT]: notationRegex,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_WORKSPACE_CONTENT_TEXT]: {
        ...notationRegex,
        ...sourceRegex,
        ...warningTotalRegex
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_EDITOR_CONTENT_TEXT]: {
        ...notationRegex,
        ...warningTotalRegex,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_WORKSPACE_CONTENT_TEXT]: {
        ...notationRegex,
        ...sourceRegex,
        ...errorTotalRegex
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_EDITOR_CONTENT_TEXT]: {
        ...notationRegex,
        ...errorTotalRegex
    }
};


const decorationOptionBuffer: D.Diagnostic.Intf.RenderOption = { ...DECORATION_OPTION_CONFIG };

const stateBuffer: (number | number[])[] = [0, 0, [], 0, [], 0, 0, 0, 0, 0];

const initializeStateBuffer = (digit: number): void => {
    stateBuffer[0] = digit;
};

const diagnosticRenderSignature = (state: typeof stateBuffer): number => {
    const emask = (state[3] ? 1 << 1 : 0) | (state[5] ? 1 << 2 : 0);
    const wmask = (state[7] ? 1 << 1 : 0) | (state[9] ? 1 << 2 : 0);
    return (emask === 0 && wmask === 0) ? state[0] as number : ((emask ? emask << 5 : 1 << 5) | (wmask ? wmask << 2 : 1 << 2) | 0b10);
};

const refreshBuffer = (state: (number | number[])[]): void => {
    let idx = state.length;
    while (idx--) {
        stateBuffer[idx] = state[idx];
    }
};

const fnCollection: Record<number, D.Diagnostic.Tp.DiagnosticSignatureFuncSign> = {
    [__0x.editorWarningTotal]: ({ state, line }) => String(state[3]) + problemLineGlyph(state[2], line),
    [__0x.editorErrorTotal]: ({ state, line }) => String(state[5]) + problemLineGlyph(state[4], line),
    [__0x.workspaceWarningSource]: ({ state }) => String(state[6]),
    [__0x.workspaceWarningTotal]: ({ state }) => String(state[7]),
    [__0x.workspaceErrorSource]: ({ state }) => String(state[8]),
    [__0x.workspaceErrorTotal]: ({ state }) => String(state[9])
};

const diggnosticStateList = [] as number[];

const updateDiagnosticState = (context: any) => (hexKey: number) => {
    diagnosticReferenceTable[hexKey].contentText = fnCollection[hexKey](context);
};

const renderDiagnosticText = (setDecorations: D.Editor.Tp.RenderOverlay) => (options: vscode.DecorationInstanceRenderOptions, idx: number) => {
    setDecorations(diagnosticStatusBuffer[idx], options as any);
};

const context = {
    line: 0,
    state: Object.create(null)
};

const diagnosticInfo = (decorationState: D.Decoration.Intf.State) => (editor: vscode.TextEditor): void => {
    if (decorationState.eventTrigger[0] === __0x.diagnosticChanged) {
        refreshBuffer(updateDiagnostic(editor.document.uri));
    }
    context.line = editor.selection.end.line;
    context.state = stateBuffer;
    diggnosticStateList.forEach(updateDiagnosticState(context));
    diagnosticReferenceTable.rangeReference = diagnosticOf.rangeFunction(editor);
    diagnosticContentText[diagnosticRenderSignature(stateBuffer)].forEach(renderDiagnosticText(editor.setDecorations));
};

const clearDiagnosticText = (setDecorations: D.Editor.Tp.RenderOverlay): void => {
    diagnosticStatusBuffer.forEach(resetDecoration(setDecorations));
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
    bindDiagnosticContentTextState,
    composeRenderOption,
    setDiagonosticTextbuffer,
    initializeStateBuffer,
    clearDiagnosticTextState,
    clearDiagnosticText,
    diagnosticInfo,
    diagnosticTextRegex
};
