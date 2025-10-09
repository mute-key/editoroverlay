/**
 * please read @link /src/numeric/hex.ts
 *
 * this module contains the constants that are to perform a bit calculations.
 *
 * this module has a couple of usage, which are;
 *
 * - to check the state of the key by checking the bit flag
 * - to use as a unique key for the objects
 * - to perform a funciton based on a certain value of the bit positions
 * - to create a key based on mix or combinations of the constants that represent a status
 *
 */
import type * as D from '../../type/type';
export declare const enum HEX_MULTI_CURSOR_INDEX_CONTROL_SIGNATURE {
    STATE_ONLY = 578,// 578 | 0010 (stt)
    CONTEXT_ONLY = 580,// 580 | 0100 (ctx)
    STATE_CONTEXT_CONTROL = 577,// 577 | 0001 (stt, ctx)
    INDEXLIST_CONTROL = 579,// 579 | 0011 (stt, ctx)
    BASEINDEX_CONTROL = 581,// 581 | 0101 (stt, ctx)
    OVERLAY_CONTROL = 583
}
export declare const stateOnlyControl: D.Numeric.Key.Bin;
export declare const stateContextControl: D.Numeric.Key.Bin;
export declare const contextOnlyControl: D.Numeric.Key.Bin;
export declare const indexListControl: D.Numeric.Key.Bin;
export declare const baseIndexControl: D.Numeric.Key.Bin;
export declare const overlayControl: D.Numeric.Key.Bin;
export declare const enum HEX_MULTI_CURSOR_ACTION {
    BASE_BIT = 0,// 0 => reset to cursor only
    NEXT_OCCURRENCE_INIT = 16,// 16, 0001 0000
    NEXT_OCCURRENCE = 32,// 32, 0010 0000
    ALL_OCCURRENCE = 64,// 64, 0100 0000 (auto sort supported)
    EDIT_BASE_BIT = 1,// 1 => reset to cursor only
    ADD_CURSOR_ASCENDING = 17,// 17, 0001 0001
    ADD_CURSOR_REORDER = 33,// 33, 0010 0001 (auto sort supported)
    CURSOR_ON_END_OF_LINES = 65,// 65, 0100 0001 (auto sort supported)
    MOVEMENT = 129
}
export declare const resetToCursorOnly: D.Numeric.Key.Bin;
export declare const allOccurrence: D.Numeric.Key.Bin;
export declare const nextOccurrenceInit: D.Numeric.Key.Bin;
export declare const nextOccurrence: D.Numeric.Key.Bin;
export declare const cursorOnEndOfLines: D.Numeric.Key.Bin;
export declare const addCursorSequential: D.Numeric.Key.Bin;
export declare const addCursorReorder: D.Numeric.Key.Bin;
export declare const movement: D.Numeric.Key.Bin;
export declare const callSignBaseBit = HEX_MULTI_CURSOR_ACTION.BASE_BIT;
export declare const editBitPosition: D.Numeric.Key.Bin;
/** if call sign & 0b0001 !== 0 => (stt, ctx) */
export declare const isSttCtxFnSign: D.Numeric.Key.Bin;
/** if call sign & 0b0010 !== 0 ? (stt only) OR (ctx only) */
export declare const isSttOrCtxFnSign: D.Numeric.Key.Bin;
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
export declare const enum MULTI_CURSOR_SELECTION_FLAG {
    NOT_FOUND = 0,
    TO_SHIFT_INDEX = 1,
    INDEX_SHIFTED = 2,
    ON_BASELINE = 4,
    AS_LAST_SELECTION = 8,
    NOT_AS_LAST_SELECTION = 16,
    INIT = 32
}
/** _5 */ export declare const firstToLast: D.Numeric.Key.Bin;
/** _1 */ export declare const firstToLastWithExistingDup: D.Numeric.Key.Bin;
/** 12 */ export declare const baseAndLast: D.Numeric.Key.Bin;
/** _8 */ export declare const lastOnly: D.Numeric.Key.Bin;
/** 10 */ export declare const asLastWithExistingDup: D.Numeric.Key.Bin;
/** 14 */ export declare const asLastOnBaseWithWithExistingDup: D.Numeric.Key.Bin;
/** 18 */ export declare const notAsLastWithoutExistingDup: D.Numeric.Key.Bin;
/** _6 */ export declare const withExistingDup = MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED;
/** 20 */ export declare const baseAndNotLast: D.Numeric.Key.Bin;
/** _0 */ export declare const noIndexControl: D.Numeric.Key.Bin;
/** _1 */ export declare const increaseIndex: D.Numeric.Key.Bin;
/** _2 */ export declare const withDup: D.Numeric.Key.Bin;
/** _3 */ export declare const newBeforeBaseWithDup: D.Numeric.Key.Bin;
/** 32 */ export declare const init: D.Numeric.Key.Bin;
/** 32 */ export declare const initButNewBeforeInit: D.Numeric.Key.Bin;
/**
 * bit position boolean references.
 *
 * i was thinking about renaming all these variables but
 * instead i decied to leave a bit position references,
 * if needed, i could write a funciton that will decode the
 * status signature decode function. just not now.
 *
 * isFirstEmpty                 1 << 0
 * isCurrentEmpty               1 << 1
 * normalizeSelectios           1 << 4
 * initalizeState               1 << 5
 * lastCountzero                1 << 8
 * countIsEqaul                 1 << 9
 * countLeap                    1 << 10
 * isIncreaseCursorByOne        1 << 12
 * newPositionBeforePrevious    1 << 16
 * newPositionEqualPrevious     1 << 17
 * newPositionNextPrevious      1 << 18
 * basePositionBeforePosition   1 << 19
 * basePositionEqualPosition    1 << 20
 * basePositionNextPosition     1 << 21
 *
 */
export declare const enum MULTI_CURSOR_STATE {
    NEXT_OCCURRENCE_INIT = 2883872,// 0b0010 1100 0000 0001 0010 0000
    NEXT_OCCURRENCE_0 = 2888704,// 0b0010 1100 0001 0100 0000 0000
    NEXT_OCCURRENCE_1 = 2233344,// 0b0010 0010 0001 0100 0000 0000
    NEXT_OCCURRENCE_2 = 1119232,// 0b0001 0001 0001 0100 0000 0000
    NEXT_OCCURRENCE_3 = 1184768,// 0b0001 0010 0001 0100 0000 0000
    NEXT_OCCURRENCE_4 = 70656,// 0b0000 0001 0001 0100 0000 0000 
    NEXT_OCCURRENCE_5 = 66560,// 0b0000 0001 0000 0100 0000 0000 
    ALL_OCCURRENCE = 2884896,// 0b0010 1100 0000 0101 0010 0000
    CURSOR_ON_END_OF_LINES_0 = 2884899,// 0b0010 1100 0000 0101 0010 0011
    CURSOR_ON_END_OF_LINES_1 = 2883875,// 0b0010 1100 0000 0001 0010 0011
    ADD_CURSOR_SEQUENTIAL = 2888707,// 0b0010 1100 0001 0100 0000 0011
    ADD_CURSOR_REORDER_0 = 2233347,// 0b0010 0010 0001 0100 0000 0011
    ADD_CURSOR_REORDER_1 = 2167811,// 0b0010 0001 0001 0100 0000 0011
    ADD_CURSOR_REORDER_2 = 70659,// 0b0000 0001 0001 0100 0000 0011 
    ADD_CURSOR_REORDER_3 = 66563,// 0b0000 0001 0000 0100 0000 0011 
    MOVEMENT_0 = 2229763,// 0b0010 0010 0000 0110 0000 0011
    MOVEMENT_1 = 2885123,// 0b0010 1100 0000 0110 0000 0011
    MOVEMENT_2 = 2884611,// 0b0010 1100 0000 0100 0000 0011
    MOVEMENT_3 = 2229251,// 0b0010 0010 0000 0100 0000 0011
    MOVEMENT_4 = 2163715,// 0b0010 0001 0000 0100 0000 0011
    MOVEMENT_5 = 2164227,// 0b0010 0001 0000 0110 0000 0011
    RESET_TO_CURSOR_ONLY_0 = 2229265,// 0b0010 0010 0000 0100 0001 0001
    RESET_TO_CURSOR_ONLY_1 = 2228241,// 0b0010 0010 0000 0000 0001 0001
    RESET_TO_CURSOR_ONLY_2 = 2229777,// 0b0010 0010 0000 0110 0001 0001
    RESET_TO_CURSOR_ONLY_3 = 1114115,// 0b0001 0001 0000 0000 0000 0011
    RESET_TO_CURSOR_ONLY_4 = 2162691,// 0b0010 0001 0000 0000 0000 0011
    RESET_TO_CURSOR_ONLY_5 = 2228739
}
export declare const enum DIAGNOSTIC_STATE_SIGNATURE {
    ALL_OK_OVERRIDE = 37,// 37 
    ALL_OK_NO_OVERRIDE = 38,// 38
    E_OK_W_WARN = 42,// 42
    E_OK_W_ERR = 50,// 50
    E_OK_W_WARN_ERR = 58,// 58
    E_WARN_W_WARN = 74,// 74
    E_WARN_W_ERR = 82,// 82
    E_WARN_W_WARN_ERR = 90,// 90
    E_ERR_W_ERR = 146,// 146
    E_ERR_W_WARN_ERR = 154,// 154
    E_WARN_ERR_W_WARN_ERR = 218
}
export declare const allOkOverride: D.Numeric.Key.Bin;
export declare const allOkNoOverride: D.Numeric.Key.Bin;
export declare const editorOkWorkspaceWarn: D.Numeric.Key.Bin;
export declare const editorOkWorkspaceErr: D.Numeric.Key.Bin;
export declare const editorOkWorkspaceWarnErr: D.Numeric.Key.Bin;
export declare const editorWarnWorkspaceWarn: D.Numeric.Key.Bin;
export declare const editorWarnWorkspaceErr: D.Numeric.Key.Bin;
export declare const editorWarnWorkspaceWarnErr: D.Numeric.Key.Bin;
export declare const editorErrWorkspaceErr: D.Numeric.Key.Bin;
export declare const editorErrWorkspaceWarnErr: D.Numeric.Key.Bin;
export declare const editorWarnErrWorkspaceWarnErr: D.Numeric.Key.Bin;
