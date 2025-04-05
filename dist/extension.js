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
var vscode15 = __toESM(require("vscode"));

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
var multiLineCursorText = 515 /* MULTI_LINE_CURSOR_TEXT */;
var multiLineAnchorText = 516 /* MULTI_LINE_ANCHOR_TEXT */;
var multiCursorText = 517 /* MULTI_CURSOR_TEXT */;
var multiLineLineCountHex = 518 /* LC */;
var multiLineChararcterHex = 519 /* CHAR */;
var okContentText = 769 /* OK_CONTENT_TEXT */;
var warningContentText = 770 /* WARNING_CONTENT_TEXT */;
var errorContentText = 771 /* ERROR_CONTENT_TEXT */;
var allOkPlaceholderContentText = 777 /* LAYOUT_ALLOKPLACEHOLDER */;
var problemPlaceholderContentText = 784 /* LAYOUT_PROBLEMPLACEHOLDER */;
var okAllContentText = 776 /* ALL_OK_ALL */;
var okEditorContentText = 785 /* EDITOR_OK */;
var warningEditorContentText = 786 /* EDITOR_WARNING */;
var errorEditorContentText = 787 /* EDITOR_ERROR */;
var okWorkspaceContentText = 788 /* WORKSPACE_OK */;
var warningWorkspaceContentText = 789 /* WORKSPACE_WARNING */;
var errorWorkspaceContentText = 790 /* WORKSPACE_ERROR */;
var allOkOverride = 37 /* ALL_OK_OVERRIDE */;
var editorOkWorkspaceWarn = 42 /* E_OK_W_WARN */;
var editorOkWorkspaceErr = 50 /* E_OK_W_ERR */;
var editorOkWorkspaceWarnErr = 58 /* E_OK_W_WARN_ERR */;
var editorWarnWorkspaceWarn = 74 /* E_WARN_W_WARN */;
var editorWarnWorkspaceErr = 82 /* E_WARN_W_ERR */;
var editorWarnWorkspaceWarnErr = 90 /* E_WARN_W_WARN_ERR */;
var editorErrWorkspaceErr = 146 /* E_ERR_W_ERR */;
var editorErrWorkspaceWarnErr = 154 /* E_ERR_W_WARN_ERR */;
var editorWarnErrWorkspaceWarn_err = 218 /* E_WARN_ERR_W_WARN_ERR */;
var allOkHexKey = 4097 /* ALL_OK */;
var editorHexKey = 4098 /* EDITOR */;
var workspaceHexKey = 4099 /* WORKSPACE */;

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
  rendered: [0, 0],
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
  ["multiCursorText" /* MULTI_CURSOR_TEXT */]: multiCursorText
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
  selectionCountTextStyle: {
    ln: void 0,
    col: void 0,
    zCol: void 0,
    char: void 0,
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
  "multiCursorText"
];
var SELECTION_DECORATION_STYLE = {
  leftMargin: void 0,
  placeholderDecorationOption: {},
  selectionDecorationOption: {
    ln: void 0,
    col: void 0,
    zCol: void 0,
    char: void 0,
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
  displayWhenCursorOnly: void 0,
  displayWhenSingleLine: void 0,
  displayWhenMultiLine: void 0,
  displayWhenMultiCursor: void 0,
  DiagnosticKind: void 0,
  placeTextOnPreviousOrNextLine: void 0,
  overrideLayoutPlaceholderColorToHighestSeverity: void 0,
  overrideAllOk: void 0,
  hideOk: void 0,
  hideWarning: void 0
};
var DIAGNOSTIC_CONFIG = {
  enabled: void 0,
  leftMargin: void 0,
  visibility: DIAGNOSTIC_VISIBILITY_CONFIG,
  problemPlaceholderContentText: void 0,
  allOkPlaceholderContentText: void 0,
  ["diagnosticPlaceholderTextStyle" /* DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE */]: void 0,
  ["okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */]: void 0,
  ["okTextStyle" /* OK_TEXT_STYLE */]: void 0,
  okWorkspaceContentText: void 0,
  okEditorContentText: void 0,
  okAllContentText: void 0,
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
  ["okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */]: okAllContentText
};
var DIAGNOSTIC_DECORATION_TEXT_KIND = {
  contentText: void 0,
  notation: void 0
};
var DECORATION_OPTION_LINKER = {
  allOkPlaceholderContentText: ["diagnosticPlaceholderTextStyle" /* DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE */, void 0],
  problemPlaceholderContentText: ["diagnosticPlaceholderTextStyle" /* DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE */, void 0],
  okAllContentText: ["okTextStyle" /* OK_TEXT_STYLE */, "okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */],
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
  okAllContentText,
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
  "okAllContentText",
  "warningWorkspaceContentText",
  "warningEditorContentText",
  "errorWorkspaceContentText",
  "errorEditorContentText"
];
var DIAGNOSTIC_SEVERITY_TO_KEY = {
  [vscode.DiagnosticSeverity.Warning]: "warning" /* WARNING */,
  [vscode.DiagnosticSeverity.Error]: "error" /* ERROR */
};
var DIAGNOSTIC_DECORATION_STYLE = {
  leftMargin: void 0,
  diagonosticDecorationOption: {
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
var RENDER_GROUP_SET_PROPERTY = {
  highlight: void 0,
  selectionCount: void 0,
  diagnostic: void 0
};
var RENDER_GROUP_SET = {
  [cursorOnly]: RENDER_GROUP_SET_PROPERTY,
  [singleLine]: RENDER_GROUP_SET_PROPERTY,
  [multiLine]: RENDER_GROUP_SET_PROPERTY,
  [multiCursor]: RENDER_GROUP_SET_PROPERTY
};
var DECORATION_STATE = {
  appliedHighlight: [0]
  // selectionText: undefined,
  // diagnosticText: undefined,
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
  renderSignature: 0,
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
  [multiCursorText]: void 0
};
var DIAGNOSTIC_CONTENT_TEXT = {
  [allOkOverride]: [],
  [editorOkWorkspaceWarn]: [],
  [editorOkWorkspaceErr]: [],
  [editorOkWorkspaceWarnErr]: [],
  [editorWarnWorkspaceWarn]: [],
  [editorWarnWorkspaceErr]: [],
  [editorWarnWorkspaceWarnErr]: [],
  [editorErrWorkspaceErr]: [],
  [editorErrWorkspaceWarnErr]: [],
  [editorWarnErrWorkspaceWarn_err]: []
};
var DIAGNOSTIC_ENTRY_LIST = [
  allOkOverride,
  editorOkWorkspaceWarn,
  editorOkWorkspaceErr,
  editorOkWorkspaceWarnErr,
  editorWarnWorkspaceWarn,
  editorWarnWorkspaceErr,
  editorWarnWorkspaceWarnErr,
  editorErrWorkspaceErr,
  editorErrWorkspaceWarnErr,
  editorWarnErrWorkspaceWarn_err
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
var createRangeNNNN = (startLine, startChar, endLine, endChar) => new vscode2.Range(
  new vscode2.Position(startLine, startChar),
  new vscode2.Position(endLine, endChar)
);
var createRangeSPEP = (start, end) => new vscode2.Range(start, end);
var createCursorRange = (editor2, lineDelta = 0) => new vscode2.Range(
  new vscode2.Position(editor2.selection.end.line + lineDelta, editor2.selection.end.character),
  new vscode2.Position(editor2.selection.end.line + lineDelta, editor2.selection.end.character)
);
var createLineRange = (position) => new vscode2.Range(position, position);
var createStartEndRangeOfSelection = (selection) => createRangeSPEP(selection.start, selection.end);
var blankRange = Object.seal([]);

// src/editor/editor.ts
var vscode5 = __toESM(require("vscode"));

// src/util/regex.collection.ts
var prefix = /(\${pre})/s;
var postfix = /(\${post})/s;
var source = /(\${src})/s;
var warning = /(\${wrn})/s;
var error = /(\${err})/s;
var editor = /(\${editor})/s;
var workspace = /(\${workspace})/s;
var allok = /(\${allok})/s;
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
  ["okAllContentText" /* OK_ALL_CONTENT_TEXT */]: notationRegex,
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
var column = /(\${col})/s;
var zeroColumn = /(\${zCol})/s;
var lineCount = /(\${lc})/s;
var lineNumber = /(\${ln})/s;
var character = /(\${char})/s;
var nth = /(\${nth})/s;
var selectionCount = /(\${count})/s;
var SelectionTextRegex = {
  ["cursorOnlyText" /* CURSOR_ONLY_TEXT */]: {
    col: column,
    zCol: zeroColumn,
    ln: lineNumber
  },
  ["singleLineText" /* SINGLE_LINE_TEXT */]: {
    char: character,
    ln: lineNumber
  },
  ["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */]: {
    lc: lineCount,
    ln: lineNumber,
    char: character
  },
  ["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */]: {
    lc: lineCount,
    ln: lineNumber,
    char: character
  },
  ["multiCursorText" /* MULTI_CURSOR_TEXT */]: {
    nth,
    count: selectionCount,
    lc: lineCount,
    ln: lineNumber,
    char: character
  }
};
var indentAndEOLRegex = (indentSize) => new RegExp(`^( {${indentSize}}|[\r
]+)*$`, "gm");
var ifStringIsResourceScope = /^[%\.].*[%\.]$/s;
var tagtAndEOLRegex = /(\t|[\r\n]+)*$/gm;
var isValidHexColor = /^#[A-Fa-f0-9]{6}$/;
var isValidWidth = /^[0-9]px$|^[0-9]em$/;
var ifContentTextHasPlaceholder = /(\${[A-z]*})/g;
var contentTextKeysOnly = /\${([^{}]+)}/s;
var Regex = {
  indentAndEOLRegex,
  resourceScope: ifStringIsResourceScope,
  tagtAndEOLRegex,
  isValidHexColor,
  isValidWidth,
  ifContentTextHasPlaceholder,
  contentTextKeysOnly,
  statusContentText: SelectionTextRegex,
  diagnosticText: diagnosticTextRegex
};
var regex_collection_default = Regex;

// src/editor/decoration/status/selection.ts
var vscode3 = __toESM(require("vscode"));
var selectionContentText = {
  ...SELECTION_CONTENT_TEXT
};
var indentInfo = {
  ...INDENT_INFO
};
var selectionTextBuffer = {
  [cursorOnlyText]: [],
  [singleLineText]: [],
  [multiLineAnchorText]: [],
  [multiLineCursorText]: [],
  [multiCursorText]: []
};
var decorationOptionBuffer = { ...DECORATION_OPTION_CONFIG };
var setSelectionTextbuffer = (hexKey, size) => {
  decorationOptionBuffer.isWholeLine = true;
  decorationOptionBuffer.rangeBehavior = vscode3.DecorationRangeBehavior.ClosedClosed;
  if (hexKey === multiCursorText) {
    return;
  }
  selectionTextBuffer[hexKey].push(...selectionContentText[hexKey].contentText.map((decorationOption, idx) => {
    decorationOptionBuffer.after = { ...decorationOption.after };
    return vscode3.window.createTextEditorDecorationType(decorationOption);
  }));
  Object.seal(selectionTextBuffer[hexKey]);
};
var sealSelctionText = () => {
  for (const hexKey of Object.keys(selectionContentText)) {
    Object.seal(selectionContentText[hexKey].contentText);
  }
};
var clearSelectionText = () => {
  for (const hexKey of Object.keys(selectionContentText)) {
    delete selectionContentText[hexKey];
    selectionContentText[hexKey] = [];
  }
  for (const hexKey of Object.keys(selectionTextBuffer)) {
    delete selectionTextBuffer[hexKey];
    selectionTextBuffer[hexKey] = [];
  }
};
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
  char: multiLineChararcterHex
};
var multilineFunctionSymLink = {
  [multiLineLineCountHex]: (editor2) => editor2.selection.end.line - editor2.selection.start.line + 1,
  [multiLineChararcterHex]: (editor2) => editor2.document.getText(editor2.selection).replace(indentInfo.regex, "").length
};
var multiCursorOf = {
  nth: ({ idx }) => idx + 1,
  count: ({ editor: editor2 }) => editor2.selections.length,
  ln: ({ idx, editor: editor2 }) => editor2.selections[idx].end.line + 1,
  lc: ({ editor: editor2 }) => {
    let idx = 0;
    let lineCount2 = 0;
    const length = editor2.selections.length;
    const isSingleLine = editor2.selections[0].start.line === editor2.selections[0].end.line;
    const lineDiff = isSingleLine ? 1 : editor2.selections[0].end.line - editor2.selections[0].start.line + 1;
    while (idx < length) {
      if (isSingleLine) {
        lineCount2 = lineCount2 + lineDiff;
      } else {
        lineCount2 = lineCount2 + lineDiff;
      }
      idx++;
    }
    return lineCount2;
  },
  char: ({ editor: editor2 }) => {
    let idx = 0;
    let charCount = 0;
    const length = editor2.selections.length;
    const isSingleLine = editor2.selections[0].start.line === editor2.selections[0].end.line;
    while (idx < length) {
      if (isSingleLine) {
        charCount = charCount + (editor2.selections[idx].end.character - editor2.selections[idx].start.character);
      } else {
        const text = editor2.document.getText(editor2.selections[idx]);
        charCount = charCount + text.replace(indentInfo.regex, "").length;
      }
      idx++;
    }
    return charCount;
  }
};
var selectionOf = {
  ["cursorOnlyText" /* CURSOR_ONLY_TEXT */]: { ...columns, ...lineNumber2 },
  ["singleLineText" /* SINGLE_LINE_TEXT */]: { ...lineNumber2, ...characterCount },
  ["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */]: { ...lineNumber2, ...multiLineOf },
  ["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */]: { ...lineNumber2, ...multiLineOf },
  ["multiCursorText" /* MULTI_CURSOR_TEXT */]: multiCursorOf
};
var contentTextFunc = (buffer, context, option) => (contentText, idx) => {
  option.renderOptions = contentText;
  if (typeof contentText.after.contentText !== "string") {
    decorationOptionBuffer.after = { ...contentText.after };
    decorationOptionBuffer.after.contentText = String(decorationOptionBuffer.after.contentText(context));
    option.renderOptions = decorationOptionBuffer;
  }
  context.editor.setDecorations(buffer[idx], [option]);
};
var cursorOnlySelection = (editor2, previousKey) => {
  clearBufferOfhexkey(editor2.setDecorations, previousKey, blankRange);
  const context = {
    idx: 0,
    editor: editor2
  };
  const buffer = selectionTextBuffer[cursorOnlyText];
  const option = {
    range: createLineRange(editor2.selection.active),
    renderOptions: {}
  };
  selectionContentText[cursorOnlyText].contentText.forEach(
    contentTextFunc(
      buffer,
      context,
      option
    )
  );
};
var singleLineSelection = (editor2, previousKey) => {
  clearBufferOfhexkey(editor2.setDecorations, previousKey, blankRange);
  const context = {
    idx: 0,
    editor: editor2
  };
  const buffer = selectionTextBuffer[singleLineText];
  const option = {
    range: createLineRange(editor2.selection.active),
    renderOptions: {}
  };
  selectionContentText[singleLineText].contentText.forEach(
    contentTextFunc(
      buffer,
      context,
      option
    )
  );
};
var contentTextFuncBuffered = (setDecorations, buffer, decorationOption, range, countBuffer) => (decorationType, idx) => {
  decorationOption.range = range;
  decorationOption.renderOptions = decorationType;
  if (typeof decorationType.after.contentText !== "string") {
    const numlink = decorationType.after.contentText;
    if (countBuffer[numlink] === null) {
      countBuffer[numlink] = multilineFunctionSymLink[numlink](vscode3.window.activeTextEditor);
    }
    decorationOptionBuffer.after = { ...decorationType.after };
    decorationOptionBuffer.after.contentText = String(countBuffer[numlink]);
    decorationOption.renderOptions = decorationOptionBuffer;
  }
  setDecorations(buffer[idx], [decorationOption]);
};
var decorationOptionGrid = {
  range: void 0,
  renderOptions: void 0,
  __proto__: null
};
var multilineSelection = (editor2, previousKey) => {
  clearBufferOfhexkey(editor2.setDecorations, previousKey, blankRange);
  const multiLineBuffer = {
    [multiLineLineCountHex]: null,
    [multiLineChararcterHex]: null
  };
  selectionContentText[multiLineAnchorText].contentText.forEach(
    contentTextFuncBuffered(
      editor2.setDecorations,
      selectionTextBuffer[multiLineAnchorText],
      { ...decorationOptionGrid },
      createLineRange(editor2.selection.anchor),
      multiLineBuffer
    )
  );
  selectionContentText[multiLineCursorText].contentText.forEach(
    contentTextFuncBuffered(
      editor2.setDecorations,
      selectionTextBuffer[multiLineCursorText],
      { ...decorationOptionGrid },
      createLineRange(editor2.selection.active),
      multiLineBuffer
    )
  );
};
var multiCursorSelection = (editor2, previousKey) => {
  clearBufferOfhexkey(editor2.setDecorations, previousKey, blankRange);
  const statusLine = [];
  const selectionText = selectionContentText[multiCursorText].contentText;
  const context = {
    idx: editor2.selections.length,
    editor: editor2
  };
  while (context.idx--) {
    const lineSet = new Set(statusLine);
    if (lineSet.has(editor2.selections[context.idx].end.line)) {
      continue;
    }
    const selectionTextInfo = selectionText.map((selection) => vscode3.window.createTextEditorDecorationType(selection));
    const option = {
      range: createStartEndRangeOfSelection(editor2.selections[context.idx]),
      renderOptions: {}
    };
    selectionText.forEach(
      contentTextFunc(
        selectionTextInfo,
        context,
        option
      )
    );
    selectionTextBuffer[multiCursorText].push(selectionTextInfo);
    statusLine.push(editor2.selections[context.idx].end.line);
  }
};
var clearSelectionTextBuffer = (editor2) => {
  clearBufferOfhexkey(editor2.setDecorations, [cursorOnly], blankRange);
  clearBufferOfhexkey(editor2.setDecorations, [singleLine], blankRange);
  clearBufferOfhexkey(editor2.setDecorations, [multiLine], blankRange);
  clearBufferOfhexkey(editor2.setDecorations, [multiCursor], blankRange);
};
var clearBuffer = (setDecorations, resetRange) => (buffer) => setDecorations(buffer, resetRange);
var clearDisposeBuffer = (setDecorations, resetRange) => (buffer) => {
  setDecorations(buffer, resetRange);
  buffer.dispose();
};
var clearBufferOfhexkey = (setDecorations, previousKey, resetRange) => {
  switch (previousKey[0]) {
    case cursorOnly:
      selectionTextBuffer[cursorOnlyText].forEach(clearBuffer(setDecorations, resetRange));
      break;
    case singleLine:
      selectionTextBuffer[singleLineText].forEach(clearBuffer(setDecorations, resetRange));
      break;
    case multiLine:
      selectionTextBuffer[multiLineAnchorText].forEach(clearBuffer(setDecorations, resetRange));
      selectionTextBuffer[multiLineCursorText].forEach(clearBuffer(setDecorations, resetRange));
      break;
    case multiCursor:
      selectionTextBuffer[multiCursorText].forEach((selection) => selection.forEach(clearDisposeBuffer(setDecorations, resetRange)));
      selectionTextBuffer[multiCursorText] = [];
      break;
    default:
      break;
  }
};
var selectionTextInfoSplit = {
  [cursorOnly]: (editor2, previousKey) => cursorOnlySelection(editor2, previousKey),
  [singleLine]: (editor2, previousKey) => singleLineSelection(editor2, previousKey),
  [multiLine]: (editor2, previousKey) => multilineSelection(editor2, previousKey),
  [multiCursor]: (editor2, previousKey) => multiCursorSelection(editor2, previousKey)
};
var bindStatusContentTextState = () => {
  return {
    functionOf: selectionOf,
    textOf: selectionContentText,
    infoOf: indentInfo
  };
};

// src/constant/shared/symbol.ts
var prefixSymbol = Symbol("prefix");
var postfixSymbol = Symbol("postfix");

// src/diagnostic/diagnostic.ts
var vscode4 = __toESM(require("vscode"));
var diagnosticState = { ...DIAGNOSTIC_STATE };
var diagnosticSource = {};
var resetEditorDiagnosticStatistics = () => {
  diagnosticState.editor.warning.line.splice(0);
  diagnosticState.editor.error.line.splice(0);
  diagnosticState.editor.warning.total = 0;
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
    if (severity[severityType].length > 0) {
      state.workspace[severityType].source += 1;
      state.workspace[severityType].total += severity[severityType].length;
    }
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
var updateDiagnostic = (activeEditorUri = void 0) => {
  for (let fs in diagnosticSource) {
    delete diagnosticSource[fs];
  }
  resetWorkspaceDiagnosticStatistics();
  const diagnostics = vscode4.languages.getDiagnostics();
  for (const [uri, diagnosticList] of diagnostics) {
    buildDiagnostic(diagnosticSource, diagnosticList, uri);
  }
  for (const [fsPath, severity] of Object.entries(diagnosticSource)) {
    parseDiagnostic(diagnosticState, severity, fsPath, activeEditorUri?.fsPath);
  }
  ;
  if (activeEditorUri && !Object.hasOwn(diagnosticSource, activeEditorUri.fsPath)) {
    resetEditorDiagnosticStatistics();
  }
  diagnosticState.severity = maxSeverity(diagnosticState);
  return diagnosticState;
};

// src/editor/decoration/status/diagnostic.ts
var diagnosticContentText = {
  ...DIAGNOSTIC_CONTENT_TEXT
};
var diagnosticTextBuffer = {
  [allOkOverride]: [],
  [editorOkWorkspaceWarn]: [],
  [editorOkWorkspaceErr]: [],
  [editorOkWorkspaceWarnErr]: [],
  [editorWarnWorkspaceWarn]: [],
  [editorWarnWorkspaceErr]: [],
  [editorWarnWorkspaceWarnErr]: [],
  [editorErrWorkspaceErr]: [],
  [editorErrWorkspaceWarnErr]: [],
  [editorWarnErrWorkspaceWarn_err]: []
};
var decorationOptionBuffer2 = { ...DECORATION_OPTION_CONFIG };
var setDiagonosticTextbuffer = (hexKey, decorationType) => {
  diagnosticTextBuffer[hexKey].push(...decorationType);
};
var sealDiagnosticText = () => {
  DIAGNOSTIC_ENTRY_LIST.forEach((hexKey) => {
    Object.seal(diagnosticTextBuffer[hexKey]);
    Object.seal(diagnosticContentText[hexKey]);
  });
};
var reloadContentText = () => {
  DIAGNOSTIC_ENTRY_LIST.forEach((hexKey) => {
    delete diagnosticContentText[hexKey];
    delete diagnosticTextBuffer[hexKey];
    diagnosticContentText[hexKey] = [];
    diagnosticTextBuffer[hexKey] = [];
  });
};
var diagnosticVisibility = { ...DIAGNOSTIC_VISIBILITY_CONFIG };
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
var editorWarningSourceOf = {
  wrn: ({ state, line }) => {
    const upGlyph = "\u2B06\uFE0E";
    const downGlyph = "\u2B07\uFE0E";
    const lineNumber3 = state.editor.error.line;
    const direction = [];
    let length = lineNumber3.length;
    let up = true;
    let down = true;
    while (length--) {
      if (lineNumber3[length] > line && down === true) {
        direction.push(downGlyph);
        down = false;
      } else if (lineNumber3[length] < line && up === true) {
        direction.push(upGlyph);
        up = false;
      }
      if (direction.length === 2) {
        break;
      }
    }
    return String(state.editor.warning.total) + direction.join("");
  }
};
var editorErrorCountOf = {
  err: ({ state, line }) => {
    const upGlyph = "\u2B06\uFE0E";
    const downGlyph = "\u2B07\uFE0E";
    const lineNumber3 = state.editor.error.line;
    const direction = [];
    let length = lineNumber3.length;
    let up = true;
    let down = true;
    while (length--) {
      if (lineNumber3[length] > line && down === true) {
        direction.push(downGlyph);
        down = false;
      } else if (lineNumber3[length] < line && up === true) {
        direction.push(upGlyph);
        up = false;
      }
      if (direction.length === 2) {
        break;
      }
    }
    return String(state.editor.error.total) + "(" + direction.join("") + ")";
  }
};
var workspaceWarningSourceOf = {
  src: ({ state }) => String(state.workspace.warning.source)
};
var workspaceWarningCountOf = {
  wrn: ({ state }) => String(state.workspace.warning.total)
};
var workspaceErrorSourceOf = {
  src: ({ state }) => String(state.workspace.error.source)
};
var workspaceErrorCountOf = {
  err: ({ state }) => String(state.workspace.error.total)
};
var diagnosticOf = {
  ["problemPlaceholderContentText" /* PLACEHOLDER_PROBLEM_CONTENT_TEXT */]: problemOf,
  ["allOkPlaceholderContentText" /* PLACEHOLDER_ALL_OK_CONTENT_TEXT */]: allOkOf,
  ["okAllContentText" /* OK_ALL_CONTENT_TEXT */]: notationOf,
  ["okWorkspaceContentText" /* OK_WORKSPACE_CONTENT_TEXT */]: notationOf,
  ["okEditorContentText" /* OK_EDITOR_CONTENT_TEXT */]: notationOf,
  ["warningEditorContentText" /* WARNING_EDITOR_CONTENT_TEXT */]: {
    ...notationOf,
    ...editorWarningSourceOf
  },
  ["warningWorkspaceContentText" /* WARNING_WORKSPACE_CONTENT_TEXT */]: {
    ...notationOf,
    ...workspaceWarningSourceOf,
    ...workspaceWarningCountOf
  },
  ["errorEditorContentText" /* ERROR_EDITOR_CONTENT_TEXT */]: {
    ...notationOf,
    ...editorErrorCountOf
  },
  ["errorWorkspaceContentText" /* ERROR_WORKSPACE_CONTENT_TEXT */]: {
    ...notationOf,
    ...workspaceErrorSourceOf,
    ...workspaceErrorCountOf
  }
};
var diagnosticRenderSignature = (state) => {
  let emask = 0;
  let wmask = 0;
  if (state.editor.warning.total > 0) {
    emask |= 1 << 1;
  }
  if (state.editor.error.total > 0) {
    emask |= 1 << 2;
  }
  if (emask === 0) {
    emask = 1;
  }
  if (state.workspace.warning.total > 0) {
    wmask |= 1 << 1;
  }
  if (state.workspace.error.total > 0) {
    wmask |= 1 << 2;
  }
  if (wmask === 0) {
    wmask = 1;
  }
  return emask === 1 && wmask === 1 ? 37 : emask << 5 | wmask << 2 | 2;
};
var previousSignature = 37;
var diagnosticInfo = (editor2) => {
  const diagnosticState2 = updateDiagnostic(editor2.document.uri);
  const signature = diagnosticRenderSignature(diagnosticState2);
  const range = createCursorRange(editor2);
  const decorationOptionGrid2 = {
    range,
    renderOptions: {}
  };
  const context = {
    state: diagnosticState2,
    line: editor2.selection.active.line
  };
  diagnosticTextBuffer[previousSignature]?.forEach((decoration) => editor2.setDecorations(decoration, blankRange));
  diagnosticContentText[signature].forEach((decoration, idx) => {
    const options = { ...decorationOptionGrid2 };
    decorationOptionBuffer2.after = { ...decoration.after };
    if (typeof decoration.after.contentText !== "string") {
      decorationOptionBuffer2.after.contentText = decoration.after.contentText(context);
    }
    ;
    options.renderOptions = decorationOptionBuffer2;
    editor2.setDecorations(diagnosticTextBuffer[signature][idx], [options]);
  });
};
var bindDiagnosticContentTextState = () => {
  return {
    functionOf: diagnosticOf,
    textOf: diagnosticContentText,
    configOf: diagnosticVisibility
  };
};

// src/editor/editor.ts
var decorationState = {
  ...DECORATION_STATE,
  __proto__: null
};
var updateIndentOption = (editor2) => {
  const bindTo = bindStatusContentTextState();
  bindTo.infoOf.size = Number(editor2.options.tabSize ?? editor2.options.indentSize ?? 4);
  bindTo.infoOf.type = editor2.options.insertSpaces ? "\n" : "	";
  bindTo.infoOf.regex = editor2.options.insertSpaces ? regex_collection_default.indentAndEOLRegex(bindTo.infoOf.size) : regex_collection_default.tagtAndEOLRegex;
};
var applyDecoration = (setDecorations, decoraiton, range) => setDecorations(decoraiton, range);
var resetAllDecoration = () => {
  vscode5.window.visibleTextEditors.forEach((editor2) => {
    clearEveryHighlight(editor2);
    clearSelectionTextBuffer(editor2);
  });
};
var createEditorDecorationType = (styleAppliedConfig) => vscode5.window.createTextEditorDecorationType(styleAppliedConfig);
var clearDecorationState = (decorationState2) => {
  decorationState2.appliedHighlight[0] = reset;
};
var prepareRenderGroup = (config) => {
  const bindDiagnostic = bindDiagnosticContentTextState();
  const diagonosticAvaliabity = {
    [cursorOnly]: bindDiagnostic.configOf.displayWhenCursorOnly,
    [singleLine]: bindDiagnostic.configOf.displayWhenSingleLine,
    [multiLine]: bindDiagnostic.configOf.displayWhenMultiLine,
    [multiCursor]: bindDiagnostic.configOf.displayWhenMultiCursor
  };
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
  SELECTION_KIND_LIST.forEach((numKey) => {
    const callList = [];
    callList.push(highlightList[numKey]);
    if (config.generalConfigInfo.selectionTextEnabled) {
      callList.push(selectionList[numKey]);
    }
    if (config.generalConfigInfo.diagnosticTextEnabled && diagonosticAvaliabity[numKey]) {
      callList.push(diagnosticInfo);
    }
    renderFnStack[numKey].push(...callList);
    Object.seal(renderFnStack[numKey]);
  });
  for (const strKey in Object.keys(bindDiagnostic)) {
    delete bindDiagnostic[strKey];
  }
  for (const numKey in Object.keys(highlightList)) {
    delete highlightList[numKey];
  }
  for (const numKey in Object.keys(selectionList)) {
    delete selectionList[numKey];
  }
  for (const numKey in Object.keys(diagonosticAvaliabity)) {
    delete diagonosticAvaliabity[numKey];
  }
};
var renderFnStack = {
  [cursorOnly]: [],
  [singleLine]: [],
  [multiLine]: [],
  [multiCursor]: []
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

// src/editor/decoration/highlight/highlight.ts
var highlightStyleList = {
  ...HIGHLIGHT_STYLE_LIST
};
var borderPositionInfo = {
  ...HIGHLIGHT_BORDER_POSITION_INFO
};
var cursorOnlyHighlightRange = (editor2, previousKey) => {
  clearHighlight(editor2.setDecorations, previousKey, blankRange);
  applyDecoration(editor2.setDecorations, highlightStyleList[cursorOnly][0], [createLineRange(editor2.selection.active)]);
};
var singelLineHighlightRange = (editor2, previousKey) => {
  clearHighlight(editor2.setDecorations, previousKey, blankRange);
  applyDecoration(editor2.setDecorations, highlightStyleList[singleLine][0], [createRangeSPEP(editor2.selection.start, editor2.selection.end)]);
};
var multiLineHighlightRange = (editor2, previousKey) => {
  clearHighlight(editor2.setDecorations, previousKey, blankRange);
  applyDecoration(editor2.setDecorations, highlightStyleList[multiLine][0], [createLineRange(editor2.selection.start)]);
  applyDecoration(editor2.setDecorations, highlightStyleList[multiLine][1], [createLineRange(editor2.selection.end)]);
  applyDecoration(editor2.setDecorations, highlightStyleList[multiLine][2], [editor2.selection]);
};
var multiCursorHighlightRange = (editor2, previousKey) => {
  clearHighlight(editor2.setDecorations, previousKey, blankRange);
  applyDecoration(editor2.setDecorations, highlightStyleList[multiCursor][0], editor2.selections.reduce((acc, selection) => {
    acc.push(createRangeSPEP(selection.start, selection.active));
    return acc;
  }, []));
  applyDecoration(editor2.setDecorations, highlightStyleList[multiCursor][1], editor2.selections.reduce((acc, selection) => {
    acc.push(createRangeNNNN(selection.active.line, 0, selection.active.line, selection.active.character));
    return acc;
  }, []));
};
var clearBuffer2 = (setDecorations, resetRange) => (buffer) => setDecorations(buffer, resetRange);
var clearHighlight = (setDecorations, previousKey, resetRange) => {
  switch (previousKey[0]) {
    case cursorOnly:
      highlightStyleList[cursorOnly].forEach(clearBuffer2(setDecorations, resetRange));
      break;
    case singleLine:
      highlightStyleList[singleLine].forEach(clearBuffer2(setDecorations, resetRange));
      break;
    case multiLine:
      highlightStyleList[multiLine].forEach(clearBuffer2(setDecorations, resetRange));
      break;
    case multiCursor:
      highlightStyleList[multiCursor].forEach(clearBuffer2(setDecorations, resetRange));
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

// src/util/error.ts
var vscode6 = __toESM(require("vscode"));
var ErrorDecription = class {
  #configurationSection;
  #errorMessage;
  // #betterConfigurationSectionName: string;
  constructor(configurationSection, errorMessage) {
    this.#configurationSection = configurationSection;
    this.#errorMessage = errorMessage;
  }
  get = () => {
    return {
      section: this.#configurationSection,
      message: this.#errorMessage
    };
  };
};
var ErrorHelper = class {
  static errorList = [];
  static packageName;
  static configurationSectionList = () => {
    return this.errorList.map((error2) => error2.get().section);
  };
  // protected static configurationMessageList = (): string[] => {
  //     return this.errorList.map(error => error.get().message);
  // };
  static ifExtensionName = (section) => {
    if (section.indexOf(this.packageName) && section.split(".").length > 2) {
      return section.replace(this.packageName + ".", "");
    } else {
      return section;
    }
  };
};
var Error2 = class extends ErrorHelper {
  static #ignored = false;
  static #notified = false;
  static #fixConfiguration = () => {
    vscode6.window.showErrorMessage(
      "Please fix invalid values in configuration.",
      ...["Fix Configuration", "Ignore"]
    ).then(this.userSelect);
  };
  static userSelect = (selected) => {
    if (selected === "Fix Configuration") {
      vscode6.commands.executeCommand("workbench.action.openSettings", this.configurationSectionList().join(" "));
    } else if (selected === "Ignore") {
      this.#ignored = true;
    }
  };
  static setPackageName = (packageName) => {
    this.packageName = packageName;
  };
  static check = () => {
    return this.errorList.length > 0;
  };
  static register = (configurationSection, errorMessage) => {
    return this.errorList.push(new ErrorDecription(configurationSection, errorMessage));
  };
  static clear = () => {
    this.errorList.splice(0);
  };
  static notify = (timer = 0) => {
    if (this.check() && !this.#ignored && !this.#notified) {
      this.#notified = true;
      this.#fixConfiguration();
    }
  };
};

// src/configuration/shared/editor.ts
var vscode8 = __toESM(require("vscode"));

// src/util/util.ts
var vscode7 = __toESM(require("vscode"));
var getWorkspaceConfiguration = (section) => vscode7.workspace.getConfiguration(section);
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

// src/configuration/shared/editor.ts
var writeEditorConfiguration = () => {
  const editorConfig = getWorkspaceConfiguration("editor");
  editorConfig.update("renderLineHighlight", "gutter", vscode8.ConfigurationTarget.Global);
  editorConfig.update("roundedSelection", false, vscode8.ConfigurationTarget.Global);
};

// src/configuration/shared/validation.ts
var sanitizeConfigValue = (value) => {
  if (!value || value === "null" || value.length === 0 || regex_collection_default.resourceScope.test(value)) {
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
  const match = contentText.match(regex_collection_default.ifContentTextHasPlaceholder);
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
      const regexKey = search.match(regex_collection_default.contentTextKeysOnly);
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

// src/configuration/highlight/highlight.ts
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
var vscode10 = __toESM(require("vscode"));
var legacyConfig = {
  borderOpacity: "general.borderOpacity",
  backgroundOpacity: "general.backgroundOpacity",
  statusTextEnabled: "selectionText.enabled",
  statusTextIconEnabled: "selectionText.iconEnabled",
  statusTextColor: "selectionText.color",
  statusTextBackgroundColor: "selectionText.backgroundColor",
  statusTextOpacity: "selectionText.opacity",
  statusTextFontStyle: "statusTselectionTextext.fontStyle",
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
  return extensionConfig.update(newKey, value, vscode10.ConfigurationTarget.Global);
};
var removeUserSetting = (extensionConfig, key) => {
  return extensionConfig.update(key, void 0, vscode10.ConfigurationTarget.Global);
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

// src/configuration/status/selection.ts
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
    setSelectionTextbuffer(hexKey, textOftarget[hexKey].contentText.length);
  });
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
var updateSelectionTextConfig = (configReady, configuratioChange = false) => {
  const SelectionDecorationConfig = { ...SELECTION_DECORAITON_CONFIG };
  const SelectionDecorationStyle = { ...SELECTION_DECORATION_STYLE };
  const bindTo = bindStatusContentTextState();
  const bindToBuffer = {
    functionOf: bindTo.functionOf,
    textOf: {}
  };
  if (configuratioChange) {
    clearSelectionText();
  }
  workspaceProxyConfiguration(SelectionDecorationConfig, configReady.name + "." + CONFIG_SECTION.selectionText, SELECTION_CONTENT_TEXT_LIST, bindToBuffer, regex_collection_default.statusContentText);
  buildSelectionTextDecorationRenderOption(SelectionDecorationConfig, SelectionDecorationStyle);
  buildStatusTextState(bindTo.textOf, bindToBuffer.textOf, SelectionDecorationStyle, SelectionDecorationConfig.leftMargin);
  sealSelctionText();
  delete bindTo.functionOf;
  delete bindTo.infoOf;
  delete bindTo.textOf;
  delete bindToBuffer.textOf;
  delete bindToBuffer.functionOf;
};

// src/configuration/status/diagonostic.ts
var vscode11 = __toESM(require("vscode"));
var positionKeyList = ["pre", "post"];
var positionKeyToPlaceholderName = { pre: "prefix", post: "postfix" };
var applyLeftMargin = (textOf, visibility, leftMargin) => {
  if (!leftMargin || leftMargin === "0px" || leftMargin === "0em") {
    return;
  }
  Object.entries(textOf).forEach(([hexKey, decoration], idx) => {
    console.log(textOf[hexKey][0]);
    textOf[hexKey][0].after["margin"] = leftMarginToMarginString(leftMargin);
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
  const convertPositionWrapper = (context, target, propertyName, contentTextHeyKey) => {
    if (Object.hasOwn(target[propertyName], contentTextHeyKey)) {
      if (target[propertyName][contentTextHeyKey].notation) {
        context.notation = target[propertyName][contentTextHeyKey].notation;
      }
      const contentTextList = convertPositionDecorationRenderOption(context);
      target[propertyName][contentTextHeyKey].contentText = contentTextList;
    }
  };
  Object.entries(textOfSource).forEach(([contentTextName, textPosition]) => {
    const linker = DECORATION_OPTION_LINKER[contentTextName];
    const context = {
      textPosition,
      primaryStyle: style.diagonosticDecorationOption[linker[0]],
      secondaryStyle: linker[1] ? style.diagonosticDecorationOption[linker[1]] : null,
      notation: [],
      leftMargin
    };
    ["workspace", "editor", "all", "layout"].forEach((biome) => {
      convertPositionWrapper(context, preset, biome, DIAGNOSTIC_CONTENT_TEXT_NAME_TO_NUM[contentTextName]);
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
      const ok = concatinateNotation(preset.all[okAllContentText]);
      setDiagonosticTextbuffer(allOkOverride, ok.map((decoration2) => vscode11.window.createTextEditorDecorationType(decoration2)));
      textOftarget[allOkOverride].push(...ok);
    } else {
      setDiagonosticTextbuffer(allOkOverride, [vscode11.window.createTextEditorDecorationType(decoration)]);
      textOftarget[allOkOverride].push(decoration);
    }
  });
  preset.layout[problemPlaceholderContentText].contentText.forEach((decoration) => {
    if (decoration.after.contentText === editorHexKey) {
      const ok = concatinateNotation(preset.editor[okEditorContentText]);
      const warn = concatinateNotation(preset.editor[warningEditorContentText]);
      const err = concatinateNotation(preset.editor[errorEditorContentText]);
      textOftarget[editorOkWorkspaceWarn].push(...ok);
      textOftarget[editorOkWorkspaceErr].push(...ok);
      textOftarget[editorOkWorkspaceWarnErr].push(...ok);
      textOftarget[editorWarnWorkspaceWarn].push(...warn);
      textOftarget[editorWarnWorkspaceErr].push(...warn);
      textOftarget[editorWarnWorkspaceWarnErr].push(...warn);
      textOftarget[editorErrWorkspaceErr].push(...err);
      textOftarget[editorErrWorkspaceWarnErr].push(...err);
      textOftarget[editorWarnErrWorkspaceWarn_err].push(...warn, ...err);
      const okDecoration = ok.map((decoration2) => vscode11.window.createTextEditorDecorationType(decoration2));
      const warnDecoration = warn.map((decoration2) => vscode11.window.createTextEditorDecorationType(decoration2));
      const errDecoration = err.map((decoration2) => vscode11.window.createTextEditorDecorationType(decoration2));
      setDiagonosticTextbuffer(editorOkWorkspaceWarn, okDecoration);
      setDiagonosticTextbuffer(editorOkWorkspaceErr, okDecoration);
      setDiagonosticTextbuffer(editorOkWorkspaceWarnErr, okDecoration);
      setDiagonosticTextbuffer(editorWarnWorkspaceWarn, warnDecoration);
      setDiagonosticTextbuffer(editorWarnWorkspaceErr, warnDecoration);
      setDiagonosticTextbuffer(editorWarnWorkspaceWarnErr, warnDecoration);
      setDiagonosticTextbuffer(editorErrWorkspaceErr, errDecoration);
      setDiagonosticTextbuffer(editorErrWorkspaceWarnErr, errDecoration);
      setDiagonosticTextbuffer(editorWarnErrWorkspaceWarn_err, [...warnDecoration, ...errDecoration]);
      return;
    }
    if (decoration.after.contentText === workspaceHexKey) {
      const ok = concatinateNotation(preset.workspace[okWorkspaceContentText]);
      const warn = concatinateNotation(preset.workspace[warningWorkspaceContentText]);
      const err = concatinateNotation(preset.workspace[errorWorkspaceContentText]);
      textOftarget[editorOkWorkspaceWarn].push(...warn);
      textOftarget[editorOkWorkspaceErr].push(...err);
      textOftarget[editorOkWorkspaceWarnErr].push(...warn, ...err);
      textOftarget[editorWarnWorkspaceWarn].push(...warn);
      textOftarget[editorWarnWorkspaceErr].push(...err);
      textOftarget[editorWarnWorkspaceWarnErr].push(...warn, ...err);
      textOftarget[editorErrWorkspaceErr].push(...err);
      textOftarget[editorErrWorkspaceWarnErr].push(...warn, ...err);
      textOftarget[editorWarnErrWorkspaceWarn_err].push(...warn, ...err);
      const okDecoration = ok.map((decoration2) => vscode11.window.createTextEditorDecorationType(decoration2));
      const warnDecoration = warn.map((decoration2) => vscode11.window.createTextEditorDecorationType(decoration2));
      const errDecoration = err.map((decoration2) => vscode11.window.createTextEditorDecorationType(decoration2));
      setDiagonosticTextbuffer(editorOkWorkspaceWarn, warnDecoration);
      setDiagonosticTextbuffer(editorOkWorkspaceErr, errDecoration);
      setDiagonosticTextbuffer(editorOkWorkspaceWarnErr, [...warnDecoration, ...errDecoration]);
      setDiagonosticTextbuffer(editorWarnWorkspaceWarn, warnDecoration);
      setDiagonosticTextbuffer(editorWarnWorkspaceErr, errDecoration);
      setDiagonosticTextbuffer(editorWarnWorkspaceWarnErr, [...warnDecoration, ...errDecoration]);
      setDiagonosticTextbuffer(editorErrWorkspaceErr, errDecoration);
      setDiagonosticTextbuffer(editorErrWorkspaceWarnErr, [...warnDecoration, ...errDecoration]);
      setDiagonosticTextbuffer(editorWarnErrWorkspaceWarn_err, [...warnDecoration, ...errDecoration]);
      return;
    }
    const decorationType = vscode11.window.createTextEditorDecorationType(decoration);
    DIAGNOSTIC_ENTRY_LIST.forEach((hexKey) => {
      textOftarget[hexKey].push(decoration);
      setDiagonosticTextbuffer(hexKey, [decorationType]);
    });
  });
};
var ifNoationNotNull = (property, str) => {
  if (str !== "null" && str.length > 0 && !regex_collection_default.resourceScope.test(str)) {
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
      color: sanitizeConfigValue(config[styleName].color),
      colorOpacity: config[styleName].colorOpacity,
      backgroundColor: sanitizeConfigValue(config[styleName].backgroundColor),
      backgroundOpacity: config[styleName].backgroundOpacity,
      fontStyle: sanitizeConfigValue(config[styleName].fontStyle),
      fontWeight: sanitizeConfigValue(config[styleName].fontWeight)
    };
    style.diagonosticDecorationOption[styleName] = convertToDecorationRenderOption(styleConfig, true);
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
var clearOverrideState = (stateOf) => {
  const textOf = stateOf.textOf;
  for (const placeholder in textOf.layout) {
    if (placeholder["override"]) {
      delete placeholder["override"];
    }
  }
};
var updateDiagnosticTextConfig = (configReady, configuratioChange = false) => {
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
    clearOverrideState(bindTo);
    reloadContentText();
  }
  workspaceProxyConfiguration(diagnosticConfig, configReady.name + "." + CONFIG_SECTION.diagnosticText, DIAGNOSTIC_CONTENT_TEXT_LIST, bindToBuffer, regex_collection_default.diagnosticText);
  const diagnosticBiome = diagnosticVisibilityBiome(diagnosticConfig.visibility);
  const decorationStyleList = decorationStyleFromBiome(diagnosticBiome.workspace | diagnosticBiome.editor);
  Object.assign(dignosticContentTextPreset, buildDiagnosticStyle(diagnosticConfig, diagnosticDecorationStyle, decorationStyleList, diagnosticConfig.visibility, diagnosticBiome));
  Object.assign(bindTo.configOf, diagnosticConfig.visibility);
  buildDiagnosticTextPreset(dignosticContentTextPreset, bindTo.textOf, bindToBuffer.textOf, diagnosticDecorationStyle, diagnosticConfig.leftMargin);
  applyLeftMargin(bindTo.textOf, diagnosticConfig.visibility, diagnosticConfig.leftMargin);
  sealDiagnosticText();
  delete bindTo.functionOf;
  delete bindTo.textOf;
  delete bindTo.configOf;
  delete bindToBuffer.textof;
  delete bindToBuffer.functionOf;
};

// src/configuration/load.ts
var configInfo = {
  ...CONFIG_INFO
};
var loadConfiguration = (context) => {
  const name = context?.extension.packageJSON.name;
  if (!name) {
    return;
  }
  configInfo.name = name;
  if (!configInfo.name) {
    return;
  }
  const configReady = configInfo;
  const decorationState2 = bindEditorDecoration().stateOf;
  ;
  if (!configReady.configError) {
    configReady.configError = [];
    updateLegacyConfig(configReady);
  }
  writeEditorConfiguration();
  if (generateHighlightDecoration(configReady)) {
    if (configReady.generalConfigInfo.selectionTextEnabled) {
      updateSelectionTextConfig(configReady);
    }
    if (configReady.generalConfigInfo.diagnosticTextEnabled) {
      updateDiagnosticTextConfig(configReady);
    }
    Object.seal(decorationState2.appliedHighlight);
    return {
      config: configReady,
      decoration: decorationState2
    };
  }
  return;
};

// src/event/window.ts
var vscode12 = __toESM(require("vscode"));
var windowStateChanged = ({ decorationState: decorationState2 }) => {
  return vscode12.window.onDidChangeWindowState((event) => {
    if (event.focused) {
      if (vscode12.window.activeTextEditor) {
        decorationState2.appliedHighlight[0] = renderGroupIs(vscode12.window.activeTextEditor, [cursorOnly]);
      }
    } else {
      resetAllDecoration();
    }
    if (!event.focused && !event.active) {
      resetAllDecoration();
      console.log("idling");
    }
  });
};
var activeEditorChanged = ({ configInfo: configInfo2, decorationState: decorationState2 }) => {
  return vscode12.window.onDidChangeActiveTextEditor(async (editor2) => {
    if (editor2) {
      if (configInfo2.configError.length > 0) {
      }
      resetAllDecoration();
      if (configInfo2.generalConfigInfo.diagnosticTextEnabled) {
        await resetEditorDiagnosticStatistics();
        await updateDiagnostic(editor2.document.uri);
      }
      updateIndentOption(editor2);
      decorationState2.appliedHighlight[0] = renderGroupIs(editor2, [cursorOnly]);
      if (Error2.check() && editor2) {
        Error2.notify(2e3);
      }
    }
  });
};
var editorOptionChanged = (context) => {
  return vscode12.window.onDidChangeTextEditorOptions((event) => {
    if (event.textEditor) {
      updateIndentOption(event.textEditor);
    }
  });
};
var selectionChanged = ({ decorationState: decorationState2 }) => {
  return vscode12.window.onDidChangeTextEditorSelection((event) => {
    decorationState2.appliedHighlight[0] = renderGroupIs(event.textEditor, decorationState2.appliedHighlight);
  });
};

// src/event/workspace.ts
var vscode13 = __toESM(require("vscode"));

// src/configuration/update.ts
var sectionList = [
  "general" /* GENERAL */,
  "cursorOnly" /* CURSOR_ONLY */,
  "singleLine" /* SINGLE_LINE */,
  "multiLine" /* MULTI_LINE */,
  "multiCursor" /* MULTI_CURSOR */,
  "selectionText" /* SELECTION_TEXT */,
  "diagnosticText" /* DIAGNOSTIC_TEXT */
];
var sectionChanged = () => {
  return {
    ["general" /* GENERAL */]: (config) => updateGeneralConfig(config),
    ["cursorOnly" /* CURSOR_ONLY */]: (config) => updateHighlightStyleConfiguration(config, cursorOnly),
    ["singleLine" /* SINGLE_LINE */]: (config) => updateHighlightStyleConfiguration(config, singleLine),
    ["multiLine" /* MULTI_LINE */]: (config) => updateHighlightStyleConfiguration(config, multiLine),
    ["multiCursor" /* MULTI_CURSOR */]: (config) => updateHighlightStyleConfiguration(config, multiCursor),
    ["selectionText" /* SELECTION_TEXT */]: (config) => updateSelectionTextConfig(config, true),
    ["diagnosticText" /* DIAGNOSTIC_TEXT */]: (config) => updateDiagnosticTextConfig(config, true)
  };
};

// src/event/workspace.ts
var configChanged = ({ configInfo: configInfo2, decorationState: decorationState2 }) => {
  return vscode13.workspace.onDidChangeConfiguration((event) => {
    if (event) {
      const sectionName = sectionList.find((section) => {
        return event.affectsConfiguration(configInfo2.name + "." + section);
      });
      if (sectionName) {
        sectionChanged()[sectionName](configInfo2);
        sectionChanged()["general" /* GENERAL */](configInfo2);
        prepareRenderGroup(configInfo2);
        clearDecorationState(decorationState2);
        resetAllDecoration();
      }
      if (Error2.check()) {
        Error2.notify(2e3);
      }
    }
  });
};

// src/event/language.ts
var vscode14 = __toESM(require("vscode"));
var diagnosticChanged = ({ decorationState: decorationState2 }) => {
  return vscode14.languages.onDidChangeDiagnostics(async (event) => {
    const editor2 = vscode14.window.activeTextEditor;
    if (editor2 && event) {
      diagnosticInfo(editor2);
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
    const activeEditor = vscode15.window.activeTextEditor;
    clearDecorationState(loadConfig.decoration);
    const eventContext = {
      configInfo: configInfo2,
      decorationState: loadConfig.decoration
    };
    prepareRenderGroup(configInfo2);
    if (activeEditor) {
      loadConfig.decoration.appliedHighlight[0] = renderGroupIs(activeEditor, [cursorOnly]);
    }
    return [
      windowStateChanged(eventContext),
      activeEditorChanged(eventContext),
      selectionChanged(eventContext),
      editorOptionChanged(eventContext),
      diagnosticChanged(eventContext),
      configChanged(eventContext)
    ];
  } catch (err) {
    console.error("Error during extension initialization: ", err);
    vscode15.window.showErrorMessage("Extension initialization failed!", err);
  }
};

// src/extension.ts
function activate(context) {
  initialize(context).then((eventList) => {
    if (eventList) {
      context.subscriptions.push(...eventList);
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
