import type * as Decoration from './decoration';
import type * as Regex from './regex';
import type * as Numeric from './numeric';

import * as vscode from 'vscode';
import * as hex from '../numeric/hexadecimal';
import { SELECTION_CONTENT_TEXT_CONFIG_KEY } from 'src/constant/config/enum';
import { UnderlyingByteSource } from 'stream/web';

export type {
    Intf,
    Tp
};

declare namespace Intf {
    interface SelectionDecorationStyle {
        leftMargin?: string
        placeholderDecorationOption?: Decoration.Intf.RenderOption,
        selectionDecorationOption: {
            [key: string]: Decoration.Intf.RenderOption | undefined
            ln?: Decoration.Intf.RenderOption,
            col?: Decoration.Intf.RenderOption,
            zCol?: Decoration.Intf.RenderOption,
            char?: Decoration.Intf.RenderOption,
            charOnly?: Decoration.Intf.RenderOption,
            lc?: Decoration.Intf.RenderOption,
            nth?: Decoration.Intf.RenderOption,
            count?: Decoration.Intf.RenderOption
        }
    }

    interface StatusContentTextPosition {
        contentText?: (string | number | number | Tp.ContentTextFuncSignature)[],
        position: {
            [key: number]: string
        }
    }

    interface StatusContentTextPositionReady extends StatusContentTextPosition {
        contentText: any[],
    }


    interface StatusContentTextBuffer {
        [key: Numeric.Key.Hex]: {
            contentText: any[]
            position: number[]
        }
    }

    interface StatusContentText {
        [key: Numeric.Key.Hex]: ContentTextBody | undefined
    }

    interface ContentTextBody {
        contentText: any[],
        position: [number, symbol][]
    }

    interface ContentTextPositionFunc {
        contentText: any[],
        position: {
            [key: number]: (context: any) => string
        }
    }

    interface SelectionTextInfoSplit {
        [key: number]: () => void
    }

    interface RegexStatusContentText {
        [SELECTION_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: Regex.Intf.CursorOnlyText
        [SELECTION_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: Regex.Intf.SingleLineText
        [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: Regex.Intf.MultiLineCursorText
        [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: Regex.Intf.MultiLineAnchorText
        [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: Regex.Intf.MultiCursorText
    }

    interface SelectionDecorationConfig {
        [key: string]: boolean | string | number | undefined | SelectionDecorationConfig['selectionCountTextStyle']
        enabled?: boolean
        color?: string,
        colorOpacity?: number,
        backgroundColor?: string,
        backgroundOpacity?: number,
        fontStyle?: string,
        fontWeight?: string,
        cursorOnlyText?: string,
        singleLineText?: string,
        leftMargin?: string,
        multiLineCursorText?: string,
        multiLineAnchorText?: string,
        multiCursorText?: string,
        multiCursorEdit?: string,
        selectionCountTextStyle: {
            [key: string]: string | number | undefined
            ln?: string,
            col?: string,
            zCol?: string,
            char?: string,
            lc?: string,
            nth?: string,
            count?: string,
            opacity?: number,
            fontStyle?: string,
            fontWeight?: string,
        }
    }

    // type StatusTextInfo = {
    //     opacity?: number,
    //     color?: string,
    //     backgroundColor?: string,
    //     fontStyle?: string,
    //     fontWeight?: string
    //     cursorOnlyText?: string,
    //     singleLineText?: string,
    //     multiLineCursorText?: string,
    //     multiLineAnchorText?: string,
    //     multiCursorText?: string,
    // }

    interface ConfigInfo {
        name?: string
        updateCaller?: number,
    }

    interface IndentInfo {
        size?: number,
        type?: string,
        regex?: RegExp,
    }

    interface IndentReady {
        size: number,
        type: string,
        regex: RegExp,
    }

    interface StatusInfo {
        indent: IndentInfo
        statusDecoration?: Decoration.Intf.RenderOption
    }

    interface StatusTextInfo {
        contentText: Decoration.Intf.RenderOption[]
        range: vscode.Range
    }

    interface ContentTextFuncContext {
        idx: number | string,
        editor: vscode.TextEditor,
        // indent: IndentReadyType,
    }

    interface SplitFunc {
        position: number,
        array: (string | symbol | number | Tp.ContentTextFuncSignature)[]
    }

    interface SearchObject {
        nextSearchString: string | symbol | number | (Tp.ContentTextFuncSignature),
        lastPosition: number
    }

    interface BindContentTextState {
        functionOf: Tp.ContentTextState,
        textOf: StatusContentText,
        infoOf: IndentInfo
        // styleOf: StatusDecorationStyleType
        // contentTextState: ContentTextStateFuncSignature
    }
}

declare namespace Tp {
    type ContentTextFuncSignature = (context: Intf.ContentTextFuncContext) => any

    type ContentTextFuncNoContextSignature = (editor: vscode.TextEditor) => any

    type ContentTextFunc = Record<string, (number | string | symbol | ContentTextFuncSignature)>;

    type ContentTextStateFuncSignature = (statusContentText: Intf.StatusContentText) => void

    type StatusOf = {
        [k in SELECTION_CONTENT_TEXT_CONFIG_KEY]: Tp.ContentTextFunc;
    }

    type ContentTextState = {
        [k in SELECTION_CONTENT_TEXT_CONFIG_KEY]: Tp.ContentTextFunc;
    }
}