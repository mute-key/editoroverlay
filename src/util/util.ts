import * as Type from '../type/type.d';

/**
 * 
 * @param newProp 
 * @returns 
 */
const autoArrayPropertyObject = (newProp) => {
    const target = {};
    return new Proxy(target, {
        get(obj, prop) {
            if (!(prop in obj)) {
                obj[prop] = structuredClone(newProp);
            }
            return obj[prop];
        }
    });
};


/**
 * create new array based on 4 bit number which will parse a bit into true or false arguement supplied.
 * 
 * @param value 
 * @param trueValue 
 * @param falseValue 
 * @param bitLength zero-based bit lengting. default is set to 4 as 4 bit.
 * @returns 
 */
const readBits = (value: number, trueValue: any | any[], falseValue: any, bitLength?: number): any[] => {
    let idx = bitLength ? bitLength : 4;
    const array: any[] = [];
    while (idx--) {
        if ((value >> idx) & 1) {
            array.push(Array.isArray(trueValue) ? trueValue[idx] : trueValue);
        } else {
            array.push(falseValue);
        }
    }
    return array;
};

/**
 * FNV-1a hash.
 * this function is no longer needed. but just keeping it in case if i need fast short hash with collision.
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
 * split string based on regex and will mark where the regex sits in splited array.
 * 
 * @param str 
 * @param regex 
 * @returns 
 */
const splitAndPosition = (str: string, regex: RegExp): Type.RegexSplitType | undefined => {

    const match: RegExpMatchArray | null = str.match(regex);
    let split: string[] = [];

    if (match && match.index !== undefined) {
        split = str.split(regex);
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

const hrtimeToMS = (hrtime: [number, number]): number => (process.hrtime(hrtime)[1] / 1000000);

/**
 * compare number funciton for sort()
 * 
 * @param a 
 * @param b 
 * @returns 
 */
const compareNumbers = (a: number, b: number): number => (a - b);

const isObjectShallowEqual = (obj1: object, obj2: object) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }

    return keys1.every(key => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]);
};

const isEntriesEqual = (a, b) => a.length === b.length && a.every((element, index) => element[0] === b[index][0] && element[1] === b[index][1]);

export {
    fnv1aHash,
    readBits,
    hrtimeToMS,
    splitAndPosition,
    hexToRgbaStringLiteral,
    autoArrayPropertyObject,
    compareNumbers,
    isObjectShallowEqual,
    isEntriesEqual
};