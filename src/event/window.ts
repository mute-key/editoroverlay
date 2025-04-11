import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import * as __0x from '../constant/shared/numeric';
import Error from '../util/error';
import { resetAllDecoration } from '../editor/editor';
import { renderGroupIs, updateIndentOption } from '../editor/editor';
import { resetEditorDiagnosticStatistics, updateDiagnostic } from '../diagnostic/diagnostic';

const windowStateChanged: Type.DecorationEventFunc = ({ decorationState }): vscode.Disposable => {
    return vscode.window.onDidChangeWindowState((event: vscode.WindowState): void => {
        if (event.focused) {
            if (vscode.window.activeTextEditor) {
                decorationState.appliedHighlight[0] = renderGroupIs(vscode.window.activeTextEditor, [__0x.cursorOnly]);
            }

        } else {
            resetAllDecoration();
        }

        if (!event.focused && !event.active) {
            resetAllDecoration();
            console.log('idling');
        }
    });
};

const activeEditorChanged: Type.DecorationEventFunc = ({ configInfo, decorationState }): vscode.Disposable => {
    return vscode.window.onDidChangeActiveTextEditor(async (editor: vscode.TextEditor | undefined) => {
        if (editor) {
            if (Error.check()) {
                Error.notify(1500);
            }

            resetAllDecoration();

            if (configInfo.generalConfigInfo.diagnosticTextEnabled) {
                await resetEditorDiagnosticStatistics();
                await updateDiagnostic(editor.document.uri);
            }

            updateIndentOption(editor);

            decorationState.appliedHighlight[0] = renderGroupIs(editor, [__0x.cursorOnly]);
        }
    });
};

const editorOptionChanged = (context): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorOptions((event: vscode.TextEditorOptionsChangeEvent): void => {
        if (event.textEditor) {
            updateIndentOption(event.textEditor);
        }
    });
};

const selectionChanged: Type.DecorationEventFunc = ({ decorationState }): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorSelection((event: vscode.TextEditorSelectionChangeEvent) => {
        console.log('selection changed');
        decorationState.eventTrigger[0] = __0x.selectionChanged;
        decorationState.appliedHighlight[0] = renderGroupIs(event.textEditor, decorationState.appliedHighlight);
    });
};

const visibleRangeChanged = (): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorVisibleRanges((event: vscode.TextEditorVisibleRangesChangeEvent): void => {
        if (event) { }
    });
};

// const documentModifified = (context): vscode.Disposable => {
//     return vscode.workspace.onDidChangeTextDocument((event: vscode.TextDocumentChangeEvent) => {
//         if (event) {
//             // console.log('document changed');
//             // context.eventTrigger = __0x.documentChanged;
//         }
//     });
// };

export {
    windowStateChanged,
    activeEditorChanged,
    editorOptionChanged,
    selectionChanged,
    visibleRangeChanged
    // documentModifified
};
