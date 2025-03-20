import * as vscode from 'vscode';
import * as DecorationType from './decoration.d';
import { DECORATION_STYLE_KEY, STATUS_CONTENT_TEXT_CONFIG_KEY } from 'src/constant/enum';

type SelectionDecorationStyleType = {
    leftMargin?: string
    placeholderDecorationOption?: DecorationType.DecorationRenderOptionType,
    selectionDecorationOption: {
        ln?: DecorationType.DecorationRenderOptionType,
        col?: DecorationType.DecorationRenderOptionType,
        zCol?: DecorationType.DecorationRenderOptionType,
        char?: DecorationType.DecorationRenderOptionType,
        lc?: DecorationType.DecorationRenderOptionType,
        nth?: DecorationType.DecorationRenderOptionType,
        count?: DecorationType.DecorationRenderOptionType
    }
}

// type CursorOnlyContentTextType = {
//     contentText?: (string | (ContentTextFuncSignature | ContentTextWithIndexFuncSignature))[],
//     position: {
//         col?: number,
//         zCol?: number,
//         ln?: number,
//     }
// }

// type SingleLineContentTextType = {
//     contentText?: (string | (ContentTextFuncSignature | ContentTextWithIndexFuncSignature))[],
//     position: {
//         char?: number,
//         ln?: number,
//     }
// }

// type MultiLineContentTextType = {
//     contentText?: (string | (ContentTextFuncSignature | ContentTextWithIndexFuncSignature))[],
//     position: {
//         ln?: number,
//         lc?: number,
//         char?: number,
//     }
// }

// type MultiCursorContentTextType = {
//     contentText?: (string | (ContentTextFuncSignature | ContentTextWithIndexFuncSignature))[],
//     position: {
//         nth?: number,
//         count?: number,
//         ln?: number,
//         lc?: number,
//         char?: number
//     }
// }

// type StatusContentTextUnion = CursorOnlyContentTextType | SingleLineContentTextType | MultiLineContentTextType | MultiCursorContentTextType;

type StatusContentTextPositionType = {
    contentText?: (string | (ContentTextFuncSignature))[],
    position: {
        [key: number]: string
    }
}

type StatusContentTextPositionReadyType = {
    contentText: any[],
} & StatusContentTextPositionType

type StatusContentTextType = {
    [k in STATUS_CONTENT_TEXT_CONFIG_KEY]?: any[]
}

type ContentTextPositionFunc = {
    contentText: any[],
    position: {
        [key: number]: (context: any) => string
    }
}

type statusTextInfoSplitType = {
    [k in keyof typeof DECORATION_STYLE_KEY]: () => StatusTextInfoType[]
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
    char: RegExp
}

type MultiLineAnchorStatusTextRegExp = {
    lc: RegExp
    ln: RegExp
    char: RegExp
}

type MultiCursorStatusTextRegExp = {
    nth: RegExp
    count: RegExp
    lc: RegExp
    ln: RegExp
    char: RegExp
}

type RegexStatusContentTextUnion = CursorOnlyStatusTextRegExp | SingleLineStatusTextRegExp | MultiLineCursorStatusTextRegExp | MultiLineAnchorStatusTextRegExp | MultiCursorStatusTextRegExp

type RegexStatusContentTextType = {
    [STATUS_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: CursorOnlyStatusTextRegExp
    [STATUS_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: SingleLineStatusTextRegExp
    [STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: MultiLineCursorStatusTextRegExp
    [STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: MultiLineAnchorStatusTextRegExp
    [STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: MultiCursorStatusTextRegExp
}

type SelectionDecorationConfigType = {
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

type ConfigInfoType = {
    name?: string
    configHashKey?: string
}

type IndentType = {
    size?: number,
    type?: string,
    regex?: RegExp,
}

type IndentReadyType = {
    size: number,
    type: string,
    regex: RegExp,
}

type StatusInfoType = {
    indent: IndentType
    statusDecoration?: DecorationType.DecorationRenderOptionType
}

type StatusTextInfoType = {
    contentText: DecorationType.DecorationRenderOptionType[]
    range: vscode.Range
}


type ContentTextFuncContext = {
    idx: number,
    editor: vscode.TextEditor,
    indent: IndentReadyType,
}

type ContentTextFuncSignature = (context: ContentTextFuncContext) => any

// type ContentTextWithIndexFuncContext = {
//     idx: number,
//     editor: vscode.TextEditor,
//     indent: IndentType,
// }

// type ContentTextWithIndexFuncSignature = (context: ContentTextWithIndexFuncContext) => string | number

type ContentTextFunc = Record<string, ContentTextFuncSignature>;

type ContentTextStateFuncSignature = (statusContentText: StatusContentTextType) => void

type StatusOfType = {
    [k in STATUS_CONTENT_TEXT_CONFIG_KEY]: ContentTextFunc;
}

type ContentTextStateType = {
    [k in STATUS_CONTENT_TEXT_CONFIG_KEY]: ContentTextFunc;
}

type SplitFuncType = {
    position: number,
    array: (string | (ContentTextFuncSignature))[]
}

type SearchObjectType = {
    nextSearchString: string | (ContentTextFuncSignature),
    lastPosition: number
}

type BindContentTextStateType = {
    functionOf: ContentTextStateType,
    textOf: StatusContentTextType,
    // styleOf: StatusDecorationStyleType
    // contentTextState: ContentTextStateFuncSignature
}
