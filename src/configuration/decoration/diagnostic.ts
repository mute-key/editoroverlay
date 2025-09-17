import type * as D from '../../type/type';

import * as hex from '../../numeric/hex';
import * as bin from '../../numeric/bin';
import * as __$ from '../../constant/shared/symbol';
import * as regex from '../../collection/regex';
import { CONFIG_SECTION, DECORATION_OPTION_LINKER, DIAGNOSTIC_ALL_PLACEHOLDER_LINKER, DIAGNOSTIC_CONFIG, DIAGNOSTIC_CONTENT_TEXT_LIST, DIAGNOSTIC_CONTENT_TEXT_NAME_TO_NUM, DIAGNOSTIC_DECORATION_STYLE, DIAGNOSTIC_DECORATION_TEXT_KIND, DIAGNOSTIC_EDITOR_PLACEHOLDER_LINKER, DIAGNOSTIC_STYLE_LIST, DIAGNOSTIC_WORKSPACE_PLACEHOLDER_LINKER } from '../../constant/config/object';
import { DIAGNOSTIC_BIOME, DIAGNOSTIC_KIND, DIAGNOSTIC_TEXT_STYLE_KEY, LINE_POSITION } from '../../constant/config/enum';
import { DIAGNOSTIC_PROBLEM_LIST } from '../../constant/shared/object';
import { convertToDecorationRenderOption, setContentTextOnDecorationRenderOption } from '../shared/decoration';
import { workspaceProxyConfiguration } from '../shared/configuration';
import { sanitizeConfigValue } from '../shared/validation';
import { createCursorRange, createCursorRangeLastLine, createCursorRangeLine, createCursorRangeLineAuto, createCursorRangeLineLastAuto, setAutoInlineDatumPoint } from '../../editor/range';
import { bindDiagnosticContentTextState, clearDiagnosticTextState, composeRenderOption, diagnosticTextRegex, initializeStateBuffer, setDiagonosticTextbuffer } from '../../editor/status/diagnostic';
import { setOverrideDigit } from '../../diagnostic/diagnostic';
import { hexToRgbaStringLiteral, readBits } from '../../util/util';

export {
    updateDiagnosticTextConfig
};

const positionKeyList = ['pre', 'post'] as const;

const positionKeyToPlaceholderName = { pre: 'prefix', post: 'postfix', } as const;

const applyExtraStyle = (textOf: Record<number, any>, extraStyle, leftMargin: string | undefined): void => {
    const sidePadding = extraStyle.sidePadding !== 'null' ? extraStyle.sidePadding : null;
    const topDownPadding = extraStyle.topDownPadding !== 'null' ? extraStyle.topDownPadding : null;
    Object.entries(textOf).forEach(([hexKey, option]: [string, any]) => {
        option.map(optonList => optonList.filter(ro => ro.length > 0)).forEach((text, idx, array) => {
            if (extraStyle.backgroundColor && extraStyle.backgroundOpacity) {
                textOf[hexKey][idx][0].renderOptions.after['backgroundColor'] = hexToRgbaStringLiteral(extraStyle.backgroundColor, extraStyle.backgroundOpacity, "#333333", 0.7);;
            }

            if (extraStyle.borderRadius) {
                if (idx === 0) {
                    textOf[hexKey][0][0].renderOptions.after['textDecoration'] = `;border-top-left-radius:${extraStyle.borderRadius};border-bottom-left-radius:${extraStyle.borderRadius};padding-left:${sidePadding}`;
                }

                if (idx === array.length - 1) {
                    textOf[hexKey][idx][0].renderOptions.after['textDecoration'] = `;border-top-right-radius:${extraStyle.borderRadius};border-bottom-right-radius:${extraStyle.borderRadius};padding-right:${sidePadding}`;
                }
            }

            if (topDownPadding) {
                textOf[hexKey][idx][0].renderOptions.after['textDecoration'] += `;padding-top:${topDownPadding};padding-bottom:${topDownPadding}`;
            }

            if (leftMargin !== '0px' && leftMargin !== '0em' && leftMargin && idx === 0) {
                textOf[hexKey][0][0].renderOptions.after['textDecoration'] += `;margin-left:${leftMargin}`;
            }
        });
    });
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

const buildDiagnosticTextPreset = (preset, textOftarget, textOfSource, style: D.Diagnostic.Intf.DiagonosticDecorationStyle, leftMargin: string = '') => {
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
            primaryStyle: style.diagnosticDecorationOption[linker[0]],
            secondaryStyle: linker[1] ? style.diagnosticDecorationOption[linker[1]] : null,
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


    preset.layout[hex.allOkPlaceholderContentText].contentText.forEach(decoration => {
        if (decoration.after.contentText === hex.allOkHexKey) {
            const ok = concatinateNotation(preset.all[hex.allOkContentText]);
            composeRenderOption(bin.allOkOverride, [...ok]);
        } else {
            composeRenderOption(bin.allOkOverride, [{ ...decoration }]);
        }
    });

    preset.layout[hex.problemPlaceholderContentText].contentText.forEach(decoration => {
        if (decoration.after.contentText === hex.editorHexKey) {
            const ok = concatinateNotation(preset.editor[hex.okEditorContentText]);
            const warn = concatinateNotation(preset.editor[hex.warningEditorContentText]);
            const err = concatinateNotation(preset.editor[hex.errorEditorContentText]);
            composeRenderOption(bin.allOkNoOverride, [...ok]);
            composeRenderOption(bin.editorOkWorkspaceWarn, [...ok]);
            composeRenderOption(bin.editorOkWorkspaceErr, [...ok]);
            composeRenderOption(bin.editorOkWorkspaceWarnErr, [...ok]);
            composeRenderOption(bin.editorWarnWorkspaceWarn, [...warn]);
            composeRenderOption(bin.editorWarnWorkspaceErr, [...warn]);
            composeRenderOption(bin.editorWarnWorkspaceWarnErr, [...warn]);
            composeRenderOption(bin.editorErrWorkspaceErr, [...err]);
            composeRenderOption(bin.editorErrWorkspaceWarnErr, [...err]);
            composeRenderOption(bin.editorWarnErrWorkspaceWarnErr, [...warn, ...err]);
            return;
        }
        if (decoration.after.contentText === hex.workspaceHexKey) {
            const ok = concatinateNotation(preset.workspace[hex.okWorkspaceContentText]);
            const warn = concatinateNotation(preset.workspace[hex.warningWorkspaceContentText]);
            const err = concatinateNotation(preset.workspace[hex.errorWorkspaceContentText]);
            composeRenderOption(bin.allOkNoOverride, [...ok]);
            composeRenderOption(bin.editorOkWorkspaceWarn, [...warn]);
            composeRenderOption(bin.editorOkWorkspaceErr, [...err]);
            composeRenderOption(bin.editorOkWorkspaceWarnErr, [...warn, ...err]);
            composeRenderOption(bin.editorWarnWorkspaceWarn, [...warn]);
            composeRenderOption(bin.editorWarnWorkspaceErr, [...err]);
            composeRenderOption(bin.editorWarnWorkspaceWarnErr, [...warn, ...err]);
            composeRenderOption(bin.editorErrWorkspaceErr, [...err]);
            composeRenderOption(bin.editorErrWorkspaceWarnErr, [...warn, ...err]);
            composeRenderOption(bin.editorWarnErrWorkspaceWarnErr, [...warn, ...err]);
            return;
        }

        DIAGNOSTIC_PROBLEM_LIST.forEach(hexKey => {
            composeRenderOption(hexKey, [{ ...decoration }]);
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
        [hex.problemPlaceholderContentText]: {
            override: Object.keys(problemOverrideColor).length > 0 ? problemOverrideColor : undefined,

        },
        [hex.allOkPlaceholderContentText]: {
            override: Object.keys(allOkOverrideColor).length > 0 ? allOkOverrideColor : undefined,
        },
    };
};

const buildDiagnosticStyle = (config: D.Diagnostic.Intf.DiagnosticConfig, style: D.Diagnostic.Intf.DiagonosticDecorationStyle, diagnosticStyleList: string[], visibility: D.Diagnostic.Intf.DiagnosticVisibility, diagnosticBiome) => {
    const result = {
        workspace: {},
        editor: {},
        all: {},
        layout: {
            [hex.problemPlaceholderContentText]: {},
            [hex.allOkPlaceholderContentText]: {}
        },
    };
    if (config.leftMargin) {
        style.leftMargin = config.leftMargin;
    }
    diagnosticStyleList.forEach(styleName => {
        const styleConfig: D.Decoration.Intf.DecorationTextStyleConfig = {   // this is due to syle config values are in proxy object.
            color: sanitizeConfigValue(config[styleName].color),
            colorOpacity: config[styleName].colorOpacity,
            backgroundColor: sanitizeConfigValue(config[styleName].backgroundColor),
            backgroundOpacity: config[styleName].backgroundOpacity,
            fontStyle: sanitizeConfigValue(config[styleName].fontStyle),
            fontWeight: sanitizeConfigValue(config[styleName].fontWeight),
        };
        style.diagnosticDecorationOption[styleName] = convertToDecorationRenderOption(styleConfig, true);
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
            [hex.problemPlaceholderContentText]: {},
            [hex.allOkPlaceholderContentText]: {},
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

const diagnosticVisibilityBiome = (visibility: D.Diagnostic.Intf.DiagnosticVisibility): DiagnosticBiomeType => {
    let workspacMask: number = DIAGNOSTIC_BIOME.ALL;
    let editorMask: number = DIAGNOSTIC_BIOME.ALL;
    if (visibility.DiagnosticKind === DIAGNOSTIC_KIND.WORKSPACE_ONLY) {
        editorMask = DIAGNOSTIC_BIOME.NONE;
        workspacMask &= hideMkask(visibility.hideOk, visibility.hideWarning);
    }
    if (visibility.DiagnosticKind === DIAGNOSTIC_KIND.EDITOR_ONLY) {
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

const setGlyph = (glyphList, config) => {
    glyphList[hex.openningBracket] = config.openningBracket;
    glyphList[hex.closingBracket] = config.closingBracket;
    glyphList[hex.lineEqual] = config.lineEqual;
    glyphList[hex.lineUp] = config.lineUp;
    glyphList[hex.lineDown] = config.lineDown;
};

const overlayPosition = {
    initalCursor: {
        default: createCursorRangeLine,
        auto: createCursorRangeLineAuto
    },
    lastCursor: {
        default: createCursorRangeLastLine,
        auto: createCursorRangeLineLastAuto
    }
};

const setCursorLine = (bindTo, visibility): void => {
    const rangeFunc = visibility.overlayCursorPosition === LINE_POSITION.INITIAL_CURSOR
        ? overlayPosition.initalCursor
        : overlayPosition.lastCursor;

    switch (visibility.placeTextOnPreviousOrNextLine) {
        case LINE_POSITION.PREVIOUS_LINE:
            bindTo.rangeFunction = rangeFunc.default(-1);
            break;
        case LINE_POSITION.PREVIOUS_LINE_AUTO_INLINE:
            bindTo.rangeFunction = rangeFunc.auto(-1);
            break;
        case LINE_POSITION.NEXTLINE:
            bindTo.rangeFunction = rangeFunc.default(1);
            break;
        case LINE_POSITION.NEXTLINE_AUTO_INLINE:
            bindTo.rangeFunction = rangeFunc.auto(1);
            break;
        default:
            setAutoInlineDatumPoint(visibility.autoInlineDatumPoint);
            bindTo.rangeFunction = createCursorRange;
            break;
    }
};

const updateDiagnosticTextConfig = async (extenionName: string, configuratioChange: boolean = false) => {
    const diagnosticConfig = { ...DIAGNOSTIC_CONFIG } as typeof DIAGNOSTIC_CONFIG;
    const diagnosticDecorationStyle = { ...DIAGNOSTIC_DECORATION_STYLE } as unknown as D.Diagnostic.Intf.DiagonosticDecorationStyle;

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
        clearDiagnosticTextState();
    }

    workspaceProxyConfiguration(diagnosticConfig, extenionName + '.' + CONFIG_SECTION.diagnosticText, DIAGNOSTIC_CONTENT_TEXT_LIST, bindToBuffer, diagnosticTextRegex);
    const placeholderDigit = diagnosticConfig.visibility.overrideAllOk ? bin.allOkOverride : bin.allOkNoOverride;
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
    setDiagonosticTextbuffer();
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