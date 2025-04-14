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
var size = 16 /* SIZE */;
var type = 17 /* TYPE */;
var regex = 18 /* REGEX */;
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
  DiagnosticKind: void 0,
  placeTextOnPreviousOrNextLine: void 0,
  overrideLayoutPlaceholderColorToHighestSeverity: void 0,
  overrideAllOk: void 0
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
  [size]: void 0,
  [type]: void 0,
  [regex]: void 0
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
  [multiCursorText]: void 0
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
var createRangeNNNN = (startLine, startChar, endLine, endChar) => new vscode2.Range(
  new vscode2.Position(startLine, startChar),
  new vscode2.Position(endLine, endChar)
);
var createRangeSPEP = (start, end) => new vscode2.Range(start, end);
var createCursorRange = (editor2) => {
  const position = new vscode2.Position(editor2.selection.end.line, editor2.selection.end.character);
  return new vscode2.Range(position, position);
};
var createCursorRangePreviousLine = (editor2, lineDelta = 1) => {
  const endLine = editor2.selection.end.line;
  const position = new vscode2.Position(editor2.selection.start.line !== 0 ? endLine - lineDelta : endLine, editor2.selection.end.character);
  return new vscode2.Range(position, position);
};
var createCursorRangeNextLine = (editor2, lineDelta = 1) => {
  const position = new vscode2.Position(editor2.selection.end.line + lineDelta, editor2.selection.end.character);
  return new vscode2.Range(position, position);
};
var createLineRange = (position) => new vscode2.Range(position, position);
var createStartEndRangeOfSelection = (selection) => createRangeSPEP(selection.start, selection.end);
var blankRange = [];

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
var ifContentTextHasPlaceholder = /(\${[A-z]*})/g;
var contentTextKeysOnly = /\${([^{}]+)}/s;

// src/editor/status/selection.ts
var vscode3 = __toESM(require("vscode"));

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
var splitAndPosition = (str, regex2) => {
  const match = str.match(regex2);
  let split = [];
  if (match && match.index !== void 0) {
    split = str.split(regex2);
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
  const regex2 = /^[0-9A-Fa-f]{6}$/;
  if (!regex2.test(hex)) {
    hex = defaultValue.replace(/^#/, "");
    opacity = opacityDefault;
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
var compareNumbers = (a, b) => {
  return a - b;
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
  [multiLineAnchorText]: [],
  [multiLineCursorText]: [],
  [multiCursorText]: []
};
var decorationOptionBuffer = { ...DECORATION_OPTION_CONFIG };
var setSelectionTextbuffer = (hexKey, size2) => {
  decorationOptionBuffer.isWholeLine = true;
  decorationOptionBuffer.rangeBehavior = vscode3.DecorationRangeBehavior.ClosedClosed;
  if (hexKey === multiCursorText) {
    return;
  }
  selectionTextBuffer[hexKey].splice(0);
  selectionTextBuffer[hexKey].push(...selectionContentText[hexKey].contentText.map((decorationOption2, idx) => {
    decorationOptionBuffer.after = { ...decorationOption2.after };
    return vscode3.window.createTextEditorDecorationType(decorationOption2);
  }));
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
  [multiLineChararcterHex]: (editor2) => editor2.document.getText(editor2.selection).replace(indentInfo[regex], "").length
};
var multiCursorOf = {
  nth: ({ idx }) => idx,
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
        charCount = charCount + text.replace(indentInfo[regex], "").length;
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
var contentTextFunc = (buffer, context2, option) => (contentText, idx) => {
  option.renderOptions = contentText;
  if (typeof contentText.after.contentText !== "string") {
    decorationOptionBuffer.after = { ...contentText.after };
    decorationOptionBuffer.after.contentText = String(decorationOptionBuffer.after.contentText(context2));
    option.renderOptions = decorationOptionBuffer;
  }
  context2.editor.setDecorations(buffer[idx], [option]);
};
var cursorOnlySelection = (editor2, previousKey) => {
  clearSelectionTextBuffer(editor2);
  const context2 = {
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
      context2,
      option
    )
  );
};
var singleLineSelection = (editor2, previousKey) => {
  clearBufferOfhexkey(editor2.setDecorations, previousKey);
  const context2 = {
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
      context2,
      option
    )
  );
};
var contentTextFuncBuffered = (setDecorations, buffer, decorationOption2, range, countBuffer) => (decorationType, idx) => {
  decorationOption2.range = range;
  decorationOption2.renderOptions = decorationType;
  if (typeof decorationType.after.contentText !== "string") {
    const numlink = decorationType.after.contentText;
    if (countBuffer[numlink] === null) {
      countBuffer[numlink] = multilineFunctionSymLink[numlink](vscode3.window.activeTextEditor);
    }
    decorationOptionBuffer.after = { ...decorationType.after };
    decorationOptionBuffer.after.contentText = String(countBuffer[numlink]);
    decorationOption2.renderOptions = decorationOptionBuffer;
  }
  setDecorations(buffer[idx], [decorationOption2]);
};
var decorationOptionGrid = {
  range: void 0,
  renderOptions: void 0
};
var multilineSelection = (editor2, previousKey) => {
  multiLine !== previousKey[0] && clearBufferOfhexkey(editor2.setDecorations, previousKey);
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
  clearBufferOfhexkey(editor2.setDecorations, previousKey);
  const selectionReorder = {};
  const statusLine = [];
  const selectionText = selectionContentText[multiCursorText].contentText;
  let lineIdx = 0;
  while (lineIdx < editor2.selections.length) {
    const lineNo = editor2.selections[lineIdx].start.line;
    if (!Object.hasOwn(selectionReorder, lineNo)) {
      selectionReorder[lineNo] = [0, void 0];
    }
    const lineSet = new Set(statusLine);
    if (lineSet.has(editor2.selections[lineIdx].end.line)) {
      selectionReorder[editor2.selections[lineIdx].start.line][0] += 1;
      lineIdx++;
      continue;
    }
    selectionReorder[editor2.selections[lineIdx].start.line][0] += 1;
    selectionReorder[editor2.selections[lineIdx].start.line][1] = editor2.selections[lineIdx];
    statusLine.push(editor2.selections[lineIdx].end.line);
    lineIdx++;
  }
  let cursorIdx = 1;
  const context2 = {
    idx: 0,
    editor: editor2
  };
  for (const lineKey of Object.keys(selectionReorder).map((line) => Number(line)).sort(compareNumbers)) {
    const selectionTextInfo = selectionText.map((selection) => vscode3.window.createTextEditorDecorationType(selection));
    const option = {
      range: createStartEndRangeOfSelection(selectionReorder[lineKey][1]),
      renderOptions: {}
    };
    const idxBuffer = [];
    for (let pos = cursorIdx; pos < cursorIdx + selectionReorder[lineKey][0]; pos++) {
      idxBuffer.push(pos);
    }
    context2.idx = idxBuffer.join(",");
    selectionText.forEach(
      contentTextFunc(
        selectionTextInfo,
        context2,
        option
      )
    );
    selectionTextBuffer[multiCursorText].push(selectionTextInfo);
    cursorIdx += selectionReorder[lineKey][0];
  }
};
var clearSelectionTextBuffer = (editor2) => {
  SELECTION_KIND_LIST.forEach((hexKey) => clearBufferOfhexkey(editor2.setDecorations, [hexKey]));
};
var clearDisposeBuffer = (setDecorations) => (buffer) => {
  setDecorations(buffer, blankRange);
  buffer.dispose();
};
var clearBufferOfhexkey = (setDecorations, previousKey) => {
  switch (previousKey[0]) {
    case cursorOnly:
      selectionTextBuffer[cursorOnlyText].forEach(resetDecoration(setDecorations));
      break;
    case singleLine:
      selectionTextBuffer[singleLineText].forEach(resetDecoration(setDecorations));
      break;
    case multiLine:
      selectionTextBuffer[multiLineAnchorText].forEach(resetDecoration(setDecorations));
      selectionTextBuffer[multiLineCursorText].forEach(resetDecoration(setDecorations));
      break;
    case multiCursor:
      for (const selection of selectionTextBuffer[multiCursorText]) {
        selection.forEach(clearDisposeBuffer(setDecorations));
      }
      selectionTextBuffer[multiCursorText].splice(0);
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
var convertTo1DArray = (state) => [
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
  return convertTo1DArray(diagnosticState);
};

// src/editor/status/diagnostic.ts
var diagnosticContentText = {
  ...DIAGNOSTIC_CONTENT_TEXT
};
var lineGlyph = {
  ...DIAGNOSTIC_GLYPH2
};
var diagnosticTextBuffer = {
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
var setDiagonosticTextbuffer = (hexKey, decorationType) => {
  diagnosticTextBuffer[hexKey].push(...decorationType);
};
var reloadContentText = () => {
  DIAGNOSTIC_ENTRY_LIST.forEach((hexKey) => {
    diagnosticTextBuffer[hexKey].forEach((decorationType) => decorationType.dispose());
    diagnosticContentText[hexKey].splice(0);
    diagnosticTextBuffer[hexKey].splice(0);
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
var problemLineGlyph = (lineNumber3, line) => {
  const linePosition = [];
  let length = lineNumber3.length;
  let up = false;
  let down = false;
  let equal = false;
  while (length--) {
    if (lineNumber3[length] > line && !down) {
      down = true;
    } else if (lineNumber3[length] < line && !up) {
      up = true;
    } else if (lineNumber3[length] === line && !equal) {
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
var editorWarningSourceOf = {
  wrn: ({ state, line }) => String(state[3]) + problemLineGlyph(state[2], line)
  // state.editor.warning.line
};
var editorErrorCountOf = {
  err: ({ state, line }) => String(state[5]) + problemLineGlyph(state[4], line)
  // state.editor.error.line
};
var workspaceWarningSourceOf = {
  src: ({ state }) => String(state[6])
  // state.workspace.warning.source
};
var workspaceWarningCountOf = {
  wrn: ({ state }) => String(state[7])
  // state.workspace.warning.total
};
var workspaceErrorSourceOf = {
  src: ({ state }) => String(state[8])
  // state.workspace.error.source
};
var workspaceErrorCountOf = {
  err: ({ state }) => String(state[9])
  // state.workspace.error.total
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
var decorationOptionBuffer2 = { ...DECORATION_OPTION_CONFIG };
var renderDiagnosticText = (editor2, signature, options, context2) => (decoration, idx) => {
  decorationOptionBuffer2.after = { ...decoration.after };
  if (typeof decoration.after.contentText !== "string") {
    decorationOptionBuffer2.after.contentText = decoration.after.contentText(context2);
  }
  ;
  options.renderOptions = decorationOptionBuffer2;
  editor2.setDecorations(diagnosticTextBuffer[signature][idx], [options]);
};
var decorationOption = {
  range: {},
  renderOptions: {}
};
var context = {
  state: {},
  line: {}
};
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
var clearDiagnosticText = (setDecorations, previousSignature) => {
  diagnosticTextBuffer[previousSignature[0]]?.forEach(resetDecoration(setDecorations));
};
var diagnosticInfo = (decorationState2) => (editor2) => {
  if (decorationState2.eventTrigger[0] === diagnosticChanged) {
    const diagnosticState2 = updateDiagnostic(editor2.document.uri);
    refreshBuffer(diagnosticState2);
  }
  const signature = diagnosticRenderSignature(stateBuffer);
  decorationOption.range = diagnosticOf.rangeFunction(editor2);
  context.line = editor2.selection.start.line;
  context.state = stateBuffer;
  signature !== decorationState2.diagnosticSignature[0] && clearDiagnosticText(editor2.setDecorations, decorationState2.diagnosticSignature);
  diagnosticContentText[signature].forEach(renderDiagnosticText(editor2, signature, { ...decorationOption }, context));
  decorationState2.diagnosticSignature[0] = signature;
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
var decorationState = { ...DECORATION_STATE };
var createEditorDecorationType = (styleAppliedConfig) => vscode5.window.createTextEditorDecorationType(styleAppliedConfig);
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
  clearDiagnosticText(editor2.setDecorations, decorationState.diagnosticSignature);
};
var resetAllDecoration = () => vscode5.window.visibleTextEditors.forEach(clearAll);
var updateIndentOption = (editor2) => {
  const bindTo = bindStatusContentTextState();
  bindTo.infoOf.size = Number(editor2.options.tabSize ?? editor2.options.indentSize ?? 4);
  bindTo.infoOf.type = editor2.options.insertSpaces ? "\n" : "	";
  bindTo.infoOf.regex = editor2.options.insertSpaces ? indentAndEOLRegex(bindTo.infoOf.size) : tagtAndEOLRegex;
};
var prepareRenderGroup = (config) => {
  renderFnStack[cursorOnly].splice(0);
  renderFnStack[singleLine].splice(0);
  renderFnStack[multiLine].splice(0);
  renderFnStack[multiCursor].splice(0);
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
    if (config.generalConfigInfo.diagnosticTextEnabled && (numKey === cursorOnly || numKey === singleLine)) {
      callList.push(editModeCheck);
    } else {
      callList.push(diagnosticInfo(decorationState));
    }
    renderFnStack[numKey].push(...callList);
  });
};
var editModeCheck = (editor2) => {
  if (editor2.selections[0].start.line !== decorationState.previousLine[0]) {
    diagnosticInfo(decorationState)(editor2);
  }
  decorationState.previousLine[0] = editor2.selections[0].start.line;
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
var multiLineHighlightRange = (editor2, previousKey) => {
  multiLine !== previousKey[0] && clearHighlight(editor2.setDecorations, previousKey, blankRange);
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
var vscode9 = __toESM(require("vscode"));

// src/util/error.ts
var vscode6 = __toESM(require("vscode"));
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
    return vscode6.window.showErrorMessage(
      "Please revise invalid values in configuration." /* CONFIGURATION_ERROR */,
      ...["Fix Configuration", "Ignore"]
    );
  }
  static userSelect(configurationList) {
    return function(selected) {
      if (selected === "Fix Configuration") {
        vscode6.commands.executeCommand("workbench.action.openSettings", configurationList);
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
    return () => vscode6.window.showInformationMessage(message)?.then(() => {
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
var vscode7 = __toESM(require("vscode"));
var writeEditorConfiguration = () => {
  const editorConfig = getWorkspaceConfiguration("editor");
  editorConfig.update("renderLineHighlight", "gutter", vscode7.ConfigurationTarget.Global);
  editorConfig.update("roundedSelection", false, vscode7.ConfigurationTarget.Global);
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

// src/configuration/shared/decoration.ts
var vscode8 = __toESM(require("vscode"));
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
var searchPlaceholderPosition = (textOf, functionOf, functionKey, regex2, search, lastIndex) => {
  const split = castToFuncSignature(splitAndPosition(search.nextSearchString, regex2));
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
  const decorationOption2 = { ...DECORATION_OPTION_CONFIG };
  decorationOption2.isWholeLine = isWholeLine;
  decorationOption2.rangeBehavior = vscode8.DecorationRangeBehavior.ClosedOpen;
  decorationOption2.after = { ...DECORATION_OPTION_AFTER_CONFIG };
  if (contentText) {
    decorationOption2.after.contentText = contentText;
  }
  if (!config.color) {
    return;
  }
  decorationOption2.after.color = hexToRgbaStringLiteral(config.color, config.colorOpacity, "#333333", 0.7);
  if (config.backgroundColor && config.backgroundColor !== "null" && config.backgroundColor.length > 0) {
    decorationOption2.after.backgroundColor = hexToRgbaStringLiteral(config.backgroundColor, config.backgroundOpacity, "#333333", 0.7);
    ;
  } else {
    delete decorationOption2.after.backgroundColor;
  }
  if (config.fontWeight !== "normal") {
    decorationOption2.after.fontWeight = config.fontWeight;
  } else {
    delete decorationOption2.after.fontWeight;
  }
  if (config.fontStyle !== "normal") {
    decorationOption2.after.fontStyle = config.fontStyle;
  } else {
    delete decorationOption2.after.fontStyle;
  }
  delete decorationOption2.after.margin;
  delete decorationOption2.after.textDecoration;
  return decorationOption2;
};

// src/configuration/shared/configuration.ts
var getWorkspaceConfiguration = (section) => vscode9.workspace.getConfiguration(section);
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
var vscode10 = __toESM(require("vscode"));
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

// src/configuration/decoration/selection.ts
var convertPositionToDecorationRenderOption = (textPosition, SelectionDecorationStyle) => {
  return textPosition.contentText.map((text, idx) => {
    const option = typeof text === "string" ? SelectionDecorationStyle.placeholderDecorationOption : SelectionDecorationStyle.selectionDecorationOption[textPosition.position[idx]];
    const contentTextRenderOption = setContentTextOnDecorationRenderOption(option, text);
    if (typeof text === "symbol") {
      textPosition.position[idx] = contentTextRenderOption.after.contentText;
    }
    return contentTextRenderOption;
  }).filter((decorationOption2) => decorationOption2 !== void 0);
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

// src/configuration/decoration/diagonostic.ts
var vscode11 = __toESM(require("vscode"));
var positionKeyList = ["pre", "post"];
var positionKeyToPlaceholderName = { pre: "prefix", post: "postfix" };
var applyExtraStyle = (textOf, extraStyle, leftMargin) => {
  let backgroundColor;
  const sidePadding = extraStyle.sidePadding !== "null" ? extraStyle.sidePadding : null;
  const topDownPadding = extraStyle.topDownPadding !== "null" ? extraStyle.topDownPadding : null;
  const marginLeftStr = `;margin-left:${leftMargin}`;
  for (const contentText of Object.values(textOf)) {
    if (extraStyle.borderRadius) {
      contentText[0].after["textDecoration"] = `;border-top-left-radius:${extraStyle.borderRadius};border-bottom-left-radius:${extraStyle.borderRadius};padding-left:${sidePadding}`;
      contentText[contentText.length - 1].after["textDecoration"] = `;border-top-right-radius:${extraStyle.borderRadius};border-bottom-right-radius:${extraStyle.borderRadius};padding-right:${sidePadding}`;
    }
    if (leftMargin !== "0px" && leftMargin !== "0em" && leftMargin) {
      contentText[0].after["textDecoration"] += `;margin-left:${leftMargin}`;
    }
  }
  if (extraStyle.backgroundColor !== "null") {
    backgroundColor = hexToRgbaStringLiteral(extraStyle.backgroundColor, extraStyle.backgroundOpacity, "#333333", 0.7);
    Object.entries(textOf).forEach(([hexKey, contentText]) => {
      contentText.forEach((text, idx) => {
        textOf[hexKey][idx].after["backgroundColor"] = backgroundColor;
        if (idx !== 0) {
          textOf[hexKey][idx].after["textDecoration"] = textOf[hexKey][idx].after["textDecoration"]?.replace(marginLeftStr, "");
        }
        if (topDownPadding) {
          textOf[hexKey][idx].after["textDecoration"] += `;padding-top:${topDownPadding};padding-bottom:${topDownPadding}`;
        }
      });
    });
  }
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
  }).filter((decorationOption2) => decorationOption2 !== void 0);
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
      primaryStyle: style.diagonosticDecorationOption[linker[0]],
      secondaryStyle: linker[1] ? style.diagonosticDecorationOption[linker[1]] : null,
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
      setDiagonosticTextbuffer(allOkOverride, ok.map((decoration2) => vscode11.window.createTextEditorDecorationType(decoration2)));
      textOftarget[allOkOverride].push(...ok);
    } else {
      setDiagonosticTextbuffer(allOkOverride, [vscode11.window.createTextEditorDecorationType(decoration)]);
      textOftarget[allOkOverride].push({ ...decoration });
    }
  });
  preset.layout[problemPlaceholderContentText].contentText.forEach((decoration) => {
    if (decoration.after.contentText === editorHexKey) {
      const ok = concatinateNotation(preset.editor[okEditorContentText]);
      const warn = concatinateNotation(preset.editor[warningEditorContentText]);
      const err = concatinateNotation(preset.editor[errorEditorContentText]);
      textOftarget[allOkNoOverride].push(...ok);
      textOftarget[editorOkWorkspaceWarn].push(...ok);
      textOftarget[editorOkWorkspaceErr].push(...ok);
      textOftarget[editorOkWorkspaceWarnErr].push(...ok);
      textOftarget[editorWarnWorkspaceWarn].push(...warn);
      textOftarget[editorWarnWorkspaceErr].push(...warn);
      textOftarget[editorWarnWorkspaceWarnErr].push(...warn);
      textOftarget[editorErrWorkspaceErr].push(...err);
      textOftarget[editorErrWorkspaceWarnErr].push(...err);
      textOftarget[editorWarnErrWorkspaceWarnErr].push(...warn, ...err);
      const okDecoration = ok.map((decoration2) => vscode11.window.createTextEditorDecorationType(decoration2));
      const warnDecoration = warn.map((decoration2) => vscode11.window.createTextEditorDecorationType(decoration2));
      const errDecoration = err.map((decoration2) => vscode11.window.createTextEditorDecorationType(decoration2));
      setDiagonosticTextbuffer(allOkNoOverride, okDecoration);
      setDiagonosticTextbuffer(editorOkWorkspaceWarn, okDecoration);
      setDiagonosticTextbuffer(editorOkWorkspaceErr, okDecoration);
      setDiagonosticTextbuffer(editorOkWorkspaceWarnErr, okDecoration);
      setDiagonosticTextbuffer(editorWarnWorkspaceWarn, warnDecoration);
      setDiagonosticTextbuffer(editorWarnWorkspaceErr, warnDecoration);
      setDiagonosticTextbuffer(editorWarnWorkspaceWarnErr, warnDecoration);
      setDiagonosticTextbuffer(editorErrWorkspaceErr, errDecoration);
      setDiagonosticTextbuffer(editorErrWorkspaceWarnErr, errDecoration);
      setDiagonosticTextbuffer(editorWarnErrWorkspaceWarnErr, [...warnDecoration, ...errDecoration]);
      return;
    }
    if (decoration.after.contentText === workspaceHexKey) {
      const ok = concatinateNotation(preset.workspace[okWorkspaceContentText]);
      const warn = concatinateNotation(preset.workspace[warningWorkspaceContentText]);
      const err = concatinateNotation(preset.workspace[errorWorkspaceContentText]);
      textOftarget[allOkNoOverride].push(...ok);
      textOftarget[editorOkWorkspaceWarn].push(...warn);
      textOftarget[editorOkWorkspaceErr].push(...err);
      textOftarget[editorOkWorkspaceWarnErr].push(...warn, ...err);
      textOftarget[editorWarnWorkspaceWarn].push(...warn);
      textOftarget[editorWarnWorkspaceErr].push(...err);
      textOftarget[editorWarnWorkspaceWarnErr].push(...warn, ...err);
      textOftarget[editorErrWorkspaceErr].push(...err);
      textOftarget[editorErrWorkspaceWarnErr].push(...warn, ...err);
      textOftarget[editorWarnErrWorkspaceWarnErr].push(...warn, ...err);
      const okDecoration = ok.map((decoration2) => vscode11.window.createTextEditorDecorationType(decoration2));
      const warnDecoration = warn.map((decoration2) => vscode11.window.createTextEditorDecorationType(decoration2));
      const errDecoration = err.map((decoration2) => vscode11.window.createTextEditorDecorationType(decoration2));
      setDiagonosticTextbuffer(allOkNoOverride, okDecoration);
      setDiagonosticTextbuffer(editorOkWorkspaceWarn, warnDecoration);
      setDiagonosticTextbuffer(editorOkWorkspaceErr, errDecoration);
      setDiagonosticTextbuffer(editorOkWorkspaceWarnErr, [...warnDecoration, ...errDecoration]);
      setDiagonosticTextbuffer(editorWarnWorkspaceWarn, warnDecoration);
      setDiagonosticTextbuffer(editorWarnWorkspaceErr, errDecoration);
      setDiagonosticTextbuffer(editorWarnWorkspaceWarnErr, [...warnDecoration, ...errDecoration]);
      setDiagonosticTextbuffer(editorErrWorkspaceErr, errDecoration);
      setDiagonosticTextbuffer(editorErrWorkspaceWarnErr, [...warnDecoration, ...errDecoration]);
      setDiagonosticTextbuffer(editorWarnErrWorkspaceWarnErr, [...warnDecoration, ...errDecoration]);
      return;
    }
    const decorationType = vscode11.window.createTextEditorDecorationType(decoration);
    DIAGNOSTIC_PROBLEM_LIST.forEach((hexKey) => {
      textOftarget[hexKey].push({ ...decoration });
      setDiagonosticTextbuffer(hexKey, [decorationType]);
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
var setGlyph = (glyphList, config) => {
  glyphList[openningBracket] = config.openningBracket;
  glyphList[closingBracket] = config.closingBracket;
  glyphList[lineEqual] = config.lineEqual;
  glyphList[lineUp] = config.lineUp;
  glyphList[lineDown] = config.lineDown;
};
var setCursorLine = (bindTo, visibility) => {
  if (visibility.placeTextOnPreviousOrNextLine === "previousLine") {
    bindTo.rangeFunction = createCursorRangePreviousLine;
    return;
  }
  if (visibility.placeTextOnPreviousOrNextLine === "nextLine") {
    bindTo.rangeFunction = createCursorRangeNextLine;
    return;
  }
  bindTo.rangeFunction = createCursorRange;
  return;
};
var updateDiagnosticTextConfig = (extenionName, configuratioChange = false) => {
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

// src/configuration/preset/preset.ts
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
    const jsonPath = context2.package.asAbsolutePath(import_path.default.join("resource/preset/", presetFilename));
    const content = await (0, import_promises.readFile)(jsonPath, { encoding: "utf-8" });
    const data = JSON.parse(content);
    return data;
  } catch (error2) {
    console.error("Failed to load preset JSON:", error2);
  }
};
var writeConfiguration = (configInfo2, packageName, json) => (selected) => {
  if (selected === "Yes" /* YES */) {
    writeSelectedPreset(configInfo2, packageName, json);
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
var writeSelectedPreset = (configInfo2, packageName, json) => {
  const config = getWorkspaceConfiguration(packageName);
  Object.keys(json).forEach((section) => {
    if (typeof json[section] === "object") {
      const proxy = config.inspect(section);
      config.update(section, { ...proxy?.globalValue, ...json[section] }, true);
    } else {
      config.update(section, json[section], true);
    }
  });
  updateSelectionTextConfig(packageName, true);
  updateDiagnosticTextConfig(packageName, true);
  resetAllDecoration();
  prepareRenderGroup(configInfo2);
};
var overrideConfirm = (message) => {
  return vscode12.window.showWarningMessage(message, ...["Yes" /* YES */, "No" /* NO */]);
};
var quickPickWrapper = async (context2, presetList, fileList, placeHolder) => {
  const preset = await vscode12.window.showQuickPick(presetList, { placeHolder });
  if (preset && Object.hasOwn(fileList, preset)) {
    const json = await readPreset(context2, fileList[preset]);
    const packageName = context2.package.extension.packageJSON.name;
    const write = writeConfiguration(context2.configInfo, packageName, json ? json : {});
    if (checkDuplciateOverride(context2.package.extension.packageJSON.name, json)) {
      overrideConfirm("Configuration will be overwritten. Proceed?" /* OVERRIDE_CONFIRM */).then(write);
    } else {
      write("Yes" /* YES */);
    }
  }
};
var quickPickPresetList = (context2) => {
  quickPickWrapper(
    context2,
    [
      "Detailed" /* DETAILED */,
      "Shorten" /* SHORTEN */,
      "No Glpyph - Detailed" /* NO_GLYPH_D */,
      "No Glpyph - Simple" /* NO_GLYPH_S */,
      "Emoji - Detailed" /* EMOJI_D */,
      "Emoji - Simple" /* EMOJI_S */
    ],
    {
      ["Detailed" /* DETAILED */]: "detailed.json",
      ["Shorten" /* SHORTEN */]: "shorten.json",
      ["No Glpyph - Detailed" /* NO_GLYPH_D */]: "no-glyph-detailed.json",
      ["No Glpyph - Simple" /* NO_GLYPH_S */]: "no-glyph-simple.json",
      ["Emoji - Detailed" /* EMOJI_D */]: "emoji-detailed.json",
      ["Emoji - Simple" /* EMOJI_S */]: "emoji-simple.json"
    },
    " ... Select the Preset" /* PRESET_SELCT */
  );
};
var quickPickOientationList = (context2) => {
  quickPickWrapper(
    context2,
    ["Horizontal" /* HORIZONTAL */, "Vertical" /* VERTICAL */],
    {
      ["Horizontal" /* HORIZONTAL */]: "orientation-horizontal.json",
      ["Vertical" /* VERTICAL */]: "orientation-vertical.json"
    },
    " ... Select the Preset Orientation" /* PRESET_SELCT_ORIENTATION */
  );
};
var quickPickColorList = (context2) => {
  quickPickWrapper(
    context2,
    ["Blur" /* BLUR */, "Sharp" /* SHARP */],
    {
      ["Blur" /* BLUR */]: "color-blur.json",
      ["Sharp" /* SHARP */]: "color-sharp.json"
    },
    " ... Select the Color" /* PRESET_SELCT_COLOR */
  );
};

// src/command/register.ts
var setPreset = (context2) => {
  return vscode13.commands.registerCommand("cursorlinehighlight.applyPreset", () => quickPickPresetList(context2));
};
var setColor = (context2) => {
  return vscode13.commands.registerCommand("cursorlinehighlight.setColor", () => quickPickColorList(context2));
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
  return vscode14.window.onDidChangeWindowState((event) => {
    if (event.focused) {
      if (vscode14.window.activeTextEditor) {
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
};
var activeEditorChanged = ({ configInfo: configInfo2, decorationState: decorationState2 }) => {
  return vscode14.window.onDidChangeActiveTextEditor(async (editor2) => {
    if (editor2) {
      if (Error2.check()) {
        Error2.notify(1500);
      }
      resetAllDecoration();
      if (configInfo2.generalConfigInfo.diagnosticTextEnabled) {
        await resetEditorDiagnosticStatistics();
        await updateDiagnostic(editor2.document.uri);
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
    decorationState2.appliedHighlight[0] = renderGroupIs(event.textEditor, decorationState2.appliedHighlight);
  });
};

// src/event/workspace.ts
var vscode15 = __toESM(require("vscode"));
var configChanged = ({ configInfo: configInfo2, decorationState: decorationState2 }) => {
  return vscode15.workspace.onDidChangeConfiguration((event) => {
    if (event) {
      const section = Object.keys(CONFIG_SECTION).find((section2) => {
        return event.affectsConfiguration(configInfo2.name + "." + section2);
      });
      if (section) {
        Error2.configurationUpdated();
        try {
          const sectionChanged = {
            ["general" /* GENERAL */]: () => updateGeneralConfig(configInfo2),
            ["cursorOnly" /* CURSOR_ONLY */]: () => updateHighlightStyleConfiguration(configInfo2, cursorOnly),
            ["singleLine" /* SINGLE_LINE */]: () => updateHighlightStyleConfiguration(configInfo2, singleLine),
            ["multiLine" /* MULTI_LINE */]: () => updateHighlightStyleConfiguration(configInfo2, multiLine),
            ["multiCursor" /* MULTI_CURSOR */]: () => updateHighlightStyleConfiguration(configInfo2, multiCursor),
            ["selectionText" /* SELECTION_TEXT */]: () => {
              updateSelectionTextConfig(configInfo2.name, true);
              updateDiagnosticTextConfig(configInfo2.name, true);
            },
            ["diagnosticText" /* DIAGNOSTIC_TEXT */]: () => {
              updateSelectionTextConfig(configInfo2.name, true);
              updateDiagnosticTextConfig(configInfo2.name, true);
            }
          };
          sectionChanged[section]();
          sectionChanged["general" /* GENERAL */]();
        } catch (e) {
          console.log("confugration update failed. Will notify user.", e);
        } finally {
          resetAllDecoration();
          prepareRenderGroup(configInfo2);
        }
      }
    }
  });
};

// src/event/language.ts
var vscode16 = __toESM(require("vscode"));
var diagnosticChanged2 = ({ decorationState: decorationState2 }) => {
  return vscode16.languages.onDidChangeDiagnostics(async (event) => {
    const editor2 = vscode16.window.activeTextEditor;
    if (editor2 && event) {
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
    const eventContext = {
      configInfo: configInfo2,
      decorationState: loadConfig.decoration
    };
    prepareRenderGroup(configInfo2);
    if (activeEditor) {
      clearDecorationState(loadConfig.decoration);
      loadConfig.decoration.appliedHighlight[0] = renderGroupIs(activeEditor, [cursorOnly]);
    }
    const commandContext = {
      package: extensionContext,
      configInfo: configInfo2
    };
    return [
      // extension subscription list
      setPreset(commandContext),
      setColor(commandContext),
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
  initialize(context2).then((eventList) => {
    if (eventList) {
      context2.subscriptions.push(...eventList);
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
