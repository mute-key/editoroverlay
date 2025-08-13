/* eslint-disable semi */
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
    MULTI_LINE_TEXT = 0x0203,
    MULTI_LINE_CURSOR_TEXT = 0x0204,
    MULTI_LINE_ANCHOR_TEXT = 0x0205,
    MULTI_CURSOR_TEXT = 0x0206,
    MULTI_CURSOR_EDIT = 0x0207,
    MULTI_CURSOR_SELECT = 0x0208,
}

export const cursorOnlyText = HEX_SELECTION_TEXT.CURSOR_ONLY_TEXT;
export const singleLineText = HEX_SELECTION_TEXT.SINGLE_LINE_TEXT;
export const multiLineText = HEX_SELECTION_TEXT.MULTI_LINE_TEXT;
export const multiLineCursorText = HEX_SELECTION_TEXT.MULTI_LINE_CURSOR_TEXT;
export const multiLineAnchorText = HEX_SELECTION_TEXT.MULTI_LINE_ANCHOR_TEXT;
export const multiCursorText = HEX_SELECTION_TEXT.MULTI_CURSOR_TEXT;
export const multiCursorEdit = HEX_SELECTION_TEXT.MULTI_CURSOR_EDIT;
// export const multiCursorSelect = HEX_SELECTION_TEXT.MULTI_CURSOR_SELECT;

export const enum HEX_MULTILINE_FN {
    LC = 0x0210,            // 517
    CHAR = 0x0211,          // 518
    CHAR_ONLY = 0x0212,     // 519
}

export const multiLineLineCountHex = HEX_MULTILINE_FN.LC;
export const multiLineChararcterHex = HEX_MULTILINE_FN.CHAR;
export const multiLineChararcterOnlyHex = HEX_MULTILINE_FN.CHAR_ONLY;

export const enum HEX_MULTI_CURSOR_FN {
    NTH = 0x0221,
    COUNT = 0x0222,
    LN = 0x0223,
    LC = 0x0224,
    CHAR = 0x0225,
}

export const multiCursorLineNthHex = HEX_MULTI_CURSOR_FN.NTH;
export const multiCursorLineCountHex = HEX_MULTI_CURSOR_FN.COUNT;
export const multiCursorLineLineNumberHex = HEX_MULTI_CURSOR_FN.LN;
export const multiCursorLineLineCountHex = HEX_MULTI_CURSOR_FN.LC;
export const multiCursorLineCharacterHex = HEX_MULTI_CURSOR_FN.CHAR;

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
export const allOkContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.ALL_OK_ALL;
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
    OPENNING_BRACKET = 0x0319,
    CLOSING_BRACKET = 0x031A,
    LINE_EQUAL = 0x031B,
    LINE_UP = 0x031C,
    LINE_DOWN = 0x031D,
}

export const openningBracket = DIAGNOSTIC_PROBLEM_LINE_GLYPH.OPENNING_BRACKET;
export const closingBracket = DIAGNOSTIC_PROBLEM_LINE_GLYPH.CLOSING_BRACKET;
export const lineEqual = DIAGNOSTIC_PROBLEM_LINE_GLYPH.LINE_EQUAL;
export const lineUp = DIAGNOSTIC_PROBLEM_LINE_GLYPH.LINE_UP;
export const lineDown = DIAGNOSTIC_PROBLEM_LINE_GLYPH.LINE_DOWN;

export const editorWarningTotal = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.EDITOR + DIAGNOSTIC_STATE.WARNING;
export const editorErrorTotal = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.EDITOR + DIAGNOSTIC_STATE.ERROR;
export const workspaceWarningSource = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.WORKSPACE + DIAGNOSTIC_STATE.WARNING + DIAGNOSTIC_STATE.SOURCE;
export const workspaceWarningTotal = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.WORKSPACE + DIAGNOSTIC_STATE.WARNING + DIAGNOSTIC_STATE.TOTAL;
export const workspaceErrorSource = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.WORKSPACE + DIAGNOSTIC_STATE.ERROR + DIAGNOSTIC_STATE.SOURCE;
export const workspaceErrorTotal = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.WORKSPACE + DIAGNOSTIC_STATE.ERROR + DIAGNOSTIC_STATE.TOTAL;

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
export const editorWarnErrWorkspaceWarnErr = DIAGNOSTIC_STATE_SIGNATURE.E_WARN_ERR_W_WARN_ERR;

//::==============================================================================
//::[ MISC ] 0x1000, 00 is reserved.
//::==============================================================================

export const enum EVENT_SIGNATURE {
    NO_EVENT = 0x1001,
    DIAGNOSTIC_CHANGED = 0x1002,
    SELECTION_CHANGED = 0x1003,
    DOCUMENT_CHANGED = 0x1004,
    EDITOR_TAB_CHANGED = 0x1004,
}

export const noEvent = EVENT_SIGNATURE.NO_EVENT;
export const diagnosticChanged = EVENT_SIGNATURE.DIAGNOSTIC_CHANGED; // 4098
export const selectionChanged = EVENT_SIGNATURE.SELECTION_CHANGED; // 4099
export const tabChanged = EVENT_SIGNATURE.EDITOR_TAB_CHANGED; // 4100

export const enum CONFIGURATION_CHANGE_CALLER {
    PRESET = 0x1101,
    PRESET_COMPLETE = 0x1102,
    SETTING_TAB = 0x1103,
    SETTING_JSON = 0x1104,
}

export const configruationCallerPreset = CONFIGURATION_CHANGE_CALLER.PRESET;
export const configruationCallerPresetComplete = CONFIGURATION_CHANGE_CALLER.PRESET_COMPLETE;
export const configruationCallerSettingTab = CONFIGURATION_CHANGE_CALLER.SETTING_TAB;
export const configruationCallerSettingJSon = CONFIGURATION_CHANGE_CALLER.SETTING_JSON;

export const enum MULTI_CURSOR_SELECTION_SIGNATURE {
    DUPLICATE_LINE = 0b00000000,
    TO_SHIFT_INDEX = 0b00000001,
    INDEX_SHIFTED = 0b00000010,
    ON_BASELINE = 0b00000100,
    AS_LAST_SELECTION = 0b00001000,
    DUPLICATE_LINE_NOT_AS_LAST_SELECTION = 0b00010000,
}

export const recurringLine0 = MULTI_CURSOR_SELECTION_SIGNATURE.TO_SHIFT_INDEX + MULTI_CURSOR_SELECTION_SIGNATURE.ON_BASELINE
export const recurringLine1 = MULTI_CURSOR_SELECTION_SIGNATURE.TO_SHIFT_INDEX
export const recurringLine2 = MULTI_CURSOR_SELECTION_SIGNATURE.ON_BASELINE + MULTI_CURSOR_SELECTION_SIGNATURE.AS_LAST_SELECTION
export const recurringLine3 = MULTI_CURSOR_SELECTION_SIGNATURE.ON_BASELINE
export const recurringLine4 = MULTI_CURSOR_SELECTION_SIGNATURE.AS_LAST_SELECTION
export const recurringLine5 = MULTI_CURSOR_SELECTION_SIGNATURE.INDEX_SHIFTED + MULTI_CURSOR_SELECTION_SIGNATURE.ON_BASELINE
export const recurringLine6 = MULTI_CURSOR_SELECTION_SIGNATURE.INDEX_SHIFTED + MULTI_CURSOR_SELECTION_SIGNATURE.AS_LAST_SELECTION
export const recurringLine7 = MULTI_CURSOR_SELECTION_SIGNATURE.INDEX_SHIFTED + MULTI_CURSOR_SELECTION_SIGNATURE.ON_BASELINE + MULTI_CURSOR_SELECTION_SIGNATURE.AS_LAST_SELECTION
export const recurringLine8 = MULTI_CURSOR_SELECTION_SIGNATURE.INDEX_SHIFTED + MULTI_CURSOR_SELECTION_SIGNATURE.DUPLICATE_LINE_NOT_AS_LAST_SELECTION
export const recurringLine9 = MULTI_CURSOR_SELECTION_SIGNATURE.ON_BASELINE + MULTI_CURSOR_SELECTION_SIGNATURE.DUPLICATE_LINE_NOT_AS_LAST_SELECTION

export const nonRecurringLine0 = MULTI_CURSOR_SELECTION_SIGNATURE.TO_SHIFT_INDEX
export const nonRecurringLine1 = MULTI_CURSOR_SELECTION_SIGNATURE.INDEX_SHIFTED

