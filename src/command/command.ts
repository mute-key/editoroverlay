import * as vscode from 'vscode';
import * as preset from './function';
import { loadPreset } from './function';

const resetUserConfiguration = (): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.resetConfiguration", () => {

    });
};

const applyPresetConfiguration = (context): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.applyPreset", () => {
        loadPreset(context);
    });
};

export {
    resetUserConfiguration,
    applyPresetConfiguration
};


