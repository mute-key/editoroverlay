import * as vscode from 'vscode';
import { SELECTION_CONTENT_TEXT_CONFIG_KEY } from 'src/constant/config/enum';

import type * as Highlight from './decoration';
import type * as Regex from './regex';

export type {
    Intf,
    Tp
};

declare namespace Intf {
    interface SelectionDecorationStyle {
        leftMargin?: string
        placeholderDecorationOption?: Highlight.Intf.RenderOption,
        selectionDecorationOption: {
            ln?: Highlight.Intf.RenderOption,
            col?: Highlight.Intf.RenderOption,
            zCol?: Highlight.Intf.RenderOption,
            char?: Highlight.Intf.RenderOption,
            charOnly?: Highlight.Intf.RenderOption,
            lc?: Highlight.Intf.RenderOption,
            nth?: Highlight.Intf.RenderOption,
            count?: Highlight.Intf.RenderOption
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
        [key: string]: {
            contentText: any[]
            position: number[]
        }
    }

    interface StatusContentText {
        [key: number]: ContentTextSymlinkKind
    }

    interface ContentTextSymlinkKind {
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
        [SELECTION_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: Regex.Intf.CursorOnlyStatusText
        [SELECTION_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: Regex.Intf.SingleLineStatusText
        [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: Regex.Intf.MultiLineCursorStatusText
        [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: Regex.Intf.MultiLineAnchorStatusText
        [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: Regex.Intf.MultiCursorStatusText
    }

    interface SelectionDecorationConfig {
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
        selectionCountTextStyle: {
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
        statusDecoration?: Highlight.Intf.RenderOption
    }

    interface StatusTextInfo {
        contentText: Highlight.Intf.RenderOption[]
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

    type ContentTextFunc = Record<string, (number | string | ContentTextFuncSignature)>;

    type ContentTextStateFuncSignature = (statusContentText: Intf.StatusContentText) => void

    type StatusOf = {
        [k in SELECTION_CONTENT_TEXT_CONFIG_KEY]: Tp.ContentTextFunc;
    }

    type ContentTextState = {
        [k in SELECTION_CONTENT_TEXT_CONFIG_KEY]: Tp.ContentTextFunc;
    }
}