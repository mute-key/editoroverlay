/**
 * this modele is split module to reduce the size of the scm.ts module.
 * mostly, object literals or functions.
 */

import type * as D from '../../type/type';

import * as vscode from 'vscode';
import { DIRECTORY_DELIMITER, LINE_END, SCM_RESOURCE_PATH, URI_PATH_TYPE, WORKSPACE_OS } from "../../constant/shared/enum";
import { lfRegex, crlfRegex, fsWinSplit, fsLinuxSplit } from '../../collection/regex';
import { pathOverrideWsl } from './scm';

export {
    /** */
    currentBranchCommand,
    branchStatusCommand,
    gitIgnoreCommand,
    errorCode,
    /** */
    checkLineEndings,
    spawnOptions,
    convertUriToSysPath,
    setTextDecoration,
    setGetterOfRenederOption,
    /** */
    win32OnlyState,
    win32wslState,
    posixOnlyState,

};

const localUri = async (path: string): Promise<vscode.Uri> => {
    return await vscode.Uri.file(path);
};

const crossOsWslUri = async (path: string): Promise<vscode.Uri> => {
    return await vscode.Uri.file(pathOverrideWsl(path));
};

/** win32 */
const win32OnlyState: D.Scm.Intf.StateDescription = {
    os: WORKSPACE_OS.WIN32,
    dirDivider: DIRECTORY_DELIMITER.WIN,
    uriPathProp: URI_PATH_TYPE.WINDOW,
    iconRoot: SCM_RESOURCE_PATH.WIN_ICON_ROOT,
    pathSplit: fsWinSplit,
    lineBreak: crlfRegex,
    crossOS: undefined,
    directoryToUri: localUri
};

/** win32 -> wsl */
const win32wslState: D.Scm.Intf.StateDescription = {
    os: WORKSPACE_OS.WSL,
    dirDivider: DIRECTORY_DELIMITER.WIN,
    uriPathProp: URI_PATH_TYPE.WSL,
    iconRoot: SCM_RESOURCE_PATH.WSL_ICON_ROOT,
    pathSplit: fsWinSplit,
    lineBreak: lfRegex,
    crossOS: undefined,
    directoryToUri: crossOsWslUri,
};

/** posix, linux, mac */
const posixOnlyState: D.Scm.Intf.StateDescription = {
    os: WORKSPACE_OS.POSIX,
    dirDivider: DIRECTORY_DELIMITER.POSIX,
    uriPathProp: URI_PATH_TYPE.POSIX,
    iconRoot: SCM_RESOURCE_PATH.POSIX_ICON_ROOT,
    pathSplit: fsLinuxSplit,
    lineBreak: lfRegex,
    crossOS: undefined,
    directoryToUri: localUri
};

const convertUriToSysPath = (os: string, uri: vscode.Uri): string => {
    switch (os) {
        case WORKSPACE_OS.WIN32:
            return uri.fsPath;
        case WORKSPACE_OS.WSL:
            return uri.fsPath;
        case WORKSPACE_OS.POSIX:
            return uri.fsPath;
        // case WORKSPACE_OS.REMOTE:
        //     return uri.path;
        default:
            return uri.fsPath;
    }
};

/**
 * @postponed this can be used for ssh-remote 
 * but not yet to implement or enable the features.
 * 
 * - [WORKSPACE_OS.REMOTE] 
 */

const spawnOptions: Record<string, (path?: string) => D.Scm.Intf.SpawnSyncOption> = {
    [WORKSPACE_OS.WIN32]: (path?: string) => {
        return { cwd: path, encoding: 'utf8', shell: false }; // 이거 false 로 내일 바꿔보자
    },
    [WORKSPACE_OS.WSL]: (path?: string) => {
        return { cwd: path, encoding: 'utf8', shell: false };
    },
    [WORKSPACE_OS.POSIX]: (path?: string) => {
        return { cwd: path, encoding: 'utf8', shell: false };
    },
    // [WORKSPACE_OS.REMOTE]: (path?: string) => {
    //     return { encoding: 'utf8', shell: true };
    // },
};

const currentBranchCommand: Record<string, D.Scm.Intf.ScmCommandObject> = {
    [WORKSPACE_OS.WIN32]: {
        cmd: 'cmd.exe',
        args: ['/c', 'git', 'branch', '--show-current']
    },
    [WORKSPACE_OS.WSL]: {
        cmd: 'powershell.exe',
        args: ['wsl', 'bash', '-c', '"git branch --show-current"']
    },
    [WORKSPACE_OS.POSIX]: {
        cmd: 'git',
        args: ['branch', '--show-current']
    },
    // [WORKSPACE_OS.REMOTE]: {
    //     cmd: 'wsl',
    //     args: ['bash', '-c', '"cd {{PATH}} && git branch --show-current"']
    // },
};

const branchStatusCommand: Record<string, D.Scm.Intf.ScmCommandObject> = {
    [WORKSPACE_OS.WIN32]: {
        cmd: 'cmd.exe',
        args: ['/c', 'git', 'status', '-s']
    },
    [WORKSPACE_OS.WSL]: {
        cmd: 'powershell.exe',
        args: ['wsl', 'bash', '-c', '"git status -s"']
    },
    [WORKSPACE_OS.POSIX]: {
        cmd: 'git',
        args: ['status', '-s']
    },
    // [WORKSPACE_OS.REMOTE]: {
    //     cmd: 'wsl',
    //     args: ['bash', '-c', '"cd {{PATH}} && git status -s"']
    // },
};

const gitIgnoreCommand: Record<string, D.Scm.Intf.ScmCommandObject> = {
    [WORKSPACE_OS.WIN32]: {
        cmd: 'cmd.exe',
        args: ['/c', 'type', '.gitignore']
    },
    [WORKSPACE_OS.WSL]: {
        cmd: 'powershell.exe',
        args: ['wsl', 'bash', '-c', '"cat .gitignore"']
    },
    [WORKSPACE_OS.POSIX]: {
        cmd: 'cat',
        args: ['.gitignore']
    },
    // [WORKSPACE_OS.REMOTE]: {
    //     cmd: 'wsl',
    //     args: ['bash', '-c', '"cd {{PATH}} && cat .gitignore"']
    // },
};

const setTextDecoration = (target: any, decorationDescription: any): void => {
    target.after.textDecoration = decorationDescription.textDecoration;
};

const setGetterProp = (target: object, getterName: string, getterDescriptor: PropertyDescriptor) => {
    Object.defineProperty(target, getterName, getterDescriptor);
};


const setGetterOfRenederOption = (target: any, getterName: string, propertyDescriptor: PropertyDescriptor) => {
    (getterName && propertyDescriptor) && setGetterProp(target.after, getterName, propertyDescriptor);
};

((objectArray) => {
    objectArray.forEach(Object.freeze);
})([
    spawnOptions,
    currentBranchCommand,
    branchStatusCommand,
    gitIgnoreCommand,
]);

const errorCode = {
    gitIgnore: "NOT_FOUND"
};

/**
 * need to refactor the return null/undefined
 * 
 * perhaps need generic error handling module/class 
 * 
 * @param output 
 * @returns 
 */
const checkLineEndings = (output: string): null | undefined | RegExp | string => {
    // check for crlf
    if (output.includes(LINE_END.CRLF)) {
        // check if both crlf and lf are present. this indicates mixed line endings.
        if (output.includes(LINE_END.LF) && !output.includes(LINE_END.CRLF)) {
            return undefined;
        }
        return crlfRegex;
    }

    // check for lf
    if (output.includes(LINE_END.LF)) {
        return lfRegex;
    }

    return null;
};
