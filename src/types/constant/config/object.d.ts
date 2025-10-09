import type * as D from '../../type/type';
import * as hex from '../numeric/hexadecimal';
import { BORDER_POSITION_MASK, CONFIG_SECTION_KEY, DIAGNOSTIC_SEVERITY_KEY, DIAGNOSTIC_TEXT_STYLE_KEY } from './enum';
export declare const CONFIG_SECTION: {
    readonly general: CONFIG_SECTION_KEY.GENERAL;
    readonly cursorOnly: CONFIG_SECTION_KEY.CURSOR_ONLY;
    readonly singleLine: CONFIG_SECTION_KEY.SINGLE_LINE;
    readonly multiLine: CONFIG_SECTION_KEY.MULTI_LINE;
    readonly multiCursor: CONFIG_SECTION_KEY.MULTI_CURSOR;
    readonly selectionText: CONFIG_SECTION_KEY.SELECTION_TEXT;
    readonly diagnosticText: CONFIG_SECTION_KEY.DIAGNOSTIC_TEXT;
    readonly scmText: CONFIG_SECTION_KEY.SCM_TEXT;
};
export declare const CONFIG_INFO: {
    readonly name: undefined;
    readonly generalConfigInfo: {
        readonly borderOpacity: undefined;
        readonly backgroundOpacity: undefined;
        readonly selectionTextEnabled: undefined;
        readonly diagnosticTextEnabled: undefined;
        readonly scmTextEnabled: undefined;
    };
    readonly configError: undefined;
};
export declare const CONFIG_KEY_LINKER_SECTION_CONFIG: {
    selectionTextEnabled: string[];
    diagnosticTextEnabled: string[];
    scmTextEnabled: string[];
};
export declare const SELECTION_CONTENT_TEXT_NUMLINK_CONFIG: Record<string, D.Numeric.Key.Hex>;
export declare const SELECTION_DECORAITON_CONFIG: {
    readonly enabled: undefined;
    readonly color: undefined;
    readonly colorOpacity: undefined;
    readonly backgroundColor: undefined;
    readonly backgroundOpacity: undefined;
    readonly fontStyle: undefined;
    readonly fontWeight: undefined;
    readonly leftMargin: undefined;
    readonly cursorOnlyText: undefined;
    readonly singleLineText: undefined;
    readonly multiLineCursorText: undefined;
    readonly multiLineAnchorText: undefined;
    readonly multiCursorText: undefined;
    readonly multiCursorEdit: undefined;
    readonly selectionCountTextStyle: {
        readonly ln: undefined;
        readonly col: undefined;
        readonly zCol: undefined;
        readonly char: undefined;
        readonly charOnly: undefined;
        readonly lc: undefined;
        readonly nth: undefined;
        readonly count: undefined;
        readonly opacity: undefined;
        readonly fontStyle: undefined;
        readonly fontWeight: undefined;
    };
};
export declare const DECORATION_STYLE_PREFIX_CONFIG: {
    readonly [hex.cursorOnly]: "cursorOnly";
    readonly [hex.singleLine]: "singleLine";
    readonly [hex.multiLine]: "multiLine";
    readonly [hex.multiCursor]: "multiCursor";
};
export declare const SINGLE_BORDER_SELECTION_CONFIG: {
    readonly none: readonly [BORDER_POSITION_MASK.NONE];
    readonly bottom: readonly [BORDER_POSITION_MASK.BOTTOM, BORDER_POSITION_MASK.NONE];
    readonly "top-bottom": readonly [BORDER_POSITION_MASK.TOP_BOTTOM];
    readonly "top-right-bottom-left": readonly [BORDER_POSITION_MASK.TOP_RIGHT_BOTTOM_LEFT, BORDER_POSITION_MASK.NONE];
    readonly left: readonly [BORDER_POSITION_MASK.LEFT];
};
export declare const MULTILINE_BORDER_SELECTION_CONFIG: {
    readonly none: readonly [BORDER_POSITION_MASK.NONE, BORDER_POSITION_MASK.NONE, BORDER_POSITION_MASK.NONE];
    readonly "top-bottom": readonly [BORDER_POSITION_MASK.TOP, BORDER_POSITION_MASK.BOTTOM, BORDER_POSITION_MASK.NONE];
    readonly left: readonly [BORDER_POSITION_MASK.LEFT, BORDER_POSITION_MASK.LEFT, BORDER_POSITION_MASK.LEFT];
};
export declare const BORDER_WIDTH_DEFINITION_CONFIG: Record<D.Numeric.Key.Hex, any>;
export declare const NO_CONFIGURATION_DEOCORATION_DEFAULT_CONFIG: {
    readonly isWholeLine: false;
    readonly borderWidth: "2px";
    readonly borderStyle: "dotted";
    readonly borderColor: "#ff0000";
    readonly borderPosition: "bottom";
    readonly backgroundColor: "#ff0000";
};
export declare const NO_CONFIGURATION_GENERAL_DEFAULT_CONFIG: Record<string, number | boolean>;
export declare const SELECTION_DEFAULT_CONFIG: {
    readonly selectionTextColor: "#FF0000";
    readonly selectionTextOpacity: 1;
    readonly selectionTextBackgroundColor: null;
    readonly selectionTextFontStyle: "normal";
    readonly selectionTextFontWeight: "bold";
};
export declare const SELECTION_CONTENT_TEXT_LIST_CONFIG: D.Common.Tp.TextList;
export declare const SELECTION_DECORATION_STYLE_CONFIG: {
    readonly leftMargin: undefined;
    readonly placeholderDecorationOption: {};
    readonly selectionDecorationOption: {
        readonly ln: undefined;
        readonly col: undefined;
        readonly zCol: undefined;
        readonly char: undefined;
        readonly charOnly: undefined;
        readonly lc: undefined;
        readonly nth: undefined;
        readonly count: undefined;
    };
};
export declare const DECORATION_OPTION_CONFIG: {
    readonly isWholeLine: undefined;
    readonly rangeBehavior: undefined;
    readonly after: {};
};
export declare const DECORATION_OPTION_AFTER_CONFIG: {
    readonly contentText: undefined;
    readonly color: undefined;
    readonly backgroundColor: undefined;
    readonly fontWeight: undefined;
    readonly fontStyle: undefined;
    readonly textDecoration: undefined;
    readonly margin: undefined;
};
export declare const SELECTION_KIND_CONFIG: D.Decoration.Tp.DecorationInfo;
export declare const DIAGNOSTIC_VISIBILITY_CONFIG: {
    readonly DiagnosticKind: undefined;
    readonly placeTextOnPreviousOrNextLine: undefined;
    readonly overlayCursorPosition: undefined;
    readonly overrideLayoutPlaceholderColorToHighestSeverity: undefined;
    readonly overrideAllOk: undefined;
    readonly autoInlineDatumPoint: undefined;
};
export declare const DIAGNOSTIC_GLYPH_CONFIG: {
    readonly openningBracket: undefined;
    readonly closingBracket: undefined;
    readonly lineEqual: undefined;
    readonly lineUp: undefined;
    readonly lineDown: undefined;
};
export declare const DIAGNOSTIC_PROBLEM_LIST_CONFIG: D.Numeric.Key.Bin[];
export declare const DIAGNOSTIC_CONFIG: {
    readonly enabled: undefined;
    readonly leftMargin: undefined;
    readonly visibility: {
        readonly DiagnosticKind: undefined;
        readonly placeTextOnPreviousOrNextLine: undefined;
        readonly overlayCursorPosition: undefined;
        readonly overrideLayoutPlaceholderColorToHighestSeverity: undefined;
        readonly overrideAllOk: undefined;
        readonly autoInlineDatumPoint: undefined;
    };
    readonly glyphList: {
        readonly openningBracket: undefined;
        readonly closingBracket: undefined;
        readonly lineEqual: undefined;
        readonly lineUp: undefined;
        readonly lineDown: undefined;
    };
    readonly problemPlaceholderContentText: undefined;
    readonly allOkPlaceholderContentText: undefined;
    readonly allOkContentText: undefined;
    readonly diagnosticPlaceholderTextStyle: undefined;
    readonly okNotationTextStyle: undefined;
    readonly okTextStyle: undefined;
    readonly okWorkspaceContentText: undefined;
    readonly okEditorContentText: undefined;
    readonly warningNotationTextStyle: undefined;
    readonly warningTextStyle: undefined;
    readonly warningWorkspaceContentText: undefined;
    readonly warningEditorContentText: undefined;
    readonly errorNotationTextStyle: undefined;
    readonly errorTextStyle: undefined;
    readonly errorWorkspaceContentText: undefined;
    readonly errorEditorContentText: undefined;
};
export declare const DIAGNOSTIC_EDITOR_PLACEHOLDER_LINKER_CONFIG: {
    readonly okNotationTextStyle: D.Numeric.Key.Hex;
    readonly warningNotationTextStyle: D.Numeric.Key.Hex;
    readonly errorNotationTextStyle: D.Numeric.Key.Hex;
};
export declare const DIAGNOSTIC_WORKSPACE_PLACEHOLDER_LINKER_CONFIG: {
    readonly okNotationTextStyle: D.Numeric.Key.Hex;
    readonly warningNotationTextStyle: D.Numeric.Key.Hex;
    readonly errorNotationTextStyle: D.Numeric.Key.Hex;
};
export declare const DIAGNOSTIC_ALL_PLACEHOLDER_LINKER_CONFIG: {
    readonly okNotationTextStyle: D.Numeric.Key.Hex;
};
export declare const DIAGNOSTIC_DECORATION_TEXT_KIND_CONFIG: {
    contentText: undefined;
    notation: undefined;
};
export declare const DECORATION_OPTION_LINKER_CONFIG: {
    readonly allOkPlaceholderContentText: readonly [DIAGNOSTIC_TEXT_STYLE_KEY.DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE, undefined];
    readonly allOkContentText: readonly [DIAGNOSTIC_TEXT_STYLE_KEY.OK_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE];
    readonly problemPlaceholderContentText: readonly [DIAGNOSTIC_TEXT_STYLE_KEY.DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE, undefined];
    readonly okEditorContentText: readonly [DIAGNOSTIC_TEXT_STYLE_KEY.OK_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE];
    readonly warningEditorContentText: readonly [DIAGNOSTIC_TEXT_STYLE_KEY.WARNINGTEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE];
    readonly errorEditorContentText: readonly [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE];
    readonly okWorkspaceContentText: readonly [DIAGNOSTIC_TEXT_STYLE_KEY.OK_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE];
    readonly warningWorkspaceContentText: readonly [DIAGNOSTIC_TEXT_STYLE_KEY.WARNINGTEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE];
    readonly errorWorkspaceContentText: readonly [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE];
};
export declare const DIAGNOSTIC_CONTENT_TEXT_NAME_TO_NUM_CONFIG: {
    readonly problemPlaceholderContentText: D.Numeric.Key.Hex;
    readonly allOkPlaceholderContentText: D.Numeric.Key.Hex;
    readonly allOkContentText: D.Numeric.Key.Hex;
    readonly okEditorContentText: D.Numeric.Key.Hex;
    readonly warningEditorContentText: D.Numeric.Key.Hex;
    readonly errorEditorContentText: D.Numeric.Key.Hex;
    readonly okWorkspaceContentText: D.Numeric.Key.Hex;
    readonly warningWorkspaceContentText: D.Numeric.Key.Hex;
    readonly errorWorkspaceContentText: D.Numeric.Key.Hex;
};
export declare const DIAGNOSTIC_STYLE_LIST_CONFIG: D.Common.Tp.TextList[];
export declare const DIAGNOSTIC_CONTENT_TEXT_LIST_CONFIG: D.Common.Tp.TextList;
export declare const DIAGNOSTIC_SEVERITY_TO_KEY_CONFIG: {
    readonly 1: DIAGNOSTIC_SEVERITY_KEY.WARNING;
    readonly 0: DIAGNOSTIC_SEVERITY_KEY.ERROR;
    readonly 2: undefined;
    readonly 3: undefined;
};
export declare const DIAGNOSTIC_DECORATION_STYLE_CONFIG: {
    readonly leftMargin: undefined;
    readonly diagnosticDecorationOption: {
        readonly diagnosticPlaceholderTextStyle: undefined;
        readonly okTextStyle: undefined;
        readonly okNotationTextStyle: undefined;
        readonly warningTextStyle: undefined;
        readonly warningNotationTextStyle: undefined;
        readonly errorTextStyle: undefined;
        readonly errorNotationTextStyle: undefined;
    };
};
export declare const SCM_TEXT_STYLE_CONFIG: Record<string, any>;
export declare const SCM_CONFIG: Record<string, any>;
export declare const SCM_OVERLAY_DECORATION_LIST_CONFIG: [D.Numeric.Key.Hex, string][];
export declare const SCM_CONTENT_TEXT_LIST_CONFIG: D.Common.Tp.TextList;
