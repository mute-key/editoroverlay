import { SELECTION_CONTENT_TEXT_CONFIG_KEY, SELECTION_TYPE } from "./enum";

export const reset = Symbol(SELECTION_TYPE.RESET);
export const cursorOnly = Symbol(SELECTION_TYPE.CURSOR_ONLY);
export const singleLine = Symbol(SELECTION_TYPE.SINGLE_LINE);
export const multiLine = Symbol(SELECTION_TYPE.MULTI_LINE);
export const multiCursor = Symbol(SELECTION_TYPE.MULTI_CURSOR);

export const cursorOnlyText = Symbol(SELECTION_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT);
export const singleLineText = Symbol(SELECTION_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT);
export const multiLineCursorText = Symbol(SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT);
export const multiLineAnchorText = Symbol(SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT);
export const multiCursorText = Symbol(SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT);

export const all = Symbol('all');
export const okAllContentText = Symbol("all.okAllContentText");

export const layout = Symbol('layout');
export const allOkPlaceholderContentText = Symbol("layout.allOkPlaceholderContentText");
export const problemPlaceholderContentText = Symbol("layout.problemPlaceholderContentText");

export const editor = Symbol('editor');
export const okEditorContentText = Symbol("editor.okEditorContentText");
export const errorEditorContentText = Symbol("editor.errorEditorContentText");
export const warningEditorContentText = Symbol("editor.warningEditorContentText");

export const workspace = Symbol('workspace');
export const okWorkspaceContentText = Symbol("workspace.okWorkspaceContentText");
export const warningWorkspaceContentText = Symbol("workspace.warningWorkspaceContentText");
export const errorWorkspaceContentText = Symbol("workspace.errorWorkspaceContentText");

