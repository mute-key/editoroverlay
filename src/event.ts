
import * as vscode from 'vscode';
import * as Type from './type/type.d';
import * as config from './config';
import {
    applyDecoration,
    setDecorationOnEditor,
    resetDecorationWrapper,
    isDecorationChanged
} from './decoration';
import {
    DECORATION_INFO
} from './constant/object';
import {
    fixConfuration
} from './util';
import {
    editorIndentOption,
    getSelectionType
} from './editor';

const onActiveWindowChange = (config: Type.ConfigInfoReadyType): vscode.Disposable => {
    return vscode.window.onDidChangeWindowState((event: vscode.WindowState) => {
        if (event.focused) {
            // apply decoration to active editor.
            if (vscode.window.activeTextEditor) {
                setDecorationOnEditor({
                    editor: vscode.window.activeTextEditor,
                    decorationList: config.decorationList,
                    decorationInfo: DECORATION_INFO.CURSOR_ONLY,
                    loadConfig: config
                });
            }
        } else {
            // reset all decoration on all editors.
            vscode.window.visibleTextEditors.forEach((editor: vscode.TextEditor) => {
                resetDecorationWrapper(config, editor, true);
            });
        }
    });
};

const activeEditorChanged = (config: Type.ConfigInfoReadyType): vscode.Disposable => {
    return vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
        if (editor) {

            if (config.configError.length > 0) {
                fixConfuration(config.configError);
            }

            editorIndentOption(config, editor);

            // resetDecorationWrapper(config, editor);

            // quick release of decorations.
            // this method feels smoother than tracking the last active editor in object literal, 
            // and resetting the decoration. 

            vscode.window.visibleTextEditors.forEach(editor => {
                if (config.appliedDecoration.editorDecoration !== undefined) {
                    config.appliedDecoration.editorDecoration.forEach(decoration => {
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

const editorOptionChange = (config: Type.ConfigInfoReadyType): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorOptions((event: vscode.TextEditorOptionsChangeEvent) => {
        editorIndentOption(config, event.textEditor);
    });
};

const selectionChanged = (config: Type.ConfigInfoReadyType): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorSelection((event: vscode.TextEditorSelectionChangeEvent) => {
        if (event.selections) {
            const decorationType: Type.DecorationInfoPropType | undefined = getSelectionType(event.textEditor);
            if (!decorationType) {
                return;
            }

            isDecorationChanged(config, event.textEditor, config.appliedDecoration, decorationType);

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
            // need to dispose all decorations... 

            const configReady = config.initialiseConfig(context);
            if (configReady) {
                // if (configReady.configError.length) {
                //     sendAutoDismissMessage('All Configuration Ok.', 2000);   
                // }
            }
        }
    });
};

export {
    onActiveWindowChange,
    activeEditorChanged,
    editorOptionChange,
    selectionChanged,
    configChanged,
};
