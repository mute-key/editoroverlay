import * as regex from '../../collection/regex';
import * as __0x from '../../constant/shared/numeric';
import { CONFIG_SECTION, SELECTION_CONTENT_TEXT_LIST, SELECTION_CONTENT_TEXT_NUMLINK, SELECTION_DECORAITON_CONFIG, SELECTION_DECORATION_STYLE } from '../../constant/config/object';
import { workspaceProxyConfiguration } from '../shared/configuration';
import { bindStatusContentTextState, multiCursorPosition, setSelectionTextbuffer, syncrefernceTable } from '../../editor/status/selection';
import { convertToDecorationRenderOption, leftMarginToMarginString, setContentTextOnDecorationRenderOption } from '../shared/decoration';
import { isEntriesEqual } from '../../util/util';

import type * as D from '../../type/type';

const convertPositionToDecorationRenderOption = (textPosition, SelectionDecorationStyle): void => {
    return textPosition.contentText.map((text, idx) => {
        const option = typeof text === 'string'
            ? SelectionDecorationStyle.placeholderDecorationOption
            : SelectionDecorationStyle.selectionDecorationOption[textPosition.position[idx]];
        const contentTextRenderOption = setContentTextOnDecorationRenderOption(option as D.Decoration.Intf.RenderOption, text);
        if (typeof text === 'symbol') {
            textPosition.position[idx] = contentTextRenderOption.after.contentText;
        }
        return contentTextRenderOption;
    }).filter(decorationOption => decorationOption !== undefined);
};

const buildSelectionTextDecorationRenderOption = (config: D.Status.Intf.SelectionDecorationConfig, style: D.Status.Intf.SelectionDecorationStyle) => {
    style.placeholderDecorationOption = convertToDecorationRenderOption(config, true);
    Object.keys(style.selectionDecorationOption).forEach((key, idx) => {
        const styleConfig: D.Decoration.Intf.DecorationTextStyleConfig = {
            color: config.selectionCountTextStyle[key],
            colorOpacity: config.selectionCountTextStyle.opacity,
            fontStyle: config.selectionCountTextStyle.fontStyle,
            fontWeight: config.selectionCountTextStyle.fontWeight,
        };
        style.selectionDecorationOption[key] = convertToDecorationRenderOption(styleConfig, true);
    });
};

const createSharedObjectSync = (textOftarget, textOfSource: any) => {

    const cursorOnly = Object.entries(textOfSource.cursorOnlyText.position);
    cursorOnly.forEach(([pos, placeholder]) => {
        const referenceObject = textOftarget[__0x.cursorOnlyText].contentText[pos].after;
        syncrefernceTable(placeholder as string, __0x.cursorOnly, referenceObject);
    });

    const singleLine = Object.entries(textOfSource.singleLineText.position);
    singleLine.forEach(([pos, placeholder]) => {
        const referenceObject = textOftarget[__0x.singleLineText].contentText[pos].after;
        syncrefernceTable(placeholder as string, __0x.singleLine, referenceObject);
    });

    const anchor = Object.entries(textOfSource.multiLineAnchorText.position);
    const cursor = Object.entries(textOfSource.multiLineCursorText.position);
    if (isEntriesEqual(anchor, cursor)) {
        anchor.forEach(([pos, placeholder], idx) => {
            const referenceObject = textOftarget[__0x.multiLineAnchorText].contentText[pos].after;
            textOftarget[__0x.multiLineCursorText].contentText[pos].after = referenceObject;
            syncrefernceTable(placeholder as string, __0x.multiLine, referenceObject);
        });
    } else {
        // should error
    }

    const multiCursor = Object.entries(textOfSource.multiCursorText.position);
    multiCursor.forEach(([pos, placeholder]) => {
        const referenceObject = textOftarget[__0x.multiCursorText].contentText[pos].after;
        syncrefernceTable(placeholder as string, __0x.multiCursor, referenceObject);
        multiCursorPosition(placeholder as string, pos as unknown as number);
    });
};

const buildStatusTextState = (textOftarget, textOfSource: D.Status.Intf.StatusContentTextBuffer, SelectionDecorationStyle, leftMargin): void => {


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
    });

    const cursorOnlyText = textOftarget[__0x.cursorOnlyText];
    const singleLineText = textOftarget[__0x.singleLineText];
    const multiLineAnchorText = textOftarget[__0x.multiLineAnchorText];
    const multiCursorText = textOftarget[__0x.multiCursorText];

    [
        [__0x.cursorOnlyText, cursorOnlyText.contentText.length, cursorOnlyText.position],
        [__0x.singleLineText, singleLineText.contentText.length, singleLineText.position],
        [__0x.multiLineText, multiLineAnchorText.contentText.length, multiLineAnchorText.position],
        [__0x.multiCursorText, multiCursorText.contentText.length, multiCursorText.position]
    ].forEach(([hexKey, length, placeholder]) => {
        setSelectionTextbuffer(hexKey, length, placeholder);
    });

    createSharedObjectSync(textOftarget, textOfSource);
};


const updateSelectionTextConfig = (extenionName: string, configuratioChange: boolean = false): boolean => {
    const SelectionDecorationConfig = { ...SELECTION_DECORAITON_CONFIG } as D.Status.Intf.SelectionDecorationConfig;
    const SelectionDecorationStyle = { ...SELECTION_DECORATION_STYLE } as D.Status.Intf.SelectionDecorationStyle;

    const bindTo: any = bindStatusContentTextState();

    const bindToBuffer: any = {
        functionOf: bindTo.functionOf,
        textOf: {}
    };
    
    // hm ...
    workspaceProxyConfiguration(SelectionDecorationConfig, extenionName + '.' + CONFIG_SECTION.selectionText, SELECTION_CONTENT_TEXT_LIST, bindToBuffer, regex.SelectionTextRegex);
    buildSelectionTextDecorationRenderOption(SelectionDecorationConfig, SelectionDecorationStyle);
    buildStatusTextState(bindTo.textOf, bindToBuffer.textOf, SelectionDecorationStyle, SelectionDecorationConfig.leftMargin);

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

