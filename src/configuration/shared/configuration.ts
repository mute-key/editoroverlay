import * as vscode from 'vscode';
import * as Type from '../../type/type';
import { fnv1aHash, sendAutoDismissMessage, getWorkspaceConfiguration, hexToRgbaStringLiteral, } from '../../util/util';
import { CONFIG_SECTION } from '../../constant/object';
import { disposeDecoration } from '../../editor/decoration/decoration';
import { SYSTEM_MESSAGE } from '../../constant/enum';
import { convertNullStringToNull } from './validation';



const setConfigHashKey = (configReady: Type.ConfigInfoReadyType): void => {
    configReady.configHashKey = fnv1aHash(getConfigString(configReady));
};

const getConfigHash = (configReady: Type.ConfigInfoReadyType): string => {
    const configString = getConfigString(configReady);
    return fnv1aHash(configString);
};

const getConfigString = (configReady: Type.ConfigInfoReadyType): string => {
    return Object.values(CONFIG_SECTION).reduce((sectionConfing, section) => {
        const extensionConfig = getWorkspaceConfiguration(configReady.name + '.' + section);
        const sectionConfingString = Object.entries(extensionConfig).reduce((configValue, [key, infoProp]) => {

            if (typeof infoProp === 'string' || typeof infoProp === 'number' || typeof infoProp === 'boolean') {
                configValue.push(infoProp as string);
            } else if (typeof infoProp === 'object' && Object.hasOwn(extensionConfig, key)) {
                Object.entries(extensionConfig).forEach(([key, value]) => configValue.push(value as string));
                // console.log(key);
            }
            return configValue;
        }, [] as string[]).join('');
        sectionConfing.push(sectionConfingString);
        return sectionConfing;
    }, [] as string[]).join('');
};


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


const getConfigValue: Type.DecorationConfigGetFunctionType = <T extends Type.DecorationStyleConfigValueType>(configSection: vscode.WorkspaceConfiguration, configName: string, defaultValue: T): T | string | null => {
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
        console.error(`Failed to get config value for ${configSection + '.' + configName}:`, err);
        return defaultValue;
    }
};

const ifConfigurationChanged = (configReady: Type.ConfigInfoReadyType, decorationState: Type.DecorationStateType): boolean => {
    const configHash = getConfigHash(configReady);
    if (configReady.configHashKey === configHash) {
        return false;
    } else {
        if (decorationState.appliedHighlight.ofDecorationType) {
            decorationState.appliedHighlight.applied = undefined;
            disposeDecoration(decorationState.appliedHighlight.ofDecorationType);
        }

        configReady.configError = [];
        configReady.configHashKey = configHash;

        if (configReady.configError.length === 0) {
            sendAutoDismissMessage(SYSTEM_MESSAGE.RELOADING_CONFIG, 1500);
        }
        return true;
    }
};

export {
    setConfigHashKey,
    ifConfigurationChanged,
    getConfigValue,
    colorConfigTransform
};
