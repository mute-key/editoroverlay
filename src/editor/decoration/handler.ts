import * as vscode from 'vscode';
import * as Type from '../../type/type';
import { hightlightCoordinator } from './highlight/highlight';
import { updateDiagnostic } from '../../diagnostic/diagnostic';
import { applyDecoration, createEditorDecorationType, isDecorationChanged, unsetAndDisposeDecoration } from './decoration';
import { renderGroupIs } from '../editor';

const clearDecorationState = (decorationState: Type.DecorationStateType) => {
    decorationState.appliedHighlight.applied = undefined;
    decorationState.appliedHighlight.ofDecorationType = undefined;
    decorationState.selectionInfo = [];
    decorationState.diagnosticInfo = [];
    decorationState.statusText = [];
};

const statusInfoHandler = (editor: vscode.TextEditor, statusText: vscode.TextEditorDecorationType[], range: vscode.Range) => (decorationOption): void => {
    const decoration = createEditorDecorationType(decorationOption as vscode.DecorationRenderOptions);
    applyDecoration(editor, decoration, [range]);
    statusText.push(decoration);
};

const renderStatusInfo = ({ editor, renderGroup, decorationState }) => {

    decorationState.statusText = unsetAndDisposeDecoration(editor, decorationState.statusText);
    
    if (renderGroup.selection) {
        decorationState.selectionInfo = renderGroup.selection(editor, renderGroup.type) as Type.StatusTextInfoType[];

        let length = decorationState.selectionInfo.length | 0;

        while (length--) {
            decorationState.selectionInfo[length].contentText.forEach(
                statusInfoHandler(
                    editor, 
                    decorationState.statusText, 
                    decorationState.selectionInfo[length].range
                )
            );
        }
        delete decorationState.selectionText;
    }

    if (renderGroup.diagnostic) {
        decorationState.diagnosticInfo = renderGroup.diagnostic(editor, updateDiagnostic()) as Type.StatusTextInfoType[];

        let length = decorationState.diagnosticInfo.length | 0;

        while (length--) {
            decorationState.diagnosticInfo[length].contentText.forEach(
                statusInfoHandler(
                    editor, 
                    decorationState.statusText, 
                    decorationState.diagnosticInfo[length].range
                )
            );
        }
        delete decorationState.diagnosticText;
        
        // while (length--) {
        //     decorationState.statusText.push(...decorationState.diagnosticText[length].contentText.map(decorationOption => {
        //         const decoration = createEditorDecorationType(decorationOption as vscode.DecorationRenderOptions);
        //         applyDecoration(editor, decoration, [decorationState.diagnosticText[length].range]);
        //         return decoration;
        //     }));
        // }
    }
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
