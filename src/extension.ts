/**
 * Copyright (C) 2025 mutekey <https://github.com/mute-key>
 * 
 * This extension is free to use for personal or internal business purposes, provided that:
 * - The extension is used as-is, without any modification or reverse engineering;
 * - The extension is not redistributed, resold, sublicensed, or bundled as part of any commercial product or service;
 * - Attribution to the original author is preserved.
 *
 * Commercial redistribution or use of a modified version is strictly prohibited without explicit written permission.
 * 
 */

import * as vscode from 'vscode';
import { initialize } from './initialize';

/**
 * extension subscription binder. 
 * 
 * will wait for all configurations are load and ready, 
 * then subscript the disposable that include events, commands and etc.
 * 
 * @param context 
 */
export function activate(context: vscode.ExtensionContext) {
    initialize(context).then((disposableList: void | vscode.Disposable[]) => {
        if (disposableList) {
            context.subscriptions.push(...disposableList);
        }
    });
}

export function deactivate() {

}