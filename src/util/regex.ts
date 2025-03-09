import * as Type from '../type/type.d';
import {
    DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY,
    STATUS_CONTENT_TEXT_CONFIG_KEY
} from '../constant/enum';

const indentAndEOLRegex = (indentSize: string | number) => new RegExp(`^( {${indentSize}}|[\r\n]+)*$`, 'gm');

const tagtAndEOLRegex = /(\t|[\r\n]+)*$/gm;

const isValidHexColor = /^#[A-Fa-f0-9]{6}$/;

const isValidWidth = /^[0-9]px$|^[0-9]em$/;

const ifContentTextHasPlaceholder = /(\${[A-z]*})/g;

const contentTextKeysOnly = /\${([^{}]+)}/s;

const diagnosticTextRegex: Record<string, Type.RegexDiagnosticContentTextUnion> = {
    // [DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY.OK_TEXT]: null,
    [DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY.WARNING_CONTENT_TEXT]: {
        src: /(\${src})/s,
        wrn: /(\${wrn})/s,
    },
    [DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY.ERROR_CONTENT_TEXT]: {
        src: /(\${src})/s,
        err: /(\${err})/s,
    }
};

const statusTextRegex: Record<string, Type.RegexStatusContentTextUnion> = {
    [STATUS_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: {
        col: /(\${col})/s,
        zCol: /(\${zCol})/s,
        ln: /(\${ln})/s
    },
    [STATUS_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: {
        char: /(\${char})/s,
        ln: /(\${ln})/s
    },
    [STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: {
        lc: /(\${lc})/s,
        ln: /(\${ln})/s,
        char: /(\${char})/s
    },
    [STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: {
        lc: /(\${lc})/s,
        ln: /(\${ln})/s,
        char: /(\${char})/s
    },
    [STATUS_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: {
        nth: /(\${nth})/s,
        count: /(\${count})/s,
        lc: /(\${lc})/s,
        ln: /(\${ln})/s,
        char: /(\${char})/s
    },
};

export {
    indentAndEOLRegex,
    tagtAndEOLRegex,
    isValidHexColor,
    isValidWidth,
    ifContentTextHasPlaceholder,
    contentTextKeysOnly,
    diagnosticTextRegex,
    statusTextRegex
};
