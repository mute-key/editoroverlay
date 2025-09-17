import * as vscode from 'vscode';

import type Numeric from './numeric';
import type Common from './common';

declare namespace Intf {
    interface RenderGroup {
        [key: Numeric.Key.Hex]: Tp.RenderGroupFuncSign<Numeric.Key.Hex[]> | Tp.RenderGroupFuncSign<Common.Tp.Unused>
    }
}

declare namespace Tp {
    type RenderGroupFuncSign<T extends Numeric.Key.Hex[] | Common.Tp.Unused> = (editor: vscode.TextEditor, previousCursor: T) => void;

    type SetDecorationOptions = readonly vscode.Range[] | readonly vscode.DecorationOptions[]

    type RenderOverlay = vscode.TextEditor['setDecorations']
}

export type {
    Intf,
    Tp
};