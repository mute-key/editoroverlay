import type * as D from '../type/type';

import * as vscode from 'vscode';
import { CONFIG_SECTION } from '../constant/config/object';
import { configurationChanged } from '../configuration/shared/update';

export {
    configChanged,
    changeWorkspaceFolders
};

const configChanged: D.Event.Tp.DecorationEventFunc = ({ configInfo, decorationState }): vscode.Disposable => {
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


const changeWorkspaceFolders: D.Event.Tp.DecorationEventFunc = (context): vscode.Disposable => {
    return vscode.workspace.onDidChangeWorkspaceFolders((event: vscode.WorkspaceFoldersChangeEvent) => {
        // console.log('event.added', event.added);
    });
};