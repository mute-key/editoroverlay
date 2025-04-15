import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import * as __0x from '../constant/shared/numeric';
import { CONFIG_SECTION } from '../constant/config/object';
import { configurationChanged } from '../configuration/shared/update';

const configChanged: Type.DecorationEventFunc = ({ configInfo, decorationState }): vscode.Disposable => {
    return vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
        if (event) {
            if (configInfo.updateCaller === undefined) {                                // if not preset triggered event
                const section = Object.keys(CONFIG_SECTION).find(section => {           // find section to update
                    return event.affectsConfiguration(configInfo.name + '.' + section);
                });
                section && configurationChanged(configInfo, section);                   // only changed section update
            }
        }
    });
};

export {
    configChanged
};