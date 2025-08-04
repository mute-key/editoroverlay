import * as vscode from 'vscode';
import { DECORATION_STYLE_PREFIX } from '../constant/config/object';
import { DECORATION_STYLE_CONFIG_KEY, DECORATION_TYPE_MASK, SELECTION_TYPE } from 'src/constant/config/enum';

export type {
    Intf,
    Tp
};

declare namespace Intf {
    interface RenderGroupSetProperty {
        highlight: number,
        selection?: any,
        diagnostic?: any
        editorReference?: any[]
    }

    interface DecorationState {
        appliedHighlight: number[]
        diagnosticSignature: number[]
        eventTrigger: number[]
    }

    interface DecorationContext {
        editor: vscode.TextEditor
        decorationState: DecorationState
    }

    interface SelectionInfoType {
        KEY: string,
        MASK: DECORATION_TYPE_MASK
    }

    interface DecorationInfoPropType {
        KEY: number,
        MASK: DECORATION_TYPE_MASK
    }
    
    interface AppliedHighlightType {
        applied: DecorationInfoPropType,
        ofDecorationType?: vscode.TextEditorDecorationType[]
    }

    interface AppliedDecorationType {
        applied?: DecorationInfoPropType,
        editorDecoration?: vscode.TextEditorDecorationType[]
    }


    interface DecorationWithRangeType {
        highlight: vscode.TextEditorDecorationType,
        range: vscode.Range[],
    }

    interface decorationCoordinatorSplit {
        [SELECTION_TYPE.CURSOR_ONLY]: any
        [SELECTION_TYPE.SINGLE_LINE]: any
        [SELECTION_TYPE.MULTI_LINE]: any
        [SELECTION_TYPE.MULTI_CURSOR]: any
    }

    interface createRange {
        startPosition: number[] | vscode.Position
        endPosition: number[] | vscode.Position
    }

    interface CoordinatorSplitType {
        [key: number]: any
    }

    interface BorderPositionParser {
        isWholeLine: boolean,
        borderPosition: string,
        beforeCursor: boolean,
        afterCursor: boolean,
        atLineStart: boolean,
        selectionOnly: boolean,
    }

    interface SelectionHighlightKindContext {
        editor: vscode.TextEditor,
        textEditorHighlight: vscode.TextEditorDecorationType[]
        borderConfigSymlink: symbol
    }


    interface ColourConfigTransform {
        of: string,
        fn: (v: string, n: number, d: string) => string
    }

    interface DecorationTextStyleConfig {
        color?: string
        colorOpacity?: number
        backgroundColor?: string
        backgroundOpacity?: number
        fontStyle?: string
        fontWeight?: string,
        margin?: string
    }

    interface DecorationTextPrePostFixStyleConfig {
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

    interface DecorationRenderOptionAfter {
        contentText?: string | any,
        color?: string,
        backgroundColor?: string,
        fontWeight?: string,
        fontStyle?: string,
        textDecoration?: string,
        margin?: string
    }

    interface RenderOption {
        range: any,
        renderOptions: any
    }

    interface RenderInstanceOption {
        isWholeLine?: boolean,
        rangeBehavior?: any,
        after: DecorationRenderOptionAfter
    }

    interface RenderInstanceOptionReady extends RenderInstanceOption {
        isWholeLine: boolean,
        after: {
            contentText: string,
            color: string,
            backgroundColor: string | undefined
        }
    }
}

declare namespace Tp {
    type DecorationStyleConfig = {
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

    type DecorationTypeSplit = {
        [K in keyof typeof DECORATION_STYLE_PREFIX]: string[]
    }

    type RenderGroupSet = {
        [key: symbol]: Intf.RenderGroupSetProperty
    }

    type DecorationInfo = {
        [key: number]: Intf.DecorationInfoPropType | any
    }

    type ContentTextPositionType = {
        contentText: (string | any)[],
        position: {
            [key: number]: string
        }
    }

    type ContentTextCollectionType = {
        [key: string]: ContentTextPositionType
    }

    type DecorationStyleKeyOnly = keyof typeof DECORATION_STYLE_PREFIX

    type HighlightStyleList = Record<DecorationStyleKeyOnly, vscode.TextEditorDecorationType[]>;

    type UnsetDecorationFunctionType = (editor: vscode.TextEditor, highlightStatus: Intf.DecorationState) => (selectionKind: Intf.DecorationInfoPropType) => void;

    type SetDecorationOnEditorFunc = (context: Intf.DecorationContext) => void;

    type DecorationCoordinatorFunc = (context: Intf.DecorationContext) => Intf.DecorationWithRangeType[];

    type UnsetFunctionType = (selectionKind: Intf.DecorationInfoPropType) => void

    type BorderPositionInfoType = Record<DecorationStyleKeyOnly, Intf.BorderPositionParser | undefined>;

    type SelectionTypeToDecorationFunc = (context: Intf.SelectionHighlightKindContext) => Intf.DecorationWithRangeType[]

    type SelectionConfigFunction = (config: DecorationStyleConfig, decorationKey: number) => string[] | undefined

    type CreateDecorationFunction = (config: DecorationStyleConfig, decorationKey: number, decorationTypeSplit: SelectionConfigFunction) => vscode.TextEditorDecorationType[] | undefined
}