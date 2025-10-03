/* eslint-disable semi */

/**
 * D.Numeric.Key.Hex
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
 * my goal was to create unique, meaningful keys, hoping that native support for numeric 
 * keys with better performance might be introduced in the future. the performance 
 * difference between string and number keys is almost non-existent (though some difference
 * remains) since both are primitives with minimal overhead. the exact performance depends
 * on the specific use case, which i have yet to fully distinguish.
 * 
 * it was my thought that current design brings more advantage than using string literals. 
 * 
 */

import type * as D from '../../type/type'

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
//::==============================================================================
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

// export const multiCursorBase = HEX_SELECTION_TEXT.MULTI_CURSOR_TEXT as D.Numeric.Key.Hex

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
    COL = 0x0235,       // 563
    ZCOL = 0x0236,      // 564
}

export const multiCursorLineNthHex = HEX_MULTI_CURSOR_FN.NTH as D.Numeric.Key.Hex
export const multiCursorLineCountHex = HEX_MULTI_CURSOR_FN.COUNT as D.Numeric.Key.Hex
export const multiCursorLineLineNumberHex = HEX_MULTI_CURSOR_FN.LN as D.Numeric.Key.Hex
export const multiCursorLineLineCountHex = HEX_MULTI_CURSOR_FN.LC as D.Numeric.Key.Hex
export const multiCursorLineCharacterHex = HEX_MULTI_CURSOR_FN.CHAR as D.Numeric.Key.Hex
export const multiCursorLineLineColHex = HEX_MULTI_CURSOR_FN.COL as D.Numeric.Key.Hex
export const multiCursorLineLineZColHex = HEX_MULTI_CURSOR_FN.ZCOL as D.Numeric.Key.Hex

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

export const enum DIAGNOSTIC_STATE_KEY {
    SEVERITY = 0x0311,  // 785
    WARNING = 0x0312,   // 786
    TOTAL = 0x0313,     // 787
    ERROR = 0x0314,     // 788
    SOURCE = 0x0315     // 789
}

export const severity = DIAGNOSTIC_STATE_KEY.SEVERITY as D.Numeric.Key.Hex
export const warning = DIAGNOSTIC_STATE_KEY.WARNING as D.Numeric.Key.Hex
export const total = DIAGNOSTIC_STATE_KEY.TOTAL as D.Numeric.Key.Hex
export const error = DIAGNOSTIC_STATE_KEY.ERROR as D.Numeric.Key.Hex
export const source = DIAGNOSTIC_STATE_KEY.SOURCE as D.Numeric.Key.Hex

export const enum DIAGNOSTIC_PLACEHOLDER {
    ALL_OK = 0x0316,        // 790
    EDITOR = 0x0317,        // 791
    WORKSPACE = 0x0318,     // 792
    PREFIX = 0x0319,        // 793
    POSTFIX = 0x031A,       // 794
}

export const allOkHexKey = DIAGNOSTIC_PLACEHOLDER.ALL_OK as D.Numeric.Key.Hex
export const editorHexKey = DIAGNOSTIC_PLACEHOLDER.EDITOR as D.Numeric.Key.Hex
export const workspaceHexKey = DIAGNOSTIC_PLACEHOLDER.WORKSPACE as D.Numeric.Key.Hex
export const prefixHex = DIAGNOSTIC_PLACEHOLDER.PREFIX as D.Numeric.Key.Hex
export const postfixHex = DIAGNOSTIC_PLACEHOLDER.POSTFIX as D.Numeric.Key.Hex

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

// calibration needed make the it unqiue
export const editorWarningTotal = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.EDITOR + DIAGNOSTIC_STATE_KEY.WARNING as D.Numeric.Key.Hex
export const editorErrorTotal = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.EDITOR + DIAGNOSTIC_STATE_KEY.ERROR as D.Numeric.Key.Hex
export const workspaceWarningSource = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.WORKSPACE + DIAGNOSTIC_STATE_KEY.WARNING + DIAGNOSTIC_STATE_KEY.SOURCE as D.Numeric.Key.Hex   // 2350
export const workspaceWarningTotal = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.WORKSPACE + DIAGNOSTIC_STATE_KEY.WARNING + DIAGNOSTIC_STATE_KEY.TOTAL + 1 as D.Numeric.Key.Hex // 2350 + 1
export const workspaceErrorSource = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.WORKSPACE + DIAGNOSTIC_STATE_KEY.ERROR + DIAGNOSTIC_STATE_KEY.SOURCE as D.Numeric.Key.Hex       // 2352
export const workspaceErrorTotal = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.WORKSPACE + DIAGNOSTIC_STATE_KEY.ERROR + DIAGNOSTIC_STATE_KEY.TOTAL + 3 as D.Numeric.Key.Hex     // 2350 + 3


//::==============================================================================
//::[ SCM/GIT STATUS ] 0x0400, 00 is reserved.
//::==============================================================================

export const enum SCM_RENDER_OPTION_KEY {
    SCM_ICON = 0x0401,
    SCM_BASE = 0x0402,
    SCM_PARSING = 0x0403,
    SCM_EXTERNAL = 0x0404,
}

export const scmIcon = SCM_RENDER_OPTION_KEY.SCM_ICON as D.Numeric.Key.Hex
export const scmBase = SCM_RENDER_OPTION_KEY.SCM_BASE as D.Numeric.Key.Hex
export const scmParsing = SCM_RENDER_OPTION_KEY.SCM_PARSING as D.Numeric.Key.Hex
export const scmExternal = SCM_RENDER_OPTION_KEY.SCM_EXTERNAL as D.Numeric.Key.Hex

export const enum SCM_SVG_ICON_TYPE_KEY {
    SCM_ACTIVE = 0x0405,
    SCM_INACTIVE = 0x0406,
    SCM_NOT_REPOSITORY = 0x0407,
    SCM_UNKOWN = 0x0407,
}

export const scmSVGActive = SCM_SVG_ICON_TYPE_KEY.SCM_ACTIVE as D.Numeric.Key.Hex
export const scmSVGInactive = SCM_SVG_ICON_TYPE_KEY.SCM_INACTIVE as D.Numeric.Key.Hex
export const scmSVGNotRepository = SCM_SVG_ICON_TYPE_KEY.SCM_NOT_REPOSITORY as D.Numeric.Key.Hex
export const scmSVGUnknown = SCM_SVG_ICON_TYPE_KEY.SCM_UNKOWN as D.Numeric.Key.Hex

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
