import type Numeric from './numeric';
import type Common from './common';

import * as vscode from 'vscode';
import { DECORATION_STATE } from '../constant/shared/object';

declare namespace Intf {
    interface RenderGroup {
        [key: Numeric.Key.Hex]: Tp.RenderGroupFuncSign
    }
}

declare namespace Tp {
    type RenderGroupFuncSign = (editor: vscode.TextEditor, previousCursor: Numeric.Key.Hex[]) => void;

    type SetDecorationOptions = readonly vscode.Range[] | readonly vscode.DecorationOptions[]

    type RenderOverlay = vscode.TextEditor['setDecorations']

    type DecorationState = typeof DECORATION_STATE;
}

export type {
    Intf,
    Tp
};