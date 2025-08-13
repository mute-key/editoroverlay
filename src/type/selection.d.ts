import * as vscode from 'vscode';
import type * as Decoration from './decoration';
import type * as Status from './status';

export namespace Intf {
    interface StatusRefContext {
        editor: vscode.TextEditor
    }

    interface BindContentTextState {
        functionOf: Status.Tp.ContentTextState,
        textOf: Status.Intf.StatusContentText,
        infoOf: Status.Intf.IndentInfo
    }
}

export namespace Tp {
    type MultiCursorRenderOption = any[] | [][] | [Decoration.Intf.RenderOption][]

    type StatusRef = Record<string, any | vscode.DecorationInstanceRenderOptions>

    /**
     * 
     */
    type FunctionChain = (
        statusRef: StatusRef,
        args: vscode.TextEditor | Intf.StatusRefContext
    ) => (
        [fnName, fnChain]: [string, (args: vscode.TextEditor | Intf.StatusRefContext) => number]
    ) => void

    type IndexFnSignature = (number?: number) => void

    /**
     * forEach callback function for multilines
     * 
     * @param setDecorations 
     * @param buffer 
     * @param channel 
     * @param countBuffer 
     * @returns void
     */
    type BufferedFuncSignature = (
        setDecorations: vscode.TextEditor['setDecorations'],
        buffer: vscode.TextEditorDecorationType[]
    ) => (
        renderOption: any | vscode.DecorationRenderOptions, idx: number
    ) => void
}

