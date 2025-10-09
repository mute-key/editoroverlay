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
import type * as D from '../../type/type';
export declare const enum DECORATION_STATE_HEX {
    APPLIED_HIGHLIGHT = 1,
    DIAGNOSTIC_SIGNATURE = 2
}
export declare const appliedHighlight: D.Numeric.Key.Hex;
export declare const diagnosticSignature: D.Numeric.Key.Hex;
export declare const enum DECORATION {
    CONTENT_TEXT = 8,
    POSITION = 9
}
export declare const contentText: D.Numeric.Key.Hex;
export declare const position: D.Numeric.Key.Hex;
export declare const enum INDENT_INFO {
    SIZE = 16,// 16
    TYPE = 17,// 17
    REGEX = 18
}
export declare const size: D.Numeric.Key.Hex;
export declare const type: D.Numeric.Key.Hex;
export declare const regex: D.Numeric.Key.Hex;
export declare const enum DECORAION_INFO_PROP {
    KEY = 19,// 19
    MASK = 20
}
export declare const KEY: D.Numeric.Key.Hex;
export declare const MASK: D.Numeric.Key.Hex;
export declare const enum DECORAION_STATUS_PROP {
    CURRENT = 21,// 21
    PREVIOSU = 22
}
export declare const current: D.Numeric.Key.Hex;
export declare const previous: D.Numeric.Key.Hex;
export declare const enum HEX_SELECTION_TYPE {
    RESET = 256,// 256
    CURSOR_ONLY = 257,// 257
    SINGLE_LINE = 258,// 258
    MULTI_LINE = 259,// 259
    MULTI_CURSOR = 260
}
export declare const reset: D.Numeric.Key.Hex;
export declare const cursorOnly: D.Numeric.Key.Hex;
export declare const singleLine: D.Numeric.Key.Hex;
export declare const multiLine: D.Numeric.Key.Hex;
export declare const multiCursor: D.Numeric.Key.Hex;
export declare const enum HEX_SELECTION_TEXT {
    CURSOR_ONLY_TEXT = 513,// 513
    SINGLE_LINE_TEXT = 514,// 514
    MULTI_LINE_TEXT = 515,// 515
    MULTI_LINE_CURSOR_TEXT = 516,// 516
    MULTI_LINE_ANCHOR_TEXT = 517,// 517
    MULTI_CURSOR_TEXT = 518,// 518
    MULTI_CURSOR_EDIT = 519
}
export declare const cursorOnlyText: D.Numeric.Key.Hex;
export declare const singleLineText: D.Numeric.Key.Hex;
export declare const multiLineText: D.Numeric.Key.Hex;
export declare const multiLineCursorText: D.Numeric.Key.Hex;
export declare const multiLineAnchorText: D.Numeric.Key.Hex;
export declare const multiCursorText: D.Numeric.Key.Hex;
export declare const multiCursorEdit: D.Numeric.Key.Hex;
export declare const enum HEX_MULTILINE_FN {
    LC = 544,// 544
    CHAR = 545,// 545
    CHAR_ONLY = 546
}
export declare const multiLineLineCountHex = HEX_MULTILINE_FN.LC;
export declare const multiLineChararcterHex = HEX_MULTILINE_FN.CHAR;
export declare const multiLineChararcterOnlyHex = HEX_MULTILINE_FN.CHAR_ONLY;
export declare const enum HEX_MULTI_CURSOR_FN {
    NTH = 560,// 560
    COUNT = 561,// 561
    LN = 562,// 562
    LC = 563,// 563
    CHAR = 564,// 564
    COL = 565,// 563
    ZCOL = 566
}
export declare const multiCursorLineNthHex: D.Numeric.Key.Hex;
export declare const multiCursorLineCountHex: D.Numeric.Key.Hex;
export declare const multiCursorLineLineNumberHex: D.Numeric.Key.Hex;
export declare const multiCursorLineLineCountHex: D.Numeric.Key.Hex;
export declare const multiCursorLineCharacterHex: D.Numeric.Key.Hex;
export declare const multiCursorLineLineColHex: D.Numeric.Key.Hex;
export declare const multiCursorLineLineZColHex: D.Numeric.Key.Hex;
export declare const enum HEX_DIAGNOSTIC_CONTENT_TEXT_KIND {
    OK_CONTENT_TEXT = 769,// 769
    WARNING_CONTENT_TEXT = 770,// 770
    ERROR_CONTENT_TEXT = 771
}
export declare const okContentText: D.Numeric.Key.Hex;
export declare const warningContentText: D.Numeric.Key.Hex;
export declare const errorContentText: D.Numeric.Key.Hex;
export declare const enum HEX_DIAGNOSTIC_STATUS_TEXT_KIND {
    ALL = 772,// 772
    LAYOUT = 773,// 773
    EDITOR = 774,// 774
    WORKSPACE = 775
}
export declare const all: D.Numeric.Key.Hex;
export declare const layout: D.Numeric.Key.Hex;
export declare const editor: D.Numeric.Key.Hex;
export declare const workspace: D.Numeric.Key.Hex;
export declare const enum HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT {
    ALL_OK_ALL = 776,// 776
    LAYOUT_ALLOKPLACEHOLDER = 777,// 777
    LAYOUT_PROBLEMPLACEHOLDER = 778,// 778
    EDITOR_OK = 779,// 779
    EDITOR_WARNING = 780,// 780
    EDITOR_ERROR = 781,// 781
    WORKSPACE_OK = 782,// 782
    WORKSPACE_WARNING = 783,// 783
    WORKSPACE_ERROR = 784
}
export declare const allOkPlaceholderContentText: D.Numeric.Key.Hex;
export declare const problemPlaceholderContentText: D.Numeric.Key.Hex;
export declare const allOkContentText: D.Numeric.Key.Hex;
export declare const okEditorContentText: D.Numeric.Key.Hex;
export declare const warningEditorContentText: D.Numeric.Key.Hex;
export declare const errorEditorContentText: D.Numeric.Key.Hex;
export declare const okWorkspaceContentText: D.Numeric.Key.Hex;
export declare const warningWorkspaceContentText: D.Numeric.Key.Hex;
export declare const errorWorkspaceContentText: D.Numeric.Key.Hex;
export declare const enum DIAGNOSTIC_STATE_KEY {
    SEVERITY = 785,// 785
    WARNING = 786,// 786
    TOTAL = 787,// 787
    ERROR = 788,// 788
    SOURCE = 789
}
export declare const severity: D.Numeric.Key.Hex;
export declare const warning: D.Numeric.Key.Hex;
export declare const total: D.Numeric.Key.Hex;
export declare const error: D.Numeric.Key.Hex;
export declare const source: D.Numeric.Key.Hex;
export declare const enum DIAGNOSTIC_PLACEHOLDER {
    ALL_OK = 790,// 790
    EDITOR = 791,// 791
    WORKSPACE = 792,// 792
    PREFIX = 793,// 793
    POSTFIX = 794
}
export declare const allOkHexKey: D.Numeric.Key.Hex;
export declare const editorHexKey: D.Numeric.Key.Hex;
export declare const workspaceHexKey: D.Numeric.Key.Hex;
export declare const prefixHex: D.Numeric.Key.Hex;
export declare const postfixHex: D.Numeric.Key.Hex;
export declare const enum DIAGNOSTIC_PROBLEM_LINE_GLYPH {
    OPENNING_BRACKET = 793,// 793
    CLOSING_BRACKET = 794,// 794
    LINE_EQUAL = 795,// 795
    LINE_UP = 796,// 796
    LINE_DOWN = 797
}
export declare const openningBracket: D.Numeric.Key.Hex;
export declare const closingBracket: D.Numeric.Key.Hex;
export declare const lineEqual: D.Numeric.Key.Hex;
export declare const lineUp: D.Numeric.Key.Hex;
export declare const lineDown: D.Numeric.Key.Hex;
export declare const editorWarningTotal: D.Numeric.Key.Hex;
export declare const editorErrorTotal: D.Numeric.Key.Hex;
export declare const workspaceWarningSource: D.Numeric.Key.Hex;
export declare const workspaceWarningTotal: D.Numeric.Key.Hex;
export declare const workspaceErrorSource: D.Numeric.Key.Hex;
export declare const workspaceErrorTotal: D.Numeric.Key.Hex;
export declare const enum SCM_RENDER_OPTION_KEY {
    SCM_ICON = 1025,
    SCM_BASE = 1026,
    SCM_PARSING = 1027,
    SCM_EXTERNAL = 1028
}
export declare const scmIcon: D.Numeric.Key.Hex;
export declare const scmBase: D.Numeric.Key.Hex;
export declare const scmParsing: D.Numeric.Key.Hex;
export declare const scmExternal: D.Numeric.Key.Hex;
export declare const enum SCM_SVG_ICON_TYPE_KEY {
    SCM_ACTIVE = 1029,
    SCM_INACTIVE = 1030,
    SCM_NOT_REPOSITORY = 1031,
    SCM_UNKOWN = 1031
}
export declare const scmSVGActive: D.Numeric.Key.Hex;
export declare const scmSVGInactive: D.Numeric.Key.Hex;
export declare const scmSVGNotRepository: D.Numeric.Key.Hex;
export declare const scmSVGUnknown: D.Numeric.Key.Hex;
export declare const enum EVENT_SIGNATURE {
    NO_EVENT = 4097,// 4097
    DIAGNOSTIC_CHANGED = 4098,// 4098
    SELECTION_CHANGED = 4099,// 4099
    DOCUMENT_CHANGED = 4100,// 4100
    EDITOR_TAB_CHANGED = 4100
}
export declare const noEvent: D.Numeric.Key.Hex;
export declare const diagnosticChanged: D.Numeric.Key.Hex;
export declare const selectionChanged: D.Numeric.Key.Hex;
export declare const tabChanged: D.Numeric.Key.Hex;
export declare const enum CONFIGURATION_CHANGE_CALLER {
    PRESET = 4353,// 4353
    PRESET_COMPLETE = 4354,// 4354
    SETTING_TAB = 4355,// 4355
    SETTING_JSON = 4356
}
export declare const configruationCallerPreset: D.Numeric.Key.Hex;
export declare const configruationCallerPresetComplete: D.Numeric.Key.Hex;
export declare const configruationCallerSettingTab: D.Numeric.Key.Hex;
export declare const configruationCallerSettingJSon: D.Numeric.Key.Hex;
