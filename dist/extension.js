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
var vscode9 = __toESM(require("vscode"));

// src/config/config.ts
var vscode6 = __toESM(require("vscode"));

// src/constant/object.ts
var CONFIG_INFO = {
  name: void 0,
  configHashKey: void 0,
  generalConfigInfo: {
    borderOpacity: void 0,
    backgroundOpacity: void 0,
    statusTextEnabled: void 0
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
  statusText: void 0
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
var DECORATION_STYLE_PREFIX = {
  CURSOR_ONLY: "cursorOnly",
  SINGLE_LINE: "singleLine",
  MULTI_LINE: "multiLine",
  MULTI_CURSOR: "multiCursor"
};
var NO_CONFIGURATION_GENERAL_DEFAULT = {
  ["borderOpacity" /* OPACITY */]: 1,
  ["backgroundOpacity" /* BACKGROUND_OPACITY */]: 0.5,
  ["statusTextEnabled" /* STATUS_TEXT_ENABLED */]: true
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

// src/config/status.ts
var vscode4 = __toESM(require("vscode"));

// src/util/util.ts
var vscode = __toESM(require("vscode"));
var getWorkspaceConfiguration = (section) => vscode.workspace.getConfiguration(section);
var sendAutoDismissMessage = (text, dismiss) => {
  const message = vscode.window.showInformationMessage(text);
  setTimeout(() => {
    message?.then(() => {
    });
  }, dismiss);
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
var regex = {
  indentAndEOLRegex: (indentSize) => new RegExp(`^( {${indentSize}}|[\r
]+)*$`, "gm"),
  tagtAndEOLRegex: /(\t|[\r\n]+)*$/gm,
  isValidHexColor: /^#[A-Fa-f0-9]{6}$/,
  isValidWidth: /^[0-9]px$|^[0-9]em$/,
  ifStatusContentTextHasPlaceholder: /(\${[A-z]*})/g,
  statusTextKeysOnly: /\${([^{}]+)}/s,
  statusContentText: statusTextRegex
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
  console.log(str, match);
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

// src/editor.ts
var vscode2 = __toESM(require("vscode"));
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
var createRangeNNNN = (startLine, startChar, endLine, endChar) => {
  return new vscode2.Range(new vscode2.Position(startLine, startChar), new vscode2.Position(endLine, endChar));
};
var createRangeSPEP = (start, end) => {
  return new vscode2.Range(start, end);
};
var createRangeNNEP = (line, startChar, end) => {
  return new vscode2.Range(new vscode2.Position(line, startChar), end);
};

// src/decoration.ts
var vscode3 = __toESM(require("vscode"));

// src/selection.ts
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

// src/decoration.ts
var applyDecoration = (editor, decoraiton, range) => editor.setDecorations(decoraiton, range);
var createEditorDecorationType = (styleAppliedConfig) => vscode3.window.createTextEditorDecorationType(styleAppliedConfig);
var disposeDecoration = (decorationList) => decorationList.forEach((decorationType) => {
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
    decorationWithRange.forEach(({ decoration, range }) => {
      applyDecoration(editor, decoration, range);
    });
  }
};

// src/status.ts
var cursorOnlyContentTextState = [];
var singleLineContentTextState = [];
var multiLineCursorContentTextState = [];
var multiLineAnchorContentTextState = [];
var multiCursorContentTextState = [];
var contentTextState = {
  ["cursorOnlyText" /* CURSOR_ONLY_TEXT */]: (statusContentText2) => {
    if (statusContentText2["cursorOnlyText" /* CURSOR_ONLY_TEXT */].contentText) {
      cursorOnlyContentTextState.length = 0;
      cursorOnlyContentTextState.push(...statusContentText2["cursorOnlyText" /* CURSOR_ONLY_TEXT */].contentText);
    }
  },
  ["singleLineText" /* SINGLE_LINE_TEXT */]: (statusContentText2) => {
    if (statusContentText2["singleLineText" /* SINGLE_LINE_TEXT */].contentText) {
      singleLineContentTextState.length = 0;
      singleLineContentTextState.push(...statusContentText2["singleLineText" /* SINGLE_LINE_TEXT */].contentText);
    }
  },
  ["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */]: (statusContentText2) => {
    if (statusContentText2["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */].contentText) {
      multiLineCursorContentTextState.length = 0;
      multiLineCursorContentTextState.push(...statusContentText2["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */].contentText);
    }
  },
  ["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */]: (statusContentText2) => {
    if (statusContentText2["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */].contentText) {
      multiLineAnchorContentTextState.length = 0;
      multiLineAnchorContentTextState.push(...statusContentText2["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */].contentText);
    }
  },
  ["multiCursorText" /* MULTI_CURSOR_TEXT */]: (statusContentText2) => {
    if (statusContentText2["multiCursorText" /* MULTI_CURSOR_TEXT */].contentText) {
      multiCursorContentTextState.length = 0;
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
var disposeStatusInfo = (decorationState2) => {
  if (decorationState2.statusText) {
    let length = decorationState2.statusText.length;
    while (length--) {
      decorationState2.statusText[length].dispose();
    }
    decorationState2.statusText = void 0;
  }
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
  disposeStatusInfo(decorationState2);
  decorationState2.statusText = statusInfoList;
};
var bindContentTextState = (type) => {
  return {
    statusOf: statusOf[type],
    contentTextState: contentTextState[type]
  };
};

// src/config/status.ts
var statusContentText = { ...STATUS_CONTENT_TEXT };
var setStatusConfig = (configReady, statusConfigInfo2) => {
  const editorConfig = vscode4.workspace.getConfiguration("editor");
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
    statusConfigInfo2.statusDecoration.rangeBehavior = vscode4.DecorationRangeBehavior.ClosedClosed;
    statusConfigInfo2.statusDecoration.after.color = hexToRgbaStringLiteral(textColor, textOpacity, defaultColor, defaultOpacity);
    statusConfigInfo2.statusDecoration.after.backgroundColor = configReady.statusTextConfig.backgroundColor;
    statusConfigInfo2.statusDecoration.after.fontWeight = configReady.statusTextConfig.fontWeight;
    statusConfigInfo2.statusDecoration.after.fontStyle = configReady.statusTextConfig.fontStyle;
  }
};
var castToFuncSignature = (result) => {
  if (result) {
    return {
      ...result,
      array: result.array.filter((entry) => entry !== void 0)
    };
  }
};
var searchPlaceholder = (obj, key, regex2, searchObject, lastIndex, statusOf2) => {
  const split = castToFuncSignature(splitAndPosition(searchObject.nextSearchString, regex2));
  if (split) {
    if (Object.hasOwn(statusOf2, key)) {
      split.array[split.position] = statusOf2[key];
    }
    if (lastIndex) {
      obj.contentText?.push(...split.array);
      obj[key] = searchObject.lastPosition + split.position;
    } else {
      if (split.position === 0) {
        obj.contentText?.push(split.array[0]);
        obj[key] = searchObject.lastPosition + split.position;
        searchObject.nextSearchString = split.array[1];
        searchObject.lastPosition = searchObject.lastPosition + split.position + 1;
      } else if (split.position === 1 && split.array.length === 2) {
        obj[key] = searchObject.lastPosition + split.position;
        obj.contentText?.push(...split.array);
      } else if (split.position === 1 && split.array.length === 3) {
        obj.contentText?.push(split.array[0], split.array[1]);
        obj[key] = searchObject.lastPosition + split.position;
        searchObject.nextSearchString = split.array[2];
        searchObject.lastPosition = searchObject.lastPosition + split.position + 1;
      }
    }
  }
};
var updateStatusContentText = (configReady) => {
  if (configReady.generalConfigInfo.statusTextEnabled) {
    Object.entries(statusContentText).forEach(([type, contentTextInfo]) => {
      const statusText2 = configReady.statusTextConfig;
      const regexObject = regex.statusContentText[type];
      const bind = bindContentTextState(type);
      statusContentText[type].contentText = [];
      const match = statusText2[type].match(regex.ifStatusContentTextHasPlaceholder);
      if (match) {
        if (match > Object.keys(regexObject).length) {
          configReady.configError.push("statusText." + type);
        }
        let searchObject = {
          nextSearchString: statusText2[type],
          lastPosition: 0
        };
        match.forEach((search, index) => {
          const regexKey = search.match(regex.statusTextKeysOnly);
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
    console.log(statusContentText);
  }
};

// src/config/decoration.ts
var checkConfigKeyAndCast = (key, config) => {
  return key;
};
var getConfigValue = (configReady, configSection, configName, defaultValue) => {
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
var getConfigSet = (configReady, decorationKey) => {
  const configSectionName = DECORATION_STYLE_PREFIX[decorationKey];
  const defaultConfigDefinition = NO_CONFIGURATION_DEOCORATION_DEFAULT[decorationKey];
  const configSection = getWorkspaceConfiguration(configReady.name + "." + configSectionName);
  return Object.entries(defaultConfigDefinition).reduce((config, [configName, defaultValue]) => {
    const configValue = getConfigValue(configReady, configSection, checkConfigKeyAndCast(configName, defaultConfigDefinition), defaultValue);
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
var createDecorationTypeBuilder = (configReady, statusConfigInfo2, decorationState2) => {
  const generalConfig = getWorkspaceConfiguration(configReady.name + "." + CONFIG_SECTION.general);
  for (const key in configReady.generalConfigInfo) {
    configReady.generalConfigInfo[key] = getConfigValue(configReady, generalConfig, key, NO_CONFIGURATION_GENERAL_DEFAULT[key]);
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
  if (configReady.generalConfigInfo.statusTextEnabled) {
    if (decorationState2.statusText) {
      disposeStatusInfo(decorationState2);
    }
    const statusTextConfig = getWorkspaceConfiguration(configReady.name + "." + CONFIG_SECTION.statusText);
    for (const key in configReady.statusTextConfig) {
      configReady.statusTextConfig[key] = getConfigValue(configReady, statusTextConfig, key, NO_CONFIGURATION_STATUS_DEFAULT[key]);
    }
    setStatusConfig(configReady, statusConfigInfo2);
    updateStatusContentText(configReady);
  }
  return true;
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
  editorConfig.update("renderLineHighlight", "gutter", vscode6.ConfigurationTarget.Global);
  editorConfig.update("roundedSelection", false, vscode6.ConfigurationTarget.Global);
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
    return {
      config: configReady,
      decoration: decorationState,
      status: statusConfigInfo
    };
  }
  return;
};

// src/event.ts
var vscode8 = __toESM(require("vscode"));

// src/error.ts
var vscode7 = __toESM(require("vscode"));
var fixConfiguration = (confingError) => {
  vscode7.window.showErrorMessage(
    "Invalid Value(s) in Configuration.",
    ...["Fix Configuration", "Ignore"]
  ).then((selection) => {
    if (selection === "Fix Configuration") {
      vscode7.commands.executeCommand("workbench.action.openSettings", confingError.join(" "));
    }
  });
};

// src/event.ts
var onActiveWindowChange = (configInfo2, statusInfo, decorationState2) => {
  return vscode8.window.onDidChangeWindowState((event) => {
    console.log("onDidChangeWindowState");
    if (event.focused) {
      if (vscode8.window.activeTextEditor) {
        setDecorationOnEditor({
          editor: vscode8.window.activeTextEditor,
          configInfo: configInfo2,
          statusInfo,
          decorationState: decorationState2,
          decorationInfo: DECORATION_INFO.CURSOR_ONLY
        });
      }
    } else {
      vscode8.window.visibleTextEditors.forEach((editor) => {
        resetDecorationWrapper(decorationState2, editor, true);
      });
    }
  });
};
var activeEditorChanged = (configInfo2, statusInfo, decorationState2) => {
  return vscode8.window.onDidChangeActiveTextEditor((editor) => {
    console.log("onDidChangeActiveTextEditor");
    if (editor) {
      if (configInfo2.configError.length > 0) {
        fixConfiguration(configInfo2.configError);
      }
      editorIndentOption(statusInfo, editor);
      vscode8.window.visibleTextEditors.forEach((editor2) => {
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
  return vscode8.window.onDidChangeTextEditorOptions((event) => {
    editorIndentOption(statusInfo, event.textEditor);
  });
};
var selectionChanged = (configInfo2, statusInfo, decorationState2) => {
  return vscode8.window.onDidChangeTextEditorSelection((event) => {
    console.log("onDidChangeTextEditorSelection");
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
var configChanged = (context) => {
  return vscode8.workspace.onDidChangeConfiguration((event) => {
    console.log("onDidChangeConfiguration");
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
    const activeEditor = vscode9.window.activeTextEditor;
    if (configInfo2.configError.length > 0) {
      fixConfiguration(configInfo2.configError);
    }
    if (activeEditor) {
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
      editorOptionChange(statusInfo),
      configChanged(context)
    ];
  } catch (err) {
    console.error("Error during extension activation: ", err);
    vscode9.window.showErrorMessage("Extension activation failed!", err);
  }
};

// src/extension.ts
function activate(context) {
  initialize(context).then((event) => {
    if (event) {
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
