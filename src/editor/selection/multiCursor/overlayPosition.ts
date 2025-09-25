import type * as D from '../../../type/type';

import * as bin from '../../../constant/numeric/binary';

export {
    stepFuncSignature,
    duplicateOeverlayFunc,
    dispatchFnStep,
    overlayFunc,
};

declare namespace L {
    
    type ControlFuncSignColl = ((overlay: D.Selection.Intf.MultiCursorOverlay, indexList: number[]) => void)
        | ((index: number, indexList: number[]) => void)
        | ((indexPadding: number, indexList: number[]) => void)
        | ((state: D.Selection.Intf.MultiCursorState) => void)
        | ((overlay: D.Selection.Intf.MultiCursorOverlay, context: D.Selection.Intf.MultiCursorContext) => void)
        | ((overlay: D.Selection.Intf.MultiCursorOverlay, context: D.Selection.Intf.MultiCursorContext) => void)
        | ((state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.MultiCursorContext) => void)
        | ((context: D.Selection.Intf.MultiCursorContext) => void)

    export interface OverlayFunc {
        sign: D.Numeric.Key.Bin,
        body: any
    }

    export interface StepFuncSign {
        [key: D.Numeric.Key.Bin]: typeof stateControlFunc
        | typeof contextControlFunc
        | typeof stateContextControlFunc
        | typeof overlayControlFunc
        | typeof indexListControlFunc
        | typeof baseIndexControlFunc
    }
}

const dispatchFnStep = (state: any, context: any) => (fn: any) => {
    switch (fn.sign & bin.isSttCtxFnSign) {
        case bin.isSttCtxFnSign: // LSB is 1, need both state and context, ignore 2nd bit
            return stepFuncSignature[fn.sign](fn.body, state, context);
        case 0: // LSB is 0. call sign do not need state and context both.
            switch (fn.sign & bin.isSttOrCtxFnSign) {
                case bin.isSttOrCtxFnSign: // 0b10 as 2, only state arg required.
                    const stateFn = stepFuncSignature[fn.sign] as typeof stateControlFunc;
                    return stateFn(fn.body, state); 
                case 0:  // 0b00 as 0. only context arg required.
                    const contextFn = stepFuncSignature[fn.sign] as typeof contextControlFunc;
                    return contextFn(fn.body, context);
                default:
                    // for the future implementations for more states
                    return null;
            }
        default:
            // for the future implementations for more states
            return null; // Handle other cases
    }
};


const pushCursorIndex: L.OverlayFunc = {
    sign: bin.overlayControl,
    body: (overlay: D.Selection.Intf.MultiCursorOverlay, indexList: number[]): void => {
        let l = overlay.calibration;
        while (l--) {
            overlay.baseIndexRefBuffer[l][0] += 1;
        }
    }
};

/** push baseIndex value array reference into the overlay state buffer */
const pushCursorGroup: L.OverlayFunc = {
    sign: bin.baseIndexControl,
    body: (overlay: D.Selection.Intf.MultiCursorOverlay, baseIndex: number[]): void => {
        overlay.baseIndexRefBuffer.push(baseIndex);
    }
};

const appendNthIndex: L.OverlayFunc = {
    sign: bin.indexListControl,
    body: (index: number = 0, indexList: number[]): void => {
        indexList.push(index + 1);
    }
};

const prependNthIndex: L.OverlayFunc = {
    sign: bin.indexListControl,
    body: (index: number = 0, indexList: number[]): void => {
        indexList.unshift(indexList[0] - 1);
    }
};

const prependNthLastIndex: L.OverlayFunc = {
    sign: bin.indexListControl,
    body: (indexPadding: number = 0, indexList: number[]): void => {
        indexList.push(indexList[indexList.length - 1] + indexPadding + 1);
    }
};

const resetOverlayIndex: L.OverlayFunc = {
    sign: bin.stateOnlyControl,
    body: (state: D.Selection.Intf.MultiCursorState): void => {
        state.overlayIndex = 1;
        state.baseLine = state.currentLine;
    }
};

const increaseCalibration: L.OverlayFunc = {
    sign: bin.overlayControl,
    body: (overlay: { calibration: number; }, context: any): void => {
        overlay.calibration++;
    }
};

const createBaseIndex: L.OverlayFunc = {
    sign: bin.contextOnlyControl,
    body: (context: D.Selection.Intf.MultiCursorContext): void => {
        context.baseIndex = [0];
    }
};

const resetCurrentIndex: L.OverlayFunc = {
    sign: bin.stateOnlyControl,
    body: (state: D.Selection.Intf.MultiCursorState): void => {
        state.cursorIndex = 0;
    }
};

const equalizeLineState: L.OverlayFunc = {
    sign: bin.stateOnlyControl,
    body: (state: D.Selection.Intf.MultiCursorState): void => {
        state.baseLine = state.currentLine;
    }
};

const allocateIndexList: L.OverlayFunc = {
    sign: bin.stateContextControl,
    body: (state: D.Selection.Intf.MultiCursorState, context: D.Selection.Intf.MultiCursorContext): void => {
        context.indexList = state.overlay.indexListRefBuffer[state.duplicateOverlayIndex as number];
    }
};

const duplicateOeverlayFunc = {
    [/* 05 */ bin.firstToLast]: [appendNthIndex],
    [/* 01 */ bin.firstToLastWithExistingDup]: [pushCursorIndex, pushCursorGroup, appendNthIndex],
    [/* 12 */ bin.baseAndLast]: [pushCursorGroup, appendNthIndex],
    [/* 08 */ bin.lastOnly]: [appendNthIndex],
    [/* 10 */ bin.asLastWithExistingDup]: [pushCursorIndex, appendNthIndex],
    [/* 14 */ bin.asLastOnBaseWithWithExistingDup]: [pushCursorIndex, appendNthIndex],
    [/* 18 */ bin.notAsLastWithoutExistingDup]: [allocateIndexList, prependNthIndex, pushCursorIndex], // #FIX
    [/* 02 */ bin.withExistingDup]: [],
    [/* 20 */ bin.baseAndNotLast]: [increaseCalibration, pushCursorIndex, createBaseIndex, pushCursorGroup, resetCurrentIndex, equalizeLineState, allocateIndexList, prependNthIndex]
    // [/* 04 */ bin.recurringLine3]: [pushCursorGroup, pushCursorIndex, (indexList: number[]) => prependNthLastIndex.body(-1, indexList)],
    // [/* 06 */ bin.recurringLine5]: [(indexList: number[]) => prependNthLastIndex.body(1, indexList), pushCursorIndex,],
};

const initBaseIndex: L.OverlayFunc = {
    sign: bin.overlayControl,
    body: (overlay: { calibration: any; }, ctx: { baseIndex: any[]; }) => {
        ctx.baseIndex = [overlay.calibration];
    }
};

const overlayFunc: Record<D.Numeric.Key.Bin, any[]> = {
    [/* _0 */ bin.noIndexControl]: [],
    [/* _1 */ bin.increaseIndex]: [increaseCalibration, pushCursorIndex, createBaseIndex, pushCursorGroup, resetCurrentIndex, equalizeLineState],
    [/* _2 */ bin.withDup]: [pushCursorIndex],
    [/* _3 */ bin.newBeforeBaseWithDup]: [createBaseIndex, pushCursorIndex, resetCurrentIndex, equalizeLineState],
    [/* 32 */ bin.init]: [initBaseIndex, pushCursorGroup],
    [/* 32 */ bin.initButNewBeforeInit]: [initBaseIndex, pushCursorGroup],
};

const stateControlFunc = (fn: (state: D.Selection.Intf.MultiCursorState) => void, state: D.Selection.Intf.MultiCursorState) => fn(state);
const contextControlFunc = (fn: (ctx: D.Selection.Intf.MultiCursorContext) => void, ctx: D.Selection.Intf.MultiCursorContext) => fn(ctx);
const stateContextControlFunc = (fn: (state: D.Selection.Intf.MultiCursorState, ctx: D.Selection.Intf.MultiCursorContext) => any, state: D.Selection.Intf.MultiCursorState, ctx: D.Selection.Intf.MultiCursorContext) => fn(state, ctx);
const overlayControlFunc = (fn: (arg0: D.Selection.Intf.MultiCursorOverlay, arg1: D.Selection.Intf.MultiCursorContext) => any, state: D.Selection.Intf.MultiCursorState, ctx: D.Selection.Intf.MultiCursorContext) => fn(state.overlay, ctx);
const indexListControlFunc = (fn: (arg0: number, arg1: number | number[]) => any, state: D.Selection.Intf.MultiCursorState, ctx: D.Selection.Intf.MultiCursorContext) => fn(state.cursorIndex, ctx.indexList);
const baseIndexControlFunc = (fn: (arg0: D.Selection.Intf.MultiCursorOverlay, arg1: number[]) => any, state: D.Selection.Intf.MultiCursorState, ctx: D.Selection.Intf.MultiCursorContext) => fn(state.overlay, ctx.baseIndex);

const stepFuncSignature = {
    // state only 
    [/* 578 */ bin.stateOnlyControl]: stateControlFunc,
    // context only 
    [/* 580 */ bin.contextOnlyControl]: contextControlFunc,
    // both state and context
    [/* 577 */ bin.stateContextControl]: stateContextControlFunc,
    [/* 579 */ bin.overlayControl]: overlayControlFunc,
    [/* 581 */ bin.indexListControl]: indexListControlFunc,
    [/* 583 */ bin.baseIndexControl]: baseIndexControlFunc,
};
