import type * as D from '../../type/type';

import * as vscode from 'vscode';
import { DECORATION_OPTION_AFTER_CONFIG, DECORATION_OPTION_CONFIG, SCM_CONFIG } from '../../constant/config/object';
import { CURRENT_REPOSITORY, SCM_OVERLAY_REFERENCE, WORKSPACE_ENV_UTIL, WORKSPACE_STATE } from '../../store/state';
import { DIRECTORY_DELIMITER, ICON_TYPE, SCM_RESOURCE_PATH, URI_PATH_TYPE } from '../../constant/shared/enum';
import { WORKSPACE_OS } from '../../constant/shared/enum';
import { fsLinuxSplit, fsWinSplit, LF, CRLF } from '../../collection/regex';
import { createCursorRangeLineOfDelta } from '../range';
import { contentIconGetter, contentTextGetter, setGetterProp } from '../selection/multiCursor/renderOption';
import { brnachStatusCommand, currentBranchCommand, directoryList, gitStatus, isDirectoryCommand, scmbaseStyleObject, scmSVGStyleObject, scmGlyphStyleObject } from './misc';
import { spawnSync } from 'child_process';

export {
    initializeScm,
    renderScmOverlay,
    setScmBranch,
    initalRender,
    filterDirectory,
    isDirectoryWsl
};

declare namespace L {
    interface WorkspaceState {
        os?: string,
        isSourceControlled: boolean,
        crossOSWorkspace: boolean,
        repository: Map<string, RepositoryState>,
        workspacePath: string[],
        excludeRepoSearch: string[],
    }

    interface WorkspaceEnvUtil {
        extRoot?: string,
        uriPathProp?: string,
        dirDivider?: string,
        iconRoot?: string,
        lineBreak?: RegExp,
        pathSplit?: RegExp,
        directoryFunc: any
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

    interface OverlayReference {
        svgIcon?: vscode.Uri,
        range?: vscode.Range
    }
}

const configuration = SCM_CONFIG;

const state = WORKSPACE_STATE as L.WorkspaceState;

const envUtil = WORKSPACE_ENV_UTIL as L.WorkspaceEnvUtil;

const currentRepository = CURRENT_REPOSITORY as L.RepositoryState;

const svgIocns = [] as vscode.Uri[];

const scmIcon = { ...DECORATION_OPTION_CONFIG } as D.Decoration.Intf.RenderInstanceOption;

const scmBase = { ...DECORATION_OPTION_CONFIG } as D.Decoration.Intf.RenderInstanceOption;

const bindDecorationType = (setDecorations: vscode.TextEditor['setDecorations'], renderOption: D.Decoration.Intf.RenderOption[][]) => (decorationType: vscode.TextEditorDecorationType, idx: number): void => setDecorations(decorationType, renderOption[idx]);

const concatinateDivider = (path: string, idx: number): string => idx === 0 ? path : envUtil.dirDivider + path;

const setCurrentBranchState = (path: string): string | undefined => currentRepository.currentBranch = ':' + execCmd(currentBranchCommand[state.os as string](path))?.trim() + branchStatus(path);

const convertFolderToSysPath = (folder: vscode.WorkspaceFolder): string => convertUriToSysPath(folder.uri);

// @ts-expect-error, or it cause type-error although this works.
const convertUriToSysPath = (uri: vscode.Uri): string => uri[envUtil.uriPathProp];

const styleScmIconSVG = (): D.Decoration.Intf.RenderInstanceOption => {
    scmIcon.after = { ...DECORATION_OPTION_AFTER_CONFIG } as D.Decoration.Intf.DecorationRenderOptionAfter;
    scmIcon.after.textDecoration = scmSVGStyleObject.textDecoration;
    scmIcon.after.contentIconPath = scmReferenceObject.svgIcon;
    setGetterProp(scmIcon.after, contentIconGetter, scmDescriptor as PropertyDescriptor);
    return scmIcon;
};

const styleScmIconGlpyph = (): D.Decoration.Intf.RenderInstanceOption => {
    scmIcon.after = { ...DECORATION_OPTION_AFTER_CONFIG } as D.Decoration.Intf.DecorationRenderOptionAfter;
    scmIcon.after.contentText = scmGlyphStyleObject.contentText;
    scmIcon.after.color = scmGlyphStyleObject.color;
    scmIcon.after.fontWeight = scmGlyphStyleObject.fontWeight;
    scmIcon.after.backgroundColor = scmGlyphStyleObject.backgroundColor;
    scmIcon.after.textDecoration = scmGlyphStyleObject.textDecoration;
    return scmIcon;
};

const styleScmBase = (): D.Decoration.Intf.RenderInstanceOption => {
    scmBase.after = { ...DECORATION_OPTION_AFTER_CONFIG } as D.Decoration.Intf.DecorationRenderOptionAfter;
    scmBase.after.contentText = scmbaseStyleObject.contentText;
    scmBase.after.color = scmbaseStyleObject.color;
    scmBase.after.fontWeight = scmbaseStyleObject.fontWeight;
    scmBase.after.backgroundColor = scmbaseStyleObject.backgroundColor;
    scmBase.after.textDecoration = scmbaseStyleObject.textDecoration;
    setGetterProp(scmBase.after, contentTextGetter, CurrentBranchDescriptor as PropertyDescriptor);
    return scmBase;
};

const branchStatus = (path: string): string => {
    const output = execCmd(brnachStatusCommand[state.os as string](path));
    if (output) {
        if (output.trim().length > 0) {
            return gitStatus(output, envUtil.lineBreak as RegExp);
        } else {
            return ' (up-to-date)';
        }
    }
    return ' (up-to-date)';
};

const setRepository = (path: string, uri: undefined | vscode.Uri) => {
    state.isSourceControlled = true;
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

const setRepositoryOfUri = (uri: vscode.Uri | string) => {
    const path = typeof uri === 'string' ? uri : uri.fsPath;
    return path.split(envUtil.pathSplit as RegExp)
        .map(concatinateDivider)
        .reduce(accumulateDirStack, [] as string[])
        .filter(isWorkspacePath)
        .filter(envUtil.directoryFunc /** filterDirectory | isDirectoryWsl */);
};

const scmReferenceObject = SCM_OVERLAY_REFERENCE as L.OverlayReference;

const composeRenderOption = (contentText: any): D.Decoration.Intf.RenderOption => {
    return {
        get range() {
            return scmReferenceObject.range;
        },
        renderOptions: contentText
    };
};

const renderCurrentBranch = {
    get contentText(): string | undefined {
        return currentRepository.currentBranch;
    }
};

const renderSVGIcon = {
    get contentIconPath(): vscode.Uri {
        return scmReferenceObject.svgIcon as unknown as vscode.Uri;
    }
};

const scmRenderOptions = [] as D.Decoration.Intf.RenderOption[][];

const scmDecorationTypes = [] as vscode.TextEditorDecorationType[];

const CurrentBranchDescriptor = Object.getOwnPropertyDescriptor(renderCurrentBranch, contentTextGetter);

const scmDescriptor = Object.getOwnPropertyDescriptor(renderSVGIcon, contentIconGetter);

const prepareOverlayObjects = () => {
    if (scmDecorationTypes.length > 1) {
        scmDecorationTypes.forEach(decorationType => decorationType.dispose());
    }

    scmDecorationTypes.length = 0;
    scmDecorationTypes.push(vscode.window.createTextEditorDecorationType({}));
    scmDecorationTypes.push(vscode.window.createTextEditorDecorationType({}));

    scmRenderOptions.length = 0;
    scmRenderOptions.push([composeRenderOption(configuration.iconType === ICON_TYPE.SVG ? styleScmIconSVG() : styleScmIconGlpyph())]);
    scmRenderOptions.push([composeRenderOption(styleScmBase())]);
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
    scmReferenceObject.range = createCursorRangeLineOfDelta(1)(editor); //editor.selection;
    scmDecorationTypes.forEach(bindDecorationType(editor.setDecorations, scmRenderOptions));
};

const setStateObject = (description: D.Scm.Intf.StateDescription): void => {
    state.os = description.os;
    state.crossOSWorkspace = description.crossOSWorkspace;
    envUtil.pathSplit = description.pathSplit;
    envUtil.lineBreak = description.lineBreak;
    envUtil.dirDivider = description.dirDivider;
    envUtil.uriPathProp = description.uriPathProp;
    envUtil.directoryFunc = description.directoryFunc;
    envUtil.iconRoot = description.iconRoot;
};

/** win32 */
const win32OnlyState: D.Scm.Intf.StateDescription = {
    os: WORKSPACE_OS.WIN32,
    dirDivider: DIRECTORY_DELIMITER.WIN,
    uriPathProp: URI_PATH_TYPE.WINDOW,
    iconRoot: SCM_RESOURCE_PATH.WIN_ICON_ROOT,
    pathSplit: fsWinSplit,
    lineBreak: CRLF,
    crossOSWorkspace: false,
    directoryFunc: filterDirectory

};

/** win32 -> wsl */
const win32wslState: D.Scm.Intf.StateDescription = {
    os: WORKSPACE_OS.WSL,
    dirDivider: DIRECTORY_DELIMITER.POSIX,
    uriPathProp: URI_PATH_TYPE.WIN_TO_WSL,
    iconRoot: SCM_RESOURCE_PATH.WSL_ICON_ROOT,
    pathSplit: fsLinuxSplit,
    lineBreak: LF,
    crossOSWorkspace: true,
    directoryFunc: isDirectoryWsl
};

/** posix, linux, mac */
const posixOnlyState: D.Scm.Intf.StateDescription = {
    os: WORKSPACE_OS.POSIX,
    dirDivider: DIRECTORY_DELIMITER.POSIX,
    uriPathProp: URI_PATH_TYPE.POSIX,
    iconRoot: SCM_RESOURCE_PATH.POSIX_ICON_ROOT,
    pathSplit: fsLinuxSplit,
    lineBreak: LF,
    crossOSWorkspace: false,
    directoryFunc: filterDirectory
};

const getWorkspaceObject = (): undefined | D.Scm.Intf.StateDescription => {
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

const initializeScm = (context: vscode.ExtensionContext) => {
    
    const osDescription: undefined | D.Scm.Intf.StateDescription = getWorkspaceObject();

    if (!osDescription || !vscode.workspace.workspaceFolders) {
        return;
    }
    setStateObject(osDescription);
    prepareOverlayObjects();

    state.workspacePath = vscode.workspace.workspaceFolders.map(convertFolderToSysPath);

    envUtil.extRoot = convertUriToSysPath(context.extensionUri);

    if (configuration.iconType === ICON_TYPE.SVG) {
        const inactivPath = [envUtil.extRoot, envUtil.iconRoot, SCM_RESOURCE_PATH.SVG_INACTIVE].join(envUtil.dirDivider);
        const activPath = [envUtil.extRoot, envUtil.iconRoot, SCM_RESOURCE_PATH.SVG_ACTIVE].join(envUtil.dirDivider);
        svgIocns[0] = vscode.Uri.file(inactivPath);
        svgIocns[1] = vscode.Uri.file(activPath);
    }
};

/**
 * this function should be called just once when active editor is changed
 * or when git action command has been called.
 * 
 */
const setScmBranch = (editor: vscode.TextEditor) => {

    state.isSourceControlled = false;

    if (!state.workspacePath) {
        return;
    }

    const editorPath = convertUriToSysPath(editor.document.uri);

    if (state.workspacePath && state.workspacePath[0] !== undefined) {
        setRepositoryOfUri(editorPath);
    }
    
    scmReferenceObject.svgIcon = svgIocns[state.isSourceControlled ? 1 : 0];
};



