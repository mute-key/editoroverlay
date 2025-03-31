import * as vscode from 'vscode';
import * as Type from '../../type/type';
import * as __0x from '../../constant/shared/numeric';
import { hightlightCoordinator, unsetRangeOfHighlightStyle } from './highlight/highlight';
import { updateDiagnostic } from '../../diagnostic/diagnostic';
// import { isHighlightChanged } from './decoration';
import { renderGroupIs } from '../editor';
import { SELECTION_KIND } from '../../constant/object';
import { selectionInfo } from './status/selection';


const clearDecorationState = (decorationState: Type.DecorationStateType) => {
    decorationState.appliedHighlight[0] = __0x.reset;
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

    // resetPrevious(decorationState.appliedHighlight[0].applied);

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

// 에디터 객체가 꼬일 가능성이 있는건가? 흠 
// 셀렉션 타입이 바뀌면 그 전의것을 완벽하게 리셋을 해야한다.
// 깔끔하게 리셋하는 방법을 생각해봐야겟다.
// 같은 타입이면 클리어 깨끝하게 된다.
const renderDecorationOnEditor = ({editor, decorationState}: Type.DecorationContext) => {


    const renderGroup: Type.RenderGroupSetProperty = renderGroupIs(editor);

    hightlightCoordinator(renderGroup.highlight, decorationState.appliedHighlight[0]);

    if (renderGroup.selection) {
        selectionInfo(renderGroup.highlight, decorationState.appliedHighlight[0]);
        // renderGroup.selection(renderGroup.highlight, decorationState.appliedHighlight[0]);
    }

    decorationState.appliedHighlight[0] = renderGroup.highlight;

    
    ;

    // if (renderGroup.diagnostic) {

    // }

    

    

    // highlightInfo.forEach(Highlight => {
    //     applyDecoration(context.editor, Highlight.decoration, Highlight.range);
    //     return Highlight.decoration;
    // });

    // context.decorationState.appliedHighlight[0].applied = renderGroup.type;

    // renderStatusInfo(context);
};

export {
    // sealBuffer,
    // setSelectionTextbufferSize,
    clearDecorationState,
    renderDecorationOnEditor,
    renderStatusInfo,
};
