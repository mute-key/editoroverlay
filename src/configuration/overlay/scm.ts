import { CONFIG_SECTION, SCM_CONFIG, SCM_CONFIGURATION_LIST_CONFIG } from "../../constant/config/object";
import { workspaceProxyConfiguration } from "../shared/configuration";

export {
    updateScmTextConfig
};

const updateScmTextConfig = (extenionName: string, configuratioChange: boolean = false): boolean => {
    const scmConfiguration = SCM_CONFIG;

    workspaceProxyConfiguration(scmConfiguration, extenionName + '.' + CONFIG_SECTION.scmText, SCM_CONFIGURATION_LIST_CONFIG, undefined, undefined);
    return true;
};