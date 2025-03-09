import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import {
    DIAGNOSTIC_CONTENT_TEXT,
    DIAGNOSTIC_CONFIG
} from '../constant/object';
import {
    getConfigValue,
    searchPlaceholder,
} from './common';
import {
    bindDiagnosticContentTextState
} from '../editor/decoration/diagnostic';
import {
    getWorkspaceConfiguration,
    regex,
} from '../util/util';
import { 
    CONFIG_SECTION_KEY 
} from '../constant/enum';

const diagnosticContentTextInfo = { ...DIAGNOSTIC_CONTENT_TEXT } as Type.DiagnosticContentTextType;

const updateDiagnosticContentText = (configReady: Type.ConfigInfoReadyType, text: string | null, key: string, bind) => {
    if (text) {
        const match = text.match(regex.ifContentTextHasPlaceholder);
        if (match !== null && Object.hasOwn(regex.diagnosticTextRegex, key)) {
            const regexObject: Type.RegexDiagnosticContentTextUnion = regex.diagnosticTextRegex[key];
            if (match.length > Object.keys(regexObject).length) {
                configReady.configError.push('statusText.' + key);
            }

            let searchObject: Type.SearchObjectType | undefined = {
                nextSearchString: text,
                lastPosition: 0
            };

            diagnosticContentTextInfo[key].contentText = [];

            match.forEach((search, index) => {
                const regexKey = search.match(regex.contentTextKeysOnly);
                if (regexKey) {
                    if (Object.hasOwn(regexObject, regexKey[1] as string)) {
                        searchPlaceholder(diagnosticContentTextInfo[key], regexKey[1], regexObject[regexKey[1]], searchObject, index === match.length - 1, bind.diagnosticOf);
                    } else {
                        configReady.configError.push('statusText.' + key);
                        // not a valid placeholder
                    }
                }
            });
        } else {
            diagnosticContentTextInfo[key].contentText = [text];
        }
    } else {
        diagnosticContentTextInfo[key].contentText = [];
    }
};

const diagnosticConfig = { ...DIAGNOSTIC_CONFIG } as Type.DiagnosticConfigType;

const flushDiagnosticConfig = (): void => {
    Object.assign(diagnosticContentTextInfo, DIAGNOSTIC_CONTENT_TEXT);
    Object.assign(diagnosticConfig, DIAGNOSTIC_CONFIG);
};

const updateDiagnosticConfig = (configReady: Type.ConfigInfoReadyType, decorationState: Type.DecorationStateType) => {
    flushDiagnosticConfig();

    const sectionName = configReady.name + '.' + CONFIG_SECTION_KEY.DIAGNOSTIC_TEXT;
    const diagnosticConfigSection = getWorkspaceConfiguration(sectionName);

    Object.entries(diagnosticConfig).forEach(([key, section]) => {

        if (section === undefined) {
            const configValue = getConfigValue(diagnosticConfigSection, key, 'test');
            
            if (key.toLowerCase().includes('contenttext')) {
                const bind = bindDiagnosticContentTextState(key) as Type.BindDiagnosticContentTextStateType;
                updateDiagnosticContentText(configReady, configValue, key, bind);
                bind.diagnosticTextState(diagnosticContentTextInfo);
            }
            diagnosticConfig[key] = configValue;
        
        } else {
            const nestedSectionName = configReady.name + '.' + CONFIG_SECTION_KEY.DIAGNOSTIC_TEXT + '.' + key;
            const diagnosticConfigNestedSection = getWorkspaceConfiguration(nestedSectionName);
            Object.entries(section).forEach(([sKey, value]) => {
                diagnosticConfig[key][sKey] = getConfigValue(diagnosticConfigNestedSection, sKey, 'test');
            });
        }        
    });
};

export {
    updateDiagnosticConfig
};