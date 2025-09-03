import * as vscode from 'vscode';

export type {
    Intf, Tp
};

declare namespace Intf {
    interface DiagnosticAllOkText {
        allok: RegExp
    }

    interface DiagnosticProblemText {
        editor: RegExp
        workspace: RegExp
    }

    interface DiagnosticNotationText {
        pre: RegExp
        post: RegExp
    }

    interface DiagnosticWorkspace {
        pre: RegExp
        post: RegExp
        src: RegExp
        wrn: RegExp
    }

    interface DiagnosticEditor {
        pre: RegExp
        post: RegExp
        err: RegExp
    }

    interface CursorOnlyText {
        col: RegExp
        zCol: RegExp
        ln: RegExp
    }

    interface SingleLineText {
        char: RegExp
        ln: RegExp
    }

    interface MultiLineCursorText {
        lc: RegExp
        ln: RegExp
        char: RegExp,
        charOnly: RegExp
    }

    interface MultiLineAnchorText {
        lc: RegExp
        ln: RegExp
        char: RegExp
        charOnly: RegExp
    }

    interface MultiCursorText {
        nth: RegExp
        count: RegExp
        lc: RegExp
        ln: RegExp
        char: RegExp
    }
    interface MultiCursorEdit {
        nth: RegExp
        count: RegExp
        col: RegExp
        zCol: RegExp
        ln: RegExp
    }
}

declare namespace Tp {
    type DiagnosticContentTextUnion = Intf.DiagnosticNotationText
        | Intf.DiagnosticWorkspace
        | Intf.DiagnosticEditor
        | Intf.DiagnosticAllOkText
        | Intf.DiagnosticProblemText

    type StatusContentTextUnion = Intf.CursorOnlyText
        | Intf.SingleLineText
        | Intf.MultiLineCursorText
        | Intf.MultiLineAnchorText
        | Intf.MultiCursorText
        | Intf.MultiCursorEdit
}

