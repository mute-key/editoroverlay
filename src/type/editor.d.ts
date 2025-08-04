import * as vscode from 'vscode';

declare namespace Intf {
    interface RenderGroup {
        [key: number]: Tp.RenderGroupFuncSign
    }
}

declare namespace Tp {
    type RenderGroupFuncSign = (editor: vscode.TextEditor, previousKey: number[]) => void

    type SetDecorationOptions = readonly vscode.Range[] | readonly vscode.DecorationOptions[]
}

export type {
    Intf,
    Tp
};