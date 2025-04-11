import * as vscode from 'vscode';
import preset from './preset.json' assert { type: 'json' };
import { getWorkspaceConfiguration } from '../configuration/shared/configuration';
// import { readFileSync } from 'fs';

const writeUserConfiguration = () => {

};

const loadPreset = async (context: vscode.ExtensionContext) => {

    // const jsonPath = context.asAbsolutePath(path.join('resources', 'data.json'));

    // try {
    //     const content = await fs.readFile(jsonPath, 'utf-8');
    //     const data = JSON.parse(content);
    //     console.log('Loaded JSON:', data);
    // } catch (error) {
    //     console.error('Failed to load JSON:', error);
    // }

    const editorConfig = getWorkspaceConfiguration("editor");
    editorConfig.update("renderLineHighlight", 'gutter', vscode.ConfigurationTarget.Global);
    editorConfig.update("roundedSelection", false, vscode.ConfigurationTarget.Global);
};

export {
    loadPreset
};