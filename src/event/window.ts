import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import Error from '../util/error';
import { isDecorationChanged, resetAllDecoration } from '../editor/decoration/decoration';
import { renderDecorationOnEditor } from '../editor/decoration/handler';
import { renderGroupIs, updateIndentOption } from '../editor/editor';
import { resetEditorDiagnosticStatistics, updateDiagnostic } from '../diagnostic/diagnostic';
import { hrtimeToMS } from '../util/util';
import { configCondition } from '../configuration/shared/validation';
import { eventNames } from 'process';

const windowStateChanged: Type.DecorationEventFunc = ({ decorationState, renderGroup }): vscode.Disposable => {
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
                renderGroup: renderGroup
            });

            if (Error.check() && editor) {
                Error.notify(2000);
            }
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

const selectionChanged: Type.DecorationEventFunc = (context): vscode.Disposable => {

    function textEditorSelectionChangeEvent(context) {
        return function (event: vscode.TextEditorSelectionChangeEvent) {
            const renderGroup: Type.RenderGroupSetProperty = renderGroupIs(event.textEditor);
        
            isDecorationChanged(event.textEditor, context.decorationState, renderGroup.type as Type.DecorationInfoPropType);
        
            renderDecorationOnEditor({
                editor: event.textEditor,
                decorationState: context.decorationState,
                renderGroup: renderGroup as Type.RenderGroupSetProperty,
                __proto__: null
            });
        };
    }

    return vscode.window.onDidChangeTextEditorSelection(textEditorSelectionChangeEvent(context));
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
