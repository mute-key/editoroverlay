import * as vscode from 'vscode';
import { CONFIG_INFO } from '../constant/shared/configuration';
import { generateHighlightDecoration } from './overlay/highlight';
import { updateUserConfig } from './collection/patch';
import { updateSelectionTextConfig } from './overlay/selection';
import { updateDiagnosticTextConfig } from './overlay/diagnostic';
import { writeEditorConfiguration } from './shared/editor';
import { bindEditorDecoration } from '../editor/editor';
import { updateScmTextConfig } from './overlay/scm';

import type * as D from '../type/type';

export {
    loadConfiguration
};

const configInfo = { ...CONFIG_INFO } as unknown as D.Config.Intf.ConfigReady;

const loadConfiguration = async (context?: vscode.ExtensionContext): Promise<D.Config.Intf.InitialisedConfig | undefined> => {

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

    if (await updateUserConfig()) {
        // vscode.commands.executeCommand('workbench.action.reloadWindow');
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