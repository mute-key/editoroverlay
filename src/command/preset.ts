import * as vscode from 'vscode';
import { getWorkspaceConfiguration } from '../configuration/shared/configuration';
// import { readFileSync } from 'fs';

const writeUserConfiguration = () => {

};

const loadPreset = () => {
    // readFileSync("../../")

    const editorConfig = getWorkspaceConfiguration("editor");
    editorConfig.update("renderLineHighlight", 'gutter', vscode.ConfigurationTarget.Global);
    editorConfig.update("roundedSelection", false, vscode.ConfigurationTarget.Global);
};

export {
    loadPreset
};