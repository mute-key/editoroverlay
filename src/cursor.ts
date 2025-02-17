/**
 * [main cursor action logic]
 * 
 */
import * as vscode from 'vscode';
import * as Type from './type/type.d';
import * as config from './config';
import {
    DECORATION_TYPE_MASK,
    DECORATION_INFO
} from './constant';

const appliedDecoration: Type.AppliedDecorationType = {
    applied: undefined,
    editorDecoration: undefined
};

const applyDecoration = (editor: vscode.TextEditor, decoraiton: vscode.TextEditorDecorationType, range: vscode.Range[]): void => {
    editor.setDecorations(decoraiton, range);
};

const resetDecoration: Type.UnsetDecorationFunctionType = (
    decorationList: Type.DecorationType,
    editor: vscode.TextEditor | undefined
) => (
    decorationInfo: Type.DecorationInfoPropType
): boolean => {
    if (decorationList[decorationInfo.KEY] && editor) {
        decorationList[decorationInfo.KEY]?.forEach(decorationType => {
            if (Array.isArray(decorationType)) {
                decorationType.forEach(decorationType => {
                    applyDecoration(editor, decorationType, []);
                });
            } else {
                applyDecoration(editor, decorationType, []);
            }
        });
        return true;
    }
    return false;
};

// ==============================================================================================================
/**
 * this funciton is no longer being used.
 * dispose() makes to re-create decorationType on every selection change.
 * but keeping the function as is.
 * 
 * @param decorationList
 * @returns
 * 
 */
const disposeDecoration: Type.UnsetDecorationFunctionType = (decorationList: Type.DecorationType) => (decorationInfo: Type.DecorationInfoPropType): boolean => {
    if (decorationList[decorationInfo.KEY] !== undefined) {
        decorationList[decorationInfo.KEY]?.forEach(entry => {
            entry.dispose();
        });
        decorationList[decorationInfo.KEY] = undefined;
        return true;
    }
    return false;
};
// ==============================================================================================================

const resetOtherDecoration = (
    currentDecoration: Type.DecorationInfoPropType,
    reset: Type.UnsetFunctionType
): boolean =>
    Object.values(DECORATION_INFO)
        .filter(info => currentDecoration.MASK & info.MASK)
        .map(info => reset(info))
        .every(Boolean);

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
const setDecorationOnEditor: Type.SetDecorationOnEditorFunc = ({ editor, decorationList, decorationInfo, loadConfig }): void => {
    const textEditorDecoration: vscode.TextEditorDecorationType[] | undefined = decorationList[decorationInfo.KEY];
    if (textEditorDecoration) {

        appliedDecoration.editorDecoration = textEditorDecoration;

        const decorationWithRange = decorationCoordinator({ editor, decorationList, decorationInfo, loadConfig });
        if (!decorationWithRange) {
            return;
        }

        isDecorationChanged(appliedDecoration, decorationInfo);

        decorationWithRange.forEach(({ decoration, range }) => {
            applyDecoration(editor, decoration, range);
        });
    }
};

const createRangeNNNN = (sLine: number, sChar: number, eLine: number, eChar: number) => {
    return new vscode.Range(
        new vscode.Position(sLine, sChar),
        new vscode.Position(eLine, eChar)
    );
};

const createRangeSPEP = (start: vscode.Position, end: vscode.Position) => {
    return new vscode.Range(start, end);
};

const createRangeLineNNEP = (line: number, char: number, end: vscode.Position) => {
    return new vscode.Range(new vscode.Position(line, char), end);
};

const cursorOnlyDecorationWithRange: Type.SelectionTypeToDecorationFunc = ({ editor, borderConfig, textEditorDecoration }): Type.DecorationWithRangeType[] => {

    // index 0 - border applied decoration on selection
    // index 1 - background only decoration

    if (borderConfig.isWholeLine) {
        return [{
            decoration: textEditorDecoration[0],
            range: [createRangeSPEP(editor.selection.active, editor.selection.active)]
        }];
    }

    if (borderConfig.beforeCursor) {
        return [{
            decoration: textEditorDecoration[0],
            range: [createRangeNNNN(editor.selection.active.line, 0, editor.selection.active.line, editor.selection.active.character)]
        }];
    }

    if (borderConfig.afterCursor) {
        return [{
            decoration: textEditorDecoration[0],
            range: [createRangeLineNNEP(editor.selection.active.line, editor.selection.active.character, editor.document.lineAt(editor.selection.active.line).range.end
            )]
        },
        {
            decoration: textEditorDecoration[1],
            range: [createRangeNNNN(editor.selection.active.line, 0, editor.selection.active.line, editor.selection.active.character)]
        }];
    }
    return [];
};

const singelLineDecorationWithRange: Type.SelectionTypeToDecorationFunc = ({ editor, borderConfig, textEditorDecoration }): Type.DecorationWithRangeType[] => {

    // index 0 - single line decoration on selection
    // index 1 - background color only decoration <- this is todo. maybe. problem is this deco is not whole line. :(
    // [!] review to differentiate zero border decoraiton for wholeLine background and not-wholeLine background.

    return [{
        decoration: textEditorDecoration[0],
        range: [createRangeSPEP(editor.selection.start, editor.selection.end)]
    }];
};
const multiLineDecorationWithRange: Type.SelectionTypeToDecorationFunc = ({ editor, borderConfig, textEditorDecoration }): Type.DecorationWithRangeType[] => {
    if (borderConfig.borderPosition === 'left') {

        // index 0,1,2 are the same left only decoration.
        // they had to be wholeLine but it was anomaly.

        return [{
            decoration: textEditorDecoration[2],
            range: [createRangeNNNN(editor.selection.start.line, editor.selection.start.character, editor.selection.end.line, editor.selection.end.character)]
        },];
    } else {

        // index 0 - top border
        // index 1 - bottom border
        // index 2 - background color only for the range inbetween 0 and 1.
        // [!] review to differentiate zero border decoraiton for wholeLine background and not-wholeLine background.

        const decorationWithRange: Type.DecorationWithRangeType[] = [];

        decorationWithRange.push(...[{
            decoration: textEditorDecoration[0],
            range: [createRangeSPEP(editor.selection.start, editor.selection.start)]
        },
        {
            decoration: textEditorDecoration[1],
            range: [createRangeSPEP(editor.selection.end, editor.selection.end)]
        }]);

        if (Math.abs(editor.selection.start.line - editor.selection.end.line) > 1) {
            decorationWithRange.push({
                decoration: textEditorDecoration[2],
                range: [createRangeNNNN(editor.selection.start.line + 1, editor.selection.start.character, editor.selection.end.line - 1, editor.selection.end.character)]
            });
        } else {

            // found this another exception where this background decoration not being reset when range shrink.
            // this background decoraiton being applied on selection range expand as it should, but does not reset
            // when abs(cursor - ancher) is than 1.
            // the background decoration overlaps with cursor/anchor line on shrink when abs() is 1,
            // making it backgound applied twice.
            // if the abs(cursor - ancher) is less than 1, meaning it goes into single-line, decoration type changes
            // and this decoration is automatically reset at that point.
            // so this is a way to reset this decoration without changing the decoration type as well as with minimum steps.

            applyDecoration(editor, textEditorDecoration[2], []);
        }
        return decorationWithRange;
    }
};

const multiCursorDecorationWithRange: Type.SelectionTypeToDecorationFunc = ({ editor, borderConfig, textEditorDecoration }): Type.DecorationWithRangeType[] => {
    // index 0 - selection area
    // index 1 - to apply background color on line until cursor position.

    return [{
        decoration: textEditorDecoration[0],
        range: editor.selections.reduce((acc: vscode.Range[], selection: vscode.Selection) => {
            acc.push(new vscode.Range(selection.start, selection.active));
            return acc;
        }, [] as vscode.Range[])
    },
    {
        decoration: textEditorDecoration[1],
        range: editor.selections.reduce((acc: vscode.Range[], selection: vscode.Selection) => {
            acc.push(new vscode.Range(
                new vscode.Position(selection.active.line, 0),
                new vscode.Position(selection.active.line, selection.active.character)
            ));
            return acc;
        }, [] as vscode.Range[])
    }];
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

        const context: Type.SelectionTypeToDecorationContext = {
            editor,
            borderConfig,
            textEditorDecoration
        };

        if (decorationInfo.MASK & DECORATION_TYPE_MASK.CURSOR_ONLY) {
            return cursorOnlyDecorationWithRange(context);
        } else if (decorationInfo.MASK & DECORATION_TYPE_MASK.SINGLE_LINE) {
            return singelLineDecorationWithRange(context);
        } else if (decorationInfo.MASK & DECORATION_TYPE_MASK.MULTI_LINE) {
            return multiLineDecorationWithRange(context);
        } else if (decorationInfo.MASK & DECORATION_TYPE_MASK.MULTI_CURSOR) {
            return multiCursorDecorationWithRange(context);
        }
    }
    return;
};

const cursorActivate = async (context: vscode.ExtensionContext): Promise<vscode.Disposable[] | void> => {
    try {
        await context.extension.activate();

        const loadConfig = config.initialiseConfig(context);
        if (!loadConfig) {
            console.error('Failed to initialize config.');
            return;
        }

        if (!loadConfig.decorationList) {
            console.error('Failed to initialize decorationList.');
            return;
        }

        const activeEditor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;

        if (activeEditor) {
            setDecorationOnEditor({
                editor: activeEditor,
                decorationList: loadConfig.decorationList,
                decorationInfo: DECORATION_INFO.CURSOR_ONLY,
                loadConfig: loadConfig
            });
        }

        return [
            activeEditorChanged(loadConfig),
            selectionChanged(loadConfig),
            configChanged(context),
        ]; // event functions
    } catch (err) {
        console.error('Error during extension activation: ', err);
        vscode.window.showErrorMessage('Extension activation failed!', err);
    }
};

const getSelectionType = (editor: vscode.TextEditor): Type.DecorationInfoPropType | undefined => {
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

const activeEditorChanged = (config: Type.ConfigInfoReadyType): vscode.Disposable => {
    return vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
        if (editor) {

            // quick release of decorations
            vscode.window.visibleTextEditors.forEach(editor => {
                if (appliedDecoration.editorDecoration !== undefined) {
                    appliedDecoration.editorDecoration.forEach(decoration => {
                        applyDecoration(editor, decoration, []);
                    });
                }
            });

            setDecorationOnEditor({
                editor: editor,
                decorationList: config.decorationList,
                decorationInfo: DECORATION_INFO.CURSOR_ONLY,
                loadConfig: config
            });
        }
    });
};

const selectionChanged = (config: Type.ConfigInfoReadyType): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorSelection((event: vscode.TextEditorSelectionChangeEvent) => {
        if (event.selections) {
            const decorationType: Type.DecorationInfoPropType | undefined = getSelectionType(event.textEditor);
            if (!decorationType) {
                return;
            }

            const resetFunction = (decorationInfo: Type.DecorationInfoPropType): boolean => {
                return resetDecoration(config.decorationList, event.textEditor)(decorationInfo);
            };

            if (isDecorationChanged(appliedDecoration, decorationType)) {
                resetOtherDecoration(DECORATION_INFO.RESET, resetFunction);
            }

            if (!config.decorationList[decorationType.KEY]) {
                return;
            }

            setDecorationOnEditor({
                editor: event.textEditor,
                decorationList: config.decorationList,
                decorationInfo: decorationType,
                loadConfig: config
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