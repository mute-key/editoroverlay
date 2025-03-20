import * as vscode from 'vscode';
import * as DecorationType from './decoration.d';
import * as StatusType from './status.d';
import { DIAGNOSTIC_CONTENT_TEXT_KEY } from 'src/constant/enum';


type DiagnosticSourceType = {
    [key: string]: {
        [key: string]: vscode.Diagnostic[]
    }
}

type DiagnosticStateType = {
    severity: number,
    editor: {
        warning: {
            total: number
        },
        error: {
            total: number
        }
    },
    workspace: {
        warning: {
            source: number,
            total: number
        },
        error: {
            source: number,
            total: number
        },
    }
}

type DiagonosticDecorationStyle = {
    leftMargin: string,
    diagonosticDecorationOptionReady: DecorationType.DecorationRenderOptionType[],
    diagonosticDecorationText: DiagonosticTextStateTextType
    diagonosticDecorationOption: {
        okTextStyle?: DecorationType.DecorationRenderOptionType,
        okPrefixPostfixTextStyle?: DecorationType.DecorationRenderOptionType,
        warningTextStyle?: DecorationType.DecorationRenderOptionType,
        warningPrefixPostfixTextStyle?: DecorationType.DecorationRenderOptionType,
        errorTextStyle?: DecorationType.DecorationRenderOptionType,
        errorPrefixPostfixTextStyle?: DecorationType.DecorationRenderOptionType,
    };
}


type DiagnosticAllOkTextRegExp = {
    allok: RegExp
}

type DiagnosticProblemTextRegExp = {
    editor: RegExp
    workspace: RegExp
}

type DiagnosticNotationTextRegExp = {
    pre: RegExp
    post: RegExp
}

type DiagnosticWorkspaceRegExp = {
    pre: RegExp
    post: RegExp
    src: RegExp
    wrn: RegExp
}

type DiagnosticEditorRegExp = {
    pre: RegExp
    post: RegExp
    err: RegExp
}

type RegexDiagnosticContentTextUnion = DiagnosticNotationTextRegExp | DiagnosticWorkspaceRegExp | DiagnosticEditorRegExp | DiagnosticAllOkTextRegExp | DiagnosticProblemTextRegExp

type RegexDiagnosticContentTextType = {
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_PROBLEM_CONTENT_TEXT]: DiagnosticProblemTextRegExp,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_ALL_OK_CONTENT_TEXT]: DiagnosticAllOkTextRegExp,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_ALL_CONTENT_TEXT]: DiagnosticNotationTextRegExp,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_WORKSPACE_CONTENT_TEXT]: DiagnosticNotationTextRegExp,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_EDITOR_CONTENT_TEXT]: DiagnosticNotationTextRegExp,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_WORKSPACE_CONTENT_TEXT]: DiagnosticWorkspaceRegExp,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_EDITOR_CONTENT_TEXT]: DiagnosticEditorRegExp,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_WORKSPACE_CONTENT_TEXT]: DiagnosticWorkspaceRegExp,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_EDITOR_CONTENT_TEXT]: DiagnosticEditorRegExp,
}

type DiagnosticOkTextType = {
    contentText: (string | any)[]
    position: {
        pre?: number
        post?: number
    }
}

type DiagnosticWarningTextType = {
    contentText?: string[]
    position: {
        pre?: number
        post?: number
        src?: number
        wrn?: number
    }
}

type DiagnosticErrorTextType = {
    contentText?: string[]
    position: {
        pre?: number
        post?: number
        src?: number
        err?: number
    }
}


type DiagnosticContentTextStateType = {
    contentText: (string | any)[]
    placeholder: {
        prefix: string,
        postfix: string
    }
}

type DiagonosticContentTextKindType = {
    [k in DIAGNOSTIC_CONTENT_TEXT_KEY]: DiagnosticContentTextStateType;
}

type DiagonosticContentTextAll = {
    okAllContentText: DiagnosticContentTextStateType
}

type DiagnosticContentTextType = {
    layout: {
        problemPlaceholderContentText: {
            contentText: any[],
            override: {
                [key: number]: {
                    [key: string]: string
                }
            }
        },
        allOkPlaceholderContentText: {
            contentText: any[], 
            override: {
                [key: number]: {
                    [key: string]: string
                }
            }
        },
    },
    editor: DiagonosticContentTextKindType,
    workspace: DiagonosticContentTextKindType
    all: DiagonosticContentTextAll
}

type DiagnosticVisibilityType = {
    DiagnosticKind?: string,
    placeTextOnPreviousOrNextLine?: string,
    overrideLayoutPlaceholderColorToHighestSeverity?: boolean,
    overrideAllOk?: boolean,
    hideOk?: boolean,
    hideWarning?: boolean
}

type DiagnosticConfigType = {
    leftMargin?: string,
    visibility: DiagnosticVisibilityType
    okNotationTextStyle?: DecorationType.DecorationTextPrePostFixStyleConfig,
    okTextStyle?: DecorationType.DecorationTextStyleConfig
    problemPlaceholderContentText?: string,
    allOkPlaceholderContentText?: string,
    okEditorContentText?: string,
    okAllContentText?: string,
    warningNotationTextStyle?: DecorationType.DecorationTextPrePostFixStyleConfig,
    warningTextStyle?: DecorationType.DecorationTextStyleConfig
    warningWorkspaceContentText?: string,
    warningEditorContentText?: string,
    errorNotationTextStyle?: DecorationType.DecorationTextPrePostFixStyleConfig,
    errorTextStyle?: DecorationType.DecorationTextStyleConfig
    errorWorkspaceContentText?: string,
    errorEditorContentText?: string
}

type DiagnosticTextStateBodyStyleFunc = (config: DecorationType.DecorationTextStyleConfig) => void

type DiagnosticOfType = {
    [k in DIAGNOSTIC_CONTENT_TEXT_KEY]: DiagonosticTextFunc
}

type DiagonosticTextContext = {
    allok: any, 
    editor: any, 
    workspace: any
    placeholder: DiagonosticTextStateTextEntryType,
    state: DiagnosticStateType['workspace']
}

type DiagonosticTextFunc = Record<string, Symbol | ((context: DiagonosticTextContext) => string | undefined | any) >;

type BindDiagnosticContentTextStateType = {
    diagnosticOf: any,
    diagnosticContentTextInfo: DiagnosticContentTextType
}

type DiagonosticTextStateTextType = {
    okPrefixPostfixText?: DiagonosticTextStateTextEntryType;
    warningPrefixPostfixText?: DiagonosticTextStateTextEntryType;
    errorPrefixPostfixText?: DiagonosticTextStateTextEntryType;
}

type DiagonosticTextStateTextEntryType = {
    prefix?: string
    postfix?: string
}

type DiagonosticStateDecorationType = {
    okContentText?: vscode.TextEditorDecorationType[];
    warningContentText?: vscode.TextEditorDecorationType[];
    errorContentText?: vscode.TextEditorDecorationType[];
}

type ContentTextWithPositionType = {
    contentText?: (string | StatusType.ContentTextFuncSignature)[],
    position: {}
}

interface DiagnosticContext {
    state: DiagnosticStateType,
    textState: DiagnosticContentTextType,
    diagnosticVisibility: DiagnosticVisibilityType
}

type BuildDiagonosticDecorationType = (context: DiagnosticContext) => any[]


