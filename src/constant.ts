/**
 * [READONLY constants]
 * 
 */
import * as Type from './type.d';

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

export const DECORATION_INFO: Type.DecorationInfoType = {
    [SELECTION_TYPE.RESET]: {
        KEY: SELECTION_TYPE.RESET,
        MASK: DECORATION_TYPE_MASK.RESET
    },
    [SELECTION_TYPE.CURSOR_ONLY]: {
        KEY: SELECTION_TYPE.CURSOR_ONLY,
        MASK: DECORATION_TYPE_MASK.CURSOR_ONLY
    },
    [SELECTION_TYPE.SINGLE_LINE]: {
        KEY: SELECTION_TYPE.SINGLE_LINE,
        MASK: DECORATION_TYPE_MASK.SINGLE_LINE
    },
    [SELECTION_TYPE.MULTI_LINE]: {
        KEY: SELECTION_TYPE.MULTI_LINE,
        MASK: DECORATION_TYPE_MASK.MULTI_LINE
    },
    [SELECTION_TYPE.MULTI_CURSOR]: {
        KEY: SELECTION_TYPE.MULTI_CURSOR,
        MASK: DECORATION_TYPE_MASK.MULTI_CURSOR
    } as const,
} as const;

export const enum DECORATION_STYLE_CONFIG_KEY {
    USE_OVERRIDE = 'useOverrride',
    IS_WHOLE_LINE = 'isWholeLine',
    BORDER_WIDTH = 'borderWidth',
    BORDER_COLOR = 'borderColor',
    BORDER_STYLE = 'borderStyle',
    BORDER_RADIUS = 'borderRadius',
    BACKGROUND_COLOR = 'backgroundColor',
    // OVERVIEW_RULER_COLOR = 'overviewRulerColor',
    // OVERVIEW_RULER_LANE = 'overviewRulerLane',
    // FONT_WEIGHT = 'fontWeight'
};

/**
 * this enum does not need RESET field.
 * use as KEY VALUE pair
 * 
 */
export enum DECORATION_STYLE_PREFIX {
    CURSOR_ONLY = 'cursorOnly',
    SINGLE_LINE = 'singleLine',
    MULTI_LINE = 'multiLine',
    MULTI_CURSOR = 'multiCursor',
};

/**
 * this enum does not need RESET field.
 * use as KEY only
 * 
 */
export enum DECORATION_STYLE_KEY{
    CURSOR_ONLY = 'CURSOR_ONLY',
    SINGLE_LINE = 'SINGLE_LINE',
    MULTI_LINE = 'MULTI_LINE',
    MULTI_CURSOR = 'MULTI_CURSOR',
};

/**
 * needed capital letter keys for this constant object, therefore this object
 * usesconstant SELECTION_TYPE instead since SELECTION_TYPE have field values
 * in capitcal letters.
 * 
 */
export const DEOCORATION_DEFAULT_OVERRIDE: Type.DeocorationDefaultOverridType = {
    [DECORATION_STYLE_KEY.CURSOR_ONLY]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: true,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'solid',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#65EAB9'
    },
    [DECORATION_STYLE_KEY.SINGLE_LINE]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: false,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'solid',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#65EAB9'
    },
    [DECORATION_STYLE_KEY.MULTI_LINE]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: true,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'solid',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#65EAB9'
    },
    [DECORATION_STYLE_KEY.MULTI_CURSOR]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: false,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'solid',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#65EAB9'
        
    } as const,
} as const;