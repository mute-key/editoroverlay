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
var vscode13 = __toESM(require("vscode"));

// src/constant/object.ts
var vscode = __toESM(require("vscode"));
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
  generalConfigInfo: {
    borderOpacity: void 0,
    backgroundOpacity: void 0,
    selectionTextEnabled: "selectionText.enabled" /* SELECTION_TEXT_ENABLED */,
    diagnosticTextEnabled: "diagnosticText.enabled" /* DIAGNOSTIC_TEXT_ENABLED */
  },
  configError: void 0
};
var SELECTION_DECORAITON_CONFIG = {
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
var INDENT_INFO = {
  size: void 0,
  type: void 0,
  regex: void 0
};
var RENDER_GROUP_SET_PROPERTY = {
  type: void 0,
  selectionCount: void 0,
  diagnostic: void 0
};
var RENDER_GROUP_SET = {
  ["CURSOR_ONLY" /* CURSOR_ONLY */]: RENDER_GROUP_SET_PROPERTY,
  ["SINGLE_LINE" /* SINGLE_LINE */]: RENDER_GROUP_SET_PROPERTY,
  ["MULTI_LINE" /* MULTI_LINE */]: RENDER_GROUP_SET_PROPERTY,
  ["MULTI_CURSOR" /* MULTI_CURSOR */]: RENDER_GROUP_SET_PROPERTY
};
var DECORATION_STATE = {
  appliedHighlight: {
    applied: void 0,
    ofDecorationType: void 0
  },
  selectionText: [],
  diagnosticText: [],
  statusInfo: {
    selectionText: void 0,
    diagnosticText: void 0
  }
};
var HIGHLIGHT_STYLE_LIST = {
  CURSOR_ONLY: void 0,
  SINGLE_LINE: void 0,
  MULTI_LINE: void 0,
  MULTI_CURSOR: void 0
};
var HIGHLIGHT_BORDER_POSITION_INFO = {
  CURSOR_ONLY: void 0,
  SINGLE_LINE: void 0,
  MULTI_LINE: void 0,
  MULTI_CURSOR: void 0
};
var DECORATION_STYLE_PREFIX = {
  CURSOR_ONLY: "cursorOnly",
  SINGLE_LINE: "singleLine",
  MULTI_LINE: "multiLine",
  MULTI_CURSOR: "multiCursor"
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
var DIAGNOSTIC_EDITOR_CONTENT_TEXT_KEYSET = {
  ["okContentText" /* OK_CONTENT_TEXT */]: "okEditorContentText" /* OK_EDITOR_CONTENT_TEXT */,
  ["warningContentText" /* WARNING_CONTENT_TEXT */]: "warningEditorContentText" /* WARNING_EDITOR_CONTENT_TEXT */,
  ["errorContentText" /* ERROR_CONTENT_TEXT */]: "errorEditorContentText" /* ERROR_EDITOR_CONTENT_TEXT */
};
var DIAGNOSTIC_WORKSPACE_CONTENT_TEXT_KEYSET = {
  ["okContentText" /* OK_CONTENT_TEXT */]: "okWorkspaceContentText" /* OK_WORKSPACE_CONTENT_TEXT */,
  ["warningContentText" /* WARNING_CONTENT_TEXT */]: "warningWorkspaceContentText" /* WARNING_WORKSPACE_CONTENT_TEXT */,
  ["errorContentText" /* ERROR_CONTENT_TEXT */]: "errorWorkspaceContentText" /* ERROR_WORKSPACE_CONTENT_TEXT */
};
var DIAGNOSTIC_WORKSPACE_PLACEHOLDER_LINKER = {
  ["okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */]: "okWorkspaceContentText",
  ["warningNotationTextStyle" /* WARNING_NOTATION_TEXT_STYLE */]: "warningWorkspaceContentText",
  ["errorNotationTextStyle" /* ERROR_NOTATION_TEXT_STYLE */]: "errorWorkspaceContentText"
};
var DIAGNOSTIC_EDITOR_PLACEHOLDER_LINKER = {
  ["okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */]: "okEditorContentText",
  ["warningNotationTextStyle" /* WARNING_NOTATION_TEXT_STYLE */]: "warningEditorContentText",
  ["errorNotationTextStyle" /* ERROR_NOTATION_TEXT_STYLE */]: "errorEditorContentText"
};
var DIAGNOSTIC_ALL_PLACEHOLDER_LINKER = {
  ["okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */]: "okAllContentText"
};
var DECORATION_OPTION_LINKER = {
  problemPlaceholderContentText: ["diagnosticPlaceholderTextStyle" /* DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE */, void 0],
  allOkPlaceholderContentText: ["diagnosticPlaceholderTextStyle" /* DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE */, void 0],
  okWorkspaceContentText: ["okTextStyle" /* OK_TEXT_STYLE */, "okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */],
  okEditorContentText: ["okTextStyle" /* OK_TEXT_STYLE */, "okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */],
  okAllContentText: ["okTextStyle" /* OK_TEXT_STYLE */, "okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */],
  warningWorkspaceContentText: ["warningTextStyle" /* WARNINGTEXT_STYLE */, "warningNotationTextStyle" /* WARNING_NOTATION_TEXT_STYLE */],
  warningEditorContentText: ["warningTextStyle" /* WARNINGTEXT_STYLE */, "warningNotationTextStyle" /* WARNING_NOTATION_TEXT_STYLE */],
  errorWorkspaceContentText: ["errorTextStyle" /* ERROR_TEXT_STYLE */, "errorNotationTextStyle" /* ERROR_NOTATION_TEXT_STYLE */],
  errorEditorContentText: ["errorTextStyle" /* ERROR_TEXT_STYLE */, "errorNotationTextStyle" /* ERROR_NOTATION_TEXT_STYLE */]
};
var DIAGNOSTIC_STYLE_LIST = [
  ["okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */, "okTextStyle" /* OK_TEXT_STYLE */],
  ["warningNotationTextStyle" /* WARNING_NOTATION_TEXT_STYLE */, "warningTextStyle" /* WARNINGTEXT_STYLE */],
  ["errorNotationTextStyle" /* ERROR_NOTATION_TEXT_STYLE */, "errorTextStyle" /* ERROR_TEXT_STYLE */]
];
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
var DIAGNOSTIC_STATE = {
  severity: 0,
  editor: {
    warning: {
      total: 0
    },
    error: {
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
var DIAGNOSTIC_DECORATION_STYLE = {
  leftMargin: void 0,
  diagonosticDecorationOption: {
    ["diagnosticPlaceholderTextStyle" /* DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE */]: void 0,
    ["okTextStyle" /* OK_TEXT_STYLE */]: void 0,
    // change to const enum laster
    ["okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */]: void 0,
    // change to const enum laster
    ["warningTextStyle" /* WARNINGTEXT_STYLE */]: void 0,
    // change to const enum laster
    ["warningNotationTextStyle" /* WARNING_NOTATION_TEXT_STYLE */]: void 0,
    // change to const enum laster
    ["errorTextStyle" /* ERROR_TEXT_STYLE */]: void 0,
    // change to const enum laster
    ["errorNotationTextStyle" /* ERROR_NOTATION_TEXT_STYLE */]: void 0
    // change to const enum laster
  }
};
var DIAGNOSTIC_SEVERITY_TO_KEY = {
  [vscode.DiagnosticSeverity.Warning]: "warning" /* WARNING */,
  [vscode.DiagnosticSeverity.Error]: "error" /* ERROR */
};
var SELECTION_CONTENT_TEXT = {
  ["cursorOnlyText" /* CURSOR_ONLY_TEXT */]: void 0,
  ["singleLineText" /* SINGLE_LINE_TEXT */]: void 0,
  ["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */]: void 0,
  ["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */]: void 0,
  ["multiCursorText" /* MULTI_CURSOR_TEXT */]: void 0
};
var DIAGNOSTIC_CONTENT_TEXT = {
  layout: {},
  editor: {},
  workspace: {},
  all: {}
};
var DIAGNOSTIC_DECORATION_TEXT_KIND = {
  contentText: void 0,
  notation: void 0
};
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
  ["CURSOR_ONLY" /* CURSOR_ONLY */]: SINGLE_BORDER_SELECTION,
  ["SINGLE_LINE" /* SINGLE_LINE */]: SINGLE_BORDER_SELECTION,
  ["MULTI_LINE" /* MULTI_LINE */]: MULTILINE_BORDER_SELECTION,
  ["MULTI_CURSOR" /* MULTI_CURSOR */]: SINGLE_BORDER_SELECTION
};
var SELECTION_KIND = {
  ["RESET" /* RESET */]: {
    KEY: "RESET" /* RESET */,
    MASK: 15 /* RESET */
  },
  ["CURSOR_ONLY" /* CURSOR_ONLY */]: {
    KEY: "CURSOR_ONLY" /* CURSOR_ONLY */,
    MASK: 1 /* CURSOR_ONLY */
  },
  ["SINGLE_LINE" /* SINGLE_LINE */]: {
    KEY: "SINGLE_LINE" /* SINGLE_LINE */,
    MASK: 2 /* SINGLE_LINE */
  },
  ["MULTI_LINE" /* MULTI_LINE */]: {
    KEY: "MULTI_LINE" /* MULTI_LINE */,
    MASK: 4 /* MULTI_LINE */
  },
  ["MULTI_CURSOR" /* MULTI_CURSOR */]: {
    KEY: "MULTI_CURSOR" /* MULTI_CURSOR */,
    MASK: 8 /* MULTI_CURSOR */
  }
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
var NO_CONFIGURATION_DEOCORATION_DEFAULT = {
  ["CURSOR_ONLY" /* CURSOR_ONLY */]: {
    ["isWholeLine" /* IS_WHOLE_LINE */]: true,
    ["borderWidth" /* BORDER_WIDTH */]: "2px",
    ["borderStyle" /* BORDER_STYLE */]: "dotted",
    ["borderColor" /* BORDER_COLOR */]: "#ff0000",
    ["borderPosition" /* BORDER_POSITION */]: "bottom",
    ["backgroundColor" /* BACKGROUND_COLOR */]: "#ff0000"
  },
  ["SINGLE_LINE" /* SINGLE_LINE */]: {
    ["isWholeLine" /* IS_WHOLE_LINE */]: false,
    ["borderWidth" /* BORDER_WIDTH */]: "2px",
    ["borderStyle" /* BORDER_STYLE */]: "dotted",
    ["borderColor" /* BORDER_COLOR */]: "#ff0000",
    ["borderPosition" /* BORDER_POSITION */]: "bottom",
    ["backgroundColor" /* BACKGROUND_COLOR */]: "#ff0000"
  },
  ["MULTI_LINE" /* MULTI_LINE */]: {
    ["isWholeLine" /* IS_WHOLE_LINE */]: true,
    ["borderWidth" /* BORDER_WIDTH */]: "2px",
    ["borderStyle" /* BORDER_STYLE */]: "dotted",
    ["borderColor" /* BORDER_COLOR */]: "#ff0000",
    ["borderPosition" /* BORDER_POSITION */]: "bottom",
    ["backgroundColor" /* BACKGROUND_COLOR */]: "#ff0000"
  },
  ["MULTI_CURSOR" /* MULTI_CURSOR */]: {
    ["isWholeLine" /* IS_WHOLE_LINE */]: false,
    ["borderWidth" /* BORDER_WIDTH */]: "2px",
    ["borderStyle" /* BORDER_STYLE */]: "dotted",
    ["borderColor" /* BORDER_COLOR */]: "#ff0000",
    ["borderPosition" /* BORDER_POSITION */]: "bottom",
    ["backgroundColor" /* BACKGROUND_COLOR */]: "#ff0000"
  }
};

// src/util/error.ts
var vscode2 = __toESM(require("vscode"));
var ErrorDecription = class {
  #configurationSection;
  #errorMessage;
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
  static configurationSectionList = (() => {
    return this.errorList.map((error2) => error2.get().section);
  })();
  static configurationMessageList = (() => {
    return this.errorList.map((error2) => error2.get().message);
  })();
  static resetConfiguration = () => {
  };
};
var Error2 = class extends ErrorHelper {
  static #fixConfiguration = () => {
    vscode2.window.showErrorMessage(
      "Invalid Value(s) in Configuration.\n" + this.configurationMessageList.join("\n"),
      ...["Fix Configuration", "Ignore"]
    ).then((selection) => {
      if (selection === "Fix Configuration") {
        vscode2.commands.executeCommand("workbench.action.openSettings", this.configurationSectionList.join(" "));
      }
    });
    return false;
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
  static printError = () => {
    console.log("error print", this.errorList.length);
    this.errorList.forEach((el) => {
      console.log(el.get());
    });
  };
  static notify = (timer = 0) => {
    if (this.check()) {
      setInterval(this.#fixConfiguration, timer);
    }
  };
};
var error_default = Error2;

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

// src/configuration/shared/editor.ts
var vscode4 = __toESM(require("vscode"));

// src/util/util.ts
var vscode3 = __toESM(require("vscode"));
var getWorkspaceConfiguration = (section) => vscode3.workspace.getConfiguration(section);
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
  editorConfig.update("renderLineHighlight", "gutter", vscode4.ConfigurationTarget.Global);
  editorConfig.update("roundedSelection", false, vscode4.ConfigurationTarget.Global);
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
var vscode5 = __toESM(require("vscode"));
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
      error_default.register(sectionName + "." + sectionKey, "numbers of placeholder exceed availability");
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
          error_default.register(sectionName + "." + sectionKey, `Invalid placeholder '${regexKey[1]}' is set in user configration. Load default value instead for now. Please revise the value entered.`);
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
  decorationOption.rangeBehavior = vscode5.DecorationRangeBehavior.ClosedOpen;
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

// src/editor/range.ts
var vscode6 = __toESM(require("vscode"));
var createRangeNNNN = (startLine, startChar, endLine, endChar) => new vscode6.Range(
  new vscode6.Position(startLine, startChar),
  new vscode6.Position(endLine, endChar)
);
var createRangeSPEP = (start, end) => new vscode6.Range(start, end);
var createRangeNNEP = (line, startChar, end) => new vscode6.Range(
  new vscode6.Position(line, startChar),
  end
);
var createCursorRange = (editor2, lineDelta = 0) => new vscode6.Range(
  new vscode6.Position(editor2.selection.end.line + lineDelta, editor2.selection.end.character),
  new vscode6.Position(editor2.selection.end.line + lineDelta, editor2.selection.end.character)
);
var createActiveRange = (editor2) => createRangeSPEP(editor2.selection.active, editor2.selection.active);
var createAnchorRange = (editor2) => createRangeSPEP(editor2.selection.anchor, editor2.selection.anchor);
var createStartEndRangeOfSelection = (selection) => createRangeSPEP(selection.start, selection.end);
var Range2 = {
  createRangeNNNN,
  createRangeSPEP,
  createRangeNNEP,
  createCursorRange,
  createActiveRange,
  createAnchorRange,
  createStartEndRangeOfSelection
};
var range_default = Range2;

// src/editor/decoration/status/selection.ts
var selectionContentText = { ...SELECTION_CONTENT_TEXT };
var indentInfo = { ...INDENT_INFO };
var CursorOnly;
((CursorOnly2) => {
  CursorOnly2.selectionOfcolDelta = (editor2, delta = 0) => {
    const col = editor2.selection.active.character + delta;
    const end = editor2.document.lineAt(editor2.selection.active.line).text.length + delta;
    return col === end ? col : col + "/" + end;
  };
  CursorOnly2.selectionOfCol = {
    col: ({ editor: editor2 }) => (0, CursorOnly2.selectionOfcolDelta)(editor2, 1),
    zCol: ({ editor: editor2 }) => (0, CursorOnly2.selectionOfcolDelta)(editor2)
  };
})(CursorOnly || (CursorOnly = {}));
var SingleLine;
((SingleLine2) => {
  SingleLine2.selectionOfSingleLineChar = {
    char: ({ editor: editor2 }) => Math.abs(editor2.selection.end.character - editor2.selection.start.character)
  };
  SingleLine2.selectionOfLn = {
    ln: ({ editor: editor2 }) => editor2.selection.active.line + 1
  };
})(SingleLine || (SingleLine = {}));
var MultiLine;
((MultiLine2) => {
  MultiLine2.multiLineLcSym = Symbol("multiLineLcSym");
  MultiLine2.multiLineCharSym = Symbol("multiLineCharSym");
  MultiLine2.multilineFunctionSymLink = {
    [MultiLine2.multiLineLcSym]: ({ editor: editor2 }) => Math.abs(editor2.selection.end.line - editor2.selection.start.line) + 1,
    [MultiLine2.multiLineCharSym]: ({ editor: editor2, indent }) => String(editor2.document.getText(editor2.selection).replace(indent.regex, "").length)
  };
  MultiLine2.selectionOfLcChar = {
    lc: MultiLine2.multiLineLcSym,
    char: MultiLine2.multiLineCharSym
  };
})(MultiLine || (MultiLine = {}));
var MultiCursor;
((MultiCursor2) => {
  MultiCursor2.selectionOf = {
    nth: ({ idx }) => idx,
    count: ({ editor: editor2 }) => editor2.selections.length,
    ln: ({ idx, editor: editor2 }) => editor2.selections[idx].end.line + 1,
    lc: ({ editor: editor2 }) => {
      let idx = 0;
      let lineCount2 = 0;
      const length = editor2.selections.length;
      const isSingleLine = editor2.selections[0].start.line === editor2.selections[0].end.line;
      const lineDiff = isSingleLine ? 1 : Math.abs(editor2.selections[0].end.line - editor2.selections[0].start.line) + 1;
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
    char: ({ editor: editor2, indent }) => {
      let idx = 0;
      let charCount = 0;
      const length = editor2.selections.length;
      const isSingleLine = editor2.selections[0].start.line === editor2.selections[0].end.line;
      while (idx < length) {
        if (isSingleLine) {
          charCount = charCount + (editor2.selections[idx].end.character - editor2.selections[idx].start.character);
        } else {
          const text = editor2.document.getText(editor2.selections[idx]);
          charCount = charCount + text.replace(indent.regex, "").length;
        }
        idx++;
      }
      return charCount;
    }
  };
})(MultiCursor || (MultiCursor = {}));
var selectionOf = {
  ["cursorOnlyText" /* CURSOR_ONLY_TEXT */]: {
    ...CursorOnly.selectionOfCol,
    ...SingleLine.selectionOfLn
  },
  ["singleLineText" /* SINGLE_LINE_TEXT */]: {
    ...SingleLine.selectionOfLn,
    ...SingleLine.selectionOfSingleLineChar
  },
  ["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */]: {
    ...SingleLine.selectionOfLn,
    ...MultiLine.selectionOfLcChar
  },
  ["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */]: {
    ...SingleLine.selectionOfLn,
    ...MultiLine.selectionOfLcChar
  },
  ["multiCursorText" /* MULTI_CURSOR_TEXT */]: MultiCursor.selectionOf
};
var contentTextFunctionSymlink = (context, contentTextSate, buffer) => {
  Object.entries(contentTextSate.position).forEach(([pos, sym]) => {
    if (!buffer[sym]) {
      buffer[sym] = MultiLine.multilineFunctionSymLink[sym](context);
    }
    contentTextSate.contentText[pos].after.contentText = String(buffer[sym]);
  });
  return contentTextSate.contentText;
};
var contentTextFunc = (context, contentText) => {
  return contentText.map((decorationOption) => {
    if (typeof decorationOption.after.contentText === "string") {
      return decorationOption;
    }
    const decorationOptionFunc = { ...decorationOption };
    decorationOptionFunc.after = { ...decorationOption.after };
    decorationOptionFunc.after.contentText = String(decorationOption.after.contentText(context));
    return decorationOptionFunc;
  });
};
var cursorOnlySelection = (context) => {
  return [{
    contentText: contentTextFunc(context, selectionContentText["cursorOnlyText" /* CURSOR_ONLY_TEXT */].contentText),
    range: range_default.createActiveRange(context.editor)
  }];
};
var singleLineSelection = (context) => {
  return [{
    contentText: contentTextFunc(context, selectionContentText["singleLineText" /* SINGLE_LINE_TEXT */].contentText),
    range: range_default.createActiveRange(context.editor)
  }];
};
var multilineSelection = (context) => {
  const buffer = {
    [MultiLine.multiLineLcSym]: void 0,
    [MultiLine.multiLineCharSym]: void 0
  };
  const statusList = [{
    contentText: contentTextFunctionSymlink(context, selectionContentText["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */], buffer),
    range: range_default.createAnchorRange(context.editor)
  }, {
    contentText: contentTextFunctionSymlink(context, selectionContentText["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */], buffer),
    range: range_default.createActiveRange(context.editor)
  }];
  return statusList;
};
var multiCursorSelection = (context) => {
  const selectionTextInfo = [];
  const statusLine = [];
  let idx = context.editor.selections.length;
  while (idx--) {
    const lineSet = new Set(statusLine);
    if (lineSet.has(context.editor.selections[idx].end.line)) {
      continue;
    }
    context.idx = idx + 1;
    selectionTextInfo.push({
      contentText: contentTextFunc(context, selectionContentText["multiCursorText" /* MULTI_CURSOR_TEXT */].contentText),
      range: range_default.createStartEndRangeOfSelection(context.editor.selections[idx])
    });
    statusLine.push(context.editor.selections[idx].end.line);
  }
  return selectionTextInfo;
};
var selectionTextInfoSplit = (editor2) => {
  const context = {
    idx: 0,
    editor: editor2,
    indent: indentInfo
  };
  return {
    ["CURSOR_ONLY" /* CURSOR_ONLY */]: () => cursorOnlySelection(context),
    ["SINGLE_LINE" /* SINGLE_LINE */]: () => singleLineSelection(context),
    ["MULTI_LINE" /* MULTI_LINE */]: () => multilineSelection(context),
    ["MULTI_CURSOR" /* MULTI_CURSOR */]: () => multiCursorSelection(context)
  };
};
var selectionInfo = (editor2, type) => {
  return selectionTextInfoSplit(editor2)[type.KEY]();
};
var bindStatusContentTextState = () => {
  return {
    functionOf: selectionOf,
    textOf: selectionContentText,
    infoOf: indentInfo
  };
};

// src/configuration/status/selection.ts
var SelectionDecorationConfig = { ...SELECTION_DECORAITON_CONFIG };
var SelectionDecorationStyle = { ...SELECTION_DECORATION_STYLE };
var convertPositionToDecorationRenderOption = (textPosition) => {
  return textPosition.contentText.map((text, idx) => {
    const option = typeof text === "string" ? SelectionDecorationStyle.placeholderDecorationOption : SelectionDecorationStyle.selectionDecorationOption[textPosition.position[idx]];
    const contentTextRenderOption = setContentTextOnDecorationRenderOption(option, text);
    if (typeof text === "symbol") {
      textPosition.position[idx] = contentTextRenderOption.after.contentText;
    }
    return contentTextRenderOption;
  }).filter((decorationOption) => decorationOption !== void 0);
};
var buildStatusTextState = (textOftarget, textOfSource, leftMargin) => {
  Object.entries(textOfSource).forEach(([key, textPosition], idx) => {
    const contentTextStyled = convertPositionToDecorationRenderOption(textPosition);
    ;
    textOftarget[key] = {
      contentText: contentTextStyled,
      position: textPosition.position
    };
    if (leftMargin && leftMargin !== "0px" || leftMargin !== "0em") {
      if (textOftarget[key].contentText[0]) {
        textOftarget[key].contentText[0].after["margin"] = leftMarginToMarginString(leftMargin);
      }
    }
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
var updateSelectionTextConfig = (configReady) => {
  const bindTo = bindStatusContentTextState();
  const bindToBuffer = {
    functionOf: bindTo.functionOf,
    textOf: {}
  };
  workspaceProxyConfiguration(
    SelectionDecorationConfig,
    configReady.name + "." + CONFIG_SECTION.selectionText,
    SELECTION_CONTENT_TEXT_LIST,
    bindToBuffer,
    regex_collection_default.statusContentText
  );
  buildSelectionTextDecorationRenderOption(SelectionDecorationConfig, SelectionDecorationStyle);
  buildStatusTextState(bindTo.textOf, bindToBuffer.textOf, SelectionDecorationConfig.leftMargin);
  delete bindTo.functionOf;
  delete bindTo.infoOf;
  delete bindTo.textOf;
  delete bindToBuffer.textOf;
  delete bindToBuffer.functionOf;
};

// src/editor/decoration/status/diagnostic.ts
var diagnosticContentText = { ...DIAGNOSTIC_CONTENT_TEXT };
var diagnosticVisibility = { ...DIAGNOSTIC_VISIBILITY_CONFIG };
var Placeholder;
((Placeholder2) => {
  Placeholder2.editorSym = Symbol("editor");
  Placeholder2.workspaceSym = Symbol("workspace");
  Placeholder2.allOkSym = Symbol("allOk");
  Placeholder2.allOkDiagnosticOf = {
    allok: Placeholder2.allOkSym
  };
  Placeholder2.problemDiagnosticOf = {
    editor: Placeholder2.editorSym,
    workspace: Placeholder2.workspaceSym
  };
})(Placeholder || (Placeholder = {}));
var Notation;
((Notation2) => {
  Notation2.diagnosticOf = {
    pre: ({ notation }) => notation.prefix,
    post: ({ notation }) => notation.postfix
  };
})(Notation || (Notation = {}));
var Problem;
((Problem2) => {
  Problem2.warningSourceDiagnosticOf = {
    src: ({ state }) => String(state.warning.source)
  };
  Problem2.warningCountDiagnosticOf = {
    wrn: ({ state }) => String(state.warning.total)
  };
  Problem2.errorSourceDiagnosticOf = {
    src: ({ state }) => String(state.error.source)
  };
  Problem2.errorCountDiagnosticOf = {
    err: ({ state }) => String(state.error.total)
  };
})(Problem || (Problem = {}));
var diagnosticOf = {
  ["problemPlaceholderContentText" /* PLACEHOLDER_PROBLEM_CONTENT_TEXT */]: Placeholder.problemDiagnosticOf,
  ["allOkPlaceholderContentText" /* PLACEHOLDER_ALL_OK_CONTENT_TEXT */]: Placeholder.allOkDiagnosticOf,
  ["okAllContentText" /* OK_ALL_CONTENT_TEXT */]: Notation.diagnosticOf,
  ["okWorkspaceContentText" /* OK_WORKSPACE_CONTENT_TEXT */]: Notation.diagnosticOf,
  ["okEditorContentText" /* OK_EDITOR_CONTENT_TEXT */]: Notation.diagnosticOf,
  ["warningWorkspaceContentText" /* WARNING_WORKSPACE_CONTENT_TEXT */]: {
    ...Notation.diagnosticOf,
    ...Problem.warningSourceDiagnosticOf,
    ...Problem.warningCountDiagnosticOf
  },
  ["warningEditorContentText" /* WARNING_EDITOR_CONTENT_TEXT */]: {
    ...Notation.diagnosticOf,
    ...Problem.warningCountDiagnosticOf
  },
  ["errorWorkspaceContentText" /* ERROR_WORKSPACE_CONTENT_TEXT */]: {
    ...Notation.diagnosticOf,
    ...Problem.errorSourceDiagnosticOf,
    ...Problem.errorCountDiagnosticOf
  },
  ["errorEditorContentText" /* ERROR_EDITOR_CONTENT_TEXT */]: {
    ...Notation.diagnosticOf,
    ...Problem.errorCountDiagnosticOf
  }
};
var diagonosticMultiStyleDecoration = (diagnosticState2, diagnosticContentTextIs) => {
  if (diagnosticContentTextIs) {
    const context = {
      state: diagnosticState2,
      notation: diagnosticContentTextIs.notation
    };
    return diagnosticContentTextIs.contentText.map((decorationOption) => {
      if (typeof decorationOption.after.contentText !== "string") {
        const decorationOptionFunc = { ...decorationOption };
        decorationOptionFunc.after = { ...decorationOption.after };
        decorationOptionFunc.after.contentText = decorationOption.after.contentText(context);
        return decorationOptionFunc;
      }
      return decorationOption;
    });
  }
  return [];
};
var diagnosticKind = ({ state, contentText, keySet }) => {
  return {
    "ok": () => diagonosticMultiStyleDecoration(state, contentText[keySet["okContentText" /* OK_CONTENT_TEXT */]]),
    "warning": () => diagonosticMultiStyleDecoration(state, contentText[keySet["warningContentText" /* WARNING_CONTENT_TEXT */]]),
    "error": () => diagonosticMultiStyleDecoration(state, contentText[keySet["errorContentText" /* ERROR_CONTENT_TEXT */]])
  };
};
var diagnosticCounter = (context) => {
  if (context.state.warning.total + context.state.error.total === 0) {
    return diagnosticKind(context).ok();
  }
  const diagnosticText = [];
  if (context.state.warning.total > 0) {
    diagnosticText.push(...diagnosticKind(context).warning());
  }
  if (context.state.error.total > 0) {
    diagnosticText.push(...diagnosticKind(context).error());
  }
  return diagnosticText;
};
var diagnosticBiomeSplit = (state, contentText) => {
  const context = {
    state,
    contentText,
    keySet: {}
  };
  return {
    "workspace": () => diagnosticCounter({
      ...context,
      keySet: { ...DIAGNOSTIC_WORKSPACE_CONTENT_TEXT_KEYSET }
    }),
    "editor": () => diagnosticCounter({
      ...context,
      keySet: { ...DIAGNOSTIC_EDITOR_CONTENT_TEXT_KEYSET }
    }),
    "all": () => []
  };
};
var diagnosticLayoutAllOkOverride = (state, textState) => {
  return textState.layout.allOkPlaceholderContentText.contentText.map((decoration) => {
    if (decoration.after.contentText === Placeholder.allOkSym) {
      return diagonosticMultiStyleDecoration(state, textState.all.okAllContentText);
    }
    const overrideColor = textState.layout.allOkPlaceholderContentText?.override;
    decoration.after.color = overrideColor ? overrideColor[1 /* OK */].color : decoration.after.color;
    return decoration;
  }).flat();
};
var diagnosticLayoutDivided = (state, textState) => {
  return textState.layout.problemPlaceholderContentText.contentText.map((decoration) => {
    if (decoration.after.contentText === Placeholder.workspaceSym) {
      return diagnosticBiomeSplit(state.workspace, textState.workspace).workspace();
    }
    if (decoration.after.contentText === Placeholder.editorSym) {
      return diagnosticBiomeSplit(state.editor, textState.editor).editor();
    }
    const overrideColor = textState.layout.problemPlaceholderContentText?.override;
    decoration.after.color = overrideColor ? overrideColor[state.severity].color : decoration.after.color;
    return decoration;
  }).flat();
};
var buildDiagonosticDecorationLayout = (context) => {
  const { state, textState } = context;
  const diagnosticLayout = state.severity === 1 /* OK */ ? diagnosticLayoutAllOkOverride : diagnosticLayoutDivided;
  return diagnosticLayout(state, textState);
};
var diagnosticInfo = (editor2, diagnosticState2) => {
  const context = {
    state: diagnosticState2,
    textState: diagnosticContentText,
    diagnosticVisibility
  };
  return [{
    contentText: buildDiagonosticDecorationLayout(context),
    range: range_default.createCursorRange(editor2)
  }];
};
var bindDiagnosticContentTextState = () => {
  return {
    functionOf: diagnosticOf,
    textOf: diagnosticContentText,
    configOf: diagnosticVisibility
  };
};

// src/configuration/status/diagonostic.ts
var diagnosticConfig = { ...DIAGNOSTIC_CONFIG };
var diagnosticDecorationStyle = { ...DIAGNOSTIC_DECORATION_STYLE };
var positionKeyList = ["pre", "post"];
var positionKeyToPlaceholderName = { pre: "prefix", post: "postfix" };
var applyLeftMargin = (textOf, visibility, leftMargin) => {
  if (!leftMargin || leftMargin === "0px" || leftMargin === "0em") {
    return;
  }
  ["allOkPlaceholderContentText", "problemPlaceholderContentText"].forEach((placeholderKind) => {
    if (typeof textOf.layout[placeholderKind].contentText[0].contentText === "symbol") {
      const marginDecoration = { ...textOf.layout[placeholderKind].contentText[0].contentText };
      marginDecoration.after = { ...textOf.layout[placeholderKind].contentText[0].contentText.after };
      marginDecoration.contentText = "";
      marginDecoration.margin = leftMarginToMarginString(leftMargin);
      textOf.layout[placeholderKind].contentText[0].unshift(marginDecoration);
    } else {
      textOf.layout[placeholderKind].contentText[0].after["margin"] = leftMarginToMarginString(leftMargin);
    }
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
var buildDiagnosticTextState = (textOftarget, textOfSource, style, leftMargin = "") => {
  const convertPositionWrapper = (context, target, propertyName, contentTextName) => {
    if (Object.hasOwn(target[propertyName], contentTextName)) {
      if (target[propertyName][contentTextName].notation) {
        context.notation = target[propertyName][contentTextName].notation;
      }
      target[propertyName][contentTextName].contentText = convertPositionDecorationRenderOption(context);
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
      convertPositionWrapper(context, textOftarget, biome, contentTextName);
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
        color[biome] = { color: hexToRgbaStringLiteral(config[override.styleName].color, config[override.styleName].colorOpacity, "#333333", 0.7) };
      });
    }
  });
  return {
    ["problemPlaceholderContentText" /* PLACEHOLDER_PROBLEM_CONTENT_TEXT */]: {
      override: Object.keys(problemOverrideColor).length > 0 ? problemOverrideColor : void 0
    },
    ["allOkPlaceholderContentText" /* PLACEHOLDER_ALL_OK_CONTENT_TEXT */]: {
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
      ["problemPlaceholderContentText" /* PLACEHOLDER_PROBLEM_CONTENT_TEXT */]: {},
      ["allOkPlaceholderContentText" /* PLACEHOLDER_ALL_OK_CONTENT_TEXT */]: {}
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
  console.log(result);
  return {
    ...result,
    layout: {
      ["problemPlaceholderContentText" /* PLACEHOLDER_PROBLEM_CONTENT_TEXT */]: {},
      ["allOkPlaceholderContentText" /* PLACEHOLDER_ALL_OK_CONTENT_TEXT */]: {},
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
  const bindTo = bindDiagnosticContentTextState();
  let bindToBuffer = {
    functionOf: bindTo.functionOf,
    textOf: {}
  };
  if (configuratioChange) {
    clearOverrideState(bindTo);
  }
  workspaceProxyConfiguration(diagnosticConfig, configReady.name + "." + CONFIG_SECTION.diagnosticText, DIAGNOSTIC_CONTENT_TEXT_LIST, bindToBuffer, regex_collection_default.diagnosticText);
  const diagnosticBiome = diagnosticVisibilityBiome(diagnosticConfig.visibility);
  const decorationStyleList = decorationStyleFromBiome(diagnosticBiome.workspace | diagnosticBiome.editor);
  Object.assign(bindTo.textOf, buildDiagnosticStyle(diagnosticConfig, diagnosticDecorationStyle, decorationStyleList, diagnosticConfig.visibility, diagnosticBiome));
  Object.assign(bindTo.configOf, diagnosticConfig.visibility);
  buildDiagnosticTextState(bindTo.textOf, bindToBuffer.textOf, diagnosticDecorationStyle, diagnosticConfig.leftMargin);
  applyLeftMargin(bindTo.textOf, diagnosticConfig.visibility, diagnosticConfig.leftMargin);
  delete bindTo.functionOf;
  delete bindTo.textOf;
  delete bindTo.configOf;
  delete bindToBuffer.textof;
  delete bindToBuffer.functionOf;
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
      error_default.register(configSectionName + "." + configName, `Failed to get config value for ${configSectionName + "." + configName}:`);
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
var sectionKeyList = [
  "general" /* GENERAL */,
  "cursorOnly" /* CURSOR_ONLY */,
  "singleLine" /* SINGLE_LINE */,
  "multiLine" /* MULTI_LINE */,
  "multiCursor" /* MULTI_CURSOR */,
  "selectionText" /* SELECTION_TEXT */,
  "diagnosticText" /* DIAGNOSTIC_TEXT */
];
var updateConfigurationFromSection = (config, section) => {
  const configUpdateList = {
    ["general" /* GENERAL */]: () => updateGeneralConfig(config),
    ["cursorOnly" /* CURSOR_ONLY */]: () => updateHighlightStyleConfiguration(config, "CURSOR_ONLY" /* CURSOR_ONLY */),
    ["singleLine" /* SINGLE_LINE */]: () => updateHighlightStyleConfiguration(config, "SINGLE_LINE" /* SINGLE_LINE */),
    ["multiLine" /* MULTI_LINE */]: () => updateHighlightStyleConfiguration(config, "MULTI_LINE" /* MULTI_LINE */),
    ["multiCursor" /* MULTI_CURSOR */]: () => updateHighlightStyleConfiguration(config, "MULTI_CURSOR" /* MULTI_CURSOR */),
    ["selectionText" /* SELECTION_TEXT */]: () => updateSelectionTextConfig(config),
    ["diagnosticText" /* DIAGNOSTIC_TEXT */]: () => updateDiagnosticTextConfig(config, true)
  };
  if (Object.hasOwn(configUpdateList, section)) {
    configUpdateList[section]();
  }
};
var update = {
  sectionChanged: updateConfigurationFromSection,
  sectionList: sectionKeyList
};

// src/editor/decoration/decoration.ts
var vscode8 = __toESM(require("vscode"));

// src/editor/decoration/highlight/highlight.ts
var highlightStyleList = { ...HIGHLIGHT_STYLE_LIST };
var borderPositionInfo = { ...HIGHLIGHT_BORDER_POSITION_INFO };
var cursorOnlyHighlightRange = (context) => {
  const { editor: editor2, borderConfig, textEditorHighlight } = context;
  if (borderConfig.isWholeLine) {
    return [{
      decoration: textEditorHighlight[0],
      range: [range_default.createRangeSPEP(editor2.selection.active, editor2.selection.active)]
    }];
  }
  if (borderConfig.beforeCursor) {
    return [{
      decoration: textEditorHighlight[0],
      range: [range_default.createRangeNNNN(editor2.selection.active.line, 0, editor2.selection.active.line, editor2.selection.active.character)]
    }];
  }
  if (borderConfig.afterCursor) {
    return [
      {
        decoration: textEditorHighlight[0],
        range: [range_default.createRangeNNEP(
          editor2.selection.active.line,
          editor2.selection.active.character,
          editor2.document.lineAt(editor2.selection.active.line).range.end
        )]
      },
      {
        decoration: textEditorHighlight[1],
        range: [range_default.createRangeNNNN(editor2.selection.active.line, 0, editor2.selection.active.line, editor2.selection.active.character)]
      }
    ];
  }
  return [];
};
var singelLineHighlightRange = ({ editor: editor2, textEditorHighlight }) => {
  return [{
    decoration: textEditorHighlight[0],
    range: [range_default.createRangeSPEP(editor2.selection.start, editor2.selection.end)]
  }];
};
var multiLineHighlightRange = ({ editor: editor2, borderConfig, textEditorHighlight }) => {
  if (borderConfig.borderPosition === "left") {
    return [{
      decoration: textEditorHighlight[2],
      range: [range_default.createRangeNNNN(editor2.selection.start.line, editor2.selection.start.character, editor2.selection.end.line, editor2.selection.end.character)]
    }];
  } else {
    const highlightRange = [];
    highlightRange.push(
      {
        decoration: textEditorHighlight[0],
        range: [range_default.createRangeSPEP(editor2.selection.start, editor2.selection.start)]
      },
      {
        decoration: textEditorHighlight[1],
        range: [range_default.createRangeSPEP(editor2.selection.end, editor2.selection.end)]
      }
    );
    if (Math.abs(editor2.selection.start.line - editor2.selection.end.line) > 1) {
      highlightRange.push({
        decoration: textEditorHighlight[2],
        range: [range_default.createRangeNNNN(editor2.selection.start.line + 1, editor2.selection.start.character, editor2.selection.end.line - 1, editor2.selection.end.character)]
      });
    } else {
      applyDecoration(editor2, textEditorHighlight[2], []);
    }
    return highlightRange;
  }
};
var multiCursorHighlightRange = ({ editor: editor2, textEditorHighlight }) => {
  return [
    {
      decoration: textEditorHighlight[0],
      range: editor2.selections.reduce((acc, selection) => {
        acc.push(range_default.createRangeSPEP(selection.start, selection.active));
        return acc;
      }, [])
    },
    {
      decoration: textEditorHighlight[1],
      range: editor2.selections.reduce((acc, selection) => {
        acc.push(range_default.createRangeNNNN(selection.active.line, 0, selection.active.line, selection.active.character));
        return acc;
      }, [])
    }
  ];
};
var unsetRangeOfHighlightStyle = (editor2) => {
  for (const [key, highlight] of Object.entries(highlightStyleList)) {
    resetDecorationRange(editor2, highlight);
  }
};
var coordinatorSplit = {
  ["CURSOR_ONLY" /* CURSOR_ONLY */]: (context) => cursorOnlyHighlightRange(context),
  ["SINGLE_LINE" /* SINGLE_LINE */]: (context) => singelLineHighlightRange(context),
  ["MULTI_LINE" /* MULTI_LINE */]: (context) => multiLineHighlightRange(context),
  ["MULTI_CURSOR" /* MULTI_CURSOR */]: (context) => multiCursorHighlightRange(context)
};
var hightlightCoordinator = ({ editor: editor2, renderGroup }) => {
  const textEditorHighlight = highlightStyleList[renderGroup.type.KEY];
  const borderConfig = borderPositionInfo[renderGroup.type.KEY];
  return coordinatorSplit[renderGroup.type.KEY]({
    editor: editor2,
    borderConfig,
    textEditorHighlight
  });
};
var bindHighlightStyleState = () => {
  return {
    styleOf: highlightStyleList,
    infoOf: borderPositionInfo
  };
};

// src/diagnostic/diagnostic.ts
var vscode7 = __toESM(require("vscode"));
var diagnosticState = { ...DIAGNOSTIC_STATE };
var diagnosticSource = {};
var resetEditorDiagnosticStatistics = () => {
  diagnosticState.editor.warning.total = 0;
  diagnosticState.editor.error.total = 0;
};
var resetWorkspaceDiagnosticStatistics = () => {
  diagnosticState.workspace.warning.source = 0;
  diagnosticState.workspace.warning.total = 0;
  diagnosticState.workspace.error.source = 0;
  diagnosticState.workspace.error.total = 0;
};
var parseDiagnostic = (diagnosticState2, severity, fsPath, activeEditorfsPath = void 0) => {
  Object.keys(severity).forEach((severityType) => {
    if (severity[severityType].length > 0) {
      diagnosticState2.workspace[severityType].source += 1;
      diagnosticState2.workspace[severityType].total += severity[severityType].length;
    }
    if (fsPath === activeEditorfsPath) {
      diagnosticState2.editor[severityType].total = 0;
      diagnosticState2.editor[severityType].total = severity[severityType].length;
    }
  });
};
var buildDiagnostic = (source2, diagnosticList, uri) => {
  for (const diagnostic of diagnosticList) {
    if (diagnostic.severity <= vscode7.DiagnosticSeverity.Warning) {
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
  const editorSeverity = state.editor.warning.total <= state.editor.error.total ? 4 /* ERR */ : 2 /* WARN */;
  const workspaceSeverity = state.workspace.warning.total <= state.workspace.error.total ? 4 /* ERR */ : 2 /* WARN */;
  return Math.max(editorSeverity, workspaceSeverity);
};
var updateDiagnostic = (activeEditorUri = void 0) => {
  for (let fs in diagnosticSource) {
    delete diagnosticSource[fs];
  }
  resetWorkspaceDiagnosticStatistics();
  const diagnostics = vscode7.languages.getDiagnostics();
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

// src/editor/decoration/decoration.ts
var decorationState = { ...DECORATION_STATE };
var applyDecoration = (editor2, decoraiton, range) => {
  editor2.setDecorations(decoraiton, range);
};
var createEditorDecorationType = (styleAppliedConfig) => {
  return vscode8.window.createTextEditorDecorationType(styleAppliedConfig);
};
var disposeDecoration = (highlightStyleList2 = []) => highlightStyleList2.forEach((decorationType) => {
  decorationType.dispose();
});
var resetDecorationRange = (editor2, decorationType) => {
  decorationType?.forEach((decoration) => applyDecoration(editor2, decoration, []));
};
var unsetAndDisposeDecoration = (editor2, decorationType) => {
  decorationType?.forEach((decoration) => {
    applyDecoration(editor2, decoration, []);
    decoration.dispose();
  });
};
var resetAllDecoration = (decorationState2) => {
  vscode8.window.visibleTextEditors.forEach((editor2) => {
    if (decorationState2.appliedHighlight.ofDecorationType !== void 0) {
      decorationState2.appliedHighlight.ofDecorationType.forEach((decoration) => {
        applyDecoration(editor2, decoration, []);
      });
    }
  });
  if (decorationState2.selectionText) {
    decorationState2.selectionText.forEach((decorationType) => decorationType.dispose());
  }
  if (decorationState2.diagnosticText) {
    decorationState2.diagnosticText.forEach((decorationType) => decorationType.dispose());
  }
  ;
};
var isDecorationChanged = (editor2, decorationState2, selectionKind) => {
  if (decorationState2.appliedHighlight.applied && decorationState2.appliedHighlight.applied.MASK !== selectionKind.MASK) {
    unsetRangeOfHighlightStyle(editor2);
    decorationState2.appliedHighlight.applied = selectionKind;
  }
  decorationState2.appliedHighlight.applied = selectionKind;
};
var renderStatusInfo = async ({ editor: editor2, renderGroup, decorationState: decorationState2 }) => {
  if (renderGroup.selection) {
    decorationState2.statusInfo.selectionText = await renderGroup.selection(editor2, renderGroup.type);
  }
  if (renderGroup.diagnostic) {
    decorationState2.statusInfo.diagnosticText = await renderGroup.diagnostic(editor2, updateDiagnostic());
  }
  for (const [statusGroup, statusInfo] of Object.entries(decorationState2.statusInfo)) {
    unsetAndDisposeDecoration(editor2, decorationState2[statusGroup]);
    if (statusInfo) {
      decorationState2[statusGroup] = [];
      let length = statusInfo.length;
      while (length--) {
        const status = statusInfo[length];
        decorationState2[statusGroup].push(...status.contentText.map((decorationOption) => {
          const decoration = createEditorDecorationType(decorationOption);
          applyDecoration(editor2, decoration, [status.range]);
          return decoration;
        }));
      }
    }
  }
};
var renderDecorationOnEditor = (context) => {
  const { editor: editor2, renderGroup, decorationState: decorationState2 } = context;
  const highlightStyleList2 = bindHighlightStyleState().styleOf;
  const textEditorDecoration = highlightStyleList2[renderGroup.type.KEY];
  if (textEditorDecoration) {
    decorationState2.appliedHighlight.ofDecorationType = textEditorDecoration;
    const highlight = hightlightCoordinator(context);
    if (!highlight) {
      return;
    }
    highlight.forEach(({ decoration, range }) => {
      applyDecoration(editor2, decoration, range);
    });
    renderStatusInfo(context);
  }
};
var bindEditorDecoration = () => {
  return {
    stateOf: decorationState
  };
};

// src/configuration/highlight/highlight.ts
var checkConfigKeyAndCast = (key) => {
  return key;
};
var getConfigSet = (configReady, decorationKey) => {
  const configSectionName = DECORATION_STYLE_PREFIX[decorationKey];
  const defaultConfigDefinition = NO_CONFIGURATION_DEOCORATION_DEFAULT[decorationKey];
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
    }, []).reduce((textEditorDecoration, styleAppliedConfig) => {
      textEditorDecoration.push(createEditorDecorationType(styleAppliedConfig));
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
    if (selectionType === "MULTI_LINE" && position[0] === "left") {
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
  console.log("updateGeneralConfig");
  for (const key in configReady.generalConfigInfo) {
    if (configReady.generalConfigInfo[key]) {
      const sectionLinker = configReady.generalConfigInfo[key].split(".");
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
    disposeDecoration(bindTo.styleOf[selectionType]);
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
  for (const key of Object.keys(HIGHLIGHT_STYLE_LIST)) {
    const selectionType = key;
    updateHighlightStyleConfiguration(configReady, selectionType);
  }
  return true;
};

// src/configuration/collection/patch.ts
var vscode9 = __toESM(require("vscode"));
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
  return extensionConfig.update(newKey, value, vscode9.ConfigurationTarget.Global);
};
var removeUserSetting = (extensionConfig, key) => {
  return extensionConfig.update(key, void 0, vscode9.ConfigurationTarget.Global);
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

// src/configuration/load.ts
var configInfo = { ...CONFIG_INFO };
var loadConfiguration = (context) => {
  const name = context.extension.packageJSON.name;
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
      updateSelectionTextConfig(configReady);
    }
    if (configReady.generalConfigInfo.diagnosticTextEnabled) {
      updateDiagnosticTextConfig(configReady);
    }
    return {
      config: configReady,
      decoration: decorationState2
    };
  }
  return;
};

// src/event/window.ts
var vscode10 = __toESM(require("vscode"));

// src/editor/editor.ts
var renderGroupSet = { ...RENDER_GROUP_SET };
var updateIndentOption = (editor2) => {
  const bindTo = bindStatusContentTextState();
  bindTo.infoOf.size = Number(editor2.options.tabSize ?? editor2.options.indentSize ?? 4);
  bindTo.infoOf.type = editor2.options.insertSpaces ? "\n" : "	";
  bindTo.infoOf.regex = editor2.options.insertSpaces ? regex_collection_default.indentAndEOLRegex(bindTo.infoOf.size) : regex_collection_default.tagtAndEOLRegex;
};
var prepareRenderGroup = (config) => {
  const selection = config.generalConfigInfo.selectionTextEnabled ? selectionInfo : void 0;
  const diagnostic = config.generalConfigInfo.diagnosticTextEnabled ? diagnosticInfo : void 0;
  const bindDiagnostic = bindDiagnosticContentTextState();
  const diagonosticAvaliabity = {
    ["CURSOR_ONLY" /* CURSOR_ONLY */]: bindDiagnostic.configOf.displayWhenCursorOnly,
    ["SINGLE_LINE" /* SINGLE_LINE */]: bindDiagnostic.configOf.displayWhenSingleLine,
    ["MULTI_LINE" /* MULTI_LINE */]: bindDiagnostic.configOf.displayWhenMultiLine,
    ["MULTI_CURSOR" /* MULTI_CURSOR */]: bindDiagnostic.configOf.displayWhenMultiCursor
  };
  Object.keys(renderGroupSet).forEach((selectionKey) => {
    if (SELECTION_KIND[selectionKey]) {
      renderGroupSet[selectionKey] = {
        type: SELECTION_KIND[selectionKey],
        selection,
        diagnostic: diagonosticAvaliabity[selectionKey] ? diagnostic : void 0
      };
    }
  });
  return renderGroupSet["CURSOR_ONLY" /* CURSOR_ONLY */];
};
var renderGroupIs = (editor2) => {
  if (editor2.selections.length === 1) {
    if (editor2.selections[0].isEmpty) {
      return renderGroupSet["CURSOR_ONLY" /* CURSOR_ONLY */];
    }
    if (editor2.selections[0].isSingleLine) {
      return renderGroupSet["SINGLE_LINE" /* SINGLE_LINE */];
    } else {
      return renderGroupSet["MULTI_LINE" /* MULTI_LINE */];
    }
  }
  if (editor2.selections.length > 1) {
    return renderGroupSet["MULTI_CURSOR" /* MULTI_CURSOR */];
    ;
  }
};

// src/event/window.ts
var windowStateChanged = ({ decorationState: decorationState2, renderGroup }) => {
  return vscode10.window.onDidChangeWindowState((event) => {
    if (event.focused) {
      if (vscode10.window.activeTextEditor) {
        renderDecorationOnEditor({
          editor: vscode10.window.activeTextEditor,
          decorationState: decorationState2,
          renderGroup
        });
      }
    } else {
      resetAllDecoration(decorationState2);
    }
    if (!event.focused && !event.active) {
      console.log("idling");
    }
  });
};
var activeEditorChanged = ({ configInfo: configInfo2, decorationState: decorationState2, renderGroup }) => {
  return vscode10.window.onDidChangeActiveTextEditor((editor2) => {
    if (editor2) {
      if (configInfo2.configError.length > 0) {
      }
      resetAllDecoration(decorationState2);
      if (configInfo2.generalConfigInfo.diagnosticTextEnabled) {
        resetEditorDiagnosticStatistics();
        updateDiagnostic();
      }
      updateIndentOption(editor2);
      renderDecorationOnEditor({
        editor: editor2,
        decorationState: decorationState2,
        renderGroup
      });
      error_default.printError();
    }
  });
};
var editorOptionChanged = (context) => {
  return vscode10.window.onDidChangeTextEditorOptions((event) => {
    if (event.textEditor) {
      updateIndentOption(event.textEditor);
    }
  });
};
var selectionChanged = ({ decorationState: decorationState2 }) => {
  return vscode10.window.onDidChangeTextEditorSelection((event) => {
    if (event.selections) {
      const renderGroup = renderGroupIs(event.textEditor);
      if (!renderGroup) {
        return;
      }
      isDecorationChanged(event.textEditor, decorationState2, renderGroup.type);
      renderDecorationOnEditor({
        editor: event.textEditor,
        decorationState: decorationState2,
        renderGroup
      });
    }
  });
};

// src/event/workspace.ts
var vscode11 = __toESM(require("vscode"));
var configChanged = ({ configInfo: configInfo2 }) => {
  return vscode11.workspace.onDidChangeConfiguration((event) => {
    if (event) {
      const sectionName = update.sectionList.find((section) => {
        return event.affectsConfiguration(configInfo2.name + "." + section);
      });
      if (sectionName) {
        console.log(configInfo2.name + "." + sectionName + "has been changed");
        update.sectionChanged(configInfo2, sectionName);
      }
      if (error_default.check()) {
        error_default.notify(2e3);
      }
    }
  });
};

// src/event/language.ts
var vscode12 = __toESM(require("vscode"));
var diagnosticChanged = (context) => {
  return vscode12.languages.onDidChangeDiagnostics(async (event) => {
    const editor2 = vscode12.window.activeTextEditor;
    if (editor2 && event) {
      context.editor = editor2;
      await updateDiagnostic(editor2.document.uri);
      await renderStatusInfo(context);
    }
  });
};

// src/initialize.ts
var initialize = async (extensionContext) => {
  try {
    await extensionContext.extension.activate();
    const loadConfig = loadConfiguration(extensionContext);
    if (!loadConfig) {
      console.error("Failed to initialize config.");
      return;
    }
    const configInfo2 = loadConfig.config;
    const decorationState2 = loadConfig.decoration;
    const activeEditor = vscode13.window.activeTextEditor;
    if (configInfo2.configError.length > 0) {
    }
    const renderGroup = prepareRenderGroup(configInfo2);
    const eventContext = {
      editor: activeEditor,
      configInfo: configInfo2,
      decorationState: decorationState2,
      renderGroup
    };
    if (activeEditor) {
      renderDecorationOnEditor(eventContext);
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
    vscode13.window.showErrorMessage("Extension initialization failed!", err);
  }
};

// src/extension.ts
function activate(context) {
  initialize(context).then((event) => {
    if (event) {
      context.subscriptions.push(...event);
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
