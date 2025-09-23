import type * as D from '../../type/type';

import * as hex from '../../constant/numeric/hexadecimal';
import { CONFIG_SECTION, SELECTION_CONTENT_TEXT_LIST_CONFIG, SELECTION_CONTENT_TEXT_NUMLINK_CONFIG, SELECTION_DECORAITON_CONFIG, SELECTION_DECORATION_STYLE_CONFIG } from '../../constant/config/object';
import { workspaceProxyConfiguration } from '../shared/configuration';
import { bindStatusContentTextState, setMultiCursorTextPosition, setMultiCursorEditPosition, SelectionTextRegex, setSelectionTextbuffer, syncRefernceTable, setMultiCursorContentRef, setMultiCursorContext, setContextAccmulator } from '../../editor/selection/selection';
import { convertToDecorationRenderOption, leftMarginToMarginString, setContentTextOnDecorationRenderOption } from '../shared/decoration';
import { isEntriesEqual } from '../../util/util';

export {
    updateSelectionTextConfig
};

const convertPositionToDecorationRenderOption = (textPosition: any, SelectionDecorationStyle: any): void => {
    return textPosition.contentText.map((text: symbol | string, idx: number) => {
        const option = typeof text === 'string'
            ? SelectionDecorationStyle.placeholderDecorationOption
            : SelectionDecorationStyle.selectionDecorationOption[textPosition.position[idx]];
        const contentTextRenderOption = setContentTextOnDecorationRenderOption(option as any, text as string);
        // prefix, postfix refactored to hex from symbols
        if (Number(text) === hex.prefixHex || Number(text) === hex.postfixHex) { 
            textPosition.position[idx] = contentTextRenderOption.after.contentText;
        }
        return contentTextRenderOption;
    }).filter((decorationOption: any) => decorationOption !== undefined);
};

const buildSelectionTextDecorationRenderOption = (config: D.Status.Intf.SelectionDecorationConfig, style: D.Status.Intf.SelectionDecorationStyle) => {
    style.placeholderDecorationOption = convertToDecorationRenderOption(config, true) as any;
    Object.keys(style.selectionDecorationOption).forEach((key: string, idx) => {
        const styleConfig: D.Decoration.Intf.DecorationTextStyleConfig = {
            color: config.selectionCountTextStyle[key] as string,
            colorOpacity: config.selectionCountTextStyle.opacity,
            fontStyle: config.selectionCountTextStyle.fontStyle,
            fontWeight: config.selectionCountTextStyle.fontWeight,
        };
        style.selectionDecorationOption[key] = convertToDecorationRenderOption(styleConfig, true) as D.Decoration.Intf.RenderOption | undefined;
    });
};

const createSharedObjectSync = (textOftarget: any, textOfSource: any) => {

    const cursorOnly = Object.entries(textOfSource.cursorOnlyText.position);
    cursorOnly.forEach(([pos, placeholder]) => {
        const referenceObject = textOftarget[hex.cursorOnlyText].contentText[pos].after;
        syncRefernceTable(placeholder as string, hex.cursorOnly, referenceObject);
    });

    const singleLine = Object.entries(textOfSource.singleLineText.position);
    singleLine.forEach(([pos, placeholder]) => {
        const referenceObject = textOftarget[hex.singleLineText].contentText[pos].after;
        syncRefernceTable(placeholder as string, hex.singleLine, referenceObject);
    });

    const anchor = Object.entries(textOfSource.multiLineAnchorText.position);
    const cursor = Object.entries(textOfSource.multiLineCursorText.position);
    if (isEntriesEqual(anchor, cursor)) {
        anchor.forEach(([pos, placeholder], idx) => {
            const referenceObject = textOftarget[hex.multiLineAnchorText].contentText[pos].after;
            textOftarget[hex.multiLineCursorText].contentText[pos].after = referenceObject;
            syncRefernceTable(placeholder as string, hex.multiLine, referenceObject);
        });
    } else {
        // should error
    }

    const multiCursorText = Object.entries(textOfSource.multiCursorText.position);
    multiCursorText.forEach(([pos, placeholder]) => {
        const referenceObject = textOftarget[hex.multiCursorText].contentText[pos].after;
        syncRefernceTable(placeholder as string, hex.multiCursorText, referenceObject);
        setMultiCursorTextPosition(placeholder as string, parseInt(pos) as unknown as number);
    });

    const multiCursorEdit = Object.entries(textOfSource.multiCursorEdit.position);
    multiCursorEdit.forEach(([pos, placeholder]) => {
        const referenceObject = textOftarget[hex.multiCursorEdit].contentText[pos].after;
        syncRefernceTable(placeholder as string, hex.multiCursorEdit, referenceObject);
        setMultiCursorEditPosition(placeholder as string, parseInt(pos) as unknown as number);
    });

    setMultiCursorContentRef(),
        setMultiCursorContext();
    setContextAccmulator();
};

const buildStatusTextState = (textOftarget: any, textOfSource: D.Status.Intf.StatusContentTextBuffer, SelectionDecorationStyle: any, leftMargin: string): void => {

    Object.entries(textOfSource).forEach(([key, textPosition], idx) => {
        const contentTextStyled = convertPositionToDecorationRenderOption(textPosition, SelectionDecorationStyle);;
        const hexKey = SELECTION_CONTENT_TEXT_NUMLINK_CONFIG[key];
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

    const cursorOnlyText = textOftarget[hex.cursorOnlyText];
    const singleLineText = textOftarget[hex.singleLineText];
    const multiLineAnchorText = textOftarget[hex.multiLineAnchorText];
    const multiCursorText = textOftarget[hex.multiCursorText];
    const multiCursorEdit = textOftarget[hex.multiCursorEdit];

    [
        [hex.cursorOnlyText, cursorOnlyText.contentText.length, cursorOnlyText.position],
        [hex.singleLineText, singleLineText.contentText.length, singleLineText.position],
        [hex.multiLineText, multiLineAnchorText.contentText.length, multiLineAnchorText.position],
        [hex.multiCursorText, multiCursorText.contentText.length, multiCursorText.position],
        [hex.multiCursorEdit, multiCursorEdit.contentText.length, multiCursorEdit.position]
    ].forEach(([hexKey, length, placeholder]) => {
        setSelectionTextbuffer(hexKey, length, placeholder);
    });

    createSharedObjectSync(textOftarget, textOfSource);
};


const updateSelectionTextConfig = (extenionName: string, configuratioChange: boolean = false): boolean => {
    const SelectionDecorationConfig = { ...SELECTION_DECORAITON_CONFIG } as D.Status.Intf.SelectionDecorationConfig;
    const SelectionDecorationStyle = { ...SELECTION_DECORATION_STYLE_CONFIG } as D.Status.Intf.SelectionDecorationStyle;

    const bindTo: any = bindStatusContentTextState();

    const bindToBuffer: any = {
        functionOf: bindTo.functionOf,
        textOf: {}
    };

    // hm ...
    workspaceProxyConfiguration(SelectionDecorationConfig, extenionName + '.' + CONFIG_SECTION.selectionText, SELECTION_CONTENT_TEXT_LIST_CONFIG, bindToBuffer, SelectionTextRegex);
    buildSelectionTextDecorationRenderOption(SelectionDecorationConfig, SelectionDecorationStyle);
    buildStatusTextState(bindTo.textOf, bindToBuffer.textOf, SelectionDecorationStyle, SelectionDecorationConfig.leftMargin as string);

    delete bindTo.functionOf;
    delete bindTo.infoOf;
    delete bindTo.textOf;
    delete bindToBuffer.textOf;
    delete bindToBuffer.functionOf;
    return true;
};