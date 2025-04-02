import * as __0x from './numeric';

// ==============================================================================
// [ RUNTIME READONLY CONSTANT/ENUM ]
// ==============================================================================

export const INDENT_INFO = {
    size: undefined,
    type: undefined,
    regex: undefined
} as const;

export const RENDER_GROUP_SET_PROPERTY = {
    highlight: undefined,
    selectionCount: undefined,
    diagnostic: undefined
} as const;

export const RENDER_GROUP_SET = {
    [__0x.cursorOnly]: RENDER_GROUP_SET_PROPERTY,
    [__0x.singleLine]: RENDER_GROUP_SET_PROPERTY,
    [__0x.multiLine]: RENDER_GROUP_SET_PROPERTY,
    [__0x.multiCursor]: RENDER_GROUP_SET_PROPERTY
};

export const DECORATION_STATE = {
    appliedHighlight: [],
    // selectionText: undefined,
    // diagnosticText: undefined,
} as const;

export const SELECTION_KIND_LIST = [
    __0x.cursorOnly,
    __0x.singleLine,
    __0x.multiLine,
    __0x.multiCursor,
];

export const HIGHLIGHT_STYLE_LIST = {
    [__0x.reset]: [],
    [__0x.cursorOnly]: [],
    [__0x.singleLine]: [],
    [__0x.multiLine]: [],
    [__0x.multiCursor]: []
} as const;

export const HIGHLIGHT_BORDER_POSITION_INFO = {
    [__0x.cursorOnly]: undefined,
    [__0x.singleLine]: undefined,
    [__0x.multiLine]: undefined,
    [__0x.multiCursor]: undefined
} as const;

export const DIAGNOSTIC_STATE = {
    severity: 0,
    editor: {
        warning: {
            total: 0
        },
        error: {
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
} as const;

export const SELECTION_CONTENT_TEXT = {
    [__0x.cursorOnlyText]: undefined,
    [__0x.singleLineText]: undefined,
    [__0x.multiLineCursorText]: undefined,
    [__0x.multiLineAnchorText]: undefined,
    [__0x.multiCursorText]: undefined,
} as const;

export const DIAGNOSTIC_CONTENT_TEXT = {
    layout: {},
    editor: {},
    workspace: {},
    all: {}
} as const;

export const DIAGNOSTIC_EDITOR_CONTENT_TEXT_KEYSET = {
    [__0x.okContentText]: __0x.okEditorContentText,
    [__0x.warningContentText]: __0x.errorEditorContentText,
    [__0x.errorContentText]: __0x.warningEditorContentText
};

export const DIAGNOSTIC_WORKSPACE_CONTENT_TEXT_KEYSET = {
    [__0x.okContentText]: __0x.okWorkspaceContentText,
    [__0x.warningContentText]: __0x.warningWorkspaceContentText,
    [__0x.errorContentText]: __0x.errorWorkspaceContentText
} as const;

