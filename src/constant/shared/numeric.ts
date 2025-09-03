/* eslint-disable semi */

/**
 * D.Numeric.Key.Hex
 * D.Numeric.Key.Bin
 *
 * at the engine level, object keys can only be strings or symbols.
 * (although symbols exist, i'm not using them here.)
 * 
 * even when a number is used as a key, it is automatically converted to a string.
 * however, these string keys do not inherently guarantee uniqueness,
 * nor do they provide a mechanism to efficiently search for object properties.
 * while symbols can be slower, using strings is often slightly faster than using numbers
 * because native strings don't require conversion.
 * 
 * sometimes, a javascript engine might show better performance by perfectly inlining
 * numeric keys, but this behavior is inconsistent.
 * 
 * my goal was to create unique, meaningful keys, hoping that native
 * support for numeric keys with better performance might be introduced in the future.
 * the performance difference between string and number keys is almost non-existent
 * (though some difference remains) since both are primitives with minimal overhead.
 * the exact performance depends on the specific use case, which i have yet to fully 
 * distinguish.
 * 
 * it was my thought that current design brings more advantage than using string literals
 * 
 */
import * as D from '../../type/type'

//::==============================================================================
//:: [ GLOBAL ] 0x00
//::==============================================================================
export const enum DECORATION_STATE_HEX {
    APPLIED_HIGHLIGHT = 0x01,
    DIAGNOSTIC_SIGNATURE = 0x02,
}

export const appliedHighlight = DECORATION_STATE_HEX.APPLIED_HIGHLIGHT as D.Numeric.Key.Hex
export const diagnosticSignature = DECORATION_STATE_HEX.DIAGNOSTIC_SIGNATURE as D.Numeric.Key.Hex

export const enum DECORATION {
    CONTENT_TEXT = 0x08,
    POSITION = 0x09
}

export const contentText = DECORATION.CONTENT_TEXT as D.Numeric.Key.Hex
export const position = DECORATION.POSITION as D.Numeric.Key.Hex

export const enum INDENT_INFO {
    SIZE = 0x10, // 16
    TYPE = 0x11, // 17
    REGEX = 0x12 // 18
}

export const size = INDENT_INFO.SIZE as D.Numeric.Key.Hex
export const type = INDENT_INFO.TYPE as D.Numeric.Key.Hex
export const regex = INDENT_INFO.REGEX as D.Numeric.Key.Hex

export const enum DECORAION_INFO_PROP {
    KEY = 0x13, // 19
    MASK = 0x14 // 20
}

export const KEY = DECORAION_INFO_PROP.KEY as D.Numeric.Key.Hex
export const MASK = DECORAION_INFO_PROP.MASK as D.Numeric.Key.Hex

export const enum DECORAION_STATUS_PROP {
    CURRENT = 0x15, // 21
    PREVIOSU = 0x16 // 22
}

export const current = DECORAION_STATUS_PROP.CURRENT as D.Numeric.Key.Hex
export const previous = DECORAION_STATUS_PROP.PREVIOSU as D.Numeric.Key.Hex

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

export const reset = HEX_SELECTION_TYPE.RESET as D.Numeric.Key.Hex
export const cursorOnly = HEX_SELECTION_TYPE.CURSOR_ONLY as D.Numeric.Key.Hex
export const singleLine = HEX_SELECTION_TYPE.SINGLE_LINE as D.Numeric.Key.Hex
export const multiLine = HEX_SELECTION_TYPE.MULTI_LINE as D.Numeric.Key.Hex
export const multiCursor = HEX_SELECTION_TYPE.MULTI_CURSOR as D.Numeric.Key.Hex

//::==============================================================================
//::[ SELECTION STATUS ] 0x020
// 
0
// ==============================================================================
export const enum HEX_SELECTION_TEXT {
    CURSOR_ONLY_TEXT = 0x0201,          // 513
    SINGLE_LINE_TEXT = 0x0202,          // 514
    MULTI_LINE_TEXT = 0x0203,           // 515
    MULTI_LINE_CURSOR_TEXT = 0x0204,    // 516
    MULTI_LINE_ANCHOR_TEXT = 0x0205,    // 517
    MULTI_CURSOR_TEXT = 0x0206,         // 518
    MULTI_CURSOR_EDIT = 0x0207,         // 519
}

export const cursorOnlyText = HEX_SELECTION_TEXT.CURSOR_ONLY_TEXT as D.Numeric.Key.Hex
export const singleLineText = HEX_SELECTION_TEXT.SINGLE_LINE_TEXT as D.Numeric.Key.Hex
export const multiLineText = HEX_SELECTION_TEXT.MULTI_LINE_TEXT as D.Numeric.Key.Hex
export const multiLineCursorText = HEX_SELECTION_TEXT.MULTI_LINE_CURSOR_TEXT as D.Numeric.Key.Hex
export const multiLineAnchorText = HEX_SELECTION_TEXT.MULTI_LINE_ANCHOR_TEXT as D.Numeric.Key.Hex
export const multiCursorText = HEX_SELECTION_TEXT.MULTI_CURSOR_TEXT as D.Numeric.Key.Hex
export const multiCursorEdit = HEX_SELECTION_TEXT.MULTI_CURSOR_EDIT as D.Numeric.Key.Hex

/**
 * allOccurrence (selection)
 * nextOccurrence (selection)
 * cursorOnEndOfLines (cursor, empty selections)
 * movement (cursor, empty selections)
 * addCursor (cursor, empty selections)
 * 
 */
export const enum HEX_MULTI_CURSOR_ACTION {
    BAES = 0x0210,                      // 528 | ... 0000
    ALL_OCCURRENCE = 0x021A,            // 530 | ... 1010
    NEXT_OCCURRENCE_INIT = 0x021C,      // 540 | ... 1100
    NEXT_OCCURRENCE = 0x0216,           // 534 | ... 0110
    CURSOR_ON_END_OF_LINES = 0x021F,    // 543 | ... 1111
    MOVEMENT = 0x0219,                  // 537 | ... 0111
    ADD_CURSOR = 0x021B,                // 539 | ... 0011
}

export const allOccurrence = HEX_MULTI_CURSOR_ACTION.ALL_OCCURRENCE as D.Numeric.Key.Hex
export const nextOccurrenceInit = HEX_MULTI_CURSOR_ACTION.NEXT_OCCURRENCE_INIT as D.Numeric.Key.Hex
export const nextOccurrence = HEX_MULTI_CURSOR_ACTION.NEXT_OCCURRENCE as D.Numeric.Key.Hex
export const cursorOnEndOfLines = HEX_MULTI_CURSOR_ACTION.CURSOR_ON_END_OF_LINES as D.Numeric.Key.Hex
export const movement = HEX_MULTI_CURSOR_ACTION.MOVEMENT as D.Numeric.Key.Hex
export const addCursor = HEX_MULTI_CURSOR_ACTION.ADD_CURSOR as D.Numeric.Key.Hex

export const enum HEX_MULTILINE_FN {
    LC = 0x0220,            // 544
    CHAR = 0x0221,          // 545
    CHAR_ONLY = 0x0222,     // 546
}

export const multiLineLineCountHex = HEX_MULTILINE_FN.LC
export const multiLineChararcterHex = HEX_MULTILINE_FN.CHAR
export const multiLineChararcterOnlyHex = HEX_MULTILINE_FN.CHAR_ONLY

export const enum HEX_MULTI_CURSOR_FN {
    NTH = 0x0230,       // 560
    COUNT = 0x0231,     // 561
    LN = 0x0232,        // 562
    LC = 0x0233,        // 563
    CHAR = 0x0234,      // 564
}

export const multiCursorLineNthHex = HEX_MULTI_CURSOR_FN.NTH as D.Numeric.Key.Hex
export const multiCursorLineCountHex = HEX_MULTI_CURSOR_FN.COUNT as D.Numeric.Key.Hex
export const multiCursorLineLineNumberHex = HEX_MULTI_CURSOR_FN.LN as D.Numeric.Key.Hex
export const multiCursorLineLineCountHex = HEX_MULTI_CURSOR_FN.LC as D.Numeric.Key.Hex
export const multiCursorLineCharacterHex = HEX_MULTI_CURSOR_FN.CHAR as D.Numeric.Key.Hex

export const enum HEX_MULTI_CURSOR_INDEX_CONTROL_SIGNATURE {
    STATE_ONLY = 0x0240, // 576
    INDEX_ONLY = 0x0241, // 577
    OVERLAY_ONLY = 0x0242, // 578
    CONTEXT_ONLY = 0x0243, // 579
};

export const stateOnlyControl = HEX_MULTI_CURSOR_INDEX_CONTROL_SIGNATURE.STATE_ONLY as D.Numeric.Key.Hex
export const indexOnlyControl = HEX_MULTI_CURSOR_INDEX_CONTROL_SIGNATURE.INDEX_ONLY as D.Numeric.Key.Hex
export const overlayControl = HEX_MULTI_CURSOR_INDEX_CONTROL_SIGNATURE.OVERLAY_ONLY as D.Numeric.Key.Hex
export const contextControl = HEX_MULTI_CURSOR_INDEX_CONTROL_SIGNATURE.CONTEXT_ONLY as D.Numeric.Key.Hex

//::==============================================================================
//::[ DIAGNOSTIC STATUS ] 0x0300
//::==============================================================================

export const enum HEX_DIAGNOSTIC_CONTENT_TEXT_KIND {
    OK_CONTENT_TEXT = 0x0301,       // 769
    WARNING_CONTENT_TEXT = 0x0302,  // 770
    ERROR_CONTENT_TEXT = 0x0303,    // 771
}

export const okContentText = HEX_DIAGNOSTIC_CONTENT_TEXT_KIND.OK_CONTENT_TEXT as D.Numeric.Key.Hex
export const warningContentText = HEX_DIAGNOSTIC_CONTENT_TEXT_KIND.WARNING_CONTENT_TEXT as D.Numeric.Key.Hex
export const errorContentText = HEX_DIAGNOSTIC_CONTENT_TEXT_KIND.ERROR_CONTENT_TEXT as D.Numeric.Key.Hex

export const enum HEX_DIAGNOSTIC_STATUS_TEXT_KIND {
    ALL = 0x0304,                   // 772
    LAYOUT = 0x0305,                // 773
    EDITOR = 0x0306,                // 774
    WORKSPACE = 0x0307,             // 775
}

export const all = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.ALL as D.Numeric.Key.Hex
export const layout = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.LAYOUT as D.Numeric.Key.Hex
export const editor = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.EDITOR as D.Numeric.Key.Hex
export const workspace = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.WORKSPACE as D.Numeric.Key.Hex

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

export const allOkPlaceholderContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.LAYOUT_ALLOKPLACEHOLDER as D.Numeric.Key.Hex
export const problemPlaceholderContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.LAYOUT_PROBLEMPLACEHOLDER as D.Numeric.Key.Hex
export const allOkContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.ALL_OK_ALL as D.Numeric.Key.Hex
export const okEditorContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.EDITOR_OK as D.Numeric.Key.Hex
export const warningEditorContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.EDITOR_WARNING as D.Numeric.Key.Hex
export const errorEditorContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.EDITOR_ERROR as D.Numeric.Key.Hex
export const okWorkspaceContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.WORKSPACE_OK as D.Numeric.Key.Hex
export const warningWorkspaceContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.WORKSPACE_WARNING as D.Numeric.Key.Hex
export const errorWorkspaceContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.WORKSPACE_ERROR as D.Numeric.Key.Hex


export const enum DIAGNOSTIC_STATE {
    SEVERITY = 0x0311,  // 785
    WARNING = 0x0312,   // 786
    TOTAL = 0x0313,     // 787
    ERROR = 0x0314,     // 788
    SOURCE = 0x0315     // 789
}

export const severity = DIAGNOSTIC_STATE.SEVERITY as D.Numeric.Key.Hex
export const warning = DIAGNOSTIC_STATE.WARNING as D.Numeric.Key.Hex
export const total = DIAGNOSTIC_STATE.TOTAL as D.Numeric.Key.Hex
export const error = DIAGNOSTIC_STATE.ERROR as D.Numeric.Key.Hex
export const source = DIAGNOSTIC_STATE.SOURCE as D.Numeric.Key.Hex

export const enum DIAGNOSTIC_PLACEHOLDER {
    ALL_OK = 0x0316,        // 790
    EDITOR = 0x0317,        // 791
    WORKSPACE = 0x0318,     // 792
}

export const allOkHexKey = DIAGNOSTIC_PLACEHOLDER.ALL_OK as D.Numeric.Key.Hex
export const editorHexKey = DIAGNOSTIC_PLACEHOLDER.EDITOR as D.Numeric.Key.Hex
export const workspaceHexKey = DIAGNOSTIC_PLACEHOLDER.WORKSPACE as D.Numeric.Key.Hex

export const enum DIAGNOSTIC_PROBLEM_LINE_GLYPH {
    OPENNING_BRACKET = 0x0319,  // 793
    CLOSING_BRACKET = 0x031A,   // 794
    LINE_EQUAL = 0x031B,        // 795
    LINE_UP = 0x031C,           // 796
    LINE_DOWN = 0x031D,         // 797
}

export const openningBracket = DIAGNOSTIC_PROBLEM_LINE_GLYPH.OPENNING_BRACKET as D.Numeric.Key.Hex
export const closingBracket = DIAGNOSTIC_PROBLEM_LINE_GLYPH.CLOSING_BRACKET as D.Numeric.Key.Hex
export const lineEqual = DIAGNOSTIC_PROBLEM_LINE_GLYPH.LINE_EQUAL as D.Numeric.Key.Hex
export const lineUp = DIAGNOSTIC_PROBLEM_LINE_GLYPH.LINE_UP as D.Numeric.Key.Hex
export const lineDown = DIAGNOSTIC_PROBLEM_LINE_GLYPH.LINE_DOWN as D.Numeric.Key.Hex

export const editorWarningTotal = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.EDITOR + DIAGNOSTIC_STATE.WARNING as D.Numeric.Key.Hex
export const editorErrorTotal = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.EDITOR + DIAGNOSTIC_STATE.ERROR as D.Numeric.Key.Hex
export const workspaceWarningSource = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.WORKSPACE + DIAGNOSTIC_STATE.WARNING + DIAGNOSTIC_STATE.SOURCE as D.Numeric.Key.Hex
export const workspaceWarningTotal = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.WORKSPACE + DIAGNOSTIC_STATE.WARNING + DIAGNOSTIC_STATE.TOTAL as D.Numeric.Key.Hex
export const workspaceErrorSource = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.WORKSPACE + DIAGNOSTIC_STATE.ERROR + DIAGNOSTIC_STATE.SOURCE as D.Numeric.Key.Hex
export const workspaceErrorTotal = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.WORKSPACE + DIAGNOSTIC_STATE.ERROR + DIAGNOSTIC_STATE.TOTAL as D.Numeric.Key.Hex

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

export const allOkOverride = DIAGNOSTIC_STATE_SIGNATURE.ALL_OK_OVERRIDE as D.Numeric.Key.Bin
export const allOkNoOverride = DIAGNOSTIC_STATE_SIGNATURE.ALL_OK_NO_OVERRIDE as D.Numeric.Key.Bin
export const editorOkWorkspaceWarn = DIAGNOSTIC_STATE_SIGNATURE.E_OK_W_WARN as D.Numeric.Key.Bin
export const editorOkWorkspaceErr = DIAGNOSTIC_STATE_SIGNATURE.E_OK_W_ERR as D.Numeric.Key.Bin
export const editorOkWorkspaceWarnErr = DIAGNOSTIC_STATE_SIGNATURE.E_OK_W_WARN_ERR as D.Numeric.Key.Bin
export const editorWarnWorkspaceWarn = DIAGNOSTIC_STATE_SIGNATURE.E_WARN_W_WARN as D.Numeric.Key.Bin
export const editorWarnWorkspaceErr = DIAGNOSTIC_STATE_SIGNATURE.E_WARN_W_ERR as D.Numeric.Key.Bin
export const editorWarnWorkspaceWarnErr = DIAGNOSTIC_STATE_SIGNATURE.E_WARN_W_WARN_ERR as D.Numeric.Key.Bin
export const editorErrWorkspaceErr = DIAGNOSTIC_STATE_SIGNATURE.E_ERR_W_ERR as D.Numeric.Key.Bin
export const editorErrWorkspaceWarnErr = DIAGNOSTIC_STATE_SIGNATURE.E_ERR_W_WARN_ERR as D.Numeric.Key.Bin
export const editorWarnErrWorkspaceWarnErr = DIAGNOSTIC_STATE_SIGNATURE.E_WARN_ERR_W_WARN_ERR as D.Numeric.Key.Bin

//::==============================================================================
//::[ MISC ] 0x1000, 00 is reserved.
//::==============================================================================

export const enum EVENT_SIGNATURE {
    NO_EVENT = 0x1001,              // 4097
    DIAGNOSTIC_CHANGED = 0x1002,    // 4098
    SELECTION_CHANGED = 0x1003,     // 4099
    DOCUMENT_CHANGED = 0x1004,      // 4100
    EDITOR_TAB_CHANGED = 0x1004,    // 4101
}

export const noEvent = EVENT_SIGNATURE.NO_EVENT as D.Numeric.Key.Hex
export const diagnosticChanged = EVENT_SIGNATURE.DIAGNOSTIC_CHANGED as D.Numeric.Key.Hex
export const selectionChanged = EVENT_SIGNATURE.SELECTION_CHANGED as D.Numeric.Key.Hex
export const tabChanged = EVENT_SIGNATURE.EDITOR_TAB_CHANGED as D.Numeric.Key.Hex

export const enum CONFIGURATION_CHANGE_CALLER {
    PRESET = 0x1101,            // 4353
    PRESET_COMPLETE = 0x1102,   // 4354
    SETTING_TAB = 0x1103,       // 4355
    SETTING_JSON = 0x1104,      // 4356
}

export const configruationCallerPreset = CONFIGURATION_CHANGE_CALLER.PRESET as D.Numeric.Key.Hex
export const configruationCallerPresetComplete = CONFIGURATION_CHANGE_CALLER.PRESET_COMPLETE as D.Numeric.Key.Hex
export const configruationCallerSettingTab = CONFIGURATION_CHANGE_CALLER.SETTING_TAB as D.Numeric.Key.Hex
export const configruationCallerSettingJSon = CONFIGURATION_CHANGE_CALLER.SETTING_JSON as D.Numeric.Key.Hex



//::==============================================================================
//::[ Numeric.Tp MASKS ] 
//::==============================================================================

/**
 * baseline only changes when new selection is go above it's initial selection of multi-cursor mode. 
 * as in, new index is going to be in reverse, without mutation.
 * 
 * [ NOT_FOUND ]               as named
 * [ TO_SHIFT_INDEX ]          if nth index need to be incrased by 1
 * [ INDEX_SHIFTED ]           if duplicate occured previously and nth index need to be appended on most recent overlay.
 * [ ON_BASELINE ]             if new selection is on same line as base selection. 
 * [ AS_LAST_SELECTION ]       if new selection is on same line of previous selection
 * [ NOT_AS_LAST_SELECTION ]   if new selection is not on same line as previous selection
 * 
 */
export const enum MULTI_CURSOR_SELECTION_FLAG {
    NOT_FOUND = 0b0000,           // 0
    TO_SHIFT_INDEX = 0x01,        // 1
    INDEX_SHIFTED = 0x02,         // 2
    ON_BASELINE = 0x04,           // 4
    AS_LAST_SELECTION = 0x08,     // 8 
    NOT_AS_LAST_SELECTION = 0x10, // 16
    INIT = 0x20,                  // 32
}

/**
 * prob these constants can have better name to indiciate when/which situation they are belong to
 * it is too ambiguius at the moment
 * recurringLine(s) as when the cursor is more than 1 in same line.
 * nonRecurringLine as when cursor does not collapse on any of the selected lines
 * 
 * #TODO: need better const names
 * 
 */
export const recurringLine0 /* 5 */ = MULTI_CURSOR_SELECTION_FLAG.TO_SHIFT_INDEX + MULTI_CURSOR_SELECTION_FLAG.ON_BASELINE as D.Numeric.Key.Bin
export const recurringLine1 /* 1 */ = MULTI_CURSOR_SELECTION_FLAG.TO_SHIFT_INDEX as D.Numeric.Key.Bin
export const recurringLine2 /* 12 */ = MULTI_CURSOR_SELECTION_FLAG.ON_BASELINE + MULTI_CURSOR_SELECTION_FLAG.AS_LAST_SELECTION as D.Numeric.Key.Bin
export const recurringLine3 /* 4 */ = MULTI_CURSOR_SELECTION_FLAG.ON_BASELINE as D.Numeric.Key.Bin
export const recurringLine4 /* 8 */ = MULTI_CURSOR_SELECTION_FLAG.AS_LAST_SELECTION as D.Numeric.Key.Bin
export const recurringLine5 /* 6 */ = MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED + MULTI_CURSOR_SELECTION_FLAG.ON_BASELINE as D.Numeric.Key.Bin
export const recurringLine6 /* 10 */ = MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED + MULTI_CURSOR_SELECTION_FLAG.AS_LAST_SELECTION as D.Numeric.Key.Bin
export const recurringLine7 /* 14 */ = MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED + MULTI_CURSOR_SELECTION_FLAG.ON_BASELINE + MULTI_CURSOR_SELECTION_FLAG.AS_LAST_SELECTION as D.Numeric.Key.Bin
export const recurringLine8 /* 18 */ = MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED + MULTI_CURSOR_SELECTION_FLAG.NOT_AS_LAST_SELECTION as D.Numeric.Key.Bin
export const recurringLine9 /* 20 */ = MULTI_CURSOR_SELECTION_FLAG.ON_BASELINE + MULTI_CURSOR_SELECTION_FLAG.NOT_AS_LAST_SELECTION as D.Numeric.Key.Bin

export const nonRecurringLine0 /* 0 */ = MULTI_CURSOR_SELECTION_FLAG.NOT_FOUND as D.Numeric.Key.Bin
export const nonRecurringLine1 /* 1 */ = MULTI_CURSOR_SELECTION_FLAG.TO_SHIFT_INDEX as D.Numeric.Key.Bin
export const nonRecurringLine2 /* 2 */ = MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED as D.Numeric.Key.Bin
export const nonRecurringLine3 /* 3 */ = MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED + MULTI_CURSOR_SELECTION_FLAG.TO_SHIFT_INDEX as D.Numeric.Key.Bin
export const nonRecurringLine4 /* 32 */ = MULTI_CURSOR_SELECTION_FLAG.INIT as D.Numeric.Key.Bin




