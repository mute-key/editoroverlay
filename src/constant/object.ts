import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import * as $ from './symbol';
import { BORDER_POSITION_MASK, BORDER_POSITION_VARIATION, DECORATION_STYLE_CONFIG_KEY, DECORATION_GENERAL_STYLE_CONFIG_KEY, DECORATION_SELECTION_STYLE_CONFIG_KEY, DECORATION_STYLE_KEY, DECORATION_TYPE_MASK, SELECTION_TYPE, CONFIG_SECTION_KEY, SELECTION_CONTENT_TEXT_CONFIG_KEY, DIAGNOSTIC_SEVERITY_KEY, DIAGNOSTIC_CONTENT_TEXT_KEY, DIAGNOSTIC_TEXT_STYLE_KEY } from './enum';

// ==============================================================================
// [ RUNTIME READONLY CONSTANT/ENUM ]
// ==============================================================================

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
    rendered: [0, 0],
    generalConfigInfo: {
        borderOpacity: undefined,
        backgroundOpacity: undefined,
        selectionTextEnabled: undefined,
        diagnosticTextEnabled: undefined,
    } as const,
    configError: undefined,
} as const;

export const CONFIG_KEY_LINKER_SECTION = {
    selectionTextEnabled: ['selectionText', 'enabled'],
    diagnosticTextEnabled: ['diagnosticText', 'enabled'],
};

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
    selectionCountTextStyle: {
        ln: undefined,
        col: undefined,
        zCol: undefined,
        char: undefined,
        lc: undefined,
        nth: undefined,
        count: undefined,
        opacity: undefined,
        fontStyle: undefined,
        fontWeight: undefined,
    }
} as const;

export const SELECTION_CONTENT_TEXT_LIST: Type.TextList = [
    'cursorOnlyText',
    'singleLineText',
    'multiLineCursorText',
    'multiLineAnchorText',
    'multiCursorText',
] as const;

export const SELECTION_DECORATION_STYLE = {
    leftMargin: undefined,
    placeholderDecorationOption: {},
    selectionDecorationOption: {
        ln: undefined,
        col: undefined,
        zCol: undefined,
        char: undefined,
        lc: undefined,
        nth: undefined,
        count: undefined,
    }
} as const;

export const INDENT_INFO = {
    size: undefined,
    type: undefined,
    regex: undefined,
    __proto__: null
} as const;

export const RENDER_GROUP_SET_PROPERTY = {
    type: undefined,
    selectionCount: undefined,
    diagnostic: undefined,
    __proto__: null,
} as const;

export const RENDER_GROUP_SET = {
    [$.cursorOnly]: RENDER_GROUP_SET_PROPERTY,
    [$.singleLine]: RENDER_GROUP_SET_PROPERTY,
    [$.multiLine]: RENDER_GROUP_SET_PROPERTY,
    [$.multiCursor]: RENDER_GROUP_SET_PROPERTY,
    __proto__: null,
};

export const DECORATION_STATE = {
    appliedHighlight: {
        applied: undefined,
        ofDecorationType: undefined,
        __proto__: null,
    } as const,
    selectionText: [],
    diagnosticText: [],
    statusInfo: [],
    __proto__: null
} as const;

export const HIGHLIGHT_STYLE_SYMBOL_LIST = [
    $.cursorOnly,
    $.singleLine,
    $.multiLine,
    $.multiCursor,
];

export const HIGHLIGHT_STYLE_LIST = {
    [$.cursorOnly]: [],
    [$.singleLine]: [],
    [$.multiLine]: [],
    [$.multiCursor]: [],
    __proto__: null
} as const;

export const HIGHLIGHT_BORDER_POSITION_INFO = {
    [$.cursorOnly]: undefined,
    [$.singleLine]: undefined,
    [$.multiLine]: undefined,
    [$.multiCursor]: undefined,
    __proto__: null
} as const;

/**
 * this prob could be const enum too but this needs to be used as an object
 * so this is object literal it is.
 * 
 */
export const DECORATION_STYLE_PREFIX = {
    [$.cursorOnly]: 'cursorOnly',
    [$.singleLine]: 'singleLine',
    [$.multiLine]: 'multiLine',
    [$.multiCursor]: 'multiCursor',
    __proto__: null
} as const;

export const DECORATION_OPTION_CONFIG = {
    isWholeLine: undefined,
    rangeBehavior: undefined,
    after: {},
    __proto__: null,
} as const;

export const DECORATION_OPTION_AFTER_CONFIG = {
    contentText: undefined,
    color: undefined,
    backgroundColor: undefined,
    fontWeight: undefined,
    fontStyle: undefined,
    textDecoration: undefined,
    margin: undefined,
    __proto__: null,
} as const;

export const SELECTION_KIND: Type.DecorationInfoType = {
    [$.reset]: {
        KEY: $.reset,
        MASK: DECORATION_TYPE_MASK.RESET
    } as const,
    [$.cursorOnly]: {
        KEY: $.cursorOnly,
        MASK: DECORATION_TYPE_MASK.CURSOR_ONLY
    } as const,
    [$.singleLine]: {
        KEY: $.singleLine,
        MASK: DECORATION_TYPE_MASK.SINGLE_LINE
    } as const,
    [$.multiLine]: {
        KEY: $.multiLine,
        MASK: DECORATION_TYPE_MASK.MULTI_LINE
    } as const,
    [$.multiCursor]: {
        KEY: $.multiCursor,
        MASK: DECORATION_TYPE_MASK.MULTI_CURSOR
    } as const,
    __proto__: null
} as const;

export const DIAGNOSTIC_EDITOR_CONTENT_TEXT_KEYSET = {
    [$.okContentText]: $.okEditorContentText,
    [$.warningContentText]: $.errorEditorContentText,
    [$.errorContentText]: $.warningEditorContentText,
    __proto__: null
};

export const DIAGNOSTIC_WORKSPACE_CONTENT_TEXT_KEYSET = {
    [$.okContentText]: $.okWorkspaceContentText,
    [$.warningContentText]: $.warningWorkspaceContentText,
    [$.errorContentText]: $.errorWorkspaceContentText,
    __proto__: null
} as const;


export const DIAGNOSTIC_EDITOR_PLACEHOLDER_LINKER = {
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: $.okEditorContentText,
    [DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE]: $.errorEditorContentText,
    [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE]: $.warningEditorContentText,
} as const;

export const DIAGNOSTIC_WORKSPACE_PLACEHOLDER_LINKER = {
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: $.okWorkspaceContentText,
    [DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE]: $.warningWorkspaceContentText,
    [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE]: $.errorWorkspaceContentText,
} as const;


export const DIAGNOSTIC_ALL_PLACEHOLDER_LINKER = {
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: $.okAllContentText,
} as const;

export const DECORATION_OPTION_LINKER = {
    problemPlaceholderContentText: [DIAGNOSTIC_TEXT_STYLE_KEY.DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE, undefined],
    allOkPlaceholderContentText: [DIAGNOSTIC_TEXT_STYLE_KEY.DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE, undefined],
    okWorkspaceContentText: [DIAGNOSTIC_TEXT_STYLE_KEY.OK_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE],
    okEditorContentText: [DIAGNOSTIC_TEXT_STYLE_KEY.OK_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE],
    okAllContentText: [DIAGNOSTIC_TEXT_STYLE_KEY.OK_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE],
    warningWorkspaceContentText: [DIAGNOSTIC_TEXT_STYLE_KEY.WARNINGTEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE],
    warningEditorContentText: [DIAGNOSTIC_TEXT_STYLE_KEY.WARNINGTEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE],
    errorWorkspaceContentText: [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE],
    errorEditorContentText: [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE]
} as const;

export const DIAGNOSTIC_CONTENT_TEXT_NAME_TO_SYM = {
    problemPlaceholderContentText: $.problemPlaceholderContentText,
    allOkPlaceholderContentText: $.allOkPlaceholderContentText,
    okWorkspaceContentText: $.okWorkspaceContentText,
    okEditorContentText: $.okEditorContentText,
    okAllContentText: $.okAllContentText,
    warningWorkspaceContentText: $.warningWorkspaceContentText,
    warningEditorContentText: $.warningEditorContentText,
    errorWorkspaceContentText: $.errorWorkspaceContentText,
    errorEditorContentText: $.errorEditorContentText,
} as const;

export const DIAGNOSTIC_STYLE_LIST: Type.TextList[] = [
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.OK_TEXT_STYLE],
    [DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.WARNINGTEXT_STYLE],
    [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_TEXT_STYLE],
] as const;

export const DIAGNOSTIC_VISIBILITY_CONFIG = {
    displayWhenCursorOnly: undefined,
    displayWhenSingleLine: undefined,
    displayWhenMultiLine: undefined,
    displayWhenMultiCursor: undefined,
    DiagnosticKind: undefined,
    placeTextOnPreviousOrNextLine: undefined,
    overrideLayoutPlaceholderColorToHighestSeverity: undefined,
    overrideAllOk: undefined,
    hideOk: undefined,
    hideWarning: undefined,
    __proto__: null
} as const;

export const DIAGNOSTIC_CONFIG = {
    enabled: undefined,
    leftMargin: undefined,
    visibility: DIAGNOSTIC_VISIBILITY_CONFIG,
    problemPlaceholderContentText: undefined,
    allOkPlaceholderContentText: undefined,
    [DIAGNOSTIC_TEXT_STYLE_KEY.DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE]: undefined,
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: undefined,
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_TEXT_STYLE]: undefined,
    okWorkspaceContentText: undefined,
    okEditorContentText: undefined,
    okAllContentText: undefined,
    [DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE]: undefined,
    [DIAGNOSTIC_TEXT_STYLE_KEY.WARNINGTEXT_STYLE]: undefined,
    warningWorkspaceContentText: undefined,
    warningEditorContentText: undefined,
    [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE]: undefined,
    [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_TEXT_STYLE]: undefined,
    errorWorkspaceContentText: undefined,
    errorEditorContentText: undefined
} as const;

export const DIAGNOSTIC_STATE = {
    severity: 0,
    editor: {
        warning: {
            total: 0,
            __proto__: null
        },
        error: {
            total: 0,
            __proto__: null
        },
        __proto__: null
    },
    workspace: {
        warning: {
            source: 0,
            total: 0,
            __proto__: null
        },
        error: {
            source: 0,
            total: 0,
            __proto__: null
        },
        __proto__: null
    },
    __proto__: null
} as const;

export const DIAGNOSTIC_DECORATION_STYLE = {
    leftMargin: undefined,
    diagonosticDecorationOption: {
        [DIAGNOSTIC_TEXT_STYLE_KEY.DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE]: undefined,
        [DIAGNOSTIC_TEXT_STYLE_KEY.OK_TEXT_STYLE]: undefined,
        [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: undefined,
        [DIAGNOSTIC_TEXT_STYLE_KEY.WARNINGTEXT_STYLE]: undefined,
        [DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE]: undefined,
        [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_TEXT_STYLE]: undefined,
        [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE]: undefined,
    },
} as const;

export const DIAGNOSTIC_SEVERITY_TO_KEY = {
    [vscode.DiagnosticSeverity.Warning]: DIAGNOSTIC_SEVERITY_KEY.WARNING,
    [vscode.DiagnosticSeverity.Error]: DIAGNOSTIC_SEVERITY_KEY.ERROR
} as const;


export const SELECTION_CONTENT_TEXT = {
    [$.cursorOnlyText]: undefined,
    [$.singleLineText]: undefined,
    [$.multiLineCursorText]: undefined,
    [$.multiLineAnchorText]: undefined,
    [$.multiCursorText]: undefined,
} as const;

export const SELECTION_CONTENT_TEXT_SYMLINK = {
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: $.cursorOnlyText,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: $.singleLineText,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: $.multiLineCursorText,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: $.multiLineAnchorText,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: $.multiCursorText,
} as const;

export const DIAGNOSTIC_CONTENT_TEXT = {
    layout: {},
    editor: {},
    workspace: {},
    all: {}
} as const;

export const DIAGNOSTIC_DECORATION_TEXT_KIND = {
    contentText: undefined,
    notation: undefined,
};

export const DIAGNOSTIC_CONTENT_TEXT_LIST: Type.TextList = [
    "problemPlaceholderContentText",
    "allOkPlaceholderContentText",
    "okWorkspaceContentText",
    "okEditorContentText",
    "okAllContentText",
    "warningWorkspaceContentText",
    "warningEditorContentText",
    "errorWorkspaceContentText",
    "errorEditorContentText"
] as const; // change to enum later


export const SINGLE_BORDER_SELECTION = {
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

export const MULTILINE_BORDER_SELECTION = {
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

export const BORDER_WIDTH_DEFINITION = {
    [$.cursorOnly]: SINGLE_BORDER_SELECTION,
    [$.singleLine]: SINGLE_BORDER_SELECTION,
    [$.multiLine]: MULTILINE_BORDER_SELECTION,
    [$.multiCursor]: SINGLE_BORDER_SELECTION,
} as const;

export const NO_CONFIGURATION_GENERAL_DEFAULT = {
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.OPACITY]: 1,
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.BACKGROUND_OPACITY]: 0.5,
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.SELECTION_TEXT_ENABLED]: false,
} as const;

export const SELECTION_DEFAULT = {
    [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_COLOR]: '#FF0000',
    [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_OPACITY]: 1,
    [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_BACKGROUND_COLOR]: null,
    [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_FONT_STYLE]: 'normal',
    [DECORATION_SELECTION_STYLE_CONFIG_KEY.SELECTION_TEXT_FONT_WEIGHT]: 'bold',
} as const;

export const NO_CONFIGURATION_DEOCORATION_DEFAULT: Type.NoConfigurationDecorationType = {
    [$.cursorOnly]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: true,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
    [$.singleLine]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: false,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
    [$.multiLine]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: true,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
    [$.multiCursor]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: false,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
} as const;