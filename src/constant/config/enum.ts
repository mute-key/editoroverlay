// ==============================================================================
// [ COMPILE-TIME CONSTANT ENUM ]
// ==============================================================================

export const enum PRESET {
    DETAILED = "Detailed",
    SHORTEN = "Shorten",
    NO_GLYPH_D = "No Glpyph - Detailed",
    NO_GLYPH_S = "No Glpyph - Simple",
    EMOJI_D = "Emoji - Detailed",
    EMOJI_S = "Emoji - Simple",
}

export const enum PRESET_ORIENTATION {
    VERTICAL = "Vertical",
    HORIZONTAL = "Horizontal",
}

export const enum COLOR {
    BLUR = "Blur",
    SHARP = "Sharp"
}

export const enum SYSTEM_MESSAGE {
    CONFIGURATION_RELOADED = "Config has been updated succeefully. Configuration Reloaded... (Messaage Dismiss in 2 second.)",
    CONFIGURATION_ERROR = "Please revise invalid values in configuration.",
    RESTORE_DEFAULT = "Are you sure to restore to default?",
    RESTORE_DEFAULT_COMPLETE = "Configuration has been restored to default.",
    PRESET_SELCT = " ... Select the Preset",
    PRESET_SELCT_ORIENTATION = " ... Select the Preset Orientation",
    PRESET_SELCT_COLOR = " ... Select the Color",
    OVERRIDE_CONFIRM = "Configuration will be overwritten. Proceed?"
}

export const enum SELECTION_TYPE {
    RESET = "RESET",
    CURSOR_ONLY = "CURSOR_ONLY",
    SINGLE_LINE = "SINGLE_LINE",
    MULTI_LINE = "MULTI_LINE",
    MULTI_CURSOR = "MULTI_CURSOR",
}

export const enum CONFIRM {
    YES = "Yes",
    NO = "No",
}

/**
 * configurable border position enum in setting.
 * 
 */
export const enum BORDER_POSITION_VARIATION {
    NONE = "none",
    BOTTOM = "bottom",
    TOP_BOTTOM = "top-bottom",
    TOP_BOTTOM_LEFT = "top-bottom-left",
    TOP_RIGHT_BOTTOM_LEFT = "top-right-bottom-left",
    LEFT = "left"
    // BOTTOM_LEFT = "bottom-left",
    // TOP_LEFT = "top-left",
}

export const enum BORDER_POSITION_MASK {
    NONE = 0b0000,
    BOTTOM = 0b0010,
    BOTTOM_LEFT = 0b0011,
    TOP = 0b1000,
    TOP_LEFT = 0b1001,
    TOP_BOTTOM = 0b1010,
    TOP_RIGHT_BOTTOM_LEFT = 0b1111,
    LEFT = 0b0001,
}

export const enum DECORATION_TYPE_MASK {
    RESET = 0b1111,
    CURSOR_ONLY = 1 << 0,
    SINGLE_LINE = 1 << 1,
    MULTI_LINE = 1 << 2,
    MULTI_CURSOR = 1 << 3
}

export const enum DECORATION_STYLE_CONFIG_KEY {
    USE_OVERRIDE = "useOverrride",
    IS_WHOLE_LINE = "isWholeLine",
    BORDER_POSITION = "borderPosition",
    BORDER_STYLE = "borderStyle",
    BORDER_WIDTH = "borderWidth",
    BORDER_COLOR = "borderColor",
    BORDER_RADIUS = "borderRadius",
    BACKGROUND_COLOR = "backgroundColor",
    OVERVIEW_RULER_COLOR = "overviewRulerColor",
    OVERVIEW_RULER_LANE = "overviewRulerLane",
    // gutterIconPath: vscode.Uri.file("path/to/icon.svg"),
    // gutterIconSize: "contain",
}

export const enum DECORATION_STYLE_KEY {
    CURSOR_ONLY = "CURSOR_ONLY",
    SINGLE_LINE = "SINGLE_LINE",
    MULTI_LINE = "MULTI_LINE",
    MULTI_CURSOR = "MULTI_CURSOR",
    // GENERAL = "GENERAL",
}

export const enum DECORATION_GENERAL_STYLE_CONFIG_KEY {
    OPACITY = "borderOpacity",
    BACKGROUND_OPACITY = "backgroundOpacity",
    SELECTION_TEXT_ENABLED = "selectionTextEnabled",
}

export const enum DECORATION_SELECTION_STYLE_CONFIG_KEY {
    SELECTION_TEXT_OPACITY = "selectionTextOpacity",
    SELECTION_TEXT_COLOR = "selectionTextColor",
    SELECTION_TEXT_BACKGROUND_COLOR = "selectionTextBackgroundColor",
    SELECTION_TEXT_FONT_STYLE = "selectionTextFontStyle",
    SELECTION_TEXT_FONT_WEIGHT = "selectionTextFontWeight"
}

export const enum CONFIG_KEY_LINKER {
    SELECTION_TEXT_ENABLED = "selectionTextEnabled",
    DIAGNOSTIC_TEXT_ENABLED = "diagnosticTextEnabled",
}

export const enum CONFIG_SECTION_KEY {
    GENERAL = "general",
    CURSOR_ONLY = "cursorOnly",
    SINGLE_LINE = "singleLine",
    MULTI_LINE = "multiLine",
    MULTI_CURSOR = "multiCursor",
    SELECTION_TEXT = "selectionText",
    DIAGNOSTIC_TEXT = "diagnosticText"
}

export const enum SELECTION_CONTENT_TEXT_CONFIG_KEY {
    CURSOR_ONLY_TEXT = "cursorOnlyText",
    SINGLE_LINE_TEXT = "singleLineText",
    MULTI_LINE_CURSOR_TEXT = "multiLineCursorText",
    MULTI_LINE_ANCHOR_TEXT = "multiLineAnchorText",
    MULTI_CURSOR_TEXT = "multiCursorText",
}

export const enum DIAGNOSTIC_SEVERITY_KEY {
    WARNING = "warning",
    ERROR = "error"
}

export const enum DIAGNOSTIC_CONTENT_TEXT_KIND {
    OK_CONTENT_TEXT = "okContentText",
    WARNING_CONTENT_TEXT = "warningContentText",
    ERROR_CONTENT_TEXT = "errorContentText",
}

export const enum DIAGNOSTIC_CONTENT_TEXT_KEY {
    PLACEHOLDER_PROBLEM_CONTENT_TEXT = "problemPlaceholderContentText",
    PLACEHOLDER_ALL_OK_CONTENT_TEXT = "allOkPlaceholderContentText",
    OK_WORKSPACE_CONTENT_TEXT = "okWorkspaceContentText",
    OK_EDITOR_CONTENT_TEXT = "okEditorContentText",
    OK_ALL_CONTENT_TEXT = "allOkContentText",
    WARNING_WORKSPACE_CONTENT_TEXT = "warningWorkspaceContentText",
    WARNING_EDITOR_CONTENT_TEXT = "warningEditorContentText",
    ERROR_WORKSPACE_CONTENT_TEXT = "errorWorkspaceContentText",
    ERROR_EDITOR_CONTENT_TEXT = "errorEditorContentText",
}

export const enum DIAGNOSTIC_TEXT_STYLE_KEY {
    DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE = "diagnosticPlaceholderTextStyle",
    OK_NOTATION_TEXT_STYLE = "okNotationTextStyle",
    OK_TEXT_STYLE = "okTextStyle",
    WARNING_NOTATION_TEXT_STYLE = "warningNotationTextStyle",
    WARNINGTEXT_STYLE = "warningTextStyle",
    ERROR_NOTATION_TEXT_STYLE = "errorNotationTextStyle",
    ERROR_TEXT_STYLE = "errorTextStyle", 
}

export const enum DIAGNOSTIC_BIOME {
    NONE = 0,
    ALL = 0b0111,
    OK = 1 << 0,
    WARN = 1 << 1,
    ERR = 1 << 2,
}

