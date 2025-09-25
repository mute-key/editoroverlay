export const enum URI_PATH_TYPE {
    WINDOW = 'fsPath',
    POSIX = 'fsPath',
    WIN_TO_WSL = 'path',
}

export const enum DIRECTORY_DELIMITER {
    WIN = '\\',
    POSIX = '/',
}

export const enum SCM_COMMAND_SET {
    branchCurrent = "git branch --show-current",
    branchStatus = "git status -s",
    stashList = "git stash list"
};

export const enum SCM_IS_DERECTORY {
    wsl = ""
}