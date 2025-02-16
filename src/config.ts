/**
 * [config utilities]
 * 
 */
import * as vscode from 'vscode';
import * as Type from './type.d';
import {
    fnv1aHash,
    capitalize,
    hexToRgbaStringLiteral,
} from './util';
import {
    NO_CONFIGURATION_GENERAL_DEFAULT,
    NO_CONFIGURATION_DEOCORATION_DEFAULT,
    DECORATION_STYLE_PREFIX,
    DECORATION_STYLE_KEY,
    BORDER_POSITION_VARIATION
} from './constant';

const configInfo: Type.ConfigInfoType = {
    name: undefined,
    config: undefined,
    configHashKey: undefined,
    decorationList: {
        CURSOR_ONLY: undefined,
        SINGLE_LINE: undefined,
        MULTI_LINE: undefined,
        MULTI_CURSOR: undefined,
    },
    generalConfig: {
        borderOpacity: undefined,
    },
    borderPositionInfo: {
        CURSOR_ONLY: undefined,
        SINGLE_LINE: undefined,
        MULTI_LINE: undefined,
        MULTI_CURSOR: undefined,
    },
};

const getConfigString = (configReady: Type.ConfigInfoReadyType): string => Object.entries(configReady.config).reduce((acc, [key, infoProp]) => {
    if (typeof infoProp === 'string' || typeof infoProp === 'number') {
        acc.push(infoProp as string);
    }
    return acc;
}, [] as string[]).join('');

const getConfigHash = (configReady: Type.ConfigInfoReadyType): string => {
    const configString = getConfigString(configReady);
    return fnv1aHash(configString);
};

const ifConfigChanged = (configReady: Type.ConfigInfoReadyType): boolean => {
    const configHash = getConfigHash(configReady);
    if (configReady.configHashKey === configHash) {
        return false;
    } else {
        configReady.config = vscode.workspace.getConfiguration(configReady.name);
        configReady.configHashKey = configHash;
        return true;
    }
};

const setConfigHashKey = (configInfo: Type.ConfigInfoReadyType): void => {
    configInfo.configHashKey = fnv1aHash(getConfigString(configInfo));
};

const initialiseConfig = (context: vscode.ExtensionContext): Type.ConfigInfoReadyType | undefined => {
    const name = context.extension.packageJSON.name;

    if (!name) {
        return;
    }

    configInfo.name = name;
    configInfo.config = vscode.workspace.getConfiguration(configInfo.name);

    if (!configInfo.name && !configInfo.config) {
        return;
    }

    // typecasting as well as referencing the object with definitive variable name
    const configReady = configInfo as Type.ConfigInfoReadyType;

    if (!configReady.configHashKey) {
        setConfigHashKey(configReady);
    } else {
        if (!ifConfigChanged(configReady)) {
            return;
        };
    }

    if (createDecorationTypeBuilder(configReady)) {
        return configReady;
    }

    return;
};

const getConfigValue = <T extends Type.DecorationStyleConfigValueType>(
    configInfo: Type.ConfigInfoReadyType,
    prefix: Type.DecorationStyleConfigPrefixType,
    configName: Type.DecorationStyleConfigNameType | Type.GeneralConfigNameOnlyType,
    defaultValue: T
): T => {
    try {
        const value = configInfo.config.get<T>(prefix + configName, defaultValue);
        if (value === undefined) {
            console.warn(`Config value for ${configName} is undefined or caused an error. Using default value.`);
        }
        return value ?? defaultValue;
    } catch (err) {
        console.error(`Failed to get config value for ${configName}:`, err);
        return defaultValue;
    }
};

/**
 * @param config
 * @param decorationKey
 * @returns
 * 
 */
const getConfigSet = (configInfo: Type.ConfigInfoReadyType, decorationKey: Type.DecorationStyleKeyOnlyType): Type.DecorationStyleConfigType => {
    const CONFIG_PREFIX = DECORATION_STYLE_PREFIX[decorationKey];
    return Object.entries(NO_CONFIGURATION_DEOCORATION_DEFAULT[decorationKey]).reduce((acc, [key, defaultValue]) => {
        const keyName = capitalize(key) as Type.DecorationStyleConfigNameType;
        const configValue = getConfigValue(configInfo, CONFIG_PREFIX, keyName, defaultValue);
        if (configValue !== undefined) {
            if (key === 'borderColor') {
                const rgba = hexToRgbaStringLiteral(configValue as string, configInfo.generalConfig.borderOpacity as number);
                if (rgba) {
                    acc[key] = rgba;
                }
            } else {
                acc[key] = configValue;
            }
        }
        return acc;
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
    decorationKey: Type.DecorationStyleKeyOnlyType
) => (
    decorationTypeSplit: Type.SelectionConfigFunctionType
): vscode.TextEditorDecorationType[] =>
        decorationTypeSplit(config)[decorationKey]
            .reduce((acc, str) => {
                const conf = { ...config };
                conf.borderWidth = str;
                acc.push(conf);
                return acc;
            }, [] as Type.DecorationStyleConfigType[]).reduce((acc, conf) => {
                acc.push(vscode.window.createTextEditorDecorationType(conf));
                return acc;
            }, [] as vscode.TextEditorDecorationType[]);

const decorationTypeSplit = (config: Type.DecorationStyleConfigType): Type.DecorationTypeSplit => {
    return {
        [DECORATION_STYLE_KEY.CURSOR_ONLY]: borderPosition(config)[config.borderPosition],
        [DECORATION_STYLE_KEY.SINGLE_LINE]: borderPosition(config)[config.borderPosition],
        [DECORATION_STYLE_KEY.MULTI_LINE]: borderPositionMultLine(config)[config.borderPosition],
        [DECORATION_STYLE_KEY.MULTI_CURSOR]: borderPosition(config)[config.borderPosition],
    };
};

const borderPosition = (config: Type.DecorationStyleConfigType): Type.BorderPositionType => {
    return {
        [BORDER_POSITION_VARIATION.BOTTOM]
            : [`0 0 ${config.borderWidth} 0`],
        [BORDER_POSITION_VARIATION.TOP_BOTTOM]
            : [`${config.borderWidth} 0 ${config.borderWidth} 0`],
        [BORDER_POSITION_VARIATION.TOP_RIGHT_BOTTOM_LEFT]
            : [`${config.borderWidth} ${config.borderWidth} ${config.borderWidth} ${config.borderWidth}`],
        [BORDER_POSITION_VARIATION.LEFT]
            : [`0 0 0 ${config.borderWidth}`]
    };
};

const borderPositionMultLine = (config: Type.DecorationStyleConfigType): Type.BorderPositionType => {
    return {
        [BORDER_POSITION_VARIATION.BOTTOM]
            : [
                `0 0 0 0`,
                `0 0 ${config.borderWidth} 0`
            ],
        [BORDER_POSITION_VARIATION.TOP_BOTTOM]
            : [
                `${config.borderWidth} 0 0 0`,
                `0 0 ${config.borderWidth} 0`
            ],
        [BORDER_POSITION_VARIATION.TOP_RIGHT_BOTTOM_LEFT]
            : [
                `${config.borderWidth} ${config.borderWidth} ${config.borderWidth} ${config.borderWidth}`,
                `${config.borderWidth} ${config.borderWidth} ${config.borderWidth} ${config.borderWidth}`
            ],
        [BORDER_POSITION_VARIATION.LEFT]
            : [
                `${config.borderWidth} 0 0 0`,
                `${config.borderWidth} 0 0 0`
            ]
    };
};

const borderPositionParser = (borderPosition: string): Type.borderPositionParser => {
    const position = borderPosition.replaceAll(' ', '').split('|');
    let isWholeLine = false;

    if (position.length > 1) {
        isWholeLine = /isWholeLine/s.test(position[1]);
    } else {
        isWholeLine = false;
    }

    return {
        isWholeLine: isWholeLine,
        borderPosition: position[0]
    };
};

/**
 * wanted to avoid O(n^2) as much as possible but this is more extendable later
 * 
 * @param configInfo
 * @returns
 * 
 */
const createDecorationTypeBuilder = (configInfo: Type.ConfigInfoReadyType): boolean => {
    for (const key in configInfo.generalConfig) {
        if (configInfo.generalConfig.hasOwnProperty(key)) {
            configInfo.generalConfig[key] = getConfigValue(configInfo, "", key as Type.GeneralConfigNameOnlyType, NO_CONFIGURATION_GENERAL_DEFAULT[key]);
        }
    }

    for (const key in configInfo.decorationList) {
        const decorationStyleName = key as Type.DecorationStyleKeyOnlyType;

        const configSet: Type.DecorationStyleConfigType = getConfigSet(configInfo, decorationStyleName);
        configInfo.borderPositionInfo[decorationStyleName] = configSet.borderPosition;

        const parsed = borderPositionParser(configSet.borderPosition);
        configSet.borderPosition = parsed.borderPosition;
        configSet.isWholeLine = parsed.isWholeLine;

        // configSet.overviewRulerColor = configSet.borderColor;
        // configSet.overviewRulerLane = vscode.OverviewRulerLane.Full;

        configInfo.decorationList[key] = createDecorationType(configSet, decorationStyleName)(decorationTypeSplit);
    }

    return true;
};

export {
    initialiseConfig
};