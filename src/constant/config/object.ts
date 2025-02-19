import * as vscode from 'vscode';
import * as Type from '../../type/type.d';
import * as __0x from '../shared/numeric';
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

export const CONFIG_KEY_LINKER_SECTION = {
    selectionTextEnabled: ['selectionText', 'enabled'],
    diagnosticTextEnabled: ['diagnosticText', 'enabled'],
};

export const SELECTION_CONTENT_TEXT_NUMLINK = {
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: __0x.cursorOnlyText,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: __0x.singleLineText,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: __0x.multiLineCursorText,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: __0x.multiLineAnchorText,
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: __0x.multiCursorText,
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

export const DECORATION_STYLE_PREFIX = {
    [__0x.cursorOnly]: 'cursorOnly',
    [__0x.singleLine]: 'singleLine',
    [__0x.multiLine]: 'multiLine',
    [__0x.multiCursor]: 'multiCursor'
} as const;

export const SELECTION_CONTENT_TEXT_LIST: Type.TextList = [
    "cursorOnlyText",
    "singleLineText",
    "multiLineCursorText",
    "multiLineAnchorText",
    "multiCursorText",
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

export const DIAGNOSTIC_VISIBILITY_CONFIG = {
    DiagnosticKind: undefined,
    placeTextOnPreviousOrNextLine: undefined,
    overrideLayoutPlaceholderColorToHighestSeverity: undefined,
    overrideAllOk: undefined
} as const;

export const DIAGNOSTIC_GLYPH = {
    openningBracket: undefined,
    closingBracket: undefined,
    lineEqual: undefined,
    lineUp: undefined,
    lineDown: undefined,
} as const;

export const DIAGNOSTIC_CONFIG = {
    enabled: undefined,
    leftMargin: undefined,
    visibility: DIAGNOSTIC_VISIBILITY_CONFIG,
    glyphList: DIAGNOSTIC_GLYPH,
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


export const DIAGNOSTIC_EDITOR_PLACEHOLDER_LINKER = {
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: __0x.okEditorContentText,
    [DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE]: __0x.warningEditorContentText,
    [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE]: __0x.errorEditorContentText,
} as const;

export const DIAGNOSTIC_WORKSPACE_PLACEHOLDER_LINKER = {
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: __0x.okWorkspaceContentText,
    [DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE]: __0x.warningWorkspaceContentText,
    [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE]: __0x.errorWorkspaceContentText,
} as const;


export const DIAGNOSTIC_ALL_PLACEHOLDER_LINKER = {
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE]: __0x.allOkContentText,
} as const;

export const DIAGNOSTIC_DECORATION_TEXT_KIND = {
    contentText: undefined,
    notation: undefined
};

export const DECORATION_OPTION_LINKER = {
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

export const DIAGNOSTIC_CONTENT_TEXT_NAME_TO_NUM = {
    problemPlaceholderContentText: __0x.problemPlaceholderContentText,
    allOkPlaceholderContentText: __0x.allOkPlaceholderContentText,
    allOkContentText: __0x.allOkContentText,
    okEditorContentText: __0x.okEditorContentText,
    warningEditorContentText: __0x.warningEditorContentText,
    errorEditorContentText: __0x.errorEditorContentText,
    okWorkspaceContentText: __0x.okWorkspaceContentText,
    warningWorkspaceContentText: __0x.warningWorkspaceContentText,
    errorWorkspaceContentText: __0x.errorWorkspaceContentText,
} as const;

export const DIAGNOSTIC_STYLE_LIST: Type.TextList[] = [
    [DIAGNOSTIC_TEXT_STYLE_KEY.OK_NOTATION_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.OK_TEXT_STYLE],
    [DIAGNOSTIC_TEXT_STYLE_KEY.WARNING_NOTATION_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.WARNINGTEXT_STYLE],
    [DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_NOTATION_TEXT_STYLE, DIAGNOSTIC_TEXT_STYLE_KEY.ERROR_TEXT_STYLE],
] as const;

export const DIAGNOSTIC_CONTENT_TEXT_LIST: Type.TextList = [
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

export const DIAGNOSTIC_SEVERITY_TO_KEY = {
    [vscode.DiagnosticSeverity.Warning]: DIAGNOSTIC_SEVERITY_KEY.WARNING,
    [vscode.DiagnosticSeverity.Error]: DIAGNOSTIC_SEVERITY_KEY.ERROR
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

export const NO_CONFIGURATION_DEOCORATION_DEFAULT = {
    [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: false,
    [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
    [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
    [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
    [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
    [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
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