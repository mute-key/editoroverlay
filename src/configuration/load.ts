import * as vscode from 'vscode';
import * as Type from '../type/type';
import { CONFIG_INFO } from '../constant/config/object';
import { generateHighlightDecoration } from './highlight/highlight';
import { updateLegacyConfig } from './collection/patch';
import { updateSelectionTextConfig } from './status/selection';
import { updateDiagnosticTextConfig } from './status/diagonostic';
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
;
    if (!configReady.configError) {
        configReady.configError = [];
        updateLegacyConfig(configReady);
    }

    writeEditorConfiguration();

    if (generateHighlightDecoration(configReady)) {
        
        if (configReady.generalConfigInfo.selectionTextEnabled) {
            updateSelectionTextConfig(configReady);
        }

        if (configReady.generalConfigInfo.diagnosticTextEnabled) {
            updateDiagnosticTextConfig(configReady);
        }

        // Object.seal(decorationState.appliedHighlight);

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