import * as vscode from 'vscode';

const sendAutoDismissMessage = (text: string, dismiss: number) => {
    const message = vscode.window.showInformationMessage(text);
    setTimeout(() => {
        message?.then(() => {});
    }, dismiss);
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

/**
 * Capitalise first character.
 * 
 * @param
 * @returns
 * 
 */
const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * hex string with opcacity to rgba() string.
 * 
 * @param hex
 * @param opacity
 * @returns
 * 
 */
const hexToRgbaStringLiteral = (hex: string, opacity: number, defaultValue: string): string => {
    hex = hex.replace(/^#/, "");

    if (hex.length === 3) {
        hex = hex.split("").map(x => x + x).join("");
    }

    const regex = /^[0-9A-Fa-f]{6}$/;
    if (!regex.test(hex)) {
        // using default value.
        hex = defaultValue.replace(/^#/, "");
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export {
    fnv1aHash,
    readBits,
    capitalize,
    hexToRgbaStringLiteral,
    sendAutoDismissMessage
};