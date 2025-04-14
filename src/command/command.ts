import * as vscode from 'vscode';
import { promptQuickPick, userSelectedPreset } from '../configuration/preset/preset';



const resetUserConfiguration = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.resetConfiguration", () => {
        resetUserConfiguration(context);
    });
};

const applyPresetConfiguration = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.applyPreset", () => {
        promptQuickPick().then(userSelectedPreset(context));
    });
};

export {
    applyPresetConfiguration,
    resetUserConfiguration
};


