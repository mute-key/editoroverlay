import * as vscode from 'vscode';
import { Regex } from './type';

export type {
    Intf, Tp
};

declare namespace Intf {
    interface Base {
        [key: string]: RegExp
    }

    interface DiagnosticAllOkText extends Base {
        allok: RegExp
    }

    interface DiagnosticProblemText extends Base {
        editor: RegExp
        workspace: RegExp
    }

    interface DiagnosticNotationText extends Base {
        pre: RegExp
        post: RegExp
    }

    interface DiagnosticWorkspace extends Base {
        pre: RegExp
        post: RegExp
        src: RegExp
        wrn: RegExp
    }

    interface DiagnosticEditor extends Base {
        pre: RegExp
        post: RegExp
        err: RegExp
    }

    interface CursorOnlyText extends Base {
        col: RegExp
        zCol: RegExp
        ln: RegExp
    }

    interface SingleLineText extends Base {
        char: RegExp
        ln: RegExp
    }

    interface MultiLineCursorText extends Base {
        lc: RegExp
        ln: RegExp
        char: RegExp,
        charOnly: RegExp
    }

    interface MultiLineAnchorText extends Base {
        lc: RegExp
        ln: RegExp
        char: RegExp
        charOnly: RegExp
    }

    interface MultiCursorText extends Base {
        nth: RegExp
        count: RegExp
        lc: RegExp
        ln: RegExp
        char: RegExp
    }
    interface MultiCursorEdit extends Base {
        nth: RegExp
        count: RegExp
        col: RegExp
        zCol: RegExp
        ln: RegExp
    }
}

declare namespace Tp {
    type SelectionRegexObject = Record<string, Record<string, RegExp>>;

    type DiagnosticRegexObject = Record<string, DiagnosticContentTextUnion>

    type ConfigurationRegexObject = SelectionRegexObject | DiagnosticRegexObject

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

