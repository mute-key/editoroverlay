/**
 * 
 */

import type * as D from '../type/type';

import * as vscode from 'vscode';
import * as hex from '../constant/numeric/hexadecimal';
import * as bin from '../constant/numeric/binary';

import { DIAGNOSTIC_PROBLEM_LIST_CONFIG } from '../constant/config/object';

// ==============================================================================
// [ RUNTIME STORE/STATE OBJECT DEFINITIONS ]
// ==============================================================================

export const INDENT_INFO = {
    size: undefined,
    type: undefined,
    regex: undefined
};

export const DECORATION_STATE = {
    eventTrigger: [0] as D.Numeric.Key.Hex[],
    appliedHighlight: [0] as D.Numeric.Key.Hex[],
    diagnosticSignature: [0] as D.Numeric.Key.Bin[],
    previousLine: [0] as number[],
};

export const SELECTION_KIND_LIST = [
    hex.cursorOnly,
    hex.singleLine,
    hex.multiLine,
    hex.multiCursor,
];

export const SELECTION_KIND_LIST_EXCLUDE_MULTI_CURSOR = [
    hex.cursorOnly,
    hex.singleLine,
    hex.multiLine,
];

export const HIGHLIGHT_STYLE_LIST = {
    [hex.reset]: [] as vscode.TextEditorDecorationType[],
    [hex.cursorOnly]: [] as vscode.TextEditorDecorationType[],
    [hex.singleLine]: [] as vscode.TextEditorDecorationType[],
    [hex.multiLine]: [] as vscode.TextEditorDecorationType[],
    [hex.multiCursor]: [] as vscode.TextEditorDecorationType[]
};

export const HIGHLIGHT_BORDER_POSITION_INFO = {
    [hex.cursorOnly]: undefined,
    [hex.singleLine]: undefined,
    [hex.multiLine]: undefined,
    [hex.multiCursor]: undefined
};

export const DIAGNOSTIC_STATE = {
    override: 0,
    severity: 0,
    editor: {
        warning: {
            line: [],
            total: 0
        },
        error: {
            line: [],
            total: 0
        }
    },
    workspace: {
        warning: {
            source: 0,
            total: 0
        },
        error: {
            source: 0,
            total: 0
        }
    }
};

export const CONTENT_TEXT = {
    contentText: [],
    position: []
};

export const SELECTION_CONTENT_TEXT: D.Status.Intf.StatusContentText = {
    [hex.cursorOnlyText]: CONTENT_TEXT,
    [hex.singleLineText]: CONTENT_TEXT,
    [hex.multiLineCursorText]: CONTENT_TEXT,
    [hex.multiLineAnchorText]: CONTENT_TEXT,
    [hex.multiCursorText]: CONTENT_TEXT,
    [hex.multiCursorEdit]: CONTENT_TEXT,
};

export const DIAGNOSTIC_CONTENT_TEXT = {
    [bin.allOkOverride]: [] as any[],
    [bin.allOkNoOverride]: [] as any[],
    [bin.editorOkWorkspaceWarn]: [] as any[],
    [bin.editorOkWorkspaceErr]: [] as any[],
    [bin.editorOkWorkspaceWarnErr]: [] as any[],
    [bin.editorWarnWorkspaceWarn]: [] as any[],
    [bin.editorWarnWorkspaceErr]: [] as any[],
    [bin.editorWarnWorkspaceWarnErr]: [] as any[],
    [bin.editorErrWorkspaceErr]: [] as any[],
    [bin.editorErrWorkspaceWarnErr]: [] as any[],
    [bin.editorWarnErrWorkspaceWarnErr]: [] as any[],
};

export const DIAGNOSTIC_GLYPH = {
    [hex.openningBracket]: undefined,
    [hex.closingBracket]: undefined,
    [hex.lineEqual]: undefined,
    [hex.lineUp]: undefined,
    [hex.lineDown]: undefined,
};

export const DIAGNOSTIC_ENTRY_LIST = [
    bin.allOkOverride,
    ...DIAGNOSTIC_PROBLEM_LIST_CONFIG
];

export const DIAGNOSTIC_EDITOR_CONTENT_TEXT_KEYSET = {
    [hex.okContentText]: hex.okEditorContentText,
    [hex.warningContentText]: hex.warningEditorContentText,
    [hex.errorContentText]: hex.errorEditorContentText
};

export const DIAGNOSTIC_WORKSPACE_CONTENT_TEXT_KEYSET = {
    [hex.okContentText]: hex.okWorkspaceContentText,
    [hex.warningContentText]: hex.warningWorkspaceContentText,
    [hex.errorContentText]: hex.errorWorkspaceContentText
};

export const WORKSPACE_STATE = {
    os: undefined,
    isSourceControlled: false,
    currentWorkspaceRoot: undefined,
    uriPathProp: undefined,
    crossOSWorkspace: false,
    repository: new Map,
    workspacePath: [],    
};

export const WORKSPACE_ENV_UTIL = {
    extRoot: undefined,
    dirDivider: undefined,
    iconRoot: undefined,
    lineBreak: undefined,
    pathSplit: undefined,
    directoryFunc: undefined
};

export const REPOSITORY_INFO = {
    isModified: false,
    relativePath: undefined,
    currentBranch: undefined,
    ignored: [],
    parsed: [],
};

export const CURRENT_EDITOR_SCM_STATE = {
    uri: undefined,
    isActive: false,
    branchName: undefined,
    branchStatus: undefined,
    additionalInfo: undefined
};

export const SCM_OVERLAY_REFERENCE = {
    svgIcon: undefined,
    range: undefined
};