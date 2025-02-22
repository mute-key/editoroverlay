/**
 * [main cursor action logic]
 * 
 */
import * as vscode from 'vscode';
import * as config from './config';
import * as Type from './type/type.d';
import {
    DECORATION_INFO
} from './constant/object';
import {
    setDecorationOnEditor
} from './decoration';
import {
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

        const configReady: Type.ConfigInfoReadyType = loadConfig.config; 
        const decorationStatus: Type.DecorationStatusType = loadConfig.decoration;

        if (!decorationStatus.decorationList) {
            console.error('Failed to initialize decorationList.');
            return;
        }

        const activeEditor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;

        if (configReady.configError.length > 0) {
            fixConfuration(configReady.configError);
        }

        if (activeEditor) {
            setDecorationOnEditor({
                loadConfig: configReady,
                editor: activeEditor,
                decorationInfo: DECORATION_INFO.CURSOR_ONLY,
                decorationStatus: decorationStatus
            });
        }

        return [
            onActiveWindowChange(configReady, decorationStatus),
            activeEditorChanged(configReady, decorationStatus),
            selectionChanged(configReady, decorationStatus),
            editorOptionChange(configReady),
            configChanged(context, decorationStatus),
        ]; // event functions
    } catch (err) {
        console.error('Error during extension activation: ', err);
        vscode.window.showErrorMessage('Extension activation failed!', err);
    }
};

export {
    cursorActivate
};