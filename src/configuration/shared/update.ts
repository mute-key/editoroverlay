import * as hex from '../../numeric/hexadecimal';
import Error from '../../util/error';
import { CONFIG_SECTION_KEY } from '../../constant/config/enum';
import { resetAllDecoration, prepareRenderGroup } from '../../editor/editor';
import { updateGeneralConfig, updateHighlightStyleConfiguration } from '../decoration/highlight';
import { updateDiagnosticTextConfig } from '../decoration/diagnostic';
import { updateSelectionTextConfig } from '../decoration/selection';

export {
    configurationChanged
};

const configurationChanged = (configInfo: any, section: string): void => {
    try {
        Error.configurationUpdated();
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