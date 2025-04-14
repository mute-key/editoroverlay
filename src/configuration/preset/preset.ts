import * as vscode from 'vscode';
import path from 'path';
import { CONFIRM, PRESET, PRESET_ORIENTATION, SYSTEM_MESSAGE } from '../../constant/config/enum';
import { CONFIG_SECTION } from '../../constant/config/object';
import { getWorkspaceConfiguration } from '../shared/configuration';
import { readFile } from 'node:fs/promises';

const clearConfiguration = (packageName: string) => (value: string | undefined): void => {
    if (value === CONFIRM.YES) {
        for (const section of Object.values(CONFIG_SECTION)) {
            const config = getWorkspaceConfiguration(packageName + "." + section);
            for (const key of Object.keys(config)) {
                if (typeof config[key] !== "function" && key.length > 0) {
                    config.update(key, undefined, true);
                }
            }
        }
        vscode.window.showInformationMessage(SYSTEM_MESSAGE.RESTORE_DEFAULT_COMPLETE);
    }
};

const restoreToDefault = (): Thenable<string | undefined> => {
    return vscode.window.showWarningMessage(SYSTEM_MESSAGE.RESTORE_DEFAULT, ...[CONFIRM.YES as string, CONFIRM.NO as string]);
};

const readPreset = async (context: vscode.ExtensionContext, presetFilename): Promise<object | undefined> => {
    try {
        const jsonPath = context.asAbsolutePath(path.join('resource/preset/', presetFilename));
        const content = await readFile(jsonPath, { encoding: 'utf-8' });
        const data = JSON.parse(content);
        return data;
    } catch (error) {
        console.error('Failed to load preset JSON:', error);
    }
};

const overrideConfiguration = (packageName: string, json: object) => (selected: string | undefined): void => {
    if (selected === CONFIRM.YES) {
        writeSelectedPreset(packageName, json);
    }
};

const actionConfirm = (): Thenable<string | undefined> => {
    return vscode.window.showWarningMessage('duplicate', ...[CONFIRM.YES, CONFIRM.NO]);
};

const writeSelectedPreset = (packageName: string, json: object): void => {
    const config = getWorkspaceConfiguration(packageName);
    for (const section of Object.keys(json)) {
        config.update(section, json[section]);
    }
};

const promptOientationList = async (context: vscode.ExtensionContext): Promise<void> => {
    const orientationList = [
        PRESET_ORIENTATION.HORIZONTAL,
        PRESET_ORIENTATION.VERTICAL
    ];

    const orientation = await vscode.window.showQuickPick(orientationList, {
        placeHolder: SYSTEM_MESSAGE.PRESET_SELCT_ORIENTATION,
    });
};

const checkDuplciateOverride = (packageName: string, json: any): boolean => {
    const config = getWorkspaceConfiguration(packageName);
    for (const section of Object.keys(json)) {
        const inspected = config.inspect<string>(section);
        if (inspected?.globalValue) {
            return true;
        }
    }
    return false;
};

const promptPresetList = async (context: vscode.ExtensionContext): Promise<void> => {

    const presetList = [
        PRESET.RECOMMNEDED,
        PRESET.NO_GLYPH_D,
        PRESET.NO_GLYPH_S,
        PRESET.EMOJI_D,
        PRESET.EMOJI_S
    ];

    const preset = await vscode.window.showQuickPick(presetList, {
        placeHolder: SYSTEM_MESSAGE.PRESET_SELCT,
    });

    const fileList = {
        [PRESET.RECOMMNEDED]: "recommended.json",
        [PRESET.NO_GLYPH_D]: "no-glyph-detailed.json",
        [PRESET.NO_GLYPH_S]: "no-glyph-simple.json",
        [PRESET.EMOJI_D]: "emoji-detailed.json",
        [PRESET.EMOJI_S]: "emoji-simple.json",
    };

    if (preset && Object.hasOwn(fileList, preset)) {
        const json = await readPreset(context, fileList[preset]);
        const packageName = context.extension.packageJSON.name;
        if (checkDuplciateOverride(context.extension.packageJSON.name, json)) {
            actionConfirm().then(overrideConfiguration(packageName, json ? json : {}));
        } else {
            writeSelectedPreset(packageName, json ? json : {});
        }
    }
};

export {
    readPreset,
    promptPresetList,
    promptOientationList,
    restoreToDefault,
    clearConfiguration,
};