import type * as D from './type/type';

import * as vscode from 'vscode';
import * as config from './configuration/load';
import * as commands from './command/register';
import * as windowEvent from './event/window';
import * as workspaceEvent from './event/workspace';
import * as languagesEvent from './event/language';
import * as hex from './numeric/hex';
import Error from './util/error';
import { clearDecorationState } from './editor/editor';
import { prepareRenderGroup, renderGroupIs } from './editor/editor';
import { checkActiveThemeKind } from './command/preset';
import { updateRangeMetadata } from './editor/range';

export {
    initialize
};

/**
 * Main initialisation of the extension. 
 * wraps all extenion configuration and prepare the extension subscriptions. 
 * 
 * @param extensionContext 
 * @returns 
 */
const initialize = async (extensionContext: vscode.ExtensionContext): Promise<vscode.Disposable[] | void> => {
    try {
        await extensionContext.extension.activate();        //

        // when vscode startup, not sure if it is the best method, 
        // as i am not sure even if it needs to wait to be activated.
        // maybe need to revise the method.

        Error.setPackageName(extensionContext.extension.packageJSON.name);

        const loadConfig = await config.loadConfiguration(extensionContext);

        if (!loadConfig) {
            console.error('Failed to initialize config.');
            return;
        }

        const configInfo: D.Status.Intf.ConfigInfo = loadConfig.config;
        const activeEditor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;

        prepareRenderGroup(configInfo as D.Config.Intf.ConfigReady);

        if (activeEditor) {                                 // if user is on editor
            updateRangeMetadata(activeEditor);              // set selection range metadata for the editor
            clearDecorationState(loadConfig.decoration);    // initialize decoration state
            loadConfig.decoration.appliedHighlight[0] = renderGroupIs(activeEditor, [hex.cursorOnly]);
        }

        const commandContext: D.Command.Intf.Context = {    // context for extension commands
            package: extensionContext,
            configInfo: configInfo
        };

        const eventContext: D.Event.Intf.Context = {        // context for extension events
            configInfo: configInfo as D.Config.Intf.ConfigReady,
            decorationState: loadConfig.decoration
        };

        checkActiveThemeKind(commandContext);

        return [                                            // extension subscription list, commands | events.
            commands.setPreset(commandContext),
            commands.setColor(commandContext),
            commands.setContrast(commandContext),
            commands.setOrientation(commandContext),
            commands.resetConfiguration(commandContext),
            windowEvent.windowStateChanged(eventContext),
            windowEvent.activeEditorChanged(eventContext),
            windowEvent.selectionChanged(eventContext),
            windowEvent.editorOptionChanged(eventContext),
            languagesEvent.diagnosticChanged(eventContext),
            workspaceEvent.configChanged(eventContext),
        ];
    } catch (err) {
        console.error('Error during extension initialization: ', err);
        vscode.window.showErrorMessage('Extension initialization failed!', err);
    }
};