import * as vscode from 'vscode';
import * as Decoration from './decoration.d';
import * as StatusType from './status.d';
import { DIAGNOSTIC_CONTENT_TEXT_KEY } from 'src/constant/config/enum';

export namespace type {
    type DiagnosticSourceType = {
        [key: string]: {
            [key: string]: vscode.Diagnostic[]
        }
    }

    type DiagonosticDecorationStyle = {
        leftMargin: string,
        diagonosticDecorationOptionReady: Decoration.type.DecorationRenderOptionType[],
        diagonosticDecorationText: DiagonosticTextStateTextType
        diagonosticDecorationOption: {
            okTextStyle?: Decoration.type.DecorationRenderOptionType,
            okPrefixPostfixTextStyle?: Decoration.type.DecorationRenderOptionType,
            warningTextStyle?: Decoration.type.DecorationRenderOptionType,
            warningPrefixPostfixTextStyle?: Decoration.type.DecorationRenderOptionType,
            errorTextStyle?: Decoration.type.DecorationRenderOptionType,
            errorPrefixPostfixTextStyle?: Decoration.type.DecorationRenderOptionType,
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

    type DiagnosticVisibilityType = {
        displayWhenCursorOnly?: boolean,
        displayWhenSingleLine?: boolean,
        displayWhenMultiLine?: boolean,
        displayWhenMultiCursor?: boolean,
        DiagnosticKind?: string,
        placeTextOnPreviousOrNextLine?: string,
        overrideLayoutPlaceholderColorToHighestSeverity?: boolean,
        overrideAllOk?: boolean,
        hideOk?: boolean,
        hideWarning?: boolean
    }

    type DiagnosticConfigType = {
        enabled?: boolean
        leftMargin?: string
        visibility: DiagnosticVisibilityType
        okNotationTextStyle?: Decoration.type.DecorationTextPrePostFixStyleConfig
        okTextStyle?: Decoration.type.DecorationTextStyleConfig
        problemPlaceholderContentText?: string
        allOkPlaceholderContentText?: string
        okEditorContentText?: string
        allOkContentText?: string
        warningNotationTextStyle?: Decoration.type.DecorationTextPrePostFixStyleConfig
        warningTextStyle?: Decoration.type.DecorationTextStyleConfig
        warningWorkspaceContentText?: string
        warningEditorContentText?: string
        errorNotationTextStyle?: Decoration.type.DecorationTextPrePostFixStyleConfig
        errorTextStyle?: Decoration.type.DecorationTextStyleConfig
        errorWorkspaceContentText?: string
        errorEditorContentText?: string
    }

    type DiagnosticTextStateBodyStyleFunc = (config: Decoration.type.DecorationTextStyleConfig) => void

    type DiagonosticTextStateTextType = {
        okNotationText?: DiagonosticTextStateTextEntryType;
        warningNotationText?: DiagonosticTextStateTextEntryType;
        errorNotationText?: DiagonosticTextStateTextEntryType;
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
        contentText?: (string | symbol | number | StatusType.type.ContentTextFuncSignature)[],
        position: {}
    }
}

// type BuildDiagonosticDecorationType = (context: DiagnosticContext) => any[]