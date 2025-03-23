import * as vscode from 'vscode';
// import * as config from '../configuration/load';
import * as Type from '../type/type.d';
import Error from '../util/error';
import * as update from '../configuration/update';
// import { updateSelectionTextConfig } from '../configuration/status/selection';
// import { CONFIG_SECTION_KEY } from '../constant/enum';

const configChanged: Type.DecorationEventFunc = ({ configInfo }): vscode.Disposable => {
    return vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
        if (event) {
            
            const sectionName = update.sectionList.find(section => {
                return event.affectsConfiguration(configInfo.name + '.' + section);
            });

            if (sectionName) {
                update.sectionChanged()[sectionName](configInfo);
            }

            if (Error.check()) {
                Error.notify(2000);
            }
        }
    });
};

export {
    configChanged
};