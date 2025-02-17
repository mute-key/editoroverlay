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

// src/cursor.ts
var vscode3 = __toESM(require("vscode"));

// src/config.ts
var vscode2 = __toESM(require("vscode"));

// src/util.ts
var vscode = __toESM(require("vscode"));
var sendAutoDismissMessage = (text, dissMissTimer) => {
  const message = vscode.window.showInformationMessage(text);
  setTimeout(() => {
    message?.then(() => {
    });
  }, dissMissTimer);
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
var capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
var hexToRgbaStringLiteral = (hex, opacity) => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map((x) => x + x).join("");
  }
  const regex = /^[0-9A-Fa-f]{6}$/;
  if (!regex.test(hex)) {
    return null;
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// src/constant.ts
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
  ["backgroundOpacity" /* BACKGROUND_OPACITY */]: 0.5
};
var NO_CONFIGURATION_DEOCORATION_DEFAULT = {
  ["CURSOR_ONLY" /* CURSOR_ONLY */]: {
    ["isWholeLine" /* IS_WHOLE_LINE */]: true,
    ["borderWidth" /* BORDER_WIDTH */]: "3px",
    ["borderStyle" /* BORDER_STYLE */]: "dotted",
    ["borderColor" /* BORDER_COLOR */]: "#ff0000",
    ["borderPosition" /* BORDER_POSITION */]: "bottom",
    ["backgroundColor" /* BACKGROUND_COLOR */]: "#ff0000"
  },
  ["SINGLE_LINE" /* SINGLE_LINE */]: {
    ["isWholeLine" /* IS_WHOLE_LINE */]: false,
    ["borderWidth" /* BORDER_WIDTH */]: "3px",
    ["borderStyle" /* BORDER_STYLE */]: "dotted",
    ["borderColor" /* BORDER_COLOR */]: "#ff0000",
    ["borderPosition" /* BORDER_POSITION */]: "bottom",
    ["backgroundColor" /* BACKGROUND_COLOR */]: "#ff0000"
  },
  ["MULTI_LINE" /* MULTI_LINE */]: {
    ["isWholeLine" /* IS_WHOLE_LINE */]: true,
    ["borderWidth" /* BORDER_WIDTH */]: "3px",
    ["borderStyle" /* BORDER_STYLE */]: "dotted",
    ["borderColor" /* BORDER_COLOR */]: "#ff0000",
    ["borderPosition" /* BORDER_POSITION */]: "bottom",
    ["backgroundColor" /* BACKGROUND_COLOR */]: "#ff0000"
  },
  ["MULTI_CURSOR" /* MULTI_CURSOR */]: {
    ["isWholeLine" /* IS_WHOLE_LINE */]: false,
    ["borderWidth" /* BORDER_WIDTH */]: "3px",
    ["borderStyle" /* BORDER_STYLE */]: "dotted",
    ["borderColor" /* BORDER_COLOR */]: "#ff0000",
    ["borderPosition" /* BORDER_POSITION */]: "bottom",
    ["backgroundColor" /* BACKGROUND_COLOR */]: "#ff0000"
  }
};

// src/config.ts
var configInfo = {
  name: void 0,
  config: void 0,
  configHashKey: void 0,
  decorationList: {
    CURSOR_ONLY: void 0,
    SINGLE_LINE: void 0,
    MULTI_LINE: void 0,
    MULTI_CURSOR: void 0
  },
  generalConfig: {
    borderOpacity: void 0,
    backgroundOpacity: void 0,
    borderWidth: void 0,
    borderColor: void 0,
    backgroundColor: void 0
  },
  borderPositionInfo: {
    CURSOR_ONLY: void 0,
    SINGLE_LINE: void 0,
    MULTI_LINE: void 0,
    MULTI_CURSOR: void 0
  }
};
var getConfigString = (configReady) => Object.entries(configReady.config).reduce((acc, [key, infoProp]) => {
  if (typeof infoProp === "string" || typeof infoProp === "number") {
    acc.push(infoProp);
  }
  return acc;
}, []).join("");
var getConfigHash = (configReady) => {
  const configString = getConfigString(configReady);
  return fnv1aHash(configString);
};
var ifConfigChanged = (configReady) => {
  const configHash = getConfigHash(configReady);
  if (configReady.configHashKey === configHash) {
    return false;
  } else {
    configReady.config = vscode2.workspace.getConfiguration(configReady.name);
    configReady.configHashKey = configHash;
    sendAutoDismissMessage("Config has been changed. Reloading configuration. (Messaage Dismiss in 2 second.)" /* RELOADING_CONFIG */, 1500);
    return true;
  }
};
var setConfigHashKey = (configInfo2) => {
  configInfo2.configHashKey = fnv1aHash(getConfigString(configInfo2));
};
var updateEditorConfiguration = () => {
  const editorConfig = vscode2.workspace.getConfiguration("editor");
  editorConfig.update("renderLineHighlight", "gutter", vscode2.ConfigurationTarget.Global);
  editorConfig.update("roundedSelection", false, vscode2.ConfigurationTarget.Global);
  editorConfig.update("cursorBlinking", "phase", vscode2.ConfigurationTarget.Global);
};
var initialiseConfig = (context) => {
  const name = context.extension.packageJSON.name;
  if (!name) {
    return;
  }
  configInfo.name = name;
  configInfo.config = vscode2.workspace.getConfiguration(configInfo.name);
  if (!configInfo.name && !configInfo.config) {
    return;
  }
  const configReady = configInfo;
  if (!configReady.configHashKey) {
    setConfigHashKey(configReady);
    updateEditorConfiguration();
  } else {
    if (!ifConfigChanged(configReady)) {
      return;
    }
    ;
  }
  if (createDecorationTypeBuilder(configReady)) {
    return configReady;
  }
  return;
};
var getConfigValue = (configInfo2, prefix, configName, defaultValue) => {
  try {
    const value = configInfo2.config.get(prefix + configName, defaultValue);
    if (value === void 0) {
      console.warn(`Config value for ${configName} is undefined or caused an error. Using default value.`);
    }
    return value ?? defaultValue;
  } catch (err) {
    console.error(`Failed to get config value for ${configName}:`, err);
    return defaultValue;
  }
};
var getConfigSet = (configInfo2, decorationKey) => {
  const CONFIG_PREFIX = DECORATION_STYLE_PREFIX[decorationKey];
  return Object.entries(NO_CONFIGURATION_DEOCORATION_DEFAULT[decorationKey]).reduce((acc, [key, defaultValue]) => {
    const keyName = capitalize(key);
    const configValue = getConfigValue(configInfo2, CONFIG_PREFIX, keyName, defaultValue);
    if (configValue !== void 0) {
      if (key === "borderColor") {
        const rgba = hexToRgbaStringLiteral(configValue, configInfo2.generalConfig.borderOpacity);
        if (rgba) {
          acc[key] = rgba;
        }
      } else if (key === "backgroundColor") {
        const rgba = hexToRgbaStringLiteral(configValue, configInfo2.generalConfig.backgroundOpacity);
        if (rgba) {
          acc[key] = rgba;
        }
      } else {
        acc[key] = configValue;
      }
    }
    return acc;
  }, {});
};
var createDecorationType = (config, decorationKey) => (decorationTypeSplit2) => {
  try {
    const split = decorationTypeSplit2(config, decorationKey);
    if (!split || split.length === 0) {
      return;
    }
    const decorationTypeStack = split.reduce((acc, str) => {
      const conf = { ...config };
      conf.borderWidth = str;
      acc.push(conf);
      return acc;
    }, []).reduce((acc, conf) => {
      acc.push(vscode2.window.createTextEditorDecorationType(conf));
      return acc;
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
    if (Object.hasOwn(BORDER_WIDTH_DEFINITION[decorationKey], config.borderPosition)) {
      return borderPosition(config, BORDER_WIDTH_DEFINITION[decorationKey][config.borderPosition]);
    }
  }
  return;
};
var borderPosition = (config, borderWidthMask) => {
  const borderWidth = [];
  for (const bitMask of borderWidthMask) {
    const border = readBits(bitMask, config.borderWidth, "0");
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
var createDecorationTypeBuilder = (configInfo2) => {
  for (const key in configInfo2.generalConfig) {
    if (configInfo2.generalConfig.hasOwnProperty(key)) {
      configInfo2.generalConfig[key] = getConfigValue(configInfo2, "", key, NO_CONFIGURATION_GENERAL_DEFAULT[key]);
    }
  }
  for (const key in configInfo2.decorationList) {
    const selectionType = key;
    const configSet = getConfigSet(configInfo2, selectionType);
    const parsed = borderPositionParser(selectionType, configSet.borderPosition);
    configInfo2.borderPositionInfo[selectionType] = parsed;
    configSet.borderPosition = parsed.borderPosition;
    configSet.isWholeLine = parsed.isWholeLine;
    const decorationTypeList = createDecorationType(configSet, selectionType)(decorationTypeSplit);
    if (!decorationTypeList) {
      return false;
    }
    configInfo2.decorationList[key] = decorationTypeList;
  }
  return true;
};

// src/cursor.ts
var appliedDecoration = {
  applied: void 0,
  editorDecoration: void 0
};
var applyDecoration = (editor, decoraiton, range) => {
  editor.setDecorations(decoraiton, range);
};
var resetDecoration = (decorationList, editor) => (decorationInfo) => {
  if (decorationList[decorationInfo.KEY] && editor) {
    decorationList[decorationInfo.KEY]?.forEach((decorationType) => {
      if (Array.isArray(decorationType)) {
        decorationType.forEach((decorationType2) => {
          applyDecoration(editor, decorationType2, []);
        });
      } else {
        applyDecoration(editor, decorationType, []);
      }
    });
    return true;
  }
  return false;
};
var resetOtherDecoration = (currentDecoration, reset) => Object.values(DECORATION_INFO).filter((info) => currentDecoration.MASK & info.MASK).map((info) => reset(info)).every(Boolean);
var isDecorationChanged = (appliedDecoration2, decorationInfo) => {
  if (appliedDecoration2.applied) {
    if (appliedDecoration2.applied.MASK !== decorationInfo.MASK) {
      appliedDecoration2.applied = decorationInfo;
      return true;
    }
    return false;
  }
  appliedDecoration2.applied = decorationInfo;
  return true;
};
var setDecorationOnEditor = ({ editor, decorationList, decorationInfo, loadConfig }) => {
  const textEditorDecoration = decorationList[decorationInfo.KEY];
  if (textEditorDecoration) {
    appliedDecoration.editorDecoration = textEditorDecoration;
    const decorationWithRange = decorationCoordinator({ editor, decorationList, decorationInfo, loadConfig });
    if (!decorationWithRange) {
      return;
    }
    isDecorationChanged(appliedDecoration, decorationInfo);
    decorationWithRange.forEach(({ decoration, range }) => {
      applyDecoration(editor, decoration, range);
    });
  }
};
var createRangeNNNN = (sLine, sChar, eLine, eChar) => {
  return new vscode3.Range(
    new vscode3.Position(sLine, sChar),
    new vscode3.Position(eLine, eChar)
  );
};
var createRangeSPEP = (start, end) => {
  return new vscode3.Range(start, end);
};
var createRangeLineNNEP = (line, char, end) => {
  return new vscode3.Range(new vscode3.Position(line, char), end);
};
var cursorOnlyDecorationWithRange = ({ editor, borderConfig, textEditorDecoration }) => {
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
        range: [createRangeLineNNEP(
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
    decorationWithRange.push(...[
      {
        decoration: textEditorDecoration[0],
        range: [createRangeSPEP(editor.selection.start, editor.selection.start)]
      },
      {
        decoration: textEditorDecoration[1],
        range: [createRangeSPEP(editor.selection.end, editor.selection.end)]
      }
    ]);
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
        acc.push(new vscode3.Range(selection.start, selection.active));
        return acc;
      }, [])
    },
    {
      decoration: textEditorDecoration[1],
      range: editor.selections.reduce((acc, selection) => {
        acc.push(new vscode3.Range(
          new vscode3.Position(selection.active.line, 0),
          new vscode3.Position(selection.active.line, selection.active.character)
        ));
        return acc;
      }, [])
    }
  ];
};
var decorationCoordinator = ({ editor, decorationList, decorationInfo, loadConfig }) => {
  const textEditorDecoration = decorationList[decorationInfo.KEY];
  if (textEditorDecoration) {
    const borderConfig = loadConfig.borderPositionInfo[decorationInfo.KEY];
    const context = {
      editor,
      borderConfig,
      textEditorDecoration
    };
    if (decorationInfo.MASK & 1 /* CURSOR_ONLY */) {
      return cursorOnlyDecorationWithRange(context);
    } else if (decorationInfo.MASK & 2 /* SINGLE_LINE */) {
      return singelLineDecorationWithRange(context);
    } else if (decorationInfo.MASK & 4 /* MULTI_LINE */) {
      return multiLineDecorationWithRange(context);
    } else if (decorationInfo.MASK & 8 /* MULTI_CURSOR */) {
      return multiCursorDecorationWithRange(context);
    }
  }
  return;
};
var cursorActivate = async (context) => {
  try {
    await context.extension.activate();
    const loadConfig = initialiseConfig(context);
    if (!loadConfig) {
      console.error("Failed to initialize config.");
      return;
    }
    if (!loadConfig.decorationList) {
      console.error("Failed to initialize decorationList.");
      return;
    }
    const activeEditor = vscode3.window.activeTextEditor;
    if (activeEditor) {
      setDecorationOnEditor({
        editor: activeEditor,
        decorationList: loadConfig.decorationList,
        decorationInfo: DECORATION_INFO.CURSOR_ONLY,
        loadConfig
      });
    }
    return [
      activeEditorChanged(loadConfig),
      selectionChanged(loadConfig),
      configChanged(context)
    ];
  } catch (err) {
    console.error("Error during extension activation: ", err);
    vscode3.window.showErrorMessage("Extension activation failed!", err);
  }
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
var activeEditorChanged = (config) => {
  return vscode3.window.onDidChangeActiveTextEditor((editor) => {
    if (editor) {
      vscode3.window.visibleTextEditors.forEach((editor2) => {
        if (appliedDecoration.editorDecoration !== void 0) {
          appliedDecoration.editorDecoration.forEach((decoration) => {
            applyDecoration(editor2, decoration, []);
          });
        }
      });
      setDecorationOnEditor({
        editor,
        decorationList: config.decorationList,
        decorationInfo: DECORATION_INFO.CURSOR_ONLY,
        loadConfig: config
      });
    }
  });
};
var selectionChanged = (config) => {
  return vscode3.window.onDidChangeTextEditorSelection((event) => {
    if (event.selections) {
      const decorationType = getSelectionType(event.textEditor);
      if (!decorationType) {
        return;
      }
      const resetFunction = (decorationInfo) => {
        return resetDecoration(config.decorationList, event.textEditor)(decorationInfo);
      };
      if (isDecorationChanged(appliedDecoration, decorationType)) {
        resetOtherDecoration(DECORATION_INFO.RESET, resetFunction);
      }
      if (!config.decorationList[decorationType.KEY]) {
        return;
      }
      setDecorationOnEditor({
        editor: event.textEditor,
        decorationList: config.decorationList,
        decorationInfo: decorationType,
        loadConfig: config
      });
    }
  });
};
var configChanged = (context) => {
  return vscode3.workspace.onDidChangeConfiguration((event) => {
    if (event) {
      initialiseConfig(context);
    }
  });
};

// src/extension.ts
function activate(context) {
  cursorActivate(context).then((event) => {
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
