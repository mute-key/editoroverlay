import * as Type from '../../type/type';
import Regex from '../../util/regex.collection';
import { updateEditorConfiguration } from './editor';

const configCondition: Type.ConfigCondition = <T extends string | number | boolean | null>(configReady: Type.ConfigInfoReadyType, configKeyWithScope: string, value: T, defaultValue: T) => {
    return {
        "bordercolor": () => {
            if (!Regex.isValidHexColor.test(String(value))) {
                configReady.configError.push(configKeyWithScope);
            }
            return defaultValue;
        },
        "backgroundcolor": () => {
            if (value === null || value === 'null' || String(value).length === 0) {
                updateEditorConfiguration(configKeyWithScope, null);
                return null;
            }

            if (!Regex.isValidHexColor.test(String(value))) {
                configReady.configError.push(configKeyWithScope);
            }
            return defaultValue;
        },
        "borderwidth": () => {
            if (!Regex.isValidWidth.test(String(value))) {
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

const sanitizeConfigValue = (value: string | undefined): string | undefined => {
    if (!value || value === 'null' || value.length === 0 || Regex.resourceScope.test(value)) {
        return undefined;
    }
    return value;
};

const sanitizeContentText = (contentText: any[]) => {
    return contentText.filter(text => (text !== undefined && text.length > 0) || typeof text !== 'string');
};

const convertNullStringToNull = (value: string): string | null => {
    if (value === 'null' || value.length === 0) {
        return null;
    }
    return value;
};


export {
    sanitizeConfigValue,
    configCondition,
    sanitizeContentText,
    convertNullStringToNull
};