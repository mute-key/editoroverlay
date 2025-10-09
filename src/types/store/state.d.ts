/**
 *
 */
import type * as D from '../type/type';
import * as vscode from 'vscode';
import * as hex from '../constant/numeric/hexadecimal';
import * as bin from '../constant/numeric/binary';
export declare const INDENT_INFO: {
    size: undefined;
    type: undefined;
    regex: undefined;
};
export declare const DECORATION_STATE: {
    eventTrigger: D.Numeric.Key.Hex[];
    appliedHighlight: D.Numeric.Key.Hex[];
    diagnosticSignature: D.Numeric.Key.Bin[];
    previousLine: number[];
};
export declare const SELECTION_KIND_LIST: D.Numeric.Key.Hex[];
export declare const SELECTION_KIND_LIST_EXCLUDE_MULTI_CURSOR: D.Numeric.Key.Hex[];
export declare const HIGHLIGHT_STYLE_LIST: {
    [hex.reset]: vscode.TextEditorDecorationType[];
    [hex.cursorOnly]: vscode.TextEditorDecorationType[];
    [hex.singleLine]: vscode.TextEditorDecorationType[];
    [hex.multiLine]: vscode.TextEditorDecorationType[];
    [hex.multiCursor]: vscode.TextEditorDecorationType[];
};
export declare const HIGHLIGHT_BORDER_POSITION_INFO: {
    [hex.cursorOnly]: undefined;
    [hex.singleLine]: undefined;
    [hex.multiLine]: undefined;
    [hex.multiCursor]: undefined;
};
export declare const DIAGNOSTIC_STATE: {
    override: number;
    severity: number;
    editor: {
        warning: {
            line: never[];
            total: number;
        };
        error: {
            line: never[];
            total: number;
        };
    };
    workspace: {
        warning: {
            source: number;
            total: number;
        };
        error: {
            source: number;
            total: number;
        };
    };
};
export declare const CONTENT_TEXT: {
    contentText: never[];
    position: never[];
};
export declare const CONTENT_TEXT_POSITION_KEY: {
    contentText: string[];
    position: {};
};
export declare const SELECTION_CONTENT_TEXT: D.Status.Intf.StatusContentText;
export declare const DIAGNOSTIC_CONTENT_TEXT: {
    [bin.allOkOverride]: any[];
    [bin.allOkNoOverride]: any[];
    [bin.editorOkWorkspaceWarn]: any[];
    [bin.editorOkWorkspaceErr]: any[];
    [bin.editorOkWorkspaceWarnErr]: any[];
    [bin.editorWarnWorkspaceWarn]: any[];
    [bin.editorWarnWorkspaceErr]: any[];
    [bin.editorWarnWorkspaceWarnErr]: any[];
    [bin.editorErrWorkspaceErr]: any[];
    [bin.editorErrWorkspaceWarnErr]: any[];
    [bin.editorWarnErrWorkspaceWarnErr]: any[];
};
export declare const DIAGNOSTIC_GLYPH: {
    [hex.openningBracket]: undefined;
    [hex.closingBracket]: undefined;
    [hex.lineEqual]: undefined;
    [hex.lineUp]: undefined;
    [hex.lineDown]: undefined;
};
export declare const DIAGNOSTIC_ENTRY_LIST: D.Numeric.Key.Bin[];
export declare const DIAGNOSTIC_EDITOR_CONTENT_TEXT_KEYSET: {
    [hex.okContentText]: D.Numeric.Key.Hex;
    [hex.warningContentText]: D.Numeric.Key.Hex;
    [hex.errorContentText]: D.Numeric.Key.Hex;
};
export declare const DIAGNOSTIC_WORKSPACE_CONTENT_TEXT_KEYSET: {
    [hex.okContentText]: D.Numeric.Key.Hex;
    [hex.warningContentText]: D.Numeric.Key.Hex;
    [hex.errorContentText]: D.Numeric.Key.Hex;
};
export declare const WORKSPACE_STATE: {
    os: undefined;
    isSourceControlled: boolean;
    currentWorkspaceRoot: undefined;
    uriPathProp: undefined;
    crossOSWorkspace: undefined;
    repository: Map<any, any>;
    workspacePath: never[];
};
export declare const WORKSPACE_ENV_UTIL: {
    shell: undefined;
    extRoot: undefined;
    dirDivider: undefined;
    iconRoot: undefined;
    lineBreak: undefined;
    pathSplit: undefined;
    directoryToUri: undefined;
    execFunc: undefined;
};
export declare const REPOSITORY_INFO: {
    isModified: boolean;
    relativePath: undefined;
    currentBranch: undefined;
    ignored: never[];
    parsed: never[];
};
export declare const CURRENT_EDITOR_SCM_STATE: {
    parsed: boolean;
    uri: undefined;
    isActive: boolean;
    branchName: undefined;
    branchStatus: undefined;
    additionalInfo: undefined;
};
export declare const SCM_OVERLAY_REFERENCE: {
    svgIcon: {};
    range: {};
    branchName: {
        contentText: string[];
        position: {};
    };
    branchStatus: {
        contentText: string[];
        position: {};
    };
};
