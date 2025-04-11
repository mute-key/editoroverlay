import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import * as __0x from '../constant/shared/numeric';
import { diagnosticInfo } from '../editor/status/diagnostic';

const diagnosticChanged: Type.DecorationEventFunc = ({ decorationState }): vscode.Disposable => {
    return vscode.languages.onDidChangeDiagnostics(async (event: vscode.DiagnosticChangeEvent) => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event) {
            decorationState.eventTrigger[0] = __0x.diagnosticChanged;
            diagnosticInfo(decorationState)(editor);
        }
    });
};

export {
    diagnosticChanged
};