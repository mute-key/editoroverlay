
import { FSWatcher, StatWatcher } from 'node:fs';
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
        args: string[]
    }

    interface WorkspaceState {
        os?: string
        isSourceControlled: boolean
        currentWorkspaceRoot?: string
        crossOS?: CrossOsWorkspaceInfo
        repository: Map<string, RepositoryInfo>
        workspacePath: string[]
    }
    interface CrossOsWorkspaceInfo {
        uncPath: string
    }

    interface WorkspaceEnvUtil {
        shell: any
        extRoot?: string
        uriPathProp?: string
        dirDivider?: string
        iconRoot?: string
        lineBreak?: RegExp
        pathSplit?: RegExp
        directoryToUri: any
    }

    interface EditorState {
        parsed: boolean,
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
        ignored?: string[]
        parsed?: string[]
        watcher?: FSWatcher | StatWatcher 
    }

    interface CommandSet {
        branchCurrent: string
        branchStatus: string
        stashList: string
    }

    interface OverlayReference {
        [key: string]: any
        svgIcon?: vscode.Uri
        range?: vscode.Range
        branchName: {
            contentText: string[],
            position: Record<string, number>
        }
        branchStatus: {
            contentText: string[],
            position: Record<string, number>
        }
    }

    interface Decoration {
        contentIconPath?: vscode.Uri
        contentText?: string
        fontWeight?: string
        color?: string
        backgroundColor?: string
        textDecoration?: string
    }

    /**
     * * os
     * * pathSplit
     * * lineBreak
     * * iconRoot
     * * dirDivider
     * * uriPathProp
     * * crossOSWorkspace
     * * directoryFunc
     * * uncPath
     * 
     */
    interface StateDescription {
        os: string
        pathSplit: RegExp
        lineBreak: RegExp
        iconRoot: string
        dirDivider: string
        uriPathProp: string
        crossOS?: CrossOsWorkspaceInfo
        directoryToUri: any
        remote?: string

    }
}