// import * as vscode from 'vscode';
// import * as __0x from '../../../constant/shared/numeric';

// import type * as D from '../../../type/type.d';

// /**
//  * 이것도 3개의 객체로 쪼개자 
//  * 
//  * 1. 스테이트 그 자체 
//  * 2. 선택전용 스테이트 
//  * 3. 에딧전용 스테이트 
//  */
// const multiCursorState: Record<string, any | number | boolean | vscode.Selection[]> = {
//     context: {
//         editor: {} as any | vscode.TextEditor,
//         pos: 0,
//         char: 0,
//         idx: 0,
//     },
//     selections: [] as vscode.Selection[],
//     // nthPosition: 1,
//     // nthPositionEdit: 1,
//     statusIndex: 1,
//     duplicateEntryIdx: undefined,
//     baseLine: -1,
//     currentLine: -1,
//     index: 1,
//     indexList: [],
//     lastSelectionCount: 0,
// };

// const clearMultiCursorState = (): void => {
//     LineSelectionBuffer.splice(0);
//     multiCursorState.selections = [];
//     multiCursorState.index = 1;
//     multiCursorState.statusIndex = 1;
//     multiCursorState.duplicateEntryIdx = undefined;
//     multiCursorState.baseLine = -1;
//     multiCursorState.context.pos = 0;
//     multiCursorState.context.editor = {};
//     multiCursorCounter.nth = 0;
//     multiCursorCounter.count = 0;
//     multiCursorCounter.ln = 0;
//     multiCursorCounter.lc = 0;
//     multiCursorCounter.char = 0;
//     multiCursorGroup.list = [];
//     multiCursorGroup.idx = 0;
// };

// const multiCursorGroup = {
//     list: [] as any | [][],
//     idx: 0
// };


// const multiCursorCounter: Record<string, number> = {
//     nth: 0,
//     count: 0,
//     ln: 0,
//     lc: 0,
//     char: 0,
// };

// const multiCursorTextPlaceholder: Record<string, null | number> = {
//     nth: null,
//     ln: null
// };

// const multiCursorEditPlaceholder: Record<string, null | number> = {
//     nth: null,
//     ln: null,
//     col: null,
//     zCol: null,
// };

// const multiCursorTextPosition = (placeholder: string, position: number): void => {

//     if (placeholder === 'nth') {
//         multiCursorTextPlaceholder.nth = position;
//     }

//     if (placeholder === 'ln') {
//         multiCursorTextPlaceholder.ln = position;
//     }
// };

// const multiCursorEditPosition = (placeholder: string, position: number): void => {
//     if (placeholder === 'nth') {
//         multiCursorEditPlaceholder.nth = position;
//     }

//     if (placeholder === 'ln') {
//         multiCursorEditPlaceholder.ln = position;
//     }

//     if (placeholder === 'col') {
//         multiCursorEditPlaceholder.col = position;
//     }

//     if (placeholder === 'zCol') {
//         multiCursorEditPlaceholder.zCol = position;
//     }
// };

// const nthRenderOption = (hexKey: number, cidx: number) => {
//     selectionContentText[hexKey].contentText[cidx].after = {
//         ...selectionContentText[hexKey].contentText[cidx].after,
//         groupIndex: parseInt(multiCursorGroup.idx.toString()),
//         baseIndex: multiCursorGroup.list[multiCursorGroup.idx],
//         indexList: [multiCursorState.statusIndex],
//         get contentText() {
//             return this.indexList.map(i => i + this.baseIndex[0]).join(',');
//         },
//     };
// };

// const colRenderOption = (hexKey: number, cidx: number) => {
//     selectionContentText[hexKey].contentText[cidx].after = {
//         ...selectionContentText[hexKey].contentText[cidx].after,
//         position: [],
//         get contentText() {
//             return this.position.join(',');
//         },
//     };
// };

// const pushMultiCursorOption = (hexKey: number, selectionIndex: number, atomic: any[]) => (contentText: string | any, idx: number): void => {
//     const found = atomic.find((e) => e.toString() === idx.toString()) !== undefined;
//     selectionDecorationOption[hexKey][idx].push({
//         get range() {
//             return multiCursorState.selections[selectionIndex];
//         },
//         renderOptions: found ? { ...contentText } : contentText
//     });
// };

// /**
//  * 
//  */
// const LineSelectionBuffer: [number, number][] = [];

// const checkIfDuplicateLine = (lineNumber: number): number | undefined => {
//     let l = LineSelectionBuffer.length;
//     while (l--) {
//         if (LineSelectionBuffer[l][0] === lineNumber) {
//             return l;
//         }
//     }
//     return undefined;
// };

// const ifOnLastSelection = (selectionIndex: number): boolean => {
//     return selectionIndex > 0 && multiCursorState.currentLine === multiCursorState.selections[selectionIndex - 1].end.line;
// };

// const ifDuplicateIndexIsNotlast = (): boolean => LineSelectionBuffer.length > multiCursorState.duplicateEntryIdx + 1;

// const pushCursorIndex = (calibration: number = 0): void => {
//     let l = multiCursorGroup.idx + calibration;
//     while (l--) {
//         multiCursorGroup.list[l][0] += 1;
//     }
// };

// const pushCursorGroup = (): void => {
//     multiCursorGroup.idx += 1;
//     multiCursorGroup.list.push([0]);
// };

// const appendNthIndex: D.Selection.Tp.IndexFnSignature = (index = 0): void => multiCursorState.indexList.push(index);

// const prependNthIndex: D.Selection.Tp.IndexFnSignature = (index = 0): void => multiCursorState.indexList.unshift(index);

// const prependNthLastIndex: D.Selection.Tp.IndexFnSignature = (calibration = 0): void => appendNthIndex(multiCursorState.indexList[multiCursorState.indexList.length - 1] + calibration);

// const duplicateEntryStep: Record<number, any[]> = {
//     [__0x.recurringLine0]: [appendNthIndex],
//     [__0x.recurringLine1]: [pushCursorIndex, pushCursorGroup, () => appendNthIndex(multiCursorState.statusIndex)],
//     [__0x.recurringLine2]: [() => appendNthIndex(multiCursorState.statusIndex)],
//     [__0x.recurringLine3]: [pushCursorGroup, pushCursorIndex, () => prependNthLastIndex(-1)],
//     [__0x.recurringLine4]: [() => appendNthIndex(multiCursorState.statusIndex)],
//     [__0x.recurringLine5]: [() => prependNthLastIndex(1), pushCursorIndex,],
//     [__0x.recurringLine6]: [pushCursorIndex, () => appendNthIndex(multiCursorState.statusIndex)],
//     [__0x.recurringLine7]: [pushCursorIndex, () => appendNthIndex(multiCursorState.statusIndex)],
//     [__0x.recurringLine8]: [pushCursorIndex, prependNthIndex],
//     [__0x.recurringLine9]: [pushCursorGroup, pushCursorIndex, prependNthIndex, () => { ; multiCursorState.statusIndex = 1; multiCursorState.baseLine = multiCursorState.currentLine; }]
// };

// const entryStep: Record<number, any[]> = {
//     [0]: [],
//     [__0x.nonRecurringLine0]: [() => { multiCursorState.statusIndex = 1; }, () => { multiCursorState.baseLine = multiCursorState.currentLine; }, pushCursorGroup, pushCursorIndex],
//     [__0x.nonRecurringLine1]: [pushCursorIndex,],
// };

// const duplicateSelectionSignature = (selectionIndex: number): number => {
//     return (multiCursorState.currentLine < multiCursorState.baseLine ? __0x.MULTI_CURSOR_SELECTION_SIGNATURE.TO_SHIFT_INDEX : 0)
//         + (multiCursorGroup.idx > 0 ? __0x.MULTI_CURSOR_SELECTION_SIGNATURE.INDEX_SHIFTED : 0)
//         + (multiCursorState.currentLine === multiCursorState.baseLine ? __0x.MULTI_CURSOR_SELECTION_SIGNATURE.ON_BASELINE : 0)
//         + (ifOnLastSelection(selectionIndex) ? __0x.MULTI_CURSOR_SELECTION_SIGNATURE.AS_LAST_SELECTION : 0)
//         + (ifDuplicateIndexIsNotlast() ? __0x.MULTI_CURSOR_SELECTION_SIGNATURE.DUPLICATE_LINE_NOT_AS_LAST_SELECTION : 0);
// };

// const nonDuplicateSelectionSignature = (): number => {
//     return ((multiCursorState.currentLine < multiCursorState.baseLine) ? __0x.MULTI_CURSOR_SELECTION_SIGNATURE.TO_SHIFT_INDEX : 0)
//         + ((multiCursorGroup.idx > 0) ? __0x.MULTI_CURSOR_SELECTION_SIGNATURE.INDEX_SHIFTED : 0);
// };

// const fnStep = (fn: D.Selection.Tp.IndexFnSignature): void => fn();

// /**
//  * 
//  * 
//  * @param selectionIndex 
//  * @returns 
//  */
// const multiCursorDecorationOption = (hexKey: number, selectionIndex: number, placehoder, renderOption): void => {

//     // index control 
//     const duplicateEntry = checkIfDuplicateLine(multiCursorState.context.editor.selections[multiCursorState.index].end.line);
//     if (duplicateEntry !== undefined) {
//         multiCursorState.duplicateEntryIdx = duplicateEntry;
//         multiCursorState.indexList = selectionDecorationOption[hexKey][placehoder['nth']][multiCursorState.duplicateEntryIdx].renderOptions.after.indexList;
//         duplicateEntryStep[duplicateSelectionSignature(selectionIndex)].forEach(fnStep);
//         return;
//     }
//     entryStep[nonDuplicateSelectionSignature()].forEach(fnStep);



//     LineSelectionBuffer.push([multiCursorState.selections[selectionIndex].end.line, selectionIndex]);
//     renderOption.forEach((fn) => fn[0](hexKey, fn[1]));
//     selectionContentText[hexKey].contentText.forEach(pushMultiCursorOption(hexKey, selectionIndex, [placehoder['nth']]));
// };

// const increaseIndex = (): void => {
//     multiCursorState.index++;
//     multiCursorState.statusIndex++;
// };

// const prepareMultiCursor = (editor: vscode.TextEditor, baseLine: number): void => {
//     multiCursorState.index = 0;
//     multiCursorGroup.list.push([0]);
//     multiCursorState.context.editor = editor;
//     multiCursorState.context.pos = multiCursorState.index;
//     multiCursorState.baseLine = baseLine;
// };

// const renderMultiCursorText = () => {

// };

// const addMultiCursorSelection = (selection: vscode.Selection): void => {

//     multiCursorState.selections.push(selection);
//     multiCursorState.currentLine = multiCursorState.selections[multiCursorState.index].end.line;
//     selectionStatusFunctionChain[__0x.multiCursorText].forEach(functionChainAccumulate(multiCursorTextRef, multiCursorState.context));
//     multiCursorDecorationOption(
//         __0x.multiCursorText,
//         multiCursorState.index,
//         multiCursorTextPlaceholder,
//         [[nthRenderOption, multiCursorTextPlaceholder.nth]]
//     );
//     increaseIndex();
// };

// const functionChainAccumulate: D.Selection.Tp.FunctionChain = (statusRef, args) => ([fnName, fnChain]) => {
//     if (fnName === 'char') {
//         multiCursorCounter[fnName] += fnChain(args);
//         statusRef[fnName].contentText = multiCursorCounter[fnName].toString();
//     } else {
//         statusRef[fnName].contentText = fnChain(args).toString();
//     }
// };


// /**
//  * col 하고 zCol 두개는 따로 함수로 뺴야겟다 
//  * 이건 contentText 스타일도 따로 배열로 관리해야겟다 
//  * 같은 라인에 커서가 하나 이상일때 그래서 배열로 ([0, 1...]/20)?, nth 자체는 선택영역과 같은 배열 형태로 
//  * 
//  * multiCursorFn 에서 바인딩 새로 추가하고 editor 받고 index 받자.
//  * 애초에 editor.selections 자체를 정렬한뒤 렌더링 함수를 호출하면된다 
//  * 이게 하나씩 쌓아가는 방식이 아니니까 상관없다
//  * 
//  * 이 기능을 완성하고 나면 두개를 함쳐서 코드 스플릿과 코드 압축 그리고 스트림라이닝 셋다 해야한다 
//  * 
//  * 지금 이미 이 모듈이 너무 커서 따로 확장모듈로 코드를 좀 뺴야 읽을만 한거같다 
//  * 그게 아니면 스크롤에만 한세월이다 
//  * 
//  * 값이 같은 값을 가지는 참조형 contentText 와 복사형 contentText 두개가 필요하다 
//  * 
//  * @param editor 
//  */
// const addMultiCursorEdit = (editor: vscode.TextEditor) => {
//     multiCursorState.baseLine = 0;
//     multiCursorState.selections = editor.selections;
//     multiCursorState.context.editor = editor;

//     const renderOptionList: any[] = [];

//     if (multiCursorEditPlaceholder.nth) {
//         renderOptionList.push([nthRenderOption, multiCursorEditPlaceholder.nth]);
//     }

//     if (multiCursorEditPlaceholder.col) {
//         renderOptionList.push([colRenderOption, multiCursorEditPlaceholder.col]);
//     }

//     if (multiCursorEditPlaceholder.zCol) {
//         renderOptionList.push([colRenderOption, multiCursorEditPlaceholder.zCol]);
//     }

//     multiCursorState.selections.forEach((s, idx) => {
//         multiCursorState.currentLine = s.end.line;
//         multiCursorState.currentLine = multiCursorState.selections[idx].end.line;
//         multiCursorState.context.idx = idx;
//         selectionStatusFunctionChain[__0x.multiCursorEdit].forEach(functionChainAccumulate(multiCursorEditRef, multiCursorState.context));
//         multiCursorDecorationOption(
//             __0x.multiCursorEdit,
//             idx,
//             multiCursorEditPlaceholder,
//             renderOptionList);
//         increaseIndex();
//     });

//     selectionTextBuffer[__0x.multiCursorEdit].forEach(renderMultiCursor(editor.setDecorations, selectionDecorationOption[__0x.multiCursorEdit]));
// };

// const setRangePointer = (refObject: vscode.Range[]) => (selection: vscode.Selection, idx: number): vscode.Selection => refObject[idx] = selection;

// const renderMultiCursor = (setDecorations: D.Editor.Tp.RenderOverlay, decorationOption: D.Selection.Tp.MultiCursorRenderOption) => (decorationType: vscode.TextEditorDecorationType, idx: number): void => setDecorations(decorationType, decorationOption[idx]);


// export {
//     multiCursorTextPosition,
//     multiCursorEditPosition,
//     prepareMultiCursor,
//     addMultiCursorEdit,
//     setRangePointer,
//     renderMultiCursor,
//     clearMultiCursorState,
//     addMultiCursorSelection,

// };