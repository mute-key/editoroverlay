import * as vscode from 'vscode';
import * as Type from '../type/type';
import { CONFIG_INFO } from '../constant/object';
import {  generateHighlightDecoration } from './highlight/highlight';
import { updateLegacyConfig } from './collection/patch';
import { updateSelectionTextConfig } from './status/selection';
import { updateDiagnosticTextConfig } from './status/diagonostic';
import { getConfigValue, ifConfigurationChanged, setConfigHashKey } from './shared/configuration';
import { writeEditorConfiguration } from './shared/editor';
import { getWorkspaceConfiguration } from '../util/util';
import { parseContentText } from './shared/decoration';
import { bindEditorDecoration } from '../editor/decoration/decoration';

const configInfo = { ...CONFIG_INFO } as Type.ConfigInfoType;

const loaConfiguration = (context: vscode.ExtensionContext): Type.InitialisedConfigType | undefined => {
    const name = context.extension.packageJSON.name;

    if (!name) {
        return;
    }

    configInfo.name = name;

    if (!configInfo.name) {
        return;
    }

    const configReady = configInfo as Type.ConfigInfoReadyType;

    const decorationState = bindEditorDecoration().stateOf;

    if (!configReady.configError) {
        configReady.configError = [];
        updateLegacyConfig(configReady);
        
    }

    if (!configReady.configHashKey) {
        setConfigHashKey(configReady);
    } else {
        if (!ifConfigurationChanged(configReady, decorationState)) {
            return {
                config: configReady,
                decoration: decorationState
            };
        }
    }

    writeEditorConfiguration();

    if (generateHighlightDecoration(configReady, decorationState)) {

        if (configReady.generalConfigInfo.statusTextEnabled) {
            updateSelectionTextConfig(configReady);
        }

        if (configReady.generalConfigInfo.diagnosticTextEnabled) {
            updateDiagnosticTextConfig(configReady);
        }

        return {
            config: configReady,
            decoration: decorationState
        };
    }
    return;
};

const workspaceProxyConfiguration = (config: any, workspaceConfigSectionName: string, ifContentTextArray?: string[], bindTo?: any, regexObject?) => {
    Object.entries(config).forEach(([sectionKey, section]) => {
        if (section === undefined) {
            const configValue = getConfigValue(getWorkspaceConfiguration(workspaceConfigSectionName), sectionKey, 'not found');
            if (configValue && regexObject && bindTo && ifContentTextArray && ifContentTextArray.includes(sectionKey)) {

                const contextTextPosition = {
                    contentText: [],
                    position: {}
                };

                bindTo.textOf[sectionKey] = { ...contextTextPosition };
                parseContentText(configValue, sectionKey, bindTo, regexObject);
            }

            if (Object.hasOwn(config, sectionKey) && configValue) {
                config[sectionKey] = configValue;
            }
        } else if (section && typeof section === 'object') {
            workspaceProxyConfiguration(config[sectionKey], workspaceConfigSectionName + '.' + sectionKey, ifContentTextArray, bindTo);
        }
    });
};

export {
    loaConfiguration,
    workspaceProxyConfiguration
};
