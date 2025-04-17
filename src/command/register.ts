import * as vscode from 'vscode';
import { clearConfiguration, quickPickPresetList, quickPickOientationList, quickPickColorList, restoreToDefault, quickPickContrastList } from '../configuration/preset/preset';
import type { CommandContext } from "../initialize";

const setPreset = (context: CommandContext): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.applyPreset", () => quickPickPresetList(context));
};

const setColor = (context: CommandContext): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.setColor", () => quickPickColorList(context));
};

const setContrast = (context: CommandContext): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.setContrast", () => quickPickContrastList(context));
};

const setOrientation = (context: CommandContext): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.setOrientation", () => quickPickOientationList(context));
};

const resetConfiguration = (context: CommandContext): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.restoreToDefaultConfiguration", () => restoreToDefault().then(clearConfiguration(context)));
};

export {
    setPreset,
    setColor,
    setContrast,
    setOrientation,
    resetConfiguration
};