"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);

// src/initialize.ts
var vscode17 = __toESM(require("vscode"));

// src/constant/config/object.ts
var vscode = __toESM(require("vscode"));

// src/constant/shared/numeric.ts
var reset = 256 /* RESET */;
var cursorOnly = 257 /* CURSOR_ONLY */;
var singleLine = 258 /* SINGLE_LINE */;
var multiLine = 259 /* MULTI_LINE */;
var multiCursor = 260 /* MULTI_CURSOR */;
var cursorOnlyText = 513 /* CURSOR_ONLY_TEXT */;
var singleLineText = 514 /* SINGLE_LINE_TEXT */;
var multiLineText = 515 /* MULTI_LINE_TEXT */;
var multiLineCursorText = 516 /* MULTI_LINE_CURSOR_TEXT */;
var multiLineAnchorText = 517 /* MULTI_LINE_ANCHOR_TEXT */;
var multiCursorText = 518 /* MULTI_CURSOR_TEXT */;
var multiCursorEdit = 519 /* MULTI_CURSOR_EDIT */;
var allOccurrence = 538 /* ALL_OCCURRENCE */;
var nextOccurrenceInit = 540 /* NEXT_OCCURRENCE_INIT */;
var nextOccurrence = 534 /* NEXT_OCCURRENCE */;
var cursorOnEndOfLines = 543 /* CURSOR_ON_END_OF_LINES */;
var movement = 537 /* MOVEMENT */;
var addCursor = 539 /* ADD_CURSOR */;
var multiLineLineCountHex = 544 /* LC */;
var multiLineChararcterHex = 545 /* CHAR */;
var multiLineChararcterOnlyHex = 546 /* CHAR_ONLY */;
var multiCursorLineNthHex = 560 /* NTH */;
var multiCursorLineCountHex = 561 /* COUNT */;
var multiCursorLineLineNumberHex = 562 /* LN */;
var multiCursorLineLineCountHex = 563 /* LC */;
var multiCursorLineCharacterHex = 564 /* CHAR */;
var stateOnlyControl = 576 /* STATE_ONLY */;
var indexOnlyControl = 577 /* INDEX_ONLY */;
var overlayControl = 578 /* OVERLAY_ONLY */;
var contextControl = 579 /* CONTEXT_ONLY */;
var okContentText = 769 /* OK_CONTENT_TEXT */;
var warningContentText = 770 /* WARNING_CONTENT_TEXT */;
var errorContentText = 771 /* ERROR_CONTENT_TEXT */;
var allOkPlaceholderContentText = 777 /* LAYOUT_ALLOKPLACEHOLDER */;
var problemPlaceholderContentText = 778 /* LAYOUT_PROBLEMPLACEHOLDER */;
var allOkContentText = 776 /* ALL_OK_ALL */;
var okEditorContentText = 779 /* EDITOR_OK */;
var warningEditorContentText = 780 /* EDITOR_WARNING */;
var errorEditorContentText = 781 /* EDITOR_ERROR */;
var okWorkspaceContentText = 782 /* WORKSPACE_OK */;
var warningWorkspaceContentText = 783 /* WORKSPACE_WARNING */;
var errorWorkspaceContentText = 784 /* WORKSPACE_ERROR */;
var allOkHexKey = 790 /* ALL_OK */;
var editorHexKey = 791 /* EDITOR */;
var workspaceHexKey = 792 /* WORKSPACE */;
var openningBracket = 793 /* OPENNING_BRACKET */;
var closingBracket = 794 /* CLOSING_BRACKET */;
var lineEqual = 795 /* LINE_EQUAL */;
var lineUp = 796 /* LINE_UP */;
var lineDown = 797 /* LINE_DOWN */;
var editorWarningTotal = 774 /* EDITOR */ + 786 /* WARNING */;
var editorErrorTotal = 774 /* EDITOR */ + 788 /* ERROR */;
var workspaceWarningSource = 775 /* WORKSPACE */ + 786 /* WARNING */ + 789 /* SOURCE */;
var workspaceWarningTotal = 775 /* WORKSPACE */ + 786 /* WARNING */ + 787 /* TOTAL */;
var workspaceErrorSource = 775 /* WORKSPACE */ + 788 /* ERROR */ + 789 /* SOURCE */;
var workspaceErrorTotal = 775 /* WORKSPACE */ + 788 /* ERROR */ + 787 /* TOTAL */;
var allOkOverride = 37 /* ALL_OK_OVERRIDE */;
var allOkNoOverride = 38 /* ALL_OK_NO_OVERRIDE */;
var editorOkWorkspaceWarn = 42 /* E_OK_W_WARN */;
var editorOkWorkspaceErr = 50 /* E_OK_W_ERR */;
var editorOkWorkspaceWarnErr = 58 /* E_OK_W_WARN_ERR */;
var editorWarnWorkspaceWarn = 74 /* E_WARN_W_WARN */;
var editorWarnWorkspaceErr = 82 /* E_WARN_W_ERR */;
var editorWarnWorkspaceWarnErr = 90 /* E_WARN_W_WARN_ERR */;
var editorErrWorkspaceErr = 146 /* E_ERR_W_ERR */;
var editorErrWorkspaceWarnErr = 154 /* E_ERR_W_WARN_ERR */;
var editorWarnErrWorkspaceWarnErr = 218 /* E_WARN_ERR_W_WARN_ERR */;
var noEvent = 4097 /* NO_EVENT */;
var diagnosticChanged = 4098 /* DIAGNOSTIC_CHANGED */;
var selectionChanged = 4099 /* SELECTION_CHANGED */;
var configruationCallerPreset = 4353 /* PRESET */;
var recurringLine0 = 1 /* TO_SHIFT_INDEX */ + 4 /* ON_BASELINE */;
var recurringLine1 = 1 /* TO_SHIFT_INDEX */;
var recurringLine2 = 4 /* ON_BASELINE */ + 8 /* AS_LAST_SELECTION */;
var recurringLine3 = 4 /* ON_BASELINE */;
var recurringLine4 = 8 /* AS_LAST_SELECTION */;
var recurringLine5 = 2 /* INDEX_SHIFTED */ + 4 /* ON_BASELINE */;
var recurringLine6 = 2 /* INDEX_SHIFTED */ + 8 /* AS_LAST_SELECTION */;
var recurringLine7 = 2 /* INDEX_SHIFTED */ + 4 /* ON_BASELINE */ + 8 /* AS_LAST_SELECTION */;
var recurringLine8 = 2 /* INDEX_SHIFTED */ + 16 /* NOT_AS_LAST_SELECTION */;
var recurringLine9 = 4 /* ON_BASELINE */ + 16 /* NOT_AS_LAST_SELECTION */;
var nonRecurringLine0 = 0 /* NOT_FOUND */;
var nonRecurringLine1 = 1 /* TO_SHIFT_INDEX */;
var nonRecurringLine2 = 2 /* INDEX_SHIFTED */;
var nonRecurringLine3 = 2 /* INDEX_SHIFTED */ + 1 /* TO_SHIFT_INDEX */;
var nonRecurringLine4 = 32 /* INIT */;

// src/constant/config/object.ts
var CONFIG_SECTION = {
  ["general" /* GENERAL */]: "general" /* GENERAL */,
  ["cursorOnly" /* CURSOR_ONLY */]: "cursorOnly" /* CURSOR_ONLY */,
  ["singleLine" /* SINGLE_LINE */]: "singleLine" /* SINGLE_LINE */,
  ["multiLine" /* MULTI_LINE */]: "multiLine" /* MULTI_LINE */,
  ["multiCursor" /* MULTI_CURSOR */]: "multiCursor" /* MULTI_CURSOR */,
  ["selectionText" /* SELECTION_TEXT */]: "selectionText" /* SELECTION_TEXT */,
  ["diagnosticText" /* DIAGNOSTIC_TEXT */]: "diagnosticText" /* DIAGNOSTIC_TEXT */
};
var CONFIG_INFO = {
  name: void 0,
  renderLimiter: void 0,
  updateCaller: void 0,
  generalConfigInfo: {
    borderOpacity: void 0,
    backgroundOpacity: void 0,
    selectionTextEnabled: void 0,
    diagnosticTextEnabled: void 0
  },
  configError: void 0
};
var CONFIG_KEY_LINKER_SECTION = {
  selectionTextEnabled: ["selectionText", "enabled"],
  diagnosticTextEnabled: ["diagnosticText", "enabled"]
};
var SELECTION_CONTENT_TEXT_NUMLINK = {
  ["cursorOnlyText" /* CURSOR_ONLY_TEXT */]: cursorOnlyText,
  ["singleLineText" /* SINGLE_LINE_TEXT */]: singleLineText,
  ["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */]: multiLineCursorText,
  ["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */]: multiLineAnchorText,
  ["multiCursorText" /* MULTI_CURSOR_TEXT */]: multiCursorText,
  ["multiCursorEdit" /* MULTI_CURSOR_EDIT */]: multiCursorEdit
};
var SELECTION_DECORAITON_CONFIG = {
  enabled: void 0,
  color: void 0,
  colorOpacity: void 0,
  backgroundColor: void 0,
  backgroundOpacity: void 0,
  fontStyle: void 0,
  fontWeight: void 0,
  leftMargin: void 0,
  cursorOnlyText: void 0,
  singleLineText: void 0,
  multiLineCursorText: void 0,
  multiLineAnchorText: void 0,
  multiCursorText: void 0,
  multiCursorEdit: void 0,
  selectionCountTextStyle: {
    ln: void 0,
    col: void 0,
    zCol: void 0,
    char: void 0,
    charOnly: void 0,
    lc: void 0,
    nth: void 0,
    count: void 0,
    opacity: void 0,
    fontStyle: void 0,
    fontWeight: void 0
  }
};
var DECORATION_STYLE_PREFIX = {
  [cursorOnly]: "cursorOnly",
  [singleLine]: "singleLine",
  [multiLine]: "multiLine",
  [multiCursor]: "multiCursor"
};
var SELECTION_CONTENT_TEXT_LIST = [
  "cursorOnlyText",
  "singleLineText",
  "multiLineCursorText",
  "multiLineAnchorText",
  "multiCursorText",
  "multiCursorEdit"
];
var SELECTION_DECORATION_STYLE = {
  leftMargin: void 0,
  placeholderDecorationOption: {},
  selectionDecorationOption: {
    ln: void 0,
    col: void 0,
    zCol: void 0,
    char: void 0,
    charOnly: void 0,
    lc: void 0,
    nth: void 0,
    count: void 0
  }
};
var DECORATION_OPTION_CONFIG = {
  isWholeLine: void 0,
  rangeBehavior: void 0,
  after: {}
};
var DECORATION_OPTION_AFTER_CONFIG = {
  contentText: void 0,
  color: void 0,
  backgroundColor: void 0,
  fontWeight: void 0,
  fontStyle: void 0,
  textDecoration: void 0,
  margin: void 0
};
var SELECTION_KIND = {
  [reset]: {
    KEY: reset,
    MASK: 15 /* RESET */
  },
  [cursorOnly]: {
    KEY: cursorOnly,
    MASK: 1 /* CURSOR_ONLY */
  },
  [singleLine]: {
    KEY: singleLine,
    MASK: 2 /* SINGLE_LINE */
  },
  [multiLine]: {
    KEY: multiLine,
    MASK: 4 /* MULTI_LINE */
  },
  [multiCursor]: {
    KEY: multiCursor,
    MASK: 8 /* MULTI_CURSOR */
  }
};
var DIAGNOSTIC_VISIBILITY_CONFIG = {
  DiagnosticKind: void 0,
  placeTextOnPreviousOrNextLine: void 0,
  overrideLayoutPlaceholderColorToHighestSeverity: void 0,
  overrideAllOk: void 0,
  autoInlineDatumPoint: void 0
};
var DIAGNOSTIC_GLYPH = {
  openningBracket: void 0,
  closingBracket: void 0,
  lineEqual: void 0,
  lineUp: void 0,
  lineDown: void 0
};
var DIAGNOSTIC_CONFIG = {
  enabled: void 0,
  leftMargin: void 0,
  visibility: DIAGNOSTIC_VISIBILITY_CONFIG,
  glyphList: DIAGNOSTIC_GLYPH,
  problemPlaceholderContentText: void 0,
  allOkPlaceholderContentText: void 0,
  allOkContentText: void 0,
  ["diagnosticPlaceholderTextStyle" /* DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE */]: void 0,
  ["okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */]: void 0,
  ["okTextStyle" /* OK_TEXT_STYLE */]: void 0,
  okWorkspaceContentText: void 0,
  okEditorContentText: void 0,
  ["warningNotationTextStyle" /* WARNING_NOTATION_TEXT_STYLE */]: void 0,
  ["warningTextStyle" /* WARNINGTEXT_STYLE */]: void 0,
  warningWorkspaceContentText: void 0,
  warningEditorContentText: void 0,
  ["errorNotationTextStyle" /* ERROR_NOTATION_TEXT_STYLE */]: void 0,
  ["errorTextStyle" /* ERROR_TEXT_STYLE */]: void 0,
  errorWorkspaceContentText: void 0,
  errorEditorContentText: void 0
};
var DIAGNOSTIC_EDITOR_PLACEHOLDER_LINKER = {
  ["okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */]: okEditorContentText,
  ["warningNotationTextStyle" /* WARNING_NOTATION_TEXT_STYLE */]: warningEditorContentText,
  ["errorNotationTextStyle" /* ERROR_NOTATION_TEXT_STYLE */]: errorEditorContentText
};
var DIAGNOSTIC_WORKSPACE_PLACEHOLDER_LINKER = {
  ["okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */]: okWorkspaceContentText,
  ["warningNotationTextStyle" /* WARNING_NOTATION_TEXT_STYLE */]: warningWorkspaceContentText,
  ["errorNotationTextStyle" /* ERROR_NOTATION_TEXT_STYLE */]: errorWorkspaceContentText
};
var DIAGNOSTIC_ALL_PLACEHOLDER_LINKER = {
  ["okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */]: allOkContentText
};
var DIAGNOSTIC_DECORATION_TEXT_KIND = {
  contentText: void 0,
  notation: void 0
};
var DECORATION_OPTION_LINKER = {
  allOkPlaceholderContentText: ["diagnosticPlaceholderTextStyle" /* DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE */, void 0],
  allOkContentText: ["okTextStyle" /* OK_TEXT_STYLE */, "okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */],
  problemPlaceholderContentText: ["diagnosticPlaceholderTextStyle" /* DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE */, void 0],
  okEditorContentText: ["okTextStyle" /* OK_TEXT_STYLE */, "okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */],
  warningEditorContentText: ["warningTextStyle" /* WARNINGTEXT_STYLE */, "warningNotationTextStyle" /* WARNING_NOTATION_TEXT_STYLE */],
  errorEditorContentText: ["errorTextStyle" /* ERROR_TEXT_STYLE */, "errorNotationTextStyle" /* ERROR_NOTATION_TEXT_STYLE */],
  okWorkspaceContentText: ["okTextStyle" /* OK_TEXT_STYLE */, "okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */],
  warningWorkspaceContentText: ["warningTextStyle" /* WARNINGTEXT_STYLE */, "warningNotationTextStyle" /* WARNING_NOTATION_TEXT_STYLE */],
  errorWorkspaceContentText: ["errorTextStyle" /* ERROR_TEXT_STYLE */, "errorNotationTextStyle" /* ERROR_NOTATION_TEXT_STYLE */]
};
var DIAGNOSTIC_CONTENT_TEXT_NAME_TO_NUM = {
  problemPlaceholderContentText,
  allOkPlaceholderContentText,
  allOkContentText,
  okEditorContentText,
  warningEditorContentText,
  errorEditorContentText,
  okWorkspaceContentText,
  warningWorkspaceContentText,
  errorWorkspaceContentText
};
var DIAGNOSTIC_STYLE_LIST = [
  ["okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */, "okTextStyle" /* OK_TEXT_STYLE */],
  ["warningNotationTextStyle" /* WARNING_NOTATION_TEXT_STYLE */, "warningTextStyle" /* WARNINGTEXT_STYLE */],
  ["errorNotationTextStyle" /* ERROR_NOTATION_TEXT_STYLE */, "errorTextStyle" /* ERROR_TEXT_STYLE */]
];
var DIAGNOSTIC_CONTENT_TEXT_LIST = [
  "problemPlaceholderContentText",
  "allOkPlaceholderContentText",
  "okWorkspaceContentText",
  "okEditorContentText",
  "allOkContentText",
  "warningWorkspaceContentText",
  "warningEditorContentText",
  "errorWorkspaceContentText",
  "errorEditorContentText"
];
var DIAGNOSTIC_SEVERITY_TO_KEY = {
  [vscode.DiagnosticSeverity.Warning]: "warning" /* WARNING */,
  [vscode.DiagnosticSeverity.Error]: "error" /* ERROR */,
  [vscode.DiagnosticSeverity.Information]: void 0,
  [vscode.DiagnosticSeverity.Hint]: void 0
};
var DIAGNOSTIC_DECORATION_STYLE = {
  leftMargin: void 0,
  diagnosticDecorationOption: {
    ["diagnosticPlaceholderTextStyle" /* DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE */]: void 0,
    ["okTextStyle" /* OK_TEXT_STYLE */]: void 0,
    ["okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */]: void 0,
    ["warningTextStyle" /* WARNINGTEXT_STYLE */]: void 0,
    ["warningNotationTextStyle" /* WARNING_NOTATION_TEXT_STYLE */]: void 0,
    ["errorTextStyle" /* ERROR_TEXT_STYLE */]: void 0,
    ["errorNotationTextStyle" /* ERROR_NOTATION_TEXT_STYLE */]: void 0
  }
};
var SINGLE_BORDER_SELECTION = {
  ["none" /* NONE */]: [
    0 /* NONE */
  ],
  ["bottom" /* BOTTOM */]: [
    2 /* BOTTOM */,
    0 /* NONE */
  ],
  ["top-bottom" /* TOP_BOTTOM */]: [
    10 /* TOP_BOTTOM */
  ],
  ["top-right-bottom-left" /* TOP_RIGHT_BOTTOM_LEFT */]: [
    15 /* TOP_RIGHT_BOTTOM_LEFT */,
    0 /* NONE */
  ],
  ["left" /* LEFT */]: [
    1 /* LEFT */
  ]
};
var MULTILINE_BORDER_SELECTION = {
  ["none" /* NONE */]: [
    0 /* NONE */,
    0 /* NONE */,
    0 /* NONE */
  ],
  ["top-bottom" /* TOP_BOTTOM */]: [
    8 /* TOP */,
    2 /* BOTTOM */,
    0 /* NONE */
  ],
  ["left" /* LEFT */]: [
    1 /* LEFT */,
    1 /* LEFT */,
    1 /* LEFT */
  ]
};
var BORDER_WIDTH_DEFINITION = {
  [cursorOnly]: SINGLE_BORDER_SELECTION,
  [singleLine]: SINGLE_BORDER_SELECTION,
  [multiLine]: MULTILINE_BORDER_SELECTION,
  [multiCursor]: SINGLE_BORDER_SELECTION
};
var NO_CONFIGURATION_DEOCORATION_DEFAULT = {
  ["isWholeLine" /* IS_WHOLE_LINE */]: false,
  ["borderWidth" /* BORDER_WIDTH */]: "2px",
  ["borderStyle" /* BORDER_STYLE */]: "dotted",
  ["borderColor" /* BORDER_COLOR */]: "#ff0000",
  ["borderPosition" /* BORDER_POSITION */]: "bottom",
  ["backgroundColor" /* BACKGROUND_COLOR */]: "#ff0000"
};
var NO_CONFIGURATION_GENERAL_DEFAULT = {
  ["borderOpacity" /* OPACITY */]: 1,
  ["backgroundOpacity" /* BACKGROUND_OPACITY */]: 0.5,
  ["selectionTextEnabled" /* SELECTION_TEXT_ENABLED */]: false
};
var SELECTION_DEFAULT = {
  ["selectionTextColor" /* SELECTION_TEXT_COLOR */]: "#FF0000",
  ["selectionTextOpacity" /* SELECTION_TEXT_OPACITY */]: 1,
  ["selectionTextBackgroundColor" /* SELECTION_TEXT_BACKGROUND_COLOR */]: null,
  ["selectionTextFontStyle" /* SELECTION_TEXT_FONT_STYLE */]: "normal",
  ["selectionTextFontWeight" /* SELECTION_TEXT_FONT_WEIGHT */]: "bold"
};

// src/constant/shared/object.ts
var INDENT_INFO = {
  size: void 0,
  type: void 0,
  regex: void 0
};
var DECORATION_STATE = {
  appliedHighlight: [0],
  diagnosticSignature: [0],
  eventTrigger: [0],
  previousLine: [0]
};
var SELECTION_KIND_LIST = [
  cursorOnly,
  singleLine,
  multiLine,
  multiCursor
];
var HIGHLIGHT_STYLE_LIST = {
  [reset]: [],
  [cursorOnly]: [],
  [singleLine]: [],
  [multiLine]: [],
  [multiCursor]: []
};
var HIGHLIGHT_BORDER_POSITION_INFO = {
  [cursorOnly]: void 0,
  [singleLine]: void 0,
  [multiLine]: void 0,
  [multiCursor]: void 0
};
var DIAGNOSTIC_STATE = {
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
var SELECTION_CONTENT_TEXT = {
  [cursorOnlyText]: void 0,
  [singleLineText]: void 0,
  [multiLineCursorText]: void 0,
  [multiLineAnchorText]: void 0,
  [multiCursorText]: void 0,
  [multiCursorEdit]: void 0
};
var DIAGNOSTIC_CONTENT_TEXT = {
  [allOkOverride]: [],
  [allOkNoOverride]: [],
  [editorOkWorkspaceWarn]: [],
  [editorOkWorkspaceErr]: [],
  [editorOkWorkspaceWarnErr]: [],
  [editorWarnWorkspaceWarn]: [],
  [editorWarnWorkspaceErr]: [],
  [editorWarnWorkspaceWarnErr]: [],
  [editorErrWorkspaceErr]: [],
  [editorErrWorkspaceWarnErr]: [],
  [editorWarnErrWorkspaceWarnErr]: []
};
var DIAGNOSTIC_PROBLEM_LIST = [
  allOkNoOverride,
  editorOkWorkspaceWarn,
  editorOkWorkspaceErr,
  editorOkWorkspaceWarnErr,
  editorWarnWorkspaceWarn,
  editorWarnWorkspaceErr,
  editorWarnWorkspaceWarnErr,
  editorErrWorkspaceErr,
  editorErrWorkspaceWarnErr,
  editorWarnErrWorkspaceWarnErr
];
var DIAGNOSTIC_GLYPH2 = {
  [openningBracket]: void 0,
  [closingBracket]: void 0,
  [lineEqual]: void 0,
  [lineUp]: void 0,
  [lineDown]: void 0
};
var DIAGNOSTIC_ENTRY_LIST = [
  allOkOverride,
  ...DIAGNOSTIC_PROBLEM_LIST
];
var DIAGNOSTIC_EDITOR_CONTENT_TEXT_KEYSET = {
  [okContentText]: okEditorContentText,
  [warningContentText]: warningEditorContentText,
  [errorContentText]: errorEditorContentText
};
var DIAGNOSTIC_WORKSPACE_CONTENT_TEXT_KEYSET = {
  [okContentText]: okWorkspaceContentText,
  [warningContentText]: warningWorkspaceContentText,
  [errorContentText]: errorWorkspaceContentText
};

// src/editor/range.ts
var vscode2 = __toESM(require("vscode"));
var rangeMetadata = {
  diagnosticLineDelta: 1,
  autoInlineDatumPoint: 0,
  datumPointOfEditor: 0
};
var setAutoInlineDatumPoint = (percentage) => rangeMetadata.autoInlineDatumPoint = percentage;
var updateRangeMetadata = (editor2) => {
  let lc = editor2.document.lineCount;
  const length = [];
  while (lc--) {
    length.push(editor2.document.lineAt(lc).range.end.character);
  }
  rangeMetadata.datumPointOfEditor = Math.ceil(Math.max(...length) * (rangeMetadata.autoInlineDatumPoint / 100));
};
var checkRangeLengthDatum = (editor2, delta) => {
  const nextLineLength = editor2.document.lineAt(editor2.selection.end.line + delta).range.end.character;
  const currentLineLineLength = editor2.document.lineAt(editor2.selection.end.line).range.end.character;
  return nextLineLength > currentLineLineLength && nextLineLength > rangeMetadata.datumPointOfEditor;
};
var checkEndOfDocDelta = (editor2, delta) => editor2.selection.end.line + delta === editor2.document.lineCount;
var createRangeSPEP = (start, end) => new vscode2.Range(start, end);
var createCursorRange = (editor2) => {
  const position = new vscode2.Position(editor2.selection.end.line, editor2.selection.end.character);
  return new vscode2.Range(position, position);
};
var createCursorRangeLine = (lineDelta) => (editor2) => {
  return editor2.document.lineAt(editor2.selection.end.line + (checkEndOfDocDelta(editor2, lineDelta) ? 0 : rangeMetadata.diagnosticLineDelta)).range;
};
var createCursorRangeLineAuto = (lineDelta) => (editor2) => {
  return editor2.document.lineAt(editor2.selection.end.line + (checkEndOfDocDelta(editor2, lineDelta) ? 0 : checkRangeLengthDatum(editor2, lineDelta) ? 0 : 1)).range;
};
var createLineRange = (position) => new vscode2.Range(position, position);
var createLineSelection = (position) => new vscode2.Selection(position, position);
var sortBasedEndLine = (a, b) => a.end.line - b.end.line;
var isEmptyRange = (selection) => selection.isEmpty;
var hasEmptyRange = (selections) => selections.find(isEmptyRange) !== void 0;
var blankRange = [];
var ifRangesNeedSort = (selection, index, selections) => index === 0 || selections[index - 1].end.line <= selection.end.line;
var rangeToCursor = (selection) => createLineSelection(selection.end);

// src/editor/editor.ts
var vscode6 = __toESM(require("vscode"));

// src/collection/regex.ts
var prefix = /(\${pre})/s;
var postfix = /(\${post})/s;
var source = /(\${src})/s;
var warning = /(\${wrn})/s;
var error = /(\${err})/s;
var editor = /(\${editor})/s;
var workspace = /(\${workspace})/s;
var allok = /(\${allok})/s;
var column = /(\${col})/s;
var zeroColumn = /(\${zCol})/s;
var lineCount = /(\${lc})/s;
var lineNumber = /(\${ln})/s;
var character = /(\${char})/s;
var characterOnly = /(\${charOnly})/s;
var nth = /(\${nth})/s;
var selectionCount = /(\${count})/s;
var indentAndEOLRegex = (indentSize) => new RegExp(`^( {${indentSize}}|[\r
]+)*`, "gm");
var ifStringIsResourceScope = /^[%\.].*[%\.]$/s;
var tabAndEOLRegex = /(\t|[\r\n]+)*$/gm;
var ifContentTextHasPlaceholder = /(\${[A-z]*})/g;
var contentTextKeysOnly = /\${([^{}]+)}/s;

// src/editor/status/selection.ts
var vscode3 = __toESM(require("vscode"));

// src/editor/status/selection/stateHandlers.ts
var increaseIndex = (state) => {
  state.cursorIndex++;
  state.overlayIndex++;
};
var toEmptySelections = (selections) => [...selections].map(rangeToCursor);
var sortSelection = (selections) => [...selections].sort(sortBasedEndLine);
var sortSelectionsIfNeeded = (editor2) => editor2.selections.every(ifRangesNeedSort) && mutateSelections(editor2, sortSelection);
var normalizeToEmptySelections = (editor2) => hasEmptyRange(editor2.selections) && mutateSelections(editor2, toEmptySelections);
var mutateSelections = (editor2, mutation) => {
  editor2.selections = mutation(editor2.selections);
  return true;
};
var pushCursorIndex = {
  sign: overlayControl,
  body: (overlay, indexList) => {
    let l = overlay.calibration;
    while (l--) {
      overlay.baseIndexRefBuffer[l][0] += 1;
    }
  }
};
var pushCursorGroup = {
  sign: overlayControl,
  body: (overlay, baseIndex) => {
    overlay.baseIndexRefBuffer.push(baseIndex);
  }
};
var appendNthIndex = {
  sign: indexOnlyControl,
  body: (index = 0, indexList) => {
    indexList.push(index + 1);
  }
};
var prependNthIndex = {
  sign: indexOnlyControl,
  body: (index = 0, indexList) => {
    indexList.unshift(index + 1);
  }
};
var prependNthLastIndex = {
  sign: indexOnlyControl,
  body: (indexPadding = 0, indexList) => {
    appendNthIndex.body(indexList[indexList.length - 1] + indexPadding, indexList);
  }
};
var resetOverlayIndex = {
  sign: stateOnlyControl,
  body: (state) => {
    state.overlayIndex = 1;
    state.baseLine = state.currentLine;
  }
};
var increaseCalibration = {
  sign: overlayControl,
  body: (overlay, ctx) => {
    overlay.calibration++;
  }
};
var duplicateEntryStep = {
  [recurringLine0]: [appendNthIndex],
  [recurringLine1]: [pushCursorIndex, pushCursorGroup, appendNthIndex],
  [recurringLine2]: [appendNthIndex],
  [recurringLine3]: [pushCursorGroup, pushCursorIndex, (indexList) => prependNthLastIndex.body(-1, indexList)],
  [recurringLine4]: [appendNthIndex],
  [recurringLine5]: [(indexList) => prependNthLastIndex.body(1, indexList), pushCursorIndex],
  [recurringLine6]: [pushCursorIndex, appendNthIndex],
  [recurringLine7]: [pushCursorIndex, appendNthIndex],
  [recurringLine8]: [pushCursorIndex, prependNthIndex],
  [recurringLine9]: [pushCursorGroup, pushCursorIndex, prependNthIndex, resetOverlayIndex]
};
var resetCurrentIndex = {
  sign: stateOnlyControl,
  body: (state) => {
    state.cursorIndex = 0;
  }
};
var equalizeLineState = {
  sign: stateOnlyControl,
  body: (state) => {
    state.baseLine = state.currentLine;
  }
};
var createBaseIndex = {
  sign: contextControl,
  body: (overlay, ctx) => {
    ctx.baseIndex = [0];
  }
};
var initBaseIndex = {
  sign: contextControl,
  body: (overlay, ctx) => {
    ctx.baseIndex = [overlay.calibration];
  }
};
var entryStep = {
  [nonRecurringLine0]: [initBaseIndex],
  [nonRecurringLine1]: [increaseCalibration, pushCursorIndex, createBaseIndex, pushCursorGroup, resetCurrentIndex, equalizeLineState],
  [nonRecurringLine2]: [pushCursorIndex],
  [nonRecurringLine3]: [createBaseIndex, pushCursorIndex, resetCurrentIndex, equalizeLineState],
  [nonRecurringLine4]: [pushCursorGroup]
};
var stepFunctionSignature = {
  [stateOnlyControl]: (fn, state, ctx) => fn(state),
  [indexOnlyControl]: (fn, state, ctx) => fn(state.cursorIndex, ctx.indexList),
  [overlayControl]: (fn, state, ctx) => fn(state.overlay, ctx.baseIndex),
  [contextControl]: (fn, state, ctx) => fn(state.overlay, ctx)
};
var firstSelectionAsBaseLine = (state, context2) => {
  state.baseLine = context2.lineFn.editor.selection.end.line;
  state.cursorIndex = 0;
};
var lastSelectionAsBaseLine = (state, context2) => {
  state.baseLine = context2.lineFn.editor.selections[context2.lineFn.editor.selections.length - 1].end.line;
};
var nthRenderOptionOverride = (contentText, context2) => {
  const addBaseIndex2 = (baseIndex) => (i) => {
    return Number(i) + Number(baseIndex[0]);
  };
  contentText.after = {
    ...contentText.after,
    baseIndex: [],
    indexList: [],
    get contentText() {
      return this.indexList.map(addBaseIndex2(this.baseIndex)).join(",");
    }
  };
  context2.baseIndex = contentText.after.baseIndex;
  context2.indexList = contentText.after.indexList;
};
var colRenderOptionOverride = (contentText, context2) => {
  contentText.after = {
    ...contentText.after,
    column: [],
    get contentText() {
      return this.column.join(", ");
    }
  };
  context2.columnList = contentText.after.column;
};
var fnStepDispatchBinder = (state, context2) => (fn) => {
  return stepFunctionSignature[fn.sign](fn.body, state, context2);
};

// src/editor/status/selection.ts
var selectionContentText = {
  ...SELECTION_CONTENT_TEXT
};
var indentInfo = {
  ...INDENT_INFO
};
var selectionTextBuffer = {
  [cursorOnlyText]: [],
  [singleLineText]: [],
  [multiLineText]: [],
  [multiCursorText]: [],
  [multiCursorEdit]: []
};
var selectionDecorationOption = {
  [cursorOnlyText]: [],
  [singleLineText]: [],
  [multiLineText]: [],
  [multiCursorText]: [],
  [multiCursorEdit]: []
};
var rangePointerTable = {
  [cursorOnlyText]: void 0,
  [singleLineText]: void 0,
  [multiLineAnchorText]: void 0,
  [multiLineCursorText]: void 0,
  [multiCursorText]: []
};
var decorationOptionBuffer = { ...DECORATION_OPTION_CONFIG };
var columnDelta = (editor2, delta = 0) => {
  const col = editor2.selection.active.character + delta;
  const end = editor2.document.lineAt(editor2.selection.active.line).text.length + delta;
  return col === end ? col : col + "/" + end;
};
var columns = {
  col: ({ editor: editor2 }) => columnDelta(editor2, 1),
  zCol: ({ editor: editor2 }) => columnDelta(editor2)
};
var characterCount = {
  char: ({ editor: editor2 }) => {
    return editor2.selection.end.character - editor2.selection.start.character;
  }
};
var lineNumber2 = {
  ln: ({ editor: editor2 }) => {
    return editor2.selection.active.line + 1;
  }
};
var multiLineOf = {
  lc: multiLineLineCountHex,
  char: multiLineChararcterHex,
  charOnly: multiLineChararcterOnlyHex
};
var multiLineFn = {
  lc: (editor2) => editor2.selection.end.line - editor2.selection.start.line + 1,
  char: (editor2) => editor2.document.getText(editor2.selection).length,
  charOnly: (editor2) => editor2.document.getText(editor2.selection).replace(indentInfo.regex, "").length
};
var columnFromSelection = (editor2, idx = 0, delta = 0) => {
  const col = editor2.selections[idx].active.character + delta;
  const end = editor2.document.lineAt(editor2.selections[idx].active.line).text.length + delta;
  return col === end ? col : col + "/" + end;
};
var multiCursorFn = {
  col: ({ editor: editor2, idx }) => columnFromSelection(editor2, idx, 1),
  zCol: ({ editor: editor2, idx }) => columnFromSelection(editor2, idx),
  count: ({ editor: editor2 }) => editor2.selections.length,
  ln: ({ editor: editor2, idx }) => editor2.selections[idx].end.line + 1,
  lc: ({ editor: editor2, pos }) => {
    return editor2.selection.isSingleLine ? editor2.selections.length : editor2.selections.length * (editor2.selections[pos].end.line - editor2.selections[pos].start.line + 1);
  },
  char: ({ editor: editor2, pos }) => {
    if (editor2.selection.isSingleLine) {
      return editor2.selections[pos].end.character - editor2.selections[pos].start.character;
    }
    const text = editor2.document.getText(editor2.selections[pos]);
    return text.replace(indentInfo.regex, "").length;
  }
};
var multiCursorOf = {
  nth: multiCursorLineNthHex,
  count: multiCursorLineCountHex,
  ln: multiCursorLineLineNumberHex,
  lc: multiCursorLineLineCountHex,
  char: multiCursorLineCharacterHex
};
var selectionOf = {
  ["cursorOnlyText" /* CURSOR_ONLY_TEXT */]: { ...columns, ...lineNumber2 },
  ["singleLineText" /* SINGLE_LINE_TEXT */]: { ...lineNumber2, ...characterCount },
  ["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */]: { ...lineNumber2, ...multiLineOf },
  ["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */]: { ...lineNumber2, ...multiLineOf },
  ["multiCursorText" /* MULTI_CURSOR_TEXT */]: multiCursorOf,
  ["multiCursorEdit" /* MULTI_CURSOR_EDIT */]: { ...columns, ...multiCursorOf }
};
var cols = {
  col: column,
  zCol: zeroColumn
};
var line = {
  char: character,
  ln: lineNumber
};
var lineExtra = {
  lc: lineCount,
  charOnly: characterOnly
};
var cursor = {
  nth,
  count: selectionCount
};
var SelectionTextRegex = {
  ["cursorOnlyText" /* CURSOR_ONLY_TEXT */]: { ...cols, ...line },
  ["singleLineText" /* SINGLE_LINE_TEXT */]: { ...line },
  ["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */]: { ...line, ...lineExtra },
  ["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */]: { ...line, ...lineExtra },
  ["multiCursorText" /* MULTI_CURSOR_TEXT */]: { ...cursor, ...line, ...lineExtra },
  ["multiCursorEdit" /* MULTI_CURSOR_EDIT */]: { ...cursor, ...cols, ...line }
};
var composeRenderOption = (cursorType, contentText) => {
  return {
    get range() {
      return rangePointerTable[cursorType];
    },
    renderOptions: contentText
  };
};
var setDeocorationOption = (cursorType, renderOptionHex) => {
  selectionTextBuffer[cursorType].forEach((option, idx) => {
    const renderOption = [];
    renderOptionHex?.forEach((hex) => {
      renderOption.push(composeRenderOption(hex, selectionContentText[hex].contentText[idx]));
    });
    selectionDecorationOption[cursorType].push(renderOption);
  });
};
var selectionStatusFunctionChain = {
  [cursorOnlyText]: [],
  [singleLineText]: [],
  [multiLineText]: [],
  [multiCursorText]: [],
  [multiCursorEdit]: []
};
var selectionStatusDecorationOption = {
  [cursorOnlyText]: {
    renderOptionHex: [cursorOnlyText],
    fnObject: { ...lineNumber2, ...columns }
  },
  [singleLineText]: {
    renderOptionHex: [singleLineText],
    fnObject: { ...lineNumber2, ...characterCount }
  },
  [multiLineText]: {
    renderOptionHex: [multiLineAnchorText, multiLineCursorText],
    fnObject: { ...lineNumber2, ...multiLineFn }
  },
  [multiCursorText]: {
    renderOptionHex: [multiCursorText],
    fnObject: { ...multiCursorFn }
  },
  [multiCursorEdit]: {
    renderOptionHex: [],
    // __0x.multiCursorEdit
    fnObject: { ...multiCursorFn }
  }
};
var buildFunctionChain = (cursorType, placeholder, statusFunciton) => {
  placeholder.forEach((position) => {
    if (Object.hasOwn(statusFunciton, position[1])) {
      selectionStatusFunctionChain[cursorType].push([position[1], statusFunciton[position[1]]]);
    }
  });
};
var setSelectionTextbuffer = (cursorType, length, placeholder) => {
  decorationOptionBuffer.isWholeLine = true;
  decorationOptionBuffer.rangeBehavior = vscode3.DecorationRangeBehavior.ClosedClosed;
  let lengthBuffer = length;
  while (lengthBuffer--) {
    const decorationType = vscode3.window.createTextEditorDecorationType(decorationOptionBuffer);
    selectionTextBuffer[cursorType].push(decorationType);
  }
  if (selectionDecorationOption[cursorType].length > 0) {
    selectionDecorationOption[cursorType] = [];
  }
  const option = selectionStatusDecorationOption[cursorType];
  setDeocorationOption(cursorType, option.renderOptionHex);
  buildFunctionChain(cursorType, placeholder, option.fnObject);
};
var syncRefernceTable = (placeholder, cursorType, refObj) => {
  switch (cursorType) {
    case cursorOnly:
      cursorOnlyStatusRef[placeholder] = refObj;
      break;
    case singleLine:
      singleLinetatusRef[placeholder] = refObj;
      break;
    case multiLine:
      multiLinetatusRef[placeholder] = refObj;
      break;
    case multiCursorText:
      multiCursorTextRef[placeholder] = refObj;
      break;
    case multiCursorEdit:
      multiCursorEditRef[placeholder] = refObj;
      break;
    default:
      break;
  }
};
var contentTextFuncBuffered = (setDecorations, buffer) => (renderOption, idx) => {
  return setDecorations(buffer[idx], renderOption);
};
var functionChain = (args, statusRef) => ([fnName, fnChain]) => {
  statusRef[fnName].contentText = fnChain(args).toString();
};
var cursorOnlyStatusRef = {
  ln: void 0,
  col: void 0,
  zCol: void 0
};
var setMultiCursorTextPosition = (placeholder, position) => {
  if (Object.hasOwn(multiCursorTextKeyPosition, placeholder)) {
    multiCursorTextKeyPosition[placeholder] = position;
  }
};
var setMultiCursorEditPosition = (placeholder, position) => {
  if (Object.hasOwn(multiCursorEditKeyPosition, placeholder)) {
    multiCursorEditKeyPosition[placeholder] = position;
  }
};
var setMultiCursorContext = () => {
  multiCursorTextPosition.push(...Object.values(multiCursorTextKeyPosition).filter((pos) => pos !== null));
  textContext.contentText = selectionContentText[multiCursorText].contentText;
  if (multiCursorTextKeyPosition.nth) {
    nthRenderOptionOverride(selectionContentText[multiCursorText].contentText[multiCursorTextKeyPosition.nth], textContext);
  }
  multiCursorEditPosition.push(...Object.values(multiCursorEditKeyPosition).filter((pos) => pos !== null));
  editContext.contentText = selectionContentText[multiCursorEdit].contentText;
  if (multiCursorEditKeyPosition.nth) {
    nthRenderOptionOverride(selectionContentText[multiCursorEdit].contentText[multiCursorEditKeyPosition.nth], editContext);
  }
  if (multiCursorEditKeyPosition.col) {
    colRenderOptionOverride(selectionContentText[multiCursorEdit].contentText[multiCursorEditKeyPosition.col], editContext);
  }
  if (multiCursorEditKeyPosition.zCol) {
    colRenderOptionOverride(selectionContentText[multiCursorEdit].contentText[multiCursorEditKeyPosition.zCol], editContext);
  }
};
var clearBufferOfhexkey = (previousCursor, setDecorations) => {
  switch (previousCursor[0]) {
    case cursorOnly:
      selectionTextBuffer[cursorOnlyText].forEach(resetDecoration(setDecorations));
      break;
    case singleLine:
      selectionTextBuffer[singleLineText].forEach(resetDecoration(setDecorations));
      break;
    case multiLine:
      selectionTextBuffer[multiLineText].forEach(resetDecoration(setDecorations));
      break;
    case multiCursor:
      clearMultiCursorState();
      resetMultiCursorCounters();
      clearMultiCursor(multiCursorText, setDecorations);
      clearMultiCursor(multiCursorEdit, setDecorations);
      break;
    case multiCursorText:
      clearMultiCursor(multiCursorText, setDecorations);
      break;
    case multiCursorEdit:
      clearMultiCursor(multiCursorEdit, setDecorations);
      break;
    default:
      break;
  }
};
var cursorOnlySelection = (editor2, previousCursor) => {
  clearSelectionTextBuffer(editor2);
  selectionStatusFunctionChain[cursorOnlyText].forEach(functionChain({ editor: editor2 }, cursorOnlyStatusRef));
  rangePointerTable[cursorOnlyText] = createLineRange(editor2.selection.active);
  selectionDecorationOption[cursorOnlyText].forEach(
    contentTextFuncBuffered(
      editor2.setDecorations,
      selectionTextBuffer[cursorOnlyText]
    )
  );
};
var singleLinetatusRef = {
  ln: void 0,
  char: void 0
};
var singleLineSelection = (editor2, previousCursor) => {
  clearBufferOfhexkey(previousCursor, editor2.setDecorations);
  selectionStatusFunctionChain[singleLineText].forEach(functionChain({ editor: editor2 }, singleLinetatusRef));
  rangePointerTable[singleLineText] = createLineRange(editor2.selection.active);
  selectionDecorationOption[singleLineText].forEach(
    contentTextFuncBuffered(
      editor2.setDecorations,
      selectionTextBuffer[singleLineText]
    )
  );
};
var multiLinetatusRef = {
  ln: void 0,
  lc: void 0,
  char: void 0,
  charOnly: void 0
};
var multilineSelection = (editor2, previousCursor) => {
  multiLine !== previousCursor[0] && clearBufferOfhexkey(previousCursor, editor2.setDecorations);
  selectionStatusFunctionChain[multiLineText].forEach(functionChain(editor2, multiLinetatusRef));
  rangePointerTable[multiLineAnchorText] = createLineRange(editor2.selection.anchor);
  rangePointerTable[multiLineCursorText] = createLineRange(editor2.selection.active);
  selectionDecorationOption[multiLineText].forEach(
    contentTextFuncBuffered(
      editor2.setDecorations,
      selectionTextBuffer[multiLineText]
    )
  );
};
var multiCursorOeverlay = {
  // buffer: [] as D.Selection.Intf.MultiCursorIndexReferences[],
  baseIndexRefBuffer: [],
  indexListRefBuffer: [],
  calibration: 0,
  newBase: false
};
var multiCursorState = {
  // 
  /* --- SELECTION STATE --- */
  selectionBuffer: [],
  lineBuffer: /* @__PURE__ */ new Map(),
  cursorIndex: 0,
  /* --- LINE STATE --- */
  indexList: [],
  columnList: [],
  baseLine: -1,
  currentLine: -1,
  previousLine: -1,
  duplicateOverlayIndex: -1,
  /* --- LAST SELECTION --- */
  lastSelection: void 0,
  lastSelectionCount: 0,
  /* --- OVERLAY STATE --- */
  overlayIndex: 0,
  overlay: multiCursorOeverlay
};
var clearMultiCursorState = () => {
  multiCursorState.selectionBuffer.length = 0;
  multiCursorState.lineBuffer.clear();
  multiCursorState.indexList.length = 0;
  multiCursorState.columnList.length = 0;
  multiCursorState.overlayIndex = 0;
  multiCursorState.cursorIndex = 0;
  multiCursorState.baseLine = -1;
  multiCursorState.currentLine = -1;
  multiCursorState.duplicateOverlayIndex = -1;
  multiCursorState.lastSelection = void 0;
  multiCursorState.lastSelectionCount = 0;
  multiCursorState.overlayIndex = 0;
  multiCursorOeverlay.baseIndexRefBuffer.length = 0;
  multiCursorOeverlay.indexListRefBuffer.length = 0;
  multiCursorOeverlay.calibration = 0;
  multiCursorFlag.lastCount = 0;
  clearMultiCursor(multiCursorText, multiCursorFnContext.editor.setDecorations);
  clearMultiCursor(multiCursorEdit, multiCursorFnContext.editor.setDecorations);
  return true;
};
var multiCursorTextRef = {
  nth: void 0,
  count: void 0,
  ln: void 0,
  lc: void 0,
  char: void 0
};
var multiCursorEditRef = {
  nth: void 0,
  count: void 0,
  ln: void 0,
  col: void 0,
  zCol: void 0
};
var functionChainAccumulater = (context2, statusRef) => ([fnName, fnChain]) => {
  if (fnName === "char") {
    multiCursorAccumulated[fnName] += fnChain(context2);
    statusRef[fnName].contentText = multiCursorAccumulated[fnName].toString();
  } else {
    statusRef[fnName].contentText = fnChain(context2).toString();
  }
};
var multiCursorFlag = {
  lastCount: 0,
  sorted: false,
  mode: multiCursor,
  all: [multiCursor],
  text: [multiCursorText],
  edit: [multiCursorEdit]
};
var multiCursorTextPosition = [];
var multiCursorEditPosition = [];
var multiCursorFnContext = {
  editor: vscode3.window.activeTextEditor,
  pos: 0,
  char: 0,
  idx: 0
};
var textContext = {
  accumulate: functionChainAccumulater(multiCursorFnContext, multiCursorTextRef),
  // fnChain: selectionStatusFunctionChain[__0x.multiCursorText],
  // renderOption: selectionDecorationOption[__0x.multiCursorText],
  lineFn: multiCursorFnContext,
  flag: multiCursorFlag,
  baseIndex: [],
  indexList: [],
  baseIndexBuffer: [],
  indexListBuffer: [],
  contentText: {}
};
var editContext = {
  accumulate: functionChainAccumulater(multiCursorFnContext, multiCursorEditRef),
  fnChain: selectionStatusFunctionChain[multiCursorEdit],
  position: multiCursorEditPosition,
  lineFn: multiCursorFnContext,
  flag: multiCursorFlag,
  columnList: void 0,
  baseIndex: void 0,
  indexList: void 0,
  contentText: {}
};
var multiCursorAccumulated = {
  nth: 0,
  count: 0,
  ln: 0,
  lc: 0,
  char: 0
};
var resetMultiCursorCounters = () => {
  multiCursorAccumulated.nth = 0;
  multiCursorAccumulated.count = 0;
  multiCursorAccumulated.ln = 0;
  multiCursorAccumulated.lc = 0;
  multiCursorAccumulated.char = 0;
};
var multiCursorTextKeyPosition = {
  nth: null,
  ln: null
};
var multiCursorEditKeyPosition = {
  nth: null,
  // ln: null,
  col: null,
  zCol: null
};
var renderMultiCursor = (setDecorations, decorationOption) => (decorationType, idx) => setDecorations(decorationType, decorationOption[idx]);
var addBaseIndex = (baseIndex) => (i) => {
  return i + baseIndex[0];
};
var pushMultiCursorOption = (selectionBuffer, overlay, cursorIndex, context2) => (contentText, idx) => {
  let contentTextBuffer = contentText;
  if (multiCursorTextPosition.find((e) => e === idx) !== void 0) {
    console.log("multiCursorTextPosition", context2.baseIndex[0]);
    contentTextBuffer = { ...contentText };
    contentTextBuffer.after = {
      ...contentText.after,
      baseIndex: context2.baseIndex,
      indexList: [cursorIndex],
      get contentText() {
        return this.indexList.map(addBaseIndex(this.baseIndex)).join(",");
      }
    };
    context2.baseIndex = contentTextBuffer.after.baseIndex;
    context2.indexList = contentTextBuffer.after.indexList;
    overlay.indexListRefBuffer.push(context2.indexList);
  }
  selectionDecorationOption[multiCursorText][idx].push({
    selectionBufferIndex: selectionBuffer.length - 1,
    get range() {
      return selectionBuffer[this.selectionBufferIndex];
    },
    renderOptions: contentTextBuffer
  });
};
var duplicateLineSignature = (duplicateEntryIdx = -1, calibration, baseline, currentLine, previousLine, lineBufferLength) => {
  return (currentLine < baseline ? 1 /* TO_SHIFT_INDEX */ : 0) + (calibration > 0 ? 2 /* INDEX_SHIFTED */ : 0) + (currentLine === baseline ? 4 /* ON_BASELINE */ : 0) + (currentLine === previousLine ? 8 /* AS_LAST_SELECTION */ : 0) + (lineBufferLength > duplicateEntryIdx + 1 ? 16 /* NOT_AS_LAST_SELECTION */ : 0);
};
var nonDuplicateLineSignature = (selectionLength, baseLine, currentLine, calibration) => {
  return (currentLine < baseLine ? 1 /* TO_SHIFT_INDEX */ : 0) + (calibration > 0 ? 2 /* INDEX_SHIFTED */ : 0) + (selectionLength === 2 ? 32 /* INIT */ : 0);
};
var multiCursorIndexControl = (state, context2) => {
  const duplicateEntryIdx = state.lineBuffer.get(state.currentLine);
  if (duplicateEntryIdx !== void 0) {
    const sign2 = duplicateLineSignature(duplicateEntryIdx, state.overlay.calibration, state.baseLine, state.currentLine, state.previousLine, state.lineBuffer.size);
    console.log("duplicateLineSignature", sign2, duplicateEntryIdx, state.currentLine, state.baseLine);
    const step = duplicateEntryStep[sign2];
    step.forEach(fnStepDispatchBinder(state, context2));
    return true;
  }
  const sign = nonDuplicateLineSignature(state.selectionBuffer.length, state.baseLine, state.currentLine, state.overlay.calibration);
  entryStep[sign].forEach(fnStepDispatchBinder(state, context2));
  return false;
};
var multiCursorTextDecoration = (state, context2) => {
  if (multiCursorIndexControl(state, context2)) {
    increaseIndex(state);
    state.previousLine = state.currentLine;
    return;
  }
  state.lineBuffer.set(state.currentLine, state.overlayIndex);
  increaseIndex(state);
  selectionContentText[multiCursorText].contentText.forEach(pushMultiCursorOption(state.selectionBuffer, state.overlay, state.cursorIndex, context2));
  state.previousLine = state.currentLine;
};
var multiCursorEditDecoration = (state, context2) => {
  if (!multiCursorIndexControl(state, context2)) {
    return;
  }
  state.lineBuffer.set(state.currentLine, state.cursorIndex);
};
var addMultiCursorEdit = (state, context2) => {
  state.baseLine = 0;
  state.selectionBuffer = [...context2.lineFn.editor.selections];
  state.selectionBuffer.forEach((s, idx) => {
    state.currentLine = s.end.line;
    context2.idx = idx;
    state.cursorIndex = idx;
    selectionStatusFunctionChain[multiCursorText].forEach(context2.accumulate);
    multiCursorEditDecoration(state, context2);
    state.columnList.push(columnFromSelection(context2.lineFn.editor, idx, 0));
    increaseIndex(state);
  });
};
var allOccurrence2 = (state, context2) => {
  sortSelectionsIfNeeded(context2.lineFn.editor);
  context2.lineFn.editor.selections.forEach((selection) => {
    addMultiCursorSelection(selection, state, context2);
  });
};
var addMultiCursorSelection = (selection, state, context2) => {
  state.selectionBuffer.push(selection);
  state.currentLine = selection.end.line;
  selectionStatusFunctionChain[multiCursorText].forEach(context2.accumulate);
  multiCursorTextDecoration(state, context2);
};
var nextOccurrenceInit2 = (state, context2) => {
  sortSelectionsIfNeeded(context2.lineFn.editor);
  context2.lineFn.editor.selections.forEach((selection) => {
    addMultiCursorSelection(selection, state, context2);
  });
};
var nextOccurrence2 = (state, context2) => {
  addMultiCursorSelection(context2.lineFn.editor.selections[multiCursorFlag.lastCount], state, context2);
};
var cursorOnEndOfLines2 = (state, context2) => {
  normalizeToEmptySelections(context2.lineFn.editor);
  addMultiCursorEdit(state, context2);
};
var cursorMovement = (state, context2) => {
  clearMultiCursor(multiCursorEdit, context2.lineFn.editor.setDecorations);
  addMultiCursorEdit(state, context2);
};
var addCursor2 = (state, context2) => {
  sortSelectionsIfNeeded(context2.lineFn.editor);
  normalizeToEmptySelections(context2.lineFn.editor);
  addMultiCursorEdit(state, context2);
};
var renderMultiCursorWrapper = (cursorType, setDecorations) => {
  return selectionTextBuffer[cursorType].forEach(
    renderMultiCursor(
      setDecorations,
      selectionDecorationOption[cursorType]
    )
  );
};
var clearMultiCursor = (cursorType, setDecorations) => {
  selectionTextBuffer[cursorType].forEach(resetDecoration(setDecorations));
  selectionDecorationOption[cursorType].forEach((option, idx) => {
    selectionDecorationOption[cursorType][idx].length = 0;
  });
};
var multiCursorFnStack = {
  [allOccurrence]: [firstSelectionAsBaseLine, allOccurrence2],
  [nextOccurrence]: [nextOccurrence2],
  [nextOccurrenceInit]: [firstSelectionAsBaseLine, nextOccurrenceInit2],
  [cursorOnEndOfLines]: [firstSelectionAsBaseLine, cursorOnEndOfLines2],
  [movement]: [firstSelectionAsBaseLine, cursorMovement],
  [addCursor]: [lastSelectionAsBaseLine, addCursor2]
};
var callFnChain = (state, context2) => (fn) => fn(state, context2);
var multiCursorStrategy = (isEmpty, lastCount, length) => {
  return !isEmpty ? lastCount === 0 && length === 2 ? nextOccurrenceInit : lastCount + 2 < length ? allOccurrence : nextOccurrence : lastCount === 0 && length === 1 ? cursorOnEndOfLines : lastCount === length && lastCount !== 0 ? movement : addCursor;
};
var multiCursorSelection = (editor2, previousCursor) => {
  const stratKey = multiCursorStrategy(
    editor2.selection.isEmpty,
    multiCursorFlag.lastCount,
    editor2.selections.length
  ) | 0;
  const isEdit = stratKey & 1;
  stratKey & 8 && clearMultiCursorState() && clearBufferOfhexkey(previousCursor, editor2.setDecorations);
  multiCursorFnStack[stratKey].forEach(callFnChain(multiCursorState, isEdit ? editContext : textContext));
  renderMultiCursorWrapper(multiCursorText + isEdit, editor2.setDecorations);
  multiCursorFlag.lastCount = editor2.selections.length;
};
var forceDispatchEditorChange = (editor2) => {
  multiCursorFnContext.editor = editor2;
};
var clearSelectionTextBuffer = (editor2) => {
  SELECTION_KIND_LIST?.forEach((cursorType) => clearBufferOfhexkey([cursorType], editor2.setDecorations));
};
var bindStatusContentTextState = () => {
  return {
    functionOf: selectionOf,
    textOf: selectionContentText,
    infoOf: indentInfo
  };
};

// src/editor/status/diagnostic.ts
var vscode5 = __toESM(require("vscode"));

// src/constant/shared/symbol.ts
var prefixSymbol = Symbol("prefix");
var postfixSymbol = Symbol("postfix");

// src/diagnostic/diagnostic.ts
var vscode4 = __toESM(require("vscode"));
var diagnosticState = { ...DIAGNOSTIC_STATE };
var resetEditorDiagnosticStatistics = () => {
  diagnosticState.editor.warning.line.splice(0);
  diagnosticState.editor.warning.total = 0;
  diagnosticState.editor.error.line.splice(0);
  diagnosticState.editor.error.total = 0;
};
var resetWorkspaceDiagnosticStatistics = () => {
  diagnosticState.workspace.warning.source = 0;
  diagnosticState.workspace.warning.total = 0;
  diagnosticState.workspace.error.source = 0;
  diagnosticState.workspace.error.total = 0;
};
var parseDiagnostic = (state, severity, fsPath, activeEditorfsPath = void 0) => {
  Object.keys(severity).forEach((severityType) => {
    if (fsPath === activeEditorfsPath) {
      state.editor[severityType].line = [
        .../* @__PURE__ */ new Set([
          ...state.editor[severityType].line,
          ...severity[severityType].map((problem) => problem.range.start.line)
        ])
      ];
      state.editor[severityType].total = 0;
      state.editor[severityType].total = severity[severityType].length;
    }
    if (severity[severityType].length > 0) {
      state.workspace[severityType].source += 1;
      state.workspace[severityType].total += severity[severityType].length;
    }
  });
};
var buildDiagnostic = (source2, diagnosticList, uri) => {
  for (const diagnostic of diagnosticList) {
    if (diagnostic.severity <= vscode4.DiagnosticSeverity.Warning) {
      if (typeof source2[uri.fsPath] !== "object") {
        source2[uri.fsPath] = {};
      }
      const sevKey = DIAGNOSTIC_SEVERITY_TO_KEY[diagnostic.severity];
      if (!Array.isArray(source2[uri.fsPath][sevKey])) {
        source2[uri.fsPath][sevKey] = [];
      }
      source2[uri.fsPath][sevKey].push(diagnostic);
    }
  }
};
var maxSeverity = (state) => {
  const ifEditorProblem = state.editor.error.total !== 0 || state.editor.warning.total !== 0;
  const ifWorkspaceProblem = state.workspace.error.total !== 0 || state.workspace.warning.total !== 0;
  if (!ifEditorProblem && !ifWorkspaceProblem) {
    return 1 /* OK */;
  }
  const editorSeverity = state.editor.warning.total <= state.editor.error.total && ifEditorProblem ? 4 /* ERR */ : 2 /* WARN */;
  const workspaceSeverity = state.workspace.warning.total <= state.workspace.error.total && ifWorkspaceProblem ? 4 /* ERR */ : 2 /* WARN */;
  return Math.max(editorSeverity, workspaceSeverity);
};
var convertTo2DArray = (state) => [
  state.override,
  state.severity,
  [...state.editor.warning.line],
  state.editor.warning.total,
  [...state.editor.error.line],
  state.editor.error.total,
  state.workspace.warning.source,
  state.workspace.warning.total,
  state.workspace.error.source,
  state.workspace.error.total
];
var diagnosticSource = {};
var setOverrideDigit = (digit) => {
  diagnosticState.override = digit;
};
var updateDiagnostic = (activeEditorUri = void 0) => {
  for (let fs in diagnosticSource) {
    delete diagnosticSource[fs];
  }
  resetWorkspaceDiagnosticStatistics();
  resetEditorDiagnosticStatistics();
  const diagnostics = vscode4.languages.getDiagnostics();
  for (const [uri, diagnosticList] of diagnostics) {
    buildDiagnostic(diagnosticSource, diagnosticList, uri);
  }
  for (const [fsPath, severity] of Object.entries(diagnosticSource)) {
    parseDiagnostic(diagnosticState, severity, fsPath, activeEditorUri?.fsPath);
  }
  ;
  diagnosticState.severity = maxSeverity(diagnosticState);
  return convertTo2DArray(diagnosticState);
};

// src/editor/status/diagnostic.ts
var diagnosticContentText = {
  ...DIAGNOSTIC_CONTENT_TEXT
};
var lineGlyph = {
  ...DIAGNOSTIC_GLYPH2
};
var diagnosticStatusBuffer = [];
var composeRenderOption2 = (renderSignature, renderOptions) => {
  renderOptions.forEach((option) => {
    if (typeof option.after.contentText === "number" && Object.hasOwn(diagnosticReferenceTable, option.after.contentText)) {
      diagnosticReferenceTable[option.after.contentText] = option.after;
      diggnosticStateList.push(option.after.contentText);
    }
    diagnosticContentText[renderSignature].push([{
      get range() {
        return diagnosticReferenceTable.rangeReference;
      },
      renderOptions: option
    }]);
  });
};
var diagnosticReferenceTable = {
  rangeReference: void 0,
  [editorWarningTotal]: void 0,
  [editorErrorTotal]: void 0,
  [workspaceWarningSource]: void 0,
  [workspaceWarningTotal]: void 0,
  [workspaceErrorSource]: void 0,
  [workspaceErrorTotal]: void 0
};
var setDiagonosticTextbuffer = () => {
  const lengthList = [];
  DIAGNOSTIC_ENTRY_LIST.forEach((hexKey) => {
    lengthList.push([hexKey, diagnosticContentText[hexKey].length]);
  });
  decorationOptionBuffer2.isWholeLine = true;
  decorationOptionBuffer2.rangeBehavior = vscode5.DecorationRangeBehavior.ClosedClosed;
  const max = Math.max(...lengthList.map((list) => list[1]));
  let idx = max;
  diagnosticStatusBuffer?.forEach((decorationType) => decorationType.dispose());
  diagnosticStatusBuffer?.splice(0);
  while (idx--) {
    diagnosticStatusBuffer.push(vscode5.window.createTextEditorDecorationType(decorationOptionBuffer2));
  }
  lengthList.forEach((length) => {
    let deltaIdx = max - length[1];
    while (deltaIdx--) {
      diagnosticContentText[length[0]].push([]);
    }
  });
};
var clearDiagnosticTextState = () => {
  for (const hexKey of DIAGNOSTIC_ENTRY_LIST) {
    diagnosticContentText[hexKey] = [];
  }
};
var diagnosticVisibility = { ...DIAGNOSTIC_VISIBILITY_CONFIG };
var problemLineGlyph = (lineNumber3, line2) => {
  const linePosition = [];
  let length = lineNumber3.length;
  let up = false;
  let down = false;
  let equal = false;
  while (length--) {
    if (lineNumber3[length] > line2 && !down) {
      down = true;
    } else if (lineNumber3[length] < line2 && !up) {
      up = true;
    } else if (lineNumber3[length] === line2 && !equal) {
      equal = true;
      down = false;
      up = false;
      break;
    }
    if (down && up) {
      break;
    }
  }
  linePosition.push(
    lineGlyph[openningBracket],
    equal ? lineGlyph[lineEqual] : "",
    up ? lineGlyph[lineUp] : "",
    down ? lineGlyph[lineDown] : "",
    lineGlyph[closingBracket]
  );
  return linePosition.join("");
};
var allOkOf = {
  allok: allOkHexKey
};
var problemOf = {
  editor: editorHexKey,
  workspace: workspaceHexKey
};
var notationOf = {
  pre: prefixSymbol,
  post: postfixSymbol
};
var diagnosticOf = {
  rangeFunction: createCursorRange,
  ["problemPlaceholderContentText" /* PLACEHOLDER_PROBLEM_CONTENT_TEXT */]: problemOf,
  ["allOkPlaceholderContentText" /* PLACEHOLDER_ALL_OK_CONTENT_TEXT */]: allOkOf,
  ["allOkContentText" /* OK_ALL_CONTENT_TEXT */]: notationOf,
  ["okWorkspaceContentText" /* OK_WORKSPACE_CONTENT_TEXT */]: notationOf,
  ["okEditorContentText" /* OK_EDITOR_CONTENT_TEXT */]: notationOf,
  ["warningEditorContentText" /* WARNING_EDITOR_CONTENT_TEXT */]: {
    ...notationOf,
    wrn: editorWarningTotal
  },
  ["errorEditorContentText" /* ERROR_EDITOR_CONTENT_TEXT */]: {
    ...notationOf,
    err: editorErrorTotal
  },
  ["errorWorkspaceContentText" /* ERROR_WORKSPACE_CONTENT_TEXT */]: {
    ...notationOf,
    src: workspaceErrorSource,
    err: workspaceErrorTotal
  },
  ["warningWorkspaceContentText" /* WARNING_WORKSPACE_CONTENT_TEXT */]: {
    ...notationOf,
    src: workspaceWarningSource,
    wrn: workspaceWarningTotal
  }
};
var okRegex = {
  allok
};
var problemRegex = {
  editor,
  workspace
};
var notationRegex = {
  pre: prefix,
  post: postfix
};
var warningTotalRegex = {
  wrn: warning
};
var sourceRegex = {
  src: source
};
var errorTotalRegex = {
  err: error
};
var diagnosticTextRegex = {
  ["problemPlaceholderContentText" /* PLACEHOLDER_PROBLEM_CONTENT_TEXT */]: problemRegex,
  ["allOkPlaceholderContentText" /* PLACEHOLDER_ALL_OK_CONTENT_TEXT */]: okRegex,
  ["allOkContentText" /* OK_ALL_CONTENT_TEXT */]: notationRegex,
  ["okWorkspaceContentText" /* OK_WORKSPACE_CONTENT_TEXT */]: notationRegex,
  ["okEditorContentText" /* OK_EDITOR_CONTENT_TEXT */]: notationRegex,
  ["warningWorkspaceContentText" /* WARNING_WORKSPACE_CONTENT_TEXT */]: {
    ...notationRegex,
    ...sourceRegex,
    ...warningTotalRegex
  },
  ["warningEditorContentText" /* WARNING_EDITOR_CONTENT_TEXT */]: {
    ...notationRegex,
    ...warningTotalRegex
  },
  ["errorWorkspaceContentText" /* ERROR_WORKSPACE_CONTENT_TEXT */]: {
    ...notationRegex,
    ...sourceRegex,
    ...errorTotalRegex
  },
  ["errorEditorContentText" /* ERROR_EDITOR_CONTENT_TEXT */]: {
    ...notationRegex,
    ...errorTotalRegex
  }
};
var decorationOptionBuffer2 = { ...DECORATION_OPTION_CONFIG };
var stateBuffer = [0, 0, [], 0, [], 0, 0, 0, 0, 0];
var initializeStateBuffer = (digit) => {
  stateBuffer[0] = digit;
};
var diagnosticRenderSignature = (state) => {
  const emask = (state[3] ? 1 << 1 : 0) | (state[5] ? 1 << 2 : 0);
  const wmask = (state[7] ? 1 << 1 : 0) | (state[9] ? 1 << 2 : 0);
  return emask === 0 && wmask === 0 ? state[0] : (emask ? emask << 5 : 1 << 5) | (wmask ? wmask << 2 : 1 << 2) | 2;
};
var refreshBuffer = (state) => {
  let idx = state.length;
  while (idx--) {
    stateBuffer[idx] = state[idx];
  }
};
var fnCollection = {
  [editorWarningTotal]: ({ state, line: line2 }) => String(state[3]) + problemLineGlyph(state[2], line2),
  [editorErrorTotal]: ({ state, line: line2 }) => String(state[5]) + problemLineGlyph(state[4], line2),
  [workspaceWarningSource]: ({ state }) => String(state[6]),
  [workspaceWarningTotal]: ({ state }) => String(state[7]),
  [workspaceErrorSource]: ({ state }) => String(state[8]),
  [workspaceErrorTotal]: ({ state }) => String(state[9])
};
var diggnosticStateList = [];
var updateDiagnosticState = (context2) => (hexKey) => {
  diagnosticReferenceTable[hexKey].contentText = fnCollection[hexKey](context2);
};
var renderDiagnosticText = (setDecorations) => (options, idx) => {
  setDecorations(diagnosticStatusBuffer[idx], options);
};
var context = {
  line: 0,
  state: /* @__PURE__ */ Object.create(null)
};
var diagnosticInfo = (decorationState2) => (editor2) => {
  if (decorationState2.eventTrigger[0] === diagnosticChanged) {
    refreshBuffer(updateDiagnostic(editor2.document.uri));
  }
  context.line = editor2.selection.end.line;
  context.state = stateBuffer;
  diggnosticStateList.forEach(updateDiagnosticState(context));
  diagnosticReferenceTable.rangeReference = diagnosticOf.rangeFunction(editor2);
  diagnosticContentText[diagnosticRenderSignature(stateBuffer)].forEach(renderDiagnosticText(editor2.setDecorations));
};
var clearDiagnosticText = (setDecorations) => {
  diagnosticStatusBuffer.forEach(resetDecoration(setDecorations));
};
var bindDiagnosticContentTextState = () => {
  return {
    functionOf: diagnosticOf,
    textOf: {
      contentText: diagnosticContentText,
      glyphList: lineGlyph
    },
    configOf: diagnosticVisibility
  };
};

// src/editor/editor.ts
var renderFnStack = {
  [cursorOnly]: [],
  [singleLine]: [],
  [multiLine]: [],
  [multiCursor]: []
};
var decorationState = { ...DECORATION_STATE };
var createEditorDecorationType = (styleAppliedConfig) => vscode6.window.createTextEditorDecorationType(styleAppliedConfig);
var applyDecoration = (setDecorations, decoraiton, range) => setDecorations(decoraiton, range);
var resetDecoration = (setDecorations) => (decoration) => setDecorations(decoration, blankRange);
var clearDecorationState = (decorationState2) => {
  decorationState2.eventTrigger[0] = noEvent;
  decorationState2.appliedHighlight[0] = cursorOnly;
  decorationState2.diagnosticSignature[0] = allOkOverride;
};
var clearAll = (editor2) => {
  clearEveryHighlight(editor2);
  clearSelectionTextBuffer(editor2);
  clearDiagnosticText(editor2.setDecorations);
};
var resetAllDecoration = () => vscode6.window.visibleTextEditors.forEach(clearAll);
var updateIndentOption = (editor2) => {
  const bindTo = bindStatusContentTextState();
  bindTo.infoOf.size = Number(editor2.options.tabSize ?? editor2.options.indentSize ?? 4);
  bindTo.infoOf.type = editor2.options.insertSpaces ? "\n" : "	";
  bindTo.infoOf.regex = editor2.options.insertSpaces ? indentAndEOLRegex(bindTo.infoOf.size) : tabAndEOLRegex;
};
var setFunctionList = (config, highlightList, selectionList) => (numKey) => {
  const renderFuList = [];
  renderFuList.push(highlightList[numKey]);
  if (config.generalConfigInfo.selectionTextEnabled) {
    renderFuList.push(selectionList[numKey]);
  }
  if (config.generalConfigInfo.diagnosticTextEnabled && (numKey === cursorOnly || numKey === singleLine)) {
    renderFuList.push(editModeCheck);
  } else if (config.generalConfigInfo.diagnosticTextEnabled) {
    renderFuList.push(diagnosticInfo(decorationState));
  }
  renderFnStack[numKey].push(...renderFuList);
};
var prepareRenderGroup = (config) => {
  const highlightList = {
    [cursorOnly]: cursorOnlyHighlightRange,
    [singleLine]: singelLineHighlightRange,
    [multiLine]: multiLineHighlightRange,
    [multiCursor]: multiCursorHighlightRange
  };
  const selectionList = {
    [cursorOnly]: cursorOnlySelection,
    [singleLine]: singleLineSelection,
    [multiLine]: multilineSelection,
    [multiCursor]: multiCursorSelection
  };
  SELECTION_KIND_LIST.forEach(setFunctionList(config, highlightList, selectionList));
};
var editModeCheck = (editor2) => {
  if (editor2.selections[0].start.line !== decorationState.previousLine[0]) {
    diagnosticInfo(decorationState)(editor2);
  }
  if (editor2.document.isDirty) {
    updateRangeMetadata(editor2);
  }
  decorationState.previousLine[0] = editor2.selections[0].start.line;
};
var fnList = (editor2, numKey) => (fn) => fn(editor2, numKey);
var renderGroupIs = (editor2, numKey) => {
  const fnBind = fnList(editor2, numKey);
  if (editor2.selections.length === 1) {
    if (editor2.selections[0].isEmpty) {
      renderFnStack[cursorOnly].forEach(fnBind);
      return cursorOnly;
    }
    if (!editor2.selections[0].isSingleLine) {
      renderFnStack[multiLine].forEach(fnBind);
      return multiLine;
    } else {
      renderFnStack[singleLine].forEach(fnBind);
      return singleLine;
    }
  } else {
    renderFnStack[multiCursor].forEach(fnBind);
    return multiCursor;
  }
};
var bindEditorDecoration = () => {
  return {
    stateOf: decorationState
  };
};

// src/editor/highlight/highlight.ts
var highlightStyleList = {
  ...HIGHLIGHT_STYLE_LIST
};
var borderPositionInfo = {
  ...HIGHLIGHT_BORDER_POSITION_INFO
};
var cursorOnlyHighlightRange = (editor2, previousKey) => {
  cursorOnly !== previousKey[0] && clearEveryHighlight(editor2);
  applyDecoration(editor2.setDecorations, highlightStyleList[cursorOnly][0], [createLineRange(editor2.selection.active)]);
};
var singelLineHighlightRange = (editor2, previousKey) => {
  singleLine !== previousKey[0] && clearHighlight(editor2.setDecorations, previousKey, blankRange);
  applyDecoration(editor2.setDecorations, highlightStyleList[singleLine][0], [createRangeSPEP(editor2.selection.start, editor2.selection.end)]);
};
var multiLineRangeCH = [
  [/* @__PURE__ */ Object.create(null)],
  [/* @__PURE__ */ Object.create(null)],
  [/* @__PURE__ */ Object.create(null)]
];
var renderMultiLineHighlight = (setDecorations, range) => (highlight, idx) => setDecorations(highlight, range[idx]);
var multiLineHighlightRange = (editor2, previousKey) => {
  multiLine !== previousKey[0] && clearHighlight(editor2.setDecorations, previousKey, blankRange);
  multiLineRangeCH[0][0] = editor2.document.lineAt(editor2.selection.start).range;
  multiLineRangeCH[1][0] = editor2.document.lineAt(editor2.selection.end).range;
  multiLineRangeCH[2][0] = editor2.selection;
  highlightStyleList[multiLine].forEach(renderMultiLineHighlight(editor2.setDecorations, multiLineRangeCH));
};
var multiCursorHighlightRange = (editor2, previousKey) => {
  clearHighlight(editor2.setDecorations, previousKey, blankRange);
  applyDecoration(editor2.setDecorations, highlightStyleList[multiCursor][0], [...editor2.selections]);
  applyDecoration(editor2.setDecorations, highlightStyleList[multiCursor][1], [...editor2.selections]);
};
var clearBuffer = (setDecorations, resetRange) => (buffer) => setDecorations(buffer, resetRange);
var clearHighlight = (setDecorations, previousKey, resetRange) => {
  switch (previousKey[0]) {
    case cursorOnly:
      highlightStyleList[cursorOnly].forEach(clearBuffer(setDecorations, resetRange));
      break;
    case singleLine:
      highlightStyleList[singleLine].forEach(clearBuffer(setDecorations, resetRange));
      break;
    case multiLine:
      highlightStyleList[multiLine].forEach(clearBuffer(setDecorations, resetRange));
      break;
    case multiCursor:
      highlightStyleList[multiCursor].forEach(clearBuffer(setDecorations, resetRange));
      break;
    default:
      break;
  }
};
var clearEveryHighlight = (editor2) => {
  clearHighlight(editor2.setDecorations, [cursorOnly], blankRange);
  clearHighlight(editor2.setDecorations, [singleLine], blankRange);
  clearHighlight(editor2.setDecorations, [multiLine], blankRange);
  clearHighlight(editor2.setDecorations, [multiCursor], blankRange);
};
var coordinatorSplit = {
  [cursorOnly]: (editor2, previousKey) => cursorOnlyHighlightRange(editor2, previousKey),
  [singleLine]: (editor2, previousKey) => singelLineHighlightRange(editor2, previousKey),
  [multiLine]: (editor2, previousKey) => multiLineHighlightRange(editor2, previousKey),
  [multiCursor]: (editor2, previousKey) => multiCursorHighlightRange(editor2, previousKey)
};
var bindHighlightStyleState = () => {
  return {
    styleOf: highlightStyleList,
    infoOf: borderPositionInfo
  };
};

// src/configuration/shared/configuration.ts
var vscode10 = __toESM(require("vscode"));

// src/util/error.ts
var vscode7 = __toESM(require("vscode"));
var ErrorDecription = class {
  #configurationSection;
  #errorMessage;
  constructor(configurationSection, errorMessage) {
    this.#configurationSection = configurationSection;
    this.#errorMessage = errorMessage;
  }
  get() {
    return {
      section: this.#configurationSection,
      message: this.#errorMessage
    };
  }
};
var ErrorHelper = class {
  static ignored = false;
  static notified = false;
  static packageName;
  static errorList = [];
  static configurationSectionList() {
    return this.errorList.map((error2) => error2.get().section);
  }
  static ifExtensionName(section) {
    if (section.indexOf(this.packageName) !== -1 && section.split(".").length > 2) {
      return section.replace(this.packageName + ".", "");
    } else {
      return section;
    }
  }
  static pushErrorMessage() {
    return vscode7.window.showErrorMessage(
      "Please revise invalid values in configuration." /* CONFIGURATION_ERROR */,
      ...["Fix Configuration", "Ignore"]
    );
  }
  static userSelect(configurationList) {
    return function(selected) {
      if (selected === "Fix Configuration") {
        vscode7.commands.executeCommand("workbench.action.openSettings", configurationList);
        return false;
      } else if (selected === "Ignore") {
        return true;
      }
      return true;
    };
  }
  static fixConfiguration() {
    return async () => {
      this.ignored = await this.pushErrorMessage().then(this.userSelect(this.configurationSectionList().join(" ")));
    };
  }
  static pushMessage(message) {
    return () => vscode7.window.showInformationMessage(message)?.then(() => {
    });
  }
};
var Error2 = class extends ErrorHelper {
  static configurationUpdated() {
    this.notified = false;
    this.ignored = false;
  }
  static setPackageName(packageName) {
    this.packageName = packageName;
  }
  static check() {
    return this.errorList.length > 0;
  }
  static register(configurationSection, errorMessage) {
    return this.errorList.push(new ErrorDecription(configurationSection, errorMessage));
  }
  static clear() {
    this.errorList.splice(0);
  }
  static notify(timer = 0) {
    if (this.check() && !this.notified && !this.ignored) {
      this.notified = true;
      setTimeout(this.fixConfiguration(), timer);
      return;
    }
    setTimeout(this.pushMessage("Config has been updated succeefully. Configuration Reloaded... (Messaage Dismiss in 2 second.)" /* CONFIGURATION_RELOADED */), timer);
  }
};

// src/configuration/shared/editor.ts
var vscode8 = __toESM(require("vscode"));
var writeEditorConfiguration = () => {
  const editorConfig = getWorkspaceConfiguration("editor");
  editorConfig.update("renderLineHighlight", "gutter", vscode8.ConfigurationTarget.Global);
  editorConfig.update("roundedSelection", false, vscode8.ConfigurationTarget.Global);
};

// src/configuration/shared/validation.ts
var sanitizeConfigValue = (value) => {
  if (!value || value === "null" || value.length === 0 || ifStringIsResourceScope.test(value)) {
    return void 0;
  }
  return value;
};
var sanitizeContentText = (contentText) => {
  return contentText.filter((text) => text !== void 0 && text.length > 0 || typeof text !== "string");
};
var convertNullStringToNull = (value) => {
  if (value === "null" || value.length === 0) {
    return null;
  }
  return value;
};

// src/util/util.ts
var readBits = (value, trueValue, falseValue, bitLength) => {
  let idx = bitLength ? bitLength : 4;
  const array = [];
  while (idx--) {
    if (value >> idx & 1) {
      array.push(Array.isArray(trueValue) ? trueValue[idx] : trueValue);
    } else {
      array.push(falseValue);
    }
  }
  return array;
};
var splitAndPosition = (str, regex) => {
  const match = str.match(regex);
  let split = [];
  if (match && match.index !== void 0) {
    split = str.split(regex);
    if (split[0].length === 0) {
      delete split[0];
      return {
        position: 0,
        array: [...split]
      };
    } else if (split[2].length === 0) {
      delete split[2];
      return {
        position: 1,
        array: [...split]
      };
    } else {
      return {
        position: 1,
        array: split
      };
    }
  }
  return;
};
var hexToRgbaStringLiteral = (hex, opacity = 0.6, defaultValue, opacityDefault) => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map((x) => x + x).join("");
  }
  const regex = /^[0-9A-Fa-f]{6}$/;
  if (!regex.test(hex)) {
    hex = defaultValue.replace(/^#/, "");
    opacity = opacityDefault;
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
var isEntriesEqual = (a, b) => a.length === b.length && a.every((element, index) => element[0] === b[index][0] && element[1] === b[index][1]);

// src/configuration/shared/decoration.ts
var vscode9 = __toESM(require("vscode"));
var leftMarginToMarginString = (leftMargin) => `0 0 0 ${leftMargin}`;
var castToFuncSignature = (result) => {
  if (result) {
    return {
      ...result,
      array: result.array.filter((entry) => entry !== void 0)
    };
  }
};
var setContentTextOnDecorationRenderOption = (source2, contentText) => {
  const target = { ...source2 };
  target.after = { ...source2.after };
  target.after.contentText = contentText;
  return target;
};
var searchPlaceholderPosition = (textOf, functionOf, functionKey, regex, search, lastIndex) => {
  const split = castToFuncSignature(splitAndPosition(search.nextSearchString, regex));
  if (split) {
    if (Object.hasOwn(functionOf, functionKey)) {
      split.array[split.position] = functionOf[functionKey];
    }
    if (lastIndex) {
      textOf.contentText?.push(...split.array);
      textOf.position[search.lastPosition + split.position] = functionKey;
    } else {
      if (split.position === 0) {
        textOf.contentText?.push(split.array[0]);
        textOf.position[search.lastPosition + split.position] = functionKey;
        search.nextSearchString = split.array[1];
        search.lastPosition = search.lastPosition + split.position + 1;
      } else if (split.position === 1 && split.array.length === 2) {
        textOf.position[search.lastPosition + split.position] = functionKey;
        textOf.contentText?.push(...split.array);
      } else if (split.position === 1 && split.array.length === 3) {
        textOf.contentText?.push(split.array[0], split.array[1]);
        textOf.position[search.lastPosition + split.position] = functionKey;
        search.nextSearchString = split.array[2];
        search.lastPosition = search.lastPosition + split.position + 1;
      }
    }
  }
};
var parseContentText = (contentText, sectionKey, bindTo, regexObject, sectionName) => {
  const match = contentText.match(ifContentTextHasPlaceholder);
  if (match !== null && Object.hasOwn(regexObject, sectionKey)) {
    if (match.length > Object.keys(regexObject[sectionKey]).length) {
      Error2.register(sectionName + "." + sectionKey, "numbers of placeholder exceed availability");
    }
    let searchObject = {
      nextSearchString: contentText,
      lastPosition: 0
    };
    bindTo.textOf[sectionKey].contentText = [];
    match.forEach((search, index) => {
      const regexKey = search.match(contentTextKeysOnly);
      if (regexKey) {
        if (Object.hasOwn(regexObject[sectionKey], regexKey[1])) {
          searchPlaceholderPosition(bindTo.textOf[sectionKey], bindTo.functionOf[sectionKey], regexKey[1], regexObject[sectionKey][regexKey[1]], searchObject, index === match.length - 1);
        } else {
          Error2.register(sectionName + "." + sectionKey, `Invalid placeholder '${regexKey[1]}' is set in user configration. Load default value instead for now. Please revise the value entered.`);
        }
      }
    });
    bindTo.textOf[sectionKey].contentText = sanitizeContentText(bindTo.textOf[sectionKey].contentText);
  } else {
    bindTo.textOf[sectionKey].contentText = [contentText];
  }
};
var convertToDecorationRenderOption = (config, isWholeLine = true, contentText = void 0) => {
  const decorationOption = { ...DECORATION_OPTION_CONFIG };
  decorationOption.isWholeLine = isWholeLine;
  decorationOption.rangeBehavior = vscode9.DecorationRangeBehavior.ClosedOpen;
  decorationOption.after = { ...DECORATION_OPTION_AFTER_CONFIG };
  if (contentText) {
    decorationOption.after.contentText = contentText;
  }
  if (!config.color) {
    return;
  }
  decorationOption.after.color = hexToRgbaStringLiteral(config.color, config.colorOpacity, "#333333", 0.7);
  if (config.backgroundColor && config.backgroundColor !== "null" && config.backgroundColor.length > 0) {
    decorationOption.after.backgroundColor = hexToRgbaStringLiteral(config.backgroundColor, config.backgroundOpacity, "#333333", 0.7);
    ;
  } else {
    delete decorationOption.after.backgroundColor;
  }
  if (config.fontWeight !== "normal") {
    decorationOption.after.fontWeight = config.fontWeight;
  } else {
    delete decorationOption.after.fontWeight;
  }
  if (config.fontStyle !== "normal") {
    decorationOption.after.fontStyle = config.fontStyle;
  } else {
    delete decorationOption.after.fontStyle;
  }
  delete decorationOption.after.margin;
  delete decorationOption.after.textDecoration;
  return decorationOption;
};

// src/configuration/shared/configuration.ts
var getWorkspaceConfiguration = (section) => vscode10.workspace.getConfiguration(section);
var colorConfigTransform = {
  borderColor: {
    of: "borderOpacity",
    fn: (v, n, d) => hexToRgbaStringLiteral(v, n, d)
  },
  backgroundColor: {
    of: "backgroundOpacity",
    fn: (v, n, d) => hexToRgbaStringLiteral(v, n, d)
  }
};
var getConfigValue = (configSection, configName, defaultValue, configSectionName) => {
  try {
    const value = configSection.get(configName, defaultValue);
    if (value === void 0) {
      console.warn(`Config value for ${configName} is undefined or caused an error. Using default value.`);
    }
    if (typeof value === "string") {
      return convertNullStringToNull(value);
    }
    return value;
  } catch (err) {
    if (configSectionName) {
      Error2.register(configSectionName + "." + configName, `Failed to get config value for ${configSectionName + "." + configName}:`);
    }
    console.error(`Failed to get config value for ${configSection + "." + configName}:`, err);
    return configSection.inspect(configName)?.defaultValue;
  }
};
var workspaceProxyConfiguration = (config, workspaceConfigSectionName, ifContentTextArray, bindTo, regexObject) => {
  Object.entries(config).forEach(([sectionKey, section]) => {
    if (typeof section !== "object") {
      const configValue = getConfigValue(getWorkspaceConfiguration(workspaceConfigSectionName), sectionKey, "not found", workspaceConfigSectionName);
      if (configValue && regexObject && bindTo && ifContentTextArray && ifContentTextArray.includes(sectionKey)) {
        const contentTextPosition = {
          contentText: [],
          position: {}
        };
        bindTo.textOf[sectionKey] = { ...contentTextPosition };
        parseContentText(configValue, sectionKey, bindTo, regexObject, workspaceConfigSectionName);
      }
      if (Object.hasOwn(config, sectionKey) && configValue !== void 0) {
        config[sectionKey] = configValue;
      }
    } else {
      workspaceProxyConfiguration(config[sectionKey], workspaceConfigSectionName + "." + sectionKey, ifContentTextArray, bindTo);
    }
  });
};

// src/configuration/decoration/highlight.ts
var checkConfigKeyAndCast = (key) => {
  return key;
};
var getConfigSet = (configReady, decorationKey) => {
  const configSectionName = DECORATION_STYLE_PREFIX[decorationKey];
  const defaultConfigDefinition = NO_CONFIGURATION_DEOCORATION_DEFAULT;
  const configSection = getWorkspaceConfiguration(configReady.name + "." + configSectionName);
  return Object.entries(defaultConfigDefinition).reduce((config, [configName, defaultValue]) => {
    const configValue = getConfigValue(configSection, checkConfigKeyAndCast(configName), defaultValue, configReady.name + "." + configSectionName);
    if (configValue !== void 0 && configValue !== null) {
      if (Object.hasOwn(colorConfigTransform, configName)) {
        const colorTransform = colorConfigTransform[configName];
        config[configName] = colorTransform.fn(configValue, configReady.generalConfigInfo[colorTransform.of], defaultValue);
      } else {
        config[configName] = configValue;
      }
    }
    return config;
  }, {});
};
var combineBorderStyle = (style) => {
  style.border = `${style.borderStyle} ${style.borderColor};`;
  delete style.borderStyle;
  delete style.borderColor;
  return style;
};
var createDecorationType = (config, decorationKey, decorationTypeSplit2) => {
  try {
    const split = decorationTypeSplit2(config, decorationKey);
    if (!split || split.length === 0) {
      return;
    }
    const decorationTypeStack = split.reduce((styledConfig, str) => {
      const conf = { ...config };
      conf.borderWidth = str;
      styledConfig.push(conf);
      return styledConfig;
    }, []).reduce((textEditorDecoration, styleAppliedConfig, idx) => {
      if (decorationKey === multiLine && idx !== 2) {
        delete styleAppliedConfig.backgroundColor;
      }
      textEditorDecoration.push(createEditorDecorationType(combineBorderStyle(styleAppliedConfig)));
      return textEditorDecoration;
    }, []);
    if (decorationTypeStack.length === 0) {
      return;
    }
    return decorationTypeStack;
  } catch (err) {
    console.log("creating decoration type thrown error:", decorationKey, err);
    return;
  }
};
var decorationTypeSplit = (config, decorationKey) => {
  if (Object.hasOwn(BORDER_WIDTH_DEFINITION, decorationKey)) {
    if (Object.hasOwn(BORDER_WIDTH_DEFINITION[decorationKey], String(config.borderPosition))) {
      return borderPosition(config, BORDER_WIDTH_DEFINITION[decorationKey][config.borderPosition]);
    }
    return;
  }
  return;
};
var borderPosition = (config, borderWidthMask) => {
  const borderWidth = [];
  for (const bitMask of borderWidthMask) {
    const border = readBits(bitMask, String(config.borderWidth), "0");
    borderWidth.push(border.join(" "));
  }
  return borderWidth;
};
var borderPositionParser = (selectionType, borderPosition2) => {
  const position = borderPosition2.replaceAll(" ", "").split("|");
  let isWholeLine = false;
  let beforeCursor = false;
  let afterCursor = false;
  let atLineStart = false;
  let selectionOnly = false;
  if (position.length > 1) {
    isWholeLine = /isWholeLine/s.test(position[1]);
    beforeCursor = /beforeCursor/s.test(position[1]);
    afterCursor = /afterCursor/s.test(position[1]);
    atLineStart = /atLineStart/s.test(position[1]);
    selectionOnly = /selectionOnly/s.test(position[1]);
    if (selectionType === multiLine && position[0] === "left") {
      isWholeLine = true;
    }
  }
  return {
    isWholeLine,
    borderPosition: position[0],
    beforeCursor,
    afterCursor,
    atLineStart,
    selectionOnly
  };
};
var updateGeneralConfig = (configReady) => {
  for (const key in configReady.generalConfigInfo) {
    if (key === "diagnosticTextEnabled" /* DIAGNOSTIC_TEXT_ENABLED */ || key === "selectionTextEnabled" /* SELECTION_TEXT_ENABLED */) {
      const sectionLinker = CONFIG_KEY_LINKER_SECTION[key];
      const configSection = getWorkspaceConfiguration(configReady.name + "." + sectionLinker[0]);
      const configValue = getConfigValue(configSection, sectionLinker[1], NO_CONFIGURATION_GENERAL_DEFAULT[key], configReady.name + "." + sectionLinker[0]);
      configReady.generalConfigInfo[key] = configValue;
    } else {
      const configSection = getWorkspaceConfiguration(configReady.name + "." + CONFIG_SECTION.general);
      configReady.generalConfigInfo[key] = getConfigValue(configSection, key, NO_CONFIGURATION_GENERAL_DEFAULT[key], configReady.name + "." + CONFIG_SECTION.general);
    }
  }
};
var updateHighlightStyleConfiguration = (configReady, selectionType) => {
  let bindTo = bindHighlightStyleState();
  if (bindTo.styleOf[selectionType]) {
    bindTo.styleOf[selectionType].forEach((decoration) => decoration.dispose());
  }
  const configSet = getConfigSet(configReady, selectionType);
  const parsed = borderPositionParser(selectionType, String(configSet.borderPosition));
  bindTo.infoOf[selectionType] = parsed;
  configSet.borderPosition = parsed.borderPosition;
  configSet.isWholeLine = parsed.isWholeLine;
  const decorationTypeList = createDecorationType(configSet, selectionType, decorationTypeSplit);
  if (!decorationTypeList) {
    return false;
  }
  bindTo.styleOf[selectionType] = decorationTypeList;
  delete bindTo.styleOf;
  delete bindTo.infoOf;
};
var generateHighlightDecoration = (configReady) => {
  updateGeneralConfig(configReady);
  for (const key of SELECTION_KIND_LIST) {
    const selectionType = key;
    updateHighlightStyleConfiguration(configReady, selectionType);
  }
  return true;
};

// src/configuration/collection/patch.ts
var vscode11 = __toESM(require("vscode"));
var legacyConfig = {
  borderOpacity: "general.borderOpacity",
  backgroundOpacity: "general.backgroundOpacity",
  statusTextEnabled: "selectionText.enabled",
  statusTextIconEnabled: "selectionText.iconEnabled",
  statusTextColor: "selectionText.color",
  statusTextBackgroundColor: "selectionText.backgroundColor",
  statusTextOpacity: "selectionText.opacity",
  statusTextFontStyle: "selectionText.fontStyle",
  statusTextFontWeight: "selectionText.fontWeight",
  cursorOnlyBorderColor: "cursorOnly.borderColor",
  cursorOnlyBackgroundColor: "cursorOnly.backgroundColor",
  cursorOnlyBorderPosition: "cursorOnly.borderPosition",
  cursorOnlyBorderWidth: "cursorOnly.borderWidth",
  cursorOnlyBorderStyle: "cursorOnly.borderStyle",
  cursorOnlyBorderStyleWithafterCursor: "cursorOnly.borderStyleWithafterCursor",
  singleLineBorderColor: "singleLine.borderColor",
  singleLineBackgroundColor: "singleLine.backgroundColor",
  singleLine: "singleLine.borderPosition",
  singleLineBorderWidth: "singleLine.borderWidth",
  singleLineBorderStyle: "singleLine.borderStyle",
  multiLineBorderColor: "multiLine.borderColor",
  multiLineBackgroundColor: "multiLine.backgroundColor",
  multiLineBorderPosition: "multiLine.borderPosition",
  multiLineBorderWidth: "multiLine.borderWidth",
  multiLineBorderStyle: "multiLine.borderStyle",
  multiCursorBorderColor: "multiCursor.borderColor",
  multiCursorBackgroundColor: "multiCursor.backgroundColor",
  multiCursorBorderPosition: "multiCursor.borderPosition",
  multiCursorBorderWidth: "multiCursor.borderWidth",
  multiCursorBorderStyle: "multiCursor.borderStyle"
};
var updateUserSetting = (extensionConfig, newKey, value) => {
  return extensionConfig.update(newKey, value, vscode11.ConfigurationTarget.Global);
};
var removeUserSetting = (extensionConfig, key) => {
  return extensionConfig.update(key, void 0, vscode11.ConfigurationTarget.Global);
};
var updateLegacyConfig = async (configReady) => {
  const extensionConfig = getWorkspaceConfiguration(configReady.name);
  Object.entries(extensionConfig).forEach(async ([key, value]) => {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      if (Object.hasOwn(legacyConfig, key)) {
        const newKey = legacyConfig[key];
        await updateUserSetting(extensionConfig, newKey, value);
        await removeUserSetting(extensionConfig, key);
      }
    }
  });
};

// src/configuration/decoration/selection.ts
var convertPositionToDecorationRenderOption = (textPosition, SelectionDecorationStyle) => {
  return textPosition.contentText.map((text, idx) => {
    const option = typeof text === "string" ? SelectionDecorationStyle.placeholderDecorationOption : SelectionDecorationStyle.selectionDecorationOption[textPosition.position[idx]];
    const contentTextRenderOption = setContentTextOnDecorationRenderOption(option, text);
    if (typeof text === "symbol") {
      textPosition.position[idx] = contentTextRenderOption.after.contentText;
    }
    return contentTextRenderOption;
  }).filter((decorationOption) => decorationOption !== void 0);
};
var buildSelectionTextDecorationRenderOption = (config, style) => {
  style.placeholderDecorationOption = convertToDecorationRenderOption(config, true);
  Object.keys(style.selectionDecorationOption).forEach((key, idx) => {
    const styleConfig = {
      color: config.selectionCountTextStyle[key],
      colorOpacity: config.selectionCountTextStyle.opacity,
      fontStyle: config.selectionCountTextStyle.fontStyle,
      fontWeight: config.selectionCountTextStyle.fontWeight
    };
    style.selectionDecorationOption[key] = convertToDecorationRenderOption(styleConfig, true);
  });
};
var createSharedObjectSync = (textOftarget, textOfSource) => {
  const cursorOnly2 = Object.entries(textOfSource.cursorOnlyText.position);
  cursorOnly2.forEach(([pos, placeholder]) => {
    const referenceObject = textOftarget[cursorOnlyText].contentText[pos].after;
    syncRefernceTable(placeholder, cursorOnly, referenceObject);
  });
  const singleLine2 = Object.entries(textOfSource.singleLineText.position);
  singleLine2.forEach(([pos, placeholder]) => {
    const referenceObject = textOftarget[singleLineText].contentText[pos].after;
    syncRefernceTable(placeholder, singleLine, referenceObject);
  });
  const anchor = Object.entries(textOfSource.multiLineAnchorText.position);
  const cursor2 = Object.entries(textOfSource.multiLineCursorText.position);
  if (isEntriesEqual(anchor, cursor2)) {
    anchor.forEach(([pos, placeholder], idx) => {
      const referenceObject = textOftarget[multiLineAnchorText].contentText[pos].after;
      textOftarget[multiLineCursorText].contentText[pos].after = referenceObject;
      syncRefernceTable(placeholder, multiLine, referenceObject);
    });
  } else {
  }
  const multiCursorText2 = Object.entries(textOfSource.multiCursorText.position);
  multiCursorText2.forEach(([pos, placeholder]) => {
    const referenceObject = textOftarget[multiCursorText].contentText[pos].after;
    syncRefernceTable(placeholder, multiCursorText, referenceObject);
    setMultiCursorTextPosition(placeholder, parseInt(pos));
  });
  const multiCursorEdit2 = Object.entries(textOfSource.multiCursorEdit.position);
  multiCursorEdit2.forEach(([pos, placeholder]) => {
    const referenceObject = textOftarget[multiCursorEdit].contentText[pos].after;
    syncRefernceTable(placeholder, multiCursorEdit, referenceObject);
    setMultiCursorEditPosition(placeholder, parseInt(pos));
  });
  setMultiCursorContext();
};
var buildStatusTextState = (textOftarget, textOfSource, SelectionDecorationStyle, leftMargin) => {
  Object.entries(textOfSource).forEach(([key, textPosition], idx) => {
    const contentTextStyled = convertPositionToDecorationRenderOption(textPosition, SelectionDecorationStyle);
    ;
    const hexKey = SELECTION_CONTENT_TEXT_NUMLINK[key];
    textOftarget[hexKey] = {
      contentText: contentTextStyled,
      position: Object.entries(textPosition.position)
    };
    if (leftMargin && leftMargin !== "0px" || leftMargin !== "0em") {
      if (textOftarget[hexKey].contentText[0]) {
        textOftarget[hexKey].contentText[0].after["margin"] = leftMarginToMarginString(leftMargin);
      }
    }
  });
  const cursorOnlyText2 = textOftarget[cursorOnlyText];
  const singleLineText2 = textOftarget[singleLineText];
  const multiLineAnchorText2 = textOftarget[multiLineAnchorText];
  const multiCursorText2 = textOftarget[multiCursorText];
  const multiCursorEdit2 = textOftarget[multiCursorEdit];
  [
    [cursorOnlyText, cursorOnlyText2.contentText.length, cursorOnlyText2.position],
    [singleLineText, singleLineText2.contentText.length, singleLineText2.position],
    [multiLineText, multiLineAnchorText2.contentText.length, multiLineAnchorText2.position],
    [multiCursorText, multiCursorText2.contentText.length, multiCursorText2.position],
    [multiCursorEdit, multiCursorEdit2.contentText.length, multiCursorEdit2.position]
  ].forEach(([hexKey, length, placeholder]) => {
    setSelectionTextbuffer(hexKey, length, placeholder);
  });
  createSharedObjectSync(textOftarget, textOfSource);
};
var updateSelectionTextConfig = (extenionName, configuratioChange = false) => {
  const SelectionDecorationConfig = { ...SELECTION_DECORAITON_CONFIG };
  const SelectionDecorationStyle = { ...SELECTION_DECORATION_STYLE };
  const bindTo = bindStatusContentTextState();
  const bindToBuffer = {
    functionOf: bindTo.functionOf,
    textOf: {}
  };
  workspaceProxyConfiguration(SelectionDecorationConfig, extenionName + "." + CONFIG_SECTION.selectionText, SELECTION_CONTENT_TEXT_LIST, bindToBuffer, SelectionTextRegex);
  buildSelectionTextDecorationRenderOption(SelectionDecorationConfig, SelectionDecorationStyle);
  buildStatusTextState(bindTo.textOf, bindToBuffer.textOf, SelectionDecorationStyle, SelectionDecorationConfig.leftMargin);
  delete bindTo.functionOf;
  delete bindTo.infoOf;
  delete bindTo.textOf;
  delete bindToBuffer.textOf;
  delete bindToBuffer.functionOf;
  return true;
};

// src/configuration/decoration/diagnostic.ts
var positionKeyList = ["pre", "post"];
var positionKeyToPlaceholderName = { pre: "prefix", post: "postfix" };
var applyExtraStyle = (textOf, extraStyle, leftMargin) => {
  const sidePadding = extraStyle.sidePadding !== "null" ? extraStyle.sidePadding : null;
  const topDownPadding = extraStyle.topDownPadding !== "null" ? extraStyle.topDownPadding : null;
  Object.entries(textOf).forEach(([hexKey, option]) => {
    option.map((optonList) => optonList.filter((ro) => ro.length > 0)).forEach((text, idx, array) => {
      if (extraStyle.backgroundColor && extraStyle.backgroundOpacity) {
        textOf[hexKey][idx][0].renderOptions.after["backgroundColor"] = hexToRgbaStringLiteral(extraStyle.backgroundColor, extraStyle.backgroundOpacity, "#333333", 0.7);
        ;
      }
      if (extraStyle.borderRadius) {
        if (idx === 0) {
          textOf[hexKey][0][0].renderOptions.after["textDecoration"] = `;border-top-left-radius:${extraStyle.borderRadius};border-bottom-left-radius:${extraStyle.borderRadius};padding-left:${sidePadding}`;
        }
        if (idx === array.length - 1) {
          textOf[hexKey][idx][0].renderOptions.after["textDecoration"] = `;border-top-right-radius:${extraStyle.borderRadius};border-bottom-right-radius:${extraStyle.borderRadius};padding-right:${sidePadding}`;
        }
      }
      if (topDownPadding) {
        textOf[hexKey][idx][0].renderOptions.after["textDecoration"] += `;padding-top:${topDownPadding};padding-bottom:${topDownPadding}`;
      }
      if (leftMargin !== "0px" && leftMargin !== "0em" && leftMargin && idx === 0) {
        textOf[hexKey][0][0].renderOptions.after["textDecoration"] += `;margin-left:${leftMargin}`;
      }
    });
  });
};
var convertPositionDecorationRenderOption = ({ textPosition, primaryStyle, secondaryStyle, notation, leftMargin }) => {
  return textPosition.contentText.map((text, idx) => {
    const key = textPosition.position[idx];
    let decorationStyle = primaryStyle;
    if (positionKeyList.includes(key)) {
      if (!Object.hasOwn(notation, positionKeyToPlaceholderName[key])) {
        return;
      }
      decorationStyle = secondaryStyle;
    }
    return setContentTextOnDecorationRenderOption(decorationStyle, text);
  }).filter((decorationOption) => decorationOption !== void 0);
};
var buildDiagnosticTextPreset = (preset, textOftarget, textOfSource, style, leftMargin = "") => {
  const convertPositionWrapper = (context2, target, propertyName, contentTextHeyKey) => {
    if (Object.hasOwn(target[propertyName], contentTextHeyKey)) {
      if (target[propertyName][contentTextHeyKey].notation) {
        context2.notation = target[propertyName][contentTextHeyKey].notation;
      }
      const contentTextList = convertPositionDecorationRenderOption(context2);
      target[propertyName][contentTextHeyKey].contentText = contentTextList;
    }
  };
  Object.entries(textOfSource).forEach(([contentTextName, textPosition]) => {
    const linker = DECORATION_OPTION_LINKER[contentTextName];
    const context2 = {
      textPosition,
      primaryStyle: style.diagnosticDecorationOption[linker[0]],
      secondaryStyle: linker[1] ? style.diagnosticDecorationOption[linker[1]] : null,
      notation: [],
      leftMargin
    };
    ["workspace", "editor", "all", "layout"].forEach((biome) => {
      convertPositionWrapper(context2, preset, biome, DIAGNOSTIC_CONTENT_TEXT_NAME_TO_NUM[contentTextName]);
    });
  });
  const concatinateNotation = (text) => {
    return text.contentText.map((decoration) => {
      if (decoration.after.contentText === prefixSymbol) {
        decoration.after.contentText = text.notation.prefix ? text.notation.prefix : void 0;
      }
      if (decoration.after.contentText === postfixSymbol) {
        decoration.after.contentText = text.notation.postfix ? text.notation.postfix : void 0;
      }
      return decoration;
    }).filter((decoration) => decoration.after.contentText !== void 0);
  };
  preset.layout[allOkPlaceholderContentText].contentText.forEach((decoration) => {
    if (decoration.after.contentText === allOkHexKey) {
      const ok = concatinateNotation(preset.all[allOkContentText]);
      composeRenderOption2(allOkOverride, [...ok]);
    } else {
      composeRenderOption2(allOkOverride, [{ ...decoration }]);
    }
  });
  preset.layout[problemPlaceholderContentText].contentText.forEach((decoration) => {
    if (decoration.after.contentText === editorHexKey) {
      const ok = concatinateNotation(preset.editor[okEditorContentText]);
      const warn = concatinateNotation(preset.editor[warningEditorContentText]);
      const err = concatinateNotation(preset.editor[errorEditorContentText]);
      composeRenderOption2(allOkNoOverride, [...ok]);
      composeRenderOption2(editorOkWorkspaceWarn, [...ok]);
      composeRenderOption2(editorOkWorkspaceErr, [...ok]);
      composeRenderOption2(editorOkWorkspaceWarnErr, [...ok]);
      composeRenderOption2(editorWarnWorkspaceWarn, [...warn]);
      composeRenderOption2(editorWarnWorkspaceErr, [...warn]);
      composeRenderOption2(editorWarnWorkspaceWarnErr, [...warn]);
      composeRenderOption2(editorErrWorkspaceErr, [...err]);
      composeRenderOption2(editorErrWorkspaceWarnErr, [...err]);
      composeRenderOption2(editorWarnErrWorkspaceWarnErr, [...warn, ...err]);
      return;
    }
    if (decoration.after.contentText === workspaceHexKey) {
      const ok = concatinateNotation(preset.workspace[okWorkspaceContentText]);
      const warn = concatinateNotation(preset.workspace[warningWorkspaceContentText]);
      const err = concatinateNotation(preset.workspace[errorWorkspaceContentText]);
      composeRenderOption2(allOkNoOverride, [...ok]);
      composeRenderOption2(editorOkWorkspaceWarn, [...warn]);
      composeRenderOption2(editorOkWorkspaceErr, [...err]);
      composeRenderOption2(editorOkWorkspaceWarnErr, [...warn, ...err]);
      composeRenderOption2(editorWarnWorkspaceWarn, [...warn]);
      composeRenderOption2(editorWarnWorkspaceErr, [...err]);
      composeRenderOption2(editorWarnWorkspaceWarnErr, [...warn, ...err]);
      composeRenderOption2(editorErrWorkspaceErr, [...err]);
      composeRenderOption2(editorErrWorkspaceWarnErr, [...warn, ...err]);
      composeRenderOption2(editorWarnErrWorkspaceWarnErr, [...warn, ...err]);
      return;
    }
    DIAGNOSTIC_PROBLEM_LIST.forEach((hexKey) => {
      composeRenderOption2(hexKey, [{ ...decoration }]);
    });
  });
};
var ifNoationNotNull = (property, str) => {
  if (str !== "null" && str.length > 0 && !ifStringIsResourceScope.test(str)) {
    return {
      [property]: str
    };
  }
  return {};
};
var createNotation = (biome, prefix2, postfix2) => {
  return {
    [biome]: {
      ...DIAGNOSTIC_DECORATION_TEXT_KIND,
      notation: {
        ...ifNoationNotNull("prefix", prefix2),
        ...ifNoationNotNull("postfix", postfix2)
      }
    }
  };
};
var ifNoation = (config, key, biome, linker) => {
  const prefix2 = biome + "Prefix";
  const postfix2 = biome + "Postfix";
  if (config[key][prefix2] !== void 0 && config[key][postfix2] !== void 0) {
    return createNotation(linker[key], config[key][prefix2], config[key][postfix2]);
  }
};
var overrideStyle = (config, overrideBiome) => {
  const allOkOverrideColor = {};
  const problemOverrideColor = {};
  const overrideStyleDescription = {
    [1 /* OK */]: {
      styleName: "okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */,
      target: [problemOverrideColor, allOkOverrideColor]
    },
    [2 /* WARN */]: {
      styleName: "warningNotationTextStyle" /* WARNING_NOTATION_TEXT_STYLE */,
      target: [problemOverrideColor]
    },
    [4 /* ERR */]: {
      styleName: "errorNotationTextStyle" /* ERROR_NOTATION_TEXT_STYLE */,
      target: [problemOverrideColor]
    }
  };
  Object.entries(overrideStyleDescription).forEach(([biome, override]) => {
    if (overrideBiome & Number(biome) && config[override.styleName]) {
      override.target.forEach((color) => {
        color[biome] = {
          color: hexToRgbaStringLiteral(config[override.styleName].color, config[override.styleName].colorOpacity, "#333333", 0.7)
        };
      });
    }
  });
  return {
    [problemPlaceholderContentText]: {
      override: Object.keys(problemOverrideColor).length > 0 ? problemOverrideColor : void 0
    },
    [allOkPlaceholderContentText]: {
      override: Object.keys(allOkOverrideColor).length > 0 ? allOkOverrideColor : void 0
    }
  };
};
var buildDiagnosticStyle = (config, style, diagnosticStyleList, visibility, diagnosticBiome) => {
  const result = {
    workspace: {},
    editor: {},
    all: {},
    layout: {
      [problemPlaceholderContentText]: {},
      [allOkPlaceholderContentText]: {}
    }
  };
  if (config.leftMargin) {
    style.leftMargin = config.leftMargin;
  }
  diagnosticStyleList.forEach((styleName) => {
    const styleConfig = {
      // this is due to syle config values are in proxy object.
      color: sanitizeConfigValue(config[styleName].color),
      colorOpacity: config[styleName].colorOpacity,
      backgroundColor: sanitizeConfigValue(config[styleName].backgroundColor),
      backgroundOpacity: config[styleName].backgroundOpacity,
      fontStyle: sanitizeConfigValue(config[styleName].fontStyle),
      fontWeight: sanitizeConfigValue(config[styleName].fontWeight)
    };
    style.diagnosticDecorationOption[styleName] = convertToDecorationRenderOption(styleConfig, true);
    result.workspace = {
      ...result.workspace,
      ...ifNoation(config, styleName, "workspace", DIAGNOSTIC_WORKSPACE_PLACEHOLDER_LINKER)
    };
    result.editor = {
      ...result.editor,
      ...ifNoation(config, styleName, "editor", DIAGNOSTIC_EDITOR_PLACEHOLDER_LINKER)
    };
    result.all = {
      ...result.all,
      ...ifNoation(config, styleName, "all", DIAGNOSTIC_ALL_PLACEHOLDER_LINKER)
    };
  });
  const overrideBiome = diagnosticBiome.workspace | diagnosticBiome.editor;
  const ifOverrride = visibility.overrideLayoutPlaceholderColorToHighestSeverity ? overrideStyle(config, overrideBiome) : void 0;
  return {
    ...result,
    layout: {
      [problemPlaceholderContentText]: {},
      [allOkPlaceholderContentText]: {},
      ...ifOverrride
    }
  };
};
var hideMkask = (hideOk = false, hideWarning = false) => {
  let mask = 7 /* ALL */;
  mask ^= hideOk ? 1 /* OK */ : 0;
  mask ^= hideWarning ? 2 /* WARN */ : 0;
  return mask;
};
var diagnosticVisibilityBiome = (visibility) => {
  let workspacMask = 7 /* ALL */;
  let editorMask = 7 /* ALL */;
  if (visibility.DiagnosticKind === "workspace Only") {
    editorMask = 0 /* NONE */;
    workspacMask &= hideMkask(visibility.hideOk, visibility.hideWarning);
  }
  if (visibility.DiagnosticKind === "editor Only") {
    workspacMask = 0 /* NONE */;
    editorMask &= hideMkask(visibility.hideOk, visibility.hideWarning);
  }
  return {
    workspace: workspacMask,
    editor: editorMask
  };
};
var reversedStyleList = (() => {
  const styleList = [...DIAGNOSTIC_STYLE_LIST];
  styleList.reverse().push(["0", "0"]);
  return styleList;
})();
var decorationStyleFromBiome = (diagnosticBiome) => [
  ...readBits(diagnosticBiome, reversedStyleList, 0, 4).filter((styles) => styles !== 0).flat(),
  "diagnosticPlaceholderTextStyle" /* DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE */
];
var setGlyph = (glyphList, config) => {
  glyphList[openningBracket] = config.openningBracket;
  glyphList[closingBracket] = config.closingBracket;
  glyphList[lineEqual] = config.lineEqual;
  glyphList[lineUp] = config.lineUp;
  glyphList[lineDown] = config.lineDown;
};
var setCursorLine = (bindTo, visibility) => {
  if (visibility.placeTextOnPreviousOrNextLine === "previousLine") {
    bindTo.rangeFunction = createCursorRangeLine(-1);
    return;
  }
  if (visibility.placeTextOnPreviousOrNextLine === "previousLine (auto-inline)") {
    bindTo.rangeFunction = createCursorRangeLineAuto(-1);
    return;
  }
  if (visibility.placeTextOnPreviousOrNextLine === "nextLine") {
    bindTo.rangeFunction = createCursorRangeLine(1);
    return;
  }
  if (visibility.placeTextOnPreviousOrNextLine === "nextLine (auto-inline)") {
    bindTo.rangeFunction = createCursorRangeLineAuto(1);
    return;
  }
  setAutoInlineDatumPoint(visibility.autoInlineDatumPoint);
  bindTo.rangeFunction = createCursorRange;
  return;
};
var updateDiagnosticTextConfig = async (extenionName, configuratioChange = false) => {
  const diagnosticConfig = { ...DIAGNOSTIC_CONFIG };
  const diagnosticDecorationStyle = { ...DIAGNOSTIC_DECORATION_STYLE };
  const dignosticContentTextPreset = {
    layout: {},
    editor: {},
    workspace: {},
    all: {}
  };
  const bindTo = bindDiagnosticContentTextState();
  let bindToBuffer = {
    functionOf: bindTo.functionOf,
    textOf: {}
  };
  if (configuratioChange) {
    clearDiagnosticTextState();
  }
  workspaceProxyConfiguration(diagnosticConfig, extenionName + "." + CONFIG_SECTION.diagnosticText, DIAGNOSTIC_CONTENT_TEXT_LIST, bindToBuffer, diagnosticTextRegex);
  const placeholderDigit = diagnosticConfig.visibility.overrideAllOk ? allOkOverride : allOkNoOverride;
  const diagnosticBiome = diagnosticVisibilityBiome(diagnosticConfig.visibility);
  const decorationStyleList = decorationStyleFromBiome(diagnosticBiome.workspace | diagnosticBiome.editor);
  Object.assign(dignosticContentTextPreset, buildDiagnosticStyle(diagnosticConfig, diagnosticDecorationStyle, decorationStyleList, diagnosticConfig.visibility, diagnosticBiome));
  Object.assign(bindTo.configOf, diagnosticConfig.visibility);
  buildDiagnosticTextPreset(dignosticContentTextPreset, bindTo.textOf.contentText, bindToBuffer.textOf, diagnosticDecorationStyle, diagnosticConfig.leftMargin);
  applyExtraStyle(bindTo.textOf.contentText, diagnosticConfig.diagnosticPlaceholderTextStyle, diagnosticConfig.leftMargin);
  setGlyph(bindTo.textOf.glyphList, diagnosticConfig.glyphList);
  setCursorLine(bindTo.functionOf, diagnosticConfig.visibility);
  setOverrideDigit(placeholderDigit);
  initializeStateBuffer(placeholderDigit);
  setDiagonosticTextbuffer();
  delete bindToBuffer.textof;
  delete bindToBuffer.functionOf;
  delete bindTo.visibilityOf;
  delete bindTo.functionOf;
  delete bindTo.textOf.contentText;
  delete bindTo.textOf.glyphList;
  delete bindTo.textof;
  delete bindTo.configOf;
  return true;
};

// src/configuration/load.ts
var configInfo = {
  ...CONFIG_INFO
};
var loadConfiguration = (context2) => {
  const name = context2?.extension.packageJSON.name;
  if (!name) {
    return;
  }
  configInfo.name = name;
  if (!configInfo.name) {
    return;
  }
  const configReady = configInfo;
  const decorationState2 = bindEditorDecoration().stateOf;
  if (!configReady.configError) {
    configReady.configError = [];
    updateLegacyConfig(configReady);
  }
  writeEditorConfiguration();
  if (generateHighlightDecoration(configReady)) {
    if (configReady.generalConfigInfo.selectionTextEnabled) {
      updateSelectionTextConfig(configReady.name);
    }
    if (configReady.generalConfigInfo.diagnosticTextEnabled) {
      updateDiagnosticTextConfig(configReady.name);
    }
    return {
      config: configReady,
      decoration: decorationState2
    };
  }
  return;
};

// src/command/register.ts
var vscode13 = __toESM(require("vscode"));

// src/command/preset.ts
var vscode12 = __toESM(require("vscode"));
var import_path = __toESM(require("path"));
var import_promises = require("node:fs/promises");
var clearConfiguration = (context2) => (value) => {
  if (value === "Yes" /* YES */) {
    for (const section of Object.values(CONFIG_SECTION)) {
      const config = getWorkspaceConfiguration(context2.package.extension.packageJSON.name + "." + section);
      for (const key of Object.keys(config)) {
        if (typeof config[key] !== "function" && key.length > 0) {
          config.update(key, void 0, true);
        }
      }
    }
    vscode12.window.showInformationMessage("Configuration has been restored to default." /* RESTORE_DEFAULT_COMPLETE */);
  }
};
var restoreToDefault = () => {
  return overrideConfirm("Are you sure to restore to default?" /* RESTORE_DEFAULT */);
};
var readPreset = async (context2, presetFilename) => {
  try {
    const jsonPath = context2.asAbsolutePath(import_path.default.join("resource/preset/" /* PRESET_ROOT */, presetFilename));
    const content = await (0, import_promises.readFile)(jsonPath, { encoding: "utf-8" });
    return JSON.parse(content);
  } catch (error2) {
    console.error("Failed to load preset JSON:", error2);
  }
};
var writeConfiguration = (configInfo2, packageName, json) => (selected) => {
  if (selected === "Yes" /* YES */) {
    return writeSelectedPreset(configInfo2, packageName, json);
  }
};
var checkDuplciateOverride = (packageName, json) => {
  const config = getWorkspaceConfiguration(packageName);
  for (const section of Object.keys(json)) {
    const inspected = config.inspect(section);
    if (inspected?.globalValue) {
      return true;
    }
  }
  return false;
};
var writeSelectedPreset = async (configInfo2, packageName, json) => {
  configInfo2.updateCaller = configruationCallerPreset;
  vscode12.commands.executeCommand("workbench.view.explorer");
  const config = getWorkspaceConfiguration(packageName);
  const section = Object.keys(json);
  let ridx = section.length;
  while (ridx--) {
    if (typeof json[section[ridx]] === "object") {
      const proxy = config.inspect(section[ridx]);
      await config.update(section[ridx], { ...proxy?.globalValue, ...json[section[ridx]] }, true);
    } else {
      await config.update(section[ridx], json[section[ridx]], true);
    }
  }
  resetAllDecoration();
  updateGeneralConfig(configInfo2);
  updateHighlightStyleConfiguration(configInfo2, cursorOnly);
  updateHighlightStyleConfiguration(configInfo2, singleLine);
  updateHighlightStyleConfiguration(configInfo2, multiLine);
  updateHighlightStyleConfiguration(configInfo2, multiCursor);
  updateSelectionTextConfig(packageName, true);
  updateDiagnosticTextConfig(packageName, true);
  prepareRenderGroup(configInfo2);
  configInfo2.updateCaller = void 0;
};
var overrideConfirm = (message) => {
  return vscode12.window.showWarningMessage(message, ...["Yes" /* YES */, "No" /* NO */]);
};
var quickPickWrapper = async (context2, { presetList: presetList2, fileList, placeHolder }) => {
  const preset = await vscode12.window.showQuickPick(presetList2.map((l) => {
    return { label: l };
  }), { placeHolder });
  if (preset && Object.hasOwn(fileList, preset.label.toString())) {
    const packageName = context2.package.extension.packageJSON.name;
    const json = await readPreset(context2.package, fileList[preset.label.toString()]);
    const write = writeConfiguration(context2.configInfo, packageName, json ? json : {});
    if (checkDuplciateOverride(context2.package.extension.packageJSON.name, json)) {
      await overrideConfirm("Configuration will be overwritten. Proceed?" /* OVERRIDE_CONFIRM */).then(write);
    } else {
      await write("Yes" /* YES */);
    }
  }
};
var presetList = {
  presetList: ["Detailed" /* DETAILED */, "Simple" /* SIMPLE */, "No Glpyph - Detailed" /* NO_GLYPH_D */, "No Glpyph - Simple" /* NO_GLYPH_S */, "Emoji - Detailed" /* EMOJI_D */, "Emoji - Simple" /* EMOJI_S */],
  fileList: {
    ["Detailed" /* DETAILED */]: "detailed.json" /* PRESET_DETAILED */,
    ["Simple" /* SIMPLE */]: "simple.json" /* PRESET_SIMPLE */,
    ["No Glpyph - Detailed" /* NO_GLYPH_D */]: "no-glyph-detailed.json" /* PRESET_NO_GLYPH_D */,
    ["No Glpyph - Simple" /* NO_GLYPH_S */]: "no-glyph-simple.json" /* PRESET_NO_GLYPH_S */,
    ["Emoji - Detailed" /* EMOJI_D */]: "emoji-detailed.json" /* PRESET_EMOJI_D */,
    ["Emoji - Simple" /* EMOJI_S */]: "emoji-simple.json" /* PRESET_EMOJI_S */
  },
  placeHolder: " ... Select the Preset" /* PRESET_SELCT */
};
var presetOridentation = {
  presetList: ["Horizontal" /* HORIZONTAL */, "Vertical" /* VERTICAL */],
  fileList: {
    ["Horizontal" /* HORIZONTAL */]: "orientation-horizontal.json" /* PRESET_ORIENTATION_HORIZONTAL */,
    ["Vertical" /* VERTICAL */]: "orientation-vertical.json" /* PRESET_ORIENTATION_VERTICAL */
  },
  placeHolder: " ... Select the Preset Orientation" /* PRESET_SELCT_ORIENTATION */
};
var presetColor = {
  presetList: ["Light" /* LIGHT */, "Dark" /* DARK */],
  fileList: {
    ["Light" /* LIGHT */]: "color-light-theme.json" /* THEME_LIGHT */,
    ["Dark" /* DARK */]: "color-dark-theme.json" /* THEME_DARK */
  },
  placeHolder: " ... Select the Color Contrast" /* PRESET_SELCT_COLOR_CONTRAST */
};
var presetContrast = {
  presetList: ["Dim" /* DIM */, "Bright" /* BRIGHT */],
  fileList: {
    ["Dim" /* DIM */]: "contrast-dim.json" /* CONTRAST_DIM */,
    ["Bright" /* BRIGHT */]: "contrast-bright.json" /* CONTRAST_BRIGHT */
  },
  placeHolder: " ... Select the Theme Color" /* PRESET_SELCT_COLOR */
};
var quickPickPresetList = (context2) => quickPickWrapper(context2, presetList);
var quickPickOientationList = (context2) => quickPickWrapper(context2, presetOridentation);
var quickPickColorList = (context2) => quickPickWrapper(context2, presetColor);
var quickPickContrastList = (context2) => quickPickWrapper(context2, presetContrast);
var checkActiveThemeKind = async (context2) => {
  if (vscode12.window.activeColorTheme.kind === vscode12.ColorThemeKind.Light) {
    const packageName = context2.package.extension.packageJSON.name;
    const json = await readPreset(context2.package, "color-light-theme.json" /* THEME_LIGHT */);
    if (json && !checkDuplciateOverride(context2.package.extension.packageJSON.name, json)) {
      await writeSelectedPreset(context2.configInfo, packageName, json);
    }
  }
};

// src/command/register.ts
var setPreset = (context2) => {
  return vscode13.commands.registerCommand("cursorlinehighlight.applyPreset", () => quickPickPresetList(context2));
};
var setColor = (context2) => {
  return vscode13.commands.registerCommand("cursorlinehighlight.setColor", () => quickPickColorList(context2));
};
var setContrast = (context2) => {
  return vscode13.commands.registerCommand("cursorlinehighlight.setContrast", () => quickPickContrastList(context2));
};
var setOrientation = (context2) => {
  return vscode13.commands.registerCommand("cursorlinehighlight.setOrientation", () => quickPickOientationList(context2));
};
var resetConfiguration = (context2) => {
  return vscode13.commands.registerCommand("cursorlinehighlight.restoreToDefaultConfiguration", () => restoreToDefault().then(clearConfiguration(context2)));
};

// src/event/window.ts
var vscode14 = __toESM(require("vscode"));
var windowStateChanged = ({ decorationState: decorationState2 }) => {
  const onDidChangeWindowState = vscode14.window.onDidChangeWindowState((event) => {
    if (event.focused) {
      if (vscode14.window.activeTextEditor) {
        updateIndentOption(vscode14.window.activeTextEditor);
        decorationState2.appliedHighlight[0] = renderGroupIs(vscode14.window.activeTextEditor, [cursorOnly]);
      }
    } else {
      resetAllDecoration();
    }
    if (!event.focused && !event.active) {
      resetAllDecoration();
      console.log("idling");
    }
  });
  return onDidChangeWindowState;
};
var activeEditorChanged = ({ configInfo: configInfo2, decorationState: decorationState2 }) => {
  return vscode14.window.onDidChangeActiveTextEditor((editor2) => {
    if (editor2) {
      if (Error2.check()) {
        Error2.notify(1500);
      }
      resetAllDecoration();
      forceDispatchEditorChange(editor2);
      updateRangeMetadata(editor2);
      if (configInfo2.generalConfigInfo.diagnosticTextEnabled) {
        resetEditorDiagnosticStatistics();
        resetWorkspaceDiagnosticStatistics();
        decorationState2.eventTrigger[0] = diagnosticChanged;
      }
      updateIndentOption(editor2);
      decorationState2.appliedHighlight[0] = renderGroupIs(editor2, [cursorOnly]);
    }
  });
};
var editorOptionChanged = (context2) => {
  return vscode14.window.onDidChangeTextEditorOptions((event) => {
    if (event.textEditor) {
      updateIndentOption(event.textEditor);
    }
  });
};
var selectionChanged2 = ({ decorationState: decorationState2 }) => {
  return vscode14.window.onDidChangeTextEditorSelection((event) => {
    decorationState2.eventTrigger[0] = selectionChanged;
    decorationState2.appliedHighlight[0] = renderGroupIs(vscode14.window.activeTextEditor, decorationState2.appliedHighlight);
  });
};

// src/event/workspace.ts
var vscode15 = __toESM(require("vscode"));

// src/configuration/shared/update.ts
var configurationChanged = (configInfo2, section) => {
  try {
    Error2.configurationUpdated();
    const sectionChanged = {
      ["general" /* GENERAL */]: () => updateGeneralConfig(configInfo2),
      ["cursorOnly" /* CURSOR_ONLY */]: () => updateHighlightStyleConfiguration(configInfo2, cursorOnly),
      ["singleLine" /* SINGLE_LINE */]: () => updateHighlightStyleConfiguration(configInfo2, singleLine),
      ["multiLine" /* MULTI_LINE */]: () => updateHighlightStyleConfiguration(configInfo2, multiLine),
      ["multiCursor" /* MULTI_CURSOR */]: () => updateHighlightStyleConfiguration(configInfo2, multiCursor),
      ["selectionText" /* SELECTION_TEXT */]: () => {
        if (configInfo2.generalConfigInfo.selectionTextEnabled) {
          updateSelectionTextConfig(configInfo2.name, true);
        }
      },
      ["diagnosticText" /* DIAGNOSTIC_TEXT */]: () => {
        if (configInfo2.generalConfigInfo.diagnosticTextEnabled) {
          updateDiagnosticTextConfig(configInfo2.name, true);
        }
      }
    };
    resetAllDecoration();
    sectionChanged["general" /* GENERAL */]();
    sectionChanged[section]();
  } catch (e) {
    console.log("confugration update failed. Will notify user.", e);
  } finally {
    prepareRenderGroup(configInfo2);
  }
};

// src/event/workspace.ts
var configChanged = ({ configInfo: configInfo2, decorationState: decorationState2 }) => {
  return vscode15.workspace.onDidChangeConfiguration((event) => {
    if (event) {
      if (configInfo2.updateCaller === void 0) {
        const section = Object.keys(CONFIG_SECTION).find((section2) => {
          return event.affectsConfiguration(configInfo2.name + "." + section2);
        });
        section && configurationChanged(configInfo2, section);
      }
    }
  });
};

// src/event/language.ts
var vscode16 = __toESM(require("vscode"));
var diagnosticChanged2 = ({ configInfo: configInfo2, decorationState: decorationState2 }) => {
  return vscode16.languages.onDidChangeDiagnostics(async (event) => {
    const editor2 = vscode16.window.activeTextEditor;
    if (editor2 && event && configInfo2.generalConfigInfo.diagnosticTextEnabled) {
      decorationState2.eventTrigger[0] = diagnosticChanged;
      diagnosticInfo(decorationState2)(editor2);
    }
  });
};

// src/initialize.ts
var initialize = async (extensionContext) => {
  try {
    await extensionContext.extension.activate();
    Error2.setPackageName(extensionContext.extension.packageJSON.name);
    const loadConfig = await loadConfiguration(extensionContext);
    if (!loadConfig) {
      console.error("Failed to initialize config.");
      return;
    }
    const configInfo2 = loadConfig.config;
    const activeEditor = vscode17.window.activeTextEditor;
    prepareRenderGroup(configInfo2);
    if (activeEditor) {
      updateRangeMetadata(activeEditor);
      clearDecorationState(loadConfig.decoration);
      loadConfig.decoration.appliedHighlight[0] = renderGroupIs(activeEditor, [cursorOnly]);
    }
    const commandContext = {
      // context for extension commands
      package: extensionContext,
      configInfo: configInfo2
    };
    const eventContext = {
      // context for extension events
      configInfo: configInfo2,
      decorationState: loadConfig.decoration
    };
    checkActiveThemeKind(commandContext);
    return [
      // extension subscription list, commands | events.
      setPreset(commandContext),
      setColor(commandContext),
      setContrast(commandContext),
      setOrientation(commandContext),
      resetConfiguration(commandContext),
      windowStateChanged(eventContext),
      activeEditorChanged(eventContext),
      selectionChanged2(eventContext),
      editorOptionChanged(eventContext),
      diagnosticChanged2(eventContext),
      configChanged(eventContext)
    ];
  } catch (err) {
    console.error("Error during extension initialization: ", err);
    vscode17.window.showErrorMessage("Extension initialization failed!", err);
  }
};

// src/extension.ts
function activate(context2) {
  initialize(context2).then((disposableList) => {
    if (disposableList) {
      context2.subscriptions.push(...disposableList);
    }
  });
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
