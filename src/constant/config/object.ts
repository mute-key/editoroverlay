import type * as D from '../../type/type';

import * as vscode from 'vscode';
import * as hex from '../numeric/hexadecimal';
import * as bin from '../numeric/binary';
import { BORDER_POSITION_MASK, BORDER_POSITION_VARIATION, CONFIG_SECTION_KEY, DECORATION_GENERAL_STYLE_CONFIG_KEY, DECORATION_SELECTION_STYLE_CONFIG_KEY, DECORATION_STYLE_CONFIG_KEY, DECORATION_TYPE_MASK, DIAGNOSTIC_SEVERITY_KEY, DIAGNOSTIC_TEXT_STYLE_KEY, SELECTION_CONTENT_TEXT_CONFIG_KEY } from './enum';

export const CONFIG_SECTION = {
    [CONFIG_SECTION_KEY.GENERAL]: CONFIG_SECTION_KEY.GENERAL,
    [CONFIG_SECTION_KEY.CURSOR_ONLY]: CONFIG_SECTION_KEY.CURSOR_ONLY,
    [CONFIG_SECTION_KEY.SINGLE_LINE]: CONFIG_SECTION_KEY.SINGLE_LINE,
    [CONFIG_SECTION_KEY.MULTI_LINE]: CONFIG_SECTION_KEY.MULTI_LINE,
    [CONFIG_SECTION_KEY.MULTI_CURSOR]: CONFIG_SECTION_KEY.MULTI_CURSOR,
    [CONFIG_SECTION_KEY.SELECTION_TEXT]: CONFIG_SECTION_KEY.SELECTION_TEXT,
    [CONFIG_SECTION_KEY.DIAGNOSTIC_TEXT]: CONFIG_SECTION_KEY.DIAGNOSTIC_TEXT
} as const;

export const CONFIG_INFO = {
    name: undefined,
    renderLimiter: undefined,
    updateCaller: undefined,
    generalConfigInfo: {
        borderOpacity: undefined,
        backgroundOpacity: undefined,
        selectionTextEnabled: undefined,
        diagnosticTextEnabled: undefined,
    } as const,
    configError: undefined
} as const;

export const CONFIG_KEY_LINKER_SECTION_CONFIG = {
    selectionTextEnabled: ['selectionText', 'enabled'],
    diagnosticTextEnabled: ['diagnosticText', 'enabled'],
};

export const SELECTION_CONTENT_TEXT_NUMLINK_CONFIG: Record<string, D.Numeric.Key.Hex> = {
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: hex.cursorOnlyText,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: hex.singleLineText,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: hex.multiLineCursorText,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: hex.multiLineAnchorText,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: hex.multiCursorText,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_EDIT]: hex.multiCursorEdit,
} as const;

export const SELECTION_DECORAITON_CONFIG = {
    enabled: undefined,
    color: undefined,
    colorOpacity: undefined,
    backgroundColor: undefined,
    backgroundOpacity: undefined,
    fontStyle: undefined,
    fontWeight: undefined,
    leftMargin: undefined,
    cursorOnlyText: undefined,
    singleLineText: undefined,
    multiLineCursorText: undefined,
    multiLineAnchorText: undefined,
    multiCursorText: undefined,
    multiCursorEdit: undefined,
    selectionCountTextStyle: {
        ln: undefined,
        col: undefined,
        zCol: undefined,
        char: undefined,
        charOnly: undefined,
        lc: undefined,
        nth: undefined,
        count: undefined,
        opacity: undefined,
        fontStyle: undefined,
        fontWeight: undefined,
    }
} as const;

export const DECORATION_STYLE_PREFIX_CONFIG = {
    [hex.cursorOnly]: 'cursorOnly',
    [hex.singleLine]: 'singleLine',
    [hex.multiLine]: 'multiLine',
    [hex.multiCursor]: 'multiCursor'
} as const;

export const SELECTION_CONTENT_TEXT_LIST_CONFIG: D.Common.Tp.TextList = [
    "cursorOnlyText",
    "singleLineText",
    "multiLineCursorText",
    "multiLineAnchorText",
    "multiCursorText",
    "multiCursorEdit",
] as const;

export const SELECTION_DECORATION_STYLE_CONFIG = {
    leftMargin: undefined,
    placeholderDecorationOption: {},
    selectionDecorationOption: {
        ln: undefined,
        col: undefined,
        zCol: undefined,
        char: undefined,
        charOnly: undefined,
        lc: undefined,
        nth: undefined,
        count: undefined,
    }
} as const;

export const DECORATION_OPTION_CONFIG = {
    isWholeLine: undefined,
    rangeBehavior: undefined,
    after: {},
} as const;

export const DECORATION_OPTION_AFTER_CONFIG = {
    contentText: undefined,
    color: undefined,
    backgroundColor: undefined,
    fontWeight: undefined,
    fontStyle: undefined,
    textDecoration: undefined,
    margin: undefined,
} as const;

export const SELECTION_KIND_CONFIG: D.Decoration.Tp.DecorationInfo = {
    [hex.reset]: {
        KEY: hex.reset,
        MASK: DECORATION_TYPE_MASK.RESET
    } as const,
    [hex.cursorOnly]: {
        KEY: hex.cursorOnly,
        MASK: DECORATION_TYPE_MASK.CURSOR_ONLY
    } as const,
    [hex.singleLine]: {
        KEY: hex.singleLine,
        MASK: DECORATION_TYPE_MASK.SINGLE_LINE
    } as const,
    [hex.multiLine]: {
        KEY: hex.multiLine,
        MASK: DECORATION_TYPE_MASK.MULTI_LINE
    } as const,
    [hex.multiCursor]: {
        KEY: hex.multiCursor,
        MASK: DECORATION_TYPE_MASK.MULTI_CURSOR
    } as const
} as const;

export const DIAGNOSTIC_VISIBILITY_CONFIG = {
    DiagnosticKind: undefined,
    placeTextOnPreviousOrNextLine: undefined,
    overlayCursorPosition: undefined,
    overrideLayoutPlaceholderColorToHighestSeverity: undefined,
    overrideAllOk: undefined,
    autoInlineDatumPoint: undefined
} as const;

export const DIAGNOSTIC_GLYPH_CONFIG = {
    openningBracket: undefined,
    closingBracket: undefined,
    lineEqual: undefined,
    lineUp: undefined,
    lineDown: undefined,
} as const;

export const DIAGNOSTIC_PROBLEM_LIST_CONFIG = [
    bin.allOkNoOverride,
    bin.editorOkWorkspaceWarn,
    bin.editorOkWorkspaceErr,
    bin.editorOkWorkspaceWarnErr,
    bin.editorWarnWorkspaceWarn,
    bin.editorWarnWorkspaceErr,
    bin.editorWarnWorkspaceWarnErr,
    bin.editorErrWorkspaceErr,
    bin.editorErrWorkspaceWarnErr,
    bin.editorWarnErrWorkspaceWarnErr,
];

export const DIAGNOSTIC_CONFIG = {
    enabled: undefined,
    leftMargin: undefined,
    visibility: DIAGNOSTIC_VISIBILITY_CONFIG,
    glyphList: DIAGNOSTIC_GLYPH_CONFIG,
    problemPlaceholderContentText: undefined,
    allOkPlaceholderContentText: undefined,
    allOkContentText: undefined,
    [DIAGNOSTIC_TEXT_STYLE_KEY.DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE]: undefined,
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: undefined,
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_TEXT_STYLE]: undefined,
    okWorkspaceContentText: undefined,
    okEditorContentText: undefined,
    [DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE]: undefined,
    [DIAGNOSTIC_TEXT_STYLE_KEY.WARNINGTEXT_STYLE]: undefined,
    warningWorkspaceContentText: undefined,
    warningEditorContentText: undefined,
    [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE]: undefined,
    [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_TEXT_STYLE]: undefined,
    errorWorkspaceContentText: undefined,
    errorEditorContentText: undefined
} as const;

export const DIAGNOSTIC_EDITOR_PLACEHOLDER_LINKER_CONFIG = {
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: hex.okEditorContentText,
    [DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE]: hex.warningEditorContentText,
    [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE]: hex.errorEditorContentText,
} as const;

export const DIAGNOSTIC_WORKSPACE_PLACEHOLDER_LINKER_CONFIG = {
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: hex.okWorkspaceContentText,
    [DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE]: hex.warningWorkspaceContentText,
    [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE]: hex.errorWorkspaceContentText,
} as const;

export const DIAGNOSTIC_ALL_PLACEHOLDER_LINKER_CONFIG = {
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: hex.allOkContentText,
} as const;

export const DIAGNOSTIC_DECORATION_TEXT_KIND_CONFIG = {
    contentText: undefined,
    notation: undefined
};

export const DECORATION_OPTION_LINKER_CONFIG = {
    allOkPlaceholderContentText: [DIAGNOSTIC_TEXT_STYLE_KEY.DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE, undefined],
    allOkContentText: [DIAGNOSTIC_TEXT_STYLE_KEY.OK_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE],
    problemPlaceholderContentText: [DIAGNOSTIC_TEXT_STYLE_KEY.DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE, undefined],
    okEditorContentText: [DIAGNOSTIC_TEXT_STYLE_KEY.OK_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE],
    warningEditorContentText: [DIAGNOSTIC_TEXT_STYLE_KEY.WARNINGTEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE],
    errorEditorContentText: [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE],
    okWorkspaceContentText: [DIAGNOSTIC_TEXT_STYLE_KEY.OK_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE],
    warningWorkspaceContentText: [DIAGNOSTIC_TEXT_STYLE_KEY.WARNINGTEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE],
    errorWorkspaceContentText: [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE],
} as const;

export const DIAGNOSTIC_CONTENT_TEXT_NAME_TO_NUM_CONFIG = {
    problemPlaceholderContentText: hex.problemPlaceholderContentText,
    allOkPlaceholderContentText: hex.allOkPlaceholderContentText,
    allOkContentText: hex.allOkContentText,
    okEditorContentText: hex.okEditorContentText,
    warningEditorContentText: hex.warningEditorContentText,
    errorEditorContentText: hex.errorEditorContentText,
    okWorkspaceContentText: hex.okWorkspaceContentText,
    warningWorkspaceContentText: hex.warningWorkspaceContentText,
    errorWorkspaceContentText: hex.errorWorkspaceContentText,
} as const;

export const DIAGNOSTIC_STYLE_LIST_CONFIG: D.Common.Tp.TextList[] = [
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.OK_TEXT_STYLE],
    [DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.WARNINGTEXT_STYLE],
    [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_TEXT_STYLE],
] as const;

export const DIAGNOSTIC_CONTENT_TEXT_LIST_CONFIG: D.Common.Tp.TextList = [
    "problemPlaceholderContentText",
    "allOkPlaceholderContentText",
    "okWorkspaceContentText",
    "okEditorContentText",
    "allOkContentText",
    "warningWorkspaceContentText",
    "warningEditorContentText",
    "errorWorkspaceContentText",
    "errorEditorContentText"
] as const; // change to enum later

export const DIAGNOSTIC_SEVERITY_TO_KEY_CONFIG = {
    [vscode.DiagnosticSeverity.Warning]: DIAGNOSTIC_SEVERITY_KEY.WARNING,
    [vscode.DiagnosticSeverity.Error]: DIAGNOSTIC_SEVERITY_KEY.ERROR,
    [vscode.DiagnosticSeverity.Information]: undefined,
    [vscode.DiagnosticSeverity.Hint]: undefined
} as const;

export const DIAGNOSTIC_DECORATION_STYLE_CONFIG = {
    leftMargin: undefined,
    diagnosticDecorationOption: {
        [DIAGNOSTIC_TEXT_STYLE_KEY.DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE]: undefined,
        [DIAGNOSTIC_TEXT_STYLE_KEY.OK_TEXT_STYLE]: undefined,
        [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: undefined,
        [DIAGNOSTIC_TEXT_STYLE_KEY.WARNINGTEXT_STYLE]: undefined,
        [DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE]: undefined,
        [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_TEXT_STYLE]: undefined,
        [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE]: undefined,
    },
} as const;

export const SINGLE_BORDER_SELECTION_CONFIG = {
    [BORDER_POSITION_VARIATION.NONE]: [
        BORDER_POSITION_MASK.NONE
    ] as const,
    [BORDER_POSITION_VARIATION.BOTTOM]: [
        BORDER_POSITION_MASK.BOTTOM,
        BORDER_POSITION_MASK.NONE
    ] as const,
    [BORDER_POSITION_VARIATION.TOP_BOTTOM]: [
        BORDER_POSITION_MASK.TOP_BOTTOM
    ] as const,
    [BORDER_POSITION_VARIATION.TOP_RIGHT_BOTTOM_LEFT]: [
        BORDER_POSITION_MASK.TOP_RIGHT_BOTTOM_LEFT,
        BORDER_POSITION_MASK.NONE
    ] as const,
    [BORDER_POSITION_VARIATION.LEFT]: [
        BORDER_POSITION_MASK.LEFT
    ] as const,
} as const;

export const MULTILINE_BORDER_SELECTION_CONFIG = {
    [BORDER_POSITION_VARIATION.NONE]: [
        BORDER_POSITION_MASK.NONE,
        BORDER_POSITION_MASK.NONE,
        BORDER_POSITION_MASK.NONE,
    ] as const,
    [BORDER_POSITION_VARIATION.TOP_BOTTOM]: [
        BORDER_POSITION_MASK.TOP,
        BORDER_POSITION_MASK.BOTTOM,
        BORDER_POSITION_MASK.NONE
    ] as const,
    [BORDER_POSITION_VARIATION.LEFT]: [
        BORDER_POSITION_MASK.LEFT,
        BORDER_POSITION_MASK.LEFT,
        BORDER_POSITION_MASK.LEFT,
    ] as const,
} as const;

export const BORDER_WIDTH_DEFINITION_CONFIG: Record<D.Numeric.Key.Hex, any> = {
    [hex.cursorOnly]: SINGLE_BORDER_SELECTION_CONFIG,
    [hex.singleLine]: SINGLE_BORDER_SELECTION_CONFIG,
    [hex.multiLine]: MULTILINE_BORDER_SELECTION_CONFIG,
    [hex.multiCursor]: SINGLE_BORDER_SELECTION_CONFIG,
} as const;

export const NO_CONFIGURATION_DEOCORATION_DEFAULT_CONFIG = {
    [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: false,
    [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
    [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
    [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
    [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
    [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
} as const;

export const NO_CONFIGURATION_GENERAL_DEFAULT_CONFIG: Record<string, number | boolean> = {
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.OPACITY]: 1,
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.BACKGROUND_OPACITY]: 0.5,
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.SELECTION_TEXT_ENABLED]: false,
} as const;

export const SELECTION_DEFAULT_CONFIG = {
    [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_COLOR]: '#FF0000',
    [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_OPACITY]: 1,
    [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_BACKGROUND_COLOR]: null,
    [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_FONT_STYLE]: 'normal',
    [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_FONT_WEIGHT]: 'bold',
} as const;
