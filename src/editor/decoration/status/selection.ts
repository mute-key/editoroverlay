import * as vscode from 'vscode';
import * as Type from '../../../type/type';
import * as $ from '../../../constant/symbol';
import Range from '../../range';
import { DECORATION_STYLE_KEY, SELECTION_CONTENT_TEXT_CONFIG_KEY } from '../../../constant/enum';
import { INDENT_INFO, SELECTION_CONTENT_TEXT } from '../../../constant/object';

const selectionContentText = { ...SELECTION_CONTENT_TEXT } as unknown as Type.StatusContentTextType;

const indentInfo = { ...INDENT_INFO } as Type.IndentInfoType;

namespace CursorOnly {
    export const columnDelta = (editor, delta = 0) => {
        const col = editor.selection.active.character + delta;
        const end = editor.document.lineAt(editor.selection.active.line).text.length + delta;
        return (col === end ? col : col + '/' + end);
    };

    export const columns = {
        col: ({ editor }) => columnDelta(editor, 1),
        zCol: ({ editor }) => columnDelta(editor),
    };
}

namespace SingleLine {
    export const characterCount = {
        char: ({ editor }) => Math.abs(editor.selection.end.character - editor.selection.start.character)
    };

    export const lineNumber = {
        ln: ({ editor }) => editor.selection.active.line + 1,
    };
}

namespace MultiLine {
    export const multiLineLineCountSym = Symbol('multiLineLcSym');

    export const multiLineChararcterSym = Symbol('multiLineCharSym');

    export const lineCountWithCharacter = {
        lc: multiLineLineCountSym,
        char: multiLineChararcterSym,
    };

    export const multilineFunctionSymLink = {
        [multiLineLineCountSym]: ({ editor }) => (Math.abs(editor.selection.end.line - editor.selection.start.line) + 1),
        [multiLineChararcterSym]: ({ editor, indent }) => String(editor.document.getText(editor.selection).replace(indent.regex, "").length)
    };
}

namespace MultiCursor {
    export const collectionOf = {
        nth: ({ idx }) => idx,
        count: ({ editor }) => editor.selections.length,
        ln: ({ idx, editor }) => editor.selections[idx].end.line + 1,
        lc: ({ editor }) => {
            let idx = 0;
            let lineCount = 0;
            const length = editor.selections.length;
            const isSingleLine = editor.selections[0].start.line === editor.selections[0].end.line;
            const lineDiff = isSingleLine ? 1 : Math.abs(editor.selections[0].end.line - editor.selections[0].start.line) + 1;

            while (idx < length) {
                if (isSingleLine) {
                    lineCount = lineCount + lineDiff;
                } else {
                    lineCount = lineCount + lineDiff;
                }
                idx++;
            }
            return lineCount;
        },
        char: ({ editor, indent }) => {
            let idx = 0;
            let charCount = 0;
            const length = editor.selections.length;
            const isSingleLine = editor.selections[0].start.line === editor.selections[0].end.line;

            while (idx < length) {
                if (isSingleLine) {
                    charCount = charCount + (editor.selections[idx].end.character - editor.selections[idx].start.character);
                } else {
                    const text = editor.document.getText(editor.selections[idx]);
                    charCount = charCount + text.replace(indent.regex, "").length;
                }
                idx++;
            }
            return charCount;
        }
    };
}

const selectionOf: Type.ContentTextStateType = {
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: {
        ...CursorOnly.columns,
        ...SingleLine.lineNumber,
    },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: {
        ...SingleLine.lineNumber,
        ...SingleLine.characterCount
    },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: {
        ...SingleLine.lineNumber,
        ...MultiLine.lineCountWithCharacter
    },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: {
        ...SingleLine.lineNumber,
        ...MultiLine.lineCountWithCharacter
    },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: MultiCursor.collectionOf,
};

const contentTextFunctionSymlink = (context: Type.ContentTextFuncContext, contentTextSate: Type.ContentTextSymlinkKind, buffer: any): Type.DecorationRenderOptionType[] => {
    Object.entries(contentTextSate.position).forEach(([pos, sym]) => {
        if (!buffer[sym]) {
            buffer[sym] = MultiLine.multilineFunctionSymLink[sym](context);
        }
        contentTextSate.contentText[pos].after.contentText = String(buffer[sym]);
    });
    return contentTextSate.contentText;
};

const contentTextFunc = (context: Type.ContentTextFuncContext, contentText: any): Type.DecorationRenderOptionType[] => {
    return contentText.map(decorationOption => {
        if (typeof decorationOption.after.contentText === 'string') {
            return decorationOption;
        }

        const decorationOptionFunc = { ...decorationOption };
        decorationOptionFunc.after = { ...decorationOption.after };
        decorationOptionFunc.after.contentText = String(decorationOption.after.contentText(context));
        return decorationOptionFunc;
    });
};

const cursorOnlySelection: Type.ContentTextFuncSignature = (context: Type.ContentTextFuncContext): Type.StatusTextInfoType[] => {
    return [{
        contentText: contentTextFunc(context, selectionContentText[SELECTION_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT].contentText as any[]),
        range: Range.createActiveRange(context.editor)
    }];
};

const singleLineSelection: Type.ContentTextFuncSignature = (context: Type.ContentTextFuncContext): Type.StatusTextInfoType[] => {
    return [{
        contentText: contentTextFunc(context, selectionContentText[SELECTION_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT].contentText as any[]),
        range: Range.createActiveRange(context.editor)
    }];
};

const multilineSelection: Type.ContentTextFuncSignature = (context: Type.ContentTextFuncContext): Type.StatusTextInfoType[] => {

    const buffer = {
        [MultiLine.multiLineLineCountSym]: undefined,
        [MultiLine.multiLineChararcterSym]: undefined
    };

    const statusList = [{
        contentText: contentTextFunctionSymlink(context, selectionContentText[SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT] as Type.ContentTextSymlinkKind, buffer),
        range: Range.createAnchorRange(context.editor)
    }, {
        contentText: contentTextFunctionSymlink(context, selectionContentText[SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT] as Type.ContentTextSymlinkKind, buffer),
        range: Range.createActiveRange(context.editor)
    }];

    return statusList;
};

const multiCursorSelection: Type.ContentTextFuncSignature = (context: Type.ContentTextFuncContext): Type.StatusTextInfoType[] => {

    const selectionTextInfo: Type.StatusTextInfoType[] = [];
    const statusLine: number[] = [];

    let idx = context.editor.selections.length;

    while (idx--) {
        const lineSet = new Set(statusLine);
        if (lineSet.has(context.editor.selections[idx].end.line)) {
            continue;
        }

        context.idx = idx + 1;

        selectionTextInfo.push({
            contentText: contentTextFunc(context, selectionContentText[SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT].contentText as any[]),
            range: Range.createStartEndRangeOfSelection(context.editor.selections[idx])
        });

        statusLine.push(context.editor.selections[idx].end.line);
    }
    return selectionTextInfo;
};

const selectionTextInfoSplit = (editor: vscode.TextEditor): Type.SelectionTextInfoSplitType => {
    const context: Type.ContentTextFuncContext = {
        idx: 0,
        editor: editor,
        indent: indentInfo as Type.IndentReadyType
    };

    return {
        [$.cursorOnly]: () => cursorOnlySelection(context),
        [$.singleLine]: () => singleLineSelection(context),
        [$.multiLine]: () => multilineSelection(context),
        [$.multiCursor]: () => multiCursorSelection(context),
    };
};

const selectionInfo = (editor: vscode.TextEditor, type: Type.DecorationInfoPropType): Type.StatusTextInfoType[] => {
    return selectionTextInfoSplit(editor)[type.KEY]();
};

const bindStatusContentTextState = (): Type.BindContentTextStateType => {
    return {
        functionOf: selectionOf,
        textOf: selectionContentText,
        infoOf: indentInfo
    };
};

export {
    selectionInfo,
    bindStatusContentTextState
};