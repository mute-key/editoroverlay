import * as Type from '../../type/type';
import Regex from '../../util/regex.collection';
import { CONFIG_SECTION, SELECTION_CONTENT_TEXT_LIST, SELECTION_CONTENT_TEXT_NUMLINK, SELECTION_DECORAITON_CONFIG, SELECTION_DECORATION_STYLE } from '../../constant/config/object';
import { workspaceProxyConfiguration } from '../shared/configuration';
import { bindStatusContentTextState, clearSelectionText, sealSelctionText, setSelectionTextbuffer } from '../../editor/decoration/status/selection';
import { convertToDecorationRenderOption, leftMarginToMarginString, setContentTextOnDecorationRenderOption } from '../shared/decoration';

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

const buildStatusTextState = (textOftarget, textOfSource: Type.StatusContentTextBufferType,SelectionDecorationStyle,  leftMargin): void => {
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

const updateSelectionTextConfig = (configReady: Type.ConfigInfoReadyType, configuratioChange: boolean = false) => {

    const SelectionDecorationConfig = { ...SELECTION_DECORAITON_CONFIG } as Type.SelectionDecorationConfigType;
    const SelectionDecorationStyle = { ...SELECTION_DECORATION_STYLE } as Type.SelectionDecorationStyleType;
    
    const bindTo: any = bindStatusContentTextState();
    const bindToBuffer: any = {
        functionOf: bindTo.functionOf,
        textOf: {}
    };

    if (configuratioChange) {
        clearSelectionText();
    }
    // hm ...
    workspaceProxyConfiguration(SelectionDecorationConfig, configReady.name + '.' + CONFIG_SECTION.selectionText, SELECTION_CONTENT_TEXT_LIST, bindToBuffer, Regex.statusContentText);
    buildSelectionTextDecorationRenderOption(SelectionDecorationConfig, SelectionDecorationStyle);
    buildStatusTextState(bindTo.textOf, bindToBuffer.textOf, SelectionDecorationStyle, SelectionDecorationConfig.leftMargin);
    sealSelctionText();
    delete bindTo.functionOf;
    delete bindTo.infoOf;
    delete bindTo.textOf;
    delete bindToBuffer.textOf;
    delete bindToBuffer.functionOf;
};

export {
    updateSelectionTextConfig
};

