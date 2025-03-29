import * as vscode from 'vscode';
import * as Type from '../../type/type';
import * as __0x from '../../constant/numeric';
import { hightlightCoordinator, unsetRangeOfHighlightStyle } from './highlight/highlight';
import { updateDiagnostic } from '../../diagnostic/diagnostic';
import { applyDecoration, createEditorDecorationType, isHighlightChanged, unsetAndDisposeDecoration } from './decoration';
import { renderGroupIs } from '../editor';
import { SELECTION_KIND } from '../../constant/object';


const clearDecorationState = (decorationState: Type.DecorationStateType) => {
    decorationState.appliedHighlight.applied = { ...SELECTION_KIND[__0x.reset] };
    decorationState.appliedHighlight.ofDecorationType = undefined;
    decorationState.selectionInfo = [];
    decorationState.diagnosticInfo = [];
    // decorationState.statusText = [];
};

// const statusInfoHandler = (editor: vscode.TextEditor, statusText: vscode.TextEditorDecorationType[], range: vscode.Range) => (decorationOption: vscode.DecorationRenderOptions, idx: number): void => {
//     // console.log(decorationOption);
//     const decoration = createEditorDecorationType(decorationOption);
//     applyDecoration(editor, decoration, [range]);
//     if (statusText[idx].key) {
//         applyDecoration(editor,statusText[idx], []);
//         statusText[idx].dispose();
//     }
//     statusText[idx] = decoration;
// };


// 쪼개는게 낫겟다 
// 이거 계속 반복문으로 염병하는건 너무 비효율적이다 


const renderStatusInfo = ({ editor, renderGroup, decorationState }) => {

    // resetPrevious(decorationState.appliedHighlight.applied);

    // decorationState.selectionText = unsetAndDisposeDecoration(editor, decorationState.selectionText);

    if (renderGroup.selection) {
        const selectionInfo = renderGroup.selection(editor, renderGroup.type) as Type.StatusTextInfoType[];
        // // console.log(selectionInfo)
        // // console.log(renderGroup.type.KEY, selectionTextBuffer[renderGroup.type.KEY][0].length);
        // let length = selectionTextBuffer[renderGroup.type.KEY].length | 0;

        // while (length--) {
        //     selectionInfo[length][0].forEach(
        //         statusInfoHandler(
        //             editor,
        //             selectionTextBuffer[renderGroup.type.KEY][length],
        //             selectionInfo[length][1]
        //         )
        //     );
        // }
        // delete decorationState.selectionInfo;
    }

    // decorationState.diagnosticText = unsetAndDisposeDecoration(editor, decorationState.diagnosticText);

    // disposeBuffer.push(...);


    // if (renderGroup.diagnostic) {
    //     decorationState.diagnosticInfo = renderGroup.diagnostic(editor, updateDiagnostic()) as Type.StatusTextInfoType[];

    //     let length = decorationState.diagnosticInfo.length | 0;

    //     while (length--) {
    //         decorationState.diagnosticInfo[length].contentText.forEach(
    //             statusInfoHandler(
    //                 editor,
    //                 decorationState.diagnosticText,
    //                 decorationState.diagnosticInfo[length].range,
    //                 length
    //             )
    //         );
    //     }
    //     // delete decorationState.diagnosticInfo;

    //     // while (length--) {
    //     //     decorationState.statusText.push(...decorationState.diagnosticText[length].contentText.map(decorationOption => {
    //     //         const decoration = createEditorDecorationType(decorationOption as vscode.DecorationRenderOptions);
    //     //         applyDecoration(editor, decoration, [decorationState.diagnosticText[length].range]);
    //     //         return decoration;
    //     //     }));
    //     // }
    // }
};

const renderDecorationOnEditor = (context: Type.DecorationContext) => {

    const renderGroup: Type.RenderGroupSetProperty = renderGroupIs(context.editor);

    context.renderGroup = renderGroup;
    
    // if (context.decorationState.appliedHighlight.applied.MASK !== renderGroup.type.MASK) {
    //     unsetRangeOfHighlightStyle(context.editor);
    // }

    hightlightCoordinator(renderGroup.type.KEY, context.decorationState.appliedHighlight.applied.KEY);

    context.decorationState.appliedHighlight.applied = renderGroup.type;

    // highlightInfo.forEach(Highlight => {
    //     applyDecoration(context.editor, Highlight.decoration, Highlight.range);
    //     return Highlight.decoration;
    // });

    // context.decorationState.appliedHighlight.applied = renderGroup.type;

    // renderStatusInfo(context);
};

export {
    // sealBuffer,
    // setSelectionTextbufferSize,
    clearDecorationState,
    renderDecorationOnEditor,
    renderStatusInfo,
};
