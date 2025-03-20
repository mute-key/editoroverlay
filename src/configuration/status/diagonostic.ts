import * as Type from '../../type/type';
import Regex from '../../util/regex.collection';
import { DIAGNOSTIC_CONFIG, CONFIG_SECTION, DIAGNOSTIC_CONTENT_TEXT_LIST, DIAGNOSTIC_DECORATION_STYLE, DIAGNOSTIC_STYLE_LIST, DIAGNOSTIC_DECORATION_TEXT_KIND, DECORATION_OPTION_LINKER, DIAGNOSTIC_WORKSPACE_PLACEHOLDER_LINKER, DIAGNOSTIC_EDITOR_PLACEHOLDER_LINKER, DIAGNOSTIC_ALL_PLACEHOLDER_LINKER } from '../../constant/object';
import { DIAGNOSTIC_BIOME, DIAGNOSTIC_CONTENT_TEXT_KEY, DIAGNOSTIC_TEXT_STYLE_KEY } from '../../constant/enum';
import { convertToDecorationRenderOption, leftMarginToMarginString, setContentTextOnDecorationRenderOption } from '../shared/decoration';
import { sanitizeConfigValue } from '../shared/validation';
import { bindDiagnosticContentTextState } from '../../editor/decoration/status/diagnostic';
import { hexToRgbaStringLiteral, readBits } from '../../util/util';
import { workspaceProxyConfiguration } from '../load';

const diagnosticConfig = { ...DIAGNOSTIC_CONFIG } as Type.DiagnosticConfigType;

const diagnosticDecorationStyle = { ...DIAGNOSTIC_DECORATION_STYLE } as unknown as Type.DiagonosticDecorationStyle;

const positionKeyToPlaceholderName = {
    pre: 'prefix',
    post: 'postfix',
} as const;

const positionKeyList = ['pre', 'post'] as const;

const applyLeftMargin = (textOf: Type.DiagnosticContentTextType, visibility: Type.DiagnosticVisibilityType, leftMargin: string | undefined) => {

    if (!leftMargin || leftMargin === '0px' || leftMargin === '0em') {
        return;
    }

    if (typeof textOf.layout.allOkPlaceholderContentText.contentText[0].contentText === 'symbol') {
        const marginDecoration = {...textOf.layout.allOkPlaceholderContentText.contentText[0].contentText};
        marginDecoration.after = {...textOf.layout.allOkPlaceholderContentText.contentText[0].contentText.after};
        marginDecoration.contentText = '';
        marginDecoration.margin = leftMarginToMarginString(leftMargin);
        textOf.layout.allOkPlaceholderContentText.contentText[0].unshift(marginDecoration);
    } else {
        textOf.layout.allOkPlaceholderContentText.contentText[0].after['margin'] = leftMarginToMarginString(leftMargin);
    }

    if (typeof textOf.layout.problemPlaceholderContentText.contentText[0].contentText === 'symbol') {
        const marginDecoration = {...textOf.layout.problemPlaceholderContentText.contentText[0].contentText};
        marginDecoration.after = {...textOf.layout.problemPlaceholderContentText.contentText[0].contentText.after};
        marginDecoration.contentText = '';
        marginDecoration.margin = leftMarginToMarginString(leftMargin);
        textOf.layout.problemPlaceholderContentText.contentText[0].unshift(marginDecoration);
    } else {
        textOf.layout.problemPlaceholderContentText.contentText[0].after['margin'] = leftMarginToMarginString(leftMargin);
    }
};

const convertPositionDecorationRenderOption = ({ textPosition, primaryStyle, secondaryStyle, placeholder, leftMargin }) => {
    return textPosition.contentText.map((text, idx) => {
        const key = textPosition.position[idx];
        let decorationStyle = primaryStyle;
        if (positionKeyList.includes(key)) {
            if (!Object.hasOwn(placeholder, positionKeyToPlaceholderName[key])) {
                return;
            }
            decorationStyle = secondaryStyle;
        }

        return setContentTextOnDecorationRenderOption(decorationStyle, text);
    }).filter(decorationOption => decorationOption !== undefined);
};

const buildDiagnosticTextState = (textOftarget, textOfSource, style: Type.DiagonosticDecorationStyle, leftMargin: string = '') => {

    Object.entries(textOfSource).forEach(([contentTextName, textPosition]) => {
        const linker = DECORATION_OPTION_LINKER[contentTextName];
        const context = {
            textPosition: textPosition,
            primaryStyle: style.diagonosticDecorationOption[linker[0]],
            secondaryStyle: linker[1] ? style.diagonosticDecorationOption[linker[1]] : null,
            placeholder: [],
            leftMargin: leftMargin
        };

        if (Object.hasOwn(textOftarget.workspace, contentTextName)) {
            context.placeholder = textOftarget.workspace[contentTextName].placeholder;
            textOftarget.workspace[contentTextName].contentText = convertPositionDecorationRenderOption(context);
        }

        if (Object.hasOwn(textOftarget.editor, contentTextName)) {
            context.placeholder = textOftarget.editor[contentTextName].placeholder;
            textOftarget.editor[contentTextName].contentText = convertPositionDecorationRenderOption(context);
        }

        if (Object.hasOwn(textOftarget.all, contentTextName)) {
            context.placeholder = textOftarget.all[contentTextName].placeholder;
            textOftarget.all[contentTextName].contentText = convertPositionDecorationRenderOption(context);
        }

        if (Object.hasOwn(textOftarget.layout, contentTextName)) {
            textOftarget.layout[contentTextName].contentText = convertPositionDecorationRenderOption(context);
        }
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
            placeholder: {
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

const buildDiagnosticStyle = (config: Type.DiagnosticConfigType, style: Type.DiagonosticDecorationStyle, diagnosticStyleList: string[], visibility: Type.DiagnosticVisibilityType, diagnosticBiome) => {

    const ifOverrride = visibility.overrideLayoutPlaceholderColorToHighestSeverity ? {} : undefined;
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


    /**
     * need code split
     */
    if (ifOverrride) {
        const requiredColor = diagnosticBiome.workspace | diagnosticBiome.editor;
        const allOkOverrideColor = {};
        const problemOverrideColor = {};

        const okStyleName = DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE;
        if (requiredColor & DIAGNOSTIC_BIOME.OK && config[okStyleName]) {
            problemOverrideColor[DIAGNOSTIC_BIOME.OK] = {};
            problemOverrideColor[DIAGNOSTIC_BIOME.OK]['color'] = hexToRgbaStringLiteral(config[okStyleName].color as string, config[okStyleName].colorOpacity, '#333333', 0.7);
            allOkOverrideColor[DIAGNOSTIC_BIOME.OK] = {};
            allOkOverrideColor[DIAGNOSTIC_BIOME.OK]['color'] = hexToRgbaStringLiteral(config[okStyleName].color as string, config[okStyleName].colorOpacity, '#333333', 0.7);

            if (sanitizeConfigValue(config[okStyleName].backgroundColor)) {
                problemOverrideColor[DIAGNOSTIC_BIOME.OK]['backgroundColor'] = hexToRgbaStringLiteral(config[okStyleName].backgroundColor as string, config[okStyleName].backgroundOpacity, '#333333', 0.7);
                allOkOverrideColor[DIAGNOSTIC_BIOME.OK]['backgroundColor'] = hexToRgbaStringLiteral(config[okStyleName].backgroundColor as string, config[okStyleName].backgroundOpacity, '#333333', 0.7);
            }
        }

        const warnStyleName = DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE;
        if (requiredColor & DIAGNOSTIC_BIOME.WARN && config[warnStyleName]) {
            problemOverrideColor[DIAGNOSTIC_BIOME.WARN] = {};
            problemOverrideColor[DIAGNOSTIC_BIOME.WARN]['color'] = hexToRgbaStringLiteral(config[warnStyleName].color as string, config[warnStyleName].colorOpacity, '#333333', 0.7);
            if (sanitizeConfigValue(config[warnStyleName].backgroundColor)) {
                problemOverrideColor[DIAGNOSTIC_BIOME.WARN]['backgroundColor'] = hexToRgbaStringLiteral(config[warnStyleName].backgroundColor as string, config[warnStyleName].backgroundOpacity, '#333333', 0.7);
            }
        }

        const errStyleName = DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE;
        if (requiredColor & DIAGNOSTIC_BIOME.ERR && config[errStyleName]) {
            problemOverrideColor[DIAGNOSTIC_BIOME.ERR] = {};
            problemOverrideColor[DIAGNOSTIC_BIOME.ERR]['color'] = hexToRgbaStringLiteral(config[errStyleName].color as string, config[errStyleName].colorOpacity, '#333333', 0.7);
            if (sanitizeConfigValue(config[errStyleName].backgroundColor)) {
                problemOverrideColor[DIAGNOSTIC_BIOME.ERR]['backgroundColor'] = hexToRgbaStringLiteral(config[errStyleName].backgroundColor as string, config[errStyleName].backgroundOpacity, '#333333', 0.7);
            }
        }

        ifOverrride[DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_PROBLEM_CONTENT_TEXT] = {
            override: Object.keys(problemOverrideColor).length > 0 ? problemOverrideColor : undefined
        };

        ifOverrride[DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_ALL_OK_CONTENT_TEXT] = {
            override: Object.keys(allOkOverrideColor).length > 0 ? allOkOverrideColor : undefined
        };
    }

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

const reversedStyleList = () => {
    const styleList = [...DIAGNOSTIC_STYLE_LIST];
    styleList.reverse().push(["0", "0"]);
    return styleList;
};

const decorationStyleFromBiome = (diagnosticBiome: number): string[] =>
    readBits(diagnosticBiome, reversedStyleList(), 0, 4)
        .filter(styles => styles !== 0)
        .flat();

const updateDiagnosticTextConfig = (configReady: Type.ConfigInfoReadyType) => {
    const bindTo = bindDiagnosticContentTextState();
    const bindToBuffer = {
        functionOf: bindTo.functionOf,
        textOf: {}
    };

    // console.log(bindTo.functionOf)

    workspaceProxyConfiguration(
        diagnosticConfig,
        configReady.name + '.' + CONFIG_SECTION.diagnosticText,
        DIAGNOSTIC_CONTENT_TEXT_LIST,
        bindToBuffer,
        Regex.diagnosticText);

    const diagnosticBiome = diagnosticVisibilityBiome(diagnosticConfig.visibility);


    // console.log('Object.hasOwn', Object.hasOwn(bindTo.functionOf, DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_PROBLEM_CONTENT_TEXT))
    const decorationStyleList = decorationStyleFromBiome(diagnosticBiome.workspace | diagnosticBiome.editor);
    decorationStyleList.push(DIAGNOSTIC_TEXT_STYLE_KEY.DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE);

    // console.log(diagnosticConfig);

    Object.assign(bindTo.textOf, buildDiagnosticStyle(diagnosticConfig, diagnosticDecorationStyle, decorationStyleList, diagnosticConfig.visibility, diagnosticBiome));
    Object.assign(bindTo.configOf, diagnosticConfig.visibility);

    // // console.log(diagnosticDecorationStyle)
    buildDiagnosticTextState(bindTo.textOf, bindToBuffer.textOf, diagnosticDecorationStyle, diagnosticConfig.leftMargin);
    // console.log(bindToBuffer.textOf)
    console.log(bindTo.textOf);

    applyLeftMargin(bindTo.textOf, diagnosticConfig.visibility, diagnosticConfig.leftMargin);
};

export {
    updateDiagnosticTextConfig
};