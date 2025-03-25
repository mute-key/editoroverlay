import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import { updateDiagnostic } from '../diagnostic/diagnostic';
import { clearDecorationState, renderStatusInfo } from '../editor/decoration/handler';

const diagnosticChanged: Type.DecorationEventFunc = (context): vscode.Disposable => {
    return vscode.languages.onDidChangeDiagnostics(async (event: vscode.DiagnosticChangeEvent) => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event) {
            context.editor = editor;
            // clearDecorationState(context.decorationState);
            await updateDiagnostic(editor.document.uri);
            await renderStatusInfo(context as Type.DecorationContext);
        }
    });
};

export {
    diagnosticChanged
};
