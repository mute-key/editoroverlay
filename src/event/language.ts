import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import { updateDiagnostic } from '../diagnostic/diagnostic';
import { clearDecorationState } from '../editor/editor';
import { renderGroupIs } from '../editor/editor';
import { diagnosticInfo } from '../editor/decoration/status/diagnostic';

const diagnosticChanged: Type.DecorationEventFunc = ({ decorationState }): vscode.Disposable => {
    return vscode.languages.onDidChangeDiagnostics(async (event: vscode.DiagnosticChangeEvent) => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event) {
            
            // clearDecorationState(decorationState);
            // const diagnosticState = await updateDiagnostic(editor.document.uri);
            diagnosticInfo(editor);
            // decorationState.appliedHighlight[0] = renderGroupIs(editor, decorationState.appliedHighlight);
            
        }
    });
};

export {
    diagnosticChanged
};