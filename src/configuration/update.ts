import * as Type from '../type/type';
import { CONFIG_SECTION_KEY, SELECTION_TYPE } from '../constant/enum';
import { updateGeneralConfig, updateHighlightStyleConfiguration } from './highlight/highlight';
import { updateSelectionTextConfig } from './status/selection';
import { updateDiagnosticTextConfig } from './status/diagonostic';

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
        [CONFIG_SECTION_KEY.CURSOR_ONLY]: (config) => updateHighlightStyleConfiguration(config, SELECTION_TYPE.CURSOR_ONLY),
        [CONFIG_SECTION_KEY.SINGLE_LINE]: (config) => updateHighlightStyleConfiguration(config, SELECTION_TYPE.SINGLE_LINE),
        [CONFIG_SECTION_KEY.MULTI_LINE]: (config) => updateHighlightStyleConfiguration(config, SELECTION_TYPE.MULTI_LINE),
        [CONFIG_SECTION_KEY.MULTI_CURSOR]: (config) => updateHighlightStyleConfiguration(config, SELECTION_TYPE.MULTI_CURSOR),
        [CONFIG_SECTION_KEY.SELECTION_TEXT]: (config) => updateSelectionTextConfig(config),
        [CONFIG_SECTION_KEY.DIAGNOSTIC_TEXT]: (config) => updateDiagnosticTextConfig(config, true),
    };
};

export {
    sectionChanged,
    sectionList
};
