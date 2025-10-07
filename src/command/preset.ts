import type * as D from "../type/type";

import path from 'path';
import * as vscode from 'vscode';
import * as hex from '../constant/numeric/hexadecimal';
import { CONFIG_SECTION } from '../constant/config/object';
import { CONTRAST, CONFIRM, PRESET, PRESET_ORIENTATION, SYSTEM_MESSAGE, PRESET_PATH, THEME_KIND } from '../constant/config/enum';
import { getWorkspaceConfiguration } from '../configuration/shared/configuration';
import { prepareRenderGroup, resetAllDecoration } from '../editor/editor';
import { updateSelectionTextConfig } from '../configuration/overlay/selection';
import { updateDiagnosticTextConfig } from '../configuration/overlay/diagnostic';
import { readFile } from 'node:fs/promises';
import { updateGeneralConfig, updateHighlightStyleConfiguration } from '../configuration/overlay/highlight';

export {
    readPreset,
    quickPickPresetList,
    quickPickColorList,
    quickPickContrastList,
    quickPickOientationList,
    restoreToDefault,
    clearConfiguration,
    checkActiveThemeKind
};

const clearConfiguration = (context: D.Command.Intf.Context) => (value: string | undefined): void => {
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

const readPreset = async (context: vscode.ExtensionContext, presetFilename: string): Promise<object | undefined> => {
    try {
        const jsonPath = context.asAbsolutePath(path.join(PRESET_PATH.PRESET_ROOT, presetFilename));
        const content = await readFile(jsonPath, { encoding: 'utf-8' });
        return JSON.parse(content);
    } catch (error) {
        console.error('Failed to load preset JSON:', error);
    }
};

const writeConfiguration = (configInfo: object, packageName: string, json: object) => (selected: string | undefined): Promise<void> | undefined => {
    if (selected === CONFIRM.YES) {
        return writeSelectedPreset(configInfo, packageName, json);
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

const writeSelectedPreset = async (configInfo: any, packageName: string, json: any): Promise<void> => {
    configInfo.updateCaller = hex.configruationCallerPreset; // block all configuration change event trigger
    vscode.commands.executeCommand("workbench.view.explorer");
    const config = getWorkspaceConfiguration(packageName);
    const section = Object.keys(json);
    let ridx = section.length;

    while (ridx--) {
        if (typeof json[section[ridx]] === 'object') { // configuration proxy object 
            const proxy: any = config.inspect<object>(section[ridx]);
            await config.update(section[ridx], { ...proxy?.globalValue, ...json[section[ridx]] }, true);
        } else {
            await config.update(section[ridx], json[section[ridx]], true);
        }
    }

    resetAllDecoration();
    updateGeneralConfig(configInfo);
    updateHighlightStyleConfiguration(configInfo, hex.cursorOnly);
    updateHighlightStyleConfiguration(configInfo, hex.singleLine);
    updateHighlightStyleConfiguration(configInfo, hex.multiLine);
    updateHighlightStyleConfiguration(configInfo, hex.multiCursor);
    updateSelectionTextConfig(packageName, true);
    updateDiagnosticTextConfig(packageName, true);
    prepareRenderGroup(configInfo as any);

    configInfo.updateCaller = undefined;
};

const overrideConfirm = (message: string): Thenable<string | undefined> => {
    return vscode.window.showWarningMessage(message, ...[CONFIRM.YES, CONFIRM.NO]);
};

interface PresetSet {
    presetList: string[]
    fileList: Record<string, string>
    placeHolder: string
}

const quickPickWrapper = async (context: D.Command.Intf.Context, { presetList, fileList, placeHolder }: PresetSet): Promise<void> => {
    const preset = await vscode.window.showQuickPick(presetList.map(l => { return { label: l }; }), { placeHolder: placeHolder });
    if (preset && Object.hasOwn(fileList, preset.label.toString())) {

        const packageName = context.package.extension.packageJSON.name;
        const json = await readPreset(context.package, fileList[preset.label.toString()]);
        const write = writeConfiguration(context.configInfo, packageName, json ? json : {});

        if (checkDuplciateOverride(context.package.extension.packageJSON.name, json)) {
            await overrideConfirm(SYSTEM_MESSAGE.OVERRIDE_CONFIRM).then(write);
        } else {
            await write(CONFIRM.YES);
        }
    }
};

const presetList: PresetSet = {
    presetList: [PRESET.RECOMMANDED, PRESET.DETAILED, PRESET.SIMPLE, PRESET.NO_GLYPH_D, PRESET.NO_GLYPH_S, PRESET.EMOJI_D, PRESET.EMOJI_S],
    fileList: {
        [PRESET.RECOMMANDED]: PRESET_PATH.PRESET_RECOMMANDED,
        [PRESET.DETAILED]: PRESET_PATH.PRESET_DETAILED,
        [PRESET.SIMPLE]: PRESET_PATH.PRESET_SIMPLE,
        [PRESET.NO_GLYPH_D]: PRESET_PATH.PRESET_NO_GLYPH_D,
        [PRESET.NO_GLYPH_S]: PRESET_PATH.PRESET_NO_GLYPH_S,
        [PRESET.EMOJI_D]: PRESET_PATH.PRESET_EMOJI_D,
        [PRESET.EMOJI_S]: PRESET_PATH.PRESET_EMOJI_S
    },
    placeHolder: SYSTEM_MESSAGE.PRESET_SELCT,
};

const presetOridentation: PresetSet = {
    presetList: [PRESET_ORIENTATION.HORIZONTAL, PRESET_ORIENTATION.VERTICAL],
    fileList: {
        [PRESET_ORIENTATION.HORIZONTAL]: PRESET_PATH.PRESET_ORIENTATION_HORIZONTAL,
        [PRESET_ORIENTATION.VERTICAL]: PRESET_PATH.PRESET_ORIENTATION_VERTICAL,
    },
    placeHolder: SYSTEM_MESSAGE.PRESET_SELCT_ORIENTATION
};

const presetColor: PresetSet = {
    presetList: [THEME_KIND.LIGHT, THEME_KIND.DARK],
    fileList: {
        [THEME_KIND.LIGHT]: PRESET_PATH.THEME_LIGHT,
        [THEME_KIND.DARK]: PRESET_PATH.THEME_DARK,
    },
    placeHolder: SYSTEM_MESSAGE.PRESET_SELCT_COLOR_CONTRAST,
};

const presetContrast: PresetSet = {
    presetList: [CONTRAST.DIM, CONTRAST.BRIGHT],
    fileList: {
        [CONTRAST.DIM]: PRESET_PATH.CONTRAST_DIM,
        [CONTRAST.BRIGHT]: PRESET_PATH.CONTRAST_BRIGHT,
    },
    placeHolder: SYSTEM_MESSAGE.PRESET_SELCT_COLOR,
};

const quickPickPresetList = (context: D.Command.Intf.Context) => quickPickWrapper(context, presetList);

const quickPickOientationList = (context: D.Command.Intf.Context) => quickPickWrapper(context, presetOridentation);

const quickPickColorList = (context: D.Command.Intf.Context) => quickPickWrapper(context, presetColor);

const quickPickContrastList = (context: D.Command.Intf.Context) => quickPickWrapper(context, presetContrast);

const checkActiveThemeKind = async (context: D.Command.Intf.Context): Promise<void> => {
    if (vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.Light) {
        const packageName = context.package.extension.packageJSON.name;
        const json = await readPreset(context.package, PRESET_PATH.THEME_LIGHT);
        if (json && !checkDuplciateOverride(context.package.extension.packageJSON.name, json)) {
            await writeSelectedPreset(context.configInfo, packageName, json);
        }
    }
};