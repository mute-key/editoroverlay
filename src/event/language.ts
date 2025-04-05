import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import { diagnosticInfo } from '../editor/decoration/status/diagnostic';

const diagnosticChanged: Type.DecorationEventFunc = ({ decorationState }): vscode.Disposable => {
    return vscode.languages.onDidChangeDiagnostics(async (event: vscode.DiagnosticChangeEvent) => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event) {
            diagnosticInfo(editor);            
            // clearDecorationState(decorationState);
            // const diagnosticState = await updateDiagnostic(editor.document.uri);
            // decorationState.appliedHighlight[0] = renderGroupIs(editor, decorationState.appliedHighlight);
            
        }
    });
};

export {
    diagnosticChanged
};