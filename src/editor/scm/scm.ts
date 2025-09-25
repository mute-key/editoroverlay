import type * as D from '../../type/type';

import * as vscode from 'vscode';
import { DECORATION_OPTION_AFTER_CONFIG, DECORATION_OPTION_CONFIG } from '../../constant/config/object';
import { CURRENT_REPOSITORY, WORKSPACE_ENV_UTIL, WORKSPACE_STATE } from '../../store/state';
import { DIRECTORY_DELIMITER, SCM_COMMAND_SET, URI_PATH_TYPE } from '../../constant/shared/enum';
import { WORKSPACE_OS } from '../../constant/config/enum';
import { fsLinuxSplit, fsWinSplit, LF, CRLF } from '../../collection/regex';
import { contentTextGetter, setGetterProp } from '../selection/multiCursor/renderOption';
import { createCursorRangeLastLine } from '../range';
import { spawnSync } from 'child_process';

export {
    initializeScm,
    renderScmOverlay,
    setScmBranch,
    initalRender
};

declare namespace L {

    interface WorkspaceState {
        os?: string,
        crossOSWorkspace: boolean,
        repository: Map<string, RepositoryState>,
        workspacePath: string[],
        excludeRepoSearch: string[],
    }

    interface WorkspaceEnvUtil {
        uriPathProp?: string,
        dirDivider?: string,
        lineBreak?: RegExp,
        pathSplit?: RegExp,
        directoryFunc: any
    }

    interface StyleObject {
        contentText: string
        fontWeight: string
        color: string
        backgroundColor: string
        textDecoration: string
    }

    interface RepositoryState {
        uri?: vscode.Uri,
        currentBranch?: string
    }

    interface CommandSet {
        branchCurrent: string,
        branchStatus: string,
        stashList: string
    }

    /**
     * 0. os
     * 1. pathSplit
     * 2. lineBreak
     * 3. dirDivider
     * 4. uriPathProp
     * 5. crossOSWorkspace
     */
    type StateObjectArray = [string, RegExp, RegExp, string, string, boolean, any];
}

const state = WORKSPACE_STATE as L.WorkspaceState;

const envUtil = WORKSPACE_ENV_UTIL as L.WorkspaceEnvUtil;

const currentRepository = CURRENT_REPOSITORY as L.RepositoryState;

const transparency: string = "C7";

const scmIconStyleObject: L.StyleObject = {
    contentText: "⌥",
    fontWeight: "bolder",
    color: "#FFFFFF" + transparency,
    backgroundColor: "#F05133" + transparency,
    textDecoration: ";margin-left:6px;font-size:12px;margin-top:2px;border-top-left-radius:1px;border-bottom-left-radius:1px;",
};

const scmbaseStyleObject: L.StyleObject = {
    contentText: 'Not Found',
    fontWeight: "bolder",
    color: "#777777" + transparency,
    backgroundColor: "#2A2A2A" + transparency,
    textDecoration: ";font-size:12px;margin-top:2px;border-top-right-radius:1px;border-bottom-right-radius:1px;padding-left:6px;padding-right:6px;",
};

const scmIcon = (): D.Decoration.Intf.RenderInstanceOption => {
    const renderOptionScmIcon = { ...DECORATION_OPTION_CONFIG } as D.Decoration.Intf.RenderInstanceOption;
    renderOptionScmIcon.after = { ...DECORATION_OPTION_AFTER_CONFIG } as D.Decoration.Intf.DecorationRenderOptionAfter;
    renderOptionScmIcon.after.contentText = scmIconStyleObject.contentText;
    renderOptionScmIcon.after.color = scmIconStyleObject.color;
    renderOptionScmIcon.after.fontWeight = scmIconStyleObject.fontWeight;
    renderOptionScmIcon.after.backgroundColor = scmIconStyleObject.backgroundColor;
    renderOptionScmIcon.after.textDecoration = scmIconStyleObject.textDecoration;
    return renderOptionScmIcon;
};

const scmBase = (): D.Decoration.Intf.RenderInstanceOption => {
    const renderOptionScmBase = { ...DECORATION_OPTION_CONFIG } as D.Decoration.Intf.RenderInstanceOption;
    renderOptionScmBase.after = { ...DECORATION_OPTION_AFTER_CONFIG } as D.Decoration.Intf.DecorationRenderOptionAfter;
    renderOptionScmBase.after.contentText = scmbaseStyleObject.contentText;
    renderOptionScmBase.after.color = scmbaseStyleObject.color;
    renderOptionScmBase.after.fontWeight = scmbaseStyleObject.fontWeight;
    renderOptionScmBase.after.backgroundColor = scmbaseStyleObject.backgroundColor;
    renderOptionScmBase.after.textDecoration = scmbaseStyleObject.textDecoration;
    setGetterProp(renderOptionScmBase.after, contentTextGetter, CurrentBranchDescriptor as PropertyDescriptor);
    return renderOptionScmBase;
};

const currentBranchCommand: Record<string, (path: string) => string> = {
    [WORKSPACE_OS.WIN32]: (path: string): string => `cd ${path} && ${SCM_COMMAND_SET.branchCurrent}`,
    [WORKSPACE_OS.POSIX]: (path: string): string => `cd ${path} && ${SCM_COMMAND_SET.branchCurrent}`,
    [WORKSPACE_OS.WSL]: (path: string): string => `wsl bash -c "cd ${path} && ${SCM_COMMAND_SET.branchCurrent}"`
};

const isDirectoryCommand: Record<string, (path: string) => string> = {
    // [WORKSPACE_OS.WIN32]:
    // [WORKSPACE_OS.POSIX]:
    [WORKSPACE_OS.WSL]: (path: string) => `wsl bash -c "[ -d ${path} ] && echo 1 || echo 0"`
};

const directoryList: Record<string, (path: string) => string> = {
    [WORKSPACE_OS.WSL]: (path: string) => `wsl bash -c "cd ${path} &&  ls -d */ .*/"`
};

const bindDecorationType = (setDecorations: vscode.TextEditor['setDecorations'], renderOption: D.Decoration.Intf.RenderOption[][]) => (decorationType: vscode.TextEditorDecorationType, idx: number): void => setDecorations(decorationType, renderOption[idx]);

const concatinateDivider = (path: string, idx: number): string => idx === 0 ? path : envUtil.dirDivider + path;

const setCurrentBranchState = (path: string): string | undefined => currentRepository.currentBranch = execCmd(currentBranchCommand[state.os as string](path));

const setRepository = (path: string, uri: undefined | vscode.Uri) => {
    state.repository.set(path, {
        uri: uri,
        currentBranch: setCurrentBranchState(path)
    });
};

const isRepository = (path: string, uri: vscode.Uri) => (entry: [string, vscode.FileType]): void => {
    if (entry[0] === '.git') {
        setRepository(path, uri);
        initalRender();
    }
};

const filterDirectory = async (path: string): Promise<void> => {
    const workspaceUri = vscode.Uri.file(path);
    if ((await vscode.workspace.fs.stat(workspaceUri)).type !== vscode.FileType.Directory) {
        return;
    }
    const dir: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(workspaceUri);
    dir.forEach(isRepository(path, workspaceUri));
};

const isDirectoryWsl = (path: string): boolean => {
    const cmd: string = isDirectoryCommand[state.os as string](path);
    const out: string | undefined = execCmd(cmd);
    const isDir: boolean = Number(out) ? true : false;
    if (isDir) {
        const dirList: string | undefined = execCmd(directoryList[state.os as string](path));
        if (dirList && dirList.indexOf('.git') !== -1) {
            setRepository(path, undefined);
        }
    }
    return isDir;
};

const isWorkspacePath = (path: string): boolean => {
    const isWorkspacePath = state.workspacePath?.filter(workspace => path.indexOf(workspace) !== -1);
    return isWorkspacePath.length > 0;
};

const accumulateDirStack = (pathArray: string[], path: string, idx: number): string[] => {
    const previousDir = pathArray[idx - 1] === envUtil.dirDivider ? '' : pathArray[idx - 1];
    pathArray.push(idx === 0 ? path : previousDir + path);
    return pathArray;
};

const setRepositoryOfUri = async (uri: vscode.Uri | string) => {
    const path = typeof uri === 'string' ? uri : uri.fsPath;
    return await path.split(envUtil.pathSplit as RegExp)
        .map(concatinateDivider)
        .reduce(accumulateDirStack, [] as string[])
        .filter(isWorkspacePath)
        .filter(envUtil.directoryFunc);
};

const scmRenderOptions = [] as D.Decoration.Intf.RenderOption[][];

const scmDecorationTypes = [] as vscode.TextEditorDecorationType[];

const scmRenderOptionRangeRef = [] as vscode.Range[];

const composeRenderOption = (contentText: any): D.Decoration.Intf.RenderOption => {
    return {
        get range() {
            return scmRenderOptionRangeRef[0];
        },
        renderOptions: contentText
    };
};

const renderCurrentBranch = {
    get contentText(): string | undefined {
        return currentRepository.currentBranch;
    }
};

const CurrentBranchDescriptor = Object.getOwnPropertyDescriptor(renderCurrentBranch, contentTextGetter);

const prepareOverlayObjects = () => {
    if (scmDecorationTypes.length > 1) {
        scmDecorationTypes.forEach(decorationType => decorationType.dispose());
    }

    scmDecorationTypes.length = 0;
    scmDecorationTypes.push(vscode.window.createTextEditorDecorationType({}));
    scmDecorationTypes.push(vscode.window.createTextEditorDecorationType({}));

    scmRenderOptions.length = 0;
    scmRenderOptions.push([composeRenderOption(scmIcon())]);
    scmRenderOptions.push([composeRenderOption(scmBase())]);
};

const execCmd = (cmd: string, args: string[] = []): (string | undefined) => {
    const spwan = spawnSync(cmd, args, { shell: true, encoding: 'utf8' });
    if (spwan.stdout) {
        return spwan.stdout.toString();
    }
    return;
};

const initalRender = (): void => {
    if (vscode.window.activeTextEditor) {
        renderScmOverlay(vscode.window.activeTextEditor);
    }
};

const renderScmOverlay = (editor: vscode.TextEditor): void => {
    scmRenderOptionRangeRef[0] = createCursorRangeLastLine(1)(editor); //editor.selection;
    scmDecorationTypes.forEach(bindDecorationType(editor.setDecorations, scmRenderOptions));
};

// const ifPathIsWorkspace = (uriPath: string) => (path: string): boolean => {
//     //@ts-ignore
//     return path.indexOf(uriPath) !== -1;
// };


/** win32 */
const win32OnlyState: L.StateObjectArray = [
    WORKSPACE_OS.WIN32,
    fsWinSplit,
    CRLF,
    DIRECTORY_DELIMITER.WIN,
    URI_PATH_TYPE.WINDOW,
    false,
    filterDirectory
];

/** win32 -> wsl */
const win32wslState: L.StateObjectArray = [
    WORKSPACE_OS.WSL,
    fsLinuxSplit,
    LF,
    DIRECTORY_DELIMITER.POSIX,
    URI_PATH_TYPE.WIN_TO_WSL,
    true,
    isDirectoryWsl
];

/** posix, linux, mac */
const posixOnlyState: L.StateObjectArray = [
    WORKSPACE_OS.POSIX,
    fsLinuxSplit,
    LF,
    DIRECTORY_DELIMITER.POSIX,
    URI_PATH_TYPE.POSIX,
    false,
    filterDirectory
];


const setStateObject = (array: L.StateObjectArray): void => {
    state.os = array[0];               // string
    envUtil.pathSplit = array[1];        // RegExp
    envUtil.lineBreak = array[2];        // RegExp
    envUtil.dirDivider = array[3];       // string
    envUtil.uriPathProp = array[4];      // string
    state.crossOSWorkspace = array[5]; // boolean
    envUtil.directoryFunc = array[6];
};

const getWorkspaceObject = (): undefined | L.StateObjectArray => {

    if (process.platform === WORKSPACE_OS.WIN32 && vscode.env.remoteName === undefined) {
        return win32OnlyState;
    }

    if (process.platform === WORKSPACE_OS.WIN32 && vscode.env.remoteName === 'wsl') {
        return win32wslState;
    }

    if (process.platform === WORKSPACE_OS.LINUX || process.platform === WORKSPACE_OS.MAC) {
        return posixOnlyState;
    }
};

const setWorkspacePath = (): void => {
    // @ts-expect-error, or it cause type-error although this works.
    state.workspacePath = vscode.workspace.workspaceFolders.map(uri => uri.uri[envUtil.uriPathProp]);
};

const initializeScm = () => {

    // osDescription will never be undefined, 
    const osDescription: undefined | L.StateObjectArray = getWorkspaceObject();

    if (!osDescription || !vscode.workspace.workspaceFolders) {
        return;
    }

    setStateObject(osDescription);
    prepareOverlayObjects();
    setWorkspacePath();
};


/**
 * this function should be called just once when active editor is changed
 * or when git action command has been called.
 * 
 */
const setScmBranch = (editor: vscode.TextEditor) => {

    if (!state.workspacePath) {
        return;
    }
    // @ts-ignore
    const editorPath = editor.document.uri[envUtil.uriPathProp];

    // @ts-ignore
    // state.workspacePath.filter(ifPathIsWorkspace());

    if (state.workspacePath && state.workspacePath[0] !== undefined) {
        setRepositoryOfUri(editorPath);
    }
};



