/**
 * [type declarations]
 * 
 */
import * as vscode from 'vscode';
import {
    DECORATION_STYLE_CONFIG_KEY,
    DECORATION_STYLE_PREFIX,
    DECORATION_TYPE_MASK,
    SELECTION_TYPE,
} from './constant';

type DecorationStyleConfigNameOnlyType = `${DECORATION_STYLE_PREFIX}`;

type DecorationStyleKeyOnlyType = keyof typeof DECORATION_STYLE_PREFIX

type DecorationConfigGetFunctionType = <T extends string | number | boolean>(
    config: vscode.WorkspaceConfiguration,
    prefix: string,
    configName: DecorationStyleConfigNameOnlyType,
    defaultValue: T,
    decorationKey: DecorationStyleKeyOnlyType
) => T

type DeocorationDefaultOverridPropType = {
    [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: boolean
    [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: string
    [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: string
    [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: string
    [DECORATION_STYLE_CONFIG_KEY.BORDER_RADIUS]?: string
}

type DecorationListType = {
    [k in DECORATION_STYLE_PREFIX]: DeocorationDefaultOverridPropType
}

type DeocorationDefaultOverridType = {
    [K in keyof typeof DECORATION_STYLE_PREFIX]: DeocorationDefaultOverridPropType
}

type DecorationTypeSplit = {
    [K in keyof typeof DECORATION_STYLE_PREFIX]: string[]
}

type ConfigInfoType = {
    name: string | undefined
    config: vscode.WorkspaceConfiguration | undefined,
    decorationList: DecorationType
}

// type SelectionConfigFunctionType<T> = (config: T) => DecorationStyleConfigType[];

// type CreateDecorationFunctionType = <T>(config: T) => (selectionConfigFunc: SelectionConfigFunctionType<T>) => vscode.TextEditorDecorationType[]

type SelectionConfigFunctionType = (config: DecorationStyleConfigType) => DecorationTypeSplit

type CreateDecorationFunctionType = (config: DecorationStyleConfigType, decorationKey: DecorationStyleKeyOnlyType) => (decorationTypeSplit: SelectionConfigFunctionType) => vscode.TextEditorDecorationType[]

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
    [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]?: string
    // [DECORATION_STYLE_KEY.OVERVIEW_RULER_COLOR]: vscode.ThemeColor()
    // [DECORATION_STYLE_KEY.OVERVIEW_RULER_LANE]: vscode.OverviewRulerLane.Left
    // [DECORATION_STYLE_KEY.FONT_WEIGHT]: string
}

type DecorationKeyType = Record<DecorationStyleKeyOnlyType, vscode.TextEditorDecorationType[] | undefined>;

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

type LoadFuncType = (context: {
    decorationList: DecorationType,
    decorationInfo: DecorationInfoPropType
}) => boolean;

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
};

type SetDecorationOnEditorFunc = (context: DecorationContext) => void;

type DecorationCoordinatorFunc = (context: DecorationContext) => DecorationWithRangeType[] | undefined;

type AppliedDecorationType = {
    applied: DecorationInfoPropType | undefined
}