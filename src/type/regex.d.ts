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

    interface CursorOnlyStatusText {
        col: RegExp
        zCol: RegExp
        ln: RegExp
    }

    interface SingleLineStatusText {
        char: RegExp
        ln: RegExp
    }

    interface MultiLineCursorStatusText {
        lc: RegExp
        ln: RegExp
        char: RegExp,
        charOnly: RegExp
    }

    interface MultiLineAnchorStatusText {
        lc: RegExp
        ln: RegExp
        char: RegExp
        charOnly: RegExp
    }

    interface MultiCursorStatusText {
        nth: RegExp
        count: RegExp
        lc: RegExp
        ln: RegExp
        char: RegExp
    }
}

declare namespace Tp {
    type DiagnosticContentTextUnion = Intf.DiagnosticNotationText
        | Intf.DiagnosticWorkspace
        | Intf.DiagnosticEditor
        | Intf.DiagnosticAllOkText
        | Intf.DiagnosticProblemText

    type StatusContentTextUnion = Intf.CursorOnlyStatusText
        | Intf.SingleLineStatusText
        | Intf.MultiLineCursorStatusText
        | Intf.MultiLineAnchorStatusText
        | Intf.MultiCursorStatusText
}

export type {
    Intf, Tp
};