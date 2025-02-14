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
        key: SELECTION_TYPE.RESET,
        mask: DECORATION_TYPE_MASK.RESET
    },
    [SELECTION_TYPE.CURSOR_ONLY]: {
        key: SELECTION_TYPE.CURSOR_ONLY,
        mask: DECORATION_TYPE_MASK.CURSOR_ONLY
    },
    [SELECTION_TYPE.SINGLE_LINE]: {
        key: SELECTION_TYPE.SINGLE_LINE,
        mask: DECORATION_TYPE_MASK.SINGLE_LINE
    },
    [SELECTION_TYPE.MULTI_LINE]: {
        key: SELECTION_TYPE.MULTI_LINE,
        mask: DECORATION_TYPE_MASK.MULTI_LINE
    },
    [SELECTION_TYPE.MULTI_CURSOR]: {
        key: SELECTION_TYPE.MULTI_CURSOR,
        mask: DECORATION_TYPE_MASK.MULTI_CURSOR
    } as const,
} as const;