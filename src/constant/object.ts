import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import { BORDER_POSITION_MASK, BORDER_POSITION_VARIATION, DECORATION_STYLE_CONFIG_KEY, DECORATION_GENERAL_STYLE_CONFIG_KEY, DECORATION_SELECTION_STYLE_CONFIG_KEY, DECORATION_STYLE_KEY, DECORATION_TYPE_MASK, SELECTION_TYPE, CONFIG_SECTION_KEY, SELECTION_CONTENT_TEXT_CONFIG_KEY, CONFIG_KEY_LINKER, DIAGNOSTIC_SEVERITY_KEY, DIAGNOSTIC_CONTENT_TEXT_KIND, DIAGNOSTIC_CONTENT_TEXT_KEY, DIAGNOSTIC_TEXT_STYLE_KEY } from './enum';
import { posix } from 'path';

// ==============================================================================
// [ RUNTIME READONLY CONSTANT/ENUM ]
// ==============================================================================

/**
 * readonly config object lteral structure.
 * import, shallow copy, as Type.ConfigInfoType.
 * 
 * workspace configuration could have been 'default' but
 * i think undefined is more difinitive for unset default value.
 * 
 * i think need to split this into 2 to static and dynamic.
 * this is getting to heavy to read.
 * 
 */
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
    generalConfigInfo: {
        borderOpacity: undefined,
        backgroundOpacity: undefined,
        selectionTextEnabled: CONFIG_KEY_LINKER.SELECTION_TEXT_ENABLED,
        diagnosticTextEnabled: CONFIG_KEY_LINKER.DIAGNOSTIC_TEXT_ENABLED,
    } as const,
    configError: undefined,
} as const;

export const SELECTION_DECORAITON_CONFIG = {
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
    type: undefined,
    selectionCount: undefined,
    diagnostic: undefined
} as const;

export const RENDER_GROUP_SET = {
    [SELECTION_TYPE.CURSOR_ONLY]: RENDER_GROUP_SET_PROPERTY,
    [SELECTION_TYPE.SINGLE_LINE]: RENDER_GROUP_SET_PROPERTY,
    [SELECTION_TYPE.MULTI_LINE]: RENDER_GROUP_SET_PROPERTY,
    [SELECTION_TYPE.MULTI_CURSOR]: RENDER_GROUP_SET_PROPERTY,
};

/**
 * decoration state object to set or unset decorations on editor.
 * to be used as shallow copied object.
 * 
 */
export const DECORATION_STATE = {
    appliedHighlight: {
        applied: undefined,
        ofDecorationType: undefined
    } as const,
    selectionText: [],
    diagnosticText: [],
    statusInfo: {
        selectionText: undefined,
        diagnosticText: undefined,
    }
} as const;

export const DECORATION_INFO = {
    selectionType: undefined,
    selectionCount: undefined,
    diagnostic: undefined
} as const;

export const CONTENT_TEXT_POSITIION = {
    contentText: undefined,
    position: undefined
} as const;

export const HIGHLIGHT_STYLE_LIST = {
    CURSOR_ONLY: undefined,
    SINGLE_LINE: undefined,
    MULTI_LINE: undefined,
    MULTI_CURSOR: undefined,
} as const;

export const HIGHLIGHT_BORDER_POSITION_INFO = {
    CURSOR_ONLY: undefined,
    SINGLE_LINE: undefined,
    MULTI_LINE: undefined,
    MULTI_CURSOR: undefined,
} as const;

/**
 * this prob could be const enum too but this needs to be used as an object
 * so this is object literal it is.
 * 
 */
export const DECORATION_STYLE_PREFIX = {
    CURSOR_ONLY: 'cursorOnly',
    SINGLE_LINE: 'singleLine',
    MULTI_LINE: 'multiLine',
    MULTI_CURSOR: 'multiCursor',
} as const;

export const DECORATION_OPTION_CONFIG = {
    isWholeLine: undefined,
    rangeBehavior: undefined,
    after: {}
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

export const DIAGNOSTIC_EDITOR_CONTENT_TEXT_KEYSET = {
    [DIAGNOSTIC_CONTENT_TEXT_KIND.OK_CONTENT_TEXT]: DIAGNOSTIC_CONTENT_TEXT_KEY.OK_EDITOR_CONTENT_TEXT,
    [DIAGNOSTIC_CONTENT_TEXT_KIND.WARNING_CONTENT_TEXT]: DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_EDITOR_CONTENT_TEXT,
    [DIAGNOSTIC_CONTENT_TEXT_KIND.ERROR_CONTENT_TEXT]: DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_EDITOR_CONTENT_TEXT
};

export const DIAGNOSTIC_WORKSPACE_CONTENT_TEXT_KEYSET = {
    [DIAGNOSTIC_CONTENT_TEXT_KIND.OK_CONTENT_TEXT]: DIAGNOSTIC_CONTENT_TEXT_KEY.OK_WORKSPACE_CONTENT_TEXT,
    [DIAGNOSTIC_CONTENT_TEXT_KIND.WARNING_CONTENT_TEXT]: DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_WORKSPACE_CONTENT_TEXT,
    [DIAGNOSTIC_CONTENT_TEXT_KIND.ERROR_CONTENT_TEXT]: DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_WORKSPACE_CONTENT_TEXT,
} as const;


export const DIAGNOSTIC_WORKSPACE_PLACEHOLDER_LINKER = {
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: "okWorkspaceContentText",
    [DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE]: "warningWorkspaceContentText",
    [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE]: "errorWorkspaceContentText",
} as const;

export const DIAGNOSTIC_EDITOR_PLACEHOLDER_LINKER = {
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: "okEditorContentText",
    [DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE]: "warningEditorContentText",
    [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE]: "errorEditorContentText",
} as const;

export const DIAGNOSTIC_ALL_PLACEHOLDER_LINKER = {
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: "okAllContentText",
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
        } as const,
        error: {
            source: 0,
            total: 0
        } as const,
    }
} as const;

export const DIAGNOSTIC_DECORATION_STYLE = {
    leftMargin: undefined,
    diagonosticDecorationOption: {
        [DIAGNOSTIC_TEXT_STYLE_KEY.DIAGNOSTIC_PLACEHOLDER_TEXT_STYLE]: undefined,
        [DIAGNOSTIC_TEXT_STYLE_KEY.OK_TEXT_STYLE]: undefined, // change to const enum laster
        [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: undefined, // change to const enum laster
        [DIAGNOSTIC_TEXT_STYLE_KEY.WARNINGTEXT_STYLE]: undefined, // change to const enum laster
        [DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE]: undefined, // change to const enum laster
        [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_TEXT_STYLE]: undefined, // change to const enum laster
        [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE]: undefined, // change to const enum laster
    },
} as const;

export const DIAGNOSTIC_SEVERITY_TO_KEY = {
    [vscode.DiagnosticSeverity.Warning]: DIAGNOSTIC_SEVERITY_KEY.WARNING,
    [vscode.DiagnosticSeverity.Error]: DIAGNOSTIC_SEVERITY_KEY.ERROR
};


export const SELECTION_CONTENT_TEXT = {
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: undefined,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: undefined,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: undefined,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: undefined,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: undefined,
} as const;

export const SELECTION_CONTENT_TEXT_ENTRY = {
    contentText: [],
    position: []
};


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

/**
 *  
 * 
 */
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

/**
 * use only for multiline single selection.
 * 
 */
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
    [DECORATION_STYLE_KEY.CURSOR_ONLY]: SINGLE_BORDER_SELECTION,
    [DECORATION_STYLE_KEY.SINGLE_LINE]: SINGLE_BORDER_SELECTION,
    [DECORATION_STYLE_KEY.MULTI_LINE]: MULTILINE_BORDER_SELECTION,
    [DECORATION_STYLE_KEY.MULTI_CURSOR]: SINGLE_BORDER_SELECTION,
} as const;

export const SELECTION_KIND: Type.DecorationInfoType = {
    [SELECTION_TYPE.RESET]: {
        KEY: SELECTION_TYPE.RESET,
        MASK: DECORATION_TYPE_MASK.RESET
    } as const,
    [SELECTION_TYPE.CURSOR_ONLY]: {
        KEY: SELECTION_TYPE.CURSOR_ONLY,
        MASK: DECORATION_TYPE_MASK.CURSOR_ONLY
    } as const,
    [SELECTION_TYPE.SINGLE_LINE]: {
        KEY: SELECTION_TYPE.SINGLE_LINE,
        MASK: DECORATION_TYPE_MASK.SINGLE_LINE
    } as const,
    [SELECTION_TYPE.MULTI_LINE]: {
        KEY: SELECTION_TYPE.MULTI_LINE,
        MASK: DECORATION_TYPE_MASK.MULTI_LINE
    } as const,
    [SELECTION_TYPE.MULTI_CURSOR]: {
        KEY: SELECTION_TYPE.MULTI_CURSOR,
        MASK: DECORATION_TYPE_MASK.MULTI_CURSOR
    } as const,
} as const;

/**
 * to protect runtime as well as notify user that malformed configuration value in setting.json.
 * 
 */
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
    [DECORATION_STYLE_KEY.CURSOR_ONLY]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: true,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
    [DECORATION_STYLE_KEY.SINGLE_LINE]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: false,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
    [DECORATION_STYLE_KEY.MULTI_LINE]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: true,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
    [DECORATION_STYLE_KEY.MULTI_CURSOR]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: false,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
} as const;