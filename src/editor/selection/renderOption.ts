import type * as D from '../../type/type';

import * as vscode from 'vscode';

export {
    setGetterProp,
    nthDescriptor,
    colDescriptor,
    rangeDescriptor,
    contentTextGetter,
    rangeGetter,
    replicateNthRenderOption,
    replicateColsRenderOption,
    nthRenderOptionOverride,
    colRenderOptionOverride
};

declare namespace L {

    export interface NthRenderOptionAfter {
        baseIndex: any
        indexList: number[]
    }

    export type NthRenderOption = {
        after: {} & NthRenderOptionAfter
    }

    export interface ColRenderOptionAfter {
        editor: vscode.TextEditor
        columnList: number[]
    }

    export type ColRenderOption = {
        after: {} & ColRenderOptionAfter
    }
}

const addBaseIndex = (baseIndex: number[]) => (i: number): number => {
    return i + baseIndex[0];
};

const contentTextGetter: string = 'contentText';

const rangeGetter: string = 'range';

const nthContentText = {
    get contentText(): string {
         // @ts-ignore, no need to add local prop here.
        return this.indexList.map(addBaseIndex(this.baseIndex)).join(',');
    },
};

const getColumnContentText = (columns: number[], columnFunc: (editor: any, index: number, delta: number) => string, editor: any, delta: number): string => {
    return columns.map(index => columnFunc(editor, index, delta)).join(', ');
};

const colContentText = {
    get contentText(): string {
         // @ts-ignore, no need to add local prop here.
        const { columnList, columnFunc, editor, detla } = this;
        return getColumnContentText(columnList, columnFunc, editor, detla);
    }
};

const renderOptionRange = {
    get range(): vscode.Selection {
         // @ts-ignore, no need to add local prop here.
        return this.selectionBuffer[this.selectionBufferIndex];
    }
};

const nthDescriptor = Object.getOwnPropertyDescriptor(nthContentText, contentTextGetter);

const colDescriptor = Object.getOwnPropertyDescriptor(colContentText, contentTextGetter);

const rangeDescriptor = Object.getOwnPropertyDescriptor(renderOptionRange, rangeGetter);

const setGetterProp = (target: object , getterName: string, getterDescriptor: PropertyDescriptor ) => {
    Object.defineProperty(target, getterName, getterDescriptor);
};

const replicateNthRenderOption = (contentText: L.NthRenderOption, state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.MultiCursorContext) => {
    const contentTextBuffer: L.NthRenderOption = { ...contentText };
    contentTextBuffer.after = {
        ...contentText.after,
        baseIndex: context.baseIndex,
        indexList: [state.cursorIndex],
    };

    setGetterProp(contentTextBuffer.after, contentTextGetter, nthDescriptor as PropertyDescriptor );

    // this references are to reduce the search step for the 
    // array object for the post process
    context.baseIndex = contentTextBuffer.after.baseIndex;
    context.indexList = contentTextBuffer.after.indexList;

    const indexes = Array.isArray(context.indexList);
    indexes ? state.overlay.indexListRefBuffer.push(...context.indexList) : state.overlay.indexListRefBuffer.push(context.indexList as unknown as number);

    return contentTextBuffer;
};

const replicateColsRenderOption = (contentText: L.ColRenderOption, state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.MultiCursorContext) => {
    const contentTextBuffer = { ...contentText };
    contentTextBuffer.after = {
        ...contentText.after,
        editor: context.lineFn.editor,
        columnList: [state.selectionBuffer.length - 1]
    };

    context.columnList = contentTextBuffer.after.columnList;
    setGetterProp(contentTextBuffer.after, contentTextGetter, colDescriptor as PropertyDescriptor );
    return contentTextBuffer;
};

const nthRenderOptionOverride = (contentText: vscode.DecorationInstanceRenderOptions & any, context: D.Selection.Intf.MultiCursorContext): void => {
    contentText.after.baseIndex = [0];
    contentText.after.indexList = [];
    context.baseIndex = contentText.after.baseIndex;
    context.indexList = contentText.after.indexList;
    setGetterProp(contentText.after, contentTextGetter, nthDescriptor as PropertyDescriptor );
};

const colRenderOptionOverride = (contentText: vscode.DecorationInstanceRenderOptions & any, columnOfIndex: { (editor: vscode.TextEditor, idx?: number, delta?: number): number | string; (editor: vscode.TextEditor, idx?: number, delta?: number): number | string; }, delta: number = 0, context: D.Selection.Intf.MultiCursorContext): void => {
    contentText.after.delta = delta;
    contentText.after.columnFunc = columnOfIndex;
    contentText.after.columnList = [];
    context.columnList = contentText.after.columnList;
    setGetterProp(contentText.after, contentTextGetter, colDescriptor as PropertyDescriptor );
};
