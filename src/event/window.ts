import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import { isDecorationChanged, resetAllDecoration } from '../editor/decoration/decoration';
import { renderDecorationOnEditor } from '../editor/decoration/decoration';
import { renderGroupIs, updateIndentOption } from '../editor/editor';
import Error from '../util/error';
import { resetEditorDiagnosticStatistics, updateDiagnostic } from '../diagnostic/diagnostic';

const windowStateChanged: Type.DecorationEventFunc = ({  decorationState, renderGroup }): vscode.Disposable => {
    return vscode.window.onDidChangeWindowState((event: vscode.WindowState) => {
        if (event.focused) {

            // apply decoration to active editor.
            if (vscode.window.activeTextEditor) {
                renderDecorationOnEditor({
                    editor: vscode.window.activeTextEditor,
                    decorationState: decorationState,
                    renderGroup: renderGroup
                });
            }
        } else {
            // should reset all decoration on all editors 
            resetAllDecoration(decorationState);
        }

        if (!event.focused && !event.active) {
            console.log('idling');
        }
    });
};

const activeEditorChanged: Type.DecorationEventFunc = ({ configInfo, decorationState, renderGroup }): vscode.Disposable => {
    return vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
        if (editor) {
            if (configInfo.configError.length > 0) {
                // fixConfiguration(configInfo.configError);
            }

            resetAllDecoration(decorationState);
            
            if (configInfo.generalConfigInfo.diagnosticTextEnabled) {
                resetEditorDiagnosticStatistics();
                updateDiagnostic();
            }
            
            updateIndentOption(editor);

            renderDecorationOnEditor({
                editor: editor,
                decorationState: decorationState,
                renderGroup: renderGroup
            });

            Error.printError();
        }
    });
};


const editorOptionChanged = (context): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorOptions((event: vscode.TextEditorOptionsChangeEvent) => {
        if (event.textEditor) {
            updateIndentOption(event.textEditor);
        }
    });
};

const selectionChanged: Type.DecorationEventFunc = ({ decorationState }): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorSelection((event: vscode.TextEditorSelectionChangeEvent) => {
        if (event.selections) {

            const renderGroup: Type.RenderGroupSetProperty | undefined = renderGroupIs(event.textEditor);

            if (!renderGroup) {
                return;
            }

            isDecorationChanged(event.textEditor, decorationState, renderGroup.type as Type.DecorationInfoPropType);

            renderDecorationOnEditor({
                editor: event.textEditor,
                decorationState: decorationState,
                renderGroup: renderGroup
            });
        }
    });
};

const visibleRangeChanged = (): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorVisibleRanges((event: vscode.TextEditorVisibleRangesChangeEvent) => {
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
