import * as vscode from 'vscode';
import { 
    DECORATION_STYLE_KEY, 
    STATUS_CONTENT_TEXT_CONFIG_KEY 
} from 'src/constant/enum';


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


type CursorOnlyContentTextType = {
    contentText?: (string | (ContentTextFuncSignature | ContentTextWithIndexFuncSignature))[],
    col?: number
}

type SingleLineContentTextType = {
    contentText?: (string | (ContentTextFuncSignature | ContentTextWithIndexFuncSignature))[],
    character?: number
}

type MultiLineContentTextType = {
    contentText?: (string | (ContentTextFuncSignature | ContentTextWithIndexFuncSignature))[],
    line?: number,
    character?: number
}

type MultiCursorContentTextType = {
    contentText?: (string | (ContentTextFuncSignature | ContentTextWithIndexFuncSignature))[],
    nth?: number,
    count?: number,
    line?: number,
    character?: number
}

type StatusContentTextUnion = CursorOnlyContentTextType | SingleLineContentTextType | MultiLineContentTextType | MultiCursorContentTextType;

type StatusContentTextType = {
    [STATUS_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]:CursorOnlyContentTextType,
    [STATUS_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]:SingleLineContentTextType,
    [STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]:MultiLineContentTextType,
    [STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]:MultiLineContentTextType,
    [STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]:MultiCursorContentTextType
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
    type?: string
    regex?: RegExp
}

type StatusInfoType = {
    indent: IndentType
    statusDecoration: StatusDecorationType
}

type StatusTextInfoType = {
    contentText: string
    isWholeLine: boolean
    range: vscode.Range
}


type ContentTextFuncContext = {
    editor: vscode.TextEditor,
    indent?: IndentType,
}

type ContentTextFuncSignature = (context: ContentTextFuncContext) => string | number

type ContentTextWithIndexFuncContext = {
    idx: number,
    editor: vscode.TextEditor,
    indent: IndentType,
}

type ContentTextWithIndexFuncSignature = (context: ContentTextWithIndexFuncContext) => string | number

type ContentTextFunc = Record<string, ContentTextFuncSignature | ContentTextWithIndexFuncSignature>;

type ContentTextStateFuncSignature = (statusContentText: StatusContentTextType) => void

type ContentTextStateFunc = Record<string, ContentTextStateFuncSignature>

type StatusOfType = {
    [k in STATUS_CONTENT_TEXT_CONFIG_KEY]: ContentTextFunc;
}

type ContentTextStateType = {
    [k in STATUS_CONTENT_TEXT_CONFIG_KEY]: ContentTextFunc;
}

type SplitFuncType = {
    position: number, 
    array: (string | (ContentTextFuncSignature | ContentTextWithIndexFuncSignature))[]
}

type SearchObjectType = {
    nextSearchString: string | (ContentTextFuncSignature | ContentTextWithIndexFuncSignature),
    lastPosition: number
}

type BindContentTextStateType = {
    statusOf: ContentTextFunc,
    contentTextState: ContentTextStateFuncSignature
}