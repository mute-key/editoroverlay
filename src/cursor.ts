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

const decorationList: Type.DecorationType = {
    cursorOnly: config.createDecorationTypeBuilder(DECORATION_TYPE_MASK.CURSOR_ONLY),
    singleLine: config.createDecorationTypeBuilder(DECORATION_TYPE_MASK.SINGLE_LINE),
    multiLine: config.createDecorationTypeBuilder(DECORATION_TYPE_MASK.MULTI_LINE),
    multiCursor: config.createDecorationTypeBuilder(DECORATION_TYPE_MASK.MULTI_CURSOR),
};

const loadDecoration: Type.loadFunc = ({ decorationList, decorationInfo }): boolean => {
    if (decorationList[decorationInfo.key] === undefined) {
        decorationList[decorationInfo.key] = config.createDecorationTypeBuilder(decorationInfo.mask);
        return true;
    }
    return false;
};

const unsetDecoration: Type.UnsetDecorationFunctionType = (
    decorationList: Type.DecorationType,
    editor: vscode.TextEditor | undefined
) => (
    decorationInfo: Type.DecorationInfoPropType
): boolean => {
        if (decorationList[decorationInfo.key] && editor) {
            decorationList[decorationInfo.key]?.forEach(entry => {
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
    if (decorationList[decorationInfo.key] !== undefined) {
        decorationList[decorationInfo.key]?.forEach(entry => {
            entry.dispose();
        });
        decorationList[decorationInfo.key] = undefined;
        return true;
    }
    return false;
};

const disposeOrResetOtherDecoration = (
    currentDecoration: Type.DecorationInfoPropType,
    resetOrUnset: Type.UnsetFunctionType
): boolean =>
    Object.values(DECORATION_INFO)
        .filter(info => currentDecoration.mask & info.mask)
        .map(info => resetOrUnset(info))
        .every(Boolean);

const appliedDecoration: Type.AppliedDecorationType = {
    applied: undefined
};

const isDecorationChanged = (
    appliedDecoration: Type.AppliedDecorationType,
    decorationInfo: Type.DecorationInfoPropType): boolean => {
    if (appliedDecoration.applied) {
        if (appliedDecoration.applied.mask !== decorationInfo.mask) {
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
const setDecorationOnEditor: Type.setDecorationOnEditorFunc = ({ editor, decorationList, decorationInfo }): void => {

    const textEditorDecoration: vscode.TextEditorDecorationType[] | undefined = decorationList[decorationInfo.key];

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

const decorationCoordinator: Type.decorationCoordinatorFunc = ({ editor, decorationList, decorationInfo }): Type.DecorationWithRangeType[] | undefined => {
    const textEditorDecoration: vscode.TextEditorDecorationType[] | undefined = decorationList[decorationInfo.key];
    if (textEditorDecoration) {
        if (decorationInfo.mask & DECORATION_TYPE_MASK.CURSOR_ONLY) {
            const currentPosition = editor.selection.active;
            return [{
                decoration: textEditorDecoration[0],
                range: [new vscode.Range(currentPosition, currentPosition)]
            }];
        }

        if (decorationInfo.mask & DECORATION_TYPE_MASK.SINGLE_LINE) {
            return [{
                decoration: textEditorDecoration[0],
                range: [new vscode.Range(editor.selection.start, editor.selection.end)]
            }];
        }

        if (decorationInfo.mask & DECORATION_TYPE_MASK.MULTI_LINE) {
            return [{
                decoration: textEditorDecoration[0],
                range: [new vscode.Range(editor.selection.start, editor.selection.start)]
            },
            {
                decoration: textEditorDecoration[1],
                range: [new vscode.Range(editor.selection.end, editor.selection.end)]
            }];
        }

        if (decorationInfo.mask & DECORATION_TYPE_MASK.MULTI_CURSOR) {
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

        loadDecoration({
            decorationList: decorationList,
            decorationInfo: DECORATION_INFO.CURSOR_ONLY
        });

        if (!decorationList[DECORATION_INFO.CURSOR_ONLY.key]) {
            return; // decoration has not been loaded
        }

        setDecorationOnEditor({
            editor: activeEditor,
            decorationList: decorationList,
            decorationInfo: DECORATION_INFO.CURSOR_ONLY
        });

        return [
            activeEditorChanged(),
            selectionChanged(),
            configChanged(),
        ]; // event disposable functions
    } catch (err) {
        console.error('Error during extension activation: ', err);
        vscode.window.showErrorMessage('Extension activation failed!');
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

const selectionChanged = (): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorSelection((event: vscode.TextEditorSelectionChangeEvent) => {
        if (event.selections) {
            const decorationType: Type.DecorationInfoPropType | undefined = selectionType(event.textEditor);
            if (!decorationType) {
                return;
            }

            const unsetFunction = (decorationInfo: Type.DecorationInfoPropType): boolean => {
                return unsetDecoration(decorationList, event.textEditor)(decorationInfo);
            };

            if (isDecorationChanged(appliedDecoration, decorationType)) {
                disposeOrResetOtherDecoration(DECORATION_INFO.RESET, unsetFunction);
            }

            loadDecoration({
                decorationList: decorationList,
                decorationInfo: decorationType
            });

            if (!decorationList[decorationType.key]) {
                return;
            }
            setDecorationOnEditor({
                editor: event.textEditor,
                decorationList: decorationList,
                decorationInfo: decorationType
            });
        }
    });
};

const configChanged = (): vscode.Disposable => {
    return vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
        if (config.hasConfigChagned()) {
            const disposeFunction = (decorationInfo: Type.DecorationInfoPropType): boolean => {
                return resetDecoration(decorationList)(decorationInfo);
            };
    
            disposeOrResetOtherDecoration(DECORATION_INFO.RESET, disposeFunction);
        }
    });
};

export {
    cursorActivate
};