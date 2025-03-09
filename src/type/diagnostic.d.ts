import * as vscode from 'vscode';
import {
    DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY
} from 'src/constant/enum';

type DiagonosticState = {
    total: number,
    source: number,
    severity: {
        hint: number,
        info: number,
        warning: number,
        error: number,
    },
    diagonosticDecoration: vscode.TextEditorDecorationType[] | [];
}

type DiagnosticWarningTextRegExp = {
    src: RegExp
    wrn: RegExp
}

type DiagnosticErrorTextRegExp = {
    src: RegExp
    err: RegExp
}

type RegexDiagnosticContentTextUnion = DiagnosticWarningTextRegExp | DiagnosticErrorTextRegExp

type RegexDiagnosticContentTextType = {
    // [DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY.OK_CONTENT_TEXT]?: null,
    [DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY.WARNING_CONTENT_TEXT]: DiagnosticWarningTextRegExp,
    [DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY.ERROR_CONTENT_TEXT]: DiagnosticErrorTextRegExp,
}


type DiagnosticOkTextType = {
    contentText?: string[]
}

type DiagnosticWarningTextType = {
    contentText?: string[]
    src?: number
    wrn?: number
}

type DiagnosticErrorTextType = {
    contentText?: string[]
    src?: number
    err?: number
}

type DiagnosticContentTextType = {
    [DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY.OK_CONTENT_TEXT]: DiagnosticOkTextType,
    [DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY.WARNING_CONTENT_TEXT]: DiagnosticWarningTextType,
    [DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY.ERROR_CONTENT_TEXT]: DiagnosticErrorTextType,
}

type AutoHideDiagnosticType = {
    ok?: boolean
    warning?: boolean
    error?: boolean
}


type DiagnosticDecorationType = {
    color?: string
    colorOpacity?: number
    backgroundColor?: string
    backgroundOpacity?: number
    fontStyle?: string
    fontWeight?: string
    rounded?: string
}

type DiagnosticConfigType = {
    autoHideDiagnostic: AutoHideDiagnosticType
    okTextStyle: DiagnosticDecorationType
    okContentText?: string
    warningTextStyle: DiagnosticDecorationType
    warningContentText?: string
    errorTextStyle: DiagnosticDecorationType
    errorContentText?: string
}

type DiagonosticTextStateFunc = (diagnosticContentText: DiagnosticContentTextType) => void

type DiagnosticTextStateType = {
    [k in DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY]: DiagonosticTextStateFunc
}

type DiagnosticOfType = {
    [k in DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY]: DiagonosticTextFunc
}

type DiagonosticTextFunc = Record<string, () => void>;

type BindDiagnosticContentTextStateType = {
    diagnosticOf: any,
    diagnosticTextState: DiagonosticTextStateFunc
}



// {
// isWholeLine: undefined,
// rangeBehavior: undefined,
// after: {
//     contentText: undefined,
//     color: undefined,
//     backgroundColor: undefined,
//     fontWeight: undefined,
//     fontStyle: undefined,
//     textDecoration: 'none',
//     margin: '0 0 0 20px',
// } as const
// } as const,
