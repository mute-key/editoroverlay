import * as vscode from 'vscode';
import { clearConfiguration, promptOientationList, promptPresetList, restoreToDefault } from '../configuration/preset/preset';

const setPreset = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.applyPreset", () => promptPresetList(context));
};

const setOrientation = (context: vscode.ExtensionContext) => {
    return vscode.commands.registerCommand("cursorlinehighlight.changeOrientation", () => promptOientationList(context));
};

const resetConfiguration = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.restoreToDefaultConfiguration", () => restoreToDefault().then(clearConfiguration(context.extension.packageJSON.name)));
};

export {
    setPreset,
    setOrientation,
    resetConfiguration
};