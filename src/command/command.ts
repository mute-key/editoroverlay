import * as vscode from 'vscode';
import * as preset from './preset';

const resetUserConfiguration = (): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.resetConfiguration", () => {

    });
};

const applyPresetConfiguration = (): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.applyPreset", () => {
        
    });
};

export {
    resetUserConfiguration,
    applyPresetConfiguration
};