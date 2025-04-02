import * as vscode from 'vscode';
import * as Type from '../type/type';
import * as __0x from '../constant/shared/numeric';
import Regex from '../util/regex.collection';
import { RENDER_GROUP_SET, SELECTION_KIND_LIST } from '../constant/shared/object';
import { SELECTION_KIND } from '../constant/config/object';
import { bindStatusContentTextState } from './decoration/status/selection';
import { bindDiagnosticContentTextState, diagnosticInfo } from './decoration/status/diagnostic';
import { cursorOnlyHighlightRange, singelLineHighlightRange, multiLineHighlightRange, multiCursorHighlightRange } from './decoration/highlight/highlight'
import { cursorOnlySelection, singleLineSelection, multilineSelection, multiCursorSelection } from './decoration/status/selection'


const renderGroupSet = {
    ...RENDER_GROUP_SET
} as unknown as Type.RenderGroupSet;

const renderGroupOfKey = (key: number) => renderGroupSet[key]

const updateIndentOption = (editor: vscode.TextEditor): void => {
    const bindTo = bindStatusContentTextState();
    bindTo.infoOf.size = Number(editor.options.tabSize ?? editor.options.indentSize ?? 4);
    bindTo.infoOf.type = editor.options.insertSpaces ? '\n' : '\t';
    bindTo.infoOf.regex = editor.options.insertSpaces
        ? Regex.indentAndEOLRegex(bindTo.infoOf.size)
        : Regex.tagtAndEOLRegex;
};

const prepareRenderGroup = (config: Type.ConfigInfoReadyType): Type.RenderGroupSetProperty => {
    const selection = config.generalConfigInfo.selectionTextEnabled;
    const diagnostic = config.generalConfigInfo.diagnosticTextEnabled ? diagnosticInfo : undefined;
    const bindDiagnostic = bindDiagnosticContentTextState();
    const diagonosticAvaliabity = {
        [__0x.cursorOnly]: bindDiagnostic.configOf.displayWhenCursorOnly,
        [__0x.singleLine]: bindDiagnostic.configOf.displayWhenSingleLine,
        [__0x.multiLine]: bindDiagnostic.configOf.displayWhenMultiLine,
        [__0x.multiCursor]: bindDiagnostic.configOf.displayWhenMultiCursor
    };

    const highlightList = {
        [__0x.cursorOnly]: cursorOnlyHighlightRange,
        [__0x.singleLine]: singelLineHighlightRange,
        [__0x.multiLine]: multiLineHighlightRange,
        [__0x.multiCursor]: multiCursorHighlightRange
    };

    const selectionList = {
        [__0x.cursorOnly]: cursorOnlySelection,
        [__0x.singleLine]: singleLineSelection,
        [__0x.multiLine]: multilineSelection,
        [__0x.multiCursor]: multiCursorSelection
    };

    SELECTION_KIND_LIST.forEach(numKey => {

        if (SELECTION_KIND[numKey]) {
            const callList: any[] = [];
            callList.push(highlightList[numKey]);

            if (selection) {
                callList.push(selectionList[numKey]);
            }

            // if (diagnostic) {
            //     callList.push(diagnostic);
            // }

            renderCallStack[numKey] = callList;

            renderGroupSet[numKey] = {
                highlight: numKey,
                selection: selection,
                diagnostic: diagonosticAvaliabity[numKey] ? diagnostic : undefined
            } as Type.RenderGroupSetProperty;
        }
    });

    return renderGroupSet[__0x.cursorOnly] as Type.RenderGroupSetProperty;
};

const renderCallStack = {
    [__0x.cursorOnly]: [] as any[],
    [__0x.singleLine]: [] as any[],
    [__0x.multiLine]: [] as any[],
    [__0x.multiCursor]: [] as any[]
};

const callstack = (editor: vscode.TextEditor, numKey: number[]) => fn => fn(editor, numKey);

const renderGroupIs = (editor: vscode.TextEditor, numKey: number[]): number => {
    const stack = callstack(editor, numKey);
    if (editor.selections.length === 1) {
        if (editor.selections[0].isEmpty) {
            renderCallStack[__0x.cursorOnly].forEach(stack);
            return __0x.cursorOnly;
        }
        if (!editor.selections[0].isSingleLine) {
            renderCallStack[__0x.multiLine].forEach(stack);
            return __0x.multiLine;
        } else {
            renderCallStack[__0x.singleLine].forEach(stack);
            return __0x.singleLine;
        }
    } else {
        renderCallStack[__0x.multiCursor].forEach(stack)
        return __0x.multiCursor;
    }
};

export {
    updateIndentOption,
    prepareRenderGroup,
    renderGroupIs,
    renderGroupOfKey
};