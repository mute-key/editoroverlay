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

// src/activate.ts
var vscode10 = __toESM(require("vscode"));

// src/config/config.ts
var vscode7 = __toESM(require("vscode"));

// src/constant/object.ts
var CONFIG_INFO = {
  name: void 0,
  configHashKey: void 0,
  generalConfigInfo: {
    borderOpacity: void 0,
    backgroundOpacity: void 0,
    statusTextEnabled: "statusText.enabled" /* STATUS_TEXT_ENABLED */,
    diagnosticTextEnabled: "diagnosticText.enabled" /* DIAGNOSTIC_TEXT_ENABLED */
  },
  borderPositionInfo: {
    CURSOR_ONLY: void 0,
    SINGLE_LINE: void 0,
    MULTI_LINE: void 0,
    MULTI_CURSOR: void 0
  },
  statusTextConfig: {
    color: void 0,
    opacity: void 0,
    backgroundColor: void 0,
    fontStyle: void 0,
    fontWeight: void 0,
    cursorOnlyText: void 0,
    singleLineText: void 0,
    multiLineCursorText: void 0,
    multiLineAnchorText: void 0,
    multiCursorText: void 0
  },
  configError: void 0
};
var STATUS_INFO = {
  indent: {
    size: void 0,
    type: void 0,
    regex: void 0
  },
  statusDecoration: {
    isWholeLine: void 0,
    rangeBehavior: void 0,
    after: {
      contentText: void 0,
      color: void 0,
      backgroundColor: void 0,
      fontWeight: void 0,
      fontStyle: void 0,
      textDecoration: "none",
      margin: "0 0 0 20px"
    }
  }
};
var DECORATION_STATE = {
  decorationList: {
    CURSOR_ONLY: void 0,
    SINGLE_LINE: void 0,
    MULTI_LINE: void 0,
    MULTI_CURSOR: void 0
  },
  appliedDecoration: {
    applied: void 0,
    editorDecoration: void 0
  },
  statusText: void 0,
  diagnosticText: void 0
};
var DECORATION_STYLE_PREFIX = {
  CURSOR_ONLY: "cursorOnly",
  SINGLE_LINE: "singleLine",
  MULTI_LINE: "multiLine",
  MULTI_CURSOR: "multiCursor"
};
var DIAGNOSTIC_CONFIG = {
  autoHideDiagnostic: {
    ok: void 0,
    warning: void 0,
    error: void 0
  },
  okTextStyle: {
    color: void 0,
    colorOpacity: void 0,
    backgroundColor: void 0,
    backgroundOpacity: void 0,
    fontStyle: void 0,
    fontWeight: void 0,
    rounded: void 0
  },
  okContentText: void 0,
  warningTextStyle: {
    color: void 0,
    colorOpacity: void 0,
    backgroundColor: void 0,
    backgroundOpacity: void 0,
    fontStyle: void 0,
    fontWeight: void 0,
    rounded: void 0
  },
  warningContentText: void 0,
  errorTextStyle: {
    color: void 0,
    colorOpacity: void 0,
    backgroundColor: void 0,
    backgroundOpacity: void 0,
    fontStyle: void 0,
    fontWeight: void 0,
    rounded: void 0
  },
  errorContentText: void 0
};
var DIAGONOSTIC_STATE = {
  total: 0,
  source: 0,
  severity: {
    hint: 0,
    info: 0,
    warning: 0,
    error: 0
  },
  diagonosticDecoration: []
};
var STATUS_CONTENT_TEXT = {
  ["cursorOnlyText" /* CURSOR_ONLY_TEXT */]: {
    contentText: void 0,
    col: void 0,
    zCol: void 0,
    ln: void 0
  },
  ["singleLineText" /* SINGLE_LINE_TEXT */]: {
    contentText: void 0,
    char: void 0,
    ln: void 0
  },
  ["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */]: {
    contentText: void 0,
    ln: void 0,
    lc: void 0,
    char: void 0
  },
  ["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */]: {
    contentText: void 0,
    ln: void 0,
    lc: void 0,
    char: void 0
  },
  ["multiCursorText" /* MULTI_CURSOR_TEXT */]: {
    contentText: void 0,
    nth: void 0,
    count: void 0,
    ln: void 0,
    lc: void 0,
    char: void 0
  }
};
var DIAGNOSTIC_CONTENT_TEXT = {
  ["okContentText" /* OK_CONTENT_TEXT */]: {
    contentText: void 0
  },
  ["warningContentText" /* WARNING_CONTENT_TEXT */]: {
    contentText: void 0,
    src: void 0,
    wrn: void 0
  },
  ["errorContentText" /* ERROR_CONTENT_TEXT */]: {
    contentText: void 0,
    src: void 0,
    err: void 0
  }
};
var CONFIG_SECTION = {
  ["general" /* GENERAL */]: "general" /* GENERAL */,
  ["statusText" /* STATUS_TEXT */]: "statusText" /* STATUS_TEXT */,
  ["cursorOnly" /* CURSOR_ONLY */]: "cursorOnly" /* CURSOR_ONLY */,
  ["singleLine" /* SINGLE_LINE */]: "singleLine" /* SINGLE_LINE */,
  ["multiLine" /* MULTI_LINE */]: "multiLine" /* MULTI_LINE */,
  ["multiCursor" /* MULTI_CURSOR */]: "multiCursor" /* MULTI_CURSOR */
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
  ["CURSOR_ONLY" /* CURSOR_ONLY */]: SINGLE_BORDER_SELECTION,
  ["SINGLE_LINE" /* SINGLE_LINE */]: SINGLE_BORDER_SELECTION,
  ["MULTI_LINE" /* MULTI_LINE */]: MULTILINE_BORDER_SELECTION,
  ["MULTI_CURSOR" /* MULTI_CURSOR */]: SINGLE_BORDER_SELECTION
};
var DECORATION_INFO = {
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
  ["statusTextEnabled" /* STATUS_TEXT_ENABLED */]: false
};
var NO_CONFIGURATION_STATUS_DEFAULT = {
  ["statusTextColor" /* STATUS_TEXT_COLOR */]: "#FF0000",
  ["statusTextOpacity" /* STATUS_TEXT_OPACITY */]: 1,
  ["statusTextBackgroundColor" /* STATUS_TEXT_BACKGROUND_COLOR */]: null,
  ["statusTextFontStyle" /* STATUS_TEXT_FONT_STYLE */]: "normal",
  ["statusTextFontWeight" /* STATUS_TEXT_FONT_WEIGHT */]: "bold"
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

// src/util/util.ts
var vscode = __toESM(require("vscode"));

// src/util/regex.ts
var indentAndEOLRegex = (indentSize) => new RegExp(`^( {${indentSize}}|[\r
]+)*$`, "gm");
var tagtAndEOLRegex = /(\t|[\r\n]+)*$/gm;
var isValidHexColor = /^#[A-Fa-f0-9]{6}$/;
var isValidWidth = /^[0-9]px$|^[0-9]em$/;
var ifContentTextHasPlaceholder = /(\${[A-z]*})/g;
var contentTextKeysOnly = /\${([^{}]+)}/s;
var diagnosticTextRegex = {
  // [DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY.OK_TEXT]: null,
  ["warningContentText" /* WARNING_CONTENT_TEXT */]: {
    src: /(\${src})/s,
    wrn: /(\${wrn})/s
  },
  ["errorContentText" /* ERROR_CONTENT_TEXT */]: {
    src: /(\${src})/s,
    err: /(\${err})/s
  }
};
var statusTextRegex = {
  ["cursorOnlyText" /* CURSOR_ONLY_TEXT */]: {
    col: /(\${col})/s,
    zCol: /(\${zCol})/s,
    ln: /(\${ln})/s
  },
  ["singleLineText" /* SINGLE_LINE_TEXT */]: {
    char: /(\${char})/s,
    ln: /(\${ln})/s
  },
  ["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */]: {
    lc: /(\${lc})/s,
    ln: /(\${ln})/s,
    char: /(\${char})/s
  },
  ["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */]: {
    lc: /(\${lc})/s,
    ln: /(\${ln})/s,
    char: /(\${char})/s
  },
  ["multiCursorText" /* MULTI_CURSOR_TEXT */]: {
    nth: /(\${nth})/s,
    count: /(\${count})/s,
    lc: /(\${lc})/s,
    ln: /(\${ln})/s,
    char: /(\${char})/s
  }
};

// src/util/util.ts
var getWorkspaceConfiguration = (section) => vscode.workspace.getConfiguration(section);
var sendAutoDismissMessage = (text, dismiss) => {
  const message = vscode.window.showInformationMessage(text);
  setTimeout(() => {
    message?.then(() => {
    });
  }, dismiss);
};
var regex = {
  indentAndEOLRegex,
  tagtAndEOLRegex,
  isValidHexColor,
  isValidWidth,
  ifContentTextHasPlaceholder,
  contentTextKeysOnly,
  statusContentText: statusTextRegex,
  diagnosticTextRegex
};
var readBits = (value, trueValue, falseValue, bitLength) => {
  let idx = bitLength ? bitLength : 4;
  const array = [];
  while (idx--) {
    if (value >> idx & 1) {
      array.push(trueValue);
    } else {
      array.push(falseValue);
    }
  }
  return array;
};
var fnv1aHash = (str) => {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    hash = hash >>> 0;
  }
  return hash.toString(16);
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

// src/config/common.ts
var castToFuncSignature = (result) => {
  if (result) {
    return {
      ...result,
      array: result.array.filter((entry) => entry !== void 0)
    };
  }
};
var searchPlaceholder = (targetObj, key, regex2, searchObject, lastIndex, bindTo) => {
  const split = castToFuncSignature(splitAndPosition(searchObject.nextSearchString, regex2));
  if (split) {
    if (Object.hasOwn(bindTo, key)) {
      split.array[split.position] = bindTo[key];
    }
    if (lastIndex) {
      targetObj.contentText?.push(...split.array);
      targetObj[key] = searchObject.lastPosition + split.position;
    } else {
      if (split.position === 0) {
        targetObj.contentText?.push(split.array[0]);
        targetObj[key] = searchObject.lastPosition + split.position;
        searchObject.nextSearchString = split.array[1];
        searchObject.lastPosition = searchObject.lastPosition + split.position + 1;
      } else if (split.position === 1 && split.array.length === 2) {
        targetObj[key] = searchObject.lastPosition + split.position;
        targetObj.contentText?.push(...split.array);
      } else if (split.position === 1 && split.array.length === 3) {
        targetObj.contentText?.push(split.array[0], split.array[1]);
        targetObj[key] = searchObject.lastPosition + split.position;
        searchObject.nextSearchString = split.array[2];
        searchObject.lastPosition = searchObject.lastPosition + split.position + 1;
      }
    }
  }
};
var getConfigValue = (configSection, configName, defaultValue) => {
  try {
    const value = configSection.get(configName, defaultValue);
    if (value === void 0) {
      console.warn(`Config value for ${configName} is undefined or caused an error. Using default value.`);
    }
    return value;
  } catch (err) {
    console.error(`Failed to get config value for ${configSection + "." + configName}:`, err);
    return defaultValue;
  }
};
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

// src/editor/decoration/decoration.ts
var vscode4 = __toESM(require("vscode"));

// src/editor/range.ts
var vscode2 = __toESM(require("vscode"));
var createRangeNNNN = (startLine, startChar, endLine, endChar) => {
  return new vscode2.Range(new vscode2.Position(startLine, startChar), new vscode2.Position(endLine, endChar));
};
var createRangeSPEP = (start, end) => {
  return new vscode2.Range(start, end);
};
var createRangeNNEP = (line, startChar, end) => {
  return new vscode2.Range(new vscode2.Position(line, startChar), end);
};

// src/editor/decoration/range.ts
var cursorOnlyDecorationWithRange = (context) => {
  const { editor, borderConfig, textEditorDecoration } = context;
  if (borderConfig.isWholeLine) {
    return [{
      decoration: textEditorDecoration[0],
      range: [createRangeSPEP(editor.selection.active, editor.selection.active)]
    }];
  }
  if (borderConfig.beforeCursor) {
    return [{
      decoration: textEditorDecoration[0],
      range: [createRangeNNNN(editor.selection.active.line, 0, editor.selection.active.line, editor.selection.active.character)]
    }];
  }
  if (borderConfig.afterCursor) {
    return [
      {
        decoration: textEditorDecoration[0],
        range: [createRangeNNEP(
          editor.selection.active.line,
          editor.selection.active.character,
          editor.document.lineAt(editor.selection.active.line).range.end
        )]
      },
      {
        decoration: textEditorDecoration[1],
        range: [createRangeNNNN(editor.selection.active.line, 0, editor.selection.active.line, editor.selection.active.character)]
      }
    ];
  }
  return [];
};
var singelLineDecorationWithRange = ({ editor, borderConfig, textEditorDecoration }) => {
  return [{
    decoration: textEditorDecoration[0],
    range: [createRangeSPEP(editor.selection.start, editor.selection.end)]
  }];
};
var multiLineDecorationWithRange = ({ editor, borderConfig, textEditorDecoration }) => {
  if (borderConfig.borderPosition === "left") {
    return [{
      decoration: textEditorDecoration[2],
      range: [createRangeNNNN(editor.selection.start.line, editor.selection.start.character, editor.selection.end.line, editor.selection.end.character)]
    }];
  } else {
    const decorationWithRange = [];
    decorationWithRange.push(
      {
        decoration: textEditorDecoration[0],
        range: [createRangeSPEP(editor.selection.start, editor.selection.start)]
      },
      {
        decoration: textEditorDecoration[1],
        range: [createRangeSPEP(editor.selection.end, editor.selection.end)]
      }
    );
    if (Math.abs(editor.selection.start.line - editor.selection.end.line) > 1) {
      decorationWithRange.push({
        decoration: textEditorDecoration[2],
        range: [createRangeNNNN(editor.selection.start.line + 1, editor.selection.start.character, editor.selection.end.line - 1, editor.selection.end.character)]
      });
    } else {
      applyDecoration(editor, textEditorDecoration[2], []);
    }
    return decorationWithRange;
  }
};
var multiCursorDecorationWithRange = ({ editor, borderConfig, textEditorDecoration }) => {
  return [
    {
      decoration: textEditorDecoration[0],
      range: editor.selections.reduce((acc, selection) => {
        acc.push(createRangeSPEP(selection.start, selection.active));
        return acc;
      }, [])
    },
    {
      decoration: textEditorDecoration[1],
      range: editor.selections.reduce((acc, selection) => {
        acc.push(createRangeNNNN(selection.active.line, 0, selection.active.line, selection.active.character));
        return acc;
      }, [])
    }
  ];
};

// src/editor/decoration/status.ts
var cursorOnlyContentTextState = [];
var singleLineContentTextState = [];
var multiLineCursorContentTextState = [];
var multiLineAnchorContentTextState = [];
var multiCursorContentTextState = [];
var contentTextState = {
  ["cursorOnlyText" /* CURSOR_ONLY_TEXT */]: (statusContentText2) => {
    if (statusContentText2["cursorOnlyText" /* CURSOR_ONLY_TEXT */].contentText) {
      cursorOnlyContentTextState.splice(0);
      cursorOnlyContentTextState.push(...statusContentText2["cursorOnlyText" /* CURSOR_ONLY_TEXT */].contentText);
    }
  },
  ["singleLineText" /* SINGLE_LINE_TEXT */]: (statusContentText2) => {
    if (statusContentText2["singleLineText" /* SINGLE_LINE_TEXT */].contentText) {
      singleLineContentTextState.splice(0);
      singleLineContentTextState.push(...statusContentText2["singleLineText" /* SINGLE_LINE_TEXT */].contentText);
    }
  },
  ["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */]: (statusContentText2) => {
    if (statusContentText2["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */].contentText) {
      multiLineCursorContentTextState.splice(0);
      multiLineCursorContentTextState.push(...statusContentText2["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */].contentText);
    }
  },
  ["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */]: (statusContentText2) => {
    if (statusContentText2["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */].contentText) {
      multiLineAnchorContentTextState.splice(0);
      multiLineAnchorContentTextState.push(...statusContentText2["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */].contentText);
    }
  },
  ["multiCursorText" /* MULTI_CURSOR_TEXT */]: (statusContentText2) => {
    if (statusContentText2["multiCursorText" /* MULTI_CURSOR_TEXT */].contentText) {
      multiCursorContentTextState.splice(0);
      multiCursorContentTextState.push(...statusContentText2["multiCursorText" /* MULTI_CURSOR_TEXT */].contentText);
    }
  }
};
var statusOf = {
  ["cursorOnlyText" /* CURSOR_ONLY_TEXT */]: {
    ln: ({ editor }) => editor.selection.active.line + 1,
    col: ({ editor }) => {
      const col = editor.selection.active.character + 1;
      const end = editor.document.lineAt(editor.selection.active.line).text.length + 1;
      return col === end ? col : col + "/" + end;
    },
    zCol: ({ editor }) => {
      const col = editor.selection.active.character;
      const end = editor.document.lineAt(editor.selection.active.line).text.length;
      return col === end ? col : col + "/" + end;
    }
  },
  ["singleLineText" /* SINGLE_LINE_TEXT */]: {
    ln: ({ editor }) => editor.selection.active.line + 1,
    char: ({ editor }) => Math.abs(editor.selection.end.character - editor.selection.start.character)
  },
  ["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */]: {
    ln: ({ editor }) => editor.selection.active.line + 1,
    lc: ({ editor }) => Math.abs(editor.selection.end.line - editor.selection.start.line) + 1,
    char: ({ editor, indent }) => editor.document.getText(editor.selection).replace(indent.regex, "").length
  },
  ["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */]: {
    ln: ({ editor }) => editor.selection.anchor.line + 1,
    lc: ({ editor }) => Math.abs(editor.selection.end.line - editor.selection.start.line) + 1,
    char: ({ editor, indent }) => editor.document.getText(editor.selection).replace(indent.regex, "").length
  },
  ["multiCursorText" /* MULTI_CURSOR_TEXT */]: {
    nth: ({ idx }) => idx,
    count: ({ editor }) => editor.selections.length,
    ln: ({ idx, editor }) => editor.selections[idx].end.line + 1,
    lc: ({ editor }) => {
      let idx = 0;
      let lineCount = 0;
      const length = editor.selections.length;
      const isSingleLine = editor.selections[0].start.line === editor.selections[0].end.line;
      const lineDiff = isSingleLine ? 1 : Math.abs(editor.selections[0].end.line - editor.selections[0].start.line) + 1;
      while (idx < length) {
        if (isSingleLine) {
          lineCount = lineCount + lineDiff;
        } else {
          lineCount = lineCount + lineDiff;
        }
        idx++;
      }
      return lineCount;
    },
    char: ({ editor, indent }) => {
      let idx = 0;
      let charCount = 0;
      const length = editor.selections.length;
      const isSingleLine = editor.selections[0].start.line === editor.selections[0].end.line;
      while (idx < length) {
        if (isSingleLine) {
          charCount = charCount + (editor.selections[idx].end.character - editor.selections[idx].start.character);
        } else {
          const text = editor.document.getText(editor.selections[idx]);
          charCount = charCount + text.replace(indent.regex, "").length;
        }
        idx++;
      }
      return charCount;
    }
  }
};
var cursorOnlyStatus = (editor) => {
  const context = {
    editor
  };
  return [{
    contentText: cursorOnlyContentTextState.map((entry) => typeof entry === "string" ? entry : entry(context)).join(""),
    range: createRangeSPEP(editor.selection.active, editor.selection.active),
    isWholeLine: true
  }];
};
var singleLineStatus = (editor) => {
  const context = {
    editor
  };
  return [{
    contentText: singleLineContentTextState.map((entry) => typeof entry === "string" ? entry : entry(context)).join(""),
    range: createRangeSPEP(editor.selection.active, editor.selection.active),
    isWholeLine: true
  }];
};
var multilineStatus = (editor, indent) => {
  const context = {
    editor,
    indent
  };
  return [{
    contentText: multiLineCursorContentTextState.map((entry) => typeof entry === "string" ? entry : entry(context)).join(""),
    range: createRangeSPEP(editor.selection.anchor, editor.selection.anchor),
    isWholeLine: true
  }, {
    contentText: multiLineAnchorContentTextState.map((entry) => typeof entry === "string" ? entry : entry(context)).join(""),
    range: createRangeSPEP(editor.selection.active, editor.selection.active),
    isWholeLine: true
  }];
};
var multiCursorStatus = (editor, indent) => {
  const statusTextInfo = [];
  const statusLine = [];
  let idx = editor.selections.length;
  while (idx--) {
    const lineSet = new Set(statusLine);
    if (lineSet.has(editor.selections[idx].end.line)) {
      continue;
    }
    const context = {
      idx,
      editor,
      indent
    };
    statusTextInfo.push({
      contentText: multiCursorContentTextState.map((entry) => typeof entry === "string" ? entry : entry(context)).join(""),
      range: createRangeSPEP(editor.selections[idx].start, editor.selections[idx].end),
      isWholeLine: true
    });
    statusLine.push(editor.selections[idx].end.line);
    idx++;
  }
  return statusTextInfo;
};
var statusDecorationType = (statusTextInfo, statusDecorationType2) => {
  statusDecorationType2.isWholeLine = statusTextInfo.isWholeLine;
  statusDecorationType2.after.contentText = statusTextInfo.contentText;
  return statusDecorationType2;
};
var statusTextInfoSplit = (editor, indent) => {
  return {
    ["CURSOR_ONLY" /* CURSOR_ONLY */]: () => cursorOnlyStatus(editor),
    ["SINGLE_LINE" /* SINGLE_LINE */]: () => singleLineStatus(editor),
    ["MULTI_LINE" /* MULTI_LINE */]: () => multilineStatus(editor, indent),
    ["MULTI_CURSOR" /* MULTI_CURSOR */]: () => multiCursorStatus(editor, indent)
  };
};
var statusText = (editor, decorationState2, statusInfo, type) => {
  const statusTextInfo = statusTextInfoSplit(editor, statusInfo.indent)[type.KEY]();
  const statusInfoList = [];
  let length = statusTextInfo.length;
  while (length--) {
    const editorDecoration = createEditorDecorationType(statusDecorationType(statusTextInfo[length], statusInfo.statusDecoration));
    applyDecoration(editor, editorDecoration, [statusTextInfo[length].range]);
    statusInfoList.push(editorDecoration);
  }
  disposeDecoration(decorationState2.statusText);
  decorationState2.statusText = statusInfoList;
};
var bindStatusContentTextState = (type) => {
  return {
    statusOf: statusOf[type],
    contentTextState: contentTextState[type]
  };
};

// src/editor/decoration/diagnostic.ts
var vscode3 = __toESM(require("vscode"));
var diagnosticState = { ...DIAGONOSTIC_STATE };
var okContentTextState = [];
var warnContentTextState = [];
var errContentTextState = [];
var diagnosticTextState = {
  ["okContentText" /* OK_CONTENT_TEXT */]: (diagnosticContentText) => {
    okContentTextState.splice(0);
    okContentTextState.push(diagnosticContentText["okContentText" /* OK_CONTENT_TEXT */].contentText);
  },
  ["warningContentText" /* WARNING_CONTENT_TEXT */]: (diagnosticContentText) => {
    warnContentTextState.splice(0);
    warnContentTextState.push(...diagnosticContentText["warningContentText" /* WARNING_CONTENT_TEXT */].contentText);
  },
  ["errorContentText" /* ERROR_CONTENT_TEXT */]: (diagnosticContentText) => {
    errContentTextState.splice(0);
    errContentTextState.push(...diagnosticContentText["errorContentText" /* ERROR_CONTENT_TEXT */].contentText);
  }
};
var diagnosticOf = {
  ["okContentText" /* OK_CONTENT_TEXT */]: {},
  ["warningContentText" /* WARNING_CONTENT_TEXT */]: {
    src: () => diagnosticState.source,
    wrn: () => diagnosticState.severity.warning
  },
  ["errorContentText" /* ERROR_CONTENT_TEXT */]: {
    src: () => diagnosticState.source,
    err: () => diagnosticState.severity.error
  }
};
var updateDiagonosticStateSplit = {
  [vscode3.DiagnosticSeverity.Hint]: () => {
    diagnosticState.severity.hint += 1;
  },
  [vscode3.DiagnosticSeverity.Information]: () => {
    diagnosticState.severity.info += 1;
  },
  [vscode3.DiagnosticSeverity.Warning]: () => {
    diagnosticState.severity.warning += 1;
  },
  [vscode3.DiagnosticSeverity.Error]: () => {
    diagnosticState.severity.error += 1;
  }
};
var resetDiagonosticState = () => {
  diagnosticState.total = 0;
  diagnosticState.source = 0;
  diagnosticState.severity.hint = 0;
  diagnosticState.severity.info = 0;
  diagnosticState.severity.warning = 0;
  diagnosticState.severity.error = 0;
};
var updateDiagonosticState = () => {
  resetDiagonosticState();
  const diagnostics = vscode3.languages.getDiagnostics();
  for (const [uri, diagnosticList] of diagnostics) {
    diagnosticState.source += 1;
    for (const diagnostic of diagnosticList) {
      console.log(uri);
      diagnosticState.total += 1;
      updateDiagonosticStateSplit[diagnostic.severity]();
    }
  }
};
var updateDiagonosticDecoration = (editor, decorationState2) => {
  const diagonosticInfoList = [];
  const warnContentText = warnContentTextState.map((e) => typeof e === "string" ? e : e()).join("");
  const errContentText = errContentTextState.map((e) => typeof e === "string" ? e : e()).join("");
  const deco = vscode3.window.createTextEditorDecorationType({
    outline: "dashed red",
    color: "#ff0000",
    backgroundColor: "#ffffff",
    opacity: "0.7",
    isWholeLine: false,
    rangeBehavior: vscode3.DecorationRangeBehavior.OpenOpen,
    before: {
      contentText: `${warnContentText}/${errContentText}

`,
      color: "#ff0000",
      backgroundColor: "#ffffff",
      fontWeight: "normal",
      fontStyle: "normal",
      textDecoration: "none",
      margin: "0 0 0 20px"
    }
  });
  disposeDecoration(decorationState2.diagnosticText);
  applyDecoration(editor, deco, [new vscode3.Range(new vscode3.Position(editor.selection.active.line + 1, 0), new vscode3.Position(editor.selection.active.line + 1, 0))]);
  console.log(deco);
  decorationState2.diagnosticText = [deco];
};
var bindDiagnosticContentTextState = (type) => {
  return {
    diagnosticOf: diagnosticOf[type],
    diagnosticTextState: diagnosticTextState[type]
  };
};

// src/editor/decoration/decoration.ts
var applyDecoration = (editor, decoraiton, range) => editor.setDecorations(decoraiton, range);
var createEditorDecorationType = (styleAppliedConfig) => vscode4.window.createTextEditorDecorationType(styleAppliedConfig);
var disposeDecoration = (decorationList = []) => decorationList.forEach((decorationType) => {
  decorationType.dispose();
});
var resetLastAppliedDecoration = (editor, decorationType) => decorationType.forEach((decoration) => applyDecoration(editor, decoration, []));
var resetDecoration = (decorationState2, editor, dispose) => (decorationInfo) => {
  if (editor) {
    decorationState2.statusText?.forEach((decorationType) => {
      decorationType.dispose();
    });
    decorationState2.decorationList[decorationInfo.KEY]?.forEach((decorationType) => {
      if (Array.isArray(decorationType)) {
        decorationType.forEach((decorationType2) => {
          applyDecoration(editor, decorationType2, []);
        });
      } else {
        applyDecoration(editor, decorationType, []);
      }
    });
  }
};
var resetOtherDecoration = (currentDecoration, reset) => {
  Object.values(DECORATION_INFO).filter((info) => currentDecoration.MASK & info.MASK).map((info) => reset(info)).every(Boolean);
};
var resetDecorationWrapper = (decorationState2, editor, dispose) => resetOtherDecoration(DECORATION_INFO.RESET, (decorationInfo) => resetDecoration(decorationState2, editor, dispose)(decorationInfo));
var isDecorationChanged = (editor, decorationState2, decorationInfo) => {
  if (decorationState2.appliedDecoration.applied) {
    if (decorationState2.appliedDecoration.applied.MASK !== decorationInfo.MASK) {
      resetLastAppliedDecoration(editor, decorationState2.decorationList[decorationState2.appliedDecoration.applied.KEY]);
      decorationState2.appliedDecoration.applied = decorationInfo;
    }
  }
  decorationState2.appliedDecoration.applied = decorationInfo;
};
var coordinatorSplit = {
  ["CURSOR_ONLY" /* CURSOR_ONLY */]: (context) => cursorOnlyDecorationWithRange(context),
  ["SINGLE_LINE" /* SINGLE_LINE */]: (context) => singelLineDecorationWithRange(context),
  ["MULTI_LINE" /* MULTI_LINE */]: (context) => multiLineDecorationWithRange(context),
  ["MULTI_CURSOR" /* MULTI_CURSOR */]: (context) => multiCursorDecorationWithRange(context)
};
var decorationCoordinator = ({ editor, configInfo: configInfo2, decorationInfo, decorationState: decorationState2 }) => {
  const textEditorDecoration = decorationState2.decorationList[decorationInfo.KEY];
  if (textEditorDecoration) {
    const borderConfig = configInfo2.borderPositionInfo[decorationInfo.KEY];
    return coordinatorSplit[decorationInfo.KEY]({
      editor,
      borderConfig,
      textEditorDecoration
    });
  }
  return;
};
var setDecorationOnEditor = ({ editor, configInfo: configInfo2, statusInfo, decorationInfo, decorationState: decorationState2 }) => {
  const textEditorDecoration = decorationState2.decorationList[decorationInfo.KEY];
  if (textEditorDecoration) {
    decorationState2.appliedDecoration.editorDecoration = textEditorDecoration;
    const decorationWithRange = decorationCoordinator({ editor, configInfo: configInfo2, decorationInfo, decorationState: decorationState2 });
    if (!decorationWithRange) {
      return;
    }
    if (configInfo2.generalConfigInfo.statusTextEnabled) {
      statusText(editor, decorationState2, statusInfo, decorationInfo);
    }
    if (configInfo2.generalConfigInfo.diagnosticTextEnabled) {
      updateDiagonosticDecoration(editor, decorationState2);
    }
    decorationWithRange.forEach(({ decoration, range }) => {
      applyDecoration(editor, decoration, range);
    });
  }
};

// src/config/decoration.ts
var checkConfigKeyAndCast = (key, config) => {
  return key;
};
var getConfigSet = (configReady, decorationKey) => {
  const configSectionName = DECORATION_STYLE_PREFIX[decorationKey];
  const defaultConfigDefinition = NO_CONFIGURATION_DEOCORATION_DEFAULT[decorationKey];
  const configSection = getWorkspaceConfiguration(configReady.name + "." + configSectionName);
  return Object.entries(defaultConfigDefinition).reduce((config, [configName, defaultValue]) => {
    const configValue = getConfigValue(configSection, checkConfigKeyAndCast(configName, defaultConfigDefinition), defaultValue);
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
var createDecorationTypeBuilder = (configReady, statusConfigInfo2, decorationState2) => {
  for (const key in configReady.generalConfigInfo) {
    if (configReady.generalConfigInfo[key]) {
      const sectionLinker = configReady.generalConfigInfo[key].split(".");
      const configSection = getWorkspaceConfiguration(configReady.name + "." + sectionLinker[0]);
      const configValue = getConfigValue(configSection, sectionLinker[1], NO_CONFIGURATION_GENERAL_DEFAULT[key]);
      configReady.generalConfigInfo[key] = configValue;
    } else {
      const configSection = getWorkspaceConfiguration(configReady.name + "." + CONFIG_SECTION.general);
      configReady.generalConfigInfo[key] = getConfigValue(configSection, key, NO_CONFIGURATION_GENERAL_DEFAULT[key]);
    }
  }
  for (const key in decorationState2.decorationList) {
    const selectionType = key;
    if (decorationState2.decorationList[selectionType]) {
      disposeDecoration(decorationState2.decorationList[selectionType]);
    }
    const configSet = getConfigSet(configReady, selectionType);
    const parsed = borderPositionParser(selectionType, String(configSet.borderPosition));
    configReady.borderPositionInfo[selectionType] = parsed;
    configSet.borderPosition = parsed.borderPosition;
    configSet.isWholeLine = parsed.isWholeLine;
    const decorationTypeList = createDecorationType(configSet, selectionType, decorationTypeSplit);
    if (!decorationTypeList) {
      return false;
    }
    decorationState2.decorationList[selectionType] = decorationTypeList;
  }
  return true;
};

// src/config/patch.ts
var vscode5 = __toESM(require("vscode"));
var legacyConfig = {
  borderOpacity: "general.borderOpacity",
  backgroundOpacity: "general.backgroundOpacity",
  statusTextEnabled: "statusText.enabled",
  statusTextIconEnabled: "statusText.iconEnabled",
  statusTextColor: "statusText.color",
  statusTextBackgroundColor: "statusText.backgroundColor",
  statusTextOpacity: "statusText.opacity",
  statusTextFontStyle: "statusText.fontStyle",
  statusTextFontWeight: "statusText.fontWeight",
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
  return extensionConfig.update(newKey, value, vscode5.ConfigurationTarget.Global);
};
var removeUserSetting = (extensionConfig, key) => {
  return extensionConfig.update(key, void 0, vscode5.ConfigurationTarget.Global);
};
var patchConfig = async (configReady) => {
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

// src/config/status.ts
var vscode6 = __toESM(require("vscode"));
var statusContentText = { ...STATUS_CONTENT_TEXT };
var setStatusConfig = (configReady, statusConfigInfo2) => {
  const editorConfig = vscode6.workspace.getConfiguration("editor");
  const tabSize = editorConfig.get("tabSize");
  const insertSpaces = editorConfig.get("insertSpaces");
  statusConfigInfo2.indent.size = Number(tabSize ? tabSize : 4);
  statusConfigInfo2.indent.type = insertSpaces ? "\n" : "	";
  statusConfigInfo2.indent.regex = insertSpaces ? regex.indentAndEOLRegex(statusConfigInfo2.indent.size) : regex.tagtAndEOLRegex;
  if (configReady.statusTextConfig) {
    const textColor = configReady.statusTextConfig.color;
    const textOpacity = configReady.statusTextConfig.opacity;
    const defaultColor = NO_CONFIGURATION_STATUS_DEFAULT.statusTextColor;
    const defaultOpacity = NO_CONFIGURATION_STATUS_DEFAULT.statusTextOpacity;
    statusConfigInfo2.statusDecoration.rangeBehavior = vscode6.DecorationRangeBehavior.ClosedClosed;
    statusConfigInfo2.statusDecoration.after.color = hexToRgbaStringLiteral(textColor, textOpacity, defaultColor, defaultOpacity);
    statusConfigInfo2.statusDecoration.after.backgroundColor = configReady.statusTextConfig.backgroundColor;
    statusConfigInfo2.statusDecoration.after.fontWeight = configReady.statusTextConfig.fontWeight;
    statusConfigInfo2.statusDecoration.after.fontStyle = configReady.statusTextConfig.fontStyle;
  }
};
var updateStatusContentText = (configReady) => {
  Object.entries(statusContentText).forEach(([type, contentTextInfo]) => {
    const statusText2 = configReady.statusTextConfig;
    const regexObject = regex.statusContentText[type];
    const bind = bindStatusContentTextState(type);
    statusContentText[type].contentText = [];
    const match = statusText2[type].match(regex.ifContentTextHasPlaceholder);
    if (match) {
      if (match > Object.keys(regexObject).length) {
        configReady.configError.push("statusText." + type);
      }
      let searchObject = {
        nextSearchString: statusText2[type],
        lastPosition: 0
      };
      match.forEach((search, index) => {
        const regexKey = search.match(regex.contentTextKeysOnly);
        if (Object.hasOwn(regexObject, regexKey[1])) {
          searchPlaceholder(statusContentText[type], regexKey[1], regexObject[regexKey[1]], searchObject, index === match.length - 1, bind.statusOf);
        } else {
          configReady.configError.push("statusText." + type);
        }
      });
    } else {
      statusContentText[type].contentText.push(statusText2[type]);
    }
    bind.contentTextState(statusContentText);
  });
};
var updateStatusTextConfig = (configReady, statusConfigInfo2, decorationState2) => {
  if (decorationState2.statusText) {
    disposeStatusInfo(decorationState2);
  }
  const statusTextConfig = getWorkspaceConfiguration(configReady.name + "." + CONFIG_SECTION.statusText);
  for (const key in configReady.statusTextConfig) {
    configReady.statusTextConfig[key] = getConfigValue(statusTextConfig, key, NO_CONFIGURATION_STATUS_DEFAULT[key]);
  }
  setStatusConfig(configReady, statusConfigInfo2);
  updateStatusContentText(configReady);
};

// src/config/diagonostic.ts
var diagnosticContentTextInfo = { ...DIAGNOSTIC_CONTENT_TEXT };
var updateDiagnosticContentText = (configReady, text, key, bind) => {
  if (text) {
    const match = text.match(regex.ifContentTextHasPlaceholder);
    if (match !== null && Object.hasOwn(regex.diagnosticTextRegex, key)) {
      const regexObject = regex.diagnosticTextRegex[key];
      if (match.length > Object.keys(regexObject).length) {
        configReady.configError.push("statusText." + key);
      }
      let searchObject = {
        nextSearchString: text,
        lastPosition: 0
      };
      diagnosticContentTextInfo[key].contentText = [];
      match.forEach((search, index) => {
        const regexKey = search.match(regex.contentTextKeysOnly);
        if (regexKey) {
          if (Object.hasOwn(regexObject, regexKey[1])) {
            searchPlaceholder(diagnosticContentTextInfo[key], regexKey[1], regexObject[regexKey[1]], searchObject, index === match.length - 1, bind.diagnosticOf);
          } else {
            configReady.configError.push("statusText." + key);
          }
        }
      });
    } else {
      diagnosticContentTextInfo[key].contentText = [text];
    }
  } else {
    diagnosticContentTextInfo[key].contentText = [];
  }
};
var diagnosticConfig = { ...DIAGNOSTIC_CONFIG };
var flushDiagnosticConfig = () => {
  Object.assign(diagnosticContentTextInfo, DIAGNOSTIC_CONTENT_TEXT);
  Object.assign(diagnosticConfig, DIAGNOSTIC_CONFIG);
};
var updateDiagnosticConfig = (configReady, decorationState2) => {
  flushDiagnosticConfig();
  const sectionName = configReady.name + "." + "diagnosticText" /* DIAGNOSTIC_TEXT */;
  const diagnosticConfigSection = getWorkspaceConfiguration(sectionName);
  Object.entries(diagnosticConfig).forEach(([key, section]) => {
    if (section === void 0) {
      const configValue = getConfigValue(diagnosticConfigSection, key, "test");
      if (key.toLowerCase().includes("contenttext")) {
        const bind = bindDiagnosticContentTextState(key);
        updateDiagnosticContentText(configReady, configValue, key, bind);
        bind.diagnosticTextState(diagnosticContentTextInfo);
      }
      diagnosticConfig[key] = configValue;
    } else {
      const nestedSectionName = configReady.name + "." + "diagnosticText" /* DIAGNOSTIC_TEXT */ + "." + key;
      const diagnosticConfigNestedSection = getWorkspaceConfiguration(nestedSectionName);
      Object.entries(section).forEach(([sKey, value]) => {
        diagnosticConfig[key][sKey] = getConfigValue(diagnosticConfigNestedSection, sKey, "test");
      });
    }
  });
};

// src/config/config.ts
var configInfo = { ...CONFIG_INFO };
var statusConfigInfo = { ...STATUS_INFO };
var decorationState = { ...DECORATION_STATE };
var getConfigString = (configReady) => {
  return Object.values(CONFIG_SECTION).reduce((sectionConfing, section) => {
    const extensionConfig = getWorkspaceConfiguration(configReady.name + "." + section);
    const sectionConfingString = Object.entries(extensionConfig).reduce((configValue, [key, infoProp]) => {
      if (typeof infoProp === "string" || typeof infoProp === "number" || typeof infoProp === "boolean") {
        configValue.push(infoProp);
      }
      return configValue;
    }, []).join("");
    sectionConfing.push(sectionConfingString);
    return sectionConfing;
  }, []).join("");
};
var getConfigHash = (configReady) => {
  const configString = getConfigString(configReady);
  return fnv1aHash(configString);
};
var setConfigHashKey = (configReady) => {
  configReady.configHashKey = fnv1aHash(getConfigString(configReady));
};
var ifConfigChanged = (configReady) => {
  const configHash = getConfigHash(configReady);
  if (configReady.configHashKey === configHash) {
    return false;
  } else {
    if (decorationState.appliedDecoration.editorDecoration) {
      decorationState.appliedDecoration.applied = void 0;
      disposeDecoration(decorationState.appliedDecoration.editorDecoration);
    }
    configReady.configError = [];
    configReady.configHashKey = configHash;
    if (configReady.configError.length === 0) {
      sendAutoDismissMessage("Config has been changed. Reloading configuration. (Messaage Dismiss in 2 second.)" /* RELOADING_CONFIG */, 1500);
    }
    return true;
  }
};
var updateEditorConfiguration = () => {
  const editorConfig = getWorkspaceConfiguration("editor");
  editorConfig.update("renderLineHighlight", "gutter", vscode7.ConfigurationTarget.Global);
  editorConfig.update("roundedSelection", false, vscode7.ConfigurationTarget.Global);
};
var initializeConfig = (context) => {
  const name = context.extension.packageJSON.name;
  if (!name) {
    return;
  }
  configInfo.name = name;
  if (!configInfo.name) {
    return;
  }
  const configReady = configInfo;
  if (!configReady.configError) {
    configReady.configError = [];
    patchConfig(configReady);
  }
  if (!configReady.configHashKey) {
    setConfigHashKey(configReady);
    updateEditorConfiguration();
  } else {
    if (!ifConfigChanged(configReady)) {
      return {
        config: configReady,
        decoration: decorationState,
        status: statusConfigInfo
      };
    }
  }
  if (createDecorationTypeBuilder(configReady, statusConfigInfo, decorationState)) {
    if (configReady.generalConfigInfo.statusTextEnabled) {
      updateStatusTextConfig(configReady, statusConfigInfo, decorationState);
    }
    if (configReady.generalConfigInfo.diagnosticTextEnabled) {
      updateDiagnosticConfig(configReady, decorationState);
    }
    return {
      config: configReady,
      decoration: decorationState,
      status: statusConfigInfo
    };
  }
  return;
};

// src/event.ts
var vscode9 = __toESM(require("vscode"));

// src/error.ts
var vscode8 = __toESM(require("vscode"));
var fixConfiguration = (confingError) => {
  vscode8.window.showErrorMessage(
    "Invalid Value(s) in Configuration.",
    ...["Fix Configuration", "Ignore"]
  ).then((selection) => {
    if (selection === "Fix Configuration") {
      vscode8.commands.executeCommand("workbench.action.openSettings", confingError.join(" "));
    }
  });
};

// src/editor/editor.ts
var editorIndentOption = (statusInfo, editor) => {
  statusInfo.indent.size = Number(editor.options.tabSize ?? editor.options.indentSize ?? 4);
  statusInfo.indent.type = editor.options.insertSpaces ? "\n" : "	";
  statusInfo.indent.regex = editor.options.insertSpaces ? regex.indentAndEOLRegex(statusInfo.indent.size) : regex.tagtAndEOLRegex;
};
var getSelectionType = (editor) => {
  if (editor.selections.length === 1) {
    if (editor.selections[0].isEmpty) {
      return DECORATION_INFO.CURSOR_ONLY;
    } else {
      if (editor.selections[0].isSingleLine) {
        return DECORATION_INFO.SINGLE_LINE;
      } else {
        return DECORATION_INFO.MULTI_LINE;
      }
    }
  } else if (editor.selections.length > 1) {
    return DECORATION_INFO.MULTI_CURSOR;
  }
};

// src/event.ts
var onActiveWindowChange = (configInfo2, statusInfo, decorationState2) => {
  return vscode9.window.onDidChangeWindowState((event) => {
    if (event.focused) {
      if (vscode9.window.activeTextEditor) {
        setDecorationOnEditor({
          editor: vscode9.window.activeTextEditor,
          configInfo: configInfo2,
          statusInfo,
          decorationState: decorationState2,
          decorationInfo: DECORATION_INFO.CURSOR_ONLY
        });
      }
    } else {
      vscode9.window.visibleTextEditors.forEach((editor) => {
        resetDecorationWrapper(decorationState2, editor, true);
      });
    }
  });
};
var activeEditorChanged = (configInfo2, statusInfo, decorationState2) => {
  return vscode9.window.onDidChangeActiveTextEditor((editor) => {
    if (editor) {
      if (configInfo2.configError.length > 0) {
        fixConfiguration(configInfo2.configError);
      }
      editorIndentOption(statusInfo, editor);
      vscode9.window.visibleTextEditors.forEach((editor2) => {
        if (decorationState2.appliedDecoration.editorDecoration !== void 0) {
          decorationState2.appliedDecoration.editorDecoration.forEach((decoration) => {
            applyDecoration(editor2, decoration, []);
          });
        }
      });
      setDecorationOnEditor({
        editor,
        configInfo: configInfo2,
        statusInfo,
        decorationState: decorationState2,
        decorationInfo: DECORATION_INFO.CURSOR_ONLY
      });
    }
  });
};
var editorOptionChange = (statusInfo) => {
  return vscode9.window.onDidChangeTextEditorOptions((event) => {
    editorIndentOption(statusInfo, event.textEditor);
  });
};
var selectionChanged = (configInfo2, statusInfo, decorationState2) => {
  return vscode9.window.onDidChangeTextEditorSelection((event) => {
    if (event.selections) {
      const decorationInfo = getSelectionType(event.textEditor);
      if (!decorationInfo) {
        return;
      }
      isDecorationChanged(event.textEditor, decorationState2, decorationInfo);
      if (!decorationState2.decorationList[decorationInfo.KEY]) {
        return;
      }
      setDecorationOnEditor({
        editor: event.textEditor,
        configInfo: configInfo2,
        statusInfo,
        decorationState: decorationState2,
        decorationInfo
      });
    }
  });
};
var diagnosticChanged = (editor) => {
  return vscode9.languages.onDidChangeDiagnostics((event) => {
    if (editor) {
      updateDiagonosticState();
    }
  });
};
var configChanged = (context) => {
  return vscode9.workspace.onDidChangeConfiguration((event) => {
    if (event) {
      const loadConfig = initializeConfig(context);
    }
  });
};

// src/activate.ts
var initialize = async (context) => {
  try {
    await context.extension.activate();
    const loadConfig = initializeConfig(context);
    if (!loadConfig) {
      console.error("Failed to initialize config.");
      return;
    }
    const configInfo2 = loadConfig.config;
    const statusInfo = loadConfig.status;
    const decorationState2 = loadConfig.decoration;
    if (!decorationState2.decorationList) {
      console.error("Failed to initialize decorationList.");
      return;
    }
    const activeEditor = vscode10.window.activeTextEditor;
    if (configInfo2.configError.length > 0) {
      fixConfiguration(configInfo2.configError);
    }
    if (activeEditor) {
      updateDiagonosticState();
      setDecorationOnEditor({
        editor: activeEditor,
        configInfo: configInfo2,
        statusInfo,
        decorationInfo: DECORATION_INFO.CURSOR_ONLY,
        decorationState: decorationState2
      });
    }
    return [
      onActiveWindowChange(configInfo2, statusInfo, decorationState2),
      activeEditorChanged(configInfo2, statusInfo, decorationState2),
      selectionChanged(configInfo2, statusInfo, decorationState2),
      // event.visibleRangeChanged(),
      diagnosticChanged(activeEditor),
      editorOptionChange(statusInfo),
      configChanged(context)
    ];
  } catch (err) {
    console.error("Error during extension activation: ", err);
    vscode10.window.showErrorMessage("Extension activation failed!", err);
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
