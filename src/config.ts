/**
 * [config utilities]
 * 
 */
import * as vscode from 'vscode';
import * as Type from './type.d';
import {
    DEOCORATION_DEFAULT_OVERRIDE,
    DECORATION_STYLE_PREFIX,
    DECORATION_STYLE_KEY
} from './constant';

const configInfo: Type.ConfigInfoType = {
    name: undefined,
    config: undefined,
    decorationList: {
        CURSOR_ONLY: undefined,
        SINGLE_LINE: undefined,
        MULTI_LINE: undefined,
        MULTI_CURSOR: undefined,
    },
};

const initialiseConfig = (context: vscode.ExtensionContext): Type.ConfigInfoType | undefined => {
    const name = context.extension.packageJSON.name;

    if (!name) {
        return;
    }

    configInfo.name = name;
    configInfo.config = vscode.workspace.getConfiguration(configInfo.name);

    if (createDecorationTypeBuilder(configInfo.config)) {
        return configInfo;
    }

    return;
};

const hasConfigChagned = (context: vscode.ExtensionContext, event: vscode.ConfigurationChangeEvent): boolean => {
    try {
        const extentionPackage = context.extension.packageJSON;
        configInfo.name = extentionPackage.name;
    } catch (err) {
        console.log(err);
    } finally {
        return false;
    }
};

const getConfigValue: Type.DecorationConfigGetFunctionType = <T extends Type.DecorationStyleConfigValueType>(
    config: vscode.WorkspaceConfiguration,
    prefix: string,
    configName: Type.DecorationStyleConfigNameOnlyType,
    defaultValue: T,
    decorationKey: Type.DecorationStyleKeyOnlyType
) => {
    const key = prefix + configName;
    if (config) {
        return config.get<T>(key, defaultValue);
    }
    return DEOCORATION_DEFAULT_OVERRIDE[decorationKey][configName];
};

/**
 * @param config
 * @param decorationKey
 * @returns
 * 
 */
const getConfigSet = (config: vscode.WorkspaceConfiguration, decorationKey: Type.DecorationStyleKeyOnlyType): Type.DecorationStyleConfigType => {
    const CONFIG_PREFIX = DECORATION_STYLE_PREFIX[decorationKey] + '_';
    return Object.entries(DEOCORATION_DEFAULT_OVERRIDE[decorationKey]).reduce((acc, [key, value]) => {
        acc[key] = getConfigValue(
            config,
            CONFIG_PREFIX,
            <Type.DecorationStyleConfigNameOnlyType>key,
            <Type.DecorationStyleConfigValueType>value,
            decorationKey);
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
) => decorationTypeSplit(config)[decorationKey].reduce((acc, str) => {
    config.borderWidth = str;
    acc.push(config);
    return acc;
}, [] as Type.DecorationStyleConfigType[]).reduce((acc, config) => {
    acc.push(vscode.window.createTextEditorDecorationType(config));
    return acc;
}, [] as vscode.TextEditorDecorationType[]);

const decorationTypeSplit = (config: Type.DecorationStyleConfigType): Type.DecorationTypeSplit => {
    return {
        [DECORATION_STYLE_KEY.CURSOR_ONLY]: [`0 0 ${config.borderWidth} 0`],
        [DECORATION_STYLE_KEY.SINGLE_LINE]: [`0 0 ${config.borderWidth} 0`],
        [DECORATION_STYLE_KEY.MULTI_LINE]: [`${config.borderWidth} 0 0 0`, `0 0 ${config.borderWidth} 0`],
        [DECORATION_STYLE_KEY.MULTI_CURSOR]: [`${config.borderWidth} ${config.borderWidth} ${config.borderWidth} ${config.borderWidth}`],
    };
};

/**
 * wanted to avoid O(n^2) as much as possible but this is more extendable later
 * 
 * @returns
 * 
 */
const createDecorationTypeBuilder = (config: vscode.WorkspaceConfiguration): boolean => {
    if (!config) {
        return false;
    }

    Object.keys(configInfo.decorationList).map((key) => {
        const decorationStyleName = <Type.DecorationStyleKeyOnlyType>key;
        const configSet: Type.DecorationStyleConfigType = getConfigSet(config, decorationStyleName);
        configInfo.decorationList[decorationStyleName] = createDecorationType(configSet, decorationStyleName)(decorationTypeSplit);
    });

    return true;
};

export {
    initialiseConfig,
    hasConfigChagned,
};