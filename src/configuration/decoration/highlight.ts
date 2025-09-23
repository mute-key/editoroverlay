import type * as D from '../../type/type';

import * as vscode from 'vscode';
import * as hex from '../../constant/numeric/hexadecimal';
import * as regex from '../../collection/regex';
import { SELECTION_KIND_LIST } from '../../store/state';
import { BORDER_WIDTH_DEFINITION_CONFIG, CONFIG_KEY_LINKER_SECTION_CONFIG, CONFIG_SECTION, DECORATION_STYLE_PREFIX_CONFIG, NO_CONFIGURATION_DEOCORATION_DEFAULT_CONFIG, NO_CONFIGURATION_GENERAL_DEFAULT_CONFIG } from '../../constant/config/object';
import { CONFIG_KEY_LINKER } from '../../constant/config/enum';
import { bindHighlightStyleState } from '../../editor/highlight/highlight';
import { colorConfigTransform, getConfigValue, getWorkspaceConfiguration } from '../shared/configuration';
import { createEditorDecorationType } from '../../editor/editor';
import { readBits } from '../../util/util';

export {
    updateGeneralConfig,
    updateHighlightStyleConfiguration,
    generateHighlightDecoration
};

const checkConfigKeyAndCast = <T extends D.Config.Tp.DecorationStyleConfigName | D.Config.Tp.GeneralConfigNameOnly>(key: string): T => {
    return key as T;
};

const getConfigSet = (configReady: D.Config.Intf.ConfigReady, decorationKey: number): D.Decoration.Tp.DecorationStyleConfig => {
    const configSectionName = DECORATION_STYLE_PREFIX_CONFIG[decorationKey];
    const defaultConfigDefinition = NO_CONFIGURATION_DEOCORATION_DEFAULT_CONFIG;
    const configSection = getWorkspaceConfiguration(configReady.name + '.' + configSectionName);
    return Object.entries(defaultConfigDefinition).reduce((config, [configName, defaultValue]) => {
        const configValue: string | boolean | number | null = getConfigValue(configSection, checkConfigKeyAndCast(configName), defaultValue as D.Config.Tp.DecorationStyleConfigValue, configReady.name + '.' + configSectionName);
        // configValue can be boolean.
        if (configValue !== undefined && configValue !== null) {
            if (Object.hasOwn(colorConfigTransform, configName)) {
                const colorTransform = colorConfigTransform[configName];
                config[configName] = colorTransform.fn(configValue as string, configReady.generalConfigInfo[colorTransform.of] as number, defaultValue as string);
            } else {
                config[configName] = configValue;
            }
        }
        return config;
    }, {} as D.Decoration.Tp.DecorationStyleConfig);
};

const combineBorderStyle = (style: vscode.DecorationRenderOptions) => {
    style.border = `${style.borderStyle} ${style.borderColor};`;
    delete style.borderStyle;
    delete style.borderColor;
    return style;
};

const createDecorationType = (config: D.Decoration.Tp.DecorationStyleConfig, decorationKey: number, decorationTypeSplit: D.Decoration.Tp.SelectionConfigFunction) => {
    try {
        const split = decorationTypeSplit(config, decorationKey);
        if (!split || split.length === 0) {
            return;
        }
        const decorationTypeStack = split.reduce((styledConfig, str) => {
            const conf = { ...config };
            conf.borderWidth = str;
            styledConfig.push(conf);
            return styledConfig;
        }, [] as D.Decoration.Tp.DecorationStyleConfig[]).reduce((textEditorDecoration, styleAppliedConfig, idx) => {
            if (decorationKey === hex.multiLine && idx !== 2) {
                delete styleAppliedConfig.backgroundColor;
            }
            textEditorDecoration.push(createEditorDecorationType(combineBorderStyle(styleAppliedConfig)));
            return textEditorDecoration;
        }, [] as vscode.TextEditorDecorationType[]);
        if (decorationTypeStack.length === 0) {
            return;
        }
        return decorationTypeStack;
    } catch (err) {
        console.log('creating decoration type thrown error:', decorationKey, err);
        return;
    }
};

const decorationTypeSplit = (config: any, decorationKey: D.Numeric.Key.Hex): string[] | undefined => {
    if (Object.hasOwn(BORDER_WIDTH_DEFINITION_CONFIG, decorationKey)) {
        if (Object.hasOwn(BORDER_WIDTH_DEFINITION_CONFIG[decorationKey], String(config.borderPosition))) {
            return borderPosition(config, BORDER_WIDTH_DEFINITION_CONFIG[decorationKey][config.borderPosition] as number[]);
        }
        return;
    }
    return;
};

const borderPosition = (config: D.Decoration.Tp.DecorationStyleConfig, borderWidthMask: number[]): string[] | undefined => {
    const borderWidth: string[] = [];
    for (const bitMask of borderWidthMask) {
        const border = readBits(bitMask, String(config.borderWidth), '0');
        borderWidth.push(border.join(' '));
    }
    return borderWidth;
};

const borderPositionParser = (selectionType: number, borderPosition: string): D.Decoration.Intf.BorderPositionParser => {
    const position = borderPosition.replaceAll(' ', '').split('|');
    let isWholeLine = false;
    let beforeCursor = false;
    let afterCursor = false;
    let atLineStart = false;
    let selectionOnly = false;
    if (position.length > 1) {
        isWholeLine = regex.isWholeLine.test(position[1]);
        beforeCursor = regex.beforeCursor.test(position[1]);
        afterCursor = regex.afterCursor.test(position[1]);
        atLineStart = regex.atLineStart.test(position[1]);
        selectionOnly = regex.selectionOnly.test(position[1]);
        if (selectionType === hex.multiLine && position[0] === 'left') { // if multi-line
            isWholeLine = true;
        }
    }
    return {
        isWholeLine: isWholeLine,
        borderPosition: position[0],
        beforeCursor: beforeCursor,
        afterCursor: afterCursor,
        atLineStart: atLineStart,
        selectionOnly: selectionOnly
    };
};

const updateGeneralConfig = (configReady: D.Config.Intf.ConfigReady) => {
    for (const key in configReady.generalConfigInfo) {
        if (key === CONFIG_KEY_LINKER.DIAGNOSTIC_TEXT_ENABLED || key === CONFIG_KEY_LINKER.SELECTION_TEXT_ENABLED) {
            const sectionLinker = CONFIG_KEY_LINKER_SECTION_CONFIG[key];
            const configSection = getWorkspaceConfiguration(configReady.name + '.' + sectionLinker[0]);
            const configValue = getConfigValue(configSection, sectionLinker[1], NO_CONFIGURATION_GENERAL_DEFAULT_CONFIG[key], configReady.name + '.' + sectionLinker[0]);
            configReady.generalConfigInfo[key] = configValue;
        } else {
            const configSection = getWorkspaceConfiguration(configReady.name + '.' + CONFIG_SECTION.general);
            configReady.generalConfigInfo[key] = getConfigValue(configSection, key, NO_CONFIGURATION_GENERAL_DEFAULT_CONFIG[key], configReady.name + '.' + CONFIG_SECTION.general);
        }
    }
};

const updateHighlightStyleConfiguration = (configReady: D.Config.Intf.ConfigReady, selectionType: number) => {
    let bindTo: any = bindHighlightStyleState();
    if (bindTo.styleOf[selectionType]) {
        bindTo.styleOf[selectionType].forEach(decoration => decoration.dispose());
    }
    const configSet: D.Decoration.Tp.DecorationStyleConfig = getConfigSet(configReady, selectionType);
    const parsed = borderPositionParser(selectionType, String(configSet.borderPosition));
    bindTo.infoOf[selectionType] = parsed;
    configSet.borderPosition = parsed.borderPosition;
    configSet.isWholeLine = parsed.isWholeLine;
    const decorationTypeList = createDecorationType(configSet, selectionType, decorationTypeSplit);
    if (!decorationTypeList) {
        return false;
    }
    bindTo.styleOf[selectionType] = decorationTypeList;
    delete bindTo.styleOf;
    delete bindTo.infoOf;
};

const generateHighlightDecoration = (configReady: D.Config.Intf.ConfigReady): boolean => {
    updateGeneralConfig(configReady);
    for (const key of SELECTION_KIND_LIST) {
        const selectionType = key as D.Decoration.Tp.DecorationStyleKeyOnly;
        updateHighlightStyleConfiguration(configReady, selectionType);
    }
    return true;
};