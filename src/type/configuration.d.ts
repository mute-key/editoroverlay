import * as vscode from 'vscode';
import { BORDER_POSITION_VARIATION, DECORATION_GENERAL_STYLE_CONFIG_KEY, DECORATION_SELECTION_STYLE_CONFIG_KEY, DECORATION_STYLE_CONFIG_KEY } from 'src/constant/config/enum';
import { DECORATION_STYLE_PREFIX } from 'src/constant/config/object';

import type * as Status from './status';
import type * as Editor from './editor';
import type * as Decoration from './highlight';
import type * as Diagnostic from './diagnostic';

export type {
    Intf, Tp
};

declare namespace Tp {

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
        [key: string]: NoConfigurationDeocorationPropType | any
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

    type ConfigCondition = <T extends string | number | boolean | null>(configReady: Status.Intf.ConfigInfo, configKeyWithScope: string, value: T, defaultValue: T) => {
        bordercolor: () => T | null
        backgroundcolor: () => T | null
        borderwidth: () => T | null
    }

    type BorderPositionKeyOnly = `${BORDER_POSITION_VARIATION}`


    type configErrorType = {
        on: string,
        currentValue: string
    }

    type nextSearchStringType = {
        keep: string | string[]
        next?: string | string[]
    }

    type RegexSplitType = {
        position: number,
        array: string[]
    }

    type ContentTextPositionBufferType = {
        contentText?: any[],
        position: {
            [key: number]: string
        }
    }
}

declare namespace Intf {

    interface GeneralConfigInfoType {
        borderOpacity?: number
        backgroundOpacity?: number
        borderWidth?: string
        borderColor?: string
        backgroundColor?: string
        selectionTextEnabled: boolean
        diagnosticTextEnabled: boolean
    }

    interface ConfigReady extends Status.Intf.ConfigInfo {
        name: string
        renderLimiter: number | any,
        updateCaller?: number,
        generalConfigInfo: GeneralConfigInfoType
        configError: string[]
    }

    interface InitialisedConfig {
        config: ConfigReady,
        decoration: Decoration.Intf.DecorationState
    }
}

