import * as vscode from 'vscode';
import * as Decoration from './decoration.d';
import { SELECTION_CONTENT_TEXT_CONFIG_KEY } from 'src/constant/config/enum';

export namespace type {
    type SelectionDecorationStyle = {
        leftMargin?: string
        placeholderDecorationOption?: Decoration.type.RenderOption,
        selectionDecorationOption: {
            ln?: Decoration.type.RenderOption,
            col?: Decoration.type.RenderOption,
            zCol?: Decoration.type.RenderOption,
            char?: Decoration.type.RenderOption,
            charOnly?: Decoration.type.RenderOption,
            lc?: Decoration.type.RenderOption,
            nth?: Decoration.type.RenderOption,
            count?: Decoration.type.RenderOption
        }
    }

    type StatusContentTextPosition = {
        contentText?: (string | number | number | ContentTextFuncSignature)[],
        position: {
            [key: number]: string
        }
    }

    type StatusContentTextPositionReady = {
        contentText: any[],
    } & StatusContentTextPosition


    type StatusContentTextBuffer = {
        [key: string]: {
            contentText: any[]
            position: number[]
        }
    }

    type StatusContentText = {
        [key: number]: ContentTextSymlinkKind
    }

    type ContentTextSymlinkKind = {
        contentText: any[],
        position: [number, symbol][]
    }

    type ContentTextPositionFunc = {
        contentText: any[],
        position: {
            [key: number]: (context: any) => string
        }
    }

    type SelectionTextInfoSplit = {
        [key: number]: () => void
    };

    type CursorOnlyStatusTextRegExp = {
        col: RegExp
        zCol: RegExp
        ln: RegExp
    }

    type SingleLineStatusTextRegExp = {
        char: RegExp
        ln: RegExp
    }

    type MultiLineCursorStatusTextRegExp = {
        lc: RegExp
        ln: RegExp
        char: RegExp,
        charOnly: RegExp
    }

    type MultiLineAnchorStatusTextRegExp = {
        lc: RegExp
        ln: RegExp
        char: RegExp
        charOnly: RegExp
    }

    type MultiCursorStatusTextRegExp = {
        nth: RegExp
        count: RegExp
        lc: RegExp
        ln: RegExp
        char: RegExp
    }

    type RegexStatusContentTextUnion = CursorOnlyStatusTextRegExp | SingleLineStatusTextRegExp | MultiLineCursorStatusTextRegExp | MultiLineAnchorStatusTextRegExp | MultiCursorStatusTextRegExp

    type RegexStatusContentText = {
        [SELECTION_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: CursorOnlyStatusTextRegExp
        [SELECTION_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: SingleLineStatusTextRegExp
        [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: MultiLineCursorStatusTextRegExp
        [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: MultiLineAnchorStatusTextRegExp
        [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: MultiCursorStatusTextRegExp
    }

    type SelectionDecorationConfig = {
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

    type StatusTextInfo = {
        opacity?: number,
        color?: string,
        backgroundColor?: string,
        fontStyle?: string,
        fontWeight?: string
        cursorOnlyText?: string,
        singleLineText?: string,
        multiLineCursorText?: string,
        multiLineAnchorText?: string,
        multiCursorText?: string,
    }

    interface ConfigInfo {
        name?: string
        updateCaller?: number,
    }

    type IndentInfo = {
        size?: number,
        type?: string,
        regex?: RegExp,
    }

    type IndentReady = {
        size: number,
        type: string,
        regex: RegExp,
    }

    type StatusInfo = {
        indent: IndentInfo
        statusDecoration?: Decoration.type.RenderOption
    }

    type StatusTextInfo = {
        contentText: Decoration.type.RenderOption[]
        range: vscode.Range
    }

    type ContentTextFuncContext = {
        idx: number | string,
        editor: vscode.TextEditor,
        // indent: IndentReadyType,
    }

    type ContentTextFuncSignature = (context: ContentTextFuncContext) => any

    type ContentTextFuncNoContextSignature = (editor: vscode.TextEditor) => any

    type ContentTextFunc = Record<string, (number | string | ContentTextFuncSignature)>;

    type ContentTextStateFuncSignature = (statusContentText: StatusContentText) => void

    type StatusOf = {
        [k in SELECTION_CONTENT_TEXT_CONFIG_KEY]: ContentTextFunc;
    }

    type ContentTextState = {
        [k in SELECTION_CONTENT_TEXT_CONFIG_KEY]: ContentTextFunc;
    }

    type SplitFunc = {
        position: number,
        array: (string | symbol | number | ContentTextFuncSignature)[]
    }

    type SearchObject = {
        nextSearchString: string | symbol | number | (ContentTextFuncSignature),
        lastPosition: number
    }

    type BindContentTextState = {
        functionOf: ContentTextState,
        textOf: StatusContentText,
        infoOf: IndentInfo
        // styleOf: StatusDecorationStyleType
        // contentTextState: ContentTextStateFuncSignature
    }
}


