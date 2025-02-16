/**
 * [main cursor action logic]
 * 
 */
import * as vscode from 'vscode';
import * as Type from './type.d';
import * as config from './config';
import {
    DECORATION_TYPE_MASK,
    DECORATION_INFO
} from './constant';

const unsetDecoration: Type.UnsetDecorationFunctionType = (
    decorationList: Type.DecorationType,
    editor: vscode.TextEditor | undefined
) => (
    decorationInfo: Type.DecorationInfoPropType
): boolean => {
        if (decorationList[decorationInfo.KEY] && editor) {
            decorationList[decorationInfo.KEY]?.forEach(entry => {
                if (Array.isArray(entry)) {
                    entry.forEach(deco => {
                        editor.setDecorations(deco, []);
                    });
                } else {
                    editor.setDecorations(entry, []);
                }
            });
            return true;
        }
        return false;
    };

const resetDecoration: Type.UnsetDecorationFunctionType = (decorationList: Type.DecorationType) => (decorationInfo: Type.DecorationInfoPropType): boolean => {
    if (decorationList[decorationInfo.KEY] !== undefined) {
        decorationList[decorationInfo.KEY]?.forEach(entry => {
            entry.dispose();
        });
        decorationList[decorationInfo.KEY] = undefined;
        return true;
    }
    return false;
};

const disposeOrResetOtherDecoration = (
    currentDecoration: Type.DecorationInfoPropType,
    resetOrUnset: Type.UnsetFunctionType
): boolean =>
    Object.values(DECORATION_INFO)
        .filter(info => currentDecoration.MASK & info.MASK)
        .map(info => resetOrUnset(info))
        .every(Boolean);

const appliedDecoration: Type.AppliedDecorationType = {
    applied: undefined
};

const isDecorationChanged = (
    appliedDecoration: Type.AppliedDecorationType,
    decorationInfo: Type.DecorationInfoPropType): boolean => {
    if (appliedDecoration.applied) {
        if (appliedDecoration.applied.MASK !== decorationInfo.MASK) {
            appliedDecoration.applied = decorationInfo;
            return true;
        }
        return false;
    }
    appliedDecoration.applied = decorationInfo;
    return true;
};

/**
 * @param editor
 * @param decorationInfo
 * 
 */
const setDecorationOnEditor: Type.SetDecorationOnEditorFunc = ({ editor, decorationList, decorationInfo }): void => {
    const textEditorDecoration: vscode.TextEditorDecorationType[] | undefined = decorationList[decorationInfo.KEY];
    if (textEditorDecoration) {
        const decorationWithRange = decorationCoordinator({ editor, decorationList, decorationInfo });
        if (!decorationWithRange) {
            return;
        }

        isDecorationChanged(appliedDecoration, decorationInfo);

        decorationWithRange.forEach(({ decoration, range }) => {
            editor.setDecorations(decoration, range);
        });
    }
};

const decorationCoordinator: Type.DecorationCoordinatorFunc = ({ editor, decorationList, decorationInfo }): Type.DecorationWithRangeType[] | undefined => {
    
    const textEditorDecoration: vscode.TextEditorDecorationType[] | undefined = decorationList[decorationInfo.KEY];
    
    if (textEditorDecoration) {
        if (decorationInfo.MASK & DECORATION_TYPE_MASK.CURSOR_ONLY) {
            const currentPosition = editor.selection.active;
            return [{
                decoration: textEditorDecoration[0],
                range: [new vscode.Range(currentPosition, currentPosition)]
            }];
        }

        if (decorationInfo.MASK & DECORATION_TYPE_MASK.SINGLE_LINE) {
            return [{
                decoration: textEditorDecoration[0],
                range: [new vscode.Range(editor.selection.start, editor.selection.end)]
            }];
        }

        if (decorationInfo.MASK & DECORATION_TYPE_MASK.MULTI_LINE) {
            return [{
                decoration: textEditorDecoration[0],
                range: [new vscode.Range(editor.selection.start, editor.selection.start)]
            },
            {
                decoration: textEditorDecoration[1],
                range: [new vscode.Range(editor.selection.end, editor.selection.end)]
            }];
        }

        if (decorationInfo.MASK & DECORATION_TYPE_MASK.MULTI_CURSOR) {
            if (editor.selections.length > 1) {
                return [{
                    decoration: textEditorDecoration[0],
                    range: editor.selections.reduce((acc: vscode.Range[], selection: vscode.Selection) => {
                        acc.push(new vscode.Range(selection.start, selection.active));
                        return acc;
                    }, [] as vscode.Range[])
                }];
            }
        }
    }
    return;
};

const cursorActivate = async (context: vscode.ExtensionContext): Promise<vscode.Disposable[] | void> => {
    try {
        await context.extension.activate();
        console.clear();
        const activeEditor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
        if (!activeEditor) {
            return; // no active editor
        }

        const loadConfig = config.initialiseConfig(context);
        if (!loadConfig) {
            console.error('Failed to initialize config.');
            return;
        }

        if (!loadConfig.decorationList) {
            console.error('Failed to initialize decorationList.');
            return;
        }

        setDecorationOnEditor({
            editor: activeEditor,
            decorationList: loadConfig.decorationList,
            decorationInfo: DECORATION_INFO.CURSOR_ONLY
        });

        return [
            activeEditorChanged(),
            selectionChanged(loadConfig),
            configChanged(context),
        ]; // disposable event functions
    } catch (err) {
        console.error('Error during extension activation: ', err);
        vscode.window.showErrorMessage('Extension activation failed!', err);
    }
};

const selectionType = (editor: vscode.TextEditor): Type.DecorationInfoPropType | undefined => {
    if (editor.selections.length === 1) {
        if (editor.selections[0].isEmpty) {
            return DECORATION_INFO.CURSOR_ONLY;
        } else {
            if (editor.selections[0].isSingleLine) {
                return DECORATION_INFO.SINGLE_LINE;
            } else {
                return DECORATION_INFO.MULTI_LINE;
            }
        }
    } else if (editor.selections.length > 1) {
        return DECORATION_INFO.MULTI_CURSOR;
    }
};

const activeEditorChanged = (): vscode.Disposable => {
    return vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {

    });
};

const selectionChanged = (loadConfig: Type.ConfigInfoReadyType): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorSelection((event: vscode.TextEditorSelectionChangeEvent) => {
        if (event.selections) {
            const decorationType: Type.DecorationInfoPropType | undefined = selectionType(event.textEditor);
            if (!decorationType) {
                return;
            }

            const unsetFunction = (decorationInfo: Type.DecorationInfoPropType): boolean => {
                return unsetDecoration(loadConfig.decorationList, event.textEditor)(decorationInfo);
            };

            if (isDecorationChanged(appliedDecoration, decorationType)) {
                disposeOrResetOtherDecoration(DECORATION_INFO.RESET, unsetFunction);
            }

            if (!loadConfig.decorationList[decorationType.KEY]) {
                return;
            }

            setDecorationOnEditor({
                editor: event.textEditor,
                decorationList: loadConfig.decorationList,
                decorationInfo: decorationType
            });
        }
    });
};

const configChanged = (context: vscode.ExtensionContext): vscode.Disposable => {
    return vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
        if (event) {
            config.initialiseConfig(context);
        }
    });
};

export {
    cursorActivate
};