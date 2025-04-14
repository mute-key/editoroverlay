import * as vscode from 'vscode';
import path from 'path';
import { COLOR, CONFIRM, PRESET, PRESET_ORIENTATION, SYSTEM_MESSAGE } from '../../constant/config/enum';
import { CONFIG_SECTION } from '../../constant/config/object';
import { getWorkspaceConfiguration } from '../shared/configuration';
import { readFile } from 'node:fs/promises';
import { prepareRenderGroup, resetAllDecoration } from '../../editor/editor';
import { updateSelectionTextConfig } from '../decoration/selection';
import { updateDiagnosticTextConfig } from '../decoration/diagonostic';
import type { CommandContext } from "../../initialize";

const clearConfiguration = (context: CommandContext) => (value: string | undefined): void => {
    if (value === CONFIRM.YES) {
        for (const section of Object.values(CONFIG_SECTION)) {
            const config = getWorkspaceConfiguration(context.package.extension.packageJSON.name + "." + section);
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
    return overrideConfirm(SYSTEM_MESSAGE.RESTORE_DEFAULT);
};

const readPreset = async (context: CommandContext, presetFilename): Promise<object | undefined> => {
    try {
        const jsonPath = context.package.asAbsolutePath(path.join('resource/preset/', presetFilename));
        const content = await readFile(jsonPath, { encoding: 'utf-8' });
        const data = JSON.parse(content);
        return data;
    } catch (error) {
        console.error('Failed to load preset JSON:', error);
    }
};

const writeConfiguration = (configInfo: object, packageName: string, json: object) => (selected: string | undefined): void => {
    if (selected === CONFIRM.YES) {
        writeSelectedPreset(configInfo, packageName, json);
    }
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

const writeSelectedPreset = (configInfo: object, packageName: string, json: object): void => {

    const config = getWorkspaceConfiguration(packageName);
    Object.keys(json).forEach(section => {
        if (typeof json[section] === 'object') { // configuration proxy object 
            const proxy: any = config.inspect<object>(section);
            config.update(section, { ...proxy?.globalValue, ...json[section] }, true);
        } else {
            config.update(section, json[section], true);
        }
    });

    updateSelectionTextConfig(packageName, true);
    updateDiagnosticTextConfig(packageName, true);
    resetAllDecoration();
    prepareRenderGroup(configInfo as any);
};

const overrideConfirm = (message: string): Thenable<string | undefined> => {
    return vscode.window.showWarningMessage(message, ...[CONFIRM.YES, CONFIRM.NO]);
};

const quickPickWrapper = async (context: CommandContext, presetList: string[], fileList: object, placeHolder: string): Promise<void> => {
    const preset = await vscode.window.showQuickPick(presetList, { placeHolder: placeHolder });
    if (preset && Object.hasOwn(fileList, preset)) {

        const json = await readPreset(context, fileList[preset]);
        const packageName = context.package.extension.packageJSON.name;
        const write = writeConfiguration(context.configInfo, packageName, json ? json : {});

        if (checkDuplciateOverride(context.package.extension.packageJSON.name, json)) {
            overrideConfirm(SYSTEM_MESSAGE.OVERRIDE_CONFIRM).then(write);
        } else {
            write(CONFIRM.YES);
        }
    }
};

const quickPickPresetList = (context: CommandContext): void => {
    quickPickWrapper(
        context,
        [PRESET.DETAILED, PRESET.SHORTEN, PRESET.NO_GLYPH_D, PRESET.NO_GLYPH_S, PRESET.EMOJI_D, PRESET.EMOJI_S
        ],
        {
            [PRESET.DETAILED]: "detailed.json",
            [PRESET.SHORTEN]: "shorten.json",
            [PRESET.NO_GLYPH_D]: "no-glyph-detailed.json",
            [PRESET.NO_GLYPH_S]: "no-glyph-simple.json",
            [PRESET.EMOJI_D]: "emoji-detailed.json",
            [PRESET.EMOJI_S]: "emoji-simple.json",
        },
        SYSTEM_MESSAGE.PRESET_SELCT);
};

const quickPickOientationList = (context: CommandContext): void => {
    quickPickWrapper(
        context,
        [PRESET_ORIENTATION.HORIZONTAL, PRESET_ORIENTATION.VERTICAL],
        {
            [PRESET_ORIENTATION.HORIZONTAL]: "orientation-horizontal.json",
            [PRESET_ORIENTATION.VERTICAL]: "orientation-vertical.json",
        },
        SYSTEM_MESSAGE.PRESET_SELCT_ORIENTATION);
};

const quickPickColorList = (context: CommandContext): void => {
    quickPickWrapper(
        context,
        [COLOR.BLUR, COLOR.SHARP],
        {
            [COLOR.BLUR]: "color-blur.json",
            [COLOR.SHARP]: "color-sharp.json",
        },
        SYSTEM_MESSAGE.PRESET_SELCT_COLOR);
};



export {
    readPreset,
    quickPickPresetList,
    quickPickOientationList,
    quickPickColorList,
    restoreToDefault,
    clearConfiguration,
};