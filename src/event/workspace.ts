import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import * as __0x from '../constant/shared/numeric';
import Error from '../util/error';
import { CONFIG_SECTION } from '../constant/config/object';
import { CONFIG_SECTION_KEY } from '../constant/config/enum';
import { prepareRenderGroup } from '../editor/editor';
import { resetAllDecoration } from '../editor/editor';
import { updateGeneralConfig, updateHighlightStyleConfiguration } from '../configuration/decoration/highlight';
import { updateDiagnosticTextConfig } from '../configuration/decoration/diagonostic';
import { updateSelectionTextConfig } from '../configuration/decoration/selection';

const configChanged: Type.DecorationEventFunc = ({ configInfo, decorationState }): vscode.Disposable => {
    return vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
        if (event) { // if user is on settings tab.
            const section = Object.keys(CONFIG_SECTION).find(section => {
                return event.affectsConfiguration(configInfo.name + '.' + section);
            });

            if (section) {
                Error.configurationUpdated();
                try {
                    const sectionChanged = {
                        [CONFIG_SECTION_KEY.GENERAL]: () => updateGeneralConfig(configInfo),
                        [CONFIG_SECTION_KEY.CURSOR_ONLY]: () => updateHighlightStyleConfiguration(configInfo, __0x.cursorOnly),
                        [CONFIG_SECTION_KEY.SINGLE_LINE]: () => updateHighlightStyleConfiguration(configInfo, __0x.singleLine),
                        [CONFIG_SECTION_KEY.MULTI_LINE]: () => updateHighlightStyleConfiguration(configInfo, __0x.multiLine),
                        [CONFIG_SECTION_KEY.MULTI_CURSOR]: () => updateHighlightStyleConfiguration(configInfo, __0x.multiCursor),
                        [CONFIG_SECTION_KEY.SELECTION_TEXT]: () => {
                            updateSelectionTextConfig(configInfo.name, true);
                            updateDiagnosticTextConfig(configInfo.name, true);
                        },
                        [CONFIG_SECTION_KEY.DIAGNOSTIC_TEXT]: () => {
                            updateSelectionTextConfig(configInfo.name, true);
                            updateDiagnosticTextConfig(configInfo.name, true);
                        }
                    };
                    sectionChanged[section]();
                    sectionChanged[CONFIG_SECTION_KEY.GENERAL]();
                } catch (e) {
                    console.log('confugration update failed. Will notify user.', e);
                } finally {
                    resetAllDecoration();
                    prepareRenderGroup(configInfo);
                }
            }
        }
    });
};

export {
    configChanged
};