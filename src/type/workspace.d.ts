import { CURRENT_REPOSITORY } from 'src/store/state';
import * as vscode from 'vscode';

export type {
    Intf,
    Tp
};

declare namespace Intf {

    interface WorkspaceState {
        os?: string,
        dirDivider?: string,
        workspacePath?: string,
        crossOSWorkspace: boolean,
        lineBreak?: RegExp,
        pathSplit?: RegExp,
        repository: Map<string, typeof CURRENT_REPOSITORY>,
        excludeRepoSearch: string[],
    }

    interface RepositoryState {
        uri?: vscode.Uri,
        currentBranch?: string
    }
}

declare namespace Tp {

}


