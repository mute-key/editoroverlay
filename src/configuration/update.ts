import * as __0x from '../constant/shared/numeric';
import { updateGeneralConfig, updateHighlightStyleConfiguration } from './highlight/highlight';
import { updateSelectionTextConfig } from './status/selection';
import { updateDiagnosticTextConfig } from './status/diagonostic';
import { CONFIG_SECTION_KEY, SELECTION_TYPE } from '../constant/config/enum';

const sectionList = [
    CONFIG_SECTION_KEY.GENERAL,
    CONFIG_SECTION_KEY.CURSOR_ONLY,
    CONFIG_SECTION_KEY.SINGLE_LINE,
    CONFIG_SECTION_KEY.MULTI_LINE,
    CONFIG_SECTION_KEY.MULTI_CURSOR,
    CONFIG_SECTION_KEY.SELECTION_TEXT,
    CONFIG_SECTION_KEY.DIAGNOSTIC_TEXT
] as const;

const sectionChanged = () => {
    return {
        [CONFIG_SECTION_KEY.GENERAL]: (config) => updateGeneralConfig(config),
        [CONFIG_SECTION_KEY.CURSOR_ONLY]: (config) => updateHighlightStyleConfiguration(config, __0x.cursorOnly),
        [CONFIG_SECTION_KEY.SINGLE_LINE]: (config) => updateHighlightStyleConfiguration(config, __0x.singleLine),
        [CONFIG_SECTION_KEY.MULTI_LINE]: (config) => updateHighlightStyleConfiguration(config, __0x.multiLine),
        [CONFIG_SECTION_KEY.MULTI_CURSOR]: (config) => updateHighlightStyleConfiguration(config, __0x.multiCursor),
        [CONFIG_SECTION_KEY.SELECTION_TEXT]: (config) => updateSelectionTextConfig(config, true),
        [CONFIG_SECTION_KEY.DIAGNOSTIC_TEXT]: (config) => updateDiagnosticTextConfig(config, true),
    };
};

export {
    sectionChanged,
    sectionList
};
