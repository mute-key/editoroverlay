import * as hex from '../../constant/numeric/hexadecimal';
import ErrorHandler from '../../util/error';
import { CONFIG_SECTION_KEY } from '../../constant/config/enum';
import { resetAllDecoration, prepareRenderGroup } from '../../editor/editor';
import { updateGeneralConfig, updateHighlightStyleConfiguration } from '../overlay/highlight';
import { updateDiagnosticTextConfig } from '../overlay/diagnostic';
import { updateSelectionTextConfig } from '../overlay/selection';
import { updateScmTextConfig } from '../overlay/scm';

export {
    configurationChanged
};

const configurationChanged = (configInfo: any, section: string): void => {
    try {
        ErrorHandler.configurationUpdated();
        const sectionChanged: Record<string, any> = {
            [CONFIG_SECTION_KEY.GENERAL]: () => updateGeneralConfig(configInfo),
            [CONFIG_SECTION_KEY.CURSOR_ONLY]: () => updateHighlightStyleConfiguration(configInfo, hex.cursorOnly),
            [CONFIG_SECTION_KEY.SINGLE_LINE]: () => updateHighlightStyleConfiguration(configInfo, hex.singleLine),
            [CONFIG_SECTION_KEY.MULTI_LINE]: () => updateHighlightStyleConfiguration(configInfo, hex.multiLine),
            [CONFIG_SECTION_KEY.MULTI_CURSOR]: () => updateHighlightStyleConfiguration(configInfo, hex.multiCursor),
            [CONFIG_SECTION_KEY.SELECTION_TEXT]: () => {
                if (configInfo.generalConfigInfo.selectionTextEnabled) {
                    updateSelectionTextConfig(configInfo.name, true);
                }
            },
            [CONFIG_SECTION_KEY.DIAGNOSTIC_TEXT]: () => {
                if (configInfo.generalConfigInfo.diagnosticTextEnabled) {
                    updateDiagnosticTextConfig(configInfo.name, true);
                }
            },
            [CONFIG_SECTION_KEY.SCM_TEXT]: () => {
                if (configInfo.generalConfigInfo.scmTextEnabled) {
                    updateScmTextConfig(configInfo.name, true);
                }
            }
        };
        resetAllDecoration();
        sectionChanged[CONFIG_SECTION_KEY.GENERAL]();
        sectionChanged[section]();
    } catch (e) {
        console.log('confugration update failed. Will notify user.', e);
    } finally {
        prepareRenderGroup(configInfo);
    }
};