import * as Type from '../../type/type';
import * as regex from '../../util/regex.collection';
import * as __0x from '../../constant/shared/numeric';
import { CONFIG_SECTION, SELECTION_CONTENT_TEXT_LIST, SELECTION_CONTENT_TEXT_NUMLINK, SELECTION_DECORAITON_CONFIG, SELECTION_DECORATION_STYLE } from '../../constant/config/object';
import { workspaceProxyConfiguration } from '../shared/configuration';
import { bindStatusContentTextState, setSelectionTextbuffer, syncReference } from '../../editor/status/selection';
import { convertToDecorationRenderOption, leftMarginToMarginString, setContentTextOnDecorationRenderOption } from '../shared/decoration';
import { isEntriesEqual } from '../../util/util';

const convertPositionToDecorationRenderOption = (textPosition, SelectionDecorationStyle): void => {
    return textPosition.contentText.map((text, idx) => {
        const option = typeof text === 'string'
            ? SelectionDecorationStyle.placeholderDecorationOption
            : SelectionDecorationStyle.selectionDecorationOption[textPosition.position[idx]];
        const contentTextRenderOption = setContentTextOnDecorationRenderOption(option as Type.DecorationRenderOptionType, text);
        if (typeof text === 'symbol') {
            textPosition.position[idx] = contentTextRenderOption.after.contentText;
        }
        return contentTextRenderOption;
    }).filter(decorationOption => decorationOption !== undefined);
};

const buildSelectionTextDecorationRenderOption = (config: Type.SelectionDecorationConfigType, style: Type.SelectionDecorationStyleType) => {
    style.placeholderDecorationOption = convertToDecorationRenderOption(config, true);
    Object.keys(style.selectionDecorationOption).forEach((key, idx) => {
        const styleConfig: Type.DecorationTextStyleConfig = {
            color: config.selectionCountTextStyle[key],
            colorOpacity: config.selectionCountTextStyle.opacity,
            fontStyle: config.selectionCountTextStyle.fontStyle,
            fontWeight: config.selectionCountTextStyle.fontWeight,
        };
        style.selectionDecorationOption[key] = convertToDecorationRenderOption(styleConfig, true);
    });
};

const createSharedObjectSync = (textOftarget, textOfSource: any) => {
    const anchor = Object.entries(textOfSource.multiLineAnchorText.position);
    const cursor = Object.entries(textOfSource.multiLineCursorText.position);

    if (isEntriesEqual(anchor, cursor)) {
        anchor.forEach(([pos, placeholder], idx) => {
            const referenceObject = textOftarget[__0x.multiLineAnchorText].contentText[pos].after;
            syncReference(placeholder as string, referenceObject);
            textOftarget[__0x.multiLineCursorText].contentText[pos].after = referenceObject;
        });
    } else {

    }


    // Object.keys(textOfSource.multiCursor.position)
    // Object.keys(textOfSource.multiCursor.position)
    // if (Object.keys(textOfSource.multiCursor.position))
    // shallowEqual
    // console.log(textOfSource);
    // if (textOfSource.multiCursor.position)

};

const buildStatusTextState = (textOftarget, textOfSource: Type.StatusContentTextBufferType, SelectionDecorationStyle, leftMargin): void => {

    Object.entries(textOfSource).forEach(([key, textPosition], idx) => {
        const contentTextStyled = convertPositionToDecorationRenderOption(textPosition, SelectionDecorationStyle);;
        const hexKey = SELECTION_CONTENT_TEXT_NUMLINK[key];
        textOftarget[hexKey] = {
            contentText: contentTextStyled,
            position: Object.entries(textPosition.position)
        };
        if (leftMargin && leftMargin !== '0px' || leftMargin !== '0em') {
            if (textOftarget[hexKey].contentText[0]) {
                textOftarget[hexKey].contentText[0].after['margin'] = leftMarginToMarginString(leftMargin);
            }
        }
        setSelectionTextbuffer(hexKey, textOftarget[hexKey].contentText.length);
    });
    createSharedObjectSync(textOftarget, textOfSource);
};


const updateSelectionTextConfig = (extenionName: string, configuratioChange: boolean = false): boolean => {
    const SelectionDecorationConfig = { ...SELECTION_DECORAITON_CONFIG } as Type.SelectionDecorationConfigType;
    const SelectionDecorationStyle = { ...SELECTION_DECORATION_STYLE } as Type.SelectionDecorationStyleType;
    const bindTo: any = bindStatusContentTextState();
    const bindToBuffer: any = {
        functionOf: bindTo.functionOf,
        textOf: {}
    };
    // hm ...
    workspaceProxyConfiguration(SelectionDecorationConfig, extenionName + '.' + CONFIG_SECTION.selectionText, SELECTION_CONTENT_TEXT_LIST, bindToBuffer, regex.SelectionTextRegex);
    buildSelectionTextDecorationRenderOption(SelectionDecorationConfig, SelectionDecorationStyle);
    buildStatusTextState(bindTo.textOf, bindToBuffer.textOf, SelectionDecorationStyle, SelectionDecorationConfig.leftMargin);
    // sealSelctionText();
    delete bindTo.functionOf;
    delete bindTo.infoOf;
    delete bindTo.textOf;
    delete bindToBuffer.textOf;
    delete bindToBuffer.functionOf;
    return true;
};

export {
    updateSelectionTextConfig
};

