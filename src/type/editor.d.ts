import * as vscode from 'vscode';

import type Numeric from './numeric';

declare namespace Intf {
    interface RenderGroup {
        [key: number]: Tp.RenderGroupFuncSign
    }
}

declare namespace Tp {
    type RenderGroupFuncSign = (editor: vscode.TextEditor, previousKey: Numeric.Key.Hex[]) => void

    type SetDecorationOptions = readonly vscode.Range[] | readonly vscode.DecorationOptions[]

    type RenderOverlay = vscode.TextEditor['setDecorations']
}

export type {
    Intf,
    Tp
};