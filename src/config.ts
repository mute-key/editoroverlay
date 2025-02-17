/**
 * [config utilities]
 * 
 */
import * as vscode from 'vscode';
import * as Type from './type.d';
import {
    fnv1aHash,
    capitalize,
    readBits,
    hexToRgbaStringLiteral,
    sendAutoDismissMessage
} from './util';
import {
    NO_CONFIGURATION_GENERAL_DEFAULT,
    NO_CONFIGURATION_DEOCORATION_DEFAULT,
    DECORATION_STYLE_PREFIX,
    BORDER_WIDTH_DEFINITION,
    SYSTEM_MESSAGE
} from './constant';

/**
 * workspace configuration could have been 'default' but
 * i think undefined is more difinitive for unset default value.
 * 
 */
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
        backgroundOpacity: undefined,
        borderWidth: undefined,
        borderColor: undefined,
        backgroundColor: undefined,
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

        sendAutoDismissMessage(SYSTEM_MESSAGE.RELOADING_CONFIG, 1500);

        return true;
    }
};

const setConfigHashKey = (configInfo: Type.ConfigInfoReadyType): void => {
    configInfo.configHashKey = fnv1aHash(getConfigString(configInfo));
};

/**
 * editor config overwrite.
 * 
 */
const updateEditorConfiguration = () => {
    const editorConfig = vscode.workspace.getConfiguration("editor");
    editorConfig.update("renderLineHighlight", 'gutter', vscode.ConfigurationTarget.Global);
    editorConfig.update("roundedSelection", false, vscode.ConfigurationTarget.Global);
    editorConfig.update("cursorBlinking", 'phase', vscode.ConfigurationTarget.Global);

    // this is very cool but not necessary.
    // editorConfig.update("cursorSmoothCaretAnimation", 'on', vscode.ConfigurationTarget.Global);
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
        updateEditorConfiguration();
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
            } else if (key === 'backgroundColor') {
                const rgba = hexToRgbaStringLiteral(configValue as string, configInfo.generalConfig.backgroundOpacity as unknown as number);
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
) => {
        try {
            const split = decorationTypeSplit(config, decorationKey);
            if (!split || split.length === 0) {
                return;
            }

            const decorationTypeStack = split.reduce((acc, str) => {
                const conf = { ...config };
                conf.borderWidth = str;
                acc.push(conf);
                return acc;
            }, [] as Type.DecorationStyleConfigType[]).reduce((acc, conf) => {
                acc.push(vscode.window.createTextEditorDecorationType(conf));
                return acc;
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
        if (Object.hasOwn(BORDER_WIDTH_DEFINITION[decorationKey], config.borderPosition)) {
            return borderPosition(config, BORDER_WIDTH_DEFINITION[decorationKey][config.borderPosition]);
        }
    }
    return;
};

const borderPosition = (config: Type.DecorationStyleConfigType, borderWidthMask: number[]): string[] | undefined => {
    const borderWidth: string[] = [];
    for (const bitMask of borderWidthMask) {
        const border = readBits(bitMask, config.borderWidth, '0');
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
const createDecorationTypeBuilder = (configInfo: Type.ConfigInfoReadyType): boolean => {
    for (const key in configInfo.generalConfig) {
        if (configInfo.generalConfig.hasOwnProperty(key)) {
            configInfo.generalConfig[key] = getConfigValue(configInfo, "", key as Type.GeneralConfigNameOnlyType, NO_CONFIGURATION_GENERAL_DEFAULT[key]);
        }
    }

    for (const key in configInfo.decorationList) {
        const selectionType = key as Type.DecorationStyleKeyOnlyType;

        const configSet: Type.DecorationStyleConfigType = getConfigSet(configInfo, selectionType);
        // configInfo.borderPositionInfo[selectionType] = configSet.borderPosition;

        const parsed = borderPositionParser(selectionType, configSet.borderPosition);
        configInfo.borderPositionInfo[selectionType] = parsed;
        configSet.borderPosition = parsed.borderPosition;
        configSet.isWholeLine = parsed.isWholeLine;

        // configSet.overviewRulerColor = configSet.borderColor;
        // configSet.overviewRulerLane = vscode.OverviewRulerLane.Full;

        const decorationTypeList = createDecorationType(configSet, selectionType)(decorationTypeSplit);

        if (!decorationTypeList) {
            return false;
        }

        configInfo.decorationList[key] = decorationTypeList;
    }

    return true;
};

export {
    initialiseConfig
};