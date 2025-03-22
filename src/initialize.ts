import * as Type from './type/type';
import * as vscode from 'vscode';
import * as config from './configuration/load';
import * as windowEvent from './event/window';
import * as workspaceEvent from './event/workspace';
import * as languagesEvent from './event/language';
import { renderDecorationOnEditor } from './editor/decoration/decoration';
// import { fixConfiguration } from './util/error';
import { prepareRenderGroup } from './editor/editor';

const initialize = async (extensionContext: vscode.ExtensionContext): Promise<vscode.Disposable[] | void> => {
    try {
        await extensionContext.extension.activate();

        const loadConfig = config.loadConfiguration(extensionContext);

        if (!loadConfig) {
            console.error('Failed to initialize config.');
            return;
        }

        const configInfo: Type.ConfigInfoReadyType = loadConfig.config;
        const decorationState: Type.DecorationStateType = loadConfig.decoration;
        const activeEditor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;

        if (configInfo.configError.length > 0) {
            // fixConfiguration(configInfo.configError);
        }

        const renderGroup = prepareRenderGroup(configInfo);

        const eventContext: Type.EventContext = {
            editor: activeEditor,
            configInfo: configInfo,
            decorationState: decorationState,
            renderGroup: renderGroup
        };

        if (activeEditor) {
            renderDecorationOnEditor(eventContext as Type.DecorationContext);
        }

        return [
            windowEvent.windowStateChanged(eventContext),
            windowEvent.activeEditorChanged(eventContext),
            windowEvent.selectionChanged(eventContext),
            windowEvent.editorOptionChanged(eventContext),
            languagesEvent.diagnosticChanged(eventContext),
            workspaceEvent.configChanged(eventContext),
        ]; // event functions
    } catch (err) {
        console.error('Error during extension initialization: ', err);
        vscode.window.showErrorMessage('Extension initialization failed!', err);
    }
};

export {
    initialize
};