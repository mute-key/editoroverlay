/**
 * placeholder objects module to keep the auto regex split intacted in src/editor/selection/selection.ts
 * so that indivisual styles can be applied and remain as in configuration. 
 * 
 * old methods were using symbol constants to mark exact position in array of renderOptions 
 * and set the contentText, which has been refactored into using references 
 * of the object to assign the contentText in renderOption.after object.
 * 
 */

export const columnsOfCol: number = 0;
export const columnsOfZCol: number = 0;
export const lineNumberOfLn: number = 0;
export const characterCountOfChar: number = 0;

export const multiCursorLineCol: number = 0;
export const multiCursorLineZCol: number = 0;
export const multiCursorLineNth: number = 0;
export const multiCursorLineNumber: number = 0;
export const multiCursorLineCount: number = 0;
export const multiCursorLineCountFull: number = 0;
export const multiCursorLineCharacter: number = 0;
