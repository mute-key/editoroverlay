import type * as D from '../../type/type';

import * as vscode from 'vscode';
import * as hex from '../../constant/numeric/hexadecimal';
import ErrorHandler from '../../util/error';
import { SCM_CONFIG } from '../../constant/config/object';
import { CURRENT_EDITOR_SCM_STATE, SCM_OVERLAY_REFERENCE, WORKSPACE_ENV_UTIL, WORKSPACE_STATE } from '../../store/state';
import { BRANCH_ADDITIONAL_INFO, DIRECTORY_DELIMITER, ICON_TYPE, SCM_RESOURCE_PATH } from '../../constant/shared/enum';
import { WORKSPACE_OS } from '../../constant/shared/enum';
import { branchStatusCommand, currentBranchCommand, gitIgnoreCommand, checkLineEndings, spawnOptions, convertUriToSysPath, posixOnlyState, win32OnlyState, win32wslState, setGetterOfRenederOption } from './helper';
import { contentIconGetter, contentTextGetter, rangeGetter } from '../selection/multiCursor/renderOption';
import { spawn, SpawnSyncOptionsWithStringEncoding } from 'child_process';
import { createCursorRangeLineOfDelta } from '../range';
import { isString } from '../../util/util';
import { getUserSettingValue } from '../../configuration/shared/configuration';
import { setCreateDecorationTypeQueue } from '../editor';

export {
    initializeScm,
    renderScmOverlay,
    activeEditorScm,
    clearScmOverlay,
    resetEditorParsed,
    CurrentBranchDescriptor,
    crossOsWslUri,
    localUri,
    pathOverrideWsl,
    bindScmState
};

const configuration = SCM_CONFIG;

const state = WORKSPACE_STATE as D.Scm.Intf.WorkspaceState;

const envUtil = WORKSPACE_ENV_UTIL as D.Scm.Intf.WorkspaceEnvUtil;

const currentEditor = CURRENT_EDITOR_SCM_STATE as D.Scm.Intf.EditorState;

const bindDecorationType = (setDecorations: vscode.TextEditor['setDecorations'], renderOption: D.Decoration.Intf.RenderOption[][]) => (decorationType: vscode.TextEditorDecorationType, idx: number): void => setDecorations(decorationType, renderOption[idx]);

const concatinateDivider = (path: string, idx: number): string => idx === 0 ? path : envUtil.dirDivider + path;

const pathOverrideWsl = (path: string): string => [state.crossOS?.uncPath, path].filter(Boolean).join('');

/**
 * @postponed - function:  this can be used for ssh-remote but not yet to 
 * implement or enabled the features.
 */
// const sanitizedPath = (path: string, reject: (arg: string) => string) => {
//     if (state.os === WORKSPACE_OS.WSL && !safePathRegex.test(path)) {
//         vscode.window.showErrorMessage('wsl: path has invalid characters in directory names', path);
//         reject('wsl: path is invalid');
//     }
// };

/**
 * @postponed - function:  this can be used for ssh-remote but not yet 
 * to implement or enabled the features.
 */
// const swapPathStringLiteral = (array: string[], path: string) => {
//     return array.map(arg => {
//         if (typeof arg === 'string') {
//             return arg.replace(pathRegex, path);
//         }
//         return arg;
//     });
// };

const execShell = (path: string, commandInfo: D.Scm.Intf.ScmCommandObject): Promise<string> => {
    return new Promise((resolve, reject) => {

        const pathOverride = state.crossOS ? pathOverrideWsl(path) : path;

        const spwan = spawn(commandInfo.cmd, commandInfo.args, spawnOptions[state.os as string](pathOverride) as SpawnSyncOptionsWithStringEncoding);

        let stdoutData = '';
        let stderrData = '';

        spwan.stdout?.on('data', (data) => {
            stdoutData += data.toString();
        });

        spwan.stderr?.on('data', (data) => {
            stderrData += data.toString();
        });

        spwan.on('close', (code) => {
            if (code === 0) {
                resolve(stdoutData.trim());
            } else {
                const errorOutput = stderrData || `Command failed with exit code ${code}.`;
                reject(new Error(errorOutput.trim()));
            }
        });

        spwan.on('error', (err) => {
            reject(err);
        });
    });
};

const gitStatus = (output: string, lineBreak: RegExp): string => `* (${output.trim().split(lineBreak).length})`;

const branchStatusAsync = async (path: string, repositoryInfo: D.Scm.Intf.RepositoryInfo): Promise<string> => {
    const output = await execShell(path, branchStatusCommand[state.os as string]);
    if (isString(output)) {
        repositoryInfo.isModified = true;
        return gitStatus(output, checkLineEndings(output.trim()) as RegExp);
    }
    return '';
};

const gitIgnoredPathArrayAsync = async (path: string): Promise<string[]> => {
    const output = await execShell(path, gitIgnoreCommand[state.os as string]);
    if (isString(output)) {
        const res = output.trim().split(checkLineEndings(output.trim()) as RegExp).map(ignorePath => [path, ignorePath].join(envUtil.dirDivider).trim());
        return res;
    }
    return [];
};

const currentBranchAsync = async (path: string): Promise<string> => {
    return ':' + await execShell(path, currentBranchCommand[state.os as string]);
};

const setRepositoryAsync = async (path: string): Promise<void> => {

    state.isSourceControlled = true;

    const repositoryInfo: D.Scm.Intf.RepositoryInfo = {
        isModified: false,
        relativePath: path,
        ignored: await gitIgnoredPathArrayAsync(path),
        currentBranch: currentEditor.branchName
    };

    currentEditor.branchName = await currentBranchAsync(path);
    currentEditor.branchStatus = await branchStatusAsync(path, repositoryInfo);
    state.repository.set(path, repositoryInfo);
    await forceRender();
};

const isRepositoryAsync = (path: string) => async (entry: [string, vscode.FileType]): Promise<void> => {
    if (entry[0] === '.git') {
        await setRepositoryAsync(path);
    }
};

const localUri = async (path: string): Promise<vscode.Uri> => {
    return await vscode.Uri.file(path);
};

const crossOsWslUri = async (path: string): Promise<vscode.Uri> => {
    return await vscode.Uri.file(pathOverrideWsl(path));
};

/**
 * @postponed - function:  this can be used for ssh-remote but not 
 * yet to implement or enabled the features.
 */
// const remoteUri = async (path: string): Promise<vscode.Uri | undefined> => {
//     const remoteUri = await vscode.workspace.workspaceFolders?.filter(folder => folder.uri.path.indexOf(path) !== -1).map(folder => {
//         if (folder.uri) {
//             return folder.uri.scheme + '://' + folder.uri.authority;
//         }
//     });
//     if (remoteUri && remoteUri.length === 1) {
//         const uri = await vscode.Uri.parse(remoteUri[0] + path);
//         return uri;
//     }
//     return undefined;
// };

/**
 * 
 */
const isDirectoryAsync = async (path: string): Promise<void> => {
    const pathUri = await envUtil.directoryToUri(path); // localUri | crossOsWslUri | remoteUri (not being used yet) 

    if (pathUri) {
        const stat = await vscode.workspace.fs.stat(pathUri);
        if (stat.type !== vscode.FileType.Directory) {
            return;
        }

        const dir: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(pathUri);
        dir.forEach(await isRepositoryAsync(path));
    }
};

const workspacePathFilterCurr = (path: string) => (workspace: string): boolean => path.indexOf(workspace) !== -1;

const workspacePathOf = (path: string): undefined | string => {
    const workspacePathOf = state.workspacePath.filter(workspacePathFilterCurr(path));
    if (workspacePathOf.length === 1) {
        return workspacePathOf[0];
    }
    return undefined;
};

const isWorkspacePath = (path: string): boolean => {
    const isWorkspacePath = state.workspacePath.filter(workspacePathFilterCurr(path));
    return isWorkspacePath.length > 0;
};

const accumulateDirStack = (pathArray: string[], path: string, idx: number): string[] => {
    const previousDir = pathArray[idx - 1] === envUtil.dirDivider ? '' : pathArray[idx - 1];
    pathArray.push(idx === 0 ? path : previousDir + path);
    return pathArray;
};

const setRepositoryOfPath = (path: string): void => {
    path.split(envUtil.pathSplit as RegExp)
        .map(concatinateDivider)
        .reduce(accumulateDirStack, [] as string[])
        .filter(isWorkspacePath)
        .forEach(isDirectoryAsync);
};

const scmReferenceObject = { ...SCM_OVERLAY_REFERENCE } as D.Scm.Intf.OverlayReference;

const scmLoadingRenderOptions = [] as D.Decoration.Intf.RenderOption[][];

const scmRenderOptions = [] as D.Decoration.Intf.RenderOption[][];

const scmDecorationTypes = [] as vscode.TextEditorDecorationType[];

const renderOptionBuffer: Record<D.Numeric.Key.Hex, undefined | D.Decoration.Intf.RenderInstanceOption> = {
    [hex.scmIcon]: undefined,
    [hex.scmBase]: undefined,
    [hex.scmParsing]: undefined,
    [hex.scmExternal]: undefined,
};

/**
 * becuase every contentText of renderOptions will be differernt, and 
 * string being primitves, it would have been ideal to create render options 
 * based on contextText formation. 
 * 
 * hex.scmIcon: contentIconPath only which is Uri, no contentText.
 * hex.scmBase: would be string concatination of object references.
 * hex.scmParsing: is string literal, a primitive 
 * hex.scmExternal: is string literal, a primitive
 * 
 * it would be ideal to swap the references of pre-build styled object to an array 
 * object to build renderOption stack instead of mutation through reference objects.
 */
const decorationRenderOption: Record<D.Numeric.Key.Hex, D.Decoration.Intf.RenderOption[]> = {
    [hex.scmIcon]: [],
    [hex.scmBase]: [],
    [hex.scmParsing]: [],
    [hex.scmExternal]: [],
};

const svgIcons: Record<D.Numeric.Key.Hex, (undefined | vscode.Uri)> = {
    [hex.scmSVGActive]: undefined,
    [hex.scmSVGInactive]: undefined,
    [hex.scmSVGNotRepository]: undefined,
    [hex.scmSVGUnknown]: undefined,
};

const prepareOverlayObjects = (): void => {

    if (scmDecorationTypes.length > 1) {
        scmDecorationTypes.forEach(decorationType => decorationType.dispose());
        scmDecorationTypes.length = 0;
    }

    setCreateDecorationTypeQueue({
        name: 'scm',
        count: 2,
        reference: scmDecorationTypes
    });

    scmReferenceObject.svgIcon = svgIcons[hex.scmSVGActive];

    scmRenderOptions[0] = decorationRenderOption[hex.scmIcon];
    scmRenderOptions[1] = decorationRenderOption[hex.scmBase];
    scmLoadingRenderOptions[0] = decorationRenderOption[hex.scmIcon];
    scmLoadingRenderOptions[1] = decorationRenderOption[hex.scmParsing];
};

const unkwownParser = () => {
    currentEditor.parsed = true;
    scmReferenceObject.svgIcon = svgIcons[hex.scmSVGUnknown];
    scmRenderOptions[0] = decorationRenderOption[hex.scmIcon];
    scmRenderOptions[1] = decorationRenderOption[hex.scmExternal];
    renderScmOverlay(vscode.window.activeTextEditor as vscode.TextEditor);
};

const forceRender = async (): Promise<void> => {
    if (vscode.window.activeTextEditor) {
        // swap back to base references.
        scmRenderOptions[1] = decorationRenderOption[hex.scmBase];
        renderScmOverlay(vscode.window.activeTextEditor);
    }
};

/**
 * render as parsing, becuase it would take time to process the fsPath with existance
 * of repository, and check if the active editor is parsed, if not, call activeEditorScm
 * to parse to build metadata. with this method, activeEditorScm does not need to be 
 * called when vscode.window.onDidChangeActiveTextEditor, since this function will 
 * handle it all.
 * 
 * if, to parse the active editor agian, it would only need to change the boolean 
 * to trigger activeEditorScm.
 * 
 * the only thing that not satisfactory at the moment is that createCursorRangeLineOfDelta
 * is currying function maybe i can refactor it later.
 * 
 * @param editor 
 */
const renderScmOverlay = (editor: vscode.TextEditor): void => {
    scmReferenceObject.range = createCursorRangeLineOfDelta(configuration.overlayLinePosition)(editor);
    scmDecorationTypes.forEach(bindDecorationType(editor.setDecorations, currentEditor.parsed ? scmRenderOptions : scmLoadingRenderOptions));
    !currentEditor.parsed && activeEditorScm(editor.document.uri);
};

const setStateObject = (description: D.Scm.Intf.StateDescription): void => {
    state.os = description.os;
    state.crossOS = description.crossOS;
    envUtil.pathSplit = description.pathSplit;
    envUtil.lineBreak = description.lineBreak;
    envUtil.dirDivider = description.dirDivider;
    envUtil.uriPathProp = description.uriPathProp;
    envUtil.directoryToUri = description.directoryToUri;
    envUtil.iconRoot = description.iconRoot;
};

/**
 * @postponed - function:  this can be used for ssh-remote but not 
 * yet to implement or enable the features.
 */
// const remoteState: D.Scm.Intf.StateDescription = {
//     os: WORKSPACE_OS.WSL_UNC,
//     dirDivider: DIRECTORY_DELIMITER.WIN,
//     uriPathProp: URI_PATH_TYPE.REMOTEL,
//     iconRoot: SCM_RESOURCE_PATH.WSL_ICON_ROOT,
//     pathSplit: fsWinSplit,
//     lineBreak: lfRegex,
//     crossOSWorkspace: true,
//     directoryToUri: remoteUri,
// };

const uncPathEnabled = (wslHost: string): boolean => {
    const uncHosts = getUserSettingValue<string[]>('security', 'allowedUNCHosts', []);
    const isUNCallowed = !getUserSettingValue<boolean>('security', 'restrictUNCAccess', true); // reverse boolean

    let isAllowedUncHost = false;

    if (uncHosts.length > 0) {
        const filtered = uncHosts.filter(allowedHost => wslHost.indexOf(allowedHost) !== -1);
        isAllowedUncHost = filtered.length > 0;
    }

    let configurationName = [] as string[];

    if (!isAllowedUncHost) {
        configurationName.push('@id:security.restrictUNCAccess');
    }

    if (!isUNCallowed) {
        configurationName.push('@id:security.allowedUNCHosts');
    }

    if (configurationName.length > 0) {

        /**
         * i thought ErrorHandler class was terrible but it is somewhat usable.
         * still would need a bit of refactoring.
         */
        ErrorHandler.register(configurationName.join(' '), 'Please enable UNC path and add wsl to allowed host');
        ErrorHandler.notify(1500);
        return false;
    }

    return true;
};

/**
 * 
 * @returns e.g, \\wsl.localhost\Ubuntu-24.04
 */
const uncPathPaser = (): string | undefined =>
    vscode.workspace.workspaceFolders?.
        filter(folder =>
            folder.uri.authority.indexOf('wsl+') === 0 && folder.uri.scheme === 'vscode-remote').
        map((folder) => {
            const auth = folder.uri.authority.split('+');
            return [
                DIRECTORY_DELIMITER.WIN,
                DIRECTORY_DELIMITER.WIN,
                auth[0],
                '.localhost',
                DIRECTORY_DELIMITER.WIN,
                auth[1]
            ].join('');
        })[0];

const getWorkspaceObject = (): undefined | D.Scm.Intf.StateDescription => {

    // default, non-repository scm overlay. this should be the main control
    if (!vscode.workspace.workspaceFolders) {
        return;
    }

    if (process.platform === WORKSPACE_OS.WIN32 && vscode.env.remoteName === undefined) {
        return win32OnlyState;
    }

    // unc path setting, only process if editoroverlay.scmText.enabledWin32ToWsl is true
    if (process.platform === WORKSPACE_OS.WIN32 && vscode.env.remoteName === 'wsl' && configuration.enabledWin32ToWsl) {
        const workspaceUcPath = uncPathPaser(); // need to be in state,
        if (workspaceUcPath && uncPathEnabled(workspaceUcPath as string)) {
            win32wslState.crossOS = {
                uncPath: workspaceUcPath
            };
            return win32wslState;
        } else {
            // vscode.window.showErrorMessage('UNC path is not enabled.'); // add settings UI link
        }
    }

    if (process.platform === WORKSPACE_OS.LINUX || process.platform === WORKSPACE_OS.MAC) {
        return posixOnlyState;
    }
};

const convertFolderToSysPath = (folder: vscode.WorkspaceFolder): string => {
    return convertUriToSysPath(state.os as string, folder.uri);
};

const initializeScm = (context: vscode.ExtensionContext): void => {


    const osDescription: undefined | D.Scm.Intf.StateDescription = getWorkspaceObject();

    if (!osDescription) { return; }

    setStateObject(osDescription);

    if (!vscode.workspace.workspaceFolders) { return; }

    state.workspacePath = vscode.workspace.workspaceFolders.map(convertFolderToSysPath);

    envUtil.extRoot = convertUriToSysPath(state.os as string, context.extensionUri);

    if (configuration.iconType === ICON_TYPE.SVG) {
        const svgActive = [envUtil.extRoot, envUtil.iconRoot, SCM_RESOURCE_PATH.SVG_ACTIVE].join(envUtil.dirDivider);
        const svgIactive = [envUtil.extRoot, envUtil.iconRoot, SCM_RESOURCE_PATH.SVG_INACTIVE].join(envUtil.dirDivider);
        const notRepository = [envUtil.extRoot, envUtil.iconRoot, SCM_RESOURCE_PATH.SVG_NOT_REPOSITORY].join(envUtil.dirDivider);
        const external = [envUtil.extRoot, envUtil.iconRoot, SCM_RESOURCE_PATH.EXTERNAL].join(envUtil.dirDivider);
        svgIcons[hex.scmSVGActive] = vscode.Uri.file(svgActive);
        svgIcons[hex.scmSVGInactive] = vscode.Uri.file(svgIactive);
        svgIcons[hex.scmSVGNotRepository] = vscode.Uri.file(notRepository);
        svgIcons[hex.scmSVGUnknown] = vscode.Uri.file(external);
    }

    prepareOverlayObjects();
};

/**
 * this function should be called just once when active editor is changed.
 * 
 */
const activeEditorScm = (uri: vscode.Uri): void => {
    state.isSourceControlled = false;
    currentEditor.additionalStatus = '';

    if (!state.workspacePath || state.workspacePath.length === 0) {
        return;
    }

    const editorPath = convertUriToSysPath(state.os as string, uri);

    if (editorPath.indexOf(state.currentWorkspaceRoot as string) === -1) {
        state.currentWorkspaceRoot = undefined;
    }

    if (state.workspacePath.length > 0) {
        state.currentWorkspaceRoot = workspacePathOf(editorPath);
        setRepositoryOfPath(editorPath);
    }

    if (!state.currentWorkspaceRoot) {
        // return false and EOF, if parsed is true, 
        // currentEditor.parsed = true;
        unkwownParser();
        return;
    }

    scmOverlayDeocrator(editorPath);
};

const scmOverlayDeocrator = (path: string): boolean | void => {
    // get all list of repository as tuple array.
    for (const [repositoryPath, repositoryInfo] of state.repository.entries()) {
        // if current editor path is in repo
        if (path.indexOf(repositoryPath) === 0) {
            currentEditor.isActive = repositoryInfo.ignored.filter(ignorePath => path.indexOf(ignorePath) === 0).length === 0;
            !currentEditor.isActive && (currentEditor.additionalStatus = BRANCH_ADDITIONAL_INFO.IGNORED);
            !repositoryInfo.isModified && (currentEditor.additionalStatus = currentEditor.isActive ? BRANCH_ADDITIONAL_INFO.ACTIVE : BRANCH_ADDITIONAL_INFO.INACTIVE);
            scmReferenceObject.svgIcon = svgIcons[currentEditor.isActive ? hex.scmSVGActive : hex.scmSVGInactive];
            currentEditor.parsed = true;
            renderScmOverlay(vscode.window.activeTextEditor as vscode.TextEditor);
        }
    }
};

const resetEditorParsed = (): boolean => currentEditor.parsed = false;

const clearScmOverlay = (editor: vscode.TextEditor): void => scmDecorationTypes.forEach(bindDecorationType(editor.setDecorations, [[], []]));

const renderOptionRange = {
    get range() {
        return scmReferenceObject.range;
    }
};

const renderStatusOverlay = {
    get contentText(): string | undefined {
        return currentEditor.branchName as string + currentEditor.branchStatus as string + currentEditor.additionalStatus as string;
    }
};

const renderSVGIcon = {
    get contentIconPath(): vscode.Uri {
        return scmReferenceObject.svgIcon as unknown as vscode.Uri;
    }
};

const rangeDescriptor = Object.getOwnPropertyDescriptor(renderOptionRange, rangeGetter);

const CurrentBranchDescriptor = Object.getOwnPropertyDescriptor(renderStatusOverlay, contentTextGetter);

const scmSVGIconDescriptor = Object.getOwnPropertyDescriptor(renderSVGIcon, contentIconGetter);

const bindScmState = (): any => {
    return {
        renderOptionBuffer: renderOptionBuffer,
        renderOption: decorationRenderOption,
        getterDescription: {
            rangeAndContentText: {
                descriptor: rangeDescriptor,
                name: rangeGetter
            },
            svgIcon: {
                descriptor: scmSVGIconDescriptor,
                name: contentIconGetter
            },
            activeOverlay: {
                descriptor: CurrentBranchDescriptor,
                name: contentTextGetter
            }
        }
    };
};

