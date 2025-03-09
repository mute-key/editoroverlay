
import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import { 
    hexToRgbaStringLiteral,
    splitAndPosition
} from '../util/util';


const castToFuncSignature = (result: Type.RegexSplitType | undefined): Type.SplitFuncType | undefined => {
    if (result) {
        return {
            ...result,
            array: result.array.filter(entry => entry !== undefined) as (string | (Type.ContentTextFuncSignature))[],
        };
    }
};

const searchPlaceholder = (targetObj: Type.StatusContentTextUnion, key: string, regex: RegExp, searchObject: Type.SearchObjectType, lastIndex: boolean, bindTo: Type.ContentTextFunc): void => {
    const split = castToFuncSignature(splitAndPosition(searchObject.nextSearchString as string, regex));
    if (split) {
        
        if (Object.hasOwn(bindTo, key)) {
            split.array[split.position] = bindTo[key];
        }

        if (lastIndex) {   
            targetObj.contentText?.push(...split.array);
            targetObj[key] = searchObject.lastPosition + split.position;
        } else {
            if (split.position === 0) {

                // placeholder is at index 0
                targetObj.contentText?.push(split.array[0]);
                targetObj[key] = searchObject.lastPosition + split.position;
                searchObject.nextSearchString = split.array[1];
                searchObject.lastPosition = searchObject.lastPosition + split.position + 1;

            } else if (split.position === 1 && split.array.length === 2) {  

                // placeholder is at last index in search string
                targetObj[key] = searchObject.lastPosition + split.position;
                targetObj.contentText?.push(...split.array);

            } else if (split.position === 1 && split.array.length === 3) {

                targetObj.contentText?.push(split.array[0], split.array[1]);
                targetObj[key] = searchObject.lastPosition + split.position;
                searchObject.nextSearchString = split.array[2];
                searchObject.lastPosition = searchObject.lastPosition + split.position + 1;
            }
        }
    }
};


const getConfigValue: Type.DecorationConfigGetFunctionType = <T extends Type.DecorationStyleConfigValueType>(
    configSection: vscode.WorkspaceConfiguration,
    configName: string,
    defaultValue: T
): T | null => {
    try {
        const value = configSection.get<T>(configName, defaultValue);

        if (value === undefined) {
            console.warn(`Config value for ${configName} is undefined or caused an error. Using default value.`);
        }

        // configConditional(configReady, configPrefix, configNameString, value, defaultValue);

        return value;

    } catch (err) {
        console.error(`Failed to get config value for ${configSection + '.' + configName}:`, err);
        return defaultValue;
    }
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

export {
    colorConfigTransform,
    getConfigValue,
    searchPlaceholder
};