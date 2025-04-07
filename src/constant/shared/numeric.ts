//::==============================================================================
//:: [ GLOBAL ] 0x00
//::==============================================================================
export const enum DECORATION_STATE_HEX {
    APPLIED_HIGHLIGHT = 0x01,
    DIAGNOSTIC_SIGNATURE = 0x02,
}

export const appliedHighlight = DECORATION_STATE_HEX.APPLIED_HIGHLIGHT;
export const diagnosticSignature = DECORATION_STATE_HEX.DIAGNOSTIC_SIGNATURE;

export const enum DECORATION {
    CONTENT_TEXT = 0x08,
    POSITION = 0x09
}

export const contentText = DECORATION.CONTENT_TEXT;
export const position = DECORATION.POSITION;

export const enum INDENT_INFO {
    SIZE = 0x10,
    TYPE = 0x11,
    REGEX = 0x12
}

export const size = INDENT_INFO.SIZE;
export const type = INDENT_INFO.TYPE;
export const regex = INDENT_INFO.REGEX;

export const enum DECORAION_INFO_PROP {
    KEY = 0x13,
    MASK = 0x14
}

export const KEY = DECORAION_INFO_PROP.KEY;
export const MASK = DECORAION_INFO_PROP.MASK

export const enum DECORAION_STATUS_PROP {
    CURRENT = 0x13,
    PREVIOSU = 0x14
}

export const current = DECORAION_STATUS_PROP.CURRENT;
export const previous = DECORAION_STATUS_PROP.PREVIOSU;

//::==============================================================================
//:: [ HIGHLIGHT/SELECTION ] 0x0100
//::==============================================================================
export const enum HEX_SELECTION_TYPE {
    RESET = 0x0100,         // 256
    CURSOR_ONLY = 0x0101,   // 257
    SINGLE_LINE = 0x0102,   // 258
    MULTI_LINE = 0x0103,    // 259
    MULTI_CURSOR = 0x0104,  // 260
}

export const reset = HEX_SELECTION_TYPE.RESET;
export const cursorOnly = HEX_SELECTION_TYPE.CURSOR_ONLY;
export const singleLine = HEX_SELECTION_TYPE.SINGLE_LINE;
export const multiLine = HEX_SELECTION_TYPE.MULTI_LINE;
export const multiCursor = HEX_SELECTION_TYPE.MULTI_CURSOR;

//::==============================================================================
//::[ SELECTION STATUS ] 0x0200
// ==============================================================================
export const enum HEX_SELECTION_TEXT {
    CURSOR_ONLY_TEXT = 0x0201,
    SINGLE_LINE_TEXT = 0x0202,
    MULTI_LINE_CURSOR_TEXT = 0x0203,
    MULTI_LINE_ANCHOR_TEXT = 0x0204,
    MULTI_CURSOR_TEXT = 0x0205,
}

export const cursorOnlyText = HEX_SELECTION_TEXT.CURSOR_ONLY_TEXT;
export const singleLineText = HEX_SELECTION_TEXT.SINGLE_LINE_TEXT;
export const multiLineCursorText = HEX_SELECTION_TEXT.MULTI_LINE_CURSOR_TEXT;
export const multiLineAnchorText = HEX_SELECTION_TEXT.MULTI_LINE_ANCHOR_TEXT;
export const multiCursorText = HEX_SELECTION_TEXT.MULTI_CURSOR_TEXT;

export const enum HEX_MULTILINE_FN {
    LC = 0x0206,    // 518
    CHAR = 0x0207,  // 519
}

export const multiLineLineCountHex = HEX_MULTILINE_FN.LC;
export const multiLineChararcterHex = HEX_MULTILINE_FN.CHAR;

//::==============================================================================
//::[ DIAGNOSTIC STATUS ] 0x0300
//::==============================================================================

export const enum HEX_DIAGNOSTIC_CONTENT_TEXT_KIND {
    OK_CONTENT_TEXT = 0x0301,       // 769
    WARNING_CONTENT_TEXT = 0x0302,  // 770
    ERROR_CONTENT_TEXT = 0x0303,    // 771
}

export const okContentText = HEX_DIAGNOSTIC_CONTENT_TEXT_KIND.OK_CONTENT_TEXT;
export const warningContentText = HEX_DIAGNOSTIC_CONTENT_TEXT_KIND.WARNING_CONTENT_TEXT;
export const errorContentText = HEX_DIAGNOSTIC_CONTENT_TEXT_KIND.ERROR_CONTENT_TEXT;

export const enum HEX_DIAGNOSTIC_STATUS_TEXT_KIND {
    ALL = 0x0304,                   // 772
    LAYOUT = 0x0305,                // 773
    EDITOR = 0x0306,                // 774
    WORKSPACE = 0x0307,             // 775
}

export const all = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.ALL;
export const layout = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.LAYOUT;
export const editor = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.EDITOR;
export const workspace = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.WORKSPACE;

export const enum HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT {
    ALL_OK_ALL = 0x0308,                // 776
    LAYOUT_ALLOKPLACEHOLDER = 0x0309,   // 777
    LAYOUT_PROBLEMPLACEHOLDER = 0x030A, // 778
    EDITOR_OK = 0x030B,                 // 779
    EDITOR_WARNING = 0x030C,            // 780
    EDITOR_ERROR = 0x030D,              // 781
    WORKSPACE_OK = 0x030E,              // 782
    WORKSPACE_WARNING = 0x030F,         // 783
    WORKSPACE_ERROR = 0x0310,           // 784
}

export const allOkPlaceholderContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.LAYOUT_ALLOKPLACEHOLDER;
export const problemPlaceholderContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.LAYOUT_PROBLEMPLACEHOLDER;
export const okAllContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.ALL_OK_ALL;
export const okEditorContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.EDITOR_OK;
export const warningEditorContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.EDITOR_WARNING;
export const errorEditorContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.EDITOR_ERROR;
export const okWorkspaceContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.WORKSPACE_OK;
export const warningWorkspaceContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.WORKSPACE_WARNING;
export const errorWorkspaceContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.WORKSPACE_ERROR;


export const enum DIAGNOSTIC_STATE {
    SEVERITY = 0x0311,  // 785
    WARNING = 0x0312,   // 786
    TOTAL = 0x0313,     // 787
    ERROR = 0x0314,     // 788
    SOURCE = 0x0315     // 789
}

export const severity = DIAGNOSTIC_STATE.SEVERITY;
export const warning = DIAGNOSTIC_STATE.WARNING;
export const total = DIAGNOSTIC_STATE.TOTAL;
export const error = DIAGNOSTIC_STATE.ERROR;
export const source = DIAGNOSTIC_STATE.SOURCE;

export const enum DIAGNOSTIC_PLACEHOLDER {
    ALL_OK = 0x0316,        // 790
    EDITOR = 0x0317,        // 791
    WORKSPACE = 0x0318,     // 792
}

export const allOkHexKey = DIAGNOSTIC_PLACEHOLDER.ALL_OK;
export const editorHexKey = DIAGNOSTIC_PLACEHOLDER.EDITOR;
export const workspaceHexKey = DIAGNOSTIC_PLACEHOLDER.WORKSPACE;

export const enum DIAGNOSTIC_PROBLEM_LINE_GLYPH {
    PROBLEM_LINE_UP = 0x0319,           // 793
    PROBLEM_LINE_DOWN = 0x031A,         // 794
    PROBLEM_LINE_EQUAL = 0x031B,        // 795
    PROBLEM_LINE_STARTBRACKET = 0x031C, // 796
    PROBLEM_LINE_ENDBRACKET = 0x031D,   // 797
}

export const problemLineUp = DIAGNOSTIC_PROBLEM_LINE_GLYPH.PROBLEM_LINE_UP;
export const problemLineDown = DIAGNOSTIC_PROBLEM_LINE_GLYPH.PROBLEM_LINE_DOWN;
export const problemLineEqual = DIAGNOSTIC_PROBLEM_LINE_GLYPH.PROBLEM_LINE_EQUAL;
export const problemLineStartBracket = DIAGNOSTIC_PROBLEM_LINE_GLYPH.PROBLEM_LINE_STARTBRACKET;
export const problemLineEndBracket = DIAGNOSTIC_PROBLEM_LINE_GLYPH.PROBLEM_LINE_ENDBRACKET;

//::==============================================================================
//::[ DIAGNOSTIC STATUS ] 0x00, 37 -> 218
//::==============================================================================

export const enum DIAGNOSTIC_STATE_SIGNATURE {
    ALL_OK_OVERRIDE = 0b00100101,       // 37 
    ALL_OK_NO_OVERRIDE = 0b00100110,    // 38
    E_OK_W_WARN = 0b00101010,           // 42
    E_OK_W_ERR = 0b00110010,            // 50
    E_OK_W_WARN_ERR = 0b00111010,       // 58
    E_WARN_W_WARN = 0b01001010,         // 74
    E_WARN_W_ERR = 0b01010010,          // 82
    E_WARN_W_WARN_ERR = 0b01011010,     // 90
    E_ERR_W_ERR = 0b10010010,           // 146
    E_ERR_W_WARN_ERR = 0b10011010,      // 154
    E_WARN_ERR_W_WARN_ERR = 0b11011010, // 218
}

export const allOkOverride = DIAGNOSTIC_STATE_SIGNATURE.ALL_OK_OVERRIDE;
export const allOkNoOverride = DIAGNOSTIC_STATE_SIGNATURE.ALL_OK_NO_OVERRIDE;
export const editorOkWorkspaceWarn = DIAGNOSTIC_STATE_SIGNATURE.E_OK_W_WARN;
export const editorOkWorkspaceErr = DIAGNOSTIC_STATE_SIGNATURE.E_OK_W_ERR;
export const editorOkWorkspaceWarnErr = DIAGNOSTIC_STATE_SIGNATURE.E_OK_W_WARN_ERR;
export const editorWarnWorkspaceWarn = DIAGNOSTIC_STATE_SIGNATURE.E_WARN_W_WARN;
export const editorWarnWorkspaceErr = DIAGNOSTIC_STATE_SIGNATURE.E_WARN_W_ERR;
export const editorWarnWorkspaceWarnErr = DIAGNOSTIC_STATE_SIGNATURE.E_WARN_W_WARN_ERR;
export const editorErrWorkspaceErr = DIAGNOSTIC_STATE_SIGNATURE.E_ERR_W_ERR;
export const editorErrWorkspaceWarnErr = DIAGNOSTIC_STATE_SIGNATURE.E_ERR_W_WARN_ERR;
export const editorWarnErrWorkspaceWarn_err = DIAGNOSTIC_STATE_SIGNATURE.E_WARN_ERR_W_WARN_ERR;

//::==============================================================================
//::[ MISC ] 0x1000, 00 is reserved.
//::==============================================================================



