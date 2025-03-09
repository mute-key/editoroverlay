/**
 * [config utilities]
 * 
 */
import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import {
    CONFIG_INFO,
    CONFIG_SECTION,
    STATUS_INFO,
    DECORATION_STATE,
} from '../constant/object';
import {
    SYSTEM_MESSAGE
} from '../constant/enum';
import {
    createDecorationTypeBuilder
} from './decoration';
import {
    patchConfig
} from './patch';
import {
    regex,
    fnv1aHash,
    sendAutoDismissMessage,
    getWorkspaceConfiguration,
} from '../util/util';
import {
    disposeDecoration
} from '../editor/decoration/decoration';
import { 
    updateStatusTextConfig
} from './status';
import { 
    updateDiagnosticConfig 
} from './diagonostic';

const configInfo: Type.ConfigInfoType = { ...CONFIG_INFO };

const statusConfigInfo: Type.StatusInfoType = { ...STATUS_INFO };

const decorationState: Type.DecorationStateType = { ...DECORATION_STATE };

const getConfigString = (configReady: Type.ConfigInfoReadyType): string => {
    return Object.values(CONFIG_SECTION).reduce((sectionConfing, section) => {
        const extensionConfig = getWorkspaceConfiguration(configReady.name + '.' + section);
        const sectionConfingString = Object.entries(extensionConfig).reduce((configValue, [key, infoProp]) => {
            if (typeof infoProp === 'string' || typeof infoProp === 'number' || typeof infoProp === 'boolean') {
                configValue.push(infoProp as string);
            }
            return configValue;
        }, [] as string[]).join('');
        sectionConfing.push(sectionConfingString);
        return sectionConfing;
    }, [] as string[]).join('');
};

const getConfigHash = (configReady: Type.ConfigInfoReadyType): string => {
    const configString = getConfigString(configReady);
    return fnv1aHash(configString);
};

const setConfigHashKey = (configReady: Type.ConfigInfoReadyType): void => {
    configReady.configHashKey = fnv1aHash(getConfigString(configReady));
};

const ifConfigChanged = (configReady: Type.ConfigInfoReadyType): boolean => {
    const configHash = getConfigHash(configReady);
    if (configReady.configHashKey === configHash) {
        return false;
    } else {
        if (decorationState.appliedDecoration.editorDecoration) {
            decorationState.appliedDecoration.applied = undefined;
            disposeDecoration(decorationState.appliedDecoration.editorDecoration);
        }

        configReady.configError = [];
        configReady.configHashKey = configHash;

        if (configReady.configError.length === 0) {
            sendAutoDismissMessage(SYSTEM_MESSAGE.RELOADING_CONFIG, 1500);
        }
        return true;
    }
};

const updateEachEditorConfiguration = (key: string, value: any): void => {
    const editorConfig = vscode.workspace.getConfiguration("editor");
    if (value === null || value === 'null' || String(value).length === 0) {
        // this will add setting as string literal 'null'. 
        editorConfig.update(key, null, vscode.ConfigurationTarget.Global);
    } else {
        editorConfig.update(key, value, vscode.ConfigurationTarget.Global);
    }
};

/**
 * editor config overwrite.
 * 
 */
const updateEditorConfiguration = (): void => {
    const editorConfig = getWorkspaceConfiguration("editor");
    editorConfig.update("renderLineHighlight", 'gutter', vscode.ConfigurationTarget.Global);
    editorConfig.update("roundedSelection", false, vscode.ConfigurationTarget.Global);
    // this is cool but not necessary.
    // editorConfig.update("cursorBlinking", 'phase', vscode.ConfigurationTarget.Global);
    // editorConfig.update("cursorSmoothCaretAnimation", 'on', vscode.ConfigurationTarget.Global);
};

// const configNameToSettingName = (configName: string) =>
//     capitalize(configName.split('').reduce((string, characater) => string += /^[A-Z]/.test(characater) ? ' ' + characater : characater));

const configCondition: Type.ConfigCondition = <T extends string | number | boolean | null>(configReady: Type.ConfigInfoReadyType, configKeyWithScope: string, value: T, defaultValue: T) => {
    return {
        "bordercolor": () => {
            if (!regex.isValidHexColor.test(String(value))) {
                configReady.configError.push(configKeyWithScope);
            }
            return defaultValue;
        },
        "backgroundcolor": () => {
            if (value === null || value === 'null' || String(value).length === 0) {
                updateEachEditorConfiguration(configKeyWithScope, null);
                return null;
            }

            if (!regex.isValidHexColor.test(String(value))) {
                configReady.configError.push(configKeyWithScope);
            }
            return defaultValue;
        },
        "borderwidth": () => {
            if (!regex.isValidWidth.test(String(value))) {
                configReady.configError.push(configKeyWithScope);
            }
            return defaultValue;
        },
        // "fontweight": () => {
        //     if (!regex.isValidWidth.test(String(value))) {
        //         configReady.configError.push(configKeyWithScope);
        //     }
        //     return defaultValue;
        // }
    };
};

const configConditional = <T extends string | number | boolean | null>(configReady: Type.ConfigInfoReadyType, configPrefix: string, configNameString: string, value: T, defaultValue: T): T | null => {
    const configName = (configPrefix + configNameString);
    const configKeyWithScope = configReady.name + '.' + configName;
    const condition = configCondition(configReady, configKeyWithScope, value, defaultValue)[configName.toLowerCase()];

    if (condition) {
        return condition();
    }

    return value;
};


const initializeConfig = (context: vscode.ExtensionContext): Type.InitialisedConfigType | undefined => {
    const name = context.extension.packageJSON.name;

    if (!name) {
        return;
    }

    configInfo.name = name;

    if (!configInfo.name) {
        return;
    }

    // typecasting as well as referencing the object with definitive variable name
    const configReady = configInfo as Type.ConfigInfoReadyType;

    if (!configReady.configError) {
        configReady.configError = [];
        patchConfig(configReady);
    }

    if (!configReady.configHashKey) {
        setConfigHashKey(configReady);
        updateEditorConfiguration();
    } else {
        if (!ifConfigChanged(configReady)) {
            return {
                config: configReady,
                decoration: decorationState,
                status: statusConfigInfo
            };
        }
    }

    if (createDecorationTypeBuilder(configReady, statusConfigInfo, decorationState)) {

        if (configReady.generalConfigInfo.statusTextEnabled) {
            updateStatusTextConfig(configReady, statusConfigInfo, decorationState);
        }

        if (configReady.generalConfigInfo.diagnosticTextEnabled) {
            updateDiagnosticConfig(configReady, decorationState);
        }

        return {
            config: configReady,
            decoration: decorationState,
            status: statusConfigInfo
        };
    }
    return;

};

export {
    initializeConfig
};