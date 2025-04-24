import * as vscode from 'vscode';
import * as Type from '../../type/type';
import * as __0x from '../../constant/shared/numeric';
import { INDENT_INFO, SELECTION_CONTENT_TEXT, SELECTION_KIND_LIST } from '../../constant/shared/object';
import { SELECTION_CONTENT_TEXT_CONFIG_KEY } from '../../constant/config/enum';
import { DECORATION_OPTION_CONFIG } from '../../constant/config/object';
import { createLineRange, blankRange } from '../range';
import { resetDecoration } from '../editor';

/**
 * memory for decorationRenderOption objects
 * 
 */
const selectionContentText = {
    ...SELECTION_CONTENT_TEXT
} as unknown as Type.StatusContentTextType;

const indentInfo = {
    ...INDENT_INFO
} as Type.IndentInfoType;

/**
 * buffer that will store styled decroationType objects in fixed width array.
 * it is because creating or change in size is costly operation instead of using 
 * fixed array. array in general is very well optimized but it is stil be very 
 * advantageous not to recreate or change the size of array and use the memory 
 * that are already allocated in all cases, especially in iteration operation.
 * 
 */
const selectionTextBuffer = {
    [__0x.cursorOnlyText]: [] as vscode.TextEditorDecorationType[],
    [__0x.singleLineText]: [] as vscode.TextEditorDecorationType[],
    [__0x.multiLineAnchorText]: [] as vscode.TextEditorDecorationType[],
    [__0x.multiLineCursorText]: [] as vscode.TextEditorDecorationType[],
    [__0x.multiCursorText]: [] as vscode.TextEditorDecorationType[]
};

const rangePointerTable = {
    [__0x.cursorOnlyText]: undefined as any | vscode.Range,
    [__0x.singleLineText]: undefined as any | vscode.Range,
    [__0x.multiLineAnchorText]: undefined as any | vscode.Range,
    [__0x.multiLineCursorText]: undefined as any | vscode.Range,
    [__0x.multiCursorText]: [] as any | vscode.Range[]
};

const selectionDecorationOption = {
    [__0x.cursorOnlyText]: [] as any,
    [__0x.singleLineText]: [] as any,
    [__0x.multiLineAnchorText]: [] as any,
    [__0x.multiLineCursorText]: [] as any,
    [__0x.multiCursorText]: [] as any
};

/**
 * will work as deocorationRenderOption buffer, but will not be copied
 * becuase the api will consume the object and references in this object will
 * automatically be de-referenced by the api as they are consumed.
 */
const decorationOptionBuffer = { ...DECORATION_OPTION_CONFIG } as Type.DecorationRenderOptionType;

/**
 * editor character in line index/column calculator
 * 
 * @param editor 
 * @param delta 
 * @returns 
 */
const columnDelta = (editor, delta = 0): string => {
    const col = editor.selection.active.character + delta;
    const end = editor.document.lineAt(editor.selection.active.line).text.length + delta;
    return (col === end ? col : col + '/' + end);
};

/**
 * index type 
 */
const columns = {
    col: ({ editor }) => columnDelta(editor, 1),
    zCol: ({ editor }) => columnDelta(editor)
};

/**
 * character count in single line
 */
const characterCount = {
    char: ({ editor }): number => {
        return editor.selection.end.character - editor.selection.start.character;
    }
};

/**
 * current line number, (.line is zero based)
 */
const lineNumber = {
    ln: ({ editor }): number => {
        return editor.selection.active.line + 1;
    }
};

/**
 * multiLine selection status buffer, 
 */
const multiLineOf = {
    lc: __0x.multiLineLineCountHex,
    char: __0x.multiLineChararcterHex,
};

/**
 * need to be renamed from symlink to hexLink. 
 * it used symbols before but symbols are slow. 
 * 
 * __0x.multiLineLineCountHex => total lines in selection
 * __0x.multiLineChararcterHex => total characters in seleciton
 */
const multiLineFn = {
    lc: (editor: vscode.TextEditor) => ((editor.selection.end.line - editor.selection.start.line) + 1),
    char: (editor: vscode.TextEditor) => editor.document.getText(editor.selection).replace(indentInfo[__0x.regex] as RegExp, "").length
};

/**
 * mutli-cursor selection function collections
 */
const multiCursorFn = {
    nth: ({ idx }) => idx,
    count: ({ editor }) => editor.selections.length,
    ln: ({ idx, editor }) => editor.selections[idx].end.line + 1,
    lc: ({ editor, pos }) => {
        return editor.selections[0].isSingleLine ? editor.selections.length : editor.selections.length * (editor.selections[pos].end.line - editor.selections[pos].start.line + 1);
    },
    char: ({ editor, pos }) => {
        if (editor.selections[0].isSingleLine) {
            return (editor.selections[pos].end.character - editor.selections[pos].start.character);
        }
        const text = editor.document.getText(editor.selections[pos]);
        return text.replace(indentInfo[__0x.regex], "").length;
    },
};

const multiCursorOf = {
    nth: () => null,
    count: () => null,
    ln: () => null,
    lc: () => null,
    char: () => null,
};

/**
 * calcultation function stacks for selection status block. 
 * 
 * this object will only be used as a function reference table
 * so the each decorationRenderOption can call it's required functions without 
 * searching for the functions to call to get the selection status values.
 * 
 */
const selectionOf: Type.ContentTextStateType = {
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: { ...columns, ...lineNumber },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: { ...lineNumber, ...characterCount },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: { ...lineNumber, ...multiLineOf },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: { ...lineNumber, ...multiLineOf },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: multiCursorOf,
};

/**
 * prepare selection status block buffer with pre-created vscode.decorationType(s)
 * so they do not need to be recreated on refresh. creating decorationType is costly, 
 * and it put some overhead by regenerating it's unique key as well as 
 * to vscode decoration registry.
 * 
 * @param hexKey 
 * @param size 
 * @returns 
 */
const setSelectionTextbuffer = (hexKey: number): void => {

    decorationOptionBuffer.isWholeLine = true;
    decorationOptionBuffer.rangeBehavior = vscode.DecorationRangeBehavior.ClosedClosed;

    selectionTextBuffer[hexKey].push(...selectionContentText[hexKey].contentText.map((decorationOption) => {
        decorationOptionBuffer.after = { ...decorationOption.after };
        return vscode.window.createTextEditorDecorationType(decorationOption);
    }));

    selectionDecorationOption[hexKey]?.splice(0);
    if (hexKey === __0x.multiCursorText) {
        selectionContentText[hexKey].contentText.forEach(() => {
            selectionDecorationOption[hexKey].push([]);
        });
        return;
    } else {
        selectionContentText[hexKey].contentText.forEach((contentText) => {
            selectionDecorationOption[hexKey].push([{
                get range() {
                    return rangePointerTable[hexKey];
                },
                renderOptions: contentText
            }]);
        });

        // for (let fidx = 0; fidx < selectionContentText[hexKey].contentText.length; fidx++) {
        //     selectionDecorationOption[hexKey].push([{
        //         get range() {
        //             return rangePointerTable[hexKey];
        //         },
        //         renderOptions: selectionContentText[hexKey].contentText[fidx]
        //     }]);
        // }
    }
};

/**
 * reference replication for the selection status
 * 
 * @param placehoder 
 * @param object 
 */
const syncrefernceTable = (placehoder: string, hexKey: number, refObj: object): void => {
    switch (hexKey) {
        case __0x.cursorOnly:
            cursorOnlyStatusRef[placehoder] = refObj;
            break;
        case __0x.singleLine:
            singleLinetatusRef[placehoder] = refObj;
            break;
        case __0x.multiLine:
            multiLinetatusRef[placehoder] = refObj;
            break;
        case __0x.multiCursor:
            console.log(placehoder, refObj);
            multiCursorStatusRef[placehoder] = refObj;
            break;
        default: break;
    }
};

/**
 * forEach callback function for multilines
 * 
 * @param setDecorations 
 * @param buffer 
 * @param channel 
 * @param countBuffer 
 * @returns 
 */
type BufferedFuncSignature = (setDecorations: vscode.TextEditor['setDecorations'], buffer: vscode.TextEditorDecorationType[]) => (renderOption: any | vscode.DecorationRenderOptions, idx: number) => void

const contentTextFuncBuffered: BufferedFuncSignature = (setDecorations, buffer) => (renderOption, idx) => {
    setDecorations(buffer[idx], renderOption);
};

const cursorOnlyStatusRef = {
    ln: undefined as any | vscode.DecorationInstanceRenderOptions,
    col: undefined as any | vscode.DecorationInstanceRenderOptions,
    zCol: undefined as any | vscode.DecorationInstanceRenderOptions,
};

/**
 * render function implementation for cursorOnly selection status block
 * 
 * @param editor 
 * @param previousKey 
 */
const cursorOnlySelection = (editor: vscode.TextEditor, previousKey: number[]): void => {
    clearSelectionTextBuffer(editor);

    cursorOnlyStatusRef
        .zCol
        .contentText = columns.zCol({ editor }).toString();

    rangePointerTable[__0x.cursorOnlyText] = createLineRange(editor.selection.active);

    selectionDecorationOption[__0x.cursorOnlyText]
        .forEach(
            contentTextFuncBuffered(
                editor.setDecorations,
                selectionTextBuffer[__0x.cursorOnlyText]));
};

const singleLinetatusRef = {
    ln: undefined as any | vscode.DecorationInstanceRenderOptions,
    char: undefined as any | vscode.DecorationInstanceRenderOptions,
};

/**
 * render function implementation for singleLine selection status block
 * 
 * @param editor 
 * @param previousKey 
 */
const singleLineSelection = (editor: vscode.TextEditor, previousKey: number[]): void => {
    clearBufferOfhexkey(editor.setDecorations, previousKey);

    singleLinetatusRef
        .char
        .contentText = columns.zCol({ editor }).toString();

    rangePointerTable[__0x.singleLineText] = createLineRange(editor.selection.active);

    selectionDecorationOption[__0x.singleLineText]
        .forEach(
            contentTextFuncBuffered(
                editor.setDecorations,
                selectionTextBuffer[__0x.singleLineText]));
};

const multiLinetatusRef = {
    ln: undefined as any | vscode.DecorationInstanceRenderOptions,
    lc: undefined as any | vscode.DecorationInstanceRenderOptions,
    char: undefined as any | vscode.DecorationInstanceRenderOptions,
};

const multilineSelection = (editor: vscode.TextEditor, previousKey: number[]) => {
    __0x.multiLine !== previousKey[0] && clearBufferOfhexkey(editor.setDecorations, previousKey);

    multiLinetatusRef
        .lc
        .contentText = multiLineFn.lc(editor).toString();           // update selection status references
    multiLinetatusRef
        .char
        .contentText = multiLineFn.char(editor).toString();

    rangePointerTable[__0x.multiLineAnchorText] = createLineRange(editor.selection.anchor);
    rangePointerTable[__0x.multiLineCursorText] = createLineRange(editor.selection.active);

    selectionDecorationOption[__0x.multiLineAnchorText]
        .forEach(
            contentTextFuncBuffered(
                editor.setDecorations,
                selectionTextBuffer[__0x.multiLineAnchorText]));

    selectionDecorationOption[__0x.multiLineCursorText]
        .forEach(
            contentTextFuncBuffered(
                editor.setDecorations,
                selectionTextBuffer[__0x.multiLineCursorText]));
};

const multiCursorStatusRef = {
    nth: undefined as any | vscode.DecorationInstanceRenderOptions,
    count: undefined as any | vscode.DecorationInstanceRenderOptions,
    ln: undefined as any | vscode.DecorationInstanceRenderOptions,
    lc: undefined as any | vscode.DecorationInstanceRenderOptions,
    char: undefined as any | vscode.DecorationInstanceRenderOptions,
};


const multiCursorState = {
    context: {
        editor: {} as any | vscode.TextEditor,
        pos: 0
    },
    selections: [] as vscode.Selection[],
    accumulate: false,
    nthPosition: 1,
    statusIndex: 1,
    baseLine: -1,
    baseShift: false,
    index: 0,
    char: 0,
};

const clearMultiCursorState = () => {
    multiCursorState.selections = [];
    multiCursorState.index = 0;
    multiCursorState.statusIndex = 0;
    multiCursorState.context.pos = 0;
    multiCursorState.baseShift = false;
    multiCursorState.baseLine = -1;
    multiCursorState.context.editor = {};
};

const insertMultiCursor = (selectionIndex: number) => {

    if (multiCursorState.selections[selectionIndex].end.line < multiCursorState.baseLine) {
        if (!multiCursorState.baseShift) {
            multiCursorState.statusIndex = 0;
            multiCursorState.baseShift = true;
        }

        selectionDecorationOption[__0x.multiCursorText][multiCursorState.nthPosition].forEach((nth, idx) => {
            
            if (idx < selectionIndex - (multiCursorState.statusIndex)-1) {
                selectionDecorationOption[__0x.multiCursorText][multiCursorState.nthPosition][idx].renderOptions.after.shiftIndex(1);
                console.log(selectionDecorationOption[__0x.multiCursorText][multiCursorState.nthPosition][idx].renderOptions.after.contentText);
            }
        });
    }

    if (selectionIndex - 1 > 0 && multiCursorState.selections[selectionIndex - 1].end.line === multiCursorState.selections[selectionIndex].end.line) {
        console.log(multiCursorState.selections[selectionIndex - 1].end.line, multiCursorState.selections[selectionIndex].end.line);
        selectionDecorationOption[__0x.multiCursorText][multiCursorState.nthPosition][selectionIndex - 1].renderOptions.after.addIndex(multiCursorState.statusIndex + 1);
        return;
    }

    const nthPlaceholder = selectionContentText[__0x.multiCursorText].contentText[multiCursorState.nthPosition];
    nthPlaceholder.after = {
        ...nthPlaceholder.after,
        indexList: [multiCursorState.statusIndex + 1],
        addIndex(i) {
            this.indexList.push(i);
        },
        shiftIndex(shift) {
            this.indexList.forEach((i, idx) => this.indexList[idx] += shift);
        },
        get contentText() {
            return this.indexList.join(',');
        },
    };

    selectionContentText[__0x.multiCursorText].contentText.forEach((contentText, idx) => {
        selectionDecorationOption[__0x.multiCursorText][idx].push({
            get range() {
                return multiCursorState.selections[selectionIndex];
            },
            renderOptions: idx === multiCursorState.nthPosition ? { ...contentText } : contentText
        });
    });
    
};


const multiCursorSelection = (editor: vscode.TextEditor, previousKey: number[]): void => {

    __0x.multiCursor !== previousKey[0] && (() => {
        clearBufferOfhexkey(editor.setDecorations, previousKey);
        clearMultiCursorState();
        multiCursorState.context.editor = editor;
        multiCursorState.context.pos = multiCursorState.index;
        multiCursorState.selections.push(editor.selections[0]);
        multiCursorState.char = multiCursorState.char + multiCursorFn.char(multiCursorState.context);
        insertMultiCursor(multiCursorState.index);
        multiCursorState.baseLine = editor.selections[0].end.line;
        multiCursorState.index++;
        multiCursorState.statusIndex++;
    })();

    const selection = editor.selections[multiCursorState.index];
    multiCursorState.selections.push(selection);

    multiCursorStatusRef
        .count
        .contentText = multiCursorFn.count(multiCursorState.context).toString();

    multiCursorStatusRef
        .lc
        .contentText = multiCursorFn.lc(multiCursorState.context).toString();

    multiCursorState.char += multiCursorFn.char(multiCursorState.context);
    multiCursorStatusRef
        .char
        .contentText = multiCursorState.char.toString();


    insertMultiCursor(multiCursorState.index);
    multiCursorState.index++;
    multiCursorState.statusIndex++;

    multiCursorState.selections.forEach((selection, idx) => {
        rangePointerTable[__0x.multiCursorText][idx] = selection;
    });

    selectionTextBuffer[__0x.multiCursorText].forEach((decorationType, idx) => {
        editor.setDecorations(decorationType, selectionDecorationOption[__0x.multiCursorText][idx]);
    });
};

const clearSelectionTextBuffer = (editor: vscode.TextEditor): void => {
    SELECTION_KIND_LIST?.forEach(hexKey => clearBufferOfhexkey(editor.setDecorations, [hexKey]));
};

const clearDisposeBuffer = (setDecorations: vscode.TextEditor["setDecorations"]) =>
    (buffer: vscode.TextEditorDecorationType): void => {
        setDecorations(buffer, blankRange);
        buffer.dispose();
    };

const clearBufferOfhexkey = (setDecorations: vscode.TextEditor["setDecorations"], previousKey: number[]): void => {
    switch (previousKey[0]) {
        case __0x.cursorOnly:
            selectionTextBuffer[__0x.cursorOnlyText].forEach(resetDecoration(setDecorations));
            break;
        case __0x.singleLine:
            selectionTextBuffer[__0x.singleLineText].forEach(resetDecoration(setDecorations));
            break;
        case __0x.multiLine:
            selectionTextBuffer[__0x.multiLineAnchorText].forEach(resetDecoration(setDecorations));
            selectionTextBuffer[__0x.multiLineCursorText].forEach(resetDecoration(setDecorations));
            break;
        case __0x.multiCursor:
            clearMultiCursorState();
            selectionTextBuffer[__0x.multiCursorText].forEach(resetDecoration(setDecorations));
            selectionDecorationOption[__0x.multiCursorText].forEach((option, idx) => {
                selectionDecorationOption[__0x.multiCursorText][idx] = [];
            });
            // for (const selection of selectionTextBuffer[__0x.multiCursorText]) {
            //     selection[1].forEach(clearDisposeBuffer(setDecorations));
            // }
            // selectionTextBuffer[__0x.multiCursorText] = [];
            break;
        default:
            break;
    }
};

const selectionTextInfoSplit = {
    [__0x.cursorOnly]: (editor: vscode.TextEditor, previousKey: number[]) => cursorOnlySelection(editor, previousKey),
    [__0x.singleLine]: (editor: vscode.TextEditor, previousKey: number[]) => singleLineSelection(editor, previousKey),
    [__0x.multiLine]: (editor: vscode.TextEditor, previousKey: number[]) => multilineSelection(editor, previousKey),
    [__0x.multiCursor]: (editor: vscode.TextEditor, previousKey: number[]) => multiCursorSelection(editor, previousKey)
};

type BindContentTextStateType = {
    functionOf: Type.ContentTextStateType,
    textOf: Type.StatusContentTextType,
    infoOf: Type.IndentInfoType
}

const bindStatusContentTextState = (): BindContentTextStateType => {
    return {
        functionOf: selectionOf,
        textOf: selectionContentText,
        infoOf: indentInfo
    };
};

export {
    bindStatusContentTextState,
    setSelectionTextbuffer,
    clearSelectionTextBuffer,
    cursorOnlySelection,
    singleLineSelection,
    multilineSelection,
    multiCursorSelection,
    syncrefernceTable
};