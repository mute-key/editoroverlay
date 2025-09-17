/* eslint-disable semi */

import * as hex from '../../numeric/hex'
import * as bin from '../../numeric/bin'

// ==============================================================================
// [ RUNTIME READONLY CONSTANT/ENUM ]
// ==============================================================================

export const INDENT_INFO = {
    size: undefined,
    type: undefined,
    regex: undefined
}

export const DECORATION_STATE = {
    appliedHighlight: [0],
    diagnosticSignature: [0],
    eventTrigger: [0],
    previousLine: [0],
} as const

export const SELECTION_KIND_LIST = [
    hex.cursorOnly,
    hex.singleLine,
    hex.multiLine,
    hex.multiCursor,
];

export const HIGHLIGHT_STYLE_LIST = {
    [hex.reset]: [],
    [hex.cursorOnly]: [],
    [hex.singleLine]: [],
    [hex.multiLine]: [],
    [hex.multiCursor]: []
} as const

export const HIGHLIGHT_BORDER_POSITION_INFO = {
    [hex.cursorOnly]: undefined,
    [hex.singleLine]: undefined,
    [hex.multiLine]: undefined,
    [hex.multiCursor]: undefined
} as const

export const DIAGNOSTIC_STATE = {
    override: 0,
    severity: 0,
    editor: {
        warning: {
            line: [],
            total: 0
        },
        error: {
            line: [],
            total: 0
        }
    },
    workspace: {
        warning: {
            source: 0,
            total: 0
        },
        error: {
            source: 0,
            total: 0
        }
    }
} as const

export const SELECTION_CONTENT_TEXT = {
    [hex.cursorOnlyText]: undefined,
    [hex.singleLineText]: undefined,
    [hex.multiLineCursorText]: undefined,
    [hex.multiLineAnchorText]: undefined,
    [hex.multiCursorText]: undefined,
    [hex.multiCursorEdit]: undefined,
} as const

export const DIAGNOSTIC_CONTENT_TEXT = {
    [bin.allOkOverride]: [] as any[],
    [bin.allOkNoOverride]: [] as any[],
    [bin.editorOkWorkspaceWarn]: [] as any[],
    [bin.editorOkWorkspaceErr]: [] as any[],
    [bin.editorOkWorkspaceWarnErr]: [] as any[],
    [bin.editorWarnWorkspaceWarn]: [] as any[],
    [bin.editorWarnWorkspaceErr]: [] as any[],
    [bin.editorWarnWorkspaceWarnErr]: [] as any[],
    [bin.editorErrWorkspaceErr]: [] as any[],
    [bin.editorErrWorkspaceWarnErr]: [] as any[],
    [bin.editorWarnErrWorkspaceWarnErr]: [] as any[],
} as const

export const DIAGNOSTIC_PROBLEM_LIST = [
    bin.allOkNoOverride,
    bin.editorOkWorkspaceWarn,
    bin.editorOkWorkspaceErr,
    bin.editorOkWorkspaceWarnErr,
    bin.editorWarnWorkspaceWarn,
    bin.editorWarnWorkspaceErr,
    bin.editorWarnWorkspaceWarnErr,
    bin.editorErrWorkspaceErr,
    bin.editorErrWorkspaceWarnErr,
    bin.editorWarnErrWorkspaceWarnErr,
] as const;

export const DIAGNOSTIC_GLYPH = {
    [hex.openningBracket]: undefined,
    [hex.closingBracket]: undefined,    
    [hex.lineEqual]: undefined,
    [hex.lineUp]: undefined,
    [hex.lineDown]: undefined,
} as const

export const DIAGNOSTIC_ENTRY_LIST = [
    bin.allOkOverride,
    ...DIAGNOSTIC_PROBLEM_LIST
];

export const DIAGNOSTIC_EDITOR_CONTENT_TEXT_KEYSET = {
    [hex.okContentText]: hex.okEditorContentText,
    [hex.warningContentText]: hex.warningEditorContentText,
    [hex.errorContentText]: hex.errorEditorContentText
}

export const DIAGNOSTIC_WORKSPACE_CONTENT_TEXT_KEYSET = {
    [hex.okContentText]: hex.okWorkspaceContentText,
    [hex.warningContentText]: hex.warningWorkspaceContentText,
    [hex.errorContentText]: hex.errorWorkspaceContentText
} as const