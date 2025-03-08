import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import {
    NO_CONFIGURATION_STATUS_DEFAULT,
    STATUS_CONTENT_TEXT
} from '../constant/object';
import {
    hexToRgbaStringLiteral,
    regex,
    splitAndPosition
} from '../util/util';
import {
    bindContentTextState
} from '../status';

const statusContentText = { ...STATUS_CONTENT_TEXT } as Type.StatusContentTextType;

const setStatusConfig = (configReady: Type.ConfigInfoReadyType, statusConfigInfo: Type.StatusInfoType): void => {
    const editorConfig = vscode.workspace.getConfiguration("editor");
    const tabSize = editorConfig.get<string | number | undefined>("tabSize");
    const insertSpaces = editorConfig.get<string | number | undefined>("insertSpaces");
    // const indentSize = editorConfig.get<string | number | undefined>("indentSize");

    statusConfigInfo.indent.size = Number(tabSize ? tabSize : 4);
    statusConfigInfo.indent.type = insertSpaces ? '\n' : '\t';
    statusConfigInfo.indent.regex = insertSpaces
        ? regex.indentAndEOLRegex(statusConfigInfo.indent.size)
        : regex.tagtAndEOLRegex;

    if (configReady.statusTextConfig) {
        const textColor = configReady.statusTextConfig.color;
        const textOpacity = configReady.statusTextConfig.opacity;
        const defaultColor = NO_CONFIGURATION_STATUS_DEFAULT.statusTextColor;
        const defaultOpacity = NO_CONFIGURATION_STATUS_DEFAULT.statusTextOpacity;

        statusConfigInfo.statusDecoration.rangeBehavior = vscode.DecorationRangeBehavior.ClosedClosed;
        statusConfigInfo.statusDecoration.after.color = hexToRgbaStringLiteral(textColor as string, textOpacity, defaultColor, defaultOpacity);
        statusConfigInfo.statusDecoration.after.backgroundColor = configReady.statusTextConfig.backgroundColor as string;
        statusConfigInfo.statusDecoration.after.fontWeight = configReady.statusTextConfig.fontWeight as string;
        statusConfigInfo.statusDecoration.after.fontStyle = configReady.statusTextConfig.fontStyle as string;
    }
};

const castToFuncSignature = (result: Type.RegexSplitType | undefined): Type.SplitFuncType | undefined => {
    if (result) {
        return {
            ...result,
            array: result.array as (string | (Type.ContentTextFuncSignature))[],
        };
    }
};

const searchPlaceholder = (obj: Type.StatusContentTextUnion, key: string, regex: RegExp, searchObject: Type.SearchObjectType, lastIndex: boolean, statusOf: Type.ContentTextFunc): void => {
    const split = castToFuncSignature(splitAndPosition(searchObject.nextSearchString as string, regex));
    if (split) {
        
        if (Object.hasOwn(statusOf, key)) {
            split.array[split.position] = statusOf[key];
        }

        if (lastIndex) {   
            obj.contentText?.push(...split.array);
            obj[key] = searchObject.lastPosition + split.position;
        } else {
            if (split.position === 0) {

                // placeholder is at index 0
                obj.contentText?.push(split.array[0]);
                obj[key] = searchObject.lastPosition + split.position;
                searchObject.nextSearchString = split.array[1];
                searchObject.lastPosition = searchObject.lastPosition + split.position + 1;

            } else if (split.position === 1 && split.array.length === 2) {  

                // placeholder is at last index in search string
                obj[key] = searchObject.lastPosition + split.position;
                obj.contentText?.push(...split.array);

            } else if (split.position === 1 && split.array.length === 3) {

                obj.contentText?.push(split.array[0], split.array[1]);
                obj[key] = searchObject.lastPosition + split.position;
                searchObject.nextSearchString = split.array[2];
                searchObject.lastPosition = searchObject.lastPosition + split.position + 1;
            }
        }
    }
};

const updateStatusContentText = (configReady: Type.ConfigInfoReadyType): void => {
    if (configReady.generalConfigInfo.statusTextEnabled) {
        Object.entries(statusContentText).forEach(([type, contentTextInfo]) => {
            const statusText: Type.StatusTextInfo = configReady.statusTextConfig;
            const regexObject: Type.RegexStatusContentTextUnion = regex.statusContentText[type];
            const bind: Type.BindContentTextStateType = bindContentTextState(type);
            statusContentText[type].contentText = [];

            const match = statusText[type].match(regex.ifStatusContentTextHasPlaceholder);
            if (match) {
                if (match > Object.keys(regexObject).length) {
                    configReady.configError.push('statusText.' + type);
                    // number of placeholders should not exceeds that it required.
                }

                let searchObject: Type.SearchObjectType | undefined = {
                    nextSearchString: statusText[type],
                    lastPosition: 0
                };

                match.forEach((search, index) => {
                    const regexKey = search.match(regex.statusTextKeysOnly);
                    if (Object.hasOwn(regexObject, regexKey[1])) {
                        searchPlaceholder(statusContentText[type], regexKey[1], regexObject[regexKey[1]], searchObject, index === match.length - 1, bind.statusOf);
                    } else {
                        configReady.configError.push('statusText.' + type);
                        // not a valid placeholder
                    }
                });
            } else {
                statusContentText[type].contentText.push(statusText[type]);
            }
            bind.contentTextState(statusContentText);
        });
    }
};

export {
    setStatusConfig,
    updateStatusContentText
};

