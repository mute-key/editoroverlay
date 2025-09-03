import type * as Decoration from './decoration.d';
import type * as Status from './status.d';
import type * as Numeric from './numeric.d';
import type * as Editor from './editor.d';

import * as vscode from 'vscode';
import * as __0x from '../constant/shared/numeric.ts';

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
        calibration: number,
        newBase: boolean
    }

    interface MultiCursorState {
        /* --- SELECTION STATE --- */
        selectionBuffer: vscode.Selection[],
        lineBuffer: Map<number, number>,
        cursorIndex: number,
        /* --- LINE RELATED STATE --- */
        indexList: number[],
        columnList: (number | string)[],
        baseLine: number,
        currentLine: number,
        previousLine: number,
        duplicateOverlayIndex: number,
        /* --- LAST SELECTION STATE --- */
        lastSelection?: vscode.Selection | {},
        lastSelectionCount: number,
        /* --- OVERLAY STATE --- */
        overlayIndex: number,
        overlay: MultiCursorOverlay
    }

    interface MultcursorContext {
        editor: vscode.TextEditor,
        pos: number,
        char: number,
        idx: number,
    }

    interface MultiCursorTextRef {
        nth: undefined | vscode.DecorationInstanceRenderOptions
        count: undefined | vscode.DecorationInstanceRenderOptions
        ln: undefined | vscode.DecorationInstanceRenderOptions
        lc: undefined | vscode.DecorationInstanceRenderOptions
        char: undefined | vscode.DecorationInstanceRenderOptions
    }

    interface MultiCursorEditRef {
        nth: undefined | vscode.DecorationInstanceRenderOptions
        count: undefined | vscode.DecorationInstanceRenderOptions
        ln: undefined | vscode.DecorationInstanceRenderOptions
        col: undefined | vscode.DecorationInstanceRenderOptions
        zCol: undefined | vscode.DecorationInstanceRenderOptions
    }

    // interface MultiCursorGroup {
    //     baseBuffer: any | [number][],
    //     idx: number,
    // }

    

    interface MultiCursorFlag {
        lastCount: number,
        sorted: boolean,
        mode: Numeric.Key.Hex,
        all: Numeric.Key.Hex[],
        text: Numeric.Key.Hex[],
        edit: Numeric.Key.Hex[],
    }

    interface MultiCursorOverlayContext {
        editor: vscode.TextEditor,
        pos: number,
        char: number,
        idx: number,
    }

    interface TextContext {
        lineFn: MultiCursorOverlayContext,
        contentText: any[],
        flag: MultiCursorFlag,
        position: number[],
    }

    interface EditContext {
        lineFn: MultiCursorOverlayContext,
        contentText: any[],
        flag: MultiCursorFlag,
        position: number[],
    }
}

declare namespace Tp {
    type MultiCursorRenderOption = any[] | [][] | [Decoration.Intf.RenderOption][]

    type StatusRef = Record<string, any | vscode.DecorationInstanceRenderOptions>

    type FnChainSignature = (state: Intf.MultiCursorState, context: {} | LineHandlerContext) => (fn: any) => void

    // type IndexFnSignature = (
    //     state: Intf.MultiCursorState,
    //     group: Intf.MultiCursorGroup,
    //     indexList: number[],
    //     cursorIndex: number,
    //     calibration: number
    // ) => void

    type IndexControl = () => void

    /**
     * 
     */
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

    type LineHandlerContext = Intf.TextContext | Intf.EditContext
}