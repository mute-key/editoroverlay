import type * as D from '../../type/type';

import * as vscode from 'vscode';
import Error from '../../util/error';
import { convertNullStringToNull } from './validation';
import { hexToRgbaStringLiteral, } from '../../util/util';
import { parseContentText } from './decoration';

export {
    getConfigValue,
    colorConfigTransform,
    workspaceProxyConfiguration,
    getWorkspaceConfiguration
};

const getWorkspaceConfiguration = (section: string): vscode.WorkspaceConfiguration => vscode.workspace.getConfiguration(section);

const colorConfigTransform: Record<string, D.Decoration.Intf.ColourConfigTransform> = {
    borderColor: {
        of: 'borderOpacity',
        fn: (v: string, n: number, d: string) => hexToRgbaStringLiteral(v, n, d),
    },
    backgroundColor: {
        of: 'backgroundOpacity',
        fn: (v: string, n: number, d: string) => hexToRgbaStringLiteral(v, n, d),
    }
};

const getConfigValue: D.Config.Tp.DecorationConfigGetFunction = <T extends D.Config.Tp.DecorationStyleConfigValue>(configSection: vscode.WorkspaceConfiguration, configName: string, defaultValue: T, configSectionName?: string): T | string | null => {
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

const workspaceProxyConfiguration = (
    config: any,
    workspaceConfigSectionName: string,
    ifContentTextArray?: string[],
    bindTo?: any,
    regexObject?: D.Regex.Tp.ConfigurationRegexObject
) => {
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