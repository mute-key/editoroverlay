import * as vscode from 'vscode';
import * as Type from '../../type/type';
import { hightlightCoordinator } from './highlight/highlight';
import { updateDiagnostic } from '../../diagnostic/diagnostic';
import { applyDecoration, createEditorDecorationType, unsetAndDisposeDecoration } from './decoration';
import { editor } from '../../constant/symbol';
import { renderGroupIs } from '../editor';

const clearDecorationState = (decorationState: Type.DecorationStateType) => {
    decorationState.appliedHighlight.applied = undefined;
    decorationState.appliedHighlight.ofDecorationType = undefined;
    decorationState.statusInfo = [];
    decorationState.statusText = [];
};

const statusInfoHandler = (editor: vscode.TextEditor, decorationState: Type.DecorationStateType) => ({ contentText, range }: Type.StatusTextInfoType) => {
    contentText.forEach((decorationOption) => {
        const decoration = createEditorDecorationType(decorationOption as vscode.DecorationRenderOptions);
        applyDecoration(editor, decoration, [range]);
        decorationState.statusText.push(decoration);
    });
};

const renderStatusInfo = ({ editor, renderGroup, decorationState }) => {

    decorationState.statusInfo = [];

    if (renderGroup.selection) {
        decorationState.statusInfo.push(...renderGroup.selection(editor, renderGroup.type) as Type.StatusTextInfoType[]);
    }

    if (renderGroup.diagnostic) {
        decorationState.statusInfo.push(...renderGroup.diagnostic(editor, updateDiagnostic()) as Type.StatusTextInfoType[]);
    }

    decorationState.statusText = unsetAndDisposeDecoration(editor, decorationState.statusText);
    decorationState.statusInfo.forEach(statusInfoHandler(editor, decorationState));
};

const renderDecorationOnEditor = (context: Type.DecorationContext) => {
    // { decoration, range }
    // {editor, renderGroup, decorationState}
    // decorationState.appliedHighlight.ofDecorationType

    hightlightCoordinator(context.editor, context.renderGroup.type.KEY).forEach(({ decoration, range }) => {
        applyDecoration(context.editor, decoration, range);
    });

    renderStatusInfo(context);
};

export {
    clearDecorationState,
    renderDecorationOnEditor,
    renderStatusInfo,
};
