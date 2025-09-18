/**
 * Creative Commons Attribution-NonCommercial 4.0 International Public License
 * 
 * Copyright (C) 2025 mutekey <https://github.com/mute-key>
 * 
 * This is a human-readable summary of (and not a substitute for) the license.
 * 
 * You are free to:
 * - Share — copy and redistribute the material in any medium or format.
 * - Adapt — remix, transform, and build upon the material.
 * 
 * The licensor cannot revoke these freedoms as long as you follow the license terms.
 * 
 * Under the following terms:
 * - Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
 * - NonCommercial — You may not use the material for commercial purposes.
 * - No additional restrictions — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.
 * 
 * For more information, visit:
 * https://creativecommons.org/licenses/by-nc/4.0/
 * 
 */

import * as vscode from 'vscode';
import { initialize } from './initialize';

/**
 * extension subscription binder. 
 * 
 * will wait for all configurations are load and ready, 
 * then subscribes the disposable that include events, commands and etc.
 * 
 * @param context 
 */
export function activate(context: vscode.ExtensionContext) {
    initialize(context).then((disposableList: void | vscode.Disposable[]) => {
        if (disposableList) {
            context.subscriptions.push(...disposableList);
        }
    });

    return context.extension.activate();
    // when vscode startup, not sure if it is the best method, 
    // as i am not sure even if it needs to wait to be activated.
    // maybe need to revise the method..? 
}

export function deactivate() {

}