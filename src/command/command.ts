import * as vscode from 'vscode';
import * as preset from '../configuration/preset/preset';
import { loadPreset } from '../configuration/preset/preset';
import { getWorkspaceConfiguration } from '../configuration/shared/configuration';

const resetUserConfiguration = (): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.resetConfiguration", () => {
        const editorConfig = getWorkspaceConfiguration("editor");
    });
};

const applyStatusTextPreset = (context): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.applyPreset", () => {
        const quickPickItem = [];
        // loadPreset(context);

        // const items = ['옵션1', '옵션2', '옵션3'];
        // vscode.window.showQuickPick(items, {
        //     placeHolder: '옵션을 선택하세요',
        // }).then(selected => {
        //     if (selected) {
        //         vscode.window.showInformationMessage(`선택한 옵션: ${selected}`);
        //     }
        // });
    });
};

const applyStylePreset = (context): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.applyPreset", () => {
        const quickPickItem = [];
        // loadPreset(context);

        // const items = ['옵션1', '옵션2', '옵션3'];
        // vscode.window.showQuickPick(items, {
        //     placeHolder: '옵션을 선택하세요',
        // }).then(selected => {
        //     if (selected) {
        //         vscode.window.showInformationMessage(`선택한 옵션: ${selected}`);
        //     }
        // });

    });
};

export {
    applyStatusTextPreset,
    applyStylePreset,
    resetUserConfiguration
};


