import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import * as __0x from './shared/numeric';
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
    configError: undefined
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
    regex: undefined
} as const;

export const RENDER_GROUP_SET_PROPERTY = {
    highlight: undefined,
    selectionCount: undefined,
    diagnostic: undefined
} as const;

export const RENDER_GROUP_SET = {
    [__0x.cursorOnly]: RENDER_GROUP_SET_PROPERTY,
    [__0x.singleLine]: RENDER_GROUP_SET_PROPERTY,
    [__0x.multiLine]: RENDER_GROUP_SET_PROPERTY,
    [__0x.multiCursor]: RENDER_GROUP_SET_PROPERTY
};

export const DECORATION_STATE = {
    appliedHighlight: [],
    // selectionText: undefined,
    // diagnosticText: undefined,
} as const;

export const HIGHLIGHT_STYLE_SYMBOL_LIST = [
    __0x.cursorOnly,
    __0x.singleLine,
    __0x.multiLine,
    __0x.multiCursor,
];

export const HIGHLIGHT_STYLE_LIST = {
    [__0x.reset]: [],
    [__0x.cursorOnly]: [],
    [__0x.singleLine]: [],
    [__0x.multiLine]: [],
    [__0x.multiCursor]: []
} as const;

export const HIGHLIGHT_BORDER_POSITION_INFO = {
    [__0x.cursorOnly]: undefined,
    [__0x.singleLine]: undefined,
    [__0x.multiLine]: undefined,
    [__0x.multiCursor]: undefined
} as const;

/**
 * this prob could be const enum too but this needs to be used as an object
 * so this is object literal it is.
 * 
 */
export const DECORATION_STYLE_PREFIX = {
    [__0x.cursorOnly]: 'cursorOnly',
    [__0x.singleLine]: 'singleLine',
    [__0x.multiLine]: 'multiLine',
    [__0x.multiCursor]: 'multiCursor'
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

export const SELECTION_KIND: Type.DecorationInfoType = {
    [__0x.reset]: {
        KEY: __0x.reset,
        MASK: DECORATION_TYPE_MASK.RESET
    } as const,
    [__0x.cursorOnly]: {
        KEY: __0x.cursorOnly,
        MASK: DECORATION_TYPE_MASK.CURSOR_ONLY
    } as const,
    [__0x.singleLine]: {
        KEY: __0x.singleLine,
        MASK: DECORATION_TYPE_MASK.SINGLE_LINE
    } as const,
    [__0x.multiLine]: {
        KEY: __0x.multiLine,
        MASK: DECORATION_TYPE_MASK.MULTI_LINE
    } as const,
    [__0x.multiCursor]: {
        KEY: __0x.multiCursor,
        MASK: DECORATION_TYPE_MASK.MULTI_CURSOR
    } as const
} as const;

export const DIAGNOSTIC_EDITOR_CONTENT_TEXT_KEYSET = {
    [__0x.okContentText]: __0x.okEditorContentText,
    [__0x.warningContentText]: __0x.errorEditorContentText,
    [__0x.errorContentText]: __0x.warningEditorContentText
};

export const DIAGNOSTIC_WORKSPACE_CONTENT_TEXT_KEYSET = {
    [__0x.okContentText]: __0x.okWorkspaceContentText,
    [__0x.warningContentText]: __0x.warningWorkspaceContentText,
    [__0x.errorContentText]: __0x.errorWorkspaceContentText
} as const;


export const DIAGNOSTIC_EDITOR_PLACEHOLDER_LINKER = {
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: __0x.okEditorContentText,
    [DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE]: __0x.errorEditorContentText,
    [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE]: __0x.warningEditorContentText,
} as const;

export const DIAGNOSTIC_WORKSPACE_PLACEHOLDER_LINKER = {
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: __0x.okWorkspaceContentText,
    [DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE]: __0x.warningWorkspaceContentText,
    [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE]: __0x.errorWorkspaceContentText,
} as const;


export const DIAGNOSTIC_ALL_PLACEHOLDER_LINKER = {
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: __0x.okAllContentText,
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
    problemPlaceholderContentText: __0x.problemPlaceholderContentText,
    allOkPlaceholderContentText: __0x.allOkPlaceholderContentText,
    okWorkspaceContentText: __0x.okWorkspaceContentText,
    okEditorContentText: __0x.okEditorContentText,
    okAllContentText: __0x.okAllContentText,
    warningWorkspaceContentText: __0x.warningWorkspaceContentText,
    warningEditorContentText: __0x.warningEditorContentText,
    errorWorkspaceContentText: __0x.errorWorkspaceContentText,
    errorEditorContentText: __0x.errorEditorContentText,
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
    hideWarning: undefined
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
    [__0x.cursorOnlyText]: undefined,
    [__0x.singleLineText]: undefined,
    [__0x.multiLineCursorText]: undefined,
    [__0x.multiLineAnchorText]: undefined,
    [__0x.multiCursorText]: undefined,
} as const;

export const SELECTION_CONTENT_TEXT_NUMLINK = {
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: __0x.cursorOnlyText,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: __0x.singleLineText,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: __0x.multiLineCursorText,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: __0x.multiLineAnchorText,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: __0x.multiCursorText,
} as const;

export const DIAGNOSTIC_CONTENT_TEXT = {
    layout: {},
    editor: {},
    workspace: {},
    all: {}
} as const;

export const DIAGNOSTIC_DECORATION_TEXT_KIND = {
    contentText: undefined,
    notation: undefined
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
    [__0x.cursorOnly]: SINGLE_BORDER_SELECTION,
    [__0x.singleLine]: SINGLE_BORDER_SELECTION,
    [__0x.multiLine]: MULTILINE_BORDER_SELECTION,
    [__0x.multiCursor]: SINGLE_BORDER_SELECTION,
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
    [__0x.cursorOnly]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: true,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
    [__0x.singleLine]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: false,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
    [__0x.multiLine]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: true,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
    [__0x.multiCursor]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: false,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
} as const;