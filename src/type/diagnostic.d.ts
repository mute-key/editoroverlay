import * as vscode from 'vscode';
import { DIAGNOSTIC_CONTENT_TEXT_KEY } from 'src/constant/config/enum';

import type * as Status from './status';
import type * as Decoration from './decoration';
import type * as Regex from './regex';

export type {
    Intf,
    Tp
};

declare namespace Intf {

}

declare namespace Intf {
    interface DiagnosticContentText {
        [key: number]: any[]
    }

    interface LineGlyph {
        [key: number]: any[]
    }

    interface DiagnosticVisibility {
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

    interface DiagnosticFsBind {
        [key: string]: vscode.Diagnostic[]
    }

    interface DiagnosticSource {
        [key: string]: DiagnosticFsBind
    }

    interface DiagonosticDecorationStyle {
        leftMargin: string,
        diagnosticDecorationOptionReady: Decoration.Intf.RenderOption[],
        diagnosticDecorationText: DiagonosticTextStateTextType
        diagnosticDecorationOption: {
            okTextStyle?: Decoration.Intf.RenderOption,
            okPrefixPostfixTextStyle?: Decoration.Intf.RenderOption,
            warningTextStyle?: Decoration.Intf.RenderOption,
            warningPrefixPostfixTextStyle?: Decoration.Intf.RenderOption,
            errorTextStyle?: Decoration.Intf.RenderOption,
            errorPrefixPostfixTextStyle?: Decoration.Intf.RenderOption,
        };
    }

    interface DiagonosticTextStateTextType {
        okNotationText?: DiagonosticTextStateTextEntryType;
        warningNotationText?: DiagonosticTextStateTextEntryType;
        errorNotationText?: DiagonosticTextStateTextEntryType;
    }

    interface DiagonosticTextStateTextEntryType {
        prefix?: string
        postfix?: string
    }

    interface DiagonosticStateDecorationType {
        okContentText?: vscode.TextEditorDecorationType[];
        warningContentText?: vscode.TextEditorDecorationType[];
        errorContentText?: vscode.TextEditorDecorationType[];
    }

    interface ContentTextWithPosition {
        contentText?: (string | symbol | number | Status.Tp.ContentTextFuncSignature)[],
        position: {}
    }

    interface RegexDiagnosticContentTextType {
        [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_PROBLEM_CONTENT_TEXT]: Regex.Intf.DiagnosticProblemText,
        [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_ALL_OK_CONTENT_TEXT]: Regex.Intf.DiagnosticAllOkText,
        [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_ALL_CONTENT_TEXT]: Regex.Intf.DiagnosticNotationText,
        [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_WORKSPACE_CONTENT_TEXT]: Regex.Intf.DiagnosticNotationText,
        [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_EDITOR_CONTENT_TEXT]: Regex.Intf.DiagnosticNotationText,
        [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_WORKSPACE_CONTENT_TEXT]: Regex.Intf.DiagnosticWorkspace,
        [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_EDITOR_CONTENT_TEXT]: Regex.Intf.DiagnosticEditor,
        [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_WORKSPACE_CONTENT_TEXT]: Regex.Intf.DiagnosticWorkspace,
        [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_EDITOR_CONTENT_TEXT]: Regex.Intf.DiagnosticEditor,
    }

    interface DiagnosticOkTextType {
        contentText: (string | any)[]
        position: {
            pre?: number
            post?: number
        }
    }

    interface DiagnosticWarningTextType {
        contentText?: string[]
        position: {
            pre?: number
            post?: number
            src?: number
            wrn?: number
        }
    }

    interface DiagnosticErrorTextType {
        contentText?: string[]
        position: {
            pre?: number
            post?: number
            src?: number
            err?: number
        }
    }

    interface DiagnosticConfig {
        enabled?: boolean
        leftMargin?: string
        visibility: Intf.DiagnosticVisibility
        okNotationTextStyle?: Decoration.Intf.DecorationTextPrePostFixStyleConfig
        okTextStyle?: Decoration.Intf.DecorationTextStyleConfig
        problemPlaceholderContentText?: string
        allOkPlaceholderContentText?: string
        okEditorContentText?: string
        allOkContentText?: string
        warningNotationTextStyle?: Decoration.Intf.DecorationTextPrePostFixStyleConfig
        warningTextStyle?: Decoration.Intf.DecorationTextStyleConfig
        warningWorkspaceContentText?: string
        warningEditorContentText?: string
        errorNotationTextStyle?: Decoration.Intf.DecorationTextPrePostFixStyleConfig
        errorTextStyle?: Decoration.Intf.DecorationTextStyleConfig
        errorWorkspaceContentText?: string
        errorEditorContentText?: string
    }

    interface DiagnosticSignatureFuncContext {
        state: number[][],
        line: number
    }
}

declare namespace Tp {
    type DiagnosticSignatureFuncSign = (context: Intf.DiagnosticSignatureFuncContext) => string

    type DiagnosticTextStateBodyStyleFunc = (config: Decoration.Intf.DecorationTextStyleConfig) => void
}

// type BuildDiagonosticDecorationType = (context: DiagnosticContext) => any[]