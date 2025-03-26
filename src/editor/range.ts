import { Position, Range, TextEditor, Selection } from 'vscode';
import * as Type from '../type/type';

// "disabled",
// "IfOutOfVisibleRange",
// "previousLine",
// "nextLine"

const createRangeNNNN = (startLine: number, startChar: number, endLine: number, endChar: number): Range =>
    new Range(
        new Position(startLine, startChar),
        new Position(endLine, endChar));

const createRangeSPEP = (start: Position, end: Position): Range =>
    new Range(start, end);

const createRangeNNEP = (line: number, startChar: number, end: Position): Range =>
    new Range(
        new Position(line, startChar),
        end);

const createCursorRange = (editor: TextEditor, lineDelta: number = 0): Range =>
    new Range(
        new Position(editor.selection.end.line + lineDelta, editor.selection.end.character),
        new Position(editor.selection.end.line + lineDelta, editor.selection.end.character));

const createActiveRange = (editor: TextEditor): Range =>
    createRangeSPEP(editor.selection.active, editor.selection.active);

const createAnchorRange = (editor: TextEditor): Range =>
    createRangeSPEP(editor.selection.anchor, editor.selection.anchor);

const createStartEndRangeOfSelection = (selection: Selection): Range =>
    createRangeSPEP(selection.start, selection.end);

const range = {
    createRangeNNNN: createRangeNNNN,
    createRangeSPEP: createRangeSPEP,
    createRangeNNEP: createRangeNNEP,
    createCursorRange: createCursorRange,
    createActiveRange: createActiveRange,
    createAnchorRange: createAnchorRange,
    createStartEndRangeOfSelection: createStartEndRangeOfSelection,
};

export default range;