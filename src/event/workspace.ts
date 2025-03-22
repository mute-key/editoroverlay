import * as vscode from 'vscode';
import * as config from '../configuration/load';
import Error from '../util/error';

const configChanged = ({configInfo}): vscode.Disposable => {
    return vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
        if (event) {
            const sectionName = config.update.sectionList.find(section => {
                return event.affectsConfiguration(configInfo.name + '.' + section);
            });

            if (sectionName) {
                console.log(configInfo.name + '.' + sectionName + 'has been changed');
                config.update.sectionChanged(configInfo, sectionName);
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