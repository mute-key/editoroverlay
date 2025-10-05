import type * as D from '../../type/type';

import * as vscode from 'vscode';
import * as hex from '../../constant/numeric/hexadecimal';
import * as __$ from '../../constant/shared/symbol';
import * as regex from '../../collection/regex';
import { createCursorRange } from '../range';
import { DIAGNOSTIC_CONTENT_TEXT, DIAGNOSTIC_ENTRY_LIST, DIAGNOSTIC_GLYPH } from '../../constant/shared/object';
import { DECORATION_OPTION_CONFIG, DIAGNOSTIC_VISIBILITY_CONFIG } from '../../constant/config/object';
import { DIAGNOSTIC_CONTENT_TEXT_KEY } from '../../constant/config/enum';
import { updateDiagnostic } from '../../diagnostic/diagnostic';
import { resetDecoration, setCreateDecorationTypeQueue } from '../editor';

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

const diagnosticContentText = {
    ...DIAGNOSTIC_CONTENT_TEXT
} as unknown as D.Diagnostic.Intf.DiagnosticContentText;

const lineGlyph = {
    ...DIAGNOSTIC_GLYPH
} as unknown as D.Diagnostic.Intf.LineGlyph;

const diagnosticStatusBuffer = [] as (any | vscode.TextEditorDecorationType)[];

const composeRenderOption = (renderSignature: D.Numeric.Key.Bin, renderOptions: any[]) => {
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
    [hex.editorWarningTotal]: undefined as any,
    [hex.editorErrorTotal]: undefined as any,
    [hex.workspaceWarningSource]: undefined as any,
    [hex.workspaceWarningTotal]: undefined as any,
    [hex.workspaceErrorSource]: undefined as any,
    [hex.workspaceErrorTotal]: undefined as any,
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

    lengthList.forEach((length: number[]) => {
        let deltaIdx = max - length[1];
        while (deltaIdx--) {
            diagnosticContentText[length[0] as D.Numeric.Key.Bin].push([]);
        }
    });

    diagnosticStatusBuffer.forEach(decorationType => decorationType.dispose());
    diagnosticStatusBuffer.splice(0);
    // while (idx--) {
    //     diagnosticStatusBuffer.push(vscode.window.createTextEditorDecorationType(decorationOptionBuffer));
    // }


    setCreateDecorationTypeQueue({
        name: 'diagnostic',
        count: idx,
        reference: diagnosticStatusBuffer
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
        lineGlyph[hex.openningBracket],
        equal ? lineGlyph[hex.lineEqual] : "",
        up ? lineGlyph[hex.lineUp] : "",
        down ? lineGlyph[hex.lineDown] : "",
        lineGlyph[hex.closingBracket]);
    return linePosition.join('');
};

const allOkOf = {
    allok: hex.allOkHexKey
};

const problemOf = {
    editor: hex.editorHexKey,
    workspace: hex.workspaceHexKey
};

const notationOf = {
    pre: hex.prefixHex,
    post: hex.postfixHex
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
        wrn: hex.editorWarningTotal,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_EDITOR_CONTENT_TEXT]: {
        ...notationOf,
        err: hex.editorErrorTotal,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_WORKSPACE_CONTENT_TEXT]: {
        ...notationOf,
        src: hex.workspaceErrorSource,
        err: hex.workspaceErrorTotal
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_WORKSPACE_CONTENT_TEXT]: {
        ...notationOf,
        src: hex.workspaceWarningSource,
        wrn: hex.workspaceWarningTotal,
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

const diagnosticRenderSignature = (state: typeof stateBuffer): D.Numeric.Key.Bin => {
    const emask = (state[3] ? 1 << 1 : 0) | (state[5] ? 1 << 2 : 0);
    const wmask = (state[7] ? 1 << 1 : 0) | (state[9] ? 1 << 2 : 0);
    return (emask === 0 && wmask === 0) ? state[0] as D.Numeric.Key.Bin : ((emask ? emask << 5 : 1 << 5) | (wmask ? wmask << 2 : 1 << 2) | 0b10) as D.Numeric.Key.Bin;
};

const refreshBuffer = (state: (number | number[])[]): void => {
    let idx = state.length;
    while (idx--) {
        stateBuffer[idx] = state[idx];
    }
};

const fnCollection: Record<number, D.Diagnostic.Tp.DiagnosticSignatureFuncSign> = {
    [hex.editorWarningTotal]: ({ state, line }) => String(state[3]) + problemLineGlyph(state[2], line),
    [hex.editorErrorTotal]: ({ state, line }) => String(state[5]) + problemLineGlyph(state[4], line),
    [hex.workspaceWarningSource]: ({ state }) => String(state[6]),
    [hex.workspaceWarningTotal]: ({ state }) => String(state[7]),
    [hex.workspaceErrorSource]: ({ state }) => String(state[8]),
    [hex.workspaceErrorTotal]: ({ state }) => String(state[9])
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
    if (decorationState.eventTrigger[0] === hex.diagnosticChanged) {
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