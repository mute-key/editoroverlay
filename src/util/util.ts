import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import { 
    STATUS_CONTENT_TEXT_CONFIG_KEY 
} from '../constant/enum';

const getWorkspaceConfiguration = (section: string): vscode.WorkspaceConfiguration => vscode.workspace.getConfiguration(section);

const sendAutoDismissMessage = (text: string, dismiss: number) => {
    const message = vscode.window.showInformationMessage(text);
    setTimeout(() => {
        message?.then(() => { });
    }, dismiss);
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

const regex: Type.RegexType = {
    indentAndEOLRegex: (indentSize: string | number) => new RegExp(`^( {${indentSize}}|[\r\n]+)*$`, 'gm'),
    tagtAndEOLRegex: /(\t|[\r\n]+)*$/gm,
    isValidHexColor: /^#[A-Fa-f0-9]{6}$/,
    isValidWidth: /^[0-9]px$|^[0-9]em$/,
    ifStatusContentTextHasPlaceholder: /(\${[A-z]*})/g,
    statusTextKeysOnly: /\${([^{}]+)}/s,
    statusContentText: statusTextRegex
};

/**
 * 
 * @param value 
 * @param trueValue 
 * @param falseValue 
 * @param bitLength zero-based bit lengting. default is set to 4 as 4 bit.
 * @returns 
 */
const readBits = (value: number, trueValue: string, falseValue: string, bitLength?: number): string[] => {
    let idx = bitLength ? bitLength : 4;
    const array: string[] = [];
    while (idx--) {
        if ((value >> idx) & 1) {
            array.push(trueValue);
        } else {
            array.push(falseValue);
        }
    }
    return array;
};

/**
 * FNV-1a hash.
 * 
 * @param str
 * @param size
 * @returns
 * 
 */
const fnv1aHash = (str: string): string => {
    let hash = 0x811C9DC5; // FNV-1a initial value
    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);  // XOR computation
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24); // FNV-1a number compression
        hash = hash >>> 0;  // to 32 bit 
    }
    return hash.toString(16);
};

const splitAndPosition = (str: string, regex: RegExp): Type.RegexSplitType | undefined => {
    // console.log(str, regex);
    const match: RegExpMatchArray | null = str.match(regex);
    let split: string[] = [];
    console.log(str, match);
    if (match && match.index !== undefined) {
        split = str.split(regex);
        // console.log(split)
        if (split[0].length === 0) {
            delete split[0];
            return {
                position: 0,
                array: [...split]
            };
        } else if (split[2].length === 0) {
            delete split[2];
            return {
                position: 1,
                array: [...split]
            };
        } else {
            return {
                position: 1,
                array: split
            };
        }
    }

    return;
};

/**
 * hex string with opcacity to rgba() string.
 * 
 * @param hex
 * @param opacity
 * @returns
 * 
 */
const hexToRgbaStringLiteral = (hex: string, opacity: number = 0.6, defaultValue: string, opacityDefault?: number): string => {
    hex = hex.replace(/^#/, "");

    if (hex.length === 3) {
        hex = hex.split("").map(x => x + x).join("");
    }

    const regex = /^[0-9A-Fa-f]{6}$/;
    if (!regex.test(hex)) {
        // using default value.
        hex = defaultValue.replace(/^#/, "");
        opacity = opacityDefault as number;
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export {
    regex,
    fnv1aHash,
    readBits,
    splitAndPosition,
    hexToRgbaStringLiteral,
    sendAutoDismissMessage,
    getWorkspaceConfiguration
};