import { SELECTION_TYPE } from "./enum";

export const reset = Symbol(SELECTION_TYPE.RESET);
export const cursorOnly = Symbol(SELECTION_TYPE.CURSOR_ONLY);
export const singleLine = Symbol(SELECTION_TYPE.SINGLE_LINE);
export const multiLine = Symbol(SELECTION_TYPE.MULTI_LINE);
export const multiCursor = Symbol(SELECTION_TYPE.MULTI_CURSOR);

// export const selectionType = {
//     reset: reset,
//     cursorOnly: cursorOnly,
//     singleLine: singleLine,
//     multiLine: multiLine,
//     multiCursor: multiCursor,
// };