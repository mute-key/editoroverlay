import type * as Status from './status';
import type * as Editor from './editor';
import type * as Decoration from './decoration';
import type * as Diagnostic from './diagnostic';

import * as vscode from 'vscode';
import { BORDER_POSITION_VARIATION, DECORATION_GENERAL_STYLE_CONFIG_KEY, DECORATION_SELECTION_STYLE_CONFIG_KEY, DECORATION_STYLE_CONFIG_KEY } from 'src/constant/config/enum';
import { DECORATION_STYLE_PREFIX } from 'src/constant/config/object';

export type {
    Intf, Tp
};

declare namespace Tp {

    type NoConfigurationGenera = {
        [DECORATION_GENERAL_STYLE_CONFIG_KEY.OPACITY]: number
        [DECORATION_GENERAL_STYLE_CONFIG_KEY.BACKGROUND_OPACITY]: number
        [DECORATION_GENERAL_STYLE_CONFIG_KEY.SELECTION_TEXT_ENABLED]: boolean
    }

    type NoConfigurationStatus = {
        [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_OPACITY]: number
        [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_COLOR]: string
        [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_BACKGROUND_COLOR]: string | null
        [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_FONT_STYLE]: string,
        [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_FONT_WEIGHT]: string,
    }

    type NoConfigurationDeocorationProp = {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: boolean
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: string
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: string
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: string
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: string
        [DECORATION_STYLE_CONFIG_KEY.BORDER_RADIUS]?: string
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]?: string
    }

    type NoConfigurationDecoration = {
        [key: string]: NoConfigurationDeocorationProp | any
    }

    type DecorationStyleConfigPrefix = typeof DECORATION_STYLE_PREFIX[keyof typeof DECORATION_STYLE_PREFIX] | "";

    type DecorationStyleConfigName = `${DECORATION_STYLE_CONFIG_KEY}`

    type GeneralConfigNameOnly = `${DECORATION_GENERAL_STYLE_CONFIG_KEY}`

    type StatusTextConfigNameOnly = `${DECORATION_SELECTION_STYLE_CONFIG_KEY}`

    type DecorationStyleConfigValue = string | number | boolean

    type StringTransformFunc = ((s: string) => string)[]

    type DecorationConfigGetFunction = <T extends DecorationStyleConfigValue>(
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


    type configError = {
        on: string,
        currentValue: string
    }

    type nextSearchString = {
        keep: string | string[]
        next?: string | string[]
    }


    type ContentTextPositionBuffer = {
        contentText?: any[],
        position: {
            [key: number]: string
        }
    }
}

declare namespace Intf {

    interface GeneralConfigInfoType {
        [key: string]: number | string | boolean | undefined,
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
        decoration: Decoration.Intf.State
    }

    
    interface RegexSplit {
        position: number,
        array: string[]
    }
}

