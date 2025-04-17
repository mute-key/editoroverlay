import * as vscode from 'vscode';
import * as Type from '../../type/type';
import * as __0x from '../../constant/shared/numeric';
import * as __$ from '../../constant/shared/symbol';
import * as regex from '../../util/regex.collection';
import { CONFIG_SECTION, DECORATION_OPTION_LINKER, DIAGNOSTIC_ALL_PLACEHOLDER_LINKER, DIAGNOSTIC_CONFIG, DIAGNOSTIC_CONTENT_TEXT_LIST, DIAGNOSTIC_CONTENT_TEXT_NAME_TO_NUM, DIAGNOSTIC_DECORATION_STYLE, DIAGNOSTIC_DECORATION_TEXT_KIND, DIAGNOSTIC_EDITOR_PLACEHOLDER_LINKER, DIAGNOSTIC_STYLE_LIST, DIAGNOSTIC_WORKSPACE_PLACEHOLDER_LINKER } from '../../constant/config/object';
import { DIAGNOSTIC_BIOME, DIAGNOSTIC_TEXT_STYLE_KEY } from '../../constant/config/enum';
import { DIAGNOSTIC_PROBLEM_LIST } from '../../constant/shared/object';
import { workspaceProxyConfiguration } from '../shared/configuration';
import { sanitizeConfigValue } from '../shared/validation';
import { convertToDecorationRenderOption, setContentTextOnDecorationRenderOption } from '../shared/decoration';
import { bindDiagnosticContentTextState, initializeStateBuffer, reloadContentText, setDiagonosticTextbuffer } from '../../editor/status/diagnostic';
import { hexToRgbaStringLiteral, readBits } from '../../util/util';
import { createCursorRange, createCursorRangeNextLine, createCursorRangePreviousLine } from '../../editor/range'; import { setOverrideDigit } from '../../diagnostic/diagnostic';

const positionKeyList = ['pre', 'post'] as const;

const positionKeyToPlaceholderName = { pre: 'prefix', post: 'postfix', } as const;

const applyExtraStyle = (textOf: Record<number, Type.DecorationRenderOptionType[]>, extraStyle, leftMargin: string | undefined): void => {
    let backgroundColor;
    const sidePadding = extraStyle.sidePadding !== 'null' ? extraStyle.sidePadding : null;
    const topDownPadding = extraStyle.topDownPadding !== 'null' ? extraStyle.topDownPadding : null;
    const marginLeftStr = `;margin-left:${leftMargin}`;


    for (const contentText of Object.values(textOf)) {

        if (extraStyle.borderRadius) {
            contentText[0].after['textDecoration'] = `;border-top-left-radius:${extraStyle.borderRadius};border-bottom-left-radius:${extraStyle.borderRadius};padding-left:${sidePadding}`;
            contentText[contentText.length - 1].after['textDecoration'] = `;border-top-right-radius:${extraStyle.borderRadius};border-bottom-right-radius:${extraStyle.borderRadius};padding-right:${sidePadding}`;
        }

        if (leftMargin !== '0px' && leftMargin !== '0em' && leftMargin) {
            contentText[0].after['textDecoration'] += `;margin-left:${leftMargin}`;
        }
    }

    if (extraStyle.backgroundColor !== 'null') {
        backgroundColor = hexToRgbaStringLiteral(extraStyle.backgroundColor, extraStyle.backgroundOpacity, "#333333", 0.7);
        Object.entries(textOf).forEach(([hexKey, contentText]: [string, any]) => {
            contentText.forEach((text, idx) => {
                textOf[hexKey][idx].after['backgroundColor'] = backgroundColor;
                if (idx !== 0) {
                    textOf[hexKey][idx].after['textDecoration'] = textOf[hexKey][idx].after['textDecoration']?.replace(marginLeftStr, '');
                }
                if (topDownPadding) {
                    textOf[hexKey][idx].after['textDecoration'] += `;padding-top:${topDownPadding};padding-bottom:${topDownPadding}`;
                }
            });
        });
    }
};

const convertPositionDecorationRenderOption = ({ textPosition, primaryStyle, secondaryStyle, notation, leftMargin }) => {
    return textPosition.contentText.map((text, idx) => {
        const key = textPosition.position[idx];
        let decorationStyle = primaryStyle;
        if (positionKeyList.includes(key)) {
            if (!Object.hasOwn(notation, positionKeyToPlaceholderName[key])) {
                return;
            }
            decorationStyle = secondaryStyle;
        }
        return setContentTextOnDecorationRenderOption(decorationStyle, text);
    }).filter(decorationOption => decorationOption !== undefined);
};

const buildDiagnosticTextPreset = (preset, textOftarget, textOfSource, style: Type.DiagonosticDecorationStyle, leftMargin: string = '') => {
    const convertPositionWrapper = (context, target, propertyName, contentTextHeyKey) => {
        if (Object.hasOwn(target[propertyName], contentTextHeyKey)) {
            if (target[propertyName][contentTextHeyKey].notation) {
                context.notation = target[propertyName][contentTextHeyKey].notation;
            }
            const contentTextList = convertPositionDecorationRenderOption(context);
            target[propertyName][contentTextHeyKey].contentText = contentTextList;
        }
    };

    Object.entries(textOfSource).forEach(([contentTextName, textPosition]) => {
        const linker = DECORATION_OPTION_LINKER[contentTextName];
        const context = {
            textPosition: textPosition,
            primaryStyle: style.diagonosticDecorationOption[linker[0]],
            secondaryStyle: linker[1] ? style.diagonosticDecorationOption[linker[1]] : null,
            notation: [],
            leftMargin: leftMargin
        };
        ['workspace', 'editor', 'all', 'layout'].forEach(biome => {
            convertPositionWrapper(context, preset, biome, DIAGNOSTIC_CONTENT_TEXT_NAME_TO_NUM[contentTextName]);
        });
    });

    const concatinateNotation = (text) => {
        return text.contentText.map(decoration => {
            if (decoration.after.contentText === __$.prefixSymbol) {
                decoration.after.contentText = text.notation.prefix ? text.notation.prefix : undefined;
            }
            if (decoration.after.contentText === __$.postfixSymbol) {
                decoration.after.contentText = text.notation.postfix ? text.notation.postfix : undefined;
            }
            return decoration;
        }).filter(decoration => decoration.after.contentText !== undefined);
    };
    
    preset.layout[__0x.allOkPlaceholderContentText].contentText.forEach(decoration => {
        if (decoration.after.contentText === __0x.allOkHexKey) {
            const ok = concatinateNotation(preset.all[__0x.allOkContentText]);
            setDiagonosticTextbuffer(__0x.allOkOverride, ok.map(decoration => vscode.window.createTextEditorDecorationType(decoration)));
            textOftarget[__0x.allOkOverride].push(...ok);
        } else {
            setDiagonosticTextbuffer(__0x.allOkOverride, [vscode.window.createTextEditorDecorationType(decoration)]);
            textOftarget[__0x.allOkOverride].push({ ...decoration });
        }
    });

    preset.layout[__0x.problemPlaceholderContentText].contentText.forEach(decoration => {
        if (decoration.after.contentText === __0x.editorHexKey) {
            const ok = concatinateNotation(preset.editor[__0x.okEditorContentText]);
            const warn = concatinateNotation(preset.editor[__0x.warningEditorContentText]);
            const err = concatinateNotation(preset.editor[__0x.errorEditorContentText]);
            textOftarget[__0x.allOkNoOverride].push(...ok);
            textOftarget[__0x.editorOkWorkspaceWarn].push(...ok);
            textOftarget[__0x.editorOkWorkspaceErr].push(...ok);
            textOftarget[__0x.editorOkWorkspaceWarnErr].push(...ok);
            textOftarget[__0x.editorWarnWorkspaceWarn].push(...warn);
            textOftarget[__0x.editorWarnWorkspaceErr].push(...warn);
            textOftarget[__0x.editorWarnWorkspaceWarnErr].push(...warn);
            textOftarget[__0x.editorErrWorkspaceErr].push(...err);
            textOftarget[__0x.editorErrWorkspaceWarnErr].push(...err);
            textOftarget[__0x.editorWarnErrWorkspaceWarnErr].push(...warn, ...err);
            const okDecoration = ok.map(decoration => vscode.window.createTextEditorDecorationType(decoration));
            const warnDecoration = warn.map(decoration => vscode.window.createTextEditorDecorationType(decoration));
            const errDecoration = err.map(decoration => vscode.window.createTextEditorDecorationType(decoration));
            setDiagonosticTextbuffer(__0x.allOkNoOverride, okDecoration);
            setDiagonosticTextbuffer(__0x.editorOkWorkspaceWarn, okDecoration);
            setDiagonosticTextbuffer(__0x.editorOkWorkspaceErr, okDecoration);
            setDiagonosticTextbuffer(__0x.editorOkWorkspaceWarnErr, okDecoration);
            setDiagonosticTextbuffer(__0x.editorWarnWorkspaceWarn, warnDecoration);
            setDiagonosticTextbuffer(__0x.editorWarnWorkspaceErr, warnDecoration);
            setDiagonosticTextbuffer(__0x.editorWarnWorkspaceWarnErr, warnDecoration);
            setDiagonosticTextbuffer(__0x.editorErrWorkspaceErr, errDecoration);
            setDiagonosticTextbuffer(__0x.editorErrWorkspaceWarnErr, errDecoration);
            setDiagonosticTextbuffer(__0x.editorWarnErrWorkspaceWarnErr, [...warnDecoration, ...errDecoration]);
            return;
        }
        if (decoration.after.contentText === __0x.workspaceHexKey) {
            const ok = concatinateNotation(preset.workspace[__0x.okWorkspaceContentText]);
            const warn = concatinateNotation(preset.workspace[__0x.warningWorkspaceContentText]);
            const err = concatinateNotation(preset.workspace[__0x.errorWorkspaceContentText]);
            textOftarget[__0x.allOkNoOverride].push(...ok);
            textOftarget[__0x.editorOkWorkspaceWarn].push(...warn);
            textOftarget[__0x.editorOkWorkspaceErr].push(...err);
            textOftarget[__0x.editorOkWorkspaceWarnErr].push(...warn, ...err);
            textOftarget[__0x.editorWarnWorkspaceWarn].push(...warn);
            textOftarget[__0x.editorWarnWorkspaceErr].push(...err);
            textOftarget[__0x.editorWarnWorkspaceWarnErr].push(...warn, ...err);
            textOftarget[__0x.editorErrWorkspaceErr].push(...err);
            textOftarget[__0x.editorErrWorkspaceWarnErr].push(...warn, ...err);
            textOftarget[__0x.editorWarnErrWorkspaceWarnErr].push(...warn, ...err);
            const okDecoration = ok.map(decoration => vscode.window.createTextEditorDecorationType(decoration));
            const warnDecoration = warn.map(decoration => vscode.window.createTextEditorDecorationType(decoration));
            const errDecoration = err.map(decoration => vscode.window.createTextEditorDecorationType(decoration));
            setDiagonosticTextbuffer(__0x.allOkNoOverride, okDecoration);
            setDiagonosticTextbuffer(__0x.editorOkWorkspaceWarn, warnDecoration);
            setDiagonosticTextbuffer(__0x.editorOkWorkspaceErr, errDecoration);
            setDiagonosticTextbuffer(__0x.editorOkWorkspaceWarnErr, [...warnDecoration, ...errDecoration]);
            setDiagonosticTextbuffer(__0x.editorWarnWorkspaceWarn, warnDecoration);
            setDiagonosticTextbuffer(__0x.editorWarnWorkspaceErr, errDecoration);
            setDiagonosticTextbuffer(__0x.editorWarnWorkspaceWarnErr, [...warnDecoration, ...errDecoration]);
            setDiagonosticTextbuffer(__0x.editorErrWorkspaceErr, errDecoration);
            setDiagonosticTextbuffer(__0x.editorErrWorkspaceWarnErr, [...warnDecoration, ...errDecoration]);
            setDiagonosticTextbuffer(__0x.editorWarnErrWorkspaceWarnErr, [...warnDecoration, ...errDecoration]);
            return;
        }
        const decorationType = vscode.window.createTextEditorDecorationType(decoration);
        DIAGNOSTIC_PROBLEM_LIST.forEach(hexKey => {
            textOftarget[hexKey].push({ ...decoration });
            setDiagonosticTextbuffer(hexKey, [decorationType]);
        });
    });
};

const ifNoationNotNull = (property: string, str: string) => {
    if (str !== 'null' && str.length > 0 && !regex.ifStringIsResourceScope.test(str)) {
        return {
            [property]: str,
        };
    }
    return {};
};

const createNotation = (biome: symbol, prefix: string, postfix: string) => {
    return {
        [biome]: {
            ...DIAGNOSTIC_DECORATION_TEXT_KIND,
            notation: {
                ...ifNoationNotNull('prefix', prefix),
                ...ifNoationNotNull('postfix', postfix),

            },
        }
    };
};

const ifNoation = (config, key: string, biome: string, linker: any) => {
    const prefix = biome + "Prefix";
    const postfix = biome + "Postfix";
    if (config[key][prefix] !== undefined && config[key][postfix] !== undefined) {
        return createNotation(linker[key], config[key][prefix], config[key][postfix]);
    }
};

const overrideStyle = (config, overrideBiome) => {
    const allOkOverrideColor = {};
    const problemOverrideColor = {};
    const overrideStyleDescription = {
        [DIAGNOSTIC_BIOME.OK]: {
            styleName: DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE,
            target: [problemOverrideColor, allOkOverrideColor],
        },
        [DIAGNOSTIC_BIOME.WARN]: {
            styleName: DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE,
            target: [problemOverrideColor],
        },
        [DIAGNOSTIC_BIOME.ERR]: {
            styleName: DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE,
            target: [problemOverrideColor],
        }
    };
    Object.entries(overrideStyleDescription).forEach(([biome, override]) => {
        if (overrideBiome & Number(biome) && config[override.styleName]) {
            override.target.forEach(color => {
                color[biome] = {
                    color: hexToRgbaStringLiteral(config[override.styleName].color as string, config[override.styleName].colorOpacity, '#333333', 0.7),
                };
            });
        }
    });
    return {
        [__0x.problemPlaceholderContentText]: {
            override: Object.keys(problemOverrideColor).length > 0 ? problemOverrideColor : undefined,

        },
        [__0x.allOkPlaceholderContentText]: {
            override: Object.keys(allOkOverrideColor).length > 0 ? allOkOverrideColor : undefined,
        },
    };
};

const buildDiagnosticStyle = (config: Type.DiagnosticConfigType, style: Type.DiagonosticDecorationStyle, diagnosticStyleList: string[], visibility: Type.DiagnosticVisibilityType, diagnosticBiome) => {
    const result = {
        workspace: {},
        editor: {},
        all: {},
        layout: {
            [__0x.problemPlaceholderContentText]: {},
            [__0x.allOkPlaceholderContentText]: {}
        },
    };
    if (config.leftMargin) {
        style.leftMargin = config.leftMargin;
    }
    diagnosticStyleList.forEach(styleName => {
        const styleConfig: Type.DecorationTextStyleConfig = {   // this is due to syle config values are in proxy object.
            color: sanitizeConfigValue(config[styleName].color),
            colorOpacity: config[styleName].colorOpacity,
            backgroundColor: sanitizeConfigValue(config[styleName].backgroundColor),
            backgroundOpacity: config[styleName].backgroundOpacity,
            fontStyle: sanitizeConfigValue(config[styleName].fontStyle),
            fontWeight: sanitizeConfigValue(config[styleName].fontWeight),
        };
        style.diagonosticDecorationOption[styleName] = convertToDecorationRenderOption(styleConfig, true);
        result.workspace = {
            ...result.workspace,
            ...ifNoation(config, styleName, "workspace", DIAGNOSTIC_WORKSPACE_PLACEHOLDER_LINKER)
        };
        result.editor = {
            ...result.editor,
            ...ifNoation(config, styleName, "editor", DIAGNOSTIC_EDITOR_PLACEHOLDER_LINKER)
        };
        result.all = {
            ...result.all,
            ...ifNoation(config, styleName, "all", DIAGNOSTIC_ALL_PLACEHOLDER_LINKER)
        };
    });
    const overrideBiome = diagnosticBiome.workspace | diagnosticBiome.editor;
    const ifOverrride = visibility.overrideLayoutPlaceholderColorToHighestSeverity ? overrideStyle(config, overrideBiome) : undefined;
    return {
        ...result,
        layout: {
            [__0x.problemPlaceholderContentText]: {},
            [__0x.allOkPlaceholderContentText]: {},
            ...ifOverrride,

        }
    };
};

const hideMkask = (hideOk: boolean = false, hideWarning: boolean = false): number => {
    let mask = DIAGNOSTIC_BIOME.ALL;
    mask ^= hideOk ? DIAGNOSTIC_BIOME.OK : 0;
    mask ^= hideWarning ? DIAGNOSTIC_BIOME.WARN : 0;
    return mask;
};

type DiagnosticBiomeType = {
    workspace: number,
    editor: number,
}

const diagnosticVisibilityBiome = (visibility: Type.DiagnosticVisibilityType): DiagnosticBiomeType => {
    let workspacMask: number = DIAGNOSTIC_BIOME.ALL;
    let editorMask: number = DIAGNOSTIC_BIOME.ALL;
    if (visibility.DiagnosticKind === "workspace Only") {
        editorMask = DIAGNOSTIC_BIOME.NONE;
        workspacMask &= hideMkask(visibility.hideOk, visibility.hideWarning);
    }
    if (visibility.DiagnosticKind === "editor Only") {
        workspacMask = DIAGNOSTIC_BIOME.NONE;
        editorMask &= hideMkask(visibility.hideOk, visibility.hideWarning);
    }
    return {
        workspace: workspacMask,
        editor: editorMask
    };
};

const reversedStyleList = (() => {
    const styleList = [...DIAGNOSTIC_STYLE_LIST];
    styleList.reverse().push(["0", "0"]);
    return styleList;
})();

const decorationStyleFromBiome = (diagnosticBiome: number): string[] =>
    [...readBits(diagnosticBiome, reversedStyleList, 0, 4)
        .filter(styles => styles !== 0)
        .flat(),
    DIAGNOSTIC_TEXT_STYLE_KEY.DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE];

const clearOverrideState = (stateOf) => {
    const textOf = stateOf.textOf as any;
    for (const placeholder in textOf.layout) {
        if (placeholder['override']) {
            delete placeholder['override'];
        }
    }
};

const setGlyph = (glyphList, config) => {
    glyphList[__0x.openningBracket] = config.openningBracket;
    glyphList[__0x.closingBracket] = config.closingBracket;
    glyphList[__0x.lineEqual] = config.lineEqual;
    glyphList[__0x.lineUp] = config.lineUp;
    glyphList[__0x.lineDown] = config.lineDown;
};

const setCursorLine = (bindTo, visibility) => {
    if (visibility.placeTextOnPreviousOrNextLine === "previousLine") {
        bindTo.rangeFunction = createCursorRangePreviousLine;
        return;
    }
    if (visibility.placeTextOnPreviousOrNextLine === "nextLine") {
        bindTo.rangeFunction = createCursorRangeNextLine;
        return;
    }
    bindTo.rangeFunction = createCursorRange;
    return;
};

const updateDiagnosticTextConfig = (extenionName: string, configuratioChange: boolean = false): boolean => {
    const diagnosticConfig = { ...DIAGNOSTIC_CONFIG } as typeof DIAGNOSTIC_CONFIG;
    const diagnosticDecorationStyle = { ...DIAGNOSTIC_DECORATION_STYLE } as unknown as Type.DiagonosticDecorationStyle;
    const dignosticContentTextPreset = {
        layout: {},
        editor: {},
        workspace: {},
        all: {}
    };
    const bindTo: any = bindDiagnosticContentTextState();
    let bindToBuffer: any = {
        functionOf: bindTo.functionOf,
        textOf: {}
    };
    if (configuratioChange) {
        clearOverrideState(bindTo);
        reloadContentText();
    }
    workspaceProxyConfiguration(diagnosticConfig, extenionName + '.' + CONFIG_SECTION.diagnosticText, DIAGNOSTIC_CONTENT_TEXT_LIST, bindToBuffer, regex.diagnosticTextRegex);
    const placeholderDigit = diagnosticConfig.visibility.overrideAllOk ? __0x.allOkOverride : __0x.allOkNoOverride;
    const diagnosticBiome = diagnosticVisibilityBiome(diagnosticConfig.visibility);
    const decorationStyleList = decorationStyleFromBiome(diagnosticBiome.workspace | diagnosticBiome.editor);
    Object.assign(dignosticContentTextPreset, buildDiagnosticStyle(diagnosticConfig, diagnosticDecorationStyle, decorationStyleList, diagnosticConfig.visibility, diagnosticBiome));
    Object.assign(bindTo.configOf, diagnosticConfig.visibility);
    buildDiagnosticTextPreset(dignosticContentTextPreset, bindTo.textOf.contentText, bindToBuffer.textOf, diagnosticDecorationStyle, diagnosticConfig.leftMargin);
    applyExtraStyle(bindTo.textOf.contentText, diagnosticConfig.diagnosticPlaceholderTextStyle, diagnosticConfig.leftMargin);
    setGlyph(bindTo.textOf.glyphList, diagnosticConfig.glyphList);
    setCursorLine(bindTo.functionOf, diagnosticConfig.visibility);
    setOverrideDigit(placeholderDigit);
    initializeStateBuffer(placeholderDigit);
    delete bindToBuffer.textof;
    delete bindToBuffer.functionOf;
    delete bindTo.visibilityOf;
    delete bindTo.functionOf;
    delete bindTo.textOf.contentText;
    delete bindTo.textOf.glyphList;
    delete bindTo.textof;
    delete bindTo.configOf;
    return true;
};

export {
    updateDiagnosticTextConfig
};