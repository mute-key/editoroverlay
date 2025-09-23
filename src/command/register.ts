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
    return vscode.commands.registerCommand("editorOverlay.applyPreset", () => quickPickPresetList(context));
};

const setColor = (context: D.Command.Intf.Context): vscode.Disposable => {
    return vscode.commands.registerCommand("editorOverlay.setColor", () => quickPickColorList(context));
};

const setContrast = (context: D.Command.Intf.Context): vscode.Disposable => {
    return vscode.commands.registerCommand("editorOverlay.setContrast", () => quickPickContrastList(context));
};

const setOrientation = (context: D.Command.Intf.Context): vscode.Disposable => {
    return vscode.commands.registerCommand("editorOverlay.setOrientation", () => quickPickOientationList(context));
};

const resetConfiguration = (context: D.Command.Intf.Context): vscode.Disposable => {
    return vscode.commands.registerCommand("editorOverlay.restoreToDefaultConfiguration", () => restoreToDefault().then(clearConfiguration(context)));
};