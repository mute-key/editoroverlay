import * as vscode from 'vscode';

import type * as D from '../../type/type';

export {
    updateUserConfig
};

const configSectionList: string[] = [
    'general',
    'cursorOnly',
    'singleLine',
    'multiLine',
    'multiCursor',
    'selectionText',
    'diagnosticText',
    'scmText'
];

const updateUserSetting = (extensionConfig: vscode.WorkspaceConfiguration, newKey: string, value: string | number | boolean): Thenable<void> => {
    return extensionConfig.update(newKey, value, vscode.ConfigurationTarget.Global);
};

const removeUserSetting = (extensionConfig: vscode.WorkspaceConfiguration, key: string): Thenable<void> => {
    return extensionConfig.update(key, undefined, vscode.ConfigurationTarget.Global);
};

const updateUserConfig = async (): Promise<boolean> => {
    const conf = vscode.workspace.getConfiguration('editoroverlay');
    if (Object.keys(conf).length > 4) {
        configSectionList.forEach(async (section) => { 
            if (Object.hasOwn(conf, section)) {
                for (const [key, value] of Object.entries(conf[section])) {
                    await updateUserSetting(vscode.workspace.getConfiguration(section), key, value as string | number | boolean);
                    await removeUserSetting(vscode.workspace.getConfiguration('editoroverlay'), section + '.' + key);
                }
            }
        });
        return true;
    }
    return false;
};