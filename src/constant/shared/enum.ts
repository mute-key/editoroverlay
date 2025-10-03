export const enum URI_PATH_TYPE {
    WINDOW = 'fsPath',
    POSIX = 'fsPath',
    WSL = 'fsPath',
    REMOTE = "path"
}

export const enum DIRECTORY_DELIMITER {
    WIN = '\\',
    POSIX = '/',
}

export const enum SCM_IS_DERECTORY {
    wsl = ""
}

export const enum SCM_RESOURCE_PATH {
    WIN_ICON_ROOT = "resource\\scm\\icon",
    WSL_ICON_ROOT = "resource\\scm\\icon",
    POSIX_ICON_ROOT = "resource/scm/icon",
    SVG_INACTIVE = "Git-Icon-inactive.svg",
    SVG_ACTIVE = "Git-Icon-active.svg",
    SVG_NOT_REPOSITORY = "Git-Icon-not-repository.svg",
    EXTERNAL = "workspace-external.svg",
}

export const enum WORKSPACE_OS {
    WIN32 = "win32",
    WSL = "WSL",
    LINUX = "linux",
    MAC = "darwin",
    POSIX = "posix",
    REMOTE = "remote"
}

export const enum ICON_TYPE {
    SVG = "svg",
    GLYPH = "glyph",
}

export const enum BRANCH_ADDITIONAL_INFO {
    IGNORED = " #ignored-path",
    ACTIVE = " #up-to-date",
    INACTIVE = " #ignored-path|up-to-date",
}

export const enum LINE_END {
    CRLF = "\r\n",
    LF = "\n",
}