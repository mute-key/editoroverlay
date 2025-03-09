import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import { 
    CONFIG_SECTION, 
    BORDER_WIDTH_DEFINITION, 
    DECORATION_STYLE_PREFIX, 
    NO_CONFIGURATION_DEOCORATION_DEFAULT, 
    NO_CONFIGURATION_GENERAL_DEFAULT
} from '../constant/object';
import {
    colorConfigTransform,
    getConfigValue
} from './common';
import {
    createEditorDecorationType,
    disposeDecoration
} from '../editor/decoration/decoration';
import { 
    getWorkspaceConfiguration, 
    readBits 
} from '../util/util';

const checkConfigKeyAndCast = <T extends Type.DecorationStyleConfigNameType | Type.GeneralConfigNameOnlyType>(key: string, config: Type.NoConfigurationDeocorationPropType): T => {
    return key as T;
};

/**
 * @param config
 * @param decorationKey
 * @returns
 * 
 */
const getConfigSet = (configReady: Type.ConfigInfoReadyType, decorationKey: Type.DecorationStyleKeyOnlyType): Type.DecorationStyleConfigType => {
    const configSectionName = DECORATION_STYLE_PREFIX[decorationKey];
    const defaultConfigDefinition = NO_CONFIGURATION_DEOCORATION_DEFAULT[decorationKey];
    const configSection = getWorkspaceConfiguration(configReady.name + '.' + configSectionName);

    return Object.entries(defaultConfigDefinition).reduce((config, [configName, defaultValue]) => {
        const configValue: string | boolean | number | null = getConfigValue(configSection, checkConfigKeyAndCast(configName, defaultConfigDefinition), defaultValue as Type.DecorationStyleConfigValueType);
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
    }, {} as Type.DecorationStyleConfigType);
};


/**
 * @param config
 * @param decorationKey
 * @returns
 * 
 */
const createDecorationType: Type.CreateDecorationFunctionType = (
    config: Type.DecorationStyleConfigType,
    decorationKey: Type.DecorationStyleKeyOnlyType,
    decorationTypeSplit: Type.SelectionConfigFunctionType
) => {
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
        }, [] as Type.DecorationStyleConfigType[]).reduce((textEditorDecoration, styleAppliedConfig) => {
            textEditorDecoration.push(createEditorDecorationType(styleAppliedConfig));
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

const decorationTypeSplit = (config: Type.DecorationStyleConfigType, decorationKey: Type.DecorationStyleKeyOnlyType): string[] | undefined => {
    if (Object.hasOwn(BORDER_WIDTH_DEFINITION, decorationKey)) {
        if (Object.hasOwn(BORDER_WIDTH_DEFINITION[decorationKey], String(config.borderPosition))) {
            return borderPosition(config, BORDER_WIDTH_DEFINITION[decorationKey][config.borderPosition]);
        }
        return;
    }
    return;
};

const borderPosition = (config: Type.DecorationStyleConfigType, borderWidthMask: number[]): string[] | undefined => {
    const borderWidth: string[] = [];
    for (const bitMask of borderWidthMask) {
        const border = readBits(bitMask, String(config.borderWidth), '0');
        borderWidth.push(border.join(' '));
    }
    return borderWidth;
};

const borderPositionParser = (selectionType: Type.DecorationStyleKeyOnlyType, borderPosition: string): Type.BorderPositionParserType => {
    const position = borderPosition.replaceAll(' ', '').split('|');
    let isWholeLine = false;
    let beforeCursor = false;
    let afterCursor = false;
    let atLineStart = false;
    let selectionOnly = false;

    if (position.length > 1) {
        isWholeLine = /isWholeLine/s.test(position[1]);
        beforeCursor = /beforeCursor/s.test(position[1]);
        afterCursor = /afterCursor/s.test(position[1]);
        atLineStart = /atLineStart/s.test(position[1]);
        selectionOnly = /selectionOnly/s.test(position[1]);

        // if multi-line
        if (selectionType === 'MULTI_LINE' && position[0] === 'left') {
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


/**
 * wanted to avoid O(n^2) as much as possible but this is ok.
 * 
 * @param configInfo
 * @returns
 * 
 */
const createDecorationTypeBuilder = (configReady: Type.ConfigInfoReadyType, statusConfigInfo: Type.StatusInfoType, decorationState: Type.DecorationStateType): boolean => {

    for (const key in configReady.generalConfigInfo) {
        if (configReady.generalConfigInfo[key]) {
            const sectionLinker = configReady.generalConfigInfo[key].split('.');
            const configSection = getWorkspaceConfiguration(configReady.name + '.' + sectionLinker[0]);
            const configValue = getConfigValue(configSection, sectionLinker[1], NO_CONFIGURATION_GENERAL_DEFAULT[key]);
            configReady.generalConfigInfo[key] = configValue;
        } else {
            const configSection = getWorkspaceConfiguration(configReady.name + '.' + CONFIG_SECTION.general);
            configReady.generalConfigInfo[key] = getConfigValue(configSection, key , NO_CONFIGURATION_GENERAL_DEFAULT[key]);
        }
    }

    for (const key in decorationState.decorationList) {
        const selectionType = key as Type.DecorationStyleKeyOnlyType;

        if (decorationState.decorationList[selectionType]) {
            disposeDecoration(decorationState.decorationList[selectionType]);
        }

        const configSet: Type.DecorationStyleConfigType = getConfigSet(configReady, selectionType);
        const parsed = borderPositionParser(selectionType, String(configSet.borderPosition));

        configReady.borderPositionInfo[selectionType] = parsed;
        configSet.borderPosition = parsed.borderPosition;
        configSet.isWholeLine = parsed.isWholeLine;

        // configSet.overviewRulerColor = configSet.borderColor;
        // configSet.overviewRulerLane = vscode.OverviewRulerLane.Full;

        const decorationTypeList = createDecorationType(configSet, selectionType, decorationTypeSplit);

        if (!decorationTypeList) {
            return false;
        }

        decorationState.decorationList[selectionType] = decorationTypeList;
    }
    return true;
};


export {
    createDecorationTypeBuilder
};

