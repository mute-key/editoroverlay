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
} from './util';
import {
    NO_CONFIGURATION_GENERAL_DEFAULT,
    NO_CONFIGURATION_DEOCORATION_DEFAULT,
    DECORATION_STYLE_PREFIX,
    BORDER_WIDTH_DEFINITION,
    CONFIG_INFO
} from './constant/object';
import {
    SYSTEM_MESSAGE,
} from './constant/enum';
import {
    createEditorDecorationType
} from './decoration';

const configInfo: Type.ConfigInfoType = { ...CONFIG_INFO };


const getConfigString = (configReady: Type.ConfigInfoReadyType): string => Object.entries(configReady.config).reduce((acc, [key, infoProp]) => {
    if (typeof infoProp === 'string' || typeof infoProp === 'number' || typeof infoProp === 'boolean') {
        acc.push(infoProp as string);
    }
    return acc;
}, [] as string[]).join('');

const getConfigHash = (configReady: Type.ConfigInfoReadyType): string => {
    const configString = getConfigString(configReady);
    return fnv1aHash(configString);
};

const setConfigHashKey = (configInfo: Type.ConfigInfoReadyType): void => {
    configInfo.configHashKey = fnv1aHash(getConfigString(configInfo));
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

/**
 * editor config overwrite.
 * 
 */
const updateEditorConfiguration = (configReady: Type.ConfigInfoReadyType): void => {
    const editorConfig = vscode.workspace.getConfiguration("editor");
    editorConfig.update("renderLineHighlight", 'gutter', vscode.ConfigurationTarget.Global);
    editorConfig.update("roundedSelection", false, vscode.ConfigurationTarget.Global);
    editorConfig.update("cursorBlinking", 'phase', vscode.ConfigurationTarget.Global);

    const tabSize = editorConfig.get<string | number | undefined>("tabSize");
    const insertSpaces = editorConfig.get<string | number | undefined>("insertSpaces");
    // const indentSize = editorConfig.get<string | number | undefined>("indentSize");

    configReady.status.indent.size = Number(tabSize ? tabSize : 4);
    configReady.status.indent.type = insertSpaces ? '\n' : '\t';
    configReady.status.indent.regex = insertSpaces
        ? regex.indentRegex(configReady.status.indent.size)
        : regex.tagRegex;

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
        updateEditorConfiguration(configReady);
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

const checkConfigKeyAndCast = <T extends Type.DecorationStyleConfigNameType | Type.GeneralConfigNameOnlyType>(key: string, config: Type.NoConfigurationDeocorationPropType): T => {
    return key as T;
};

const configNameTransformer = (configNameString: string, configNameTransform: Type.StringTransformFunc): string => {
    return configNameTransform.reduce((str, transform) => transform(str), configNameString);
};

const isConfigValueValid = (configInfo: Type.ConfigInfoReadyType, configPrefix: string, configNameString: string, value: any, defaultValue: any) => {
    const config = vscode.workspace.getConfiguration(configInfo.name);

    if (value === null || value.length === 0) {

    }
};

const getConfigValue: Type.DecorationConfigGetFunctionType = <T extends Type.DecorationStyleConfigValueType>(
    configInfo: Type.ConfigInfoReadyType,
    configPrefix: Type.DecorationStyleConfigPrefixType,
    configName: Type.DecorationStyleConfigNameType | Type.GeneralConfigNameOnlyType,
    defaultValue: T,
    configNameTransform?: Type.StringTransformFunc
): T => {
    try {
        let configNameString = configName as string;
        if (configNameTransform && configNameTransform.length) {
            configNameString = configNameTransformer(configName, configNameTransform);
        }

        const value = configInfo.config.get<T>(configPrefix + configNameString, defaultValue);
        if (value === undefined) {
            console.warn(`Config value for ${configName} is undefined or caused an error. Using default value.`);
        }

        //return isConfigValueValid(configInfo, configPrefix, configNameString,  value, defaultValue) ? value : defaultValue;

        return value ?? defaultValue;
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

        const configValue: string | boolean = getConfigValue(configInfo, configPrefix, checkConfigKeyAndCast(configName, defaultConfigDefinition), defaultValue, [capitalize]);

        // configValue can be boolean. 
        if (configValue !== undefined) {
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
    decorationKey: Type.DecorationStyleKeyOnlyType
) => (
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

/**
 * wanted to avoid O(n^2) as much as possible but this is ok.
 * 
 * @param configInfo
 * @returns
 * 
 */
const createDecorationTypeBuilder = (configInfo: Type.ConfigInfoReadyType): boolean => {
    for (const key in configInfo.generalConfigInfo) {
        configInfo.generalConfigInfo[key] = getConfigValue(configInfo, "", key as Type.GeneralConfigNameOnlyType, NO_CONFIGURATION_GENERAL_DEFAULT[key]);
    }

    for (const key in configInfo.decorationList) {

        const selectionType = key as Type.DecorationStyleKeyOnlyType;
        const configSet: Type.DecorationStyleConfigType = getConfigSet(configInfo, selectionType);
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