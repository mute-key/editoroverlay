import * as vscode from 'vscode';

const fixConfiguration = (confingError: string[]) => {
    vscode.window.showErrorMessage(
        "Invalid Value(s) in Configuration.", 
        ...['Fix Configuration', 'Ignore']        
    ).then(selection => {
        if (selection === "Fix Configuration") {
            vscode.commands.executeCommand("workbench.action.openSettings", confingError.join(' '));
        }
    });
};

export {
    fixConfiguration
};