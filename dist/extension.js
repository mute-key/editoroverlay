"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all2) => {
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: true });
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

// src/constant/symbol.ts
var reset = Symbol("RESET" /* RESET */);
var cursorOnly = Symbol("CURSOR_ONLY" /* CURSOR_ONLY */);
var singleLine = Symbol("SINGLE_LINE" /* SINGLE_LINE */);
var multiLine = Symbol("MULTI_LINE" /* MULTI_LINE */);
var multiCursor = Symbol("MULTI_CURSOR" /* MULTI_CURSOR */);
var cursorOnlyText = Symbol("cursorOnlyText" /* CURSOR_ONLY_TEXT */);
var singleLineText = Symbol("singleLineText" /* SINGLE_LINE_TEXT */);
var multiLineCursorText = Symbol("multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */);
var multiLineAnchorText = Symbol("multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */);
var multiCursorText = Symbol("multiCursorText" /* MULTI_CURSOR_TEXT */);
var multiLineLineCountSym = Symbol("multiLineLcSym");
var multiLineChararcterSym = Symbol("multiLineCharSym");
var okContentText = Symbol("okContentText" /* OK_CONTENT_TEXT */);
var warningContentText = Symbol("warningContentText" /* WARNING_CONTENT_TEXT */);
var errorContentText = Symbol("errorContentText" /* ERROR_CONTENT_TEXT */);
var all = Symbol("all");
var okAllContentText = Symbol("all.okAllContentText");
var layout = Symbol("layout");
var allOkPlaceholderContentText = Symbol("layout.allOkPlaceholderContentText");
var problemPlaceholderContentText = Symbol("layout.problemPlaceholderContentText");
var editor = Symbol("editor");
var okEditorContentText = Symbol("editor.okEditorContentText");
var errorEditorContentText = Symbol("editor.errorEditorContentText");
var warningEditorContentText = Symbol("editor.warningEditorContentText");
var workspace = Symbol("workspace");
var okWorkspaceContentText = Symbol("workspace.okWorkspaceContentText");
var warningWorkspaceContentText = Symbol("workspace.warningWorkspaceContentText");
var errorWorkspaceContentText = Symbol("workspace.errorWorkspaceContentText");

// src/constant/object.ts
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
  diagnostic: void 0,
  __proto__: null
};
var RENDER_GROUP_SET = {
  [cursorOnly]: RENDER_GROUP_SET_PROPERTY,
  [singleLine]: RENDER_GROUP_SET_PROPERTY,
  [multiLine]: RENDER_GROUP_SET_PROPERTY,
  [multiCursor]: RENDER_GROUP_SET_PROPERTY,
  __proto__: null
};
var DECORATION_STATE = {
  appliedHighlight: {
    applied: void 0,
    ofDecorationType: void 0,
    __proto__: null
  },
  statusText: [],
  // diagnosticText: [],
  statusInfo: []
};
var HIGHLIGHT_STYLE_SYMBOL_LIST = [
  cursorOnly,
  singleLine,
  multiLine,
  multiCursor
];
var HIGHLIGHT_STYLE_LIST = {
  [cursorOnly]: void 0,
  [singleLine]: void 0,
  [multiLine]: void 0,
  [multiCursor]: void 0
};
var HIGHLIGHT_BORDER_POSITION_INFO = {
  [cursorOnly]: void 0,
  [singleLine]: void 0,
  [multiLine]: void 0,
  [multiCursor]: void 0
};
var DECORATION_STYLE_PREFIX = {
  [cursorOnly]: "cursorOnly",
  [singleLine]: "singleLine",
  [multiLine]: "multiLine",
  [multiCursor]: "multiCursor"
};
var DECORATION_OPTION_CONFIG = {
  isWholeLine: void 0,
  rangeBehavior: void 0,
  after: {},
  __proto__: null
};
var DECORATION_OPTION_AFTER_CONFIG = {
  contentText: void 0,
  color: void 0,
  backgroundColor: void 0,
  fontWeight: void 0,
  fontStyle: void 0,
  textDecoration: void 0,
  margin: void 0,
  __proto__: null
};
var DIAGNOSTIC_EDITOR_CONTENT_TEXT_KEYSET = {
  [okContentText]: okEditorContentText,
  [warningContentText]: errorEditorContentText,
  [errorContentText]: warningEditorContentText
};
var DIAGNOSTIC_WORKSPACE_CONTENT_TEXT_KEYSET = {
  [okContentText]: okWorkspaceContentText,
  [warningContentText]: warningWorkspaceContentText,
  [errorContentText]: errorWorkspaceContentText
};
var DIAGNOSTIC_EDITOR_PLACEHOLDER_LINKER = {
  ["okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */]: okEditorContentText,
  ["warningNotationTextStyle" /* WARNING_NOTATION_TEXT_STYLE */]: errorEditorContentText,
  ["errorNotationTextStyle" /* ERROR_NOTATION_TEXT_STYLE */]: warningEditorContentText
};
var DIAGNOSTIC_WORKSPACE_PLACEHOLDER_LINKER = {
  ["okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */]: okWorkspaceContentText,
  ["warningNotationTextStyle" /* WARNING_NOTATION_TEXT_STYLE */]: warningWorkspaceContentText,
  ["errorNotationTextStyle" /* ERROR_NOTATION_TEXT_STYLE */]: errorWorkspaceContentText
};
var DIAGNOSTIC_ALL_PLACEHOLDER_LINKER = {
  ["okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */]: okAllContentText
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
var DIAGNOSTIC_CONTENT_TEXT_NAME_TO_SYM = {
  problemPlaceholderContentText,
  allOkPlaceholderContentText,
  okWorkspaceContentText,
  okEditorContentText,
  okAllContentText,
  warningWorkspaceContentText,
  warningEditorContentText,
  errorWorkspaceContentText,
  errorEditorContentText
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
    ["okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */]: void 0,
    ["warningTextStyle" /* WARNINGTEXT_STYLE */]: void 0,
    ["warningNotationTextStyle" /* WARNING_NOTATION_TEXT_STYLE */]: void 0,
    ["errorTextStyle" /* ERROR_TEXT_STYLE */]: void 0,
    ["errorNotationTextStyle" /* ERROR_NOTATION_TEXT_STYLE */]: void 0
  }
};
var DIAGNOSTIC_SEVERITY_TO_KEY = {
  [vscode.DiagnosticSeverity.Warning]: "warning" /* WARNING */,
  [vscode.DiagnosticSeverity.Error]: "error" /* ERROR */
};
var SELECTION_CONTENT_TEXT = {
  [cursorOnlyText]: void 0,
  [singleLineText]: void 0,
  [multiLineCursorText]: void 0,
  [multiLineAnchorText]: void 0,
  [multiCursorText]: void 0
};
var SELECTION_CONTENT_TEXT_SYMLINK = {
  ["cursorOnlyText" /* CURSOR_ONLY_TEXT */]: cursorOnlyText,
  ["singleLineText" /* SINGLE_LINE_TEXT */]: singleLineText,
  ["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */]: multiLineCursorText,
  ["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */]: multiLineAnchorText,
  ["multiCursorText" /* MULTI_CURSOR_TEXT */]: multiCursorText
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
  [cursorOnly]: SINGLE_BORDER_SELECTION,
  [singleLine]: SINGLE_BORDER_SELECTION,
  [multiLine]: MULTILINE_BORDER_SELECTION,
  [multiCursor]: SINGLE_BORDER_SELECTION
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
  [cursorOnly]: {
    ["isWholeLine" /* IS_WHOLE_LINE */]: true,
    ["borderWidth" /* BORDER_WIDTH */]: "2px",
    ["borderStyle" /* BORDER_STYLE */]: "dotted",
    ["borderColor" /* BORDER_COLOR */]: "#ff0000",
    ["borderPosition" /* BORDER_POSITION */]: "bottom",
    ["backgroundColor" /* BACKGROUND_COLOR */]: "#ff0000"
  },
  [singleLine]: {
    ["isWholeLine" /* IS_WHOLE_LINE */]: false,
    ["borderWidth" /* BORDER_WIDTH */]: "2px",
    ["borderStyle" /* BORDER_STYLE */]: "dotted",
    ["borderColor" /* BORDER_COLOR */]: "#ff0000",
    ["borderPosition" /* BORDER_POSITION */]: "bottom",
    ["backgroundColor" /* BACKGROUND_COLOR */]: "#ff0000"
  },
  [multiLine]: {
    ["isWholeLine" /* IS_WHOLE_LINE */]: true,
    ["borderWidth" /* BORDER_WIDTH */]: "2px",
    ["borderStyle" /* BORDER_STYLE */]: "dotted",
    ["borderColor" /* BORDER_COLOR */]: "#ff0000",
    ["borderPosition" /* BORDER_POSITION */]: "bottom",
    ["backgroundColor" /* BACKGROUND_COLOR */]: "#ff0000"
  },
  [multiCursor]: {
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
    vscode2.window.showErrorMessage(
      "Please fix invalid values in configuration.",
      ...["Fix Configuration", "Ignore"]
    ).then(this.userSelect);
  };
  static userSelect = (selected) => {
    if (selected === "Fix Configuration") {
      vscode2.commands.executeCommand("workbench.action.openSettings", this.configurationSectionList().join(" "));
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

// src/util/regex.collection.ts
var prefix = /(\${pre})/s;
var postfix = /(\${post})/s;
var source = /(\${src})/s;
var warning = /(\${wrn})/s;
var error = /(\${err})/s;
var editor2 = /(\${editor})/s;
var workspace2 = /(\${workspace})/s;
var allok = /(\${allok})/s;
var okRegex = {
  allok
};
var problemRegex = {
  editor: editor2,
  workspace: workspace2
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

// src/editor/decoration/decoration.ts
var vscode7 = __toESM(require("vscode"));

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
var createCursorRange = (editor3, lineDelta = 0) => new vscode6.Range(
  new vscode6.Position(editor3.selection.end.line + lineDelta, editor3.selection.end.character),
  new vscode6.Position(editor3.selection.end.line + lineDelta, editor3.selection.end.character)
);
var createActiveRange = (editor3) => createRangeSPEP(editor3.selection.active, editor3.selection.active);
var createAnchorRange = (editor3) => createRangeSPEP(editor3.selection.anchor, editor3.selection.anchor);
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

// src/editor/decoration/highlight/highlight.ts
var highlightStyleList = {
  ...HIGHLIGHT_STYLE_LIST,
  __proto__: null
};
var borderPositionInfo = {
  ...HIGHLIGHT_BORDER_POSITION_INFO,
  __proto__: null
};
var cursorOnlyHighlightRange = ({ editor: editor3, borderConfigSymlink, textEditorHighlight }) => {
  const borderConfig = borderPositionInfo[borderConfigSymlink];
  if (borderConfig.isWholeLine) {
    return [{
      decoration: textEditorHighlight[0],
      range: [range_default.createRangeSPEP(editor3.selection.active, editor3.selection.active)],
      __proto__: null
    }];
  }
  if (borderConfig.beforeCursor) {
    return [{
      decoration: textEditorHighlight[0],
      range: [range_default.createRangeNNNN(editor3.selection.active.line, 0, editor3.selection.active.line, editor3.selection.active.character)],
      __proto__: null
    }];
  }
  if (borderConfig.afterCursor) {
    return [
      {
        decoration: textEditorHighlight[0],
        range: [range_default.createRangeNNEP(editor3.selection.active.line, editor3.selection.active.character, editor3.document.lineAt(editor3.selection.active.line).range.end)],
        __proto__: null
      },
      {
        decoration: textEditorHighlight[1],
        range: [range_default.createRangeNNNN(editor3.selection.active.line, 0, editor3.selection.active.line, editor3.selection.active.character)],
        __proto__: null
      }
    ];
  }
  return [];
};
var singelLineHighlightRange = ({ editor: editor3, textEditorHighlight }) => {
  return [{
    decoration: textEditorHighlight[0],
    range: [range_default.createRangeSPEP(editor3.selection.start, editor3.selection.end)],
    __proto__: null
  }];
};
function multiLineHighlightRange({ editor: editor3, textEditorHighlight }) {
  return [{
    decoration: textEditorHighlight[0],
    range: [range_default.createRangeSPEP(editor3.selection.start, editor3.selection.start)],
    __proto__: null
  }, {
    decoration: textEditorHighlight[1],
    range: [range_default.createRangeSPEP(editor3.selection.end, editor3.selection.end)],
    __proto__: null
  }, {
    decoration: textEditorHighlight[2],
    range: [editor3.selection],
    __proto__: null
  }];
}
var multiCursorHighlightRange = ({ editor: editor3, textEditorHighlight }) => {
  return [
    {
      decoration: textEditorHighlight[0],
      range: editor3.selections.reduce((acc, selection) => {
        acc.push(range_default.createRangeSPEP(selection.start, selection.active));
        return acc;
      }, []),
      __proto__: null
    },
    {
      decoration: textEditorHighlight[1],
      range: editor3.selections.reduce((acc, selection) => {
        acc.push(range_default.createRangeNNNN(selection.active.line, 0, selection.active.line, selection.active.character));
        return acc;
      }, []),
      __proto__: null
    }
  ];
};
function unsetRangeOfHighlightStyle(editor3) {
  HIGHLIGHT_STYLE_SYMBOL_LIST.forEach((highlight) => {
    resetDecorationRange(editor3, highlightStyleList[highlight]);
  });
}
var coordinatorSplit = {
  [cursorOnly]: (context) => cursorOnlyHighlightRange(context),
  [singleLine]: (context) => singelLineHighlightRange(context),
  [multiLine]: (context) => multiLineHighlightRange(context),
  [multiCursor]: (context) => multiCursorHighlightRange(context)
};
function hightlightCoordinator({ editor: editor3, renderGroup, decorationState: decorationState2 }) {
  const textEditorHighlight = highlightStyleList[renderGroup.type.KEY];
  decorationState2.appliedHighlight.ofDecorationType = textEditorHighlight;
  return coordinatorSplit[renderGroup.type.KEY]({
    editor: editor3,
    textEditorHighlight,
    borderConfigSymlink: renderGroup.type.KEY,
    __proto__: null
  });
}
var bindHighlightStyleState = () => {
  return {
    styleOf: highlightStyleList,
    infoOf: borderPositionInfo
  };
};

// src/editor/decoration/decoration.ts
var decorationState = {
  ...DECORATION_STATE,
  __proto__: null
};
var applyDecoration = (editor3, decoraiton, range) => {
  editor3.setDecorations(decoraiton, range);
};
var disposeDecoration = (highlightStyleList2 = []) => {
  highlightStyleList2.forEach((decorationType) => {
    decorationType.dispose();
  });
};
var resetDecorationRange = (editor3, decorationType) => {
  decorationType?.forEach((decoration) => applyDecoration(editor3, decoration, []));
};
var unsetAndDisposeDecoration = (editor3, decorationType) => {
  decorationType?.forEach((decoration) => {
    applyDecoration(editor3, decoration, []);
    decoration.dispose();
  });
  return [];
};
var resetAllDecoration = (decorationState2) => {
  vscode7.window.visibleTextEditors.forEach((editor3) => {
    if (decorationState2.appliedHighlight.ofDecorationType !== void 0) {
      decorationState2.appliedHighlight.ofDecorationType.forEach((decoration) => {
        applyDecoration(editor3, decoration, []);
      });
    }
  });
  if (decorationState2.statusText) {
    decorationState2.statusText.forEach((decorationType) => decorationType.dispose());
  }
};
var createEditorDecorationType = (styleAppliedConfig) => {
  return vscode7.window.createTextEditorDecorationType(styleAppliedConfig);
};
function isDecorationChanged(editor3, decorationState2, selectionKind) {
  if (decorationState2.appliedHighlight.applied && decorationState2.appliedHighlight.applied.MASK !== selectionKind.MASK) {
    unsetRangeOfHighlightStyle(editor3);
  }
  decorationState2.appliedHighlight.applied = selectionKind;
}
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
  for (const key of HIGHLIGHT_STYLE_SYMBOL_LIST) {
    const selectionType = key;
    updateHighlightStyleConfiguration(configReady, selectionType);
  }
  return true;
};

// src/configuration/collection/patch.ts
var vscode8 = __toESM(require("vscode"));
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
  return extensionConfig.update(newKey, value, vscode8.ConfigurationTarget.Global);
};
var removeUserSetting = (extensionConfig, key) => {
  return extensionConfig.update(key, void 0, vscode8.ConfigurationTarget.Global);
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

// src/editor/decoration/status/selection.ts
var selectionContentText = {
  ...SELECTION_CONTENT_TEXT,
  __proto__: null
};
var indentInfo = { ...INDENT_INFO, __proto__: null };
var columnDelta = (editor3, delta = 0) => {
  const col = editor3.selection.active.character + delta;
  const end = editor3.document.lineAt(editor3.selection.active.line).text.length + delta;
  return col === end ? col : col + "/" + end;
};
var columns = {
  col: ({ editor: editor3 }) => columnDelta(editor3, 1),
  zCol: ({ editor: editor3 }) => columnDelta(editor3)
};
var characterCount = {
  char: ({ editor: editor3 }) => editor3.selection.end.character - editor3.selection.start.character
};
var lineNumber2 = {
  ln: ({ editor: editor3 }) => editor3.selection.active.line + 1
};
var multiLineOf = {
  lc: multiLineLineCountSym,
  char: multiLineChararcterSym
};
function lineCounter(editor3) {
  return editor3.selection.active.line - editor3.selection.anchor.line + 1;
}
function characterCounter(editor3) {
  return String(editor3.document.getText(editor3.selection).replace(indentInfo.regex, "").length);
}
var multilineFunctionSymLink = {
  [multiLineLineCountSym]: lineCounter,
  [multiLineChararcterSym]: characterCounter
};
var multiCursorOf = {
  nth: ({ idx }) => idx,
  count: ({ editor: editor3 }) => editor3.selections.length,
  ln: ({ idx, editor: editor3 }) => editor3.selections[idx].end.line + 1,
  lc: ({ editor: editor3 }) => {
    let idx = 0;
    let lineCount2 = 0;
    const length = editor3.selections.length;
    const isSingleLine = editor3.selections[0].start.line === editor3.selections[0].end.line;
    const lineDiff = isSingleLine ? 1 : editor3.selections[0].end.line - editor3.selections[0].start.line + 1;
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
  char: ({ editor: editor3 }) => {
    let idx = 0;
    let charCount = 0;
    const length = editor3.selections.length;
    const isSingleLine = editor3.selections[0].start.line === editor3.selections[0].end.line;
    while (idx < length) {
      if (isSingleLine) {
        charCount = charCount + (editor3.selections[idx].end.character - editor3.selections[idx].start.character);
      } else {
        const text = editor3.document.getText(editor3.selections[idx]);
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
function contentTextFunctionSymlink(editor3, { contentText, position }, buffer) {
  position.forEach(([pos, sym]) => {
    if (!buffer[sym]) {
      buffer[sym] = multilineFunctionSymLink[sym](editor3);
    }
    contentText[pos].after.contentText = String(buffer[sym]);
  });
  return contentText;
}
function contentTextFunc(context, contentText) {
  return contentText.map((decorationOption) => {
    if (typeof decorationOption.after.contentText === "string") {
      return decorationOption;
    }
    const decorationOptionFunc = { ...decorationOption };
    decorationOptionFunc.after = { ...decorationOption.after };
    decorationOptionFunc.after.contentText = String(decorationOption.after.contentText(context));
    return decorationOptionFunc;
  });
}
var cursorOnlySelection = ({ editor: editor3 }) => {
  return [{
    contentText: contentTextFunc({ idx: 0, editor: editor3 }, selectionContentText[cursorOnlyText].contentText),
    range: range_default.createActiveRange(editor3)
  }];
};
var singleLineSelection = ({ editor: editor3 }) => {
  return [{
    contentText: contentTextFunc({ idx: 0, editor: editor3 }, selectionContentText[singleLineText].contentText),
    range: range_default.createActiveRange(editor3)
  }];
};
function multilineSelection({ editor: editor3 }) {
  const buffer = {
    [multiLineLineCountSym]: void 0,
    [multiLineChararcterSym]: void 0
  };
  const anchor = contentTextFunctionSymlink(editor3, selectionContentText[multiLineAnchorText], buffer);
  const cursor = contentTextFunctionSymlink(editor3, selectionContentText[multiLineCursorText], buffer);
  const statusList = [{
    contentText: anchor,
    range: range_default.createAnchorRange(editor3)
  }, {
    contentText: cursor,
    range: range_default.createActiveRange(editor3)
  }];
  return statusList;
}
var multiCursorSelection = ({ idx, editor: editor3 }) => {
  const selectionTextInfo = [];
  const statusLine = [];
  while (idx--) {
    const lineSet = new Set(statusLine);
    if (lineSet.has(editor3.selections[idx].end.line)) {
      continue;
    }
    idx = idx + 1;
    selectionTextInfo.push({
      contentText: contentTextFunc({ idx, editor: editor3 }, selectionContentText[multiCursorText].contentText),
      range: range_default.createStartEndRangeOfSelection(editor3.selections[idx])
    });
    statusLine.push(editor3.selections[idx].end.line);
  }
  return selectionTextInfo;
};
var selectionTextInfoSplit = (context) => {
  return {
    [cursorOnly]: () => cursorOnlySelection(context),
    [singleLine]: () => singleLineSelection(context),
    [multiLine]: () => multilineSelection(context),
    [multiCursor]: () => multiCursorSelection(context)
  };
};
function selectionInfo(editor3, type) {
  const context = {
    idx: 0,
    editor: editor3
  };
  return selectionTextInfoSplit(context)[type.KEY]();
}
var bindStatusContentTextState = () => {
  return {
    functionOf: selectionOf,
    textOf: selectionContentText,
    infoOf: indentInfo
  };
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
    const sym = SELECTION_CONTENT_TEXT_SYMLINK[key];
    textOftarget[sym] = {
      contentText: contentTextStyled,
      position: Object.entries(textPosition.position)
    };
    if (leftMargin && leftMargin !== "0px" || leftMargin !== "0em") {
      if (textOftarget[sym].contentText[0]) {
        textOftarget[sym].contentText[0].after["margin"] = leftMarginToMarginString(leftMargin);
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
  const SelectionDecorationConfig = { ...SELECTION_DECORAITON_CONFIG };
  const SelectionDecorationStyle = { ...SELECTION_DECORATION_STYLE };
  const bindTo = bindStatusContentTextState();
  const bindToBuffer = {
    functionOf: bindTo.functionOf,
    textOf: {}
  };
  workspaceProxyConfiguration(SelectionDecorationConfig, configReady.name + "." + CONFIG_SECTION.selectionText, SELECTION_CONTENT_TEXT_LIST, bindToBuffer, regex_collection_default.statusContentText);
  buildSelectionTextDecorationRenderOption(SelectionDecorationConfig, SelectionDecorationStyle);
  buildStatusTextState(bindTo.textOf, bindToBuffer.textOf, SelectionDecorationStyle, SelectionDecorationConfig.leftMargin);
  delete bindTo.functionOf;
  delete bindTo.infoOf;
  delete bindTo.textOf;
  delete bindToBuffer.textOf;
  delete bindToBuffer.functionOf;
};

// src/editor/decoration/status/diagnostic.ts
var diagnosticContentText = {
  ...DIAGNOSTIC_CONTENT_TEXT,
  __proto__: null
};
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
function diagonosticMultiStyleDecoration(diagnosticState2, diagnosticContentTextIs) {
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
}
function diagnosticKind({ state, contentText, keySet }) {
  return {
    ok: () => diagonosticMultiStyleDecoration(state, contentText[keySet[okContentText]]),
    warning: () => diagonosticMultiStyleDecoration(state, contentText[keySet[warningContentText]]),
    error: () => diagonosticMultiStyleDecoration(state, contentText[keySet[errorContentText]])
  };
}
function diagnosticCounter(context) {
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
}
var diagnosticBiomeSplit = (state, contentText) => {
  const context = {
    state,
    contentText
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
function diagnosticLayoutAllOkOverride(state, textState) {
  return textState.layout[allOkPlaceholderContentText].contentText.map((decoration) => {
    if (decoration.after.contentText === Placeholder.allOkSym) {
      return diagonosticMultiStyleDecoration(state, textState.all[okAllContentText]);
    }
    const overrideColor = textState.layout[allOkPlaceholderContentText]?.override;
    decoration.after.color = overrideColor ? overrideColor[1 /* OK */].color : decoration.after.color;
    return decoration;
  }).flat();
}
function diagnosticLayoutDivided(state, textState) {
  return textState.layout[problemPlaceholderContentText].contentText.map((decoration) => {
    if (decoration.after.contentText === Placeholder.workspaceSym) {
      return diagnosticBiomeSplit(state.workspace, textState.workspace).workspace();
    }
    if (decoration.after.contentText === Placeholder.editorSym) {
      return diagnosticBiomeSplit(state.editor, textState.editor).editor();
    }
    const overrideColor = textState.layout[problemPlaceholderContentText].override;
    decoration.after.color = overrideColor ? overrideColor[state.severity].color : decoration.after.color;
    return decoration;
  }).flat();
}
function buildDiagonosticDecorationLayout(context) {
  const { state, textState } = context;
  const diagnosticLayout = state.severity === 1 /* OK */ ? diagnosticLayoutAllOkOverride : diagnosticLayoutDivided;
  return diagnosticLayout(state, textState);
}
function diagnosticInfo(editor3, diagnosticState2) {
  const context = {
    state: diagnosticState2,
    textState: diagnosticContentText,
    diagnosticVisibility
  };
  return [{
    contentText: buildDiagonosticDecorationLayout(context),
    range: range_default.createCursorRange(editor3)
  }];
}
var bindDiagnosticContentTextState = () => {
  return {
    functionOf: diagnosticOf,
    textOf: diagnosticContentText,
    configOf: diagnosticVisibility
  };
};

// src/configuration/status/diagonostic.ts
var positionKeyList = ["pre", "post"];
var positionKeyToPlaceholderName = { pre: "prefix", post: "postfix" };
var applyLeftMargin = (textOf, visibility, leftMargin) => {
  if (!leftMargin || leftMargin === "0px" || leftMargin === "0em") {
    return;
  }
  [allOkPlaceholderContentText, problemPlaceholderContentText].forEach((placeholderKind) => {
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
      convertPositionWrapper(context, textOftarget, biome, DIAGNOSTIC_CONTENT_TEXT_NAME_TO_SYM[contentTextName]);
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
  console.log(result);
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

// src/configuration/load.ts
var configInfo = {
  ...CONFIG_INFO,
  __proto__: null
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

// src/diagnostic/diagnostic.ts
var vscode9 = __toESM(require("vscode"));
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
    if (diagnostic.severity <= vscode9.DiagnosticSeverity.Warning) {
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
  const diagnostics = vscode9.languages.getDiagnostics();
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

// src/editor/decoration/handler.ts
var clearDecorationState = (decorationState2) => {
  decorationState2.appliedHighlight.applied = void 0;
  decorationState2.appliedHighlight.ofDecorationType = void 0;
  decorationState2.statusInfo = [];
  decorationState2.statusText = [];
};
var statusInfoHandler = (editor3, decorationState2) => ({ contentText, range }) => {
  contentText.forEach((decorationOption) => {
    const decoration = createEditorDecorationType(decorationOption);
    applyDecoration(editor3, decoration, [range]);
    decorationState2.statusText.push(decoration);
  });
};
function renderStatusInfo({ editor: editor3, renderGroup, decorationState: decorationState2 }) {
  decorationState2.statusInfo = [];
  if (renderGroup.selection) {
    decorationState2.statusInfo.push(...renderGroup.selection(editor3, renderGroup.type));
  }
  if (renderGroup.diagnostic) {
    decorationState2.statusInfo.push(...renderGroup.diagnostic(editor3, updateDiagnostic()));
  }
  decorationState2.statusText = unsetAndDisposeDecoration(editor3, decorationState2.statusText);
  decorationState2.statusInfo.forEach(statusInfoHandler(editor3, decorationState2));
}
function renderDecorationOnEditor(context) {
  hightlightCoordinator(context).forEach(({ decoration, range }) => {
    applyDecoration(context.editor, decoration, range);
  });
  renderStatusInfo(context);
}

// src/editor/editor.ts
var renderGroupSet = {
  ...RENDER_GROUP_SET,
  __proto__: null
};
var updateIndentOption = (editor3) => {
  const bindTo = bindStatusContentTextState();
  bindTo.infoOf.size = Number(editor3.options.tabSize ?? editor3.options.indentSize ?? 4);
  bindTo.infoOf.type = editor3.options.insertSpaces ? "\n" : "	";
  bindTo.infoOf.regex = editor3.options.insertSpaces ? regex_collection_default.indentAndEOLRegex(bindTo.infoOf.size) : regex_collection_default.tagtAndEOLRegex;
};
var prepareRenderGroup = (config) => {
  const selection = config.generalConfigInfo.selectionTextEnabled ? selectionInfo : void 0;
  const diagnostic = config.generalConfigInfo.diagnosticTextEnabled ? diagnosticInfo : void 0;
  const bindDiagnostic = bindDiagnosticContentTextState();
  const diagonosticAvaliabity = {
    [cursorOnly]: bindDiagnostic.configOf.displayWhenCursorOnly,
    [singleLine]: bindDiagnostic.configOf.displayWhenSingleLine,
    [multiLine]: bindDiagnostic.configOf.displayWhenMultiLine,
    [multiCursor]: bindDiagnostic.configOf.displayWhenMultiCursor
  };
  HIGHLIGHT_STYLE_SYMBOL_LIST.forEach((selectionKey) => {
    if (SELECTION_KIND[selectionKey]) {
      renderGroupSet[selectionKey] = {
        type: SELECTION_KIND[selectionKey],
        selection,
        diagnostic: diagonosticAvaliabity[selectionKey] ? diagnostic : void 0,
        __proto__: null
      };
    }
  });
  return renderGroupSet[cursorOnly];
};
function renderGroupIs(editor3) {
  if (editor3.selections.length === 1) {
    if (editor3.selections[0].isEmpty) {
      return renderGroupSet[cursorOnly];
    }
    if (!editor3.selections[0].isSingleLine) {
      return renderGroupSet[multiLine];
    } else {
      return renderGroupSet[singleLine];
    }
  } else {
    return renderGroupSet[multiCursor];
    ;
  }
}

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
      resetAllDecoration(decorationState2);
      console.log("idling");
    }
  });
};
var activeEditorChanged = ({ configInfo: configInfo2, decorationState: decorationState2, renderGroup }) => {
  return vscode10.window.onDidChangeActiveTextEditor(async (editor3) => {
    if (editor3) {
      if (configInfo2.configError.length > 0) {
      }
      resetAllDecoration(decorationState2);
      if (configInfo2.generalConfigInfo.diagnosticTextEnabled) {
        await resetEditorDiagnosticStatistics();
        await updateDiagnostic(editor3.document.uri);
      }
      updateIndentOption(editor3);
      renderDecorationOnEditor({
        editor: editor3,
        decorationState: decorationState2,
        renderGroup
      });
      if (Error2.check() && editor3) {
        Error2.notify(2e3);
      }
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
var selectionChanged = (context) => {
  function textEditorSelectionChangeEvent(context2) {
    return function(event) {
      const renderGroup = renderGroupIs(event.textEditor);
      isDecorationChanged(event.textEditor, context2.decorationState, renderGroup.type);
      renderDecorationOnEditor({
        editor: event.textEditor,
        decorationState: context2.decorationState,
        renderGroup,
        __proto__: null
      });
    };
  }
  return vscode10.window.onDidChangeTextEditorSelection(textEditorSelectionChangeEvent(context));
};

// src/event/workspace.ts
var vscode11 = __toESM(require("vscode"));

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
    ["cursorOnly" /* CURSOR_ONLY */]: (config) => updateHighlightStyleConfiguration(config, "CURSOR_ONLY" /* CURSOR_ONLY */),
    ["singleLine" /* SINGLE_LINE */]: (config) => updateHighlightStyleConfiguration(config, "SINGLE_LINE" /* SINGLE_LINE */),
    ["multiLine" /* MULTI_LINE */]: (config) => updateHighlightStyleConfiguration(config, "MULTI_LINE" /* MULTI_LINE */),
    ["multiCursor" /* MULTI_CURSOR */]: (config) => updateHighlightStyleConfiguration(config, "MULTI_CURSOR" /* MULTI_CURSOR */),
    ["selectionText" /* SELECTION_TEXT */]: (config) => updateSelectionTextConfig(config),
    ["diagnosticText" /* DIAGNOSTIC_TEXT */]: (config) => updateDiagnosticTextConfig(config, true)
  };
};

// src/event/workspace.ts
var configChanged = ({ configInfo: configInfo2, decorationState: decorationState2 }) => {
  return vscode11.workspace.onDidChangeConfiguration((event) => {
    if (event) {
      const sectionName = sectionList.find((section) => {
        return event.affectsConfiguration(configInfo2.name + "." + section);
      });
      if (sectionName) {
        console.log("????");
        sectionChanged()[sectionName](configInfo2);
        sectionChanged()["general" /* GENERAL */](configInfo2);
        prepareRenderGroup(configInfo2);
        resetAllDecoration(decorationState2);
        clearDecorationState(decorationState2);
      }
      if (Error2.check()) {
        Error2.notify(2e3);
      }
    }
  });
};

// src/event/language.ts
var vscode12 = __toESM(require("vscode"));
var diagnosticChanged = (context) => {
  return vscode12.languages.onDidChangeDiagnostics(async (event) => {
    const editor3 = vscode12.window.activeTextEditor;
    if (editor3 && event) {
      context.editor = editor3;
      await updateDiagnostic(editor3.document.uri);
      await renderStatusInfo(context);
    }
  });
};

// src/initialize.ts
var initialize = async (extensionContext) => {
  try {
    await extensionContext.extension.activate();
    Error2.setPackageName(extensionContext.extension.packageJSON.name);
    const loadConfig = loadConfiguration(extensionContext);
    if (!loadConfig) {
      console.error("Failed to initialize config.");
      return;
    }
    const configInfo2 = loadConfig.config;
    const activeEditor = vscode13.window.activeTextEditor;
    const eventContext = {
      editor: activeEditor,
      configInfo: configInfo2,
      decorationState: loadConfig.decoration,
      renderGroup: prepareRenderGroup(configInfo2),
      __proto__: null
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
