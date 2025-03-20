import * as vscode from 'vscode';
import * as Type from '../../type/type';
import { DECORATION_INFO, DECORATION_STATE } from '../../constant/object';
import { hightlightCoordinator } from './highlight/highlight';
import { selectionInfo } from './status/selection';
import { diagnosticInfo } from './status/diagnostic';
import { updateDiagnostic } from '../../diagnostic/diagnostic';

const decorationState = { ...DECORATION_STATE } as Type.DecorationStateType;

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

const resetAndDisposeDecoration = (editor: vscode.TextEditor, decorationType: vscode.TextEditorDecorationType[] | undefined): void => {
    decorationType?.forEach(decoration => {
        applyDecoration(editor, decoration, []);
        decoration.dispose();
    });
};

const resetDecoration: Type.UnsetDecorationFunctionType = (decorationState: Type.DecorationStateType, editor: vscode.TextEditor | undefined) => (decorationInfo: Type.DecorationInfoPropType): void => {
    if (editor) {
        decorationState.selectionText?.forEach((decorationType) => {
            decorationType.dispose();
        });

        decorationState.diagnosticText?.forEach((decorationType) => {
            decorationType.dispose();
        });

        decorationState.highlightStyleList[decorationInfo.KEY]?.forEach(decorationType => {
            if (Array.isArray(decorationType)) {
                decorationType.forEach((decorationType: vscode.TextEditorDecorationType) => {
                    applyDecoration(editor, decorationType, []);
                });
            } else {
                applyDecoration(editor, decorationType, []);
            }
        });
    }
};

const resetOtherDecoration = (currentDecoration: Type.DecorationInfoPropType, reset: Type.UnsetFunctionType): void => {
    Object.values(DECORATION_INFO)
        .filter(info => currentDecoration.MASK & info.MASK)
        .map(info => reset(info))
        .every(Boolean);
};

const resetDecorationWrapper = (decorationState: Type.DecorationStateType, editor: vscode.TextEditor,): void =>
    resetOtherDecoration(DECORATION_INFO.RESET, (decorationInfo: Type.DecorationInfoPropType): void =>
        resetDecoration(decorationState, editor)(decorationInfo));

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

const isDecorationChanged = (editor: vscode.TextEditor, decorationState: Type.DecorationStateType, decorationInfo: Type.DecorationInfoPropType): void => {
    if (decorationState.appliedHighlight.applied && (decorationState.appliedHighlight.applied.MASK !== decorationInfo.MASK)) {
        resetDecorationRange(editor, decorationState.highlightStyleList[decorationState.appliedHighlight.applied.KEY] as vscode.TextEditorDecorationType[]);
        decorationState.appliedHighlight.applied = decorationInfo;
    }

    decorationState.appliedHighlight.applied = decorationInfo;
};


const renderStatusInfo: Type.SetDecorationOnEditorFunc = async ({ editor, configInfo, indentInfo, decorationInfo, decorationState }): Promise<void> => {

    if (!decorationState.statusInfo) {
        decorationState.statusInfo = {
            selectionText: [],
            diagnosticText: [],
        };
    }

    if (configInfo.generalConfigInfo.statusTextEnabled) {
        decorationState.statusInfo.selectionText = await selectionInfo(editor, indentInfo as Type.IndentReadyType, decorationInfo);
    }

    if (configInfo.generalConfigInfo.diagnosticTextEnabled) {
        decorationState.statusInfo.diagnosticText = await diagnosticInfo(editor, updateDiagnostic());
    }

    for (const [key, statusInfo] of Object.entries(decorationState.statusInfo)) {

        resetAndDisposeDecoration(editor, decorationState[key]);

        const statusInfoList: vscode.TextEditorDecorationType[] = [];
        let length: number = statusInfo.length;

        while (length--) {
            const status = statusInfo[length];
            statusInfoList.push(...status.contentText.map(decorationOption => {
                const decoration = createEditorDecorationType(decorationOption as vscode.DecorationRenderOptions);
                applyDecoration(editor, decoration, [status.range]);
                return decoration;
            }));
        }

        decorationState[key] = statusInfoList;
    }
};

const setDecorationOnEditor: Type.SetDecorationOnEditorFunc = (context): void => {

    const { editor, decorationInfo, decorationState } = context;

    const textEditorDecoration: vscode.TextEditorDecorationType[] | undefined = decorationState.highlightStyleList[decorationInfo.KEY];

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
    resetAndDisposeDecoration,
    isDecorationChanged,
    createEditorDecorationType,
    setDecorationOnEditor,
    renderStatusInfo,
    resetAllDecoration
};
