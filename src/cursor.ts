import * as vscode from 'vscode';
import * as Type from './type.d';

enum DecorationTypeMask {
    NONE = 0b1111,
    CURSOR_ONLY = 1 << 0,
    SINGLE_LINE = 1 << 1,
    MULTI_LINE = 1 << 2,
    MULTI_CURSOR = 1 << 3
}

const createDecorationType = (
    isWholeLine: boolean,
    borderWidth: string,
    borderStyle: string,
    borderColor: string,
    borderRadius: string
): vscode.TextEditorDecorationType => {
    return vscode.window.createTextEditorDecorationType({
        isWholeLine: isWholeLine,
        borderWidth: borderWidth,
        borderStyle: `${borderStyle}`,
        borderColor: `${borderColor}`,
        borderRadius: borderRadius
    });
};

const createDecorationTypeBuilder = (decorationKindIs: DecorationTypeMask): vscode.TextEditorDecorationType[] | undefined => {
    const config = vscode.workspace.getConfiguration("cursorlinehighlight");
    const borderWidth = config.get<string>("borderWidth", '2px');
    const borderColor = config.get<string>("borderColor", '#65EAB9');
    const borderStyle = config.get<string>("borderStyle", 'solid');
    let isWholeLine = false;
    let borderRadius = '';
    switch (decorationKindIs) {
        case DecorationTypeMask.CURSOR_ONLY:
            isWholeLine = true;
            borderRadius = '0px';
            return [
                createDecorationType(isWholeLine, `0 0 ${borderWidth} 0`, borderStyle, borderColor, borderRadius)
            ];
        case DecorationTypeMask.SINGLE_LINE:
            isWholeLine = false;
            borderRadius = '0px';
            return [
                createDecorationType(isWholeLine, `0 0 ${borderWidth} 0`, borderStyle, borderColor, borderRadius)
            ];
        case DecorationTypeMask.MULTI_LINE:
            isWholeLine = true;
            borderRadius = '0px';
            return [
                createDecorationType(isWholeLine, `${borderWidth} 0 0 0`, borderStyle, borderColor, borderRadius),
                createDecorationType(isWholeLine, `0 0 ${borderWidth} 0`, borderStyle, borderColor, borderRadius)
            ];
        case DecorationTypeMask.MULTI_CURSOR:
            isWholeLine = false;
            borderRadius = '0px';
            return [
                createDecorationType(isWholeLine, `${borderWidth} ${borderWidth} ${borderWidth} ${borderWidth}`, borderStyle, borderColor, borderRadius)
            ];
        default:
            break;
    }

    return;
};

const decorationList: Type.DecorationType = {
    cursorOnly: createDecorationTypeBuilder(DecorationTypeMask.CURSOR_ONLY),
    singleLine: createDecorationTypeBuilder(DecorationTypeMask.SINGLE_LINE),
    multiLine: createDecorationTypeBuilder(DecorationTypeMask.MULTI_LINE),
    multiCursor: createDecorationTypeBuilder(DecorationTypeMask.MULTI_CURSOR),
};

const DECORATION_INFO: Type.DecorationInfoType = {
    reset: {
        key: 'reset',
        mask: DecorationTypeMask.NONE
    },
    cursorOnly: {
        key: 'cursorOnly',
        mask: DecorationTypeMask.CURSOR_ONLY
    },
    singleLine: {
        key: 'singleLine',
        mask: DecorationTypeMask.SINGLE_LINE
    },
    multiLine: {
        key: 'multiLine',
        mask: DecorationTypeMask.MULTI_LINE
    },
    multiCursor: {
        key: 'multiCursor',
        mask: DecorationTypeMask.MULTI_CURSOR
    } as const,
} as const;

const loadDecoration: Type.loadFunc = ({ decorationList, decorationInfo }): boolean => {
    if (decorationList[decorationInfo.key] === undefined) {
        decorationList[decorationInfo.key] = createDecorationTypeBuilder(decorationInfo.mask);
        return true;
    }
    return false;
};

const unsetDecoration: Type.UnsetDecorationFunctionType = (
    decorationList: Type.DecorationType,
    editor: vscode.TextEditor | undefined
) => (
    decorationInfo: Type.DecorationInfoPropType): boolean => {
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

const decorationCoordinator: Type.decorationCoordinatorFunc = ({editor,decorationList,decorationInfo}): Type.DecorationWithRangeType[] | undefined => {
    const textEditorDecoration: vscode.TextEditorDecorationType[] | undefined = decorationList[decorationInfo.key];
    if (textEditorDecoration) {
        if (decorationInfo.mask & DecorationTypeMask.CURSOR_ONLY) {
            const currentPosition = editor.selection.active;
            return [{
                decoration: textEditorDecoration[0],
                range: [new vscode.Range(currentPosition, currentPosition)]
            }];
        }

        if (decorationInfo.mask & DecorationTypeMask.SINGLE_LINE) {
            return [{
                decoration: textEditorDecoration[0],
                range: [new vscode.Range(editor.selection.start, editor.selection.end)]
            }];
        }

        if (decorationInfo.mask & DecorationTypeMask.MULTI_LINE) {
            return [{
                decoration: textEditorDecoration[0],
                range: [new vscode.Range(editor.selection.start, editor.selection.start)]
            },
            {
                decoration: textEditorDecoration[1],
                range: [new vscode.Range(editor.selection.end, editor.selection.end)]
            }];
        }

        if (decorationInfo.mask & DecorationTypeMask.MULTI_CURSOR) {
            if (editor.selections.length > 1) {
                return [{
                    decoration: textEditorDecoration[0],
                    range: editor.selections.reduce((acc, selection) => {
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
            return;
        }

        loadDecoration({
            decorationList: decorationList,
            decorationInfo: DECORATION_INFO.cursorOnly
        });

        if (!decorationList[DECORATION_INFO.cursorOnly.key]) {
            return;
        }

        setDecorationOnEditor({
            editor: activeEditor,
            decorationList: decorationList,
            decorationInfo: DECORATION_INFO.cursorOnly
        });

        return [
            activeEditorChanged(),
            selectionChanged(),
            configChanged(),
        ];
    } catch (err) {
        console.error('Error during extension activation: ', err);
        vscode.window.showErrorMessage('Extension activation failed!');
    }
};

const selectionType = (editor: vscode.TextEditor): Type.DecorationInfoPropType | undefined => {
    if (editor.selections.length === 1) {
        if (editor.selections[0].isEmpty) {
            return DECORATION_INFO.cursorOnly;
        } else {
            if (editor.selections[0].isSingleLine) {
                return DECORATION_INFO.singleLine;
            } else {
                return DECORATION_INFO.multiLine;
            }
        }
    } else if (editor.selections.length > 1) {
        return DECORATION_INFO.multiCursor;
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
                disposeOrResetOtherDecoration(DECORATION_INFO.reset, unsetFunction);
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
        const disposeFunction = (decorationInfo: Type.DecorationInfoPropType): boolean => {
            return resetDecoration(decorationList)(decorationInfo);
        };

        disposeOrResetOtherDecoration(DECORATION_INFO.reset, disposeFunction);
    });
};

export {
    cursorActivate,
    DecorationTypeMask
};