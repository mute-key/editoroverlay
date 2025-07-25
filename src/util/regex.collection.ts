import { DIAGNOSTIC_CONTENT_TEXT_KEY, SELECTION_CONTENT_TEXT_CONFIG_KEY } from '../constant/config/enum';
import * as D from '../type/type';

//:==============================================================================
//:  [ REGEX COLLECTION ], self-explanatory.
//:==============================================================================

const prefix = /(\${pre})/s;

const postfix = /(\${post})/s;

const source = /(\${src})/s;

const warning = /(\${wrn})/s;

const error = /(\${err})/s;

const editor = /(\${editor})/s;

const workspace = /(\${workspace})/s;

const allok = /(\${allok})/s;

const okRegex = {
    allok: allok,
};

const problemRegex = {
    editor: editor,
    workspace: workspace,
};

const notationRegex = {
    pre: prefix,
    post: postfix,
};

const warningTotalRegex = {
    wrn: warning,
};

const sourceRegex = {
    src: source,
};

const errorTotalRegex = {
    err: error,
};

const diagnosticTextRegex: Record<string, D.diagnostic.type.RegexDiagnosticContentTextUnion> = {
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_PROBLEM_CONTENT_TEXT]: problemRegex,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_ALL_OK_CONTENT_TEXT]: okRegex,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_ALL_CONTENT_TEXT]: notationRegex,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_WORKSPACE_CONTENT_TEXT]: notationRegex,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_EDITOR_CONTENT_TEXT]: notationRegex,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_WORKSPACE_CONTENT_TEXT]: {
        ...notationRegex,
        ...sourceRegex,
        ...warningTotalRegex
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_EDITOR_CONTENT_TEXT]: {
        ...notationRegex,
        ...warningTotalRegex,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_WORKSPACE_CONTENT_TEXT]: {
        ...notationRegex,
        ...sourceRegex,
        ...errorTotalRegex
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_EDITOR_CONTENT_TEXT]: {
        ...notationRegex,
        ...errorTotalRegex
    }
};

const column = /(\${col})/s;

const zeroColumn = /(\${zCol})/s;

const lineCount = /(\${lc})/s;

const linePosition = /(\${pos})/s;

const lineNumber = /(\${ln})/s;

const character = /(\${char})/s;

const characterOnly = /(\${charOnly})/s;

const nth = /(\${nth})/s;

const selectionCount = /(\${count})/s;

const SelectionTextRegex: Record<string, D.status.type.RegexStatusContentTextUnion> = {
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: {
        col: column,
        zCol: zeroColumn,
        ln: lineNumber
    },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: {
        char: character,
        ln: lineNumber
    },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: {
        lc: lineCount,
        ln: lineNumber,
        char: character,
        charOnly: characterOnly
    },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: {
        lc: lineCount,
        ln: lineNumber,
        char: character,
        charOnly: characterOnly
    },
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: {
        nth: nth,
        count: selectionCount,
        lc: lineCount,
        ln: lineNumber,
        char: character
    },
};

const indentAndEOLRegex = (indentSize: string | number) => new RegExp(`^( {${indentSize}}|[\r\n]+)*`, 'gm');

const ifStringIsResourceScope = /^[%\.].*[%\.]$/s;

const tabAndEOLRegex = /(\t|[\r\n]+)*$/gm;

const isValidHexColor = /^#[A-Fa-f0-9]{6}$/;

const isValidWidth = /^[0-9]px$|^[0-9]em$/;

const ifContentTextHasPlaceholder = /(\${[A-z]*})/g;

const contentTextKeysOnly = /\${([^{}]+)}/s;

export {
    indentAndEOLRegex,
    ifStringIsResourceScope,
    tabAndEOLRegex,
    isValidHexColor,
    isValidWidth,
    ifContentTextHasPlaceholder,
    contentTextKeysOnly,
    SelectionTextRegex,
    diagnosticTextRegex
};
