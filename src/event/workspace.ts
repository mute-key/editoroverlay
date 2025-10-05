import type * as D from '../type/type';

import * as vscode from 'vscode';
import { CONFIG_SECTION } from '../constant/config/object';
import { configurationChanged } from '../configuration/shared/update';
import { activeEditorScm, scmParsed } from '../editor/scm/scm';

export {
    configChanged,
    newEditorSaved,
    changeWorkspaceFolders
};

const configChanged: D.Event.Tp.DecorationEventWithExtContextFunc = ({ configInfo, decorationState }, extensionContext: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
        if (event) {
            // const configSectionArray: any = [];
            // extensionContext.extension.packageJSON.contributes.configuration.map((section: any) => {
            //     configSectionArray.push(...Object.keys(section.properties));
            // });

            if (configInfo.updateCaller === undefined) {                                // if not preset triggered event
                const section = Object.keys(CONFIG_SECTION).find(section => {           // find section to update
                    return event.affectsConfiguration(configInfo.name + '.' + section);
                });
                section && configurationChanged(configInfo, section);                   // only changed section update
            }
        }
    });
};

const newEditorSaved = (): vscode.Disposable => {
    return vscode.workspace.onDidSaveTextDocument((event: vscode.TextDocument) => {
        if (!event.isDirty) {
            scmParsed(false);
            activeEditorScm(event.uri);
        }
    });
};

const changeWorkspaceFolders: D.Event.Tp.DecorationEventFunc = (context): vscode.Disposable => {
    return vscode.workspace.onDidChangeWorkspaceFolders((event: vscode.WorkspaceFoldersChangeEvent) => {
        // console.log('event.added', event.added);
    });
};