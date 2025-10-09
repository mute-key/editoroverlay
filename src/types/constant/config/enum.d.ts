export declare const enum PRESET {
    RECOMMANDED = "Recommanded",
    DETAILED = "Detailed",
    SIMPLE = "Simple",
    NO_GLYPH_D = "No Glpyph - Detailed",
    NO_GLYPH_S = "No Glpyph - Simple",
    EMOJI_D = "Emoji - Detailed",
    EMOJI_S = "Emoji - Simple"
}
export declare const enum PRESET_ORIENTATION {
    VERTICAL = "Vertical",
    HORIZONTAL = "Horizontal"
}
export declare const enum CONTRAST {
    DIM = "Dim",
    BRIGHT = "Bright"
}
export declare const enum THEME_KIND {
    LIGHT = "Light",
    DARK = "Dark"
}
export declare const enum SYSTEM_MESSAGE {
    CONFIGURATION_RELOADED = "Config has been updated succeefully. Configuration Reloaded... (Messaage Dismiss in 2 second.)",
    CONFIGURATION_ERROR = "Please revise invalid values in configuration.",
    RESTORE_DEFAULT = "Are you sure to restore to default?",
    RESTORE_DEFAULT_COMPLETE = "Configuration has been restored to default.",
    PRESET_SELCT = " ... Select the Preset",
    PRESET_SELCT_ORIENTATION = " ... Select the Preset Orientation",
    PRESET_SELCT_COLOR = " ... Select the Theme Color",
    PRESET_SELCT_COLOR_CONTRAST = " ... Select the Color Contrast",
    OVERRIDE_CONFIRM = "Configuration will be overwritten. Proceed?"
}
export declare const enum PRESET_PATH {
    PRESET_ROOT = "resource/preset/",
    PRESET_DETAILED = "detailed.json",
    PRESET_SIMPLE = "simple.json",
    PRESET_NO_GLYPH_D = "no-glyph-detailed.json",
    PRESET_NO_GLYPH_S = "no-glyph-simple.json",
    PRESET_EMOJI_D = "emoji-detailed.json",
    PRESET_EMOJI_S = "emoji-simple.json",
    CONTRAST_DIM = "contrast-dim.json",
    CONTRAST_BRIGHT = "contrast-bright.json",
    THEME_LIGHT = "color-light-theme.json",
    THEME_DARK = "color-dark-theme.json",
    PRESET_ORIENTATION_HORIZONTAL = "orientation-horizontal.json",
    PRESET_ORIENTATION_VERTICAL = "orientation-vertical.json",
    PRESET_RECOMMANDED = "recommanded.json"
}
export declare const enum SELECTION_TYPE {
    RESET = "RESET",
    CURSOR_ONLY = "CURSOR_ONLY",
    SINGLE_LINE = "SINGLE_LINE",
    MULTI_LINE = "MULTI_LINE",
    MULTI_CURSOR = "MULTI_CURSOR"
}
export declare const enum CONFIRM {
    YES = "Yes",
    NO = "No"
}
/**
 * configurable border position enum in setting.
 *
 */
export declare const enum BORDER_POSITION_VARIATION {
    NONE = "none",
    BOTTOM = "bottom",
    TOP_BOTTOM = "top-bottom",
    TOP_BOTTOM_LEFT = "top-bottom-left",
    TOP_RIGHT_BOTTOM_LEFT = "top-right-bottom-left",
    LEFT = "left"
}
export declare const enum BORDER_POSITION_MASK {
    NONE = 0,
    BOTTOM = 2,
    BOTTOM_LEFT = 3,
    TOP = 8,
    TOP_LEFT = 9,
    TOP_BOTTOM = 10,
    TOP_RIGHT_BOTTOM_LEFT = 15,
    LEFT = 1
}
export declare const enum DECORATION_TYPE_MASK {
    RESET = 15,
    CURSOR_ONLY = 1,
    SINGLE_LINE = 2,
    MULTI_LINE = 4,
    MULTI_CURSOR = 8
}
export declare const enum DECORATION_STYLE_CONFIG_KEY {
    USE_OVERRIDE = "useOverrride",
    IS_WHOLE_LINE = "isWholeLine",
    BORDER_POSITION = "borderPosition",
    BORDER_STYLE = "borderStyle",
    BORDER_WIDTH = "borderWidth",
    BORDER_COLOR = "borderColor",
    BORDER_RADIUS = "borderRadius",
    BACKGROUND_COLOR = "backgroundColor",
    OVERVIEW_RULER_COLOR = "overviewRulerColor",
    OVERVIEW_RULER_LANE = "overviewRulerLane"
}
export declare const enum DECORATION_STYLE_KEY {
    CURSOR_ONLY = "CURSOR_ONLY",
    SINGLE_LINE = "SINGLE_LINE",
    MULTI_LINE = "MULTI_LINE",
    MULTI_CURSOR = "MULTI_CURSOR"
}
export declare const enum DECORATION_GENERAL_STYLE_CONFIG_KEY {
    OPACITY = "borderOpacity",
    BACKGROUND_OPACITY = "backgroundOpacity",
    SELECTION_TEXT_ENABLED = "selectionTextEnabled"
}
export declare const enum DECORATION_SELECTION_STYLE_CONFIG_KEY {
    SELECTION_TEXT_OPACITY = "selectionTextOpacity",
    SELECTION_TEXT_COLOR = "selectionTextColor",
    SELECTION_TEXT_BACKGROUND_COLOR = "selectionTextBackgroundColor",
    SELECTION_TEXT_FONT_STYLE = "selectionTextFontStyle",
    SELECTION_TEXT_FONT_WEIGHT = "selectionTextFontWeight"
}
export declare const enum CONFIG_KEY_LINKER {
    SELECTION_TEXT_ENABLED = "selectionTextEnabled",
    DIAGNOSTIC_TEXT_ENABLED = "diagnosticTextEnabled",
    SCM_TEXT_ENABLED = "scmTextEnabled"
}
export declare const enum CONFIG_SECTION_KEY {
    GENERAL = "general",
    CURSOR_ONLY = "cursorOnly",
    SINGLE_LINE = "singleLine",
    MULTI_LINE = "multiLine",
    MULTI_CURSOR = "multiCursor",
    SELECTION_TEXT = "selectionText",
    DIAGNOSTIC_TEXT = "diagnosticText",
    SCM_TEXT = "scmText"
}
export declare const enum SELECTION_CONTENT_TEXT_CONFIG_KEY {
    CURSOR_ONLY_TEXT = "cursorOnlyText",
    SINGLE_LINE_TEXT = "singleLineText",
    MULTI_LINE_CURSOR_TEXT = "multiLineCursorText",
    MULTI_LINE_ANCHOR_TEXT = "multiLineAnchorText",
    MULTI_CURSOR_TEXT = "multiCursorText",
    MULTI_CURSOR_EDIT = "multiCursorEdit"
}
export declare const enum DIAGNOSTIC_SEVERITY_KEY {
    WARNING = "warning",
    ERROR = "error"
}
export declare const enum DIAGNOSTIC_CONTENT_TEXT_KIND {
    OK_CONTENT_TEXT = "okContentText",
    WARNING_CONTENT_TEXT = "warningContentText",
    ERROR_CONTENT_TEXT = "errorContentText"
}
export declare const enum SCM_CONTENT_TEXT_KIND {
    BRANCH_NAME_CONTENT_TEXT = "branchNameContentText",
    BRANCH_STATUS_WORKING_CONTENT_TEXT = "branchStatusWorkingContentText"
}
export declare const enum DIAGNOSTIC_CONTENT_TEXT_KEY {
    PLACEHOLDER_PROBLEM_CONTENT_TEXT = "problemPlaceholderContentText",
    PLACEHOLDER_ALL_OK_CONTENT_TEXT = "allOkPlaceholderContentText",
    OK_WORKSPACE_CONTENT_TEXT = "okWorkspaceContentText",
    OK_EDITOR_CONTENT_TEXT = "okEditorContentText",
    OK_ALL_CONTENT_TEXT = "allOkContentText",
    WARNING_WORKSPACE_CONTENT_TEXT = "warningWorkspaceContentText",
    WARNING_EDITOR_CONTENT_TEXT = "warningEditorContentText",
    ERROR_WORKSPACE_CONTENT_TEXT = "errorWorkspaceContentText",
    ERROR_EDITOR_CONTENT_TEXT = "errorEditorContentText"
}
export declare const enum DIAGNOSTIC_TEXT_STYLE_KEY {
    DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE = "diagnosticPlaceholderTextStyle",
    OK_NOTATION_TEXT_STYLE = "okNotationTextStyle",
    OK_TEXT_STYLE = "okTextStyle",
    WARNING_NOTATION_TEXT_STYLE = "warningNotationTextStyle",
    WARNINGTEXT_STYLE = "warningTextStyle",
    ERROR_NOTATION_TEXT_STYLE = "errorNotationTextStyle",
    ERROR_TEXT_STYLE = "errorTextStyle"
}
export declare const enum DIAGNOSTIC_BIOME {
    NONE = 0,
    ALL = 7,
    OK = 1,
    WARN = 2,
    ERR = 4
}
export declare const enum DIAGNOSTIC_KIND {
    WORKSPACE_ONLY = "workspace Only",
    EDITOR_ONLY = "editor Only"
}
export declare const enum NULL_COLLECTION {
    STRING = ""
}
export declare const enum LINE_POSITION {
    INITIAL_CURSOR = "initial cursor",
    LAST_CURSOR = "last cursor",
    PREVIOUS_LINE = "previousLine",
    PREVIOUS_LINE_AUTO_INLINE = "previousLine (auto-inline)",
    NEXTLINE = "nextLine",
    NEXTLINE_AUTO_INLINE = "nextLine (auto-inline)"
}
