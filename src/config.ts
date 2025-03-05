/**
 * [config utilities]
 * 
 */
import * as vscode from 'vscode';
import * as Type from './type/type.d';
import {
    regex,
    fnv1aHash,
    capitalize,
    readBits,
    hexToRgbaStringLiteral,
    sendAutoDismissMessage
} from './util/util';
import {
    NO_CONFIGURATION_GENERAL_DEFAULT,
    NO_CONFIGURATION_STATUS_DEFAULT,
    NO_CONFIGURATION_DEOCORATION_DEFAULT,
    DECORATION_STYLE_PREFIX,
    BORDER_WIDTH_DEFINITION,
    CONFIG_INFO,
    STATUS_INFO,
    DECORATION_STATE
} from './constant/object';
import {
    SYSTEM_MESSAGE
} from './constant/enum';
import {
    createEditorDecorationType,
    resetLastAppliedDecoration,
    disposeDecoration
} from './decoration';
import {
    disposeStatusInfo
} from './status';

const configInfo: Type.ConfigInfoType = { ...CONFIG_INFO };

const statusConfigInfo: Type.StatusInfoType = { ...STATUS_INFO };

const decorationState: Type.DecorationStateType = { ...DECORATION_STATE };

const getConfigString = (configReady: Type.ConfigInfoReadyType): string =>
    Object.entries(configReady.config).reduce((acc, [key, infoProp]) => {
        if (typeof infoProp === 'string' || typeof infoProp === 'number' || typeof infoProp === 'boolean') {
            acc.push(infoProp as string);
        }
        return acc;
    }, [] as string[]).join('');

const getConfigHash = (configReady: Type.ConfigInfoReadyType): string => {
    const configString = getConfigString(configReady);
    return fnv1aHash(configString);
};

const setConfigHashKey = (configReady: Type.ConfigInfoReadyType): void => {
    configReady.configHashKey = fnv1aHash(getConfigString(configReady));
};

const ifConfigChanged = (configReady: Type.ConfigInfoReadyType): boolean => {
    const configHash = getConfigHash(configReady);
    if (configReady.configHashKey === configHash) {
        return false;
    } else {
        if (decorationState.appliedDecoration.editorDecoration) {
            decorationState.appliedDecoration.applied = undefined;
            disposeDecoration(decorationState.appliedDecoration.editorDecoration);
        }
        
        configReady.configError = [];
        configReady.config = vscode.workspace.getConfiguration(configReady.name);
        configReady.configHashKey = configHash;
        
        if (configReady.configError.length === 0) {
            sendAutoDismissMessage(SYSTEM_MESSAGE.RELOADING_CONFIG, 1500);
        }
        return true;
    }
};

const updateEachEditorConfiguration = (key: string, value: any): void => {
    const editorConfig = vscode.workspace.getConfiguration("editor");
    if (value === null || value === 'null' || String(value).length === 0) {
        // this will add setting as string literal 'null'. 
        editorConfig.update(key, null, vscode.ConfigurationTarget.Global);
    } else {
        editorConfig.update(key, value, vscode.ConfigurationTarget.Global);
    }
};

/**
 * editor config overwrite.
 * 
 */
const updateEditorConfiguration = (): void => {
    const editorConfig = vscode.workspace.getConfiguration("editor");
    editorConfig.update("renderLineHighlight", 'gutter', vscode.ConfigurationTarget.Global);
    editorConfig.update("roundedSelection", false, vscode.ConfigurationTarget.Global);
    // this is very cool but not necessary.
    // editorConfig.update("cursorBlinking", 'phase', vscode.ConfigurationTarget.Global);
    // editorConfig.update("cursorSmoothCaretAnimation", 'on', vscode.ConfigurationTarget.Global);
};

const checkConfigKeyAndCast = <T extends Type.DecorationStyleConfigNameType | Type.GeneralConfigNameOnlyType>(key: string, config: Type.NoConfigurationDeocorationPropType): T => {
    return key as T;
};

const configNameTransformer = (configNameString: string, configNameTransform: Type.StringTransformFunc): string =>
    configNameTransform.reduce((str, transform) => transform(str), configNameString);

// const configNameToSettingName = (configName: string) =>
//     capitalize(configName.split('').reduce((string, characater) => string += /^[A-Z]/.test(characater) ? ' ' + characater : characater));

const configCondition: Type.ConfigCondition = <T extends string | number | boolean | null>(configReady: Type.ConfigInfoReadyType, configKeyWithScope: string, value: T, defaultValue: T) => {
    return {
        "bordercolor": () => {
            if (!regex.isValidHexColor.test(String(value))) {
                configReady.configError.push(configKeyWithScope);
            }
            return defaultValue;
        },
        "backgroundcolor": () => {
            if (value === null || value === 'null' || String(value).length === 0) {
                updateEachEditorConfiguration(configKeyWithScope, null);
                return null;
            }

            if (!regex.isValidHexColor.test(String(value))) {
                configReady.configError.push(configKeyWithScope);
            }
            return defaultValue;
        },
        "borderwidth": () => {
            if (!regex.isValidWidth.test(String(value))) {
                configReady.configError.push(configKeyWithScope);
            }
            return defaultValue;
        },
        // "fontweight": () => {
        //     if (!regex.isValidWidth.test(String(value))) {
        //         configReady.configError.push(configKeyWithScope);
        //     }
        //     return defaultValue;
        // }
    };
};

const configConditional = <T extends string | number | boolean | null>(configReady: Type.ConfigInfoReadyType, configPrefix: string, configNameString: string, value: T, defaultValue: T): T | null => {
    const configName = (configPrefix + configNameString);
    const configKeyWithScope = configReady.name + '.' + configName;
    const condition = configCondition(configReady, configKeyWithScope, value, defaultValue)[configName.toLowerCase()];

    if (condition) {
        return condition();
    }

    return value;
};

const getConfigValue: Type.DecorationConfigGetFunctionType = <T extends Type.DecorationStyleConfigValueType>(
    configInfo: Type.ConfigInfoReadyType,
    configPrefix: Type.DecorationStyleConfigPrefixType,
    configName: Type.DecorationStyleConfigNameType | Type.GeneralConfigNameOnlyType | Type.StatusTextConfigNameOnlyType,
    defaultValue: T,
    configNameTransform?: Type.StringTransformFunc
): T | null => {
    try {
        let configNameString = configName as string;

        if (configNameTransform && configNameTransform.length) {
            configNameString = configNameTransformer(configName, configNameTransform);
        }

        const value = configInfo.config.get<T>(configPrefix + configNameString, defaultValue);

        if (value === undefined) {
            console.warn(`Config value for ${configName} is undefined or caused an error. Using default value.`);
        }

        return configConditional(configInfo, configPrefix, configNameString, value, defaultValue);

    } catch (err) {
        console.error(`Failed to get config value for ${configPrefix + configName}:`, err);
        return defaultValue;
    }
};

const colorConfigTransform: Record<string, Type.ColourConfigTransformType> = {
    borderColor: {
        of: 'borderOpacity',
        fn: (v: string, n: number, d: string) => hexToRgbaStringLiteral(v, n, d),
    },
    backgroundColor: {
        of: 'backgroundOpacity',
        fn: (v: string, n: number, d: string) => hexToRgbaStringLiteral(v, n, d),
    }
};

/**
 * @param config
 * @param decorationKey
 * @returns
 * 
 */
const getConfigSet = (configInfo: Type.ConfigInfoReadyType, decorationKey: Type.DecorationStyleKeyOnlyType): Type.DecorationStyleConfigType => {

    const configPrefix = DECORATION_STYLE_PREFIX[decorationKey];
    const defaultConfigDefinition = NO_CONFIGURATION_DEOCORATION_DEFAULT[decorationKey];

    return Object.entries(defaultConfigDefinition).reduce((config, [configName, defaultValue]) => {
        const configValue: string | boolean | number | null = getConfigValue(configInfo, configPrefix, checkConfigKeyAndCast(configName, defaultConfigDefinition), defaultValue, [capitalize]);
        // configValue can be boolean.
        if (configValue !== undefined && configValue !== null) {
            if (Object.hasOwn(colorConfigTransform, configName)) {
                const colorTransform = colorConfigTransform[configName];
                config[configName] = colorTransform.fn(configValue as string, configInfo.generalConfigInfo[colorTransform.of] as number, defaultValue as string);
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
        if (Object.hasOwn(BORDER_WIDTH_DEFINITION[decorationKey], config.borderPosition)) {
            return borderPosition(config, BORDER_WIDTH_DEFINITION[decorationKey][config.borderPosition]);
        }
        return;
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

const setStatusConfig = (configReady: Type.ConfigInfoReadyType, statusConfigInfo: Type.StatusInfoType): void => {
    const editorConfig = vscode.workspace.getConfiguration("editor");
    const tabSize = editorConfig.get<string | number | undefined>("tabSize");
    const insertSpaces = editorConfig.get<string | number | undefined>("insertSpaces");
    // const indentSize = editorConfig.get<string | number | undefined>("indentSize");

    statusConfigInfo.indent.size = Number(tabSize ? tabSize : 4);
    statusConfigInfo.indent.type = insertSpaces ? '\n' : '\t';
    statusConfigInfo.indent.regex = insertSpaces
        ? regex.indentAndEOLRegex(statusConfigInfo.indent.size)
        : regex.tagtAndEOLRegex;

    if (configReady.statusTextConfig) {
        const textColor = configReady.statusTextConfig.statusTextColor;
        const textOpacity = configReady.statusTextConfig.statusTextOpacity;
        const defaultColor = NO_CONFIGURATION_STATUS_DEFAULT.statusTextColor;
        const defaultOpacity = NO_CONFIGURATION_STATUS_DEFAULT.statusTextOpacity;

        statusConfigInfo.statusText.rangeBehavior = vscode.DecorationRangeBehavior.ClosedClosed;
        statusConfigInfo.statusText.after.color = hexToRgbaStringLiteral(textColor as string, textOpacity, defaultColor, defaultOpacity);
        statusConfigInfo.statusText.after.backgroundColor = configReady.statusTextConfig.statusTextBackgroundColor as string;
        statusConfigInfo.statusText.after.fontWeight = configReady.statusTextConfig.statusTextFontWeight as string;
        statusConfigInfo.statusText.after.fontStyle = configReady.statusTextConfig.statusTextFontStyle as string;
    }
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
        configReady.generalConfigInfo[key] = getConfigValue(configReady, "", key as Type.GeneralConfigNameOnlyType, NO_CONFIGURATION_GENERAL_DEFAULT[key]);
    }

    for (const key in decorationState.decorationList) {
        const selectionType = key as Type.DecorationStyleKeyOnlyType;

        if (decorationState.decorationList[selectionType]) {
            disposeDecoration(decorationState.decorationList[selectionType]);
        }

        const configSet: Type.DecorationStyleConfigType = getConfigSet(configReady, selectionType);
        const parsed = borderPositionParser(selectionType, configSet.borderPosition);

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

    if (configReady.generalConfigInfo.statusTextEnabled) {
        if (decorationState.statusText) {
            disposeStatusInfo(decorationState);
        }

        for (const key in configReady.statusTextConfig) {
            configReady.statusTextConfig[key] = getConfigValue(configReady, "", key as Type.StatusTextConfigNameOnlyType, NO_CONFIGURATION_STATUS_DEFAULT[key]);
        }

        setStatusConfig(configReady, statusConfigInfo);
    }

    return true;
};

const initialiseConfig = (context: vscode.ExtensionContext): Type.InitialisedConfigType | undefined => {
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

    if (!configReady.configError) {
        configReady.configError = [];
    }

    if (!configReady.configHashKey) {
        setConfigHashKey(configReady);
        updateEditorConfiguration();
    } else {
        if (!ifConfigChanged(configReady)) {
            return {
                config: configReady,
                decoration: decorationState,
                status: statusConfigInfo
            };
        }
    }

    if (createDecorationTypeBuilder(configReady, statusConfigInfo, decorationState)) {
        return {
            config: configReady,
            decoration: decorationState,
            status: statusConfigInfo
        };
    }
    return;
};

export {
    initialiseConfig
};