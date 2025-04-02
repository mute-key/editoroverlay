import * as Type from './type/type';
import * as vscode from 'vscode';
import * as config from './configuration/load';
import * as windowEvent from './event/window';
import * as workspaceEvent from './event/workspace';
import * as languagesEvent from './event/language';
import * as __0x from './constant/shared/numeric';
import Error from './util/error';
import { clearDecorationState } from './editor/decoration/decoration';
import { prepareRenderGroup, renderGroupIs } from './editor/editor';

const initialize = async (extensionContext: vscode.ExtensionContext): Promise<vscode.Disposable[] | void> => {
    try {
        await extensionContext.extension.activate();

        Error.setPackageName(extensionContext.extension.packageJSON.name);

        const loadConfig = await config.loadConfiguration(extensionContext);

        if (!loadConfig) {
            console.error('Failed to initialize config.');
            return;
        }

        const configInfo: Type.ConfigInfoReadyType = loadConfig.config;
        const activeEditor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;

        clearDecorationState(loadConfig.decoration);

        const eventContext: Type.EventContext = {
            configInfo: configInfo,
            decorationState: loadConfig.decoration
        };

        prepareRenderGroup(configInfo);

        if (activeEditor) {
            loadConfig.decoration.appliedHighlight[0] = renderGroupIs(activeEditor, [__0x.cursorOnly]);
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