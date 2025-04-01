import * as vscode from 'vscode';
import * as StatusType from './status.d';
import { DECORATION_STYLE_CONFIG_KEY, DECORATION_TYPE_MASK, SELECTION_TYPE } from "src/constant/enum";
import { DECORATION_STYLE_PREFIX } from "src/constant/object";

type DecorationTypeSplit = {
    [K in keyof typeof DECORATION_STYLE_PREFIX]: string[]
}

type AppliedHighlightType = {
    applied: DecorationInfoPropType,
    ofDecorationType?: vscode.TextEditorDecorationType[]
};

type DecorationStateType = {
    appliedHighlight: any[]
    selectionText: vscode.TextEditorDecorationType[] | any[],
    diagnosticText: vscode.TextEditorDecorationType[] | any[],
    diagnosticInfo?: StatusType.StatusTextInfoType[] | any[],
    selectionInfo?: StatusType.StatusTextInfoType[] | any[],
}

type DecorationStyleKeyOnlyType = keyof typeof DECORATION_STYLE_PREFIX

type HighlightStyleListType = Record<DecorationStyleKeyOnlyType, vscode.TextEditorDecorationType[]>;

type UnsetDecorationFunctionType = (editor: vscode.TextEditor, decorationStatus: DecorationStateType) => (selectionKind: DecorationInfoPropType) => void;

type RenderGroupSetProperty = {
    highlight: number,
    selection?: any,
    diagnostic?: any
    editorReference?: any[]
}

type RenderGroupSet = {
    [key: symbol]: RenderGroupSetProperty
}

type DecorationContext = {
    editor: vscode.TextEditor
};

type SelectionInfoType = {
    KEY: string,
    MASK: DECORATION_TYPE_MASK
}

type DecorationInfoPropType = {
    KEY: number,
    MASK: DECORATION_TYPE_MASK
}

type SetDecorationOnEditorFunc = (context: DecorationContext) => void;

type DecorationCoordinatorFunc = (context: DecorationContext) => DecorationWithRangeType[];

type UnsetFunctionType = (selectionKind: DecorationInfoPropType) => void

type DecorationInfoType = {
    [key: number]: DecorationInfoPropType | any
}

type AppliedDecorationType = {
    applied?: DecorationInfoPropType,
    editorDecoration?: vscode.TextEditorDecorationType[]
}


type DecorationWithRangeType = {
    decoration: vscode.TextEditorDecorationType,
    range: vscode.Range[],
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

type CoordinatorSplitType = {
    // [key: symbol]: (context: SelectionHighlightKindContext) => DecorationWithRangeType[] | any
    [key: number]: any
}

type BorderPositionParserType = {
    isWholeLine: boolean,
    borderPosition: string,
    beforeCursor: boolean,
    afterCursor: boolean,
    atLineStart: boolean,
    selectionOnly: boolean,
}

type BorderPositionInfoType = Record<DecorationStyleKeyOnlyType, BorderPositionParserType | undefined>;

type SelectionHighlightKindContext = {
    editor: vscode.TextEditor,
    textEditorHighlight: vscode.TextEditorDecorationType[]
    borderConfigSymlink: symbol
}

type SelectionTypeToDecorationFunc = (context: SelectionHighlightKindContext) => DecorationWithRangeType[]


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

type DecorationTextStyleConfig = {
    color?: string
    colorOpacity?: number
    backgroundColor?: string
    backgroundOpacity?: number
    fontStyle?: string
    fontWeight?: string,
    margin?: string
}

type DecorationTextPrePostFixStyleConfig = {
    prefix?: string
    postfix?: string
    color?: string
    colorOpacity?: number
    backgroundColor?: string
    backgroundOpacity?: number
    fontStyle?: string
    fontWeight?: string
    margin?: string
}

type DecorationRenderAfterOptionType = {
    contentText?: string | any,
    color?: string,
    backgroundColor?: string,
    fontWeight?: string,
    fontStyle?: string,
    textDecoration?: string,
    margin?: string
} & {}

type DecorationRenderOptionType = {
    isWholeLine?: boolean,
    rangeBehavior?: any,
    after: {
    } & DecorationRenderAfterOptionType
}

type DecorationRenderOptionReadyType = {
    isWholeLine: boolean,
    after: {
        contentText: string,
        color: string,
        backgroundColor: string | undefined
    }
} & DecorationRenderOptionType

type ContentTextPositionType = {
    contentText: (string | any)[],
    position: {
        [key: number]: string
    }
}

type ContentTextCollectionType = {
    [key: string] : ContentTextPositionType
}


