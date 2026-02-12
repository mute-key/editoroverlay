//::==============================================================================
//::  [ RUNTIME CONSTANT ENUM ]
//::==============================================================================

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
    WIN_ICON_BASE = "resource\\icon\\base",
    WIN_ICON_ROOT = "resource\\icon\\colored",
    WSL_ICON_BASE = "resource\\icon\\base",
    WSL_ICON_ROOT = "resource\\icon\\colored",
    POSIX_ICON_BASE = "resource/icon/base",
    POSIX_ICON_ROOT = "resource/icon/colored"
}

export const enum SCM_SVG_ICON_PATH {
    SVG_BASE = "git-icon-base.svg",
    SVG_ACTIVE = "git-icon-active.svg",
    SVG_INACTIVE = "git-icon-inactive.svg",
    SVG_CONFLICT = "git-icon-conflict.svg",
    SVG_NEW = "git-icon-new.svg",
    SVG_UP_TO_DATE = "git-icon-up-to-date.svg",
    SVG_EXTERNAL = "workspace-external.svg",
    SVG_NO_REPOSITORY = "workspace-no-repository.svg",
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

// export const enum BRANCH_ADDITIONAL_INFO {
//     ACTIVE = " #up-to-date",
//     INACTIVE = " #ignored-path|up-to-date",
//     IGNORED = " #ignored-path",
// }

export const enum LINE_END {
    CRLF = "\r\n",
    LF = "\n",
}