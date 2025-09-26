import type * as D from '../type/type';

import * as vscode from 'vscode';
import { CONFIG_INFO } from '../constant/config/object';
import { generateHighlightDecoration } from './overlay/highlight';
import { updateLegacyConfig } from './collection/patch';
import { updateSelectionTextConfig } from './overlay/selection';
import { updateDiagnosticTextConfig } from './overlay/diagnostic';
import { writeEditorConfiguration } from './shared/editor';
import { bindEditorDecoration } from '../editor/editor';
import { updateScmTextConfig } from './overlay/scm';

export {
    loadConfiguration
};

const configInfo = {
    ...CONFIG_INFO
} as unknown as D.Config.Intf.ConfigReady;

const loadConfiguration = (context?: vscode.ExtensionContext): D.Config.Intf.InitialisedConfig | undefined => {

    const name = context?.extension.packageJSON.name;

    if (!name) {
        return;
    }

    configInfo.name = name;

    if (!configInfo.name) {
        return;
    }

    const configReady = configInfo as D.Config.Intf.ConfigReady;
    const decorationState = bindEditorDecoration().stateOf;

    if (!configReady.configError) {
        configReady.configError = [];
        updateLegacyConfig(configReady);
    }

    writeEditorConfiguration();

    if (generateHighlightDecoration(configReady)) {

        if (configReady.generalConfigInfo.selectionTextEnabled) {
            updateSelectionTextConfig(configReady.name);
        }

        if (configReady.generalConfigInfo.diagnosticTextEnabled) {
            updateDiagnosticTextConfig(configReady.name);
        }

        if (configReady.generalConfigInfo.scmTextEnabled) {
            updateScmTextConfig(configReady.name);
        }

        return {
            config: configReady,
            decoration: decorationState
        };
    }
    return;
};