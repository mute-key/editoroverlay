// @ts-nocheck

/**
 * ahhhhh
 */

import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as Shell from 'node-powershell';

export {
    nixExec,
    winExec,
};

const nixExec = async (context: vscode.ExtensionContext) => {
    
    console.log(vscode.workspace.workspaceFolders);


    // cd ${context.asAbsolutePath}
    // cp.exec(`cd ${context.asAbsolutePath}`);
    // const process_name = process.execPath.substring(process.execPath.lastIndexOf('/') + 1);
    // const processIds = cp.execSync(`pgrep ${process_name}`).toString().split('\n');
    // processIds.pop();

    // const branch = new Promise((resolve, reject) => {
    //     cp.exec(`cd ${context.asAbsolutePath}`, (error, stdout, stderr) => {
    //         if (error) {
    //             reject(error);
    //         }
    //         resolve(stdout);
    //     });
    // }) as Promise<string>;

    // console.log(branch);
    // return branch;
};

const winExec = async (context: vscode.ExtensionContext): Promise<string> => {

    const ps = new Shell({
        executionPolicy: 'RemoteSigned',
        noProfile: true,
    });

    context.subscriptions.push(ps);
    const currentBranch = await ps.addCommand('git branch --show-current');
    console.log(currentBranch);
    return currentBranch;
};



// export async function activate(context: vscode.ExtensionContext) {
//     let disposable = vscode.commands.registerCommand('myExtension.runShellCommand', async () => {
//         const cmd = 'echo "Hello, VS Code from ES6!"';
//         vscode.window.showInformationMessage(`셸 명령어 실행 중: "${cmd}"`);

//         try {
//             // async/await를 사용하여 명령어 실행 및 출력 받기
//             const output = await execShellCommand(cmd);

//             // VS Code 알림창에 결과 표시
//             vscode.window.showInformationMessage(`명령어 출력: ${output.trim()}`);
//         } catch (e) {
//             vscode.window.showErrorMessage(`명령어 실행 실패: ${e.message}`);
//         }
//     });

//     context.subscriptions.push(disposable);
// }