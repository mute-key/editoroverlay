import * as vscode from 'vscode';

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
    borderColor: string
): vscode.TextEditorDecorationType => {
    return vscode.window.createTextEditorDecorationType({
        isWholeLine: isWholeLine,
        borderWidth: borderWidth,
        borderStyle: `${borderStyle}`,
        borderColor: `${borderColor}`,
        borderRadius: '3px !important'
    });
};

const createDecorationTypeBuilder = (decorationKindIs: DecorationTypeMask): vscode.TextEditorDecorationType[] | undefined => {
    const config = vscode.workspace.getConfiguration("cursorlinehighlight");
    const borderWidth = config.get<string>("borderWidth", '2px');
    const borderColor = config.get<string>("borderColor", '#65EAB9');
    const borderStyle = config.get<string>("borderStyle", 'solid');
    let isWholeLine = false;
    switch (decorationKindIs) {
        case DecorationTypeMask.CURSOR_ONLY:
            isWholeLine = true;
            return [
                createDecorationType(isWholeLine, `0 0 ${borderWidth} 0`, borderStyle, borderColor)
            ];
        case DecorationTypeMask.SINGLE_LINE:
            isWholeLine = false;
            return [
                createDecorationType(isWholeLine, `0 0 ${borderWidth} 0`, borderStyle, borderColor)
            ];
        case DecorationTypeMask.MULTI_LINE:
            isWholeLine = true;
            return [
                createDecorationType(isWholeLine, `${borderWidth} 0 0 0`, borderStyle, borderColor),
                createDecorationType(isWholeLine, `0 0 ${borderWidth} 0`, borderStyle, borderColor)
            ];
        case DecorationTypeMask.MULTI_CURSOR:
            isWholeLine = false;
            return [
                createDecorationType(isWholeLine, `${borderWidth} ${borderWidth} ${borderWidth} ${borderWidth}`, borderStyle, borderColor)
            ];
        default:
            break;
    }

    return;
};

type DecorationType = Record<string, vscode.TextEditorDecorationType[] | undefined>;

const decorationList: DecorationType = {
    cursorOnly: createDecorationTypeBuilder(DecorationTypeMask.CURSOR_ONLY),
    singleLine: createDecorationTypeBuilder(DecorationTypeMask.SINGLE_LINE),
    multiLine: createDecorationTypeBuilder(DecorationTypeMask.MULTI_LINE),
    multiCursor: createDecorationTypeBuilder(DecorationTypeMask.MULTI_CURSOR),
};

type DecorationInfoPropType = {
    key: string,
    mask: DecorationTypeMask
}

type DecorationInfoType = {
    reset: DecorationInfoPropType
    cursorOnly: DecorationInfoPropType
    singleLine: DecorationInfoPropType
    multiLine: DecorationInfoPropType
    multiCursor: DecorationInfoPropType
}

const DECORATION_INFO: DecorationInfoType = {
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

type loadFunc = (context: {
    decorationList: DecorationType,
    decorationInfo: DecorationInfoPropType
}) => boolean;

const loadDecoration: loadFunc = ({ decorationList, decorationInfo }): boolean => {
    if (decorationList[decorationInfo.key] === undefined) {
        decorationList[decorationInfo.key] = createDecorationTypeBuilder(decorationInfo.mask);
        return true;
    }
    return false;
};

type UnsetDecorationFunctionType = (decorationList: DecorationType, editor?: vscode.TextEditor) => (decorationInfo: DecorationInfoPropType) => boolean;

type UnsetFunctionType = (decorationInfo: DecorationInfoPropType) => boolean

const unsetDecoration: UnsetDecorationFunctionType = (decorationList: DecorationType, editor: vscode.TextEditor | undefined) => (decorationInfo: DecorationInfoPropType): boolean => {
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
const resetDecoration: UnsetDecorationFunctionType = (decorationList: DecorationType) => (decorationInfo: DecorationInfoPropType): boolean => {
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
    currentDecoration: DecorationInfoPropType,
    resetOrUnset: UnsetFunctionType
): boolean =>
    Object.values(DECORATION_INFO)
        .filter(info => currentDecoration.mask & info.mask)
        .map(info => resetOrUnset(info))
        .every(Boolean);

type DecorationWithRangeType = {
    decoration: vscode.TextEditorDecorationType,
    range: vscode.Range[]
}

type DecorationContext = {
    editor: vscode.TextEditor;
    decorationList: DecorationType;
    decorationInfo: DecorationInfoPropType;
};

type setDecorationOnEditorFunc = (context: DecorationContext) => void;
type decorationCoordinatorFunc = (context: DecorationContext) => DecorationWithRangeType[] | undefined;

type AppliedDecorationType = {
    applied: DecorationInfoPropType | undefined
}

const appliedDecoration: AppliedDecorationType = {
    applied: undefined
};

const isDecorationChanged = (appliedDecoration: AppliedDecorationType, decorationInfo: DecorationInfoPropType): boolean => {
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
const setDecorationOnEditor: setDecorationOnEditorFunc = ({ editor, decorationList, decorationInfo }): void => {

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

const decorationCoordinator: decorationCoordinatorFunc = ({ editor, decorationList, decorationInfo }): DecorationWithRangeType[] | undefined => {
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
                const range = editor.selections.reduce((acc, selection) => {
                    acc.push(new vscode.Range(selection.start, selection.active));
                    return acc;
                }, [] as vscode.Range[]);

                return [{
                    decoration: textEditorDecoration[0],
                    range: range
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

const selectionType = (editor: vscode.TextEditor): DecorationInfoPropType | undefined => {
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
            const decorationType: DecorationInfoPropType | undefined = selectionType(event.textEditor);
            if (!decorationType) {
                return;
            }

            const unsetFunction = (decorationInfo: DecorationInfoPropType): boolean => {
                return unsetDecoration(decorationList, event.textEditor)(decorationInfo);
            };

            if (isDecorationChanged(appliedDecoration, decorationType)) {
                if (appliedDecoration.applied.mask !== decorationType.mask) {
                    console.log(appliedDecoration.applied, decorationType)
                    disposeOrResetOtherDecoration(DECORATION_INFO.reset, unsetFunction);
                }
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
        const disposeFunction = (decorationInfo: DecorationInfoPropType): boolean => {
            return resetDecoration(decorationList)(decorationInfo);
        };

        disposeOrResetOtherDecoration(DECORATION_INFO.reset, disposeFunction);
    });
};

export {
    cursorActivate
};