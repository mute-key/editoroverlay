import * as __0x from '../../constant/shared/numeric';
import Error from '../../util/error';
import { CONFIG_SECTION_KEY } from '../../constant/config/enum';
import { resetAllDecoration, prepareRenderGroup } from '../../editor/editor';
import { updateGeneralConfig, updateHighlightStyleConfiguration } from '../decoration/highlight';
import { updateDiagnosticTextConfig } from '../decoration/diagonostic';
import { updateSelectionTextConfig } from '../decoration/selection';

const configurationChanged = (configInfo: any, section: string) => {
    try {
        Error.configurationUpdated();
        const sectionChanged = {
            [CONFIG_SECTION_KEY.GENERAL]: () => updateGeneralConfig(configInfo),
            [CONFIG_SECTION_KEY.CURSOR_ONLY]: () => updateHighlightStyleConfiguration(configInfo, __0x.cursorOnly),
            [CONFIG_SECTION_KEY.SINGLE_LINE]: () => updateHighlightStyleConfiguration(configInfo, __0x.singleLine),
            [CONFIG_SECTION_KEY.MULTI_LINE]: () => updateHighlightStyleConfiguration(configInfo, __0x.multiLine),
            [CONFIG_SECTION_KEY.MULTI_CURSOR]: () => updateHighlightStyleConfiguration(configInfo, __0x.multiCursor),
            [CONFIG_SECTION_KEY.SELECTION_TEXT]: () => updateSelectionTextConfig(configInfo.name, true),
            [CONFIG_SECTION_KEY.DIAGNOSTIC_TEXT]: () => updateDiagnosticTextConfig(configInfo.name, true)
        };
        resetAllDecoration();
        sectionChanged[section]();
        sectionChanged[CONFIG_SECTION_KEY.GENERAL]();
    } catch (e) {
        console.log('confugration update failed. Will notify user.', e);
    } finally {
        prepareRenderGroup(configInfo);
    }
};

export {
    configurationChanged
};