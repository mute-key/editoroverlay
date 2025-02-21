/**
 * [main cursor action logic]
 * 
 */
import * as vscode from 'vscode';
import * as config from './config';
import {
    DECORATION_INFO
} from './constant/object';
import {
    setDecorationOnEditor
} from './decoration';
import {
    regex,
    fixConfuration
} from './util';
import {
    onActiveWindowChange,
    activeEditorChanged,
    editorOptionChange,
    selectionChanged,
    configChanged,
} from './event';

/**
 * @param editor
 * @param decorationInfo
 * 
 */
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

        if (loadConfig.configError.length > 0) {
            fixConfuration(loadConfig.configError);
        }

        if (activeEditor) {
            setDecorationOnEditor({
                editor: activeEditor,
                decorationList: loadConfig.decorationList,
                decorationInfo: DECORATION_INFO.CURSOR_ONLY,
                loadConfig: loadConfig
            });
        }

        return [
            onActiveWindowChange(loadConfig),
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

export {
    cursorActivate
};