import type * as D from "../type/type.d";

import * as vscode from 'vscode';
import { clearConfiguration, quickPickPresetList, quickPickOientationList, quickPickColorList, restoreToDefault, quickPickContrastList } from './preset';

export {
    setPreset,
    setColor,
    setContrast,
    setOrientation,
    resetConfiguration
};

const setPreset = (context: D.Command.Intf.Context): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.applyPreset", () => quickPickPresetList(context));
};

const setColor = (context: D.Command.Intf.Context): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.setColor", () => quickPickColorList(context));
};

const setContrast = (context: D.Command.Intf.Context): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.setContrast", () => quickPickContrastList(context));
};

const setOrientation = (context: D.Command.Intf.Context): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.setOrientation", () => quickPickOientationList(context));
};

const resetConfiguration = (context: D.Command.Intf.Context): vscode.Disposable => {
    return vscode.commands.registerCommand("cursorlinehighlight.restoreToDefaultConfiguration", () => restoreToDefault().then(clearConfiguration(context)));
};