import * as Type from '../../type/type';
import Regex from '../../util/regex.collection';
import { CONFIG_SECTION, SELECTION_DECORAITON_CONFIG, SELECTION_DECORATION_STYLE, SELECTION_CONTENT_TEXT_LIST } from '../../constant/object';
import { bindStatusContentTextState } from '../../editor/decoration/status/selection';
import { workspaceProxyConfiguration } from '../load';
import { convertToDecorationRenderOption, leftMarginToMarginString, setContentTextOnDecorationRenderOption } from '../shared/decoration';

const SelectionDecorationConfig = { ...SELECTION_DECORAITON_CONFIG } as Type.SelectionDecorationConfigType;

const SelectionDecorationStyle = { ...SELECTION_DECORATION_STYLE } as Type.SelectionDecorationStyleType;

const convertPositionToDecorationRenderOption = (textPosition): void => {
    return textPosition.contentText.map((text, idx) => {
        const option = typeof text === 'string'
            ? SelectionDecorationStyle.placeholderDecorationOption
            : SelectionDecorationStyle.selectionDecorationOption[textPosition.position[idx]];

        const contentTextRenderOption = setContentTextOnDecorationRenderOption(option as Type.DecorationRenderOptionType, text);
        return contentTextRenderOption;
    }).filter(decorationOption => decorationOption !== undefined);
};

const buildStatusTextState = (textOftarget, textOfSource, leftMargin): void => {
    Object.entries(textOfSource).forEach(([key, textPosition], idx) => {
        textOftarget[key] = convertPositionToDecorationRenderOption(textPosition);
        if (leftMargin && leftMargin !== '0px' || leftMargin !== '0em') {
            console.log(leftMargin);
            textOftarget[key][0].after['margin'] = leftMarginToMarginString(leftMargin);
        }
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

const updateSelectionTextConfig = (configReady: Type.ConfigInfoReadyType) => {

    const bindTo = bindStatusContentTextState();
    const bindToBuffer = {
        functionOf: bindTo.functionOf,
        textOf: {}
    };

    // hm ...
    workspaceProxyConfiguration(
        SelectionDecorationConfig,
        configReady.name + '.' + CONFIG_SECTION.statusText,
        SELECTION_CONTENT_TEXT_LIST,
        bindToBuffer,
        Regex.statusContentText);

    buildSelectionTextDecorationRenderOption(SelectionDecorationConfig, SelectionDecorationStyle);
    buildStatusTextState(bindTo.textOf, bindToBuffer.textOf, SelectionDecorationConfig.leftMargin);
};

export {
    updateSelectionTextConfig
};

