/**
 * [READONLY constants]
 * 
 */
import * as Type from './type/type.d';

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
};

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
};

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
};

export const enum DECORATION_GENERAL_STYLE_CONFIG_KEY {
    OPACITY = 'borderOpacity',
    BACKGROUND_OPACITY = 'backgroundOpacity',
    STATUS_TEXT_OPACITY = 'statusTextOpacity',
    STATUS_TEXT_COLOR = 'statusTextColor',
    STATUS_TEXT_BACKGROUND_COLOR = 'statusTextBackgroundColor',
    BORDER_WIDTH = 'borderWidth',
    BORDER_COLOR = 'borderColor',
    BACKGROUND_COLOR = 'backgroundColor',
};

/**
 * Array loop execution time: 21565757 nanoseconds
 * Bit loop execution time: 19745194 nanoseconds
 * when loop size of 1000000.
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

// ==============================================================================
// [ RUNTIME READONLY CONSTANT/ENUM ]
// ==============================================================================

/**
 * readonly config object lteral structure. 
 * import, shallow copy, as Type.ConfigInfoType. 
 * 
 */
export const CONFIG_INFO = {
    name: undefined,
    config: undefined,
    configHashKey: undefined,
    status: {
        position: undefined,
        decorationType: undefined,
        indent: {
            size: undefined,
            type: undefined
        } as const,
    } as const,
    decorationList: {
        CURSOR_ONLY: undefined,
        SINGLE_LINE: undefined,
        MULTI_LINE: undefined,
        MULTI_CURSOR: undefined,
    } as const,
    borderPositionInfo: {
        CURSOR_ONLY: undefined,
        SINGLE_LINE: undefined,
        MULTI_LINE: undefined,
        MULTI_CURSOR: undefined,
    } as const,
    generalConfigInfo: {
        borderOpacity: undefined,
        backgroundOpacity: undefined,
        statusTextOpacity: undefined,
        borderWidth: undefined,
        borderColor: undefined,
        backgroundColor: undefined,
        statusTextColor: undefined,
        statusTextBackgroundColor: undefined
    } as const
} as const;

export const APPLIED_DECORATION = {
    applied: undefined,
    editorDecoration: undefined
} as const;

/**
 * type split done 
 * 
 */
export const SINGLE_BORDER_SELECTION = {
    [BORDER_POSITION_VARIATION.NONE]: [
        BORDER_POSITION_MASK.NONE
    ] as const,
    [BORDER_POSITION_VARIATION.BOTTOM]: [
        BORDER_POSITION_MASK.BOTTOM,
        BORDER_POSITION_MASK.NONE
    ] as const,
    [BORDER_POSITION_VARIATION.TOP_BOTTOM]: [
        BORDER_POSITION_MASK.TOP_BOTTOM
    ] as const,
    [BORDER_POSITION_VARIATION.TOP_RIGHT_BOTTOM_LEFT]: [
        BORDER_POSITION_MASK.TOP_RIGHT_BOTTOM_LEFT,
        BORDER_POSITION_MASK.NONE
    ] as const,
    [BORDER_POSITION_VARIATION.LEFT]: [
        BORDER_POSITION_MASK.LEFT
    ] as const,
} as const;

/**
 * use only for multiline single selection.
 * 
 */
export const MULTILINE_BORDER_SELECTION = {
    [BORDER_POSITION_VARIATION.NONE]: [
        BORDER_POSITION_MASK.NONE,
        BORDER_POSITION_MASK.NONE,
        BORDER_POSITION_MASK.NONE,
    ] as const,
    [BORDER_POSITION_VARIATION.TOP_BOTTOM]: [
        BORDER_POSITION_MASK.TOP,
        BORDER_POSITION_MASK.BOTTOM,
        BORDER_POSITION_MASK.NONE
    ] as const,
    [BORDER_POSITION_VARIATION.LEFT]: [
        BORDER_POSITION_MASK.LEFT,
        BORDER_POSITION_MASK.LEFT,
        BORDER_POSITION_MASK.LEFT,
    ] as const,
} as const;

export const BORDER_WIDTH_DEFINITION = {
    [DECORATION_STYLE_KEY.CURSOR_ONLY]: SINGLE_BORDER_SELECTION,
    [DECORATION_STYLE_KEY.SINGLE_LINE]: SINGLE_BORDER_SELECTION,
    [DECORATION_STYLE_KEY.MULTI_LINE]: MULTILINE_BORDER_SELECTION,
    [DECORATION_STYLE_KEY.MULTI_CURSOR]: SINGLE_BORDER_SELECTION,
} as const;

export const DECORATION_INFO: Type.DecorationInfoType = {
    [SELECTION_TYPE.RESET]: {
        KEY: SELECTION_TYPE.RESET,
        MASK: DECORATION_TYPE_MASK.RESET
    } as const,
    [SELECTION_TYPE.CURSOR_ONLY]: {
        KEY: SELECTION_TYPE.CURSOR_ONLY,
        MASK: DECORATION_TYPE_MASK.CURSOR_ONLY
    } as const,
    [SELECTION_TYPE.SINGLE_LINE]: {
        KEY: SELECTION_TYPE.SINGLE_LINE,
        MASK: DECORATION_TYPE_MASK.SINGLE_LINE
    } as const,
    [SELECTION_TYPE.MULTI_LINE]: {
        KEY: SELECTION_TYPE.MULTI_LINE,
        MASK: DECORATION_TYPE_MASK.MULTI_LINE
    } as const,
    [SELECTION_TYPE.MULTI_CURSOR]: {
        KEY: SELECTION_TYPE.MULTI_CURSOR,
        MASK: DECORATION_TYPE_MASK.MULTI_CURSOR
    } as const,
} as const;

/**
 * this prob could be const enum too but this needs to be used as an object
 * so this is object literal it is.
 * 
 */
export const DECORATION_STYLE_PREFIX = {
    CURSOR_ONLY: 'cursorOnly',
    SINGLE_LINE: 'singleLine',
    MULTI_LINE: 'multiLine',
    MULTI_CURSOR: 'multiCursor',
} as const;

/**
 * to protect runtime as well as notify user that malformed configuration value in setting.json.
 * 
 */
export const NO_CONFIGURATION_GENERAL_DEFAULT: Type.NoConfigurationGeneraType = {
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.OPACITY]: 1,
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.BACKGROUND_OPACITY]: 0.5,
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.STATUS_TEXT_COLOR]: '#FF0000',
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.STATUS_TEXT_OPACITY]: 1
} as const;

export const NO_CONFIGURATION_DEOCORATION_DEFAULT: Type.NoConfigurationDecorationType = {
    [DECORATION_STYLE_KEY.CURSOR_ONLY]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: true,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '3px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
    [DECORATION_STYLE_KEY.SINGLE_LINE]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: false,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '3px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
    [DECORATION_STYLE_KEY.MULTI_LINE]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: true,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '3px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
    [DECORATION_STYLE_KEY.MULTI_CURSOR]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: false,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '3px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
} as const;