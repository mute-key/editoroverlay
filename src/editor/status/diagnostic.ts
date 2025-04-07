import * as vscode from 'vscode';
import * as Type from '../../type/type';
import * as __0x from '../../constant/shared/numeric';
import * as __$ from '../../constant/shared/symbol';
import { createCursorRange } from '../range';
import { DIAGNOSTIC_CONTENT_TEXT, DIAGNOSTIC_ENTRY_LIST, DIAGNOSTIC_GLYPH } from '../../constant/shared/object';
import { DECORATION_OPTION_CONFIG, DIAGNOSTIC_VISIBILITY_CONFIG } from '../../constant/config/object';
import { DIAGNOSTIC_CONTENT_TEXT_KEY } from '../../constant/config/enum';
import { updateDiagnostic } from '../../diagnostic/diagnostic';
import type { DiagnosticState } from '../../diagnostic/diagnostic';
import { resetDecoration } from '../editor';

const diagnosticContentText = {
    ...DIAGNOSTIC_CONTENT_TEXT
};

const lineGlyph = {
    ...DIAGNOSTIC_GLYPH
}

const diagnosticTextBuffer = {
    [__0x.allOkOverride]: [] as any[],
    [__0x.editorOkWorkspaceWarn]: [] as any[],
    [__0x.editorOkWorkspaceErr]: [] as any[],
    [__0x.editorOkWorkspaceWarnErr]: [] as any[],
    [__0x.editorWarnWorkspaceWarn]: [] as any[],
    [__0x.editorWarnWorkspaceErr]: [] as any[],
    [__0x.editorWarnWorkspaceWarnErr]: [] as any[],
    [__0x.editorErrWorkspaceErr]: [] as any[],
    [__0x.editorErrWorkspaceWarnErr]: [] as any[],
    [__0x.editorWarnErrWorkspaceWarn_err]: [] as any[],
}

const decorationOptionBuffer = { ...DECORATION_OPTION_CONFIG } as Type.DecorationRenderOptionType

// 이거 바뀌면 dispose 하고 새로 만드는거 필요함 
const setDiagonosticTextbuffer = (hexKey: number, decorationType) => {
    diagnosticTextBuffer[hexKey].push(...decorationType);
}

const sealDiagnosticText = (): void => {
    DIAGNOSTIC_ENTRY_LIST.forEach(hexKey => {
        // Object.seal(diagnosticTextBuffer[hexKey])
        // Object.seal(diagnosticContentText[hexKey])
    })
}

const reloadContentText = (): void => {
    DIAGNOSTIC_ENTRY_LIST.forEach(hexKey => {
        diagnosticTextBuffer[hexKey].forEach(decorationType => decorationType.dispose());
        diagnosticContentText[hexKey].splice(0);
        diagnosticTextBuffer[hexKey].splice(0);
    })
}

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
        lineGlyph[__0x.problemLineStartBracket],
        equal ? lineGlyph[__0x.problemLineEqual] : '',
        up ? lineGlyph[__0x.problemLineUp] : '',
        down ? lineGlyph[__0x.problemLineDown] : '',
        lineGlyph[__0x.problemLineEndBracket]);
    return linePosition.join('');
}

const editorWarningSourceOf = {
    wrn: ({ state, line }) => String(state.editor.warning.total) + problemLineGlyph(state.editor.warning.line, line)
};

const editorErrorCountOf = {
    err: ({ state, line }) => String(state.editor.error.total) + problemLineGlyph(state.editor.error.line, line)
};

const workspaceWarningSourceOf = {
    src: ({ state }) => String(state.workspace.warning.source)
};
const workspaceWarningCountOf = {
    wrn: ({ state }) => String(state.workspace.warning.total)
};

const workspaceErrorSourceOf = {
    src: ({ state }) => String(state.workspace.error.source)
};
const workspaceErrorCountOf = {
    err: ({ state }) => String(state.workspace.error.total)
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

const diagnosticRenderSignature = (state: DiagnosticState): number => {
    let emask = 0;
    let wmask = 0;
    if (state.editor.warning.total) {
        emask |= 1 << 1
    }
    if (state.editor.error.total) {
        emask |= 1 << 2
    }

    if (emask === 0) {
        emask = 1;
    }

    if (state.workspace.warning.total) {
        wmask |= 1 << 1
    }
    if (state.workspace.error.total) {
        wmask |= 1 << 2
    }

    if (wmask === 0) {
        wmask = 1;
    }

    return (emask === 1 && wmask === 1) ? __0x.allOkOverride : emask << 5 | wmask << 2 | 0b10;
}

const clearDiagnosticText = (setDecorations: vscode.TextEditor['setDecorations'], previousSignature: number[]): void => {
    diagnosticTextBuffer[previousSignature[0]].forEach(resetDecoration(setDecorations));
}

const renderDiagnosticText = (editor: vscode.TextEditor, signature: number, options, context) => (decoration: any, idx: number) => {
    decorationOptionBuffer.after = { ...decoration.after }
    if (typeof decoration.after.contentText !== 'string') {
        decorationOptionBuffer.after.contentText = decoration.after.contentText(context)
    };
    options.renderOptions = decorationOptionBuffer;
    editor.setDecorations(diagnosticTextBuffer[signature][idx], [options]);
}

const decorationOption = {
    range: {},
    renderOptions: {}
}

const context = {
    state: {},
    line: {}
};

const diagnosticInfo = (decorationState) => (editor: vscode.TextEditor) => {
    clearDiagnosticText(editor.setDecorations, decorationState.diagnosticSignature);
    const diagnosticState = updateDiagnostic(editor.document.uri);
    const signature = diagnosticRenderSignature(diagnosticState);
    context.state = diagnosticState;
    context.line = editor.selection.active.line;
    decorationOption.range = diagnosticOf.rangeFunction(editor);
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
    sealDiagnosticText,
    reloadContentText,
    clearDiagnosticText
};
