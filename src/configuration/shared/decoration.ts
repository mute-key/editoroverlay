import * as vscode from 'vscode';
import * as Type from '../../type/type';
import Regex from '../../util/regex.collection';
import { DECORATION_OPTION_AFTER_CONFIG, DECORATION_OPTION_CONFIG } from '../../constant/object';
import { sanitizeContentText } from './validation';
import { hexToRgbaStringLiteral, splitAndPosition } from '../../util/util';
import Error from '../../util/error';

const leftMarginToMarginString = (leftMargin: string | undefined) => `0 0 0 ${leftMargin}`;

const castToFuncSignature = (result: Type.RegexSplitType | undefined): Type.SplitFuncType | undefined => {
    if (result) {
        return {
            ...result,
            array: result.array.filter(entry => entry !== undefined) as (any | (Type.ContentTextFuncSignature))[],
        };
    }
};

const setContentTextOnDecorationRenderOption = (source: Type.DecorationRenderOptionType, contentText: string): Type.DecorationRenderOptionType => {
    const target = {... source as Type.DecorationRenderOptionType};
    target.after = {... source.after};
    target.after.contentText = contentText;
    return target;
};

const searchPlaceholderPosition = (textOf: Type.ContentTextWithPositionType, functionOf: Type.ContentTextFunc, functionKey: string, regex: RegExp, search: Type.SearchObjectType, lastIndex: boolean): void => {
    const split = castToFuncSignature(splitAndPosition(search.nextSearchString as string, regex));
    if (split) {
        if (Object.hasOwn(functionOf, functionKey)) {
            split.array[split.position] = functionOf[functionKey];
        }

        if (lastIndex) {
            textOf.contentText?.push(...split.array);
            textOf.position[search.lastPosition + split.position] = functionKey;
        } else {
            if (split.position === 0) {
                // placeholder is at index 0
                textOf.contentText?.push(split.array[0]);
                textOf.position[search.lastPosition + split.position] = functionKey;
                search.nextSearchString = split.array[1];
                search.lastPosition = search.lastPosition + split.position + 1;

            } else if (split.position === 1 && split.array.length === 2) {

                // placeholder is at last index in search string
                textOf.position[search.lastPosition + split.position] = functionKey;
                textOf.contentText?.push(...split.array);

            } else if (split.position === 1 && split.array.length === 3) {

                textOf.contentText?.push(split.array[0], split.array[1]);
                textOf.position[search.lastPosition + split.position] = functionKey;
                search.nextSearchString = split.array[2];
                search.lastPosition = search.lastPosition + split.position + 1;
            }
        }
    }
};

const parseContentText = (contentText: string, sectionKey: string, bindTo: any, regexObject, sectionName: string): void => {

    const match = contentText.match(Regex.ifContentTextHasPlaceholder);

    if (match !== null && Object.hasOwn(regexObject, sectionKey)) {
        if (match.length > Object.keys(regexObject[sectionKey]).length) {
            Error.register(sectionName + '.' +  sectionKey, "numbers of placeholder exceed availability");
        }

        let searchObject: Type.SearchObjectType | undefined = {
            nextSearchString: contentText,
            lastPosition: 0
        };

        bindTo.textOf[sectionKey].contentText = [];

        match.forEach((search, index) => {
            const regexKey = search.match(Regex.contentTextKeysOnly);
            if (regexKey) {
                if (Object.hasOwn(regexObject[sectionKey], regexKey[1] as string)) {
                    searchPlaceholderPosition(bindTo.textOf[sectionKey], bindTo.functionOf[sectionKey], regexKey[1], regexObject[sectionKey][regexKey[1]], searchObject, index === match.length - 1);
                } else {
                    Error.register(sectionName + '.' +  sectionKey, `Invalid placeholder '${regexKey[1]}' is set in user configration. Load default value instead for now. Please revise the value entered.`);
                }
            } 
        });
        bindTo.textOf[sectionKey].contentText = sanitizeContentText(bindTo.textOf[sectionKey].contentText);
    } else {
        bindTo.textOf[sectionKey].contentText = [contentText];
    }
};

const convertToDecorationRenderOption = (config: Type.DecorationTextStyleConfig | Type.DecorationTextPrePostFixStyleConfig, isWholeLine: boolean = true, contentText: string | undefined = undefined) => {

    const decorationOption = { ...DECORATION_OPTION_CONFIG } as Type.DecorationRenderOptionType;

    decorationOption.isWholeLine = isWholeLine;
    decorationOption.rangeBehavior = vscode.DecorationRangeBehavior.ClosedOpen;

    decorationOption.after = { ...DECORATION_OPTION_AFTER_CONFIG } as Type.DecorationRenderAfterOptionType;

    if (contentText) {
        decorationOption.after.contentText = contentText;
    }

    if (!config.color) {
        return;
    }

    decorationOption.after.color = hexToRgbaStringLiteral(config.color as string, config.colorOpacity, '#333333', 0.7);

    if (config.backgroundColor && config.backgroundColor !== 'null' && config.backgroundColor.length > 0) {
        decorationOption.after.backgroundColor = hexToRgbaStringLiteral(config.backgroundColor as string, config.backgroundOpacity, '#333333', 0.7);;
    } else {
        delete decorationOption.after.backgroundColor;
    }

    if (config.fontWeight !== 'normal') {
        decorationOption.after.fontWeight = config.fontWeight;
    } else {
        delete decorationOption.after.fontWeight;
    }

    if (config.fontStyle !== 'normal') {
        decorationOption.after.fontStyle = config.fontStyle;
    } else {
        delete decorationOption.after.fontStyle;
    }

    delete decorationOption.after.margin;
    delete decorationOption.after.textDecoration;

    return decorationOption;
};


export {    
    leftMarginToMarginString,
    castToFuncSignature,
    setContentTextOnDecorationRenderOption,
    searchPlaceholderPosition,
    parseContentText,
    convertToDecorationRenderOption,
};