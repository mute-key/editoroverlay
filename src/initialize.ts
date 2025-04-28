import * as Type from './type/type';
import * as vscode from 'vscode';
import * as config from './configuration/load';
import * as commands from './command/register';
import * as windowEvent from './event/window';
import * as workspaceEvent from './event/workspace';
import * as languagesEvent from './event/language';
import * as __0x from './constant/shared/numeric';
import Error from './util/error';
import { clearDecorationState } from './editor/editor';
import { prepareRenderGroup, renderGroupIs } from './editor/editor';
import { checkActiveThemeKind } from './configuration/preset/preset';
import type { DecorationState } from './editor/editor';
import { updateRangeMetadata } from './editor/range';

export interface CommandContext {
    package: vscode.ExtensionContext,
    configInfo: object
}

// export interface EventContext {
//     configInfo: object,
//     decorationState: DecorationState
// }


/**
 * Main initialisation of the extension. 
 * wraps all extenion configuration and prepare the extension subscriptions. 
 * 
 * @param extensionContext 
 * @returns 
 */
const initialize = async (extensionContext: vscode.ExtensionContext): Promise<vscode.Disposable[] | void> => {
    try {
        
        await extensionContext.extension.activate();        // this is suppose to wait for its turn to be activated 
                                                            // when vscode startup, not sure if it is the best method, 
                                                            // as i am not sure even if it needs to wait to be activated.
                                                            // maybe need to revise the method.

        Error.setPackageName(extensionContext.extension.packageJSON.name);

        const loadConfig = await config.loadConfiguration(extensionContext);

        if (!loadConfig) {
            console.error('Failed to initialize config.');
            return;
        }

        const configInfo: Type.ConfigInfoReadyType = loadConfig.config;
        const activeEditor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;

        prepareRenderGroup(configInfo);

        if (activeEditor) {                                 // if user is on editor
            updateRangeMetadata(activeEditor);              // set selection range meta data for the editor
            clearDecorationState(loadConfig.decoration);    // initialize decoration state
            loadConfig.decoration.appliedHighlight[0] = renderGroupIs(activeEditor, [__0x.cursorOnly]);
        }

        const commandContext: CommandContext = {            // context for extension commands
            package: extensionContext,
            configInfo: configInfo
        };

        const eventContext = {                              // context for extension events
            configInfo: configInfo,
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

export {
    initialize
};