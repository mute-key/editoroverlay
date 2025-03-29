import { DIAGNOSTIC_CONTENT_TEXT_KIND, SELECTION_CONTENT_TEXT_CONFIG_KEY, SELECTION_TYPE } from "./enum";

//::==============================================================================
//:: [ HIGHLIGHT/SELECTION SYMBOLS ] 0x0100
//::==============================================================================
export const enum HEX_SELECTION_TYPE {
    RESET = 0x0100,
    CURSOR_ONLY = 0x0101,
    SINGLE_LINE = 0x0102,
    MULTI_LINE = 0x0103,
    MULTI_CURSOR = 0x0104,
}

export const reset = HEX_SELECTION_TYPE.RESET as const;
export const cursorOnly = HEX_SELECTION_TYPE.CURSOR_ONLY as const;
export const singleLine = HEX_SELECTION_TYPE.SINGLE_LINE as const;
export const multiLine = HEX_SELECTION_TYPE.MULTI_LINE as const;
export const multiCursor = HEX_SELECTION_TYPE.MULTI_CURSOR as const;
//::==============================================================================
//::[ SELECTION STATUS SYMBOLS ] 0x0200
// ==============================================================================

export const enum HEX_SELECTION_TEXT {
    CURSOR_ONLY_TEXT = 0x0201,
    SINGLE_LINE_TEXT = 0x0202,
    MULTI_LINE_CURSOR_TEXT = 0x0203,
    MULTI_LINE_ANCHOR_TEXT = 0x0204,
    MULTI_CURSOR_TEXT = 0x0205,
}

export const enum HEX_MULTILINE_FN {
    LC = 0x0206,
    CHAR = 0x0207,
}

export const cursorOnlyText = HEX_SELECTION_TEXT.CURSOR_ONLY_TEXT as const;
export const singleLineText = HEX_SELECTION_TEXT.SINGLE_LINE_TEXT as const;
export const multiLineCursorText = HEX_SELECTION_TEXT.MULTI_LINE_CURSOR_TEXT as const;
export const multiLineAnchorText = HEX_SELECTION_TEXT.MULTI_LINE_ANCHOR_TEXT as const;
export const multiCursorText = HEX_SELECTION_TEXT.MULTI_CURSOR_TEXT as const;

export const multiLineLineCountSym = HEX_MULTILINE_FN.LC as const;
export const multiLineChararcterSym = HEX_MULTILINE_FN.CHAR as const;

//::==============================================================================
//::[ DIAGNOSTIC STATUS SYMBOLS ] 0x0300
//::==============================================================================

export const enum HEX_DIAGNOSTIC_CONTENT_TEXT_KIND {
    OK_CONTENT_TEXT = 0x0301,
    WARNING_CONTENT_TEXT = 0x0302,
    ERROR_CONTENT_TEXT = 0x0303,
}

export const enum HEX_DIAGNOSTIC_STATUS_TEXT_KIND {
    ALL = 0x0304,
    LAYOUT = 0x0305,
    EDITOR = 0x0306,
    WORKSPACE = 0x0307,
}

export const enum HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT {
    ALL_OK_ALL = 0x0308,
    LAYOUT_ALLOKPLACEHOLDER = 0x0309,
    LAYOUT_PROBLEMPLACEHOLDER = 0x0310,
    EDITOR_OK_EDITOR = 0x0311,
    EDITOR_ERROR_EDITOR = 0x0312,
    EDITOR_WARNING_EDITOR = 0x0313,
    WORKSPACE_OK_WORKSPACE = 0x0314,
    WORKSPACE_WARNING_WORKSPACE = 0x0315,
    WORKSPACE_ERROR_WORKSPACE = 0x0316,
}

export const okContentText = HEX_DIAGNOSTIC_CONTENT_TEXT_KIND.OK_CONTENT_TEXT as const;
export const warningContentText = HEX_DIAGNOSTIC_CONTENT_TEXT_KIND.WARNING_CONTENT_TEXT as const;
export const errorContentText = HEX_DIAGNOSTIC_CONTENT_TEXT_KIND.ERROR_CONTENT_TEXT as const;

export const all = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.ALL as const;
export const okAllContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.ALL_OK_ALL as const;

export const layout = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.LAYOUT as const;
export const allOkPlaceholderContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.LAYOUT_ALLOKPLACEHOLDER as const;
export const problemPlaceholderContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.LAYOUT_PROBLEMPLACEHOLDER as const;

export const editor = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.EDITOR as const;
export const okEditorContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.EDITOR_OK_EDITOR as const;
export const errorEditorContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.EDITOR_ERROR_EDITOR as const;
export const warningEditorContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.EDITOR_WARNING_EDITOR as const;

export const workspace = HEX_DIAGNOSTIC_STATUS_TEXT_KIND.WORKSPACE as const;
export const okWorkspaceContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.WORKSPACE_OK_WORKSPACE as const;
export const warningWorkspaceContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.WORKSPACE_WARNING_WORKSPACE as const;
export const errorWorkspaceContentText = HEX_DIAGNOSTIC_STATUS_TEXT_SPLIT.WORKSPACE_ERROR_WORKSPACE as const;

// import * as __0x from '../constant/numeric';


