import * as vscode from 'vscode';

export type {
    Key,
    Unique,
};

declare namespace Base {
    interface Unique {
        readonly __isUnique: true
    }

    interface Duplicative {
        readonly __isUnique: false
    }

    interface Hex {
        readonly __subtype: "hexadecimal"
    }

    interface Binary {
        readonly __subtype: "binary"
    }
}

declare namespace Unique {

    interface Hexadecimal extends Base.Unique, Base.Hex { }

    interface Binary extends Base.Unique, Base.Hex { }
}

declare namespace Duplicative {

}

declare namespace Key {

    type Hex = number & Unique.Hexadecimal;

    type Bin = number & Unique.Binary

    type KeyMap = {
        [key: string]: Hex;
    };
}