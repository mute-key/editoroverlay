import type * as D from '../type/type';

import * as vscode from 'vscode';
import { CONFIG_SECTION } from '../constant/config/object';
import { configurationChanged } from '../configuration/shared/update';

export {
    configChanged,
    changeWorkspaceFolders
};

const configChanged: D.Event.Tp.DecorationEventFunc = ({ configInfo, decorationState }): vscode.Disposable => {
    return vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
        if (event) {
            if (configInfo.updateCaller === undefined) {                                // if not preset triggered event
                const section = Object.keys(CONFIG_SECTION).find(section => {           // find section to update
                    return event.affectsConfiguration(configInfo.name + '.' + section);
                });
                section && configurationChanged(configInfo, section);                   // only changed section update
            }
        }
    });
};


const changeWorkspaceFolders: D.Event.Tp.DecorationEventFunc = (context): vscode.Disposable => {
    return vscode.workspace.onDidChangeWorkspaceFolders((event: vscode.WorkspaceFoldersChangeEvent) => {
        // console.log('event.added', event.added);
    });
};


// const changeWorkspaceFolders = () => {

    vscode.workspace.onDidChangeWorkspaceFolders;
    // vscode.window.
    

    // const t = vscode.window.createTerminal('git', );
    // t.


    // terminal.sendText('git rev-parse --abbrev-ref HEAD', true);
    // const scm = vscode.scm.createSourceControl('git', 'workspace');


    // try {
    //     const branchName = await vscode.commands.executeCommand('git.getBranch');
    //     vscode.window.showInformationMessage(`현재 Git 브랜치: ${branchName}`);
    // } catch (error) {
    //     vscode.window.showErrorMessage('Git 브랜치 정보를 가져오는 데 실패했습니다.');
    // }
// };
//     return vscode.debug.onDidStartDebugSession((e: vscode.DebugSession) => {
//         console.log(e);
//     });

//     return vscode.window.onDidStartTerminalShellExecution((e: vscode.TerminalShellExecutionStartEvent) => {
//         console.log(e);
//     });

//     return vscode.window.onDidChangeTerminalState((e: vscode.Terminal) => {
//         console.log(e);
//     });

//     return vscode.window.onDidChangeTerminalShellIntegration((e: vscode.TerminalShellIntegrationChangeEvent) => {
//         console.log(e);
//     });

//     return vscode.window.onDidChangeActiveTerminal((e: vscode.Terminal | undefined) => {
//         console.log(e);
//     });
//     // vscode.window.registerFileDecorationProvider((prov))
//     return vscode.tasks.onDidStartTask((e: vscode.TaskStartEvent) => {
//         console.log(e);
//     });

//     return vscode.tasks.onDidStartTaskProcess((e: vscode.TaskProcessStartEvent) => {
//         console.log('onDidStartTaskProcess');
//         // vscode.tasks.fetchTasks();
//     });
