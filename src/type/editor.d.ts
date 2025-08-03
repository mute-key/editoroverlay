import * as vscode from 'vscode';

declare namespace Intf {

}

declare namespace Tp {
    type SetDecorationOptions = readonly vscode.Range[] | readonly vscode.DecorationOptions[]
}

export type {
    Intf,
    Tp
};