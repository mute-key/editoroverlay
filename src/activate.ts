/**
 * [main cursor action logic]
 * 
 */
import * as Type from './type/type.d';
import * as vscode from 'vscode';
import * as config from './config/config';
import * as event from './event';
import {
    DECORATION_INFO
} from './constant/object';
import {
    setDecorationOnEditor
} from './editor/decoration/decoration';
import {
    fixConfiguration
} from './error';
import { 
    updateDiagonosticState 
} from './editor/decoration/diagnostic';

/**
 * @param editor
 * @param decorationInfo
 * 
 */
const initialize = async (context: vscode.ExtensionContext): Promise<vscode.Disposable[] | void> => {
    try {
        await context.extension.activate();

        const loadConfig = config.initializeConfig(context);
        
        if (!loadConfig) {
            console.error('Failed to initialize config.');
            return;
        }

        const configInfo: Type.ConfigInfoReadyType = loadConfig.config; 
        const statusInfo: Type.StatusInfoType = loadConfig.status;
        const decorationState: Type.DecorationStateType = loadConfig.decoration;

        if (!decorationState.decorationList) {
            console.error('Failed to initialize decorationList.');
            return;
        }

        const activeEditor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;

        if (configInfo.configError.length > 0) {
            fixConfiguration(configInfo.configError);
        }

        if (activeEditor) {
            // bindEditorWithStatusText(activeEditor);
            updateDiagonosticState();

            setDecorationOnEditor({
                editor: activeEditor,
                configInfo: configInfo,
                statusInfo: statusInfo,
                decorationInfo: DECORATION_INFO.CURSOR_ONLY,
                decorationState: decorationState
            });
        }

        return [
            event.onActiveWindowChange(configInfo, statusInfo, decorationState),
            event.activeEditorChanged(configInfo, statusInfo, decorationState),
            event.selectionChanged(configInfo, statusInfo, decorationState),
            // event.visibleRangeChanged(),
            event.diagnosticChanged(activeEditor),
            event.editorOptionChange(statusInfo),
            event.configChanged(context),
        ]; // event functions
    } catch (err) {
        console.error('Error during extension activation: ', err);
        vscode.window.showErrorMessage('Extension activation failed!', err);
    }
};

export {
    initialize
};