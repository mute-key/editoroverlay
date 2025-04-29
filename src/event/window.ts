import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import * as __0x from '../constant/shared/numeric';
import Error from '../util/error';
import { resetAllDecoration } from '../editor/editor';
import { renderGroupIs, updateIndentOption } from '../editor/editor';
import { resetEditorDiagnosticStatistics, resetWorkspaceDiagnosticStatistics, updateDiagnostic } from '../diagnostic/diagnostic';
import { updateRangeMetadata } from '../editor/range';

const windowStateChanged: Type.DecorationEventFunc = ({ decorationState }): vscode.Disposable => {
    const onDidChangeWindowState = vscode.window.onDidChangeWindowState((event: vscode.WindowState): void => {
        if (event.focused) {
            if (vscode.window.activeTextEditor) {
                updateIndentOption(vscode.window.activeTextEditor);
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
    return onDidChangeWindowState;
};

const activeEditorChanged: Type.DecorationEventFunc = ({ configInfo, decorationState }): vscode.Disposable => {
    return vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
        if (editor) {
            if (decorationState.eventTrigger[0] === __0x.tabChanged) {
                resetAllDecoration();
                return;
            }

            if (Error.check()) {
                Error.notify(1500);
            }

            resetAllDecoration();

            updateRangeMetadata(editor);

            if (configInfo.generalConfigInfo.diagnosticTextEnabled) {
                resetEditorDiagnosticStatistics();
                resetWorkspaceDiagnosticStatistics();
                decorationState.eventTrigger[0] = __0x.diagnosticChanged;
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
        /**
         * using event.editor cause an issue with tab chagne event. 
         * event.editor in this event references both editor that become on top 
         * on view column as well as the one that has shift in editor tab 
         * causing both editor to have decoration rendered. 
         * 
         * i initially thought maybe dispose this event and re-bind the event if 
         * tab change event occurs but that would be the wrong approach to solve the issue. 
         * 
         * the case for this event to be triggered already guarantees that 'vscode.window.activeTextEditor'
         * to not to be undefined. 
         * 
         * 
         */
        decorationState.eventTrigger[0] = __0x.selectionChanged;
        decorationState.appliedHighlight[0] = renderGroupIs(vscode.window.activeTextEditor as vscode.TextEditor, decorationState.appliedHighlight);
    });
};

const tabChanged = ({ decorationState }): vscode.Disposable => {
    return vscode.window.tabGroups.onDidChangeTabs((event: vscode.TabChangeEvent) => {
        decorationState.eventTrigger[0] =  __0x.tabChanged;
    });
};

// const taskStarted = () => {
//     return vscode.tasks.onDidStartTaskProcess((e: vscode.TaskProcessStartEvent) => {
//         console.log(e.processId);
//         vscode.tasks.fetchTasks();
//     });
// };

// const visibleRangeChanged = (): vscode.Disposable => {
//     return vscode.window.onDidChangeTextEditorVisibleRanges((event: vscode.TextEditorVisibleRangesChangeEvent): void => {
//         if (event) { }
//     });
// };

// const documentModifified = (context): vscode.Disposable => {
//     return vscode.workspace.onDidChangeTextDocument((event: vscode.TextDocumentChangeEvent) => {
//         if (event) {
//             console.log('document changed');
//             context.eventTrigger = __0x.documentChanged;
//         }
//     });
// };

export {
    windowStateChanged,
    activeEditorChanged,
    editorOptionChanged,
    selectionChanged,
    tabChanged
    // visibleRangeChanged
    // documentModifified
};
