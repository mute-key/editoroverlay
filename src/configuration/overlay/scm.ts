import type * as D from '../../type/type';

import * as vscode from 'vscode';
import * as hex from '../../constant/numeric/hexadecimal';
import * as regex from '../../collection/regex';
import { CONFIG_SECTION, DECORATION_OPTION_AFTER_CONFIG, DECORATION_OPTION_CONFIG, SCM_CONFIG, SCM_CONTENT_TEXT_LIST_CONFIG, SCM_OVERLAY_DECORATION_LIST_CONFIG } from "../../constant/config/object";
import { workspaceProxyConfiguration } from "../shared/configuration";
import { hexToRgbaStringLiteral, objectSwapKeyValue } from '../../util/util';
import { bindScmState, clearScmTextState } from '../../editor/scm/scm';

export {
    updateScmTextConfig
};

declare namespace L {
    type RenderOptionBuffer = Record<D.Numeric.Key.Hex, D.Decoration.Intf.RenderInstanceOption>;
}

const regexNumericPlaceholder: Record<string, Record<string, number>> = {
    "branchNameContentText": {
        bname: 0,
    },
    "branchStatusWorkingContentText": {
        ccount: 0,
    }
};

const regexToReferenceLinker: Record<string, Record<string, RegExp>> = {
    "branchNameContentText": {
        bname: regex.branchName,
    },
    "branchStatusWorkingContentText": {
        ccount: regex.changeCount,
    }
};

const referenceKeyLink: string[][] = [
    ['branchName', 'branchNameContentText'],
    ['branchStatus', 'branchStatusWorkingContentText']
];

const buildPlaceholderReference = (reference: any, buffer: any) => {
    referenceKeyLink.forEach(([ref, section]) => {
        reference[ref] = {
            contentText: buffer[section].contentText,
            position: objectSwapKeyValue(buffer[section].position)
        };
    });
};

const renderOptionWrapper = (contentText: D.Decoration.Intf.RenderInstanceOption) => {
    return {
        renderOptions: contentText
    };
};

const buildTextFixture = (overlayTextFixture: any, configuration: any): void => {
    overlayTextFixture.active = configuration.activeText;
    overlayTextFixture.inactive = configuration.inactiveText;
    overlayTextFixture.ignored = configuration.ignoredText;
};

const buildRenderInstanceOption = (buffer: any, renderOption: any, getter: any): void => {
    console.log('buildRenderInstanceOption', buffer);
    Object.keys(buffer).forEach(hexKey => {
        const withRangeGetter = renderOptionWrapper(buffer[hexKey]);
        setGetterOfRenederOption(withRangeGetter, getter.rangeAndContentText.name, getter.rangeAndContentText.descriptor as PropertyDescriptor);
        renderOption[hexKey][0] = withRangeGetter;
    });
};

const setGetterProp = (target: object, getterName: string, getterDescriptor: PropertyDescriptor): void => {
    Object.defineProperty(target, getterName, getterDescriptor);
};

const setGetterOfRenederOption = (target: any, getterName: string, propertyDescriptor: PropertyDescriptor): void => {
    (getterName && propertyDescriptor) && setGetterProp(target, getterName, propertyDescriptor);
};

const attachGetterOfRenderOption = async (bufferObject: L.RenderOptionBuffer, getter: any) => {
    setGetterOfRenederOption(bufferObject[hex.scmIcon].after, getter.svgIcon.name, getter.svgIcon.descriptor as PropertyDescriptor);
    setGetterOfRenederOption(bufferObject[hex.scmBase].after, getter.activeOverlay.name, getter.activeOverlay.descriptor as PropertyDescriptor);
};

const setTextDecoration = (bufferObject: L.RenderOptionBuffer, hexKey: D.Numeric.Key.Hex, textDecoration: any) => {
    if (bufferObject[hexKey]) {
        bufferObject[hexKey].after.textDecoration = textDecoration;
    }
};

const setDeocrationRenderOption = (bufferObject: L.RenderOptionBuffer, hexKey: D.Numeric.Key.Hex, configuration: any): void => {
    bufferObject[hexKey] = { ...bufferObject[hexKey], ...DECORATION_OPTION_CONFIG };
    bufferObject[hexKey].after = { ...DECORATION_OPTION_AFTER_CONFIG };
    bufferObject[hexKey].isWholeLine = true;
    bufferObject[hexKey].rangeBehavior = vscode.DecorationRangeBehavior.ClosedOpen;

    console.log('setDeocrationRenderOption', configuration);
    if (Object.hasOwn(configuration, 'defaultText')) {
        bufferObject[hexKey].after.contentText = configuration.defaultText;
    }

    bufferObject[hexKey].after.color = hexToRgbaStringLiteral(configuration.color, configuration.colorOpacity, "#ffffff", 0.7);
    configuration.backgroundColor !== null && (bufferObject[hexKey].after.backgroundColor = hexToRgbaStringLiteral(configuration.backgroundColor, configuration.backgroundOpacity, "#ffffff", 0.7));
    bufferObject[hexKey].after.fontWeight = configuration.fontWeight;
    bufferObject[hexKey].after.fontStyle = configuration.fontStyle;
};

const buildOverlayBuffer = (bufferObject: L.RenderOptionBuffer, scmConfiguration: typeof SCM_CONFIG): void => {
    for (const [hexKey, configurationKey] of SCM_OVERLAY_DECORATION_LIST_CONFIG) {
        setDeocrationRenderOption(bufferObject, hexKey, scmConfiguration[configurationKey]);
        setTextDecoration(bufferObject, hexKey, scmConfiguration.additionalDecoration.TextOverlayDecoration);
    }
    setTextDecoration(bufferObject, hex.scmIcon, scmConfiguration.additionalDecoration.SVGIconDecoration);
};

const updateScmTextConfig = (extenionName: string, configuratioChange: boolean = false): boolean => {

    const scmConfiguration = SCM_CONFIG;
    const bindTo: any = bindScmState();
    const bufferObject = bindTo.renderOptionBuffer;
    const bindToBuffer: any = {
        functionOf: regexNumericPlaceholder,
        textOf: {}
    };

    if (configuratioChange) {
        clearScmTextState();
    }

    workspaceProxyConfiguration(scmConfiguration, extenionName + '.' + CONFIG_SECTION.scmText, SCM_CONTENT_TEXT_LIST_CONFIG, bindToBuffer, regexToReferenceLinker);
    buildOverlayBuffer(bufferObject, scmConfiguration);
    attachGetterOfRenderOption(bufferObject, bindTo.getterDescription);
    buildRenderInstanceOption(bufferObject, bindTo.renderOption, bindTo.getterDescription);
    buildTextFixture(bindTo.overlayTextFixture, scmConfiguration.textOverlayFixture);
    buildPlaceholderReference(bindTo.referenceObject, bindToBuffer.textOf);

    // break all forced pointer/references; possible memory issue.
    delete bindToBuffer.functionOf;
    delete bindToBuffer.textOf;
    delete bindTo.overlayTextFixture;
    delete bindTo.getterDescription;
    delete bindTo.renderOptionBuffer;
    delete bindTo.renderOption;
    delete bindTo.referenceObject;
    return true;
};