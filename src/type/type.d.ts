/**
 * [type declarations]
 * 
 */
import * as vscode from 'vscode';
import {
    DECORATION_STYLE_CONFIG_KEY,
    DECORATION_GENERAL_STYLE_CONFIG_KEY,
    DECORATION_STATUS_STYLE_CONFIG_KEY,
    DECORATION_TYPE_MASK,
    SELECTION_TYPE,
    BORDER_POSITION_VARIATION,
    DECORATION_STYLE_KEY
} from '../constant/enum';
import {
    DECORATION_STYLE_PREFIX,
} from '../constant/object';

type NoConfigurationGeneraType = {
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.OPACITY]: number
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.BACKGROUND_OPACITY]: number
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.STATUS_TEXT_ENABLED]: boolean
}

type NoConfigurationStatusType = {
    [DECORATION_STATUS_STYLE_CONFIG_KEY.STATUS_TEXT_OPACITY]: number
    [DECORATION_STATUS_STYLE_CONFIG_KEY.STATUS_TEXT_COLOR]: string
    [DECORATION_STATUS_STYLE_CONFIG_KEY.STATUS_TEXT_BACKGROUND_COLOR]: string | null
    [DECORATION_STATUS_STYLE_CONFIG_KEY.STATUS_TEXT_FONT_STYLE]: string,
    [DECORATION_STATUS_STYLE_CONFIG_KEY.STATUS_TEXT_FONT_WEIGHT]: string,
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

type StatusTextConfigNameOnlyType = `${DECORATION_STATUS_STYLE_CONFIG_KEY}`

type DecorationStyleKeyOnlyType = keyof typeof DECORATION_STYLE_PREFIX

type DecorationStyleConfigValueType = string | number | boolean

type StringTransformFunc = ((s: string) => string)[]

type DecorationConfigGetFunctionType = <T extends DecorationStyleConfigValueType>(
    config: ConfigInfoReadyType,
    prefix: DecorationStyleConfigPrefixType,
    configName: DecorationStyleConfigNameType | GeneralConfigNameOnlyType | StatusTextConfigNameOnlyType,
    defaultValue: T,
    configNameChange?: StringTransformFunc
) => T | null

type DecorationTypeSplit = {
    [K in keyof typeof DECORATION_STYLE_PREFIX]: string[]
}

type ConfigCondition = <T extends string | number | boolean | null>(configReady: ConfigInfoReadyType, configKeyWithScope: string, value: T, defaultValue: T) => {
    bordercolor: () => T | null 
    backgroundcolor: () => T | null 
    borderwidth: () => T | null 
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
    statusTextEnabled: boolean,
}

type StatusDecorationType = {
    isWholeLine?: boolean,
    rangeBehavior?: any,
    after: {
        contentText?: string,
        color?: string,
        backgroundColor?: string | null,
        fontWeight?: string,
        fontStyle?: string,
        textDecoration: string,
        margin: string,
    }
}

type StatusDecorationReadyType = {
    isWholeLine: boolean,
    after: {
        contentText: string,
        color: string,
    }
} & StatusDecorationType

type configErrorType = {
    on: string,
    currentValue: string
}

type StatusTextInfo = {
    statusTextOpacity?: number,
    statusTextColor?: string,
    statusTextBackgroundColor?: string,
    statusTextFontStyle?: string,
    statusTextFontWeight?: string
}

type ConfigInfoType = {
    name?: string
    config?: vscode.WorkspaceConfiguration,
    configHashKey?: string
    statusTextConfig?: StatusTextInfo
}

type IndentType = {
    size?: number,
    type?: string
    regex?: RegExp
}

type StatusInfoType = {
    indent: IndentType
    statusText: StatusDecorationType
}

type StatusTextInfoType = {
    contentText: string
    isWholeLine: boolean
    range: vscode.Range
}

type StatusOfType = {
    [SELECTION_TYPE.CURSOR_ONLY]: {
        contentText: ((col: string, end: string) => string),
    }
    [SELECTION_TYPE.SINGLE_LINE]: {
        contentText: ((characters: string) => string),
    }
    [SELECTION_TYPE.MULTI_LINE]: {
        contentText: ((line: string, position: string, characters: string) => string),
    }
    [SELECTION_TYPE.MULTI_CURSOR]: {
        contentText: ((nth: string, selectionCount: string, lines: string, characters: string) => string),
    }
}

type StatusType = {
    position: string // inline | nextline,
    decorationType?: vscode.TextEditorDecorationType[],
    indent: {
        size: number,
        type: string,
        regex: RegExp,
    }
}

type StatusReadyType = {
    decorationType: vscode.TextEditorDecorationType[]
} & StatusType

type statusTextInfoSplitType = {
    [k in keyof typeof DECORATION_STYLE_KEY]: () => StatusTextInfoType[]
};

type regexType = {
    indentAndEOLRegex: (args: string | number) => RegExp
    tagtAndEOLRegex: RegExp,
    isValidHexColor: RegExp,
    isValidWidth: RegExp,
}

type appliedDecoration = {
    applied?: DecorationInfoPropType,
    editorDecoration?: vscode.TextEditorDecorationType[]
};

type ConfigInfoReadyType = {
    name: string
    config: vscode.WorkspaceConfiguration,
    configHashKey: string,
    borderPositionInfo: BorderPositionInfoType
    generalConfigInfo: GeneralConfigInfoType
    configError: string[],
} & ConfigInfoType

type InitialisedConfigType = {
    config: ConfigInfoReadyType,
    decoration: DecorationStateType,
    status: StatusInfoType
}

type DecorationStateType = {
    decorationList: DecorationType
    appliedDecoration: appliedDecoration
    statusText?: vscode.TextEditorDecorationType[]
}

type SelectionConfigFunctionType = (config: DecorationStyleConfigType, decorationKey: DecorationStyleKeyOnlyType) => string[] | undefined

type CreateDecorationFunctionType = (config: DecorationStyleConfigType, decorationKey: DecorationStyleKeyOnlyType, decorationTypeSplit: SelectionConfigFunctionType) => vscode.TextEditorDecorationType[] | undefined

type ColourConfigTransformType = {
    of: string,
    fn: (v: string, n: number, d: string) => string
}

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
    // before?: any
    // after?: any
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

type UnsetDecorationFunctionType = (decorationStatus: DecorationStateType, editor?: vscode.TextEditor, dispose?: boolean) => (decorationInfo: DecorationInfoPropType) => void;

type UnsetFunctionType = (decorationInfo: DecorationInfoPropType) => void

type DecorationWithRangeType = {
    decoration: vscode.TextEditorDecorationType,
    range: vscode.Range[]
}

type DecorationContext = {
    editor: vscode.TextEditor
    configInfo: ConfigInfoReadyType
    statusInfo?: StatusInfoType
    decorationInfo: DecorationInfoPropType;
    decorationState: DecorationStateType
};

type SetDecorationOnEditorFunc = (context: DecorationContext) => void;

type DecorationCoordinatorFunc = (context: DecorationContext) => DecorationWithRangeType[] | undefined;

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

type SelectionTypeToDecorationContext = {
    editor: vscode.TextEditor,
    borderConfig: BorderPositionParserType
    textEditorDecoration: vscode.TextEditorDecorationType[]
}

type SelectionTypeToDecorationFunc = (context: SelectionTypeToDecorationContext) => DecorationWithRangeType[]

type AppliedDecorationType = {
    applied?: DecorationInfoPropType,
    editorDecoration?: vscode.TextEditorDecorationType[]
}