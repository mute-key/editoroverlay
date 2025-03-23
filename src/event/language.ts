import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import { updateDiagnostic } from '../diagnostic/diagnostic';
import { renderStatusInfo } from '../editor/decoration/decoration';

const diagnosticChanged: Type.DecorationEventFunc = (context): vscode.Disposable => {
    return vscode.languages.onDidChangeDiagnostics(async (event: vscode.DiagnosticChangeEvent) => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event) {
            context.editor = editor;
            await updateDiagnostic(editor.document.uri);
            // await renderStatusInfo(context as Type.DecorationContext);
        }
    });
};

export {
    diagnosticChanged
};
