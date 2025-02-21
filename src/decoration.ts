import * as vscode from 'vscode';
import * as Type from './type/type.d';
import {
    DECORATION_STYLE_KEY
} from './constant/enum';
import {
    DECORATION_INFO
} from './constant/object';
import {
    cursorOnlyDecorationWithRange,
    singelLineDecorationWithRange,
    multiLineDecorationWithRange,
    multiCursorDecorationWithRange
} from './selection';
import {
    status
} from './status';

const applyDecoration = (
    editor: vscode.TextEditor,
    decoraiton: vscode.TextEditorDecorationType,
    range: vscode.Range[]
) => editor.setDecorations(decoraiton, range);

const createEditorDecorationType = (
    styleAppliedConfig: Type.DecorationStyleConfigType | Type.StatusDecorationReadyType
) => vscode.window.createTextEditorDecorationType(styleAppliedConfig as vscode.DecorationRenderOptions);

const disposeDecoration = (
    decorationList: vscode.TextEditorDecorationType[]
) => decorationList.forEach((decorationType) => {
    decorationType.dispose();
});

const resetLastAppliedDecoration = (editor: vscode.TextEditor, decorationType: vscode.TextEditorDecorationType[]) => {
    decorationType.forEach(decoration => {
        applyDecoration(editor, decoration, []);
    });
};

const resetDecoration: Type.UnsetDecorationFunctionType = (
    config: Type.ConfigInfoReadyType,
    editor: vscode.TextEditor | undefined,
    dispose?: boolean
) => (
    decorationInfo: Type.DecorationInfoPropType
): boolean => {
    if (editor) {
        config.status.decorationType?.forEach((decorationType) => {
            decorationType.dispose();
        });

        config.decorationList[decorationInfo.KEY]?.forEach(decorationType => {
            if (Array.isArray(decorationType)) {
                decorationType.forEach((decorationType: vscode.TextEditorDecorationType) => {
                    applyDecoration(editor, decorationType, []);
                    // if (dispose) {
                    // decorationType.dispose();
                    // }
                });
            } else {
                applyDecoration(editor, decorationType, []);
                // if (dispose) {
                // decorationType.dispose();
                // }
            }
        });
        return true;
    }
    return false;
};

const resetOtherDecoration = (
    currentDecoration: Type.DecorationInfoPropType,
    reset: Type.UnsetFunctionType
): boolean =>
    Object.values(DECORATION_INFO)
        .filter(info => currentDecoration.MASK & info.MASK)
        .map(info => reset(info))
        .every(Boolean);

const resetDecorationWrapper = (config: Type.ConfigInfoReadyType, editor: vscode.TextEditor, dispose?: boolean) => {
    const resetFunction = (decorationInfo: Type.DecorationInfoPropType): boolean => {
        return resetDecoration(config, editor, dispose)(decorationInfo);
    };
    resetOtherDecoration(DECORATION_INFO.RESET, resetFunction);
};

const isDecorationChanged = (
    config: Type.ConfigInfoReadyType,
    editor: vscode.TextEditor,
    appliedDecoration: Type.AppliedDecorationType,
    decorationInfo: Type.DecorationInfoPropType): boolean => {
    if (appliedDecoration.applied) {
        if (appliedDecoration.applied.MASK !== decorationInfo.MASK) {
            resetLastAppliedDecoration(editor, config.decorationList[appliedDecoration.applied.KEY]);
            appliedDecoration.applied = decorationInfo;
            return true;
        }
        return false;
    }
    appliedDecoration.applied = decorationInfo;
    return true;
};

/**
 * decoraiton range should be depends of the border position, current setup is with default border styles.
 * 
 * @param
 * @returns
 * 
 */
const decorationCoordinator: Type.DecorationCoordinatorFunc = ({ editor, decorationList, decorationInfo, loadConfig }): Type.DecorationWithRangeType[] | undefined => {
    const textEditorDecoration: vscode.TextEditorDecorationType[] | undefined = decorationList[decorationInfo.KEY];
    if (textEditorDecoration) {
        const borderConfig: Type.BorderPositionParserType = loadConfig.borderPositionInfo[decorationInfo.KEY];

        if (loadConfig.generalConfigInfo.statusTextEnabled) {
            status(editor, loadConfig.status, loadConfig.generalConfigInfo, decorationInfo);
        }

        const context: Type.SelectionTypeToDecorationContext = {
            editor,
            borderConfig,
            textEditorDecoration
        };

        const fnSplit = {
            [DECORATION_STYLE_KEY.CURSOR_ONLY]: () => cursorOnlyDecorationWithRange(context),
            [DECORATION_STYLE_KEY.SINGLE_LINE]: () => singelLineDecorationWithRange(context),
            [DECORATION_STYLE_KEY.MULTI_LINE]: () => multiLineDecorationWithRange(context),
            [DECORATION_STYLE_KEY.MULTI_CURSOR]: () => multiCursorDecorationWithRange(context),
        };

        return fnSplit[decorationInfo.KEY]();
    }
    return;
};

const setDecorationOnEditor: Type.SetDecorationOnEditorFunc = ({ editor, decorationList, decorationInfo, loadConfig }): void => {
    const textEditorDecoration: vscode.TextEditorDecorationType[] | undefined = decorationList[decorationInfo.KEY];
    if (textEditorDecoration) {

        loadConfig.appliedDecoration.editorDecoration = textEditorDecoration;

        const decorationWithRange = decorationCoordinator({ editor, decorationList, decorationInfo, loadConfig });
        if (!decorationWithRange) {
            return;
        }

        isDecorationChanged(loadConfig, editor, loadConfig.appliedDecoration, decorationInfo);

        decorationWithRange.forEach(({ decoration, range }) => {
            applyDecoration(editor, decoration, range);
        });
    }
};

export {
    applyDecoration,
    disposeDecoration,
    createEditorDecorationType,
    setDecorationOnEditor,
    resetDecorationWrapper,
    isDecorationChanged
};