import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import * as __0x from '../constant/shared/numeric';
import Error from '../util/error';
import { resetAllDecoration } from '../editor/decoration/decoration';
import { renderDecorationOnEditor } from '../editor/decoration/handler';
import { renderGroupIs, updateIndentOption } from '../editor/editor';
import { resetEditorDiagnosticStatistics, updateDiagnostic } from '../diagnostic/diagnostic';

const windowStateChanged: Type.DecorationEventFunc = ({ decorationState }): vscode.Disposable => {
    return vscode.window.onDidChangeWindowState((event: vscode.WindowState): void => {
        if (event.focused) {
            decorationState.appliedHighlight[0] = __0x.cursorOnly; // renderGroupOfKey(__0x.cursorOnly)

            // apply decoration to active editor.
            if (vscode.window.activeTextEditor) {
                renderDecorationOnEditor({
                    editor: vscode.window.activeTextEditor,
                    decorationState: decorationState
                });
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
            if (configInfo.configError.length > 0) {
                // fixConfiguration(configInfo.configError);
            }

            resetAllDecoration();

            if (configInfo.generalConfigInfo.diagnosticTextEnabled) {
                await resetEditorDiagnosticStatistics();
                await updateDiagnostic(editor.document.uri);
            }

            updateIndentOption(editor);

            renderDecorationOnEditor({
                editor: editor,
                decorationState: decorationState
            });

            if (Error.check() && editor) {
                Error.notify(2000);
            }
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
        // renderDecorationOnEditor({
        //     editor: event.textEditor,
        //     decorationState: decorationState
        // })
        decorationState.appliedHighlight[0] = renderGroupIs(event.textEditor, decorationState.appliedHighlight[0]);

    })
};

const visibleRangeChanged = (): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorVisibleRanges((event: vscode.TextEditorVisibleRangesChangeEvent): void => {
        if (event) {

        }
    });
};

export {
    windowStateChanged,
    activeEditorChanged,
    editorOptionChanged,
    selectionChanged,
    visibleRangeChanged
};
