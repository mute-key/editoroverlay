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
  ["statusText" /* STATUS_TEXT */]: "statusText" /* STATUS_TEXT */,
  ["cursorOnly" /* CURSOR_ONLY */]: "cursorOnly" /* CURSOR_ONLY */,
  ["singleLine" /* SINGLE_LINE */]: "singleLine" /* SINGLE_LINE */,
  ["multiLine" /* MULTI_LINE */]: "multiLine" /* MULTI_LINE */,
  ["multiCursor" /* MULTI_CURSOR */]: "multiCursor" /* MULTI_CURSOR */,
  ["diagnosticText" /* DIAGNOSTIC_TEXT */]: "diagnosticText" /* DIAGNOSTIC_TEXT */
};
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
var DECORATION_STATE = {
  highlightStyleList: {
    CURSOR_ONLY: void 0,
    SINGLE_LINE: void 0,
    MULTI_LINE: void 0,
    MULTI_CURSOR: void 0
  },
  appliedHighlight: {
    applied: void 0,
    ofDecorationType: void 0
  },
  selectionText: [],
  diagnosticText: [],
  statusInfo: void 0
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
var STATUS_CONTENT_TEXT = {
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
  placeholder: void 0
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

// src/editor/decoration/decoration.ts
var vscode4 = __toESM(require("vscode"));

// src/editor/range.ts
var vscode2 = __toESM(require("vscode"));
var createRangeNNNN = (startLine, startChar, endLine, endChar) => new vscode2.Range(
  new vscode2.Position(startLine, startChar),
  new vscode2.Position(endLine, endChar)
);
var createRangeSPEP = (start, end) => new vscode2.Range(start, end);
var createRangeNNEP = (line, startChar, end) => new vscode2.Range(
  new vscode2.Position(line, startChar),
  end
);
var createCursorRange = (editor2, lineDelta = 0) => new vscode2.Range(
  new vscode2.Position(editor2.selection.end.line + lineDelta, editor2.selection.end.character),
  new vscode2.Position(editor2.selection.end.line + lineDelta, editor2.selection.end.character)
);
var createActiveRange = (editor2) => createRangeSPEP(editor2.selection.active, editor2.selection.active);
var createAnchorRange = (editor2) => createRangeSPEP(editor2.selection.anchor, editor2.selection.anchor);
var createStartEndRangeOfSelection = (selection) => createRangeSPEP(selection.start, selection.end);
var getSelectionType = (editor2) => {
  if (editor2.selections.length === 1) {
    if (editor2.selections[0].isEmpty) {
      return DECORATION_INFO.CURSOR_ONLY;
    } else {
      if (editor2.selections[0].isSingleLine) {
        return DECORATION_INFO.SINGLE_LINE;
      } else {
        return DECORATION_INFO.MULTI_LINE;
      }
    }
  } else if (editor2.selections.length > 1) {
    return DECORATION_INFO.MULTI_CURSOR;
  }
};

// src/editor/decoration/highlight/highlight.ts
var cursorOnlyHighlightRange = (context) => {
  const { editor: editor2, borderConfig, textEditorHighlight } = context;
  if (borderConfig.isWholeLine) {
    return [{
      decoration: textEditorHighlight[0],
      range: [createRangeSPEP(editor2.selection.active, editor2.selection.active)]
    }];
  }
  if (borderConfig.beforeCursor) {
    return [{
      decoration: textEditorHighlight[0],
      range: [createRangeNNNN(editor2.selection.active.line, 0, editor2.selection.active.line, editor2.selection.active.character)]
    }];
  }
  if (borderConfig.afterCursor) {
    return [
      {
        decoration: textEditorHighlight[0],
        range: [createRangeNNEP(
          editor2.selection.active.line,
          editor2.selection.active.character,
          editor2.document.lineAt(editor2.selection.active.line).range.end
        )]
      },
      {
        decoration: textEditorHighlight[1],
        range: [createRangeNNNN(editor2.selection.active.line, 0, editor2.selection.active.line, editor2.selection.active.character)]
      }
    ];
  }
  return [];
};
var singelLineHighlightRange = ({ editor: editor2, textEditorHighlight }) => {
  return [{
    decoration: textEditorHighlight[0],
    range: [createRangeSPEP(editor2.selection.start, editor2.selection.end)]
  }];
};
var multiLineHighlightRange = ({ editor: editor2, borderConfig, textEditorHighlight }) => {
  if (borderConfig.borderPosition === "left") {
    return [{
      decoration: textEditorHighlight[2],
      range: [createRangeNNNN(editor2.selection.start.line, editor2.selection.start.character, editor2.selection.end.line, editor2.selection.end.character)]
    }];
  } else {
    const highlightRange = [];
    highlightRange.push(
      {
        decoration: textEditorHighlight[0],
        range: [createRangeSPEP(editor2.selection.start, editor2.selection.start)]
      },
      {
        decoration: textEditorHighlight[1],
        range: [createRangeSPEP(editor2.selection.end, editor2.selection.end)]
      }
    );
    if (Math.abs(editor2.selection.start.line - editor2.selection.end.line) > 1) {
      highlightRange.push({
        decoration: textEditorHighlight[2],
        range: [createRangeNNNN(editor2.selection.start.line + 1, editor2.selection.start.character, editor2.selection.end.line - 1, editor2.selection.end.character)]
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
        acc.push(createRangeSPEP(selection.start, selection.active));
        return acc;
      }, [])
    },
    {
      decoration: textEditorHighlight[1],
      range: editor2.selections.reduce((acc, selection) => {
        acc.push(createRangeNNNN(selection.active.line, 0, selection.active.line, selection.active.character));
        return acc;
      }, [])
    }
  ];
};
var coordinatorSplit = {
  ["CURSOR_ONLY" /* CURSOR_ONLY */]: (context) => cursorOnlyHighlightRange(context),
  ["SINGLE_LINE" /* SINGLE_LINE */]: (context) => singelLineHighlightRange(context),
  ["MULTI_LINE" /* MULTI_LINE */]: (context) => multiLineHighlightRange(context),
  ["MULTI_CURSOR" /* MULTI_CURSOR */]: (context) => multiCursorHighlightRange(context)
};
var hightlightCoordinator = ({ editor: editor2, configInfo: configInfo2, decorationInfo, decorationState: decorationState2 }) => {
  const textEditorHighlight = decorationState2.highlightStyleList[decorationInfo.KEY];
  const borderConfig = configInfo2.borderPositionInfo[decorationInfo.KEY];
  return coordinatorSplit[decorationInfo.KEY]({
    editor: editor2,
    borderConfig,
    textEditorHighlight
  });
};

// src/editor/decoration/status/selection.ts
var selectionContentText = { ...STATUS_CONTENT_TEXT };
var selectionOf = {
  ["cursorOnlyText" /* CURSOR_ONLY_TEXT */]: {
    ln: ({ editor: editor2 }) => editor2.selection.active.line + 1,
    col: ({ editor: editor2 }) => {
      const col = editor2.selection.active.character + 1;
      const end = editor2.document.lineAt(editor2.selection.active.line).text.length + 1;
      return col === end ? col : col + "/" + end;
    },
    zCol: ({ editor: editor2 }) => {
      const col = editor2.selection.active.character;
      const end = editor2.document.lineAt(editor2.selection.active.line).text.length;
      return col === end ? col : col + "/" + end;
    }
  },
  ["singleLineText" /* SINGLE_LINE_TEXT */]: {
    ln: ({ editor: editor2 }) => editor2.selection.active.line + 1,
    char: ({ editor: editor2 }) => Math.abs(editor2.selection.end.character - editor2.selection.start.character)
  },
  ["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */]: {
    ln: ({ editor: editor2 }) => editor2.selection.active.line + 1,
    lc: ({ editor: editor2 }) => Math.abs(editor2.selection.end.line - editor2.selection.start.line) + 1,
    char: ({ editor: editor2, indent }) => editor2.document.getText(editor2.selection).replace(indent.regex, "").length
  },
  ["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */]: {
    ln: ({ editor: editor2 }) => editor2.selection.anchor.line + 1,
    lc: ({ editor: editor2 }) => Math.abs(editor2.selection.end.line - editor2.selection.start.line) + 1,
    char: ({ editor: editor2, indent }) => editor2.document.getText(editor2.selection).replace(indent.regex, "").length
  },
  ["multiCursorText" /* MULTI_CURSOR_TEXT */]: {
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
  }
};
var contentTextFunc = (context, contentText) => {
  return contentText.map((decorationOption) => {
    if (typeof decorationOption.after.contentText !== "string") {
      const decorationOptionFunc = Object.assign({}, decorationOption);
      decorationOptionFunc.after.contentText = String(decorationOption.after.contentText(context));
      return decorationOptionFunc;
    }
    return decorationOption;
  });
};
var cursorOnlySelection = (context) => {
  return [{
    contentText: contentTextFunc(context, selectionContentText["cursorOnlyText" /* CURSOR_ONLY_TEXT */]),
    range: createActiveRange(context.editor)
  }];
};
var singleLineSelection = (context) => {
  return [{
    contentText: contentTextFunc(context, selectionContentText["singleLineText" /* SINGLE_LINE_TEXT */]),
    range: createActiveRange(context.editor)
  }];
};
var multilineSelection = (context) => {
  return [{
    contentText: contentTextFunc(context, selectionContentText["multiLineAnchorText" /* MULTI_LINE_ANCHOR_TEXT */]),
    range: createAnchorRange(context.editor)
  }, {
    contentText: contentTextFunc(context, selectionContentText["multiLineCursorText" /* MULTI_LINE_CURSOR_TEXT */]),
    range: createActiveRange(context.editor)
  }];
};
var multiCursorSelection = (context) => {
  const statusTextInfo = [];
  const statusLine = [];
  let idx = context.editor.selections.length;
  while (idx--) {
    const lineSet = new Set(statusLine);
    if (lineSet.has(context.editor.selections[idx].end.line)) {
      continue;
    }
    context.idx = idx + 1;
    statusTextInfo.push({
      contentText: contentTextFunc(context, selectionContentText["multiCursorText" /* MULTI_CURSOR_TEXT */]),
      range: createStartEndRangeOfSelection(context.editor.selections[idx])
    });
    statusLine.push(context.editor.selections[idx].end.line);
  }
  return statusTextInfo;
};
var selectionTextInfoSplit = (editor2, indent) => {
  const context = {
    idx: 0,
    editor: editor2,
    indent
  };
  return {
    ["CURSOR_ONLY" /* CURSOR_ONLY */]: () => cursorOnlySelection(context),
    ["SINGLE_LINE" /* SINGLE_LINE */]: () => singleLineSelection(context),
    ["MULTI_LINE" /* MULTI_LINE */]: () => multilineSelection(context),
    ["MULTI_CURSOR" /* MULTI_CURSOR */]: () => multiCursorSelection(context)
  };
};
var selectionInfo = (editor2, indentInfo, type) => {
  return selectionTextInfoSplit(editor2, indentInfo)[type.KEY]();
};
var bindStatusContentTextState = () => {
  return {
    functionOf: selectionOf,
    textOf: selectionContentText
  };
};

// src/editor/decoration/status/diagnostic.ts
var diagnosticContentText = { ...DIAGNOSTIC_CONTENT_TEXT };
var diagnosticVisibility = { ...DIAGNOSTIC_VISIBILITY_CONFIG };
var editorSym = Symbol("editor");
var workspaceSym = Symbol("workspace");
var allOkSym = Symbol("allOk");
var allOkDiagnosticOf = {
  allok: allOkSym
};
var problemDiagnosticOf = {
  editor: editorSym,
  workspace: workspaceSym
};
var notationDiagnosticOf = {
  pre: ({ placeholder }) => placeholder.prefix,
  post: ({ placeholder }) => placeholder.postfix
};
var warningSourceDiagnosticOf = {
  src: ({ state }) => String(state.warning.source)
};
var warningCountDiagnosticOf = {
  wrn: ({ state }) => String(state.warning.total)
};
var errorSourceDiagnosticOf = {
  src: ({ state }) => String(state.error.source)
};
var errorCountDiagnosticOf = {
  err: ({ state }) => String(state.error.total)
};
var diagnosticOf = {
  ["problemPlaceholderContentText" /* PLACEHOLDER_PROBLEM_CONTENT_TEXT */]: problemDiagnosticOf,
  ["allOkPlaceholderContentText" /* PLACEHOLDER_ALL_OK_CONTENT_TEXT */]: allOkDiagnosticOf,
  ["okAllContentText" /* OK_ALL_CONTENT_TEXT */]: notationDiagnosticOf,
  ["okWorkspaceContentText" /* OK_WORKSPACE_CONTENT_TEXT */]: notationDiagnosticOf,
  ["okEditorContentText" /* OK_EDITOR_CONTENT_TEXT */]: notationDiagnosticOf,
  ["warningWorkspaceContentText" /* WARNING_WORKSPACE_CONTENT_TEXT */]: {
    ...notationDiagnosticOf,
    ...warningSourceDiagnosticOf,
    ...warningCountDiagnosticOf
  },
  ["warningEditorContentText" /* WARNING_EDITOR_CONTENT_TEXT */]: {
    ...notationDiagnosticOf,
    ...warningCountDiagnosticOf
  },
  ["errorWorkspaceContentText" /* ERROR_WORKSPACE_CONTENT_TEXT */]: {
    ...notationDiagnosticOf,
    ...errorSourceDiagnosticOf,
    ...errorCountDiagnosticOf
  },
  ["errorEditorContentText" /* ERROR_EDITOR_CONTENT_TEXT */]: {
    ...notationDiagnosticOf,
    ...errorCountDiagnosticOf
  }
};
var diagonosticMultiStyleDecoration = (diagnosticState2, diagnosticContentTextIs) => {
  if (diagnosticContentTextIs) {
    const context = {
      state: diagnosticState2,
      placeholder: diagnosticContentTextIs.placeholder
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
var buildDiagonosticDecorationLayout = (context) => {
  const { state, textState } = context;
  const highlightStyleList = [];
  if (state.workspace.warning.total + state.workspace.error.total + state.editor.error.total + state.editor.warning.total === 0) {
    textState.layout.allOkPlaceholderContentText.contentText.forEach((decoration) => {
      if (decoration.after.contentText === allOkSym) {
        highlightStyleList.push(...diagonosticMultiStyleDecoration(state, textState.all.okAllContentText));
      }
      const overrideColor = textState.layout.allOkPlaceholderContentText?.override;
      decoration.after.color = overrideColor ? overrideColor[1 /* OK */].color : decoration.after.color;
      highlightStyleList.push(decoration);
    });
    return highlightStyleList;
  }
  textState.layout.problemPlaceholderContentText.contentText.forEach((decoration) => {
    if (decoration.after.contentText === workspaceSym) {
      highlightStyleList.push(...diagnosticBiomeSplit(state.workspace, textState.workspace)["workspace"]());
      return;
    }
    if (decoration.after.contentText === editorSym) {
      highlightStyleList.push(...diagnosticBiomeSplit(state.editor, textState.editor)["editor"]());
      return;
    }
    const overrideColor = textState.layout.problemPlaceholderContentText?.override;
    decoration.after.color = overrideColor ? overrideColor[state.severity].color : decoration.after.color;
    highlightStyleList.push(decoration);
  });
  return highlightStyleList;
};
var diagnosticInfo = (editor2, diagnosticState2) => {
  const context = {
    state: diagnosticState2,
    textState: diagnosticContentText,
    diagnosticVisibility
  };
  return [{
    contentText: buildDiagonosticDecorationLayout(context),
    range: createCursorRange(editor2)
  }];
};
var bindDiagnosticContentTextState = () => {
  return {
    functionOf: diagnosticOf,
    textOf: diagnosticContentText,
    configOf: diagnosticVisibility
  };
};

// src/diagnostic/diagnostic.ts
var vscode3 = __toESM(require("vscode"));
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
    if (diagnostic.severity <= vscode3.DiagnosticSeverity.Warning) {
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
  const diagnostics = vscode3.languages.getDiagnostics();
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
  return vscode4.window.createTextEditorDecorationType(styleAppliedConfig);
};
var disposeDecoration = (highlightStyleList = []) => highlightStyleList.forEach((decorationType) => {
  decorationType.dispose();
});
var resetDecorationRange = (editor2, decorationType) => {
  decorationType?.forEach((decoration) => applyDecoration(editor2, decoration, []));
};
var resetAndDisposeDecoration = (editor2, decorationType) => {
  decorationType?.forEach((decoration) => {
    applyDecoration(editor2, decoration, []);
    decoration.dispose();
  });
};
var resetAllDecoration = (decorationState2) => {
  vscode4.window.visibleTextEditors.forEach((editor2) => {
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
var isDecorationChanged = (editor2, decorationState2, decorationInfo) => {
  if (decorationState2.appliedHighlight.applied && decorationState2.appliedHighlight.applied.MASK !== decorationInfo.MASK) {
    resetDecorationRange(editor2, decorationState2.highlightStyleList[decorationState2.appliedHighlight.applied.KEY]);
    decorationState2.appliedHighlight.applied = decorationInfo;
  }
  decorationState2.appliedHighlight.applied = decorationInfo;
};
var renderStatusInfo = async ({ editor: editor2, configInfo: configInfo2, indentInfo, decorationInfo, decorationState: decorationState2 }) => {
  if (!decorationState2.statusInfo) {
    decorationState2.statusInfo = {
      selectionText: [],
      diagnosticText: []
    };
  }
  if (configInfo2.generalConfigInfo.statusTextEnabled) {
    decorationState2.statusInfo.selectionText = await selectionInfo(editor2, indentInfo, decorationInfo);
  }
  if (configInfo2.generalConfigInfo.diagnosticTextEnabled) {
    decorationState2.statusInfo.diagnosticText = await diagnosticInfo(editor2, updateDiagnostic());
  }
  for (const [key, statusInfo] of Object.entries(decorationState2.statusInfo)) {
    resetAndDisposeDecoration(editor2, decorationState2[key]);
    const statusInfoList = [];
    let length = statusInfo.length;
    while (length--) {
      const status = statusInfo[length];
      statusInfoList.push(...status.contentText.map((decorationOption) => {
        const decoration = createEditorDecorationType(decorationOption);
        applyDecoration(editor2, decoration, [status.range]);
        return decoration;
      }));
    }
    decorationState2[key] = statusInfoList;
  }
};
var setDecorationOnEditor = (context) => {
  const { editor: editor2, decorationInfo, decorationState: decorationState2 } = context;
  const textEditorDecoration = decorationState2.highlightStyleList[decorationInfo.KEY];
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

// src/util/util.ts
var vscode5 = __toESM(require("vscode"));
var getWorkspaceConfiguration = (section) => vscode5.workspace.getConfiguration(section);
var sendAutoDismissMessage = (text, dismiss) => {
  const message = vscode5.window.showInformationMessage(text);
  setTimeout(() => {
    message?.then(() => {
    });
  }, dismiss);
};
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
var fnv1aHash = (str) => {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    hash = hash >>> 0;
  }
  return hash.toString(16);
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

// src/util/regex.collection.ts
var indentAndEOLRegex = (indentSize) => new RegExp(`^( {${indentSize}}|[\r
]+)*$`, "gm");
var ifStringIsResourceScope = /^[%\.].*[%\.]$/s;
var tagtAndEOLRegex = /(\t|[\r\n]+)*$/gm;
var isValidHexColor = /^#[A-Fa-f0-9]{6}$/;
var isValidWidth = /^[0-9]px$|^[0-9]em$/;
var ifContentTextHasPlaceholder = /(\${[A-z]*})/g;
var contentTextKeysOnly = /\${([^{}]+)}/s;
var column = /(\${col})/s;
var zeroColumn = /(\${zCol})/s;
var lineCount = /(\${lc})/s;
var lineNumber = /(\${ln})/s;
var character = /(\${char})/s;
var nth = /(\${nth})/s;
var selectionCount = /(\${count})/s;
var prefix = /(\${pre})/s;
var postfix = /(\${post})/s;
var source = /(\${src})/s;
var warning = /(\${wrn})/s;
var error = /(\${err})/s;
var editor = /(\${editor})/s;
var workspace2 = /(\${workspace})/s;
var allok = /(\${allok})/s;
var okRegex = {
  allok
};
var problemRegex = {
  editor,
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
var statusTextRegex = {
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
var Regex = {
  indentAndEOLRegex,
  resourceScope: ifStringIsResourceScope,
  tagtAndEOLRegex,
  isValidHexColor,
  isValidWidth,
  ifContentTextHasPlaceholder,
  contentTextKeysOnly,
  statusContentText: statusTextRegex,
  diagnosticText: diagnosticTextRegex
};
var regex_collection_default = Regex;

// src/configuration/shared/editor.ts
var vscode6 = __toESM(require("vscode"));
var writeEditorConfiguration = () => {
  const editorConfig = getWorkspaceConfiguration("editor");
  editorConfig.update("renderLineHighlight", "gutter", vscode6.ConfigurationTarget.Global);
  editorConfig.update("roundedSelection", false, vscode6.ConfigurationTarget.Global);
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

// src/configuration/shared/configuration.ts
var setConfigHashKey = (configReady) => {
  configReady.configHashKey = fnv1aHash(getConfigString(configReady));
};
var getConfigHash = (configReady) => {
  const configString = getConfigString(configReady);
  return fnv1aHash(configString);
};
var getConfigString = (configReady) => {
  return Object.values(CONFIG_SECTION).reduce((sectionConfing, section) => {
    const extensionConfig = getWorkspaceConfiguration(configReady.name + "." + section);
    const sectionConfingString = Object.entries(extensionConfig).reduce((configValue, [key, infoProp]) => {
      if (typeof infoProp === "string" || typeof infoProp === "number" || typeof infoProp === "boolean") {
        configValue.push(infoProp);
      } else if (typeof infoProp === "object" && Object.hasOwn(extensionConfig, key)) {
        Object.entries(extensionConfig).forEach(([key2, value]) => configValue.push(value));
      }
      return configValue;
    }, []).join("");
    sectionConfing.push(sectionConfingString);
    return sectionConfing;
  }, []).join("");
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
var getConfigValue = (configSection, configName, defaultValue) => {
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
    console.error(`Failed to get config value for ${configSection + "." + configName}:`, err);
    return defaultValue;
  }
};
var ifConfigurationChanged = (configReady, decorationState2) => {
  const configHash = getConfigHash(configReady);
  if (configReady.configHashKey === configHash) {
    return false;
  } else {
    if (decorationState2.appliedHighlight.ofDecorationType) {
      decorationState2.appliedHighlight.applied = void 0;
      disposeDecoration(decorationState2.appliedHighlight.ofDecorationType);
    }
    configReady.configError = [];
    configReady.configHashKey = configHash;
    if (configReady.configError.length === 0) {
      sendAutoDismissMessage("Config has been changed. Reloading configuration. (Messaage Dismiss in 2 second.)" /* RELOADING_CONFIG */, 1500);
    }
    return true;
  }
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
    const configValue = getConfigValue(configSection, checkConfigKeyAndCast(configName), defaultValue);
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
var generateHighlightDecoration = (configReady, decorationState2) => {
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
  for (const key in decorationState2.highlightStyleList) {
    const selectionType = key;
    if (decorationState2.highlightStyleList[selectionType]) {
      disposeDecoration(decorationState2.highlightStyleList[selectionType]);
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
    decorationState2.highlightStyleList[selectionType] = decorationTypeList;
  }
  return true;
};

// src/configuration/collection/patch.ts
var vscode7 = __toESM(require("vscode"));
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
  return extensionConfig.update(newKey, value, vscode7.ConfigurationTarget.Global);
};
var removeUserSetting = (extensionConfig, key) => {
  return extensionConfig.update(key, void 0, vscode7.ConfigurationTarget.Global);
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
var parseContentText = (contentText, key, bindTo, regexObject) => {
  const match = contentText.match(regex_collection_default.ifContentTextHasPlaceholder);
  if (match !== null && Object.hasOwn(regexObject, key)) {
    if (match.length > Object.keys(regexObject[key]).length) {
    }
    let searchObject = {
      nextSearchString: contentText,
      lastPosition: 0
    };
    bindTo.textOf[key].contentText = [];
    match.forEach((search, index) => {
      const regexKey = search.match(regex_collection_default.contentTextKeysOnly);
      if (regexKey) {
        if (Object.hasOwn(regexObject[key], regexKey[1])) {
          searchPlaceholderPosition(bindTo.textOf[key], bindTo.functionOf[key], regexKey[1], regexObject[key][regexKey[1]], searchObject, index === match.length - 1);
        }
      }
    });
    bindTo.textOf[key].contentText = sanitizeContentText(bindTo.textOf[key].contentText);
  } else {
    bindTo.textOf[key].contentText = [contentText];
  }
};
var convertToDecorationRenderOption = (config, isWholeLine = true, contentText = void 0) => {
  const decorationOption = { ...DECORATION_OPTION_CONFIG };
  decorationOption.isWholeLine = isWholeLine;
  decorationOption.rangeBehavior = vscode8.DecorationRangeBehavior.ClosedOpen;
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

// src/configuration/status/selection.ts
var SelectionDecorationConfig = { ...SELECTION_DECORAITON_CONFIG };
var SelectionDecorationStyle = { ...SELECTION_DECORATION_STYLE };
var convertPositionToDecorationRenderOption = (textPosition) => {
  return textPosition.contentText.map((text, idx) => {
    const option = typeof text === "string" ? SelectionDecorationStyle.placeholderDecorationOption : SelectionDecorationStyle.selectionDecorationOption[textPosition.position[idx]];
    const contentTextRenderOption = setContentTextOnDecorationRenderOption(option, text);
    return contentTextRenderOption;
  }).filter((decorationOption) => decorationOption !== void 0);
};
var buildStatusTextState = (textOftarget, textOfSource, leftMargin) => {
  Object.entries(textOfSource).forEach(([key, textPosition], idx) => {
    textOftarget[key] = convertPositionToDecorationRenderOption(textPosition);
    if (leftMargin && leftMargin !== "0px" || leftMargin !== "0em") {
      console.log(leftMargin);
      textOftarget[key][0].after["margin"] = leftMarginToMarginString(leftMargin);
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
    configReady.name + "." + CONFIG_SECTION.statusText,
    SELECTION_CONTENT_TEXT_LIST,
    bindToBuffer,
    regex_collection_default.statusContentText
  );
  buildSelectionTextDecorationRenderOption(SelectionDecorationConfig, SelectionDecorationStyle);
  buildStatusTextState(bindTo.textOf, bindToBuffer.textOf, SelectionDecorationConfig.leftMargin);
};

// src/configuration/status/diagonostic.ts
var diagnosticConfig = { ...DIAGNOSTIC_CONFIG };
var diagnosticDecorationStyle = { ...DIAGNOSTIC_DECORATION_STYLE };
var positionKeyToPlaceholderName = {
  pre: "prefix",
  post: "postfix"
};
var positionKeyList = ["pre", "post"];
var applyLeftMargin = (textOf, visibility, leftMargin) => {
  if (!leftMargin || leftMargin === "0px" || leftMargin === "0em") {
    return;
  }
  if (typeof textOf.layout.allOkPlaceholderContentText.contentText[0].contentText === "symbol") {
    const marginDecoration = { ...textOf.layout.allOkPlaceholderContentText.contentText[0].contentText };
    marginDecoration.after = { ...textOf.layout.allOkPlaceholderContentText.contentText[0].contentText.after };
    marginDecoration.contentText = "";
    marginDecoration.margin = leftMarginToMarginString(leftMargin);
    textOf.layout.allOkPlaceholderContentText.contentText[0].unshift(marginDecoration);
  } else {
    textOf.layout.allOkPlaceholderContentText.contentText[0].after["margin"] = leftMarginToMarginString(leftMargin);
  }
  if (typeof textOf.layout.problemPlaceholderContentText.contentText[0].contentText === "symbol") {
    const marginDecoration = { ...textOf.layout.problemPlaceholderContentText.contentText[0].contentText };
    marginDecoration.after = { ...textOf.layout.problemPlaceholderContentText.contentText[0].contentText.after };
    marginDecoration.contentText = "";
    marginDecoration.margin = leftMarginToMarginString(leftMargin);
    textOf.layout.problemPlaceholderContentText.contentText[0].unshift(marginDecoration);
  } else {
    textOf.layout.problemPlaceholderContentText.contentText[0].after["margin"] = leftMarginToMarginString(leftMargin);
  }
};
var convertPositionDecorationRenderOption = ({ textPosition, primaryStyle, secondaryStyle, placeholder, leftMargin }) => {
  return textPosition.contentText.map((text, idx) => {
    const key = textPosition.position[idx];
    let decorationStyle = primaryStyle;
    if (positionKeyList.includes(key)) {
      if (!Object.hasOwn(placeholder, positionKeyToPlaceholderName[key])) {
        return;
      }
      decorationStyle = secondaryStyle;
    }
    return setContentTextOnDecorationRenderOption(decorationStyle, text);
  }).filter((decorationOption) => decorationOption !== void 0);
};
var buildDiagnosticTextState = (textOftarget, textOfSource, style, leftMargin = "") => {
  Object.entries(textOfSource).forEach(([contentTextName, textPosition]) => {
    const linker = DECORATION_OPTION_LINKER[contentTextName];
    const context = {
      textPosition,
      primaryStyle: style.diagonosticDecorationOption[linker[0]],
      secondaryStyle: linker[1] ? style.diagonosticDecorationOption[linker[1]] : null,
      placeholder: [],
      leftMargin
    };
    if (Object.hasOwn(textOftarget.workspace, contentTextName)) {
      context.placeholder = textOftarget.workspace[contentTextName].placeholder;
      textOftarget.workspace[contentTextName].contentText = convertPositionDecorationRenderOption(context);
    }
    if (Object.hasOwn(textOftarget.editor, contentTextName)) {
      context.placeholder = textOftarget.editor[contentTextName].placeholder;
      textOftarget.editor[contentTextName].contentText = convertPositionDecorationRenderOption(context);
    }
    if (Object.hasOwn(textOftarget.all, contentTextName)) {
      context.placeholder = textOftarget.all[contentTextName].placeholder;
      textOftarget.all[contentTextName].contentText = convertPositionDecorationRenderOption(context);
    }
    if (Object.hasOwn(textOftarget.layout, contentTextName)) {
      textOftarget.layout[contentTextName].contentText = convertPositionDecorationRenderOption(context);
    }
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
      placeholder: {
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
var buildDiagnosticStyle = (config, style, diagnosticStyleList, visibility, diagnosticBiome) => {
  const ifOverrride = visibility.overrideLayoutPlaceholderColorToHighestSeverity ? {} : void 0;
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
  if (ifOverrride) {
    const requiredColor = diagnosticBiome.workspace | diagnosticBiome.editor;
    const allOkOverrideColor = {};
    const problemOverrideColor = {};
    const okStyleName = "okNotationTextStyle" /* OK_NOTATION_TEXT_STYLE */;
    if (requiredColor & 1 /* OK */ && config[okStyleName]) {
      problemOverrideColor[1 /* OK */] = {};
      problemOverrideColor[1 /* OK */]["color"] = hexToRgbaStringLiteral(config[okStyleName].color, config[okStyleName].colorOpacity, "#333333", 0.7);
      allOkOverrideColor[1 /* OK */] = {};
      allOkOverrideColor[1 /* OK */]["color"] = hexToRgbaStringLiteral(config[okStyleName].color, config[okStyleName].colorOpacity, "#333333", 0.7);
      if (sanitizeConfigValue(config[okStyleName].backgroundColor)) {
        problemOverrideColor[1 /* OK */]["backgroundColor"] = hexToRgbaStringLiteral(config[okStyleName].backgroundColor, config[okStyleName].backgroundOpacity, "#333333", 0.7);
        allOkOverrideColor[1 /* OK */]["backgroundColor"] = hexToRgbaStringLiteral(config[okStyleName].backgroundColor, config[okStyleName].backgroundOpacity, "#333333", 0.7);
      }
    }
    const warnStyleName = "warningNotationTextStyle" /* WARNING_NOTATION_TEXT_STYLE */;
    if (requiredColor & 2 /* WARN */ && config[warnStyleName]) {
      problemOverrideColor[2 /* WARN */] = {};
      problemOverrideColor[2 /* WARN */]["color"] = hexToRgbaStringLiteral(config[warnStyleName].color, config[warnStyleName].colorOpacity, "#333333", 0.7);
      if (sanitizeConfigValue(config[warnStyleName].backgroundColor)) {
        problemOverrideColor[2 /* WARN */]["backgroundColor"] = hexToRgbaStringLiteral(config[warnStyleName].backgroundColor, config[warnStyleName].backgroundOpacity, "#333333", 0.7);
      }
    }
    const errStyleName = "errorNotationTextStyle" /* ERROR_NOTATION_TEXT_STYLE */;
    if (requiredColor & 4 /* ERR */ && config[errStyleName]) {
      problemOverrideColor[4 /* ERR */] = {};
      problemOverrideColor[4 /* ERR */]["color"] = hexToRgbaStringLiteral(config[errStyleName].color, config[errStyleName].colorOpacity, "#333333", 0.7);
      if (sanitizeConfigValue(config[errStyleName].backgroundColor)) {
        problemOverrideColor[4 /* ERR */]["backgroundColor"] = hexToRgbaStringLiteral(config[errStyleName].backgroundColor, config[errStyleName].backgroundOpacity, "#333333", 0.7);
      }
    }
    ifOverrride["problemPlaceholderContentText" /* PLACEHOLDER_PROBLEM_CONTENT_TEXT */] = {
      override: Object.keys(problemOverrideColor).length > 0 ? problemOverrideColor : void 0
    };
    ifOverrride["allOkPlaceholderContentText" /* PLACEHOLDER_ALL_OK_CONTENT_TEXT */] = {
      override: Object.keys(allOkOverrideColor).length > 0 ? allOkOverrideColor : void 0
    };
  }
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
var reversedStyleList = () => {
  const styleList = [...DIAGNOSTIC_STYLE_LIST];
  styleList.reverse().push(["0", "0"]);
  return styleList;
};
var decorationStyleFromBiome = (diagnosticBiome) => readBits(diagnosticBiome, reversedStyleList(), 0, 4).filter((styles) => styles !== 0).flat();
var updateDiagnosticTextConfig = (configReady) => {
  const bindTo = bindDiagnosticContentTextState();
  const bindToBuffer = {
    functionOf: bindTo.functionOf,
    textOf: {}
  };
  workspaceProxyConfiguration(
    diagnosticConfig,
    configReady.name + "." + CONFIG_SECTION.diagnosticText,
    DIAGNOSTIC_CONTENT_TEXT_LIST,
    bindToBuffer,
    regex_collection_default.diagnosticText
  );
  const diagnosticBiome = diagnosticVisibilityBiome(diagnosticConfig.visibility);
  const decorationStyleList = decorationStyleFromBiome(diagnosticBiome.workspace | diagnosticBiome.editor);
  decorationStyleList.push("diagnosticPlaceholderTextStyle" /* DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE */);
  Object.assign(bindTo.textOf, buildDiagnosticStyle(diagnosticConfig, diagnosticDecorationStyle, decorationStyleList, diagnosticConfig.visibility, diagnosticBiome));
  Object.assign(bindTo.configOf, diagnosticConfig.visibility);
  buildDiagnosticTextState(bindTo.textOf, bindToBuffer.textOf, diagnosticDecorationStyle, diagnosticConfig.leftMargin);
  console.log(bindTo.textOf);
  applyLeftMargin(bindTo.textOf, diagnosticConfig.visibility, diagnosticConfig.leftMargin);
};

// src/configuration/load.ts
var configInfo = { ...CONFIG_INFO };
var loaConfiguration = (context) => {
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
  if (!configReady.configHashKey) {
    setConfigHashKey(configReady);
  } else {
    if (!ifConfigurationChanged(configReady, decorationState2)) {
      return {
        config: configReady,
        decoration: decorationState2
      };
    }
  }
  writeEditorConfiguration();
  if (generateHighlightDecoration(configReady, decorationState2)) {
    if (configReady.generalConfigInfo.statusTextEnabled) {
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
var workspaceProxyConfiguration = (config, workspaceConfigSectionName, ifContentTextArray, bindTo, regexObject) => {
  Object.entries(config).forEach(([sectionKey, section]) => {
    if (section === void 0) {
      const configValue = getConfigValue(getWorkspaceConfiguration(workspaceConfigSectionName), sectionKey, "not found");
      if (configValue && regexObject && bindTo && ifContentTextArray && ifContentTextArray.includes(sectionKey)) {
        const contextTextPosition = {
          contentText: [],
          position: {}
        };
        bindTo.textOf[sectionKey] = { ...contextTextPosition };
        parseContentText(configValue, sectionKey, bindTo, regexObject);
      }
      if (Object.hasOwn(config, sectionKey) && configValue) {
        config[sectionKey] = configValue;
      }
    } else if (section && typeof section === "object") {
      workspaceProxyConfiguration(config[sectionKey], workspaceConfigSectionName + "." + sectionKey, ifContentTextArray, bindTo);
    }
  });
};

// src/event/window.ts
var vscode10 = __toESM(require("vscode"));

// src/editor/editor.ts
var editorIndentOption = (editor2) => {
  const indentSize = Number(editor2?.options.tabSize ?? editor2?.options.indentSize ?? 4);
  const indentType = editor2?.options.insertSpaces ? "\n" : "	";
  const editorRegex = editor2?.options.insertSpaces ? regex_collection_default.indentAndEOLRegex(indentSize) : regex_collection_default.tagtAndEOLRegex;
  return {
    size: indentSize ? indentSize : void 0,
    type: indentType ? indentType : void 0,
    regex: editorRegex ? editorRegex : void 0
  };
};
var updateIndentOption = (editor2, indent) => {
  indent.size = Number(editor2.options.tabSize ?? editor2.options.indentSize ?? 4);
  indent.type = editor2.options.insertSpaces ? "\n" : "	";
  indent.regex = editor2.options.insertSpaces ? regex_collection_default.indentAndEOLRegex(indent.size) : regex_collection_default.tagtAndEOLRegex;
};

// src/util/error.ts
var vscode9 = __toESM(require("vscode"));
var fixConfiguration = (confingError) => {
  vscode9.window.showErrorMessage(
    "Invalid Value(s) in Configuration.",
    ...["Fix Configuration", "Ignore"]
  ).then((selection) => {
    if (selection === "Fix Configuration") {
      vscode9.commands.executeCommand("workbench.action.openSettings", confingError.join(" "));
    }
  });
};

// src/event/window.ts
var windowStateChanged = ({ configInfo: configInfo2, indentInfo, decorationState: decorationState2 }) => {
  return vscode10.window.onDidChangeWindowState((event) => {
    if (event.focused) {
      if (vscode10.window.activeTextEditor) {
        setDecorationOnEditor({
          editor: vscode10.window.activeTextEditor,
          configInfo: configInfo2,
          indentInfo,
          decorationState: decorationState2,
          decorationInfo: DECORATION_INFO.CURSOR_ONLY
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
var activeEditorChanged = ({ configInfo: configInfo2, indentInfo, decorationState: decorationState2 }) => {
  return vscode10.window.onDidChangeActiveTextEditor((editor2) => {
    if (editor2) {
      if (configInfo2.configError.length > 0) {
        fixConfiguration(configInfo2.configError);
      }
      updateIndentOption(editor2, indentInfo);
      resetAllDecoration(decorationState2);
      resetEditorDiagnosticStatistics();
      setDecorationOnEditor({
        editor: editor2,
        configInfo: configInfo2,
        indentInfo,
        decorationState: decorationState2,
        decorationInfo: DECORATION_INFO.CURSOR_ONLY
      });
    }
  });
};
var editorOptionChanged = ({ indentInfo }) => {
  return vscode10.window.onDidChangeTextEditorOptions((event) => {
    if (event.textEditor) {
      updateIndentOption(event.textEditor, indentInfo);
    }
  });
};
var selectionChanged = ({ configInfo: configInfo2, indentInfo, decorationState: decorationState2 }) => {
  return vscode10.window.onDidChangeTextEditorSelection((event) => {
    if (event.selections) {
      const decorationInfo = getSelectionType(event.textEditor);
      if (!decorationInfo) {
        return;
      }
      isDecorationChanged(event.textEditor, decorationState2, decorationInfo);
      setDecorationOnEditor({
        editor: event.textEditor,
        configInfo: configInfo2,
        indentInfo,
        decorationState: decorationState2,
        decorationInfo
      });
    }
  });
};

// src/event/workspace.ts
var vscode11 = __toESM(require("vscode"));
var configChanged = (context) => {
  return vscode11.workspace.onDidChangeConfiguration((event) => {
    if (event) {
      const loadConfig = loaConfiguration(context);
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
    const loadConfig = loaConfiguration(extensionContext);
    if (!loadConfig) {
      console.error("Failed to initialize config.");
      return;
    }
    const configInfo2 = loadConfig.config;
    const decorationState2 = loadConfig.decoration;
    if (!decorationState2.highlightStyleList) {
      console.error("Failed to initialize highlightStyleList.");
      return;
    }
    const activeEditor = vscode13.window.activeTextEditor;
    if (configInfo2.configError.length > 0) {
      fixConfiguration(configInfo2.configError);
    }
    const editorContext = {
      editor: activeEditor,
      configInfo: configInfo2,
      indentInfo: editorIndentOption(activeEditor),
      decorationState: decorationState2
    };
    if (activeEditor) {
      editorContext.decorationInfo = DECORATION_INFO.CURSOR_ONLY;
      updateDiagnostic();
      setDecorationOnEditor(editorContext);
    }
    return [
      windowStateChanged(editorContext),
      activeEditorChanged(editorContext),
      selectionChanged(editorContext),
      editorOptionChanged(editorContext),
      diagnosticChanged(editorContext),
      configChanged(extensionContext)
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
