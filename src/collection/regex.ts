import type * as D from '../type/type.d';

export {
    indentAndEOLRegex,
    ifStringIsResourceScope,
    tabAndEOLRegex,
    isValidHexColor,
    isValidWidth,
    ifContentTextHasPlaceholder,
    contentTextKeysOnly,
    prefix,
    postfix,
    source,
    warning,
    error,
    editor,
    workspace,
    allok,
    column,
    zeroColumn,
    lineCount,
    linePosition,
    lineNumber,
    character,
    characterOnly,
    nth,
    selectionCount,
    isWholeLine,
    beforeCursor,
    afterCursor,
    atLineStart,
    selectionOnly,
};

//:==============================================================================
//:  [ REGEX COLLECTION ], self-explanatory
//:==============================================================================

const prefix = /(\${pre})/s;
const postfix = /(\${post})/s;
const source = /(\${src})/s;
const warning = /(\${wrn})/s;
const error = /(\${err})/s;
const editor = /(\${editor})/s;
const workspace = /(\${workspace})/s;
const allok = /(\${allok})/s;
const column = /(\${col})/s;
const zeroColumn = /(\${zCol})/s;
const lineCount = /(\${lc})/s;
const linePosition = /(\${pos})/s;
const lineNumber = /(\${ln})/s;
const character = /(\${char})/s;
const characterOnly = /(\${charOnly})/s;
const nth = /(\${nth})/s;
const selectionCount = /(\${count})/s;

const indentAndEOLRegex = (indentSize: string | number) => new RegExp(`^( {${indentSize}}|[\r\n]+)*`, 'gm');
const ifStringIsResourceScope = /^[%\.].*[%\.]$/s;
const tabAndEOLRegex = /(\t|[\r\n]+)*$/gm;
const isValidHexColor = /^#[A-Fa-f0-9]{6}$/;
const isValidWidth = /^[0-9]px$|^[0-9]em$/;
const ifContentTextHasPlaceholder = /(\${[A-z]*})/g;
const contentTextKeysOnly = /\${([^{}]+)}/s;

const isWholeLine = /isWholeLine/s;
const beforeCursor = /beforeCursor/s;
const afterCursor = /afterCursor/s;
const atLineStart = /atLineStart/s;
const selectionOnly = /selectionOnly/s;



