import * as vscode from 'vscode';
import type * as Decoration from './decoration';

export namespace Intf {
    interface StatusRefContext {
        editor: vscode.TextEditor
    }
}

export namespace Tp {
    type MultiCursorRenderOption = any[] | [][] | [Decoration.Intf.RenderOption][]

    type StatusRef = Record<string, any | vscode.DecorationInstanceRenderOptions>

    type FunctionChain = (
        statusRef: StatusRef,
        args: vscode.TextEditor | Intf.StatusRefContext
    ) => (
        [fnName, fnChain]: [string, (args: vscode.TextEditor | Intf.StatusRefContext) => number]
    ) => void
}