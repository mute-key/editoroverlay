/**
 * [extension activate function]
 * 
 */
import * as vscode from 'vscode';
import { cursorActivate } from './cursor';

export function activate(context: vscode.ExtensionContext) {
	cursorActivate(context).then((event) => {
		if (event) {
			context.subscriptions.push(...event);
		}
	});

	const provider: vscode.InlayHintsProvider = {
        provideInlayHints(document, range, token) {
            return [
                new vscode.InlayHint(new vscode.Position(0, 10), '🔥 여기 힌트!', vscode.InlayHintKind.Type)
            ];
        }
    };

    context.subscriptions.push(
        vscode.languages.registerInlayHintsProvider('*', provider)
    );
}

export function deactivate() {}