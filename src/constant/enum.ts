/**
 * [READONLY constants]
 * 
 */

// ==============================================================================
// [ NON-RUNTIME, COMPILE-TIME CONSTANT/ENUM ]
// ==============================================================================

export const enum SYSTEM_MESSAGE {
    RELOADING_CONFIG = 'Config has been changed. Reloading configuration. (Messaage Dismiss in 2 second.)'
}

export const enum SELECTION_TYPE {
    RESET = 'RESET',
    CURSOR_ONLY = 'CURSOR_ONLY',
    SINGLE_LINE = 'SINGLE_LINE',
    MULTI_LINE = 'MULTI_LINE',
    MULTI_CURSOR = 'MULTI_CURSOR',
}

export const enum DECORATION_TYPE_MASK {
    RESET = 0b1111,
    CURSOR_ONLY = 1 << 0,
    SINGLE_LINE = 1 << 1,
    MULTI_LINE = 1 << 2,
    MULTI_CURSOR = 1 << 3
}

export const enum DECORATION_STYLE_CONFIG_KEY {
    USE_OVERRIDE = 'useOverrride',
    IS_WHOLE_LINE = 'isWholeLine',
    BORDER_POSITION = 'borderPosition',
    BORDER_STYLE = 'borderStyle',
    BORDER_WIDTH = 'borderWidth',
    BORDER_COLOR = 'borderColor',
    BORDER_RADIUS = 'borderRadius',
    BACKGROUND_COLOR = 'backgroundColor',
    OVERVIEW_RULER_COLOR = 'overviewRulerColor',
    OVERVIEW_RULER_LANE = 'overviewRulerLane',
    // gutterIconPath: vscode.Uri.file('path/to/icon.svg'),
    // gutterIconSize: 'contain',
}

/**
 * configurable border position enum in setting.
 * 
 */
export const enum BORDER_POSITION_VARIATION {
    NONE = 'none',
    BOTTOM = 'bottom',
    TOP_BOTTOM = 'top-bottom',
    TOP_BOTTOM_LEFT = 'top-bottom-left',
    TOP_RIGHT_BOTTOM_LEFT = 'top-right-bottom-left',
    LEFT = 'left'
    // BOTTOM_LEFT = 'bottom-left',
    // TOP_LEFT = 'top-left',
}

/**
 * this enum does not need RESET field.
 * use as KEY only
 * 
 */
export const enum DECORATION_STYLE_KEY {
    CURSOR_ONLY = 'CURSOR_ONLY',
    SINGLE_LINE = 'SINGLE_LINE',
    MULTI_LINE = 'MULTI_LINE',
    MULTI_CURSOR = 'MULTI_CURSOR',
    // GENERAL = 'GENERAL',
}

export const enum DECORATION_GENERAL_STYLE_CONFIG_KEY {
    OPACITY = 'borderOpacity',
    BACKGROUND_OPACITY = 'backgroundOpacity',
    STATUS_TEXT_ENABLED = 'statusTextEnabled',
}

export const enum DECORATION_STATUS_STYLE_CONFIG_KEY {
    STATUS_TEXT_OPACITY = 'statusTextOpacity',
    STATUS_TEXT_COLOR = 'statusTextColor',
    STATUS_TEXT_BACKGROUND_COLOR = 'statusTextBackgroundColor',
    STATUS_TEXT_FONT_STYLE = 'statusTextFontStyle',
    STATUS_TEXT_FONT_WEIGHT = 'statusTextFontWeight'
}

export const enum CONFIG_KEY_LINKER {
    STATUS_TEXT_ENABLED = 'statusText.enabled',
    DIAGNOSTIC_TEXT_ENABLED = 'diagnosticText.enabled',
}
    
export const enum CONFIG_SECTION_KEY {
    GENERAL = 'general',
    CURSOR_ONLY = 'cursorOnly',
    SINGLE_LINE = 'singleLine',
    MULTI_LINE = 'multiLine',
    MULTI_CURSOR = 'multiCursor',
    STATUS_TEXT = 'statusText',
    DIAGNOSTIC_TEXT = 'diagnosticText'
}

export const enum STATUS_CONTENT_TEXT_CONFIG_KEY {
    CURSOR_ONLY_TEXT = 'cursorOnlyText',
    SINGLE_LINE_TEXT = 'singleLineText',
    MULTI_LINE_CURSOR_TEXT = 'multiLineCursorText',
    MULTI_LINE_ANCHOR_TEXT = 'multiLineAnchorText',
    MULTI_CURSOR_TEXT = 'multiCursorText',
}

export const enum DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY {
    OK_CONTENT_TEXT = 'okContentText',
    WARNING_CONTENT_TEXT = 'warningContentText',
    ERROR_CONTENT_TEXT = 'errorContentText',
}

/**
 * Array loop execution time: 21565757 nanoseconds
 * Bitwise loop execution time: 19745194 nanoseconds
 * - when loop size of 1000000.
 * 
 */
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
