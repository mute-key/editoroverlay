import type * as D from '../../type/type';

import * as vscode from 'vscode';
import cp from 'child_process';
import { CURRENT_REPOSITORY, WORKSPACE_STATE } from '../../store/state';
import { WORKSPACE_OS } from '../../constant/config/enum';
import { fsLinuxSplit, fsWinSplit, LF, CRLF } from '../../collection/regex';
import { DECORATION_OPTION_AFTER_CONFIG, DECORATION_OPTION_CONFIG } from '../../constant/config/object';
import { contentTextGetter, setGetterProp } from '../selection/multiCursor/renderOption';
import { createCursorRangeLastLine } from '../range';

export {
    setWorkspaceSystem,
    scmOverlay,
    onScmUpdate,
    initScm
};

const workspaceState = WORKSPACE_STATE as D.Workspace.Intf.WorkspaceState;

const currentRepository = CURRENT_REPOSITORY as D.Workspace.Intf.RepositoryState;

const scmStyle: Record<string, string> = {
    transparency: "c7"
};

const repoCurrentBranch = (path: string): string => cp.execSync('cd ' + path + ' && git branch --show-current').toString().replaceAll(workspaceState.lineBreak as RegExp, '');

const concatinateDivider = (path: string): string => workspaceState.dirDivider + path;

const filterEmptyPath = (path: string): boolean => path.indexOf(workspaceState.workspacePath as string) !== -1;

const accumulateDirStack = (pathArray: string[], path: string, idx: number): string[] => {
    const previousDir = pathArray[idx - 1] === workspaceState.dirDivider ? '' : pathArray[idx - 1];
    pathArray.push(idx === 0 ? path : previousDir + path);
    return pathArray;
};

const isRepository = (path: string, uri: vscode.Uri) => (entry: [string, vscode.FileType]): void => {
    if (entry[0] === '.git') {
        workspaceState.repository.set(path, {
            uri: uri,
            currentBranch: undefined
        });
    }
};

const setRepositoryPathOfPath = async (path: string): Promise<void> => {
    const workspaceUri = vscode.Uri.file(path);
    if ((await vscode.workspace.fs.stat(workspaceUri)).type !== vscode.FileType.Directory) {
        return;
    }
    const dir = await vscode.workspace.fs.readDirectory(workspaceUri);
    dir.forEach(isRepository(path, workspaceUri));
};

const setRepositoryOfUri = (uri: vscode.Uri): void => uri.fsPath
    .split(workspaceState.pathSplit as RegExp)
    .map(concatinateDivider)
    .reduce(accumulateDirStack, [] as string[])
    .filter(filterEmptyPath)
    .forEach(setRepositoryPathOfPath);

const setWorkspaceSystem = (): void => {

    setWorkspacePath();

    switch (process.platform) {
        case WORKSPACE_OS.WIN:
            workspaceState.os = WORKSPACE_OS.WIN;
            workspaceState.pathSplit = fsWinSplit;
            workspaceState.lineBreak = CRLF;
            workspaceState.dirDivider = '\\';
            break;
        case WORKSPACE_OS.LINUX || WORKSPACE_OS.MAC:
            workspaceState.os = WORKSPACE_OS.POSIX;
            workspaceState.pathSplit = fsLinuxSplit;
            workspaceState.dirDivider = '/';
            workspaceState.lineBreak = LF;
            break;
        default:
            break;
    }
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

const scmIcon = (): D.Decoration.Intf.RenderInstanceOption => {
    const renderOptionScmIcon = { ...DECORATION_OPTION_CONFIG } as D.Decoration.Intf.RenderInstanceOption;
    renderOptionScmIcon.after = { ...DECORATION_OPTION_AFTER_CONFIG } as D.Decoration.Intf.DecorationRenderOptionAfter;
    renderOptionScmIcon.after.contentText = "⌥";
    renderOptionScmIcon.after.color = "#ffffff" + scmStyle.transparency;
    renderOptionScmIcon.after.fontWeight = "bolder";
    renderOptionScmIcon.after.backgroundColor = "#f05133" + scmStyle.transparency;
    renderOptionScmIcon.after.textDecoration = ";margin-left:6px;font-size:12px;margin-top:2px;border-top-left-radius:1px;border-bottom-left-radius:1px;";
    return renderOptionScmIcon;
};

const scmBase = (): D.Decoration.Intf.RenderInstanceOption => {
    const renderOptionScmBase = { ...DECORATION_OPTION_CONFIG } as D.Decoration.Intf.RenderInstanceOption;
    renderOptionScmBase.after = { ...DECORATION_OPTION_AFTER_CONFIG } as D.Decoration.Intf.DecorationRenderOptionAfter;
    renderOptionScmBase.after.contentText = 'Not Found';
    renderOptionScmBase.after.color = "#777777" + scmStyle.transparency;
    renderOptionScmBase.after.fontWeight = "bolder";
    renderOptionScmBase.after.backgroundColor = "#2a2a2a" + scmStyle.transparency;
    renderOptionScmBase.after.textDecoration = ";font-size:12px;margin-top:2px;border-top-right-radius:1px;border-bottom-right-radius:1px;padding-left:6px;padding-right:6px;";
    setGetterProp(renderOptionScmBase.after, contentTextGetter, CurrentBranchDescriptor as PropertyDescriptor);
    return renderOptionScmBase;
};

const CurrentBranchDescriptor = Object.getOwnPropertyDescriptor(renderCurrentBranch, contentTextGetter);

const setWorkspacePath = (): void => {
    if (vscode.window.activeTextEditor && vscode.workspace.workspaceFolders) {
        const workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        workspaceState.workspacePath = workspacePath;
    }

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
const bindDecorationType = (setDecorations: vscode.TextEditor['setDecorations'], renderOption: D.Decoration.Intf.RenderOption[][]) => (decorationType: vscode.TextEditorDecorationType, idx: number): void => setDecorations(decorationType, renderOption[idx]);

const scmOverlay = (editor: vscode.TextEditor): void => {
    !currentRepository.currentBranch && initScm(editor.document.uri);
    scmRenderOptionRangeRef[0] = createCursorRangeLastLine(1)(editor); //editor.selection;
    scmDecorationTypes.forEach(bindDecorationType(editor.setDecorations, scmRenderOptions));
};

const initalRender = () => {
    console.log('initalRender');
    if (vscode.window.activeTextEditor) {
        scmOverlay(vscode.window.activeTextEditor);
    }
};

const scmStateUpdate = new vscode.EventEmitter<void>();

const onScmUpdate: vscode.Event<void> = scmStateUpdate.event;

const initScm = (uri: vscode.Uri): void => {
    if (!vscode.workspace.workspaceFolders) {
        return;
    }

    const workspace = vscode.workspace.getWorkspaceFolder(uri);
    if (workspace && !workspaceState.repository.get(workspace.uri.fsPath)) {
        setRepositoryOfUri(uri);
    }

    let repoIs;

    for (const [path, repo] of workspaceState.repository.entries()) {
        if (uri.fsPath.indexOf(path) !== -1) {
            repoIs = workspaceState.repository.get(path);
            // repoIs.currentBranch = repoCurrentBranch(path);
            currentRepository.currentBranch = repoCurrentBranch(path);
            currentRepository.uri = uri;
            scmStateUpdate.fire(initalRender());
        }
    }
};


