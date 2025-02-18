/**
 * [type declarations]
 * 
 */
import * as vscode from 'vscode';
import {
    DECORATION_STYLE_CONFIG_KEY,
    DECORATION_STYLE_PREFIX,
    DECORATION_GENERAL_STYLE_CONFIG_KEY,
    DECORATION_TYPE_MASK,
    SELECTION_TYPE,
    BORDER_POSITION_VARIATION
} from '../constant';


type NoConfigurationGeneraType = {
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.OPACITY]: number
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.BACKGROUND_OPACITY]: number
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.BORDER_WIDTH]?: string
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.BORDER_COLOR]?: string
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.BACKGROUND_COLOR]?: string
}

type NoConfigurationDeocorationPropType = {
    [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: boolean
    [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: string
    [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: string
    [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: string
    [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: string
    [DECORATION_STYLE_CONFIG_KEY.BORDER_RADIUS]?: string
    [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]?: string
}

type NoConfigurationDecorationType = {
    [K in keyof typeof DECORATION_STYLE_PREFIX]: NoConfigurationDeocorationPropType
}

type DecorationStyleConfigPrefixType = typeof DECORATION_STYLE_PREFIX[keyof typeof DECORATION_STYLE_PREFIX] | "";

type DecorationStyleConfigNameType = `${DECORATION_STYLE_CONFIG_KEY}`

type GeneralConfigNameOnlyType = `${DECORATION_GENERAL_STYLE_CONFIG_KEY}`

type DecorationStyleKeyOnlyType = keyof typeof DECORATION_STYLE_PREFIX

type DecorationStyleConfigValueType = string | number | boolean

type StringTransformFunc = ((s: string) => string)[]

type DecorationConfigGetFunctionType = <T extends DecorationStyleConfigValueType>(
    config: ConfigInfoReadyType,
    prefix: DecorationStyleConfigPrefixType,
    configName: DecorationStyleConfigNameType | GeneralConfigNameOnlyType,
    defaultValue: T,
    configNameChange?: StringTransformFunc
) => T

type DecorationTypeSplit = {
    [K in keyof typeof DECORATION_STYLE_PREFIX]: string[]
}

type BorderPositionKeyOnly = `${BORDER_POSITION_VARIATION}`;

type BorderPositionParserType = {
    isWholeLine: boolean,
    borderPosition: string,
    beforeCursor: boolean,
    afterCursor: boolean,
    atLineStart: boolean,
    selectionOnly: boolean,
}

type BorderPositionInfoType = Record<DecorationStyleKeyOnlyType, BorderPositionParserType | undefined>;

type GeneralConfigInfoType = {
    borderOpacity?: number
    backgroundOpacity?: number
    borderWidth?: string
    borderColor?: string
    backgroundColor?: string
}

type ConfigInfoType = {
    name: string | undefined
    config: vscode.WorkspaceConfiguration | undefined,
    configHashKey: string | undefined
    decorationList: DecorationType
    generalConfigInfo: GeneralConfigInfoType
    borderPositionInfo: BorderPositionInfoType
}

type ConfigInfoReadyType = {
    name: string
    config: vscode.WorkspaceConfiguration,
    configHashKey: string,
} & ConfigInfoType

// type SelectionConfigFunctionType<T> = (config: T) => DecorationStyleConfigType[];

// type CreateDecorationFunctionType = <T>(config: T) => (selectionConfigFunc: SelectionConfigFunctionType<T>) => vscode.TextEditorDecorationType[]

type SelectionConfigFunctionType = (config: DecorationStyleConfigType, decorationKey: DecorationStyleKeyOnlyType) => string[] | undefined

type CreateDecorationFunctionType = (config: DecorationStyleConfigType, decorationKey: DecorationStyleKeyOnlyType) => (decorationTypeSplit: SelectionConfigFunctionType) => vscode.TextEditorDecorationType[] | undefined

type ColourConfigTransformType = {
    of: string, 
    fn: (v: string, n: number, d: string) => string
}

/**
 * [Type.DecorationStyleKey]
 * 
 * DECORATION_STYLE_KEY.USE_OVERRIDE: optional
 * if style to use override value.
 * 
 * DECORATION_STYLE_KEY.IS_WHOLE_LINE
 * if border is to be displayed for whole line.
 * 
 * DECORATION_STYLE_KEY.BORDER_WITH
 * css style border with.
 * 
 * DECORATION_STYLE_KEY.BORDER_COLOR
 * css style border color.
 * 
 * DECORATION_STYLE_KEY.BORDER_STYLE
 * css style border style.
 * 
 * DECORATION_STYLE_KEY.BORDER_RADIUS: optional
 * css style border radious.
 * 
 * DECORATION_STYLE_KEY.BACKGROUND_COLOR: optional>
 * css style background color.
 * 
 * comment, unused but for future reference;
 * https://code.visualstudio.com/api/references/vscode-api#ThemeColor
 * https://code.visualstudio.com/api/references/vscode-api#OverviewRulerLane
 * 
 * Usage example;
 * new vscode.ThemeColor()
 * vscode.OverviewRulerLane
 * 
 */
type DecorationStyleConfigType = {
    [DECORATION_STYLE_CONFIG_KEY.USE_OVERRIDE]?: boolean
    [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: boolean
    [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: string
    [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: string
    [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: string
    [DECORATION_STYLE_CONFIG_KEY.BORDER_RADIUS]?: string
    [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: string
    [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]?: string
    [DECORATION_STYLE_CONFIG_KEY.OVERVIEW_RULER_COLOR]?: string | vscode.ThemeColor,
    [DECORATION_STYLE_CONFIG_KEY.OVERVIEW_RULER_LANE]?: vscode.OverviewRulerLane
    // [DECORATION_STYLE_KEY.FONT_WEIGHT]: string
}

type DecorationType = Record<DecorationStyleKeyOnlyType, vscode.TextEditorDecorationType[] | undefined>;

type DecorationInfoPropType = {
    KEY: string,
    MASK: DECORATION_TYPE_MASK
}

type DecorationInfoType = {
    [SELECTION_TYPE.RESET]: DecorationInfoPropType
    [SELECTION_TYPE.CURSOR_ONLY]: DecorationInfoPropType
    [SELECTION_TYPE.SINGLE_LINE]: DecorationInfoPropType
    [SELECTION_TYPE.MULTI_LINE]: DecorationInfoPropType
    [SELECTION_TYPE.MULTI_CURSOR]: DecorationInfoPropType
}


type UnsetDecorationFunctionType = (decorationList: DecorationType, editor?: vscode.TextEditor) => (decorationInfo: DecorationInfoPropType) => boolean;

type UnsetFunctionType = (decorationInfo: DecorationInfoPropType) => boolean

type DecorationWithRangeType = {
    decoration: vscode.TextEditorDecorationType,
    range: vscode.Range[]
}

type DecorationContext = {
    editor: vscode.TextEditor;
    decorationList: DecorationType;
    decorationInfo: DecorationInfoPropType;
    loadConfig: ConfigInfoReadyType
};

type SetDecorationOnEditorFunc = (context: DecorationContext) => void;

type DecorationCoordinatorFunc = (context: DecorationContext) => DecorationWithRangeType[] | undefined;

type createRange = {
    startPosition: number[] | vscode.Position
    endPosition: number[] | vscode.Position
}

type SelectionTypeToDecorationContext = {
    editor: vscode.TextEditor,
    borderConfig: BorderPositionParserType
    textEditorDecoration: vscode.TextEditorDecorationType[]
}

type SelectionTypeToDecorationFunc = (context: SelectionTypeToDecorationContext) => DecorationWithRangeType[]

type AppliedDecorationType = {
    applied: DecorationInfoPropType | undefined,
    editorDecoration: vscode.TextEditorDecorationType[] | undefined
}