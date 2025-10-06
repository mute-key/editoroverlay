import type * as D from '../../type/type';

import * as vscode from 'vscode';
import * as hex from '../../constant/numeric/hexadecimal';
import * as regex from '../../collection/regex';
import ErrorHandler from '../../util/error';
import { CURRENT_EDITOR_SCM_STATE, SCM_OVERLAY_REFERENCE, WORKSPACE_ENV_UTIL, WORKSPACE_STATE } from '../../store/state';
import { DIRECTORY_DELIMITER, ICON_TYPE, SCM_RESOURCE_PATH } from '../../constant/shared/enum';
import { BRANCH_ADDITIONAL_INFO } from '../../constant/shared/object';
import { WORKSPACE_OS } from '../../constant/shared/enum';
import { SCM_CONFIG } from '../../constant/config/object';
import { branchStatusCommand, currentBranchCommand, gitIgnoreCommand, checkLineEndings, spawnOptions, convertUriToSysPath, posixOnlyState, win32OnlyState, win32wslState, errorCode } from './helper';
import { contentIconGetter, contentTextGetter, rangeGetter } from '../selection/multiCursor/renderOption';
import { spawn, SpawnSyncOptionsWithStringEncoding } from 'child_process';
import { setCreateDecorationTypeQueue } from '../editor';
import { createCursorRangeLineOfDelta } from '../range';
import { getUserSettingValue } from '../../configuration/shared/configuration';
import { ifFileInDirectory, isString } from '../../util/util';
import { unwatchFile, watch, watchFile } from 'node:fs';

export {
    initializeScm,
    renderScmOverlay,
    activeEditorScm,
    clearScmOverlay,
    scmParsed,
    CurrentBranchDescriptor,
    crossOsWslUri,
    localUri,
    pathOverrideWsl,
    bindScmState,
    contentRegexStack,
    clearScmTextState
};

const configuration = SCM_CONFIG;

const state = WORKSPACE_STATE as D.Scm.Intf.WorkspaceState;

const envUtil = WORKSPACE_ENV_UTIL as D.Scm.Intf.WorkspaceEnvUtil;

const currentEditor = CURRENT_EDITOR_SCM_STATE as D.Scm.Intf.EditorState;

const statusFixture = { ...BRANCH_ADDITIONAL_INFO };

const contentRegexStack: Record<D.Numeric.Key.Hex, Record<string, RegExp>> = {
    [hex.scmBase]: {
        bname: regex.branchName,
        ccount: regex.changeCount,
    }
};
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

const pathOverrideWsl = (path: string): string => [state.crossOS?.uncPath, path].filter(Boolean).join('');

/**
 * this function can move to helper.ts later, just not now.
 * 
 * all win32, wsl, posix will use cwd, no arbitary string swap in command or 
 * args will be put in. shell is false by default. every path wil be validated 
 * by the api that it is a directory as well as it also exist on runtime.
 * it is the least it should do.
 * 
 * win32 - use cmd, 
 * wsl - use powershell 
 * posix - use bash
 * 
 * @param path 
 * @param commandInfo 
 * @returns 
 */
const execShell = (path: string, commandInfo: D.Scm.Intf.ScmCommandObject, errorCode: string = ""): Promise<string> => {
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
                reject(errorOutput);
            }
        });

        spwan.on('error', (err) => {
            reject(err);
        });
    });
};

const gitStatus = (output: string, lineBreak: RegExp): string[] => output.trim().split(lineBreak);

const branchStatusAsync = async (path: string, repositoryInfo: D.Scm.Intf.RepositoryInfo): Promise<string[]> => {
    const output = await execShell(path, branchStatusCommand[state.os as string]).catch((err) => err);
    if (isString(output)) {
        repositoryInfo.isModified = true;
        return gitStatus(output, checkLineEndings(output.trim()) as RegExp).map(index => index.split(" ").slice(1).join(" "));
    }
    return [];
};

const gitIgnoredPathArrayAsync = async (path: string): Promise<string[]> => {
    const ignoreExist = await ifFileInDirectory(state.os === WORKSPACE_OS.WSL ? pathOverrideWsl(path) : path, '.gitignore');
    if (ignoreExist) {
        const output = await execShell(path, gitIgnoreCommand[state.os as string], errorCode.gitIgnore).catch(() => errorCode.gitIgnore);
        if (isString(output) && output !== errorCode.gitIgnore) {
            const res = output.trim().split(checkLineEndings(output.trim()) as RegExp).map(ignorePath => [path, ignorePath].join(envUtil.dirDivider).trim());
            return res;
        }
    }
    return [];
};

const currentBranchAsync = async (path: string): Promise<string> => {
    return await execShell(path, currentBranchCommand[state.os as string]).catch((err) => err);
};

const branchName = (branchName: string): void => {
    const pos = Number(scmReferenceObject.branchName.position.bname);
    const text = scmReferenceObject.branchName.contentText;
    text[pos] = branchName;
    currentEditor.branchName = text.join('');
};

const branchStatus = (ccount: string): void => {
    const pos = Number(scmReferenceObject.branchStatus.position.ccount);
    const text = scmReferenceObject.branchStatus.contentText;
    text[pos] = ccount;
    currentEditor.branchStatus = Number(ccount) ? text.join('') : "";
};

const additionalInfo = (repositoryInfo: D.Scm.Intf.RepositoryInfo): void => {
    currentEditor.isActive = repositoryInfo.ignored?.filter(ignorePath => vscode.window.activeTextEditor?.document.uri.fsPath.indexOf(ignorePath) === 0).length === 0;
    scmReferenceObject.svgIcon = svgIcons[currentEditor.isActive ? hex.scmSVGActive : hex.scmSVGInactive];
    !currentEditor.isActive && (currentEditor.additionalStatus = statusFixture.ignored);
    !repositoryInfo.isModified && (currentEditor.additionalStatus = currentEditor.isActive ? statusFixture.active : statusFixture.inactive);
};

// const collisionCheck = (status: string[], ignored: string[]) => {
//     console.log(status);
//     console.log(ignored);
// };

/**
 * 
 * reference object currentEditor, 
 * 
 * @param path 
 */
const setRepositoryAsync = async (path: string): Promise<void> => {

    state.isSourceControlled = true;

    const repositoryInfo: D.Scm.Intf.RepositoryInfo = {
        isModified: false,
        relativePath: path,
        ignored: await gitIgnoredPathArrayAsync(path),
        currentBranch: currentEditor.branchName
    };

    const [bname, status] = await Promise.all([
        currentBranchAsync(path),
        branchStatusAsync(path, repositoryInfo)
    ]);

    // collisionCheck(status, repositoryInfo.ignored as string[]);

    branchName(bname);
    branchStatus(status.length.toString());
    additionalInfo(repositoryInfo);
    repositoryWatcher(path, repositoryInfo);
    state.repository.set(path, repositoryInfo);
    await forceRender();
};

/**
 * personally, didn not want to bypass any of default configuration or
 * security settings of win/wsl or even permission stuff but wanted to 
 * solve the issue with which can possiblly be safe to run. 
 * 
 * fs:watch only works reliably on win32 or posix, non-cross-os workspace
 * for cross-os workspace, fs:watch does not work due to the complexity 
 * of the permission or security layers in placed, which i did not want
 * myself to fiddle with them but instead wanted to make a feature that 
 * comply and can cover cross-os workspace. 
 * 
 * therefore, had to split the function for native workspace and 
 * cross-os workspace. 
 * 
 * i could refactor this function to be more strucutured, just not now.
 * this works, but will need better event-end-handling mechanism.
 * 
 * @param path 
 * @param repoInfo 
 */
const repositoryWatcher = async (path: string, repoInfo: D.Scm.Intf.RepositoryInfo) => {
    if (state.os === WORKSPACE_OS.WSL) {
        const gitDir = [pathOverrideWsl(path), '.git'].join(envUtil.dirDivider);
        const isIndex = await ifFileInDirectory(gitDir, 'index');
        if (isIndex) {
            const repoIndex = [pathOverrideWsl(path), '.git', 'index'].join(envUtil.dirDivider); // 
            const wslWatchEventListner = (stat: any) => {
                if (stat) {
                    unwatchFile(repoIndex);
                    repoInfo.watcher?.unref();
                    repoInfo.watcher?.removeAllListeners();
                    repoInfo.watcher = watchFile(repoIndex, wslWatchEventListner);
                    forceRender(false);
                    vscode.window.showInformationMessage('Repository have been updated. please wait for overlay to reload metadata.');
                }
            };
            repoInfo.watcher = watchFile(repoIndex, wslWatchEventListner);
        } else {
            vscode.window.showInformationMessage('Repository have no index. Add files to repository when ready.');
        }
    } else {
        const repoDir = [path, '.git'].join(envUtil.dirDivider);
        repoInfo.watcher = watch(repoDir, { recursive: false });
        repoInfo.watcher.on('change', (eventType, filename) => {
            if (eventType === 'change') {
                // @ts-ignore
                repoInfo.watcher?.close();
                repoInfo.watcher = watch(repoDir, { recursive: false });
                forceRender(false);
            }
        });
    }
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
    // localUri | crossOsWslUri | remoteUri (not being used yet) 
    const pathUri = await envUtil.directoryToUri(path);

    if (pathUri) {
        const stat = await vscode.workspace.fs.stat(pathUri);
        if (stat.type !== vscode.FileType.Directory) {
            return;
        }

        const dir: [string, vscode.FileType][] = await vscode.workspace.fs.readDirectory(pathUri);
        // const ignoreExist = dir.filter(([name, type]) => name === '.gitignore' && type === 1).length === 1;
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

const concatinateDivider = (path: string, idx: number): string => idx === 0 ? path : envUtil.dirDivider + path;

/**
 * would need to find out how to 
 * 
 * @param path 
 */
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

    /**
     * this will add a queue to editor.ts, describing how many 
     * decorationType object should be created and set on 
     * which pointer-back reference object. 
     * 
     */
    setCreateDecorationTypeQueue({
        name: 'scm',
        count: 2,
        reference: scmDecorationTypes
    });

    scmReferenceObject.svgIcon = svgIcons[hex.scmSVGActive];
    buildRenderOptionInstance();
};

const buildRenderOptionInstance = () => {
    scmRenderOptions[0] = decorationRenderOption[hex.scmIcon];
    scmRenderOptions[1] = decorationRenderOption[hex.scmBase];
    scmLoadingRenderOptions[0] = decorationRenderOption[hex.scmIcon];
    scmLoadingRenderOptions[1] = decorationRenderOption[hex.scmParsing];
};

const unkwownParser = () => {
    scmParsed(true);
    scmReferenceObject.svgIcon = svgIcons[hex.scmSVGUnknown];
    scmRenderOptions[0] = decorationRenderOption[hex.scmIcon];
    scmRenderOptions[1] = decorationRenderOption[hex.scmExternal];
    renderScmOverlay(vscode.window.activeTextEditor as vscode.TextEditor);
};

const forceRender = async (prased: boolean = true): Promise<void> => {
    if (vscode.window.activeTextEditor) {
        // swap back to base references.
        scmParsed(prased);
        scmRenderOptions[1] = decorationRenderOption[hex.scmBase];
        renderScmOverlay(vscode.window.activeTextEditor);
    }
};

const bindDecorationType = (
    setDecorations: vscode.TextEditor['setDecorations'],
    renderOption: D.Decoration.Intf.RenderOption[][]
) => (
    decorationType: vscode.TextEditorDecorationType,
    idx: number
): void => setDecorations(decorationType, renderOption[idx]);

/**
 * this function will be the part of renderStack in editor.ts.
 * whenever the extension trying to render the overlay sets, so this function 
 * can be called too and it is how all other overlay rendering functions are 
 * controlled as well. activeEditorScm() can be called outside of this funciton, 
 * but it would means, calling renderGroupIs() will should call activeEditorScm() 
 * previously, everytime. the extension codebase will have multiple places that
 * calls renderGroupIs(), and if activeEditorScm() were to be called seperately, 
 * activeEditorScm() needs to be called same times as to call renderGroupIs(). 
 * this way, the codebase do not need to be concerned scm going desync with 
 * overlay itself because they will always run in sync on single function call.
 * also check @link scmParsed()
 *
 * render parsing overlay, becuase it would take time to process the fsPath with existance
 * of repository, and check if the active editor is parsed, if not, call activeEditorScm
 * to parse to build metadata. with this method, activeEditorScm does not need to be 
 * called when vscode.window.onDidChangeActiveTextEditor, since this function will 
 * and can handle all. 
 * 
 * if, to parse the active editor agian, it would only need to change the boolean 
 * to trigger activeEditorScm.
 * 
 * the only thing that not satisfactory at the moment is that createCursorRangeLineOfDelta
 * is currying function maybe i can refactor it later.
 * 
 * check for !currentEditor.parsed could come after the render functions but 
 * to parse as soon as, it will be checked 1st and call activeEditorScm, 
 * other overlay render functions do check previousKey to reset certainl decorations 
 * and this is in same category to have consistance.
 * 
 * @param editor 
 */
const renderScmOverlay = (editor: vscode.TextEditor): void => {
    !currentEditor.parsed && activeEditorScm(editor.document.uri);
    scmReferenceObject.range = createCursorRangeLineOfDelta(configuration.overlayLinePosition)(editor);
    scmDecorationTypes.forEach(bindDecorationType(editor.setDecorations, currentEditor.parsed ? scmRenderOptions : scmLoadingRenderOptions));
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
         * i thought ErrorHandler class was terrible but it is usable.
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
            scmParsed(true);
            additionalInfo(repositoryInfo);
            renderScmOverlay(vscode.window.activeTextEditor as vscode.TextEditor);
        }
    }
};

/**
 * this function sets if the last active editor, or editor to be active will 
 * need to run scm parsing again. if the current editor was parsed git repo 
 * but if it need to reload metadata of repository, calling this function with
 * false will do that, when overlays are rendered by renderGroupIs(). 
 * please read @link renderScmOverlay() annotations for more explantions.
 * 
 * @param parsed 
 * @returns 
 */
const scmParsed = (parsed: boolean): boolean => currentEditor.parsed = parsed; //false;

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

/**
 * object getter property descriptor for passing reference for 
 * with current range so the closure is intact when passed 
 * configuration codebase.
 * 
 */
const rangeDescriptor = Object.getOwnPropertyDescriptor(renderOptionRange, rangeGetter);

/**
 * object getter property descriptor for passing reference object 
 * with current range so the closure is intact when passed 
 * configuration codebase.
 * 
 */
const CurrentBranchDescriptor = Object.getOwnPropertyDescriptor(renderStatusOverlay, contentTextGetter);

/**
 * object getter property descriptor for passing reference object 
 * with current range so the closure is intact when passed 
 * configuration codebase.
 * 
 */
const scmSVGIconDescriptor = Object.getOwnPropertyDescriptor(renderSVGIcon, contentIconGetter);


const clearScmTextState = (): void => {
    for (const strKey of ['branchName', 'branchStatus']) {
        scmReferenceObject[strKey].contentText.length = 0;
        scmReferenceObject[strKey].position.length = 0;
    }
    buildRenderOptionInstance();
    scmParsed(false);
};

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
        },
        overlayTextFixture: statusFixture,
        referenceObject: scmReferenceObject
    };
};

