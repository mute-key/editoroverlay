import * as __0x from '../../constant/shared/numeric';
import { CONFIG_SECTION, SELECTION_CONTENT_TEXT_LIST, SELECTION_CONTENT_TEXT_NUMLINK, SELECTION_DECORAITON_CONFIG, SELECTION_DECORATION_STYLE } from '../../constant/config/object';
import { workspaceProxyConfiguration } from '../shared/configuration';
import { bindStatusContentTextState,  multiCursorTextPosition, multiCursorEditPosition, SelectionTextRegex, setSelectionTextbuffer, syncRefernceTable } from '../../editor/status/selection';
import { convertToDecorationRenderOption, leftMarginToMarginString, setContentTextOnDecorationRenderOption } from '../shared/decoration';
import { isEntriesEqual } from '../../util/util';

import type * as D from '../../type/type';

const convertPositionToDecorationRenderOption = (textPosition, SelectionDecorationStyle): void => {
    return textPosition.contentText.map((text, idx) => {
        const option = typeof text === 'string'
            ? SelectionDecorationStyle.placeholderDecorationOption
            : SelectionDecorationStyle.selectionDecorationOption[textPosition.position[idx]];
        const contentTextRenderOption = setContentTextOnDecorationRenderOption(option as any, text);
        if (typeof text === 'symbol') {
            textPosition.position[idx] = contentTextRenderOption.after.contentText;
        }
        return contentTextRenderOption;
    }).filter(decorationOption => decorationOption !== undefined);
};

const buildSelectionTextDecorationRenderOption = (config: D.Status.Intf.SelectionDecorationConfig, style: D.Status.Intf.SelectionDecorationStyle) => {
    style.placeholderDecorationOption = convertToDecorationRenderOption(config, true) as any;
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
        syncRefernceTable(placeholder as string, __0x.cursorOnly, referenceObject);
    });

    const singleLine = Object.entries(textOfSource.singleLineText.position);
    singleLine.forEach(([pos, placeholder]) => {
        const referenceObject = textOftarget[__0x.singleLineText].contentText[pos].after;
        syncRefernceTable(placeholder as string, __0x.singleLine, referenceObject);
    });

    const anchor = Object.entries(textOfSource.multiLineAnchorText.position);
    const cursor = Object.entries(textOfSource.multiLineCursorText.position);
    if (isEntriesEqual(anchor, cursor)) {
        anchor.forEach(([pos, placeholder], idx) => {
            const referenceObject = textOftarget[__0x.multiLineAnchorText].contentText[pos].after;
            textOftarget[__0x.multiLineCursorText].contentText[pos].after = referenceObject;
            syncRefernceTable(placeholder as string, __0x.multiLine, referenceObject);
        });
    } else {
        // should error
    }

    const multiCursorText = Object.entries(textOfSource.multiCursorText.position);
    multiCursorText.forEach(([pos, placeholder]) => {
        const referenceObject = textOftarget[__0x.multiCursorText].contentText[pos].after;
        syncRefernceTable(placeholder as string, __0x.multiCursorText, referenceObject);
        multiCursorTextPosition(placeholder as string, parseInt(pos) as unknown as number);
    });

    const multiCursorEdit = Object.entries(textOfSource.multiCursorEdit.position);
    multiCursorEdit.forEach(([pos, placeholder]) => {
        const referenceObject = textOftarget[__0x.multiCursorEdit].contentText[pos].after;
        syncRefernceTable(placeholder as string, __0x.multiCursorEdit, referenceObject);
        multiCursorEditPosition(placeholder as string, parseInt(pos) as unknown as number);
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
    const multiCursorEdit = textOftarget[__0x.multiCursorEdit];

    [
        [__0x.cursorOnlyText, cursorOnlyText.contentText.length, cursorOnlyText.position],
        [__0x.singleLineText, singleLineText.contentText.length, singleLineText.position],
        [__0x.multiLineText, multiLineAnchorText.contentText.length, multiLineAnchorText.position],
        [__0x.multiCursorText, multiCursorText.contentText.length, multiCursorText.position],
        [__0x.multiCursorEdit, multiCursorEdit.contentText.length, multiCursorEdit.position]
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
    workspaceProxyConfiguration(SelectionDecorationConfig, extenionName + '.' + CONFIG_SECTION.selectionText, SELECTION_CONTENT_TEXT_LIST, bindToBuffer, SelectionTextRegex);
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

