/* eslint-disable semi */ 

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

import type * as D from '../../type/type'

export const enum HEX_MULTI_CURSOR_INDEX_CONTROL_SIGNATURE {
    STATE_ONLY = 0x0242,                // 578 | 0010 (stt)
    CONTEXT_ONLY = 0x0244,              // 580 | 0100 (ctx)
    STATE_CONTEXT_CONTROL = 0x0241,     // 577 | 0001 (stt, ctx)
    INDEXLIST_CONTROL = 0x0243,         // 579 | 0011 (stt, ctx)
    BASEINDEX_CONTROL = 0x0245,         // 581 | 0101 (stt, ctx)
    OVERLAY_CONTROL = 0x0247,           // 583 | 0111 (stt, ctx)
};

export const stateOnlyControl = HEX_MULTI_CURSOR_INDEX_CONTROL_SIGNATURE.STATE_ONLY as D.Numeric.Key.Bin
export const stateContextControl = HEX_MULTI_CURSOR_INDEX_CONTROL_SIGNATURE.STATE_CONTEXT_CONTROL as D.Numeric.Key.Bin
export const contextOnlyControl = HEX_MULTI_CURSOR_INDEX_CONTROL_SIGNATURE.CONTEXT_ONLY as D.Numeric.Key.Bin
export const indexListControl = HEX_MULTI_CURSOR_INDEX_CONTROL_SIGNATURE.INDEXLIST_CONTROL as D.Numeric.Key.Bin
export const baseIndexControl = HEX_MULTI_CURSOR_INDEX_CONTROL_SIGNATURE.BASEINDEX_CONTROL as D.Numeric.Key.Bin
export const overlayControl = HEX_MULTI_CURSOR_INDEX_CONTROL_SIGNATURE.OVERLAY_CONTROL as D.Numeric.Key.Bin

export const enum HEX_MULTI_CURSOR_ACTION {
    BASE_BIT = 0,                           // 0 => reset to cursor only
    NEXT_OCCURRENCE_INIT = 16,              // 16, 0001 0000
    NEXT_OCCURRENCE = 32,                   // 32, 0010 0000
    ALL_OCCURRENCE = 64,                    // 64, 0100 0000 (auto sort supported)
    EDIT_BASE_BIT = 1,                      // 1 => reset to cursor only
    ADD_CURSOR_ASCENDING = 17,              // 17, 0001 0001
    ADD_CURSOR_REORDER = 33,                // 33, 0010 0001 (auto sort supported)
    CURSOR_ON_END_OF_LINES = 65,            // 65, 0100 0001 (auto sort supported)
    MOVEMENT = 129,                         // 129, 1000 0001
}

export const resetToCursorOnly = HEX_MULTI_CURSOR_ACTION.EDIT_BASE_BIT as D.Numeric.Key.Bin
export const allOccurrence = HEX_MULTI_CURSOR_ACTION.ALL_OCCURRENCE as D.Numeric.Key.Bin
export const nextOccurrenceInit = HEX_MULTI_CURSOR_ACTION.NEXT_OCCURRENCE_INIT as D.Numeric.Key.Bin
export const nextOccurrence = HEX_MULTI_CURSOR_ACTION.NEXT_OCCURRENCE as D.Numeric.Key.Bin
export const cursorOnEndOfLines = HEX_MULTI_CURSOR_ACTION.CURSOR_ON_END_OF_LINES as D.Numeric.Key.Bin
export const addCursorSequential = HEX_MULTI_CURSOR_ACTION.ADD_CURSOR_ASCENDING as D.Numeric.Key.Bin
export const addCursorReorder = HEX_MULTI_CURSOR_ACTION.ADD_CURSOR_REORDER as D.Numeric.Key.Bin
export const movement = HEX_MULTI_CURSOR_ACTION.MOVEMENT as D.Numeric.Key.Bin

export const callSignBaseBit = HEX_MULTI_CURSOR_ACTION.BASE_BIT;

export const editBitPosition = 0b01 as D.Numeric.Key.Bin;

/** if call sign & 0b0001 !== 0 => (stt, ctx) */
export const isSttCtxFnSign = 0b01 as D.Numeric.Key.Bin;

/** if call sign & 0b0010 !== 0 ? (stt only) OR (ctx only) */
export const isSttOrCtxFnSign = 0b10 as D.Numeric.Key.Bin;

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
    NOT_FOUND = 0b0000,
    TO_SHIFT_INDEX = 0b00000001,
    INDEX_SHIFTED = 0b00000010,
    ON_BASELINE = 0b00000100,
    AS_LAST_SELECTION = 0b00001000,
    NOT_AS_LAST_SELECTION = 0b00010000,
    INIT = 0b00100000,
}

/** _5 */ export const firstToLast = MULTI_CURSOR_SELECTION_FLAG.TO_SHIFT_INDEX + MULTI_CURSOR_SELECTION_FLAG.ON_BASELINE as D.Numeric.Key.Bin
/** _1 */ export const firstToLastWithExistingDup = MULTI_CURSOR_SELECTION_FLAG.TO_SHIFT_INDEX as D.Numeric.Key.Bin
/** 12 */ export const baseAndLast = MULTI_CURSOR_SELECTION_FLAG.ON_BASELINE + MULTI_CURSOR_SELECTION_FLAG.AS_LAST_SELECTION as D.Numeric.Key.Bin
/** _8 */ export const lastOnly = MULTI_CURSOR_SELECTION_FLAG.AS_LAST_SELECTION as D.Numeric.Key.Bin
/** 10 */ export const asLastWithExistingDup = MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED + MULTI_CURSOR_SELECTION_FLAG.AS_LAST_SELECTION as D.Numeric.Key.Bin
/** 14 */ export const asLastOnBaseWithWithExistingDup = MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED + MULTI_CURSOR_SELECTION_FLAG.ON_BASELINE + MULTI_CURSOR_SELECTION_FLAG.AS_LAST_SELECTION as D.Numeric.Key.Bin
/** 18 */ export const notAsLastWithoutExistingDup = MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED + MULTI_CURSOR_SELECTION_FLAG.NOT_AS_LAST_SELECTION as D.Numeric.Key.Bin
/** _6 */ export const withExistingDup = MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED
/** 20 */ export const baseAndNotLast = MULTI_CURSOR_SELECTION_FLAG.ON_BASELINE + MULTI_CURSOR_SELECTION_FLAG.NOT_AS_LAST_SELECTION as D.Numeric.Key.Bin
// /** _4 */ export const recurringLine3 = MULTI_CURSOR_SELECTION_FLAG.ON_BASELINE as D.Numeric.Key.Bin
// /** _6 */ export const recurringLine5 = MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED + MULTI_CURSOR_SELECTION_FLAG.ON_BASELINE as D.Numeric.Key.Bin

/** _0 */ export const noIndexControl = MULTI_CURSOR_SELECTION_FLAG.NOT_FOUND as D.Numeric.Key.Bin
/** _1 */ export const increaseIndex = MULTI_CURSOR_SELECTION_FLAG.TO_SHIFT_INDEX as D.Numeric.Key.Bin
/** _2 */ export const withDup = MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED as D.Numeric.Key.Bin
/** _3 */ export const newBeforeBaseWithDup = MULTI_CURSOR_SELECTION_FLAG.INDEX_SHIFTED + MULTI_CURSOR_SELECTION_FLAG.TO_SHIFT_INDEX as D.Numeric.Key.Bin
/** 32 */ export const init = MULTI_CURSOR_SELECTION_FLAG.INIT as D.Numeric.Key.Bin
/** 32 */ export const initButNewBeforeInit = MULTI_CURSOR_SELECTION_FLAG.INIT + MULTI_CURSOR_SELECTION_FLAG.TO_SHIFT_INDEX as D.Numeric.Key.Bin


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

export const enum MULTI_CURSOR_STATE {
    NEXT_OCCURRENCE_INIT = 2883872,         // 0b0010 1100 0000 0001 0010 0000
    NEXT_OCCURRENCE_0 = 2888704,            // 0b0010 1100 0001 0100 0000 0000
    NEXT_OCCURRENCE_1 = 2233344,            // 0b0010 0010 0001 0100 0000 0000
    NEXT_OCCURRENCE_2 = 1119232,            // 0b0001 0001 0001 0100 0000 0000
    NEXT_OCCURRENCE_3 = 1184768,            // 0b0001 0010 0001 0100 0000 0000
    NEXT_OCCURRENCE_4 = 70656,              // 0b0000 0001 0001 0100 0000 0000 
    NEXT_OCCURRENCE_5 = 66560,              // 0b0000 0001 0000 0100 0000 0000 
    ALL_OCCURRENCE = 2884896,               // 0b0010 1100 0000 0101 0010 0000
    CURSOR_ON_END_OF_LINES_0 = 2884899,     // 0b0010 1100 0000 0101 0010 0011
    CURSOR_ON_END_OF_LINES_1 = 2883875,     // 0b0010 1100 0000 0001 0010 0011
    ADD_CURSOR_SEQUENTIAL = 2888707,        // 0b0010 1100 0001 0100 0000 0011
    ADD_CURSOR_REORDER_0 = 2233347,         // 0b0010 0010 0001 0100 0000 0011
    ADD_CURSOR_REORDER_1 = 2167811,         // 0b0010 0001 0001 0100 0000 0011
    ADD_CURSOR_REORDER_2 = 70659,           // 0b0000 0001 0001 0100 0000 0011 
    ADD_CURSOR_REORDER_3 = 66563,           // 0b0000 0001 0000 0100 0000 0011 
    MOVEMENT_0 = 2229763,                   // 0b0010 0010 0000 0110 0000 0011
    MOVEMENT_1 = 2885123,                   // 0b0010 1100 0000 0110 0000 0011
    MOVEMENT_2 = 2884611,                   // 0b0010 1100 0000 0100 0000 0011
    MOVEMENT_3 = 2229251,                   // 0b0010 0010 0000 0100 0000 0011
    MOVEMENT_4 = 2163715,                   // 0b0010 0001 0000 0100 0000 0011
    MOVEMENT_5 = 2164227,                   // 0b0010 0001 0000 0110 0000 0011
    RESET_TO_CURSOR_ONLY_0 = 2229265,       // 0b0010 0010 0000 0100 0001 0001
    RESET_TO_CURSOR_ONLY_1 = 2228241,       // 0b0010 0010 0000 0000 0001 0001
    RESET_TO_CURSOR_ONLY_2 = 2229777,       // 0b0010 0010 0000 0110 0001 0001
    RESET_TO_CURSOR_ONLY_3 = 1114115,       // 0b0001 0001 0000 0000 0000 0011
    RESET_TO_CURSOR_ONLY_4 = 2162691,       // 0b0010 0001 0000 0000 0000 0011
    RESET_TO_CURSOR_ONLY_5 = 2228739,       // 0b0010 0010 0000 0010 0000 0011
}

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