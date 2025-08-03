import * as vscode from 'vscode';
import * as __0x from '../constant/shared/numeric';
import { diagnosticInfo } from '../editor/status/diagnostic';

import type * as D from '../type/type.d';

const diagnosticChanged: D.Event.Tp.DecorationEventFunc = ({ configInfo, decorationState }): vscode.Disposable => {
    return vscode.languages.onDidChangeDiagnostics(async (event: vscode.DiagnosticChangeEvent) => {

        const editor = vscode.window.activeTextEditor;                  // when active editor 
        
        if (editor && event && configInfo.generalConfigInfo.diagnosticTextEnabled) {
            decorationState.eventTrigger[0] = __0x.diagnosticChanged;   // set event caller before render
            diagnosticInfo(decorationState)(editor);                    // refresh diagnostic status block
        }
    });
};

export {
    diagnosticChanged
};