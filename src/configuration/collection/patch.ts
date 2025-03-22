import * as vscode from 'vscode';
import * as Type from '../../type/type';
import { getWorkspaceConfiguration } from '../../util/util';

const legacyConfig = {
    borderOpacity: 'general.borderOpacity',
    backgroundOpacity: 'general.backgroundOpacity',
    statusTextEnabled: 'selectionText.enabled',
    statusTextIconEnabled: 'selectionText.iconEnabled',
    statusTextColor: 'selectionText.color',
    statusTextBackgroundColor: 'selectionText.backgroundColor',
    statusTextOpacity: 'selectionText.opacity',
    statusTextFontStyle: 'statusTselectionTextext.fontStyle',
    statusTextFontWeight: 'selectionText.fontWeight',
    cursorOnlyBorderColor: 'cursorOnly.borderColor',
    cursorOnlyBackgroundColor: 'cursorOnly.backgroundColor',
    cursorOnlyBorderPosition: 'cursorOnly.borderPosition',
    cursorOnlyBorderWidth: 'cursorOnly.borderWidth',
    cursorOnlyBorderStyle: 'cursorOnly.borderStyle',
    cursorOnlyBorderStyleWithafterCursor: 'cursorOnly.borderStyleWithafterCursor',
    singleLineBorderColor: 'singleLine.borderColor',
    singleLineBackgroundColor: 'singleLine.backgroundColor',
    singleLine: 'singleLine.borderPosition',
    singleLineBorderWidth: 'singleLine.borderWidth',
    singleLineBorderStyle: 'singleLine.borderStyle',
    multiLineBorderColor: 'multiLine.borderColor',
    multiLineBackgroundColor: 'multiLine.backgroundColor',
    multiLineBorderPosition: 'multiLine.borderPosition',
    multiLineBorderWidth: 'multiLine.borderWidth',
    multiLineBorderStyle: 'multiLine.borderStyle',
    multiCursorBorderColor: 'multiCursor.borderColor',
    multiCursorBackgroundColor: 'multiCursor.backgroundColor',
    multiCursorBorderPosition: 'multiCursor.borderPosition',
    multiCursorBorderWidth: 'multiCursor.borderWidth',
    multiCursorBorderStyle: 'multiCursor.borderStyle',
};

const updateUserSetting = (extensionConfig: vscode.WorkspaceConfiguration, newKey: string, value: string | number | boolean): Thenable<void> => {
    return extensionConfig.update(newKey, value, vscode.ConfigurationTarget.Global);
};

const removeUserSetting = (extensionConfig: vscode.WorkspaceConfiguration, key: string): Thenable<void> => {
    return extensionConfig.update(key, undefined, vscode.ConfigurationTarget.Global);
};

const updateLegacyConfig = async (configReady: Type.ConfigInfoReadyType) => {
    const extensionConfig = getWorkspaceConfiguration(configReady.name);
    Object.entries(extensionConfig).forEach(async ([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            if (Object.hasOwn(legacyConfig, key)) {
                const newKey = legacyConfig[key];
                await updateUserSetting(extensionConfig, newKey, value);
                await removeUserSetting(extensionConfig, key);
            }
        }
    });
};

export {
    updateLegacyConfig
};

