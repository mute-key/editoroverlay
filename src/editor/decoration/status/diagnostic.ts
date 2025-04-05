import * as vscode from 'vscode';
import * as Type from '../../../type/type';
import * as __0x from '../../../constant/shared/numeric';
import * as __$ from '../../../constant/shared/symbol';
import { blankRange, createCursorRange } from '../../range';
import { DIAGNOSTIC_CONTENT_TEXT, DIAGNOSTIC_ENTRY_LIST } from '../../../constant/shared/object';
import { DECORATION_OPTION_CONFIG, DIAGNOSTIC_VISIBILITY_CONFIG } from '../../../constant/config/object';
import { DIAGNOSTIC_CONTENT_TEXT_KEY } from '../../../constant/config/enum';
import { updateDiagnostic } from '../../../diagnostic/diagnostic';

const diagnosticContentText = {
    ...DIAGNOSTIC_CONTENT_TEXT
};

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

const setDiagonosticTextbuffer = (hexKey: number, decorationType) => {
    diagnosticTextBuffer[hexKey].push(...decorationType);
}

const sealDiagnosticText = (): void => {
    DIAGNOSTIC_ENTRY_LIST.forEach(hexKey => {
        Object.seal(diagnosticTextBuffer[hexKey])
        Object.seal(diagnosticContentText[hexKey])
    })
}

const reloadContentText = (): void => {
    DIAGNOSTIC_ENTRY_LIST.forEach(hexKey => {
        diagnosticTextBuffer[hexKey].forEach(decorationType => decorationType.dispose());
        delete diagnosticContentText[hexKey];
        delete diagnosticTextBuffer[hexKey];
        diagnosticContentText[hexKey] = [];
        diagnosticTextBuffer[hexKey] = [];
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

const editorWarningSourceOf = {
    wrn: ({ state, line}) => {
        const upGlyph = '⬆︎';
        const downGlyph = '⬇︎';
        const lineNumber = state.editor.warning.line;
        const direction: any[] = [];
        let length = lineNumber.length; 
        let up = true;
        let down = true;
        while(length--) {
            if (lineNumber[length] > line && down === true) {
                direction.push(downGlyph);
                down = false;
            } else if(lineNumber[length] < line && up === true) {
                direction.push(upGlyph);
                up = false;
            }
            if (direction.length === 2) {
                break;
            }
        }
        return String(state.editor.warning.total) + '(' + direction.join('') + ')';
    }
};

const editorErrorCountOf = {
    err: ({ state, line }) => {
        const upGlyph = '⬆︎';
        const downGlyph = '⬇︎';
        const lineNumber = state.editor.error.line;
        const direction: any[] = [];
        let length = lineNumber.length; 
        let up = true;
        let down = true;
        while(length--) {
            if (lineNumber[length] > line && down === true) {
                direction.push(downGlyph);
                down = false;
            } else if(lineNumber[length] < line && up === true) {
                direction.push(upGlyph);
                up = false;
            }
            if (direction.length === 2) {
                break;
            }
        }
        return String(state.editor.error.total) + '(' + direction.join('') + ')';
    }
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

const diagnosticRenderSignature = (state): any => {
    let emask = 0;
    let wmask = 0;
    if (state.editor.warning.total > 0) {
        emask |= 1 << 1
    }
    if (state.editor.error.total > 0) {
        emask |= 1 << 2
    }

    if (emask === 0) {
        emask = 1;
    }

    if (state.workspace.warning.total > 0) {
        wmask |= 1 << 1
    }
    if (state.workspace.error.total > 0) {
        wmask |= 1 << 2
    }

    if (wmask === 0) {
        wmask = 1;
    }

    return (emask === 1 && wmask === 1) ? 0b00100101 : emask << 5 | wmask << 2 | 0b10;
}

let previousSignature = 0b00100101;

const diagnosticInfo = (editor: vscode.TextEditor): void => {

    const diagnosticState = updateDiagnostic(editor.document.uri);
    const signature = diagnosticRenderSignature(diagnosticState);

    const range = createCursorRange(editor);
    const decorationOptionGrid = {
        range: range,
        renderOptions: {}
    }

    const context = {
        state: diagnosticState,
        line: editor.selection.active.line
    };

    diagnosticTextBuffer[previousSignature]?.forEach(decoration => editor.setDecorations(decoration, blankRange))
    diagnosticContentText[signature].forEach((decoration, idx) => {
        const options = { ...decorationOptionGrid }
        decorationOptionBuffer.after = { ...decoration.after }
        if (typeof decoration.after.contentText !== 'string') {
            decorationOptionBuffer.after.contentText = decoration.after.contentText(context)
        };
        options.renderOptions = decorationOptionBuffer;
        editor.setDecorations(diagnosticTextBuffer[signature][idx], [options as unknown as vscode.DecorationOptions]);
    })

    previousSignature = signature;
};

const bindDiagnosticContentTextState = () => {
    return {
        functionOf: diagnosticOf,
        textOf: diagnosticContentText,
        configOf: diagnosticVisibility,
    };
};

export {
    diagnosticInfo,
    bindDiagnosticContentTextState,
    setDiagonosticTextbuffer,
    sealDiagnosticText,
    reloadContentText
};
