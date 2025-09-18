import type * as D from '../type/type.d';

import * as vscode from 'vscode';
import * as hex from '../numeric/hexadecimal';
import { diagnosticInfo } from '../editor/status/diagnostic';

export {
    diagnosticChanged
};

const diagnosticChanged: D.Event.Tp.DecorationEventFunc = ({ configInfo, decorationState }): vscode.Disposable => {
    return vscode.languages.onDidChangeDiagnostics(async (event: vscode.DiagnosticChangeEvent) => {

        const editor = vscode.window.activeTextEditor;                  // when active editor 
        
        if (editor && event && configInfo.generalConfigInfo.diagnosticTextEnabled) {
            decorationState.eventTrigger[0] = hex.diagnosticChanged;    // set event caller before render
            diagnosticInfo(decorationState)(editor);                    // refresh diagnostic status block
        }
    });
};