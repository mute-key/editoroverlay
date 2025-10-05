import type * as D from '../type/type';

export {
    indentAndEOLRegex,
    ifStringIsResourceScope,
    tabAndEOLRegex,
    isValidHexColor,
    isValidWidth,
    ifContentTextHasPlaceholder,
    contentTextKeysOnly,
    contentTextAllKeys,
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
    fsWinSplit,
    fsLinuxSplit,
    crlfRegex,
    lfRegex,
    pathRegex,
    safePathRegex,
    branchName,
    changeCount
};

declare namespace L {
    export type IndentRegexFunc = (indentSize: string | number) => RegExp
}

//:==============================================================================
//:  [ REGEX COLLECTION ], self-explanatory
//:==============================================================================

const prefix: RegExp = /(\${pre})/s;
const postfix: RegExp = /(\${post})/s;
const source: RegExp = /(\${src})/s;
const warning: RegExp = /(\${wrn})/s;
const error: RegExp = /(\${err})/s;
const editor: RegExp = /(\${editor})/s;
const workspace: RegExp = /(\${workspace})/s;
const allok: RegExp = /(\${allok})/s;
const column: RegExp = /(\${col})/s;
const zeroColumn: RegExp = /(\${zCol})/s;
const lineCount: RegExp = /(\${lc})/s;
const linePosition: RegExp = /(\${pos})/s;
const lineNumber: RegExp = /(\${ln})/s;
const character: RegExp = /(\${char})/s;
const characterOnly: RegExp = /(\${charOnly})/s;
const nth: RegExp = /(\${nth})/s;
const selectionCount: RegExp = /(\${count})/s;

const branchName: RegExp = /(\${bname})/s;
const changeCount: RegExp = /(\${ccount})/s;

const indentAndEOLRegex: L.IndentRegexFunc = (indentSize: string | number): RegExp => new RegExp(`^( {${indentSize}}|[\r\n]+)*`, 'gm');
const ifStringIsResourceScope: RegExp = /^[%\.].*[%\.]$/s;
const tabAndEOLRegex: RegExp = /(\t|[\r\n]+)*$/gm;
const isValidHexColor: RegExp = /^#[A-Fa-f0-9]{6}$/;
const isValidWidth: RegExp = /^[0-9]px$|^[0-9]em$/;
const ifContentTextHasPlaceholder: RegExp = /(\${[A-z]*})/g;
const contentTextKeysOnly: RegExp = /\${([^{}]+)}/s;
const contentTextAllKeys: RegExp = /\${([^{}]+)}/sg;


const isWholeLine: RegExp = /isWholeLine/s;
const beforeCursor: RegExp = /beforeCursor/s;
const afterCursor: RegExp = /afterCursor/s;
const atLineStart: RegExp = /atLineStart/s;
const selectionOnly: RegExp = /selectionOnly/s;

const fsWinSplit: RegExp = /\\/g;
const fsLinuxSplit: RegExp = /\//g;

const crlfRegex: RegExp = /\r\n/g;
const lfRegex: RegExp = /\n/g;

const pathRegex: RegExp = /\{\{PATH\}\}/g;

const safePathRegex = /^\/\/?([a-zA-Z0-9._-]+\/\/?)*[a-zA-Z0-9._-]+\/\/?$/;
