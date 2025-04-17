import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import * as __0x from '../constant/shared/numeric';
import { diagnosticInfo } from '../editor/status/diagnostic';

const diagnosticChanged: Type.DecorationEventFunc = ({ decorationState }): vscode.Disposable => {
    return vscode.languages.onDidChangeDiagnostics(async (event: vscode.DiagnosticChangeEvent) => {

        const editor = vscode.window.activeTextEditor;                  // when active editor 
        
        if (editor && event) {
            decorationState.eventTrigger[0] = __0x.diagnosticChanged;   // set event caller before render
            diagnosticInfo(decorationState)(editor);                    // refresh diagnostic status block
        }
    });
};

export {
    diagnosticChanged
};