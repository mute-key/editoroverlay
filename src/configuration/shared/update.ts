import * as __0x from '../../constant/shared/numeric';
import Error from '../../util/error';
import { CONFIG_SECTION_KEY } from '../../constant/config/enum';
import { resetAllDecoration, prepareRenderGroup } from '../../editor/editor';
import { updateGeneralConfig, updateHighlightStyleConfiguration } from '../decoration/highlight';
import { updateDiagnosticTextConfig } from '../decoration/diagnostic';
import { updateSelectionTextConfig } from '../decoration/selection';
import { config } from 'process';

const configurationChanged = (configInfo: any, section: string): void => {
    try {
        Error.configurationUpdated();
        const sectionChanged = {
            [CONFIG_SECTION_KEY.GENERAL]: () => updateGeneralConfig(configInfo),
            [CONFIG_SECTION_KEY.CURSOR_ONLY]: () => updateHighlightStyleConfiguration(configInfo, __0x.cursorOnly),
            [CONFIG_SECTION_KEY.SINGLE_LINE]: () => updateHighlightStyleConfiguration(configInfo, __0x.singleLine),
            [CONFIG_SECTION_KEY.MULTI_LINE]: () => updateHighlightStyleConfiguration(configInfo, __0x.multiLine),
            [CONFIG_SECTION_KEY.MULTI_CURSOR]: () => updateHighlightStyleConfiguration(configInfo, __0x.multiCursor),
            [CONFIG_SECTION_KEY.SELECTION_TEXT]: () => {
                if (configInfo.generalConfigInfo.selectionTextEnabled) {
                    updateSelectionTextConfig(configInfo.name, true);
                }
            },
            [CONFIG_SECTION_KEY.DIAGNOSTIC_TEXT]: () => {
                if (configInfo.generalConfigInfo.diagnosticTextEnabled) {
                    updateDiagnosticTextConfig(configInfo.name, true);
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

export {
    configurationChanged
};