import * as vscode from 'vscode';
import * as Type from '../type/type';
import { CONFIG_INFO } from '../constant/config/object';
import { generateHighlightDecoration } from './decoration/highlight';
import { updateLegacyConfig } from './collection/patch.v.1.0';
import { updateSelectionTextConfig } from './decoration/selection';
import { updateDiagnosticTextConfig } from './decoration/diagonostic';
import { writeEditorConfiguration } from './shared/editor';
import { bindEditorDecoration } from '../editor/editor';

const configInfo = { 
    ...CONFIG_INFO
} as Type.ConfigInfoType;

const loadConfiguration = (context?: vscode.ExtensionContext): Type.InitialisedConfigType | undefined => {

    const name = context?.extension.packageJSON.name;

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

    writeEditorConfiguration();

    if (generateHighlightDecoration(configReady)) {

        if (configReady.generalConfigInfo.selectionTextEnabled) {
            updateSelectionTextConfig(configReady.name);
        }

        if (configReady.generalConfigInfo.diagnosticTextEnabled) {
            updateDiagnosticTextConfig(configReady.name);
        }
        
        return {
            config: configReady,
            decoration: decorationState
        };
    }
    return;
};

export { 
    loadConfiguration 
};