import * as Type from './type/type';
import * as vscode from 'vscode';
import * as config from './configuration/load';
import * as windowEvent from './event/window';
import * as workspaceEvent from './event/workspace';
import * as languagesEvent from './event/language';
import { DECORATION_INFO } from './constant/object';
import { setDecorationOnEditor } from './editor/decoration/decoration';
import { fixConfiguration } from './util/error';
import { editorIndentOption } from './editor/editor';
import { updateDiagnostic } from './diagnostic/diagnostic';

/**
 * @param editor
 * @param decorationInfo
 * 
 */
const initialize = async (extensionContext: vscode.ExtensionContext): Promise<vscode.Disposable[] | void> => {
    try {
        await extensionContext.extension.activate();

        const loadConfig = config.loaConfiguration(extensionContext);

        if (!loadConfig) {
            console.error('Failed to initialize config.');
            return;
        }

        const configInfo: Type.ConfigInfoReadyType = loadConfig.config;
        const decorationState: Type.DecorationStateType = loadConfig.decoration;

        if (!decorationState.highlightStyleList) {
            console.error('Failed to initialize highlightStyleList.');
            return;
        }

        const activeEditor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;

        if (configInfo.configError.length > 0) {
            fixConfiguration(configInfo.configError);
        }

        const editorContext: Type.EventContext = {
            editor: activeEditor,
            configInfo: configInfo,
            indentInfo: editorIndentOption(activeEditor),
            decorationState: decorationState
        };

        if (activeEditor) {
            editorContext.decorationInfo = DECORATION_INFO.CURSOR_ONLY;

            updateDiagnostic();

            setDecorationOnEditor(editorContext as Type.DecorationContext);
        }

        return [
            windowEvent.windowStateChanged(editorContext),
            windowEvent.activeEditorChanged(editorContext),
            windowEvent.selectionChanged(editorContext),
            windowEvent.editorOptionChanged(editorContext),
            languagesEvent.diagnosticChanged(editorContext),
            workspaceEvent.configChanged(extensionContext),
        ]; // event functions
    } catch (err) {
        console.error('Error during extension initialization: ', err);
        vscode.window.showErrorMessage('Extension initialization failed!', err);
    }
};

export {
    initialize
};