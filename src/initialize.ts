import type * as D from './type/type';

import * as vscode from 'vscode';
import * as config from './configuration/load';
import * as commands from './command/register';
import * as events from './event/event';
import * as hex from './constant/numeric/hexadecimal';
import Error from './util/error';
import { clearDecorationState } from './editor/editor';
import { prepareRenderGroup, renderGroupIs } from './editor/editor';
import { checkActiveThemeKind } from './command/preset';
import { updateRangeMetadata } from './editor/range';
import { initializeScm, setScmBranch } from './editor/scm/scm';

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
const initialize = async (extensionContext: vscode.ExtensionContext): Promise<(vscode.Disposable | vscode.Event<void>)[] | void> => {
    try {
        // await extensionContext.extension.activate();
        // when vscode startup, not sure if it is the best method, 
        // as i am not sure even if it needs to wait to be activated.
        // maybe need to revise the method..? 

        // extensionContext.
        // extensionContext.asAbsolutePath
        Error.setPackageName(extensionContext.extension.packageJSON.name);

        const loadConfig = await config.loadConfiguration(extensionContext);

        if (!loadConfig) {
            console.error('Failed to initialize config.');
            return;
        }

        if (loadConfig.config.generalConfigInfo.scmTextEnabled) {
            initializeScm(extensionContext);
        }

        const configInfo: D.Status.Intf.ConfigInfo = loadConfig.config;
        const activeEditor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;

        await prepareRenderGroup(configInfo as D.Config.Intf.ConfigReady);

        if (activeEditor) {                                 // if user is on editor
            setScmBranch(activeEditor);
            updateRangeMetadata(activeEditor);              // set selection range metadata for the editor
            clearDecorationState(loadConfig.decoration as D.Editor.Tp.DecorationState);    // initialize decoration state
            loadConfig.decoration.appliedHighlight[0] = renderGroupIs(activeEditor, [hex.cursorOnly]);
            loadConfig.decoration.eventTrigger[0] = hex.noEvent;
        }

        const commandContext: D.Command.Intf.Context = {    // context for extension commands
            package: extensionContext,
            configInfo: configInfo
        };

        const eventContext: D.Event.Intf.Context = {        // context for extension events
            configInfo: configInfo as D.Config.Intf.ConfigReady,
            decorationState: loadConfig.decoration,
        };
;
        checkActiveThemeKind(commandContext);

        return [                                            // extension subscription list, commands | events.
            commands.setPreset(commandContext),
            commands.setColor(commandContext),
            commands.setContrast(commandContext),
            commands.setOrientation(commandContext),
            commands.resetConfiguration(commandContext),
            events.window.activeEditorChanged(eventContext),
            events.window.editorOptionChanged(eventContext),
            events.window.selectionChanged(eventContext),
            events.window.windowStateChanged(eventContext),
            events.workspace.configChanged(eventContext),
            events.workspace.changeWorkspaceFolders(eventContext),
            events.language.diagnosticChanged(eventContext),
        ];
    } catch (err) {
        console.error('Error during extension initialization: ', err);
        // vscode.window.showErrorMessage('Extension initialization failed!');
    }
};