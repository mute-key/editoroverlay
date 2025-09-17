import type * as Decoration from './decoration.d';
import type * as Selection from './selection.d';
import type * as Status from './status.d';
import type * as Numeric from './numeric.d';

import * as vscode from 'vscode';

export type {
    Intf,
    Tp
};

declare namespace Intf {
    interface StatusRefContext {
        editor: vscode.TextEditor
    }

    interface BindContentTextState {
        functionOf: Status.Tp.ContentTextState,
        textOf: Status.Intf.StatusContentText,
        infoOf: Status.Intf.IndentInfo
    }

    interface MultiCursorOverlay {
        baseIndexRefBuffer: number[][],
        indexListRefBuffer: number[],
        calibration: number
    }

    interface MultiCursorState {
        strategyKey: number,
        /* --- SELECTION STATE --- */
        selectionReference: vscode.Selection[],
        selectionBuffer: vscode.Selection[],
        lineBuffer: Map<number, number>,
        cursorIndex: number,
        /* --- LINE RELATED STATE --- */
        // indexList: number[],
        // columnList: (number | string)[],
        baseLine: number,
        currentLine: number,
        previousLine: number,
        duplicateOverlayIndex?: number,
        /* --- LAST SELECTION STATE --- */
        lastSelection?: vscode.Selection | {},
        lastCount: number,
        /* --- OVERLAY STATE --- */
        overlayIndex: number,
        overlay: MultiCursorOverlay
    }

    interface MulticursorLineFuncContext {
        editor: vscode.TextEditor,
        pos: number,
        char: number,
        idx: number,
    }

    interface MultiCursorBaseRef {
        [key: string]: any
        count: undefined | vscode.DecorationInstanceRenderOptions
        ln: undefined | vscode.DecorationInstanceRenderOptions
    }

    interface MultiCursorTextRef extends MultiCursorBaseRef {
        nth: undefined | vscode.DecorationInstanceRenderOptions
        char: undefined | vscode.DecorationInstanceRenderOptions
        lc: undefined | vscode.DecorationInstanceRenderOptions
    }

    interface MultiCursorEditRef extends MultiCursorBaseRef {
        nth: undefined | vscode.DecorationInstanceRenderOptions
        col: undefined | vscode.DecorationInstanceRenderOptions
        zCol: undefined | vscode.DecorationInstanceRenderOptions
    }

    interface MultiCursorFlag {
        lastCount: number,
        sorted: boolean,
        mode: Numeric.Key.Hex,
        all: Numeric.Key.Hex[],
        text: Numeric.Key.Hex[],
        edit: Numeric.Key.Hex[],
    }

    interface MultiCursorLineFuncContext {
        editor: vscode.TextEditor,
        pos: number,
        char: number,
        idx: number,
    }

    interface MultiCursorContext {
        renderOption: any[] | [Decoration.Intf.RenderOption][],
        statusFnChain: any[],
        accumulate: Tp.AccumulaterFunc,
        lineFn: MultiCursorLineFuncContext,
        positionList: Map<number, any>,
        baseIndex: number[],
        indexList: number | number[],
        contentText: any[],
        columnList?: number[],
    }

    interface MultiCursorFunc {
        count: Tp.MultiCursorFuncSign
        ln: Tp.MultiCursorFuncSign
        lc: Tp.MultiCursorFuncSign
        char: Tp.MultiCursorFuncSign
    }

    interface MultiCursorFuncContext {
        editor: vscode.TextEditor
        idx: number,
        pos: number
    }
}

declare namespace Tp {

    type MultiCursorFuncSign = (context: Intf.MultiCursorFuncContext) => number

    type MultiCursorRenderOption = any[] | [][] | [Decoration.Intf.RenderOption][]

    type StatusRef = Record<string, any | vscode.DecorationInstanceRenderOptions>

    type FnChainSignature = (state: Intf.MultiCursorState, context: {} | Intf.MultiCursorContext) => (fn: any) => void

    type IndexControl = () => void

    type FunctionChain = (
        args: vscode.TextEditor | Intf.StatusRefContext,
        statusRef: StatusRef,
    ) => (
        [fnName, fnChain]: [string, (context: vscode.TextEditor | Intf.StatusRefContext) => number]
    ) => void

    /**
     * forEach callback function for multilines
     * 
     * @param setDecorations 
     * @param buffer 
     * @returns void
     */
    type BufferedFuncSignature = (
        setDecorations: vscode.TextEditor['setDecorations'],
        buffer: vscode.TextEditorDecorationType[]
    ) => (
        renderOption: any | vscode.DecorationRenderOptions,
        idx: number
    ) => void

    type RenderOptionOverride = (contentText: any[], cidx: number) => void

    type Mutation = (selections: readonly vscode.Selection[]) => vscode.Selection[]

    type MultiCursorStatusRef = Selection.Intf.MultiCursorTextRef | Selection.Intf.MultiCursorEditRef;

    type AccumulaterFunc = ([fnName, fnChain]: [fnName: string, fnChain: any]) => void;

    type FunctionChainAccumulater = (
        context: Intf.MulticursorLineFuncContext,
        Accumulated: Record<string, number>,
        statusRef: Intf.MultiCursorTextRef | Intf.MultiCursorEditRef
    ) => AccumulaterFunc;
}
