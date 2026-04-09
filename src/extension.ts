/**
    All copyrights, titles, and intellectual property rights in 
    and to this software (including source code and documentation) 
    are owned exclusively by the Author ("mutekey, sihyun.seong@gmail.com").

    No part of this source code may be reproduced, transmitted, 
    distributed, sublicensed, modified, or used to create derivative
    works for any purpose, whether commercial or non-commercial, 
    without the express prior written consent of the Copyright Holder.

    This license does not grant any rights or access to any third party. 
    Any unauthorized use or access shall be strictly prohibited and may 
    be subject to legal action under applicable laws.
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
    initialize(context).then((disposableList: void | (vscode.Disposable | any)[]) => {
        if (disposableList) {
            context.subscriptions.push(...disposableList);
            // disposableList.forEach(disposable => context.subscriptions.push(...disposableList))
        }
    });
}

export function deactivate() {

}