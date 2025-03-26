import * as vscode from 'vscode';
import * as Type from '../../type/type';
import { hightlightCoordinator } from './highlight/highlight';
import { updateDiagnostic } from '../../diagnostic/diagnostic';
import { applyDecoration, createEditorDecorationType, isDecorationChanged, unsetAndDisposeDecoration } from './decoration';
import { renderGroupIs } from '../editor';

const clearDecorationState = (decorationState: Type.DecorationStateType) => {
    decorationState.appliedHighlight.applied = undefined;
    decorationState.appliedHighlight.ofDecorationType = undefined;
    decorationState.selectionText = [];
    decorationState.diagnosticText = [];
    decorationState.statusText = [];
};

const statusInfoHandler = (editor: vscode.TextEditor, statusText, range) => (decorationOption): void => {
    const decoration = createEditorDecorationType(decorationOption as vscode.DecorationRenderOptions);
    applyDecoration(editor, decoration, [range]);
    statusText.push(decoration);
};

// const statusInfoHandler = (editor, statusInfo: Type.StatusTextInfoType): vscode.TextEditorDecorationType[] => {

//     const decorationList: vscode.TextEditorDecorationType[] = [];
//     const length = statusInfo['contentText'].length;
//     let idx = 0;
//     while (idx < length) {
//         const decoration = createEditorDecorationType(statusInfo['contentText'][idx] as vscode.DecorationRenderOptions);
//         applyDecoration(editor, decoration, [statusInfo['range']]);
//         decorationList.push(decoration);
//         idx++;
//     }
//     return decorationList;
// };

const renderStatusInfo = ({ editor, renderGroup, decorationState }) => {

    decorationState.statusText = unsetAndDisposeDecoration(editor, decorationState.statusText);
    
    if (renderGroup.selection) {
        decorationState.selectionText = renderGroup.selection(editor, renderGroup.type) as Type.StatusTextInfoType[];

        let length = decorationState.selectionText.length | 0;

        while (length--) {
            decorationState.selectionText[length].contentText.forEach(
                statusInfoHandler(
                    editor, 
                    decorationState.statusText, 
                    decorationState.selectionText[length].range
                )
            );
        }
        delete decorationState.selection;
    }

    if (renderGroup.diagnostic) {
        decorationState.diagnosticText = renderGroup.diagnostic(editor, updateDiagnostic()) as Type.StatusTextInfoType[];

        let length = decorationState.diagnosticText.length | 0;

        while (length--) {
            decorationState.diagnosticText[length].contentText.forEach(
                statusInfoHandler(
                    editor, 
                    decorationState.statusText, 
                    decorationState.diagnosticText[length].range
                )
            );
        }
        delete decorationState.diagnosticText;
        // let length = decorationState.diagnosticText.length | 0;
        // while (length--) {
        //     decorationState.statusText.push(...statusInfoHandler(editor, decorationState.diagnosticText[length]));
        // }
        // let length = decorationState.diagnosticText.length | 0;
        // while (length--) {
        //     decorationState.statusText.push(...decorationState.diagnosticText[length].contentText.map(decorationOption => {
        //         const decoration = createEditorDecorationType(decorationOption as vscode.DecorationRenderOptions);
        //         applyDecoration(editor, decoration, [decorationState.diagnosticText[length].range]);
        //         return decoration;
        //     }));
        // }
    }



    // decorationState.statusText = decorationState.statusInfo.map(...statusInfoHandler(editor));

    // decorationState
    // decorationState.statusText.push(decoration);
};

const renderDecorationOnEditor = (context: Type.DecorationContext) => {

    const renderGroup: Type.RenderGroupSetProperty = renderGroupIs(context.editor);
    const highlightInfo = hightlightCoordinator(context.editor, renderGroup.type.KEY);

    isDecorationChanged(context.editor, context.decorationState, renderGroup.type as Type.DecorationInfoPropType);

    context.decorationState.appliedHighlight.ofDecorationType = highlightInfo.map(({ decoration, range }) => {
        applyDecoration(context.editor, decoration, range);
        return decoration;
    });

    renderStatusInfo({
        ...context,
        renderGroup: renderGroup
    });
};

export {
    clearDecorationState,
    renderDecorationOnEditor,
    renderStatusInfo,
};
