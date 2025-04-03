import * as vscode from 'vscode';
import * as Type from '../../type/type';
import Error from '../../util/error';
import { convertNullStringToNull } from './validation';
import { getWorkspaceConfiguration, hexToRgbaStringLiteral, } from '../../util/util';
import { parseContentText } from '../shared/decoration';

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

export {
    getConfigValue,
    colorConfigTransform,
    workspaceProxyConfiguration
};
