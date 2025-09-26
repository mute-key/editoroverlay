
import * as vscode from 'vscode';

export type {
    Intf
};

declare namespace Intf {
    interface SpawnSyncOption {
        cwd?: string
        encoding: string
        shell: undefined | boolean | string
    }

    interface ScmCommandObject {
        cmd: string
        args: (null | string)[]
    }

    interface WorkspaceState {
        os?: string
        isSourceControlled: boolean
        currentWorkspaceRoot?: string
        crossOSWorkspace: boolean
        repository: Map<string, RepositoryInfo>
        workspacePath: string[]
    }

    interface WorkspaceEnvUtil {
        extRoot?: string
        uriPathProp?: string
        dirDivider?: string
        iconRoot?: string
        lineBreak?: RegExp
        pathSplit?: RegExp
        directoryFunc: any
    }

    interface EditorState {
        uri?: vscode.Uri
        isActive: boolean
        branchName?: string
        branchStatus?: string
        additionalStatus?: string
    }

    interface RepositoryInfo {
        isModified: boolean
        relativePath?: string
        currentBranch?: string,
        ignored: string[]
        parsed?: string[]
    }

    interface CommandSet {
        branchCurrent: string
        branchStatus: string
        stashList: string
    }

    interface OverlayReference {
        svgIcon?: vscode.Uri
        range?: vscode.Range
    }

    interface StyleObject {
        contentIconPath?: vscode.Uri
        contentText?: string
        fontWeight?: string
        color?: string
        backgroundColor?: string
        textDecoration: string
    }

    /**
     * 0. os
     * 1. pathSplit
     * 2. lineBreak
     * 3. dirDivider
     * 4. uriPathProp
     * 5. crossOSWorkspace
     */
    interface StateDescription {
        os: string
        pathSplit: RegExp
        lineBreak: RegExp
        iconRoot: string
        dirDivider: string
        uriPathProp: string
        crossOSWorkspace: boolean
        directoryFunc: any
    }
}