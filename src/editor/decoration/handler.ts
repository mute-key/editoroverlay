import * as vscode from 'vscode';
import * as Type from '../../type/type';
import * as $ from '../../constant/symbol';
import { hightlightCoordinator, unsetRangeOfHighlightStyle } from './highlight/highlight';
import { updateDiagnostic } from '../../diagnostic/diagnostic';
import { applyDecoration, createEditorDecorationType, isHighlightChanged, unsetAndDisposeDecoration } from './decoration';
import { renderGroupIs } from '../editor';
import { SELECTION_KIND } from '../../constant/object';

const selectionTextBuffer = {
    [$.cursorOnly]: [],
    [$.singleLine]: [],
    [$.multiLine]: [],
    [$.multiCursor]: [],
}


const clearDecorationState = (decorationState: Type.DecorationStateType) => {
    decorationState.appliedHighlight.applied = { ...SELECTION_KIND[$.reset] };
    decorationState.appliedHighlight.ofDecorationType = undefined;
    decorationState.selectionInfo = [];
    decorationState.diagnosticInfo = [];
    // decorationState.statusText = [];
};

const statusInfoHandler = (editor: vscode.TextEditor, statusText: vscode.TextEditorDecorationType[], range: vscode.Range, idx: number) => (decorationOption: vscode.DecorationRenderOptions): void => {
    const decoration = createEditorDecorationType(decorationOption);
    applyDecoration(editor, decoration, [range]);
    statusText.push(decoration);
};

const renderStatusInfo = ({ editor, renderGroup, decorationState }) => {

    // decorationState.selectionText = 
    // const disposeBuffer: any[] = [];

    // disposeBuffer.push(...);


    decorationState.selectionText = unsetAndDisposeDecoration(editor, decorationState.selectionText);

    if (renderGroup.selection) {
        decorationState.selectionInfo = renderGroup.selection(editor, renderGroup.type) as Type.StatusTextInfoType[];

        let length = decorationState.selectionInfo.length | 0;

        while (length--) {
            decorationState.selectionInfo[length].contentText.forEach(
                statusInfoHandler(
                    editor,
                    decorationState.selectionText,
                    decorationState.selectionInfo[length].range,
                    length
                )
            );
        }
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
    context.decorationState.appliedHighlight.applied = renderGroup.type;

    const highlightInfo = hightlightCoordinator(context.editor, renderGroup.type.KEY);

    if (context.decorationState.appliedHighlight.applied.MASK !== renderGroup.type.MASK) {
        unsetRangeOfHighlightStyle(context.editor);
    }

    context.decorationState.appliedHighlight.ofDecorationType = highlightInfo.map(Highlight => {
        applyDecoration(context.editor, Highlight.decoration, Highlight.range);
        return Highlight.decoration;
    });

    renderStatusInfo(context);
};

export {
    clearDecorationState,
    renderDecorationOnEditor,
    renderStatusInfo,
};
