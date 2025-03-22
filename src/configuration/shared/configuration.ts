import * as vscode from 'vscode';
import * as Type from '../../type/type';
import Error from '../../util/error';
import { CONFIG_SECTION_KEY, SELECTION_TYPE } from '../../constant/enum';
import { convertNullStringToNull } from './validation';
import {  getWorkspaceConfiguration, hexToRgbaStringLiteral, } from '../../util/util';
import { parseContentText } from '../shared/decoration';
import { updateGeneralConfig, updateHighlightStyleConfiguration } from '../highlight/highlight';
import { updateSelectionTextConfig } from '../status/selection';
import { updateDiagnosticTextConfig } from '../status/diagonostic';

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

const getConfigValue: Type.DecorationConfigGetFunctionType = <T extends Type.DecorationStyleConfigValueType>(configSection: vscode.WorkspaceConfiguration, configName: string, defaultValue: T, configSectionName?: string): T | string | null => {
    try {
        const value = configSection.get<T>(configName, defaultValue);
        if (value === undefined) {
            console.warn(`Config value for ${configName} is undefined or caused an error. Using default value.`);
        }

        // configConditional(configReady, configPrefix, configNameString, value, defaultValue);

        if (typeof value === 'string') {
            return convertNullStringToNull(value);
        }

        return value;

    } catch (err) {
        if (configSectionName) {
            Error.register(configSectionName + '.' + configName, `Failed to get config value for ${configSectionName + '.' + configName}:`);
        }
        console.error(`Failed to get config value for ${configSection + '.' + configName}:`, err);
        return configSection.inspect(configName)?.defaultValue as T;
    }
};

const workspaceProxyConfiguration = (config: any, workspaceConfigSectionName: string, ifContentTextArray?: string[], bindTo?: any, regexObject?) => {
    Object.entries(config).forEach(([sectionKey, section]) => {
        if (typeof section !== 'object') {
            const configValue = getConfigValue(getWorkspaceConfiguration(workspaceConfigSectionName), sectionKey, 'not found', workspaceConfigSectionName);
            if (configValue && regexObject && bindTo && ifContentTextArray && ifContentTextArray.includes(sectionKey)) {

                const contentTextPosition = {
                    contentText: [],
                    position: {}
                };

                bindTo.textOf[sectionKey] = { ...contentTextPosition };
                parseContentText(configValue, sectionKey, bindTo, regexObject, workspaceConfigSectionName);
            }

            if (Object.hasOwn(config, sectionKey) && configValue !== undefined) {
                config[sectionKey] = configValue;
            }
        } else {
            workspaceProxyConfiguration(config[sectionKey], workspaceConfigSectionName + '.' + sectionKey, ifContentTextArray, bindTo);
        }
    });
};

const sectionKeyList = [
    CONFIG_SECTION_KEY.GENERAL,
    CONFIG_SECTION_KEY.CURSOR_ONLY,
    CONFIG_SECTION_KEY.SINGLE_LINE,
    CONFIG_SECTION_KEY.MULTI_LINE,
    CONFIG_SECTION_KEY.MULTI_CURSOR,
    CONFIG_SECTION_KEY.SELECTION_TEXT,
    CONFIG_SECTION_KEY.DIAGNOSTIC_TEXT
] as const;

const updateConfigurationFromSection = (config: Type.ConfigInfoReadyType, section: string): void => {
    const configUpdateList = {
        [CONFIG_SECTION_KEY.GENERAL]: () => updateGeneralConfig(config),
        [CONFIG_SECTION_KEY.CURSOR_ONLY]: () => updateHighlightStyleConfiguration(config, SELECTION_TYPE.CURSOR_ONLY),
        [CONFIG_SECTION_KEY.SINGLE_LINE]: () => updateHighlightStyleConfiguration(config, SELECTION_TYPE.SINGLE_LINE),
        [CONFIG_SECTION_KEY.MULTI_LINE]: () => updateHighlightStyleConfiguration(config, SELECTION_TYPE.MULTI_LINE),
        [CONFIG_SECTION_KEY.MULTI_CURSOR]: () => updateHighlightStyleConfiguration(config, SELECTION_TYPE.MULTI_CURSOR),
        [CONFIG_SECTION_KEY.SELECTION_TEXT]: () => updateSelectionTextConfig(config),
        [CONFIG_SECTION_KEY.DIAGNOSTIC_TEXT]: () => updateDiagnosticTextConfig(config, true),
    };
    
    if (Object.hasOwn(configUpdateList, section)) {
        configUpdateList[section]();
    }
};

const update = {
    sectionChanged: updateConfigurationFromSection, 
    sectionList: sectionKeyList
} as const;

export {
    getConfigValue,
    colorConfigTransform,
    workspaceProxyConfiguration,
    update,
};
