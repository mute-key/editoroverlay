import * as vscode from 'vscode';
import { getWorkspaceConfiguration } from '../shared/configuration';
import path from 'path';
import { readFile } from 'node:fs/promises';
import { CONFIRM, PRESET, SYSTEM_MESSAGE } from '../../constant/config/enum';

// RECOMMNEDED_H = "Recommended - Horizontal",
// RECOMMNEDED_V = "Recommended - Vertical",
// NO_GLYPH_D = "No Glpyph - Detailed",
// NO_GLYPH_S = "No Glpyph - Simple",
// EMOJI_D = "Emoji - Detailed",
// EMOJI_S = "Emoji - Simple",

const readPreset = async (context: vscode.ExtensionContext) => {
    try {
        const jsonPath = context.asAbsolutePath(path.join('resource', 'preset.json'));
        const content = await readFile(jsonPath, { encoding: 'utf-8' });
        const data = JSON.parse(content);
        return data;
    } catch (error) {
        console.error('Failed to load preset JSON:', error);
    }
};

const overrideConfiguration = (context: vscode.ExtensionContext) => (selected) => {
    if (selected = CONFIRM.YES) {
        readPreset(context);


    } 
};

const checkDuplciateOverride = (context: vscode.ExtensionContext, selected) => {

    // const extensionConfig = getWorkspaceConfiguration('editor');
    // vscode.workspace.getConfiguration('editor')

    if (true) {
        actionConfirm().then(overrideConfiguration(context));
    } else {
        overrideConfiguration(context)(selected);   
    }
};

const actionConfirm = () => {
    return vscode.window.showWarningMessage('duplicate', ...[CONFIRM.YES, CONFIRM.NO]);
};

const userSelectedPreset = (context: vscode.ExtensionContext) => (selected: string | undefined) => {

    checkDuplciateOverride(context, selected);

    selected => {
        switch (selected) {
            case PRESET.RECOMMNEDED_H:
                break;
            case PRESET.RECOMMNEDED_V:
                break;
            case PRESET.NO_GLYPH_D:
                break;
            case PRESET.NO_GLYPH_S:
                break;
            case PRESET.EMOJI_D:
                break;
            case PRESET.EMOJI_S:
                break;
            default:
                break;
        }
    };

    vscode.window.showInformationMessage(`Preset: ${selected} has been applied`);
};

const promptQuickPick = (): Thenable<string | undefined> => {

    const presetList = [
        PRESET.RECOMMNEDED_H,
        PRESET.RECOMMNEDED_V,
        PRESET.NO_GLYPH_D,
        PRESET.NO_GLYPH_S,
        PRESET.EMOJI_D,
        PRESET.EMOJI_S
    ];

    return vscode.window.showQuickPick(presetList, {
        placeHolder: SYSTEM_MESSAGE.SELECT_PRESET,
    });
};

export {
    readPreset,
    promptQuickPick,
    userSelectedPreset
};