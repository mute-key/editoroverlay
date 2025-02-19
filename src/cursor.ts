/**
 * [main cursor action logic]
 * 
 */
import * as vscode from 'vscode';
import * as Type from './type/type.d';
import * as config from './config';
import {
    DECORATION_STYLE_KEY,
} from './constant/enum';

import {
    DECORATION_INFO,
    APPLIED_DECORATION
} from './constant/object';

import {
    cursorOnlyDecorationWithRange,
    singelLineDecorationWithRange,
    multiLineDecorationWithRange,
    multiCursorDecorationWithRange,
    status
} from './selection';
import {
    applyDecoration
} from './decoration';
import {
    regex
} from './util';

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

        isDecorationChanged(loadConfig, editor, appliedDecoration, decorationInfo);

        decorationWithRange.forEach(({ decoration, range }) => {
            applyDecoration(editor, decoration, range);
        });
    }
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


const appliedDecoration: Type.AppliedDecorationType = { ...APPLIED_DECORATION };

const resetLastAppliedDecoration = (editor: vscode.TextEditor, decorationType: vscode.TextEditorDecorationType[]) => {
    decorationType.forEach(decoration => {
        applyDecoration(editor, decoration, []);
    });
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
            editorOptionChange(loadConfig),
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

const editorIndentOption = (config: Type.ConfigInfoReadyType, editor: vscode.TextEditor): void => {
    config.status.indent.size = Number(editor.options.tabSize ?? editor.options.indentSize ?? 4);
    config.status.indent.type = editor.options.insertSpaces ? '\n' : '\t';
    config.status.indent.regex = editor.options.insertSpaces
        ? regex.indentRegex(config.status.indent.size)
        : regex.tagRegex;
};

const editorViewportChanged = () => {
    vscode.window.onDidChangeTextEditorVisibleRanges((event: vscode.TextEditorVisibleRangesChangeEvent) => {
        // event.textEditor.revealRange(new vscode.Range(new vscode.Position(0, 0), new vscode.Range(0, 0))
        //     , vscode.TextEditorRevealType.Default))
    });
};

const editorOptionChange = (config: Type.ConfigInfoReadyType): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorOptions((event: vscode.TextEditorOptionsChangeEvent) => {
        editorIndentOption(config, event.textEditor);
    });
};

const activeEditorChanged = (config: Type.ConfigInfoReadyType): vscode.Disposable => {
    return vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
        if (editor) {
            editorIndentOption(config, editor);

            // quick release of decorations.
            // this method feels smoother than tracking the last active editor in object literal, 
            // and resetting the decoration. 

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

            isDecorationChanged(config, event.textEditor, appliedDecoration, decorationType);

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