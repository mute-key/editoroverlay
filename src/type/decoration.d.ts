import * as vscode from 'vscode';
import * as StatusType from './status.d';
import * as ConfigType from './config.d';
import { 
    DECORATION_STYLE_CONFIG_KEY, 
    DECORATION_TYPE_MASK, SELECTION_TYPE 
} from "src/constant/enum";
import { 
    DECORATION_STYLE_PREFIX 
} from "src/constant/object";

type DecorationTypeSplit = {
    [K in keyof typeof DECORATION_STYLE_PREFIX]: string[]
}

type appliedDecoration = {
    applied?: DecorationInfoPropType,
    editorDecoration?: vscode.TextEditorDecorationType[]
};

type DecorationStateType = {
    decorationList: DecorationType
    appliedDecoration: appliedDecoration
    statusText?: vscode.TextEditorDecorationType[]
    diagnosticText?: vscode.TextEditorDecorationType[]
}
type DecorationStyleKeyOnlyType = keyof typeof DECORATION_STYLE_PREFIX

type DecorationType = Record<DecorationStyleKeyOnlyType, vscode.TextEditorDecorationType[] | undefined>;

type UnsetDecorationFunctionType = (decorationStatus: DecorationStateType, editor?: vscode.TextEditor, dispose?: boolean) => (decorationInfo: DecorationInfoPropType) => void;

type DecorationContext = {
    editor: vscode.TextEditor
    configInfo: ConfigType.ConfigInfoReadyType
    statusInfo?: StatusType.StatusInfoType
    decorationInfo: DecorationInfoPropType;
    decorationState: DecorationStateType
};

type DecorationInfoPropType = {
    KEY: string,
    MASK: DECORATION_TYPE_MASK
}

type SetDecorationOnEditorFunc = (context: DecorationContext) => void;

type DecorationCoordinatorFunc = (context: DecorationContext) => DecorationWithRangeType[] | undefined;

type UnsetFunctionType = (decorationInfo: DecorationInfoPropType) => void

type DecorationInfoType = {
    [k in keyof typeof SELECTION_TYPE]: DecorationInfoPropType;
}

type AppliedDecorationType = {
    applied?: DecorationInfoPropType,
    editorDecoration?: vscode.TextEditorDecorationType[]
}


type DecorationWithRangeType = {
    decoration: vscode.TextEditorDecorationType,
    range: vscode.Range[]
}

type decorationCoordinatorSplit = {
    [SELECTION_TYPE.CURSOR_ONLY]: any
    [SELECTION_TYPE.SINGLE_LINE]: any
    [SELECTION_TYPE.MULTI_LINE]: any
    [SELECTION_TYPE.MULTI_CURSOR]: any
}

type createRange = {
    startPosition: number[] | vscode.Position
    endPosition: number[] | vscode.Position
}

type CoordinatorSplitType = Record<string, (context: SelectionTypeToDecorationContext) => DecorationWithRangeType[]>

type BorderPositionParserType = {
    isWholeLine: boolean,
    borderPosition: string,
    beforeCursor: boolean,
    afterCursor: boolean,
    atLineStart: boolean,
    selectionOnly: boolean,
}

type BorderPositionInfoType = Record<DecorationStyleKeyOnlyType, BorderPositionParserType | undefined>;

type SelectionTypeToDecorationContext = {
    editor: vscode.TextEditor,
    borderConfig: BorderPositionParserType
    textEditorDecoration: vscode.TextEditorDecorationType[]
}

type SelectionTypeToDecorationFunc = (context: SelectionTypeToDecorationContext) => DecorationWithRangeType[]


type DecorationStyleConfigType = {
    [k in keyof typeof DECORATION_STYLE_CONFIG_KEY]: boolean | string | number;
    // [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: boolean
    // [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: string
    // [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: string
    // [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: string
    // [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: string
    // [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]?: string
    // [DECORATION_STYLE_CONFIG_KEY.BORDER_RADIUS]?: string
    // [DECORATION_STYLE_CONFIG_KEY.OVERVIEW_RULER_COLOR]?: string | vscode.ThemeColor,
    // [DECORATION_STYLE_CONFIG_KEY.OVERVIEW_RULER_LANE]?: vscode.OverviewRulerLane
    // before?: any
    // after?: any
    // [DECORATION_STYLE_KEY.FONT_WEIGHT]: string
}

type SelectionConfigFunctionType = (config: DecorationStyleConfigType, decorationKey: DecorationStyleKeyOnlyType) => string[] | undefined

type CreateDecorationFunctionType = (config: DecorationStyleConfigType, decorationKey: DecorationStyleKeyOnlyType, decorationTypeSplit: SelectionConfigFunctionType) => vscode.TextEditorDecorationType[] | undefined

type ColourConfigTransformType = {
    of: string,
    fn: (v: string, n: number, d: string) => string
}
