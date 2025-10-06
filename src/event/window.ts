import type * as D from '../type/type';

import * as vscode from 'vscode';
import * as hex from '../constant/numeric/hexadecimal';

import { resetEditorDiagnosticStatistics, resetWorkspaceDiagnosticStatistics } from '../diagnostic/diagnostic';
import { updateRangeMetadata } from '../editor/range';
import { forceDispatchEditorChange } from '../editor/selection/selection';
import { renderGroupIs, resetAllDecoration, updateIndentOption } from '../editor/editor';
import { scmParsed } from '../editor/scm/scm';

export {
    windowStateChanged,
    activeEditorChanged,
    editorOptionChanged,
    selectionChanged,
    // activeTerminalChanged,
    // tabChanged,
    // visibleRangeChanged
    // documentModifified
};

const windowStateChanged: D.Event.Tp.DecorationEventFunc = ({ decorationState }): vscode.Disposable => {
    return vscode.window.onDidChangeWindowState((event: vscode.WindowState): void => {
        if (event.focused) {
            if (vscode.window.activeTextEditor) {
                updateIndentOption(vscode.window.activeTextEditor);
                decorationState.appliedHighlight[0] = renderGroupIs(vscode.window.activeTextEditor, [hex.cursorOnly]);
            }
        } else {
            scmParsed(false);
            resetAllDecoration();
        }

        if (!event.focused && !event.active) {
            resetAllDecoration();
            console.log('idling');
        }
    });
};

const activeEditorChanged: D.Event.Tp.DecorationEventFunc = ({ configInfo, decorationState }): vscode.Disposable => {
    return vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
        if (editor) {
            /**
             * recent build of vscode have change the behavior of tab change event
             * 
             * tab change event is triggered even it is only 1 tab is openned for some reasons.
             * due to that change, this part of condition chech should have been disabled by 
             * commenting out; or it is always true on every editor change. 
             * it is the other way around for some reasons.
             */
            // if (decorationState.eventTrigger[0] === hex.tabChanged) {
            //     resetAllDecoration();
            //     return;
            // }

            // if (ErrorHandler.check()) {
            //     ErrorHandler.notify(1500);
            // }

            forceDispatchEditorChange(editor);
            updateRangeMetadata(editor);

            if (configInfo.generalConfigInfo.diagnosticTextEnabled) {
                resetEditorDiagnosticStatistics();
                resetWorkspaceDiagnosticStatistics();
                decorationState.eventTrigger[0] = hex.diagnosticChanged;
            }

            updateIndentOption(editor);

            // this initially caused another issue with engine update + cross-os support. 
            // here seems is the correct place write place to reset all decorations when 
            // active editor changes, i think.
            if (decorationState.eventTrigger[0] !== hex.noEvent) {
                resetAllDecoration();
            }

            scmParsed(false);

            decorationState.appliedHighlight[0] = renderGroupIs(vscode.window.activeTextEditor as vscode.TextEditor, [hex.cursorOnly]);
        }
    });
};

const editorOptionChanged: D.Event.Tp.DecorationEventFunc = (context: D.Event.Intf.Context): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorOptions((event: vscode.TextEditorOptionsChangeEvent): void => {
        if (event.textEditor) {
            console.log('editorOptionChanged');
            updateIndentOption(event.textEditor);
        }
    });
};

const selectionChanged: D.Event.Tp.DecorationEventFunc = (context /** { decorationState } */): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorSelection((event: vscode.TextEditorSelectionChangeEvent) => {
        // event.kind === vscode.TextEditorSelectionChangeKind.Keyboard
        /**
         * i initially thought maybe dispose this event and re-bind the event if 
         * tab change event occurs but that would be the wrong approach to solve the issue. 
         * 
         * the case for this event to be triggered already guarantees that 'vscode.window.activeTextEditor'
         * to not to be undefined. 
         * 
         * decorationState.appliedHighlight is for previous highlight that was applied, rendered, 
         * to overlay that was rendered and reset, so the render functions knows which overlay to 
         * reset and replenish.
         * 
         * this may seem like a circular reference, which i believed it would be redundant to pass
         * [@render_type_key] as well as back reference the [@last_type_key], instead the function itself 
         * will define what the rendering type should be, so that current status key is omitted.
         * 
         * api has been updated very kindly with a lot of features. including event.textEditor with more features
         * in this event.
         * 
         * maybe it is a good idea to use those features in future update...? i think
         * 
         */

        context.decorationState.eventTrigger[0] = hex.selectionChanged;
        context.decorationState.appliedHighlight[0] = renderGroupIs(vscode.window.activeTextEditor as vscode.TextEditor, context.decorationState.appliedHighlight);
    });
};

const activeTerminalChanged: D.Event.Tp.DecorationEventFunc = ({ decorationState }): vscode.Disposable => {
    return vscode.window.onDidChangeTerminalState((terminal: vscode.Terminal | undefined) => {
        if (terminal) {
            // terminal.state.isInteractedWith = false;
        }
    });
};

// const tabChanged: D.Event.Tp.DecorationEventFunc = ({ decorationState }): vscode.Disposable => {
//     return vscode.window.tabGroups.onDidChangeTabs((event: vscode.TabChangeEvent) => {
//         if (event.changed) {
//             // decorationState.eventTrigger[0] = hex.tabChanged;
//             // resetAllDecoration();
//         }
//     });
// };
