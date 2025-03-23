import * as vscode from 'vscode';
import * as Type from '../../type/type';
import { SELECTION_KIND, DECORATION_STATE } from '../../constant/object';
import { bindHighlightStyleState, hightlightCoordinator, unsetRangeOfHighlightStyle } from './highlight/highlight';
import { updateDiagnostic } from '../../diagnostic/diagnostic';

const decorationState = { ...DECORATION_STATE } as unknown as Type.DecorationStateType;

const applyDecoration = (editor: vscode.TextEditor, decoraiton: vscode.TextEditorDecorationType, range: vscode.Range[]): void => {
    editor.setDecorations(decoraiton, range);
};

const createEditorDecorationType = (styleAppliedConfig: any): vscode.TextEditorDecorationType => {
    return vscode.window.createTextEditorDecorationType(styleAppliedConfig as vscode.DecorationRenderOptions);
};

const disposeDecoration = (highlightStyleList: vscode.TextEditorDecorationType[] = []) => highlightStyleList.forEach((decorationType): void => {
    decorationType.dispose();
});

const resetDecorationRange = (editor: vscode.TextEditor, decorationType: vscode.TextEditorDecorationType[] | undefined): void => {
    decorationType?.forEach(decoration => applyDecoration(editor, decoration, []));
};

const unsetAndDisposeDecoration = (editor: vscode.TextEditor, decorationType: vscode.TextEditorDecorationType[] | undefined): void => {
    decorationType?.forEach(decoration => {
        applyDecoration(editor, decoration, []);
        decoration.dispose();
    });
};

const resetDecoration: Type.UnsetDecorationFunctionType = (editor: vscode.TextEditor | undefined, decorationState: Type.DecorationStateType, ) => (selectionKind: Type.DecorationInfoPropType): void => {
    if (editor) {
        decorationState.selectionText?.forEach((decorationType) => {
            decorationType.dispose();
        });

        decorationState.diagnosticText?.forEach((decorationType) => {
            decorationType.dispose();
        });

        unsetRangeOfHighlightStyle(editor);
    }
};

const resetOtherDecoration = (currentDecoration: Type.DecorationInfoPropType, reset: Type.UnsetFunctionType): void => {
    Object.values(SELECTION_KIND)
        .filter(info => currentDecoration.MASK & info.MASK)
        .map(info => reset(info))
        .every(Boolean);
};

const resetDecorationWrapper = (decorationState: Type.DecorationStateType, editor: vscode.TextEditor,): void =>
    resetOtherDecoration(SELECTION_KIND.RESET, (selectionKind: Type.DecorationInfoPropType): void =>
        resetDecoration(editor, decorationState)(selectionKind));

const resetAllDecoration = (decorationState: Type.DecorationStateType) => {
    vscode.window.visibleTextEditors.forEach(editor => {
        if (decorationState.appliedHighlight.ofDecorationType !== undefined) {
            decorationState.appliedHighlight.ofDecorationType.forEach(decoration => {
                applyDecoration(editor, decoration, []);
            });
        }
    });

    if (decorationState.selectionText) {
        decorationState.selectionText.forEach((decorationType) => decorationType.dispose());
    }

    if (decorationState.diagnosticText) {
        decorationState.diagnosticText.forEach((decorationType) => decorationType.dispose());
    };

};

const isDecorationChanged = (editor: vscode.TextEditor, decorationState: Type.DecorationStateType, selectionKind: Type.DecorationInfoPropType): void => {
    if (decorationState.appliedHighlight.applied && (decorationState.appliedHighlight.applied.MASK !== selectionKind.MASK)) {
        unsetRangeOfHighlightStyle(editor);
        decorationState.appliedHighlight.applied = selectionKind;
    }

    decorationState.appliedHighlight.applied = selectionKind;
};


const renderStatusInfo: Type.SetDecorationOnEditorFunc = ({ editor, renderGroup, decorationState }) => {

    if (renderGroup.selection) {
        decorationState.statusInfo.selectionText = renderGroup.selection(editor, renderGroup.type);
    }

    if (renderGroup.diagnostic) {
        decorationState.statusInfo.diagnosticText = renderGroup.diagnostic(editor, updateDiagnostic());
    }

    for (const [statusGroup, statusInfo] of Object.entries(decorationState.statusInfo)) {

        const statusInfoList: vscode.TextEditorDecorationType[] = [];        
        let length: number = statusInfo?.length | 0;

        while (length--) {
            const status = statusInfo[length];
            statusInfoList.push(...status.contentText.map(decorationOption => {
                const decoration = createEditorDecorationType(decorationOption as vscode.DecorationRenderOptions);
                applyDecoration(editor, decoration, [status.range]);
                return decoration;
            }));
        }

        unsetAndDisposeDecoration(editor, decorationState[statusGroup]);
        decorationState[statusGroup] = statusInfoList;
    }
};

const renderDecorationOnEditor: Type.SetDecorationOnEditorFunc = (context): void => {

    const { editor, renderGroup, decorationState } = context;
    const highlightStyleList = bindHighlightStyleState().styleOf;

    const textEditorDecoration: vscode.TextEditorDecorationType[] | undefined = highlightStyleList[renderGroup.type.KEY];

    if (textEditorDecoration) {

        decorationState.appliedHighlight.ofDecorationType = textEditorDecoration;

        const highlight = hightlightCoordinator(context);

        if (!highlight) {
            return;
        }

        highlight.forEach(({ decoration, range }) => {
            applyDecoration(editor, decoration, range);
        });

        renderStatusInfo(context);
    }
};

const bindEditorDecoration = () => {
    return {
        stateOf: decorationState
    };
};

export {
    bindEditorDecoration,
    applyDecoration,
    disposeDecoration,
    resetDecorationRange,
    resetDecorationWrapper,
    unsetAndDisposeDecoration,
    isDecorationChanged,
    createEditorDecorationType,
    renderDecorationOnEditor,
    renderStatusInfo,
    resetAllDecoration
};
