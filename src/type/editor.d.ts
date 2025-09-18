import type Numeric from './numeric';

import * as vscode from 'vscode';
import { DECORATION_STATE } from '../constant/shared/object';

declare namespace Intf {
    interface RenderGroup {
        [key: Numeric.Key.Hex]: Tp.RenderGroupFuncSign
        // generic arguement type overloading 
        // [key: Numeric.Key.Hex]: Tp.RenderGroupFuncSign<Numeric.Key.Hex[]> | Tp.RenderGroupFuncSign<Common.Tp.Unused>
    }
}

declare namespace Tp {
    type RenderGroupFuncSign = (editor: vscode.TextEditor, previousKey: Numeric.Key.Hex[]) => void;
    // generic arguement type overloading
    // type RenderGroupFuncSign<T extends Numeric.Key.Hex[] | Common.Tp.Unused> = (editor: vscode.TextEditor, previousCursor: T) => void;

    type SetDecorationOptions = readonly vscode.Range[] | readonly vscode.DecorationOptions[]

    type RenderOverlay = vscode.TextEditor['setDecorations']

    type DecorationState = typeof DECORATION_STATE;
}

export type {
    Intf,
    Tp
};