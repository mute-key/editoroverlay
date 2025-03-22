import * as Type from '../../type/type';
import Regex from '../../util/regex.collection';
import { DIAGNOSTIC_CONFIG, CONFIG_SECTION, DIAGNOSTIC_CONTENT_TEXT_LIST, DIAGNOSTIC_DECORATION_STYLE, DIAGNOSTIC_STYLE_LIST, DIAGNOSTIC_DECORATION_TEXT_KIND, DECORATION_OPTION_LINKER, DIAGNOSTIC_WORKSPACE_PLACEHOLDER_LINKER, DIAGNOSTIC_EDITOR_PLACEHOLDER_LINKER, DIAGNOSTIC_ALL_PLACEHOLDER_LINKER } from '../../constant/object';
import { DIAGNOSTIC_BIOME, DIAGNOSTIC_CONTENT_TEXT_KEY, DIAGNOSTIC_TEXT_STYLE_KEY } from '../../constant/enum';
import { workspaceProxyConfiguration } from '../shared/configuration';
import { sanitizeConfigValue } from '../shared/validation';
import { convertToDecorationRenderOption, leftMarginToMarginString, setContentTextOnDecorationRenderOption } from '../shared/decoration';
import { bindDiagnosticContentTextState } from '../../editor/decoration/status/diagnostic';
import { hexToRgbaStringLiteral, readBits } from '../../util/util';

const diagnosticConfig = { ...DIAGNOSTIC_CONFIG } as Type.DiagnosticConfigType;

const diagnosticDecorationStyle = { ...DIAGNOSTIC_DECORATION_STYLE } as unknown as Type.DiagonosticDecorationStyle;

const positionKeyList = ['pre', 'post'] as const;

const positionKeyToPlaceholderName = { pre: 'prefix', post: 'postfix', } as const;

const applyLeftMargin = (textOf: Type.DiagnosticContentTextType, visibility: Type.DiagnosticVisibilityType, leftMargin: string | undefined) => {

    if (!leftMargin || leftMargin === '0px' || leftMargin === '0em') {
        return;
    }

    ['allOkPlaceholderContentText', 'problemPlaceholderContentText'].forEach(placeholderKind => {
        if (typeof textOf.layout[placeholderKind].contentText[0].contentText === 'symbol') {
            const marginDecoration = { ...textOf.layout[placeholderKind].contentText[0].contentText };
            marginDecoration.after = { ...textOf.layout[placeholderKind].contentText[0].contentText.after };
            marginDecoration.contentText = '';
            marginDecoration.margin = leftMarginToMarginString(leftMargin);
            textOf.layout[placeholderKind].contentText[0].unshift(marginDecoration);
        } else {
            textOf.layout[placeholderKind].contentText[0].after['margin'] = leftMarginToMarginString(leftMargin);
        }
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

const buildDiagnosticTextState = (textOftarget, textOfSource, style: Type.DiagonosticDecorationStyle, leftMargin: string = '') => {

    const convertPositionWrapper = (context, target, propertyName, contentTextName) => {
        if (Object.hasOwn(target[propertyName], contentTextName)) {
            if (target[propertyName][contentTextName].notation) {
                context.notation = target[propertyName][contentTextName].notation;
            }
            target[propertyName][contentTextName].contentText = convertPositionDecorationRenderOption(context);
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
            convertPositionWrapper(context, textOftarget, biome, contentTextName);
        });
    });
};

const ifNoationNotNull = (property: string, str: string) => {
    if (str !== 'null' && str.length > 0 && !Regex.resourceScope.test(str)) {
        return {
            [property]: str
        };
    }
    return {};
};

const createNotation = (biome: string, prefix: string, postfix: string) => {
    return {
        [biome]: {
            ...DIAGNOSTIC_DECORATION_TEXT_KIND,
            notation: {
                ...ifNoationNotNull('prefix', prefix),
                ...ifNoationNotNull('postfix', postfix)
            }
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
                color[biome] = { color: hexToRgbaStringLiteral(config[override.styleName].color as string, config[override.styleName].colorOpacity, '#333333', 0.7) };
            });
        }
    });

    return {
        [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_PROBLEM_CONTENT_TEXT]: {
            override: Object.keys(problemOverrideColor).length > 0 ? problemOverrideColor : undefined
        },
        [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_ALL_OK_CONTENT_TEXT]: {
            override: Object.keys(allOkOverrideColor).length > 0 ? allOkOverrideColor : undefined
        },
    };
};

const buildDiagnosticStyle = (config: Type.DiagnosticConfigType, style: Type.DiagonosticDecorationStyle, diagnosticStyleList: string[], visibility: Type.DiagnosticVisibilityType, diagnosticBiome) => {

    const result = {
        workspace: {},
        editor: {},
        all: {},
        layout: {
            [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_PROBLEM_CONTENT_TEXT]: {},
            [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_ALL_OK_CONTENT_TEXT]: {}
        }
    };

    if (config.leftMargin) {
        style.leftMargin = config.leftMargin;
    }

    diagnosticStyleList.forEach(styleName => {

        // this is due to syle config values are in proxy object.
        const styleConfig: Type.DecorationTextStyleConfig = {
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
    console.log(result);
    return {
        ...result,
        layout: {
            [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_PROBLEM_CONTENT_TEXT]: {},
            [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_ALL_OK_CONTENT_TEXT]: {},
            ...ifOverrride
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
    const textOf = stateOf.textOf as Type.DiagnosticContentTextType;
    for (const placeholder in textOf.layout) {
        if (placeholder['override']) {
            delete placeholder['override'];
        }
    }
};

const updateDiagnosticTextConfig = (configReady: Type.ConfigInfoReadyType, configuratioChange: boolean = false) => {
    const bindTo: any = bindDiagnosticContentTextState();
    let bindToBuffer: any = {
        functionOf: bindTo.functionOf,
        textOf: {}
    };

    if (configuratioChange) {
        clearOverrideState(bindTo);
    }

    workspaceProxyConfiguration(diagnosticConfig, configReady.name + '.' + CONFIG_SECTION.diagnosticText, DIAGNOSTIC_CONTENT_TEXT_LIST, bindToBuffer, Regex.diagnosticText);

    const diagnosticBiome = diagnosticVisibilityBiome(diagnosticConfig.visibility);
    const decorationStyleList = decorationStyleFromBiome(diagnosticBiome.workspace | diagnosticBiome.editor);

    Object.assign(bindTo.textOf, buildDiagnosticStyle(diagnosticConfig, diagnosticDecorationStyle, decorationStyleList, diagnosticConfig.visibility, diagnosticBiome));
    Object.assign(bindTo.configOf, diagnosticConfig.visibility);

    buildDiagnosticTextState(bindTo.textOf, bindToBuffer.textOf, diagnosticDecorationStyle, diagnosticConfig.leftMargin);
    applyLeftMargin(bindTo.textOf, diagnosticConfig.visibility, diagnosticConfig.leftMargin);

    // release refernce 
    delete bindTo.functionOf;
    delete bindTo.textOf;
    delete bindTo.configOf;
    delete bindToBuffer.textof;
    delete bindToBuffer.functionOf;
};

export {
    updateDiagnosticTextConfig
};