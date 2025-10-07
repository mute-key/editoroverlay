import type * as D from "../type/type";

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
    return vscode.commands.registerCommand("editoroverlay.applyPreset", () => quickPickPresetList(context));
};

const setColor = (context: D.Command.Intf.Context): vscode.Disposable => {
    return vscode.commands.registerCommand("editoroverlay.setColor", () => quickPickColorList(context));
};

const setContrast = (context: D.Command.Intf.Context): vscode.Disposable => {
    return vscode.commands.registerCommand("editoroverlay.setContrast", () => quickPickContrastList(context));
};

const setOrientation = (context: D.Command.Intf.Context): vscode.Disposable => {
    return vscode.commands.registerCommand("editoroverlay.setOrientation", () => quickPickOientationList(context));
};

const resetConfiguration = (context: D.Command.Intf.Context): vscode.Disposable => {
    return vscode.commands.registerCommand("editoroverlay.restoreToDefaultConfiguration", () => restoreToDefault().then(clearConfiguration(context)));
};