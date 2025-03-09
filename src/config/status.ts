import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import {
    CONFIG_SECTION,
    NO_CONFIGURATION_STATUS_DEFAULT,
    STATUS_CONTENT_TEXT
} from '../constant/object';
import {
    getWorkspaceConfiguration,
    hexToRgbaStringLiteral,
    regex
} from '../util/util';
import {
    bindStatusContentTextState
} from '../editor/decoration/status';
import { 
    getConfigValue, 
    searchPlaceholder
} from './common';

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
        
const updateStatusContentText = (configReady: Type.ConfigInfoReadyType): void => {
    Object.entries(statusContentText).forEach(([type, contentTextInfo]) => {
        const statusText: Type.StatusTextInfo = configReady.statusTextConfig;
        const regexObject: Type.RegexStatusContentTextUnion = regex.statusContentText[type];
        const bind: Type.BindContentTextStateType = bindStatusContentTextState(type);
        statusContentText[type].contentText = [];

        const match = statusText[type].match(regex.ifContentTextHasPlaceholder);
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
                const regexKey = search.match(regex.contentTextKeysOnly);
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
};

const updateStatusTextConfig = (configReady: Type.ConfigInfoReadyType, statusConfigInfo: Type.StatusInfoType, decorationState: Type.DecorationStateType) => {
    
    if (decorationState.statusText) {
        disposeStatusInfo(decorationState);
    }

    const statusTextConfig = getWorkspaceConfiguration(configReady.name + '.' + CONFIG_SECTION.statusText);

    for (const key in configReady.statusTextConfig) {
        configReady.statusTextConfig[key] = getConfigValue(statusTextConfig, key as Type.StatusTextConfigNameOnlyType, NO_CONFIGURATION_STATUS_DEFAULT[key]);
    }

    setStatusConfig(configReady, statusConfigInfo);

    updateStatusContentText(configReady);

};

export {
    updateStatusTextConfig
};

