import * as vscode from 'vscode';
import * as StatusType from './status';
import * as DecorationType from './decoration';
import * as DiagnosticType from './diagnostic';

import {
    DECORATION_STYLE_CONFIG_KEY,
    DECORATION_GENERAL_STYLE_CONFIG_KEY,
    DECORATION_SELECTION_STYLE_CONFIG_KEY,
    BORDER_POSITION_VARIATION,
} from '../constant/enum';
import {
    DECORATION_STYLE_PREFIX,
} from '../constant/object';

type NoConfigurationGeneraType = {
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.OPACITY]: number
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.BACKGROUND_OPACITY]: number
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.SELECTION_TEXT_ENABLED]: boolean
}

type NoConfigurationStatusType = {
    [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_OPACITY]: number
    [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_COLOR]: string
    [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_BACKGROUND_COLOR]: string | null
    [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_FONT_STYLE]: string,
    [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_FONT_WEIGHT]: string,
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

type StatusTextConfigNameOnlyType = `${DECORATION_SELECTION_STYLE_CONFIG_KEY}`



type DecorationStyleConfigValueType = string | number | boolean

type StringTransformFunc = ((s: string) => string)[]

type DecorationConfigGetFunctionType = <T extends DecorationStyleConfigValueType>(
    configSection: vscode.WorkspaceConfiguration,
    configName: string,
    defaultValue: T,
    configSectionName?: string,
) => T | string | null

type ConfigCondition = <T extends string | number | boolean | null>(configReady: ConfigInfoReadyType, configKeyWithScope: string, value: T, defaultValue: T) => {
    bordercolor: () => T | null
    backgroundcolor: () => T | null
    borderwidth: () => T | null
}

type BorderPositionKeyOnly = `${BORDER_POSITION_VARIATION}`

type GeneralConfigInfoType = {
    borderOpacity?: number
    backgroundOpacity?: number
    borderWidth?: string
    borderColor?: string
    backgroundColor?: string
    selectionTextEnabled: boolean
    diagnosticTextEnabled: boolean
}

type configErrorType = {
    on: string,
    currentValue: string
}

type RegexType = {
    indentAndEOLRegex: (args: string | number) => RegExp
    resourceScope: RegExp,
    tagtAndEOLRegex: RegExp,
    isValidHexColor: RegExp,
    isValidWidth: RegExp,
    ifContentTextHasPlaceholder: RegExp,
    contentTextKeysOnly: RegExp,
    statusContentText: StatusType.RegexStatusContentTextType
    diagnosticText: DiagnosticType.RegexDiagnosticContentTextType
}

type nextSearchStringType = {
    keep: string | string[] 
    next?: string | string[]
}

type RegexSplitType = {
    position: number,
    array: string[]
}

type ConfigInfoReadyType = {
    name: string
    configHashKey: string,
    borderPositionInfo: DecorationType.BorderPositionInfoType
    generalConfigInfo: GeneralConfigInfoType
    selectionTextConfig: StatusType.StatusTextInfo,
    configError: string[],
} & StatusType.ConfigInfoType

type InitialisedConfigType = {
    config: ConfigInfoReadyType,
    decoration: DecorationType.DecorationStateType
}

type ContentTextPositionBufferType = {
    contentText?: any[],
    position: {
        [key: number]: string
    }
}
