import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import Error from '../util/error';
import { isDecorationChanged, resetAllDecoration } from '../editor/decoration/decoration';
import { clearDecorationState, renderDecorationOnEditor } from '../editor/decoration/handler';
import { renderGroupIs, updateIndentOption } from '../editor/editor';
import { resetEditorDiagnosticStatistics, updateDiagnostic } from '../diagnostic/diagnostic';

const windowStateChanged: Type.DecorationEventFunc = ({ decorationState, renderGroup }): vscode.Disposable => {
    return vscode.window.onDidChangeWindowState((event: vscode.WindowState): void => {
        if (event.focused) {

            // apply decoration to active editor.
            if (vscode.window.activeTextEditor) {
                renderDecorationOnEditor({
                    editor: vscode.window.activeTextEditor,
                    decorationState: decorationState,
                    renderGroup: renderGroup,
                    __proto__: null
                });
            }
        } else {
            // should reset all decoration on all editors 
            resetAllDecoration(decorationState);
        }

        if (!event.focused && !event.active) {
            resetAllDecoration(decorationState);
            console.log('idling');
        }
    });
};

const activeEditorChanged: Type.DecorationEventFunc = ({ configInfo, decorationState, renderGroup }): vscode.Disposable => {
    return vscode.window.onDidChangeActiveTextEditor(async (editor: vscode.TextEditor | undefined) => {
        if (editor) {
            if (configInfo.configError.length > 0) {
                // fixConfiguration(configInfo.configError);
            }

            resetAllDecoration(decorationState);
            

            if (configInfo.generalConfigInfo.diagnosticTextEnabled) {
                await resetEditorDiagnosticStatistics();
                await updateDiagnostic(editor.document.uri);
            }

            updateIndentOption(editor);

            renderDecorationOnEditor({
                editor: editor,
                decorationState: decorationState,
                renderGroup: renderGroup,
                __proto__: null
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

const selectionChanged: Type.DecorationEventFunc = (context): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorSelection(async (event: vscode.TextEditorSelectionChangeEvent): Promise<void> => {
        if (event.selections) {
            await renderDecorationOnEditor({
                ...context,
                editor: event.textEditor
            });
        }
    });
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
