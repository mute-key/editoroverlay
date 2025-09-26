import type * as D from '../../type/type';

import * as vscode from 'vscode';
import { LINE_END, WORKSPACE_OS } from "../../constant/shared/enum";
import { safePathRegex, LF, CRLF } from '../../collection/regex';
import { SCM_COMMAND_SET } from "../../constant/shared/enum";

export {
    scmSVGStyleObject,
    scmGlyphStyleObject,
    scmbaseStyleObject,
    currentBranchCommand,
    branchStatusCommand,
    isDirectoryCommand,
    directoryList,
    checkLineEndings,
    spawnOptions,
    gitIgnore,
    pathSanitized,
};

// check if path string is safe to mount on shell
const pathSanitized = (path: string): boolean => safePathRegex.test(path);
    
const spawnOptions: Record<string, (path?: string) => D.Scm.Intf.SpawnSyncOption> = {
    [WORKSPACE_OS.WIN32]: (path?: string) => {
        return { cwd: path, encoding: 'utf8', shell: process.env.ComSpec };
    },
    [WORKSPACE_OS.WSL]: () => {
        return { encoding: 'utf8', shell: process.env.ComSpec };
    },
    [WORKSPACE_OS.POSIX]: () => {
        return { encoding: 'utf8', shell: true };
    },
};

const currentBranchCommand: Record<string, D.Scm.Intf.ScmCommandObject> = {
    [WORKSPACE_OS.WIN32]: {
        cmd: "git",
        args: ['branch', '--show-current']
    },
    [WORKSPACE_OS.WSL]: {
        cmd: "wsl",
        args: ['bash', '-c', `"cd {{PATH}} && ${SCM_COMMAND_SET.branchCurrent}"`]
    },
    [WORKSPACE_OS.POSIX]: {
        cmd: "cd",
        args: ['{{PATH}} &&', SCM_COMMAND_SET.branchCurrent]
    },
};

const branchStatusCommand: Record<string, D.Scm.Intf.ScmCommandObject> = {
    [WORKSPACE_OS.WIN32]: {
        cmd: "git",
        args: ['status', '-s']
    },
    [WORKSPACE_OS.WSL]: {
        cmd: "wsl",
        args: ['bash', '-c', `"cd {{PATH}} && ${SCM_COMMAND_SET.branchStatus}"`]
    },
    [WORKSPACE_OS.POSIX]: {
        cmd: "cd",
        args: ['{{PATH}} &&', SCM_COMMAND_SET.branchStatus]
    },
};

const isDirectoryCommand: Record<string, D.Scm.Intf.ScmCommandObject> = {
    [WORKSPACE_OS.WIN32]: {
        cmd: "if",
        args: ['exist {{PATH}} echo 1']
    },
    [WORKSPACE_OS.WSL]: {
        cmd: 'wsl',
        args: ['bash', '-c', '"[ -d {{PATH}} ] && echo 1 || echo 0"']
    },
    [WORKSPACE_OS.POSIX]: {
        cmd: "",
        args: ['[ -d {{PATH}} ]', '&&', 'echo 1 || echo 0']
    },
};

const directoryList: Record<string, D.Scm.Intf.ScmCommandObject> = {
    [WORKSPACE_OS.WIN32]: {
        cmd: "dir",
        args: ['/b', '/a-d']
    },
    [WORKSPACE_OS.WSL]: {
        cmd: "wsl",
        args: ['bash', '-c', '"cd {{PATH}} && ls -aF | grep /"']
    },
    [WORKSPACE_OS.POSIX]: {
        cmd: "cd",
        args: ['{{PATH}} && ls -aF | grep /']
    },
};

const gitIgnore: Record<string, D.Scm.Intf.ScmCommandObject> = {
    [WORKSPACE_OS.WIN32]: {
        cmd: "type",
        args: ['.gitignore']
    },
    [WORKSPACE_OS.WSL]: {
        cmd: "wsl",
        args: ['bash', '-c', '"cd {{PATH}} && cat .gitignore"']
    },
    [WORKSPACE_OS.POSIX]: {
        cmd: "cat",
        args: ['{{PATH}} && cat .gitignore']
    },
} as const;

const transparency: string = "C7";

const scmSVGStyleObject: D.Scm.Intf.StyleObject = {
    textDecoration: ";vertical-align:text-top;line-height:1.15;display:inline-block;margin-left:4px;font-size:12px;margin-top:2px;border-top-left-radius:2px;border-bottom-left-radius:2px;",
};

const scmGlyphStyleObject: D.Scm.Intf.StyleObject = {
    contentText: "⌥", // ⌥, ⎇, ⍻
    fontWeight: "bolder",
    color: "#FFFFFF" + transparency,
    backgroundColor: "#F05133" + transparency,
    textDecoration: ";margin-left:0px;font-size:12px;margin-top:2px;border-top-left-radius:2px;border-bottom-left-radius:2px;",
};

const scmbaseStyleObject: D.Scm.Intf.StyleObject = {
    contentText: 'Not Found',
    fontWeight: "bolder",
    color: "#777777" + transparency,
    // backgroundColor: "#323232" + transparency,
    textDecoration: ";font-size:12px;margin-top:2px;border-top-right-radius:2px;border-bottom-right-radius:2px;padding-left:2px;padding-right:2px;",
};

/**
 * need to refactor the return null/undefined
 * 
 * perhaps need generic error handling module/class 
 * 
 * @param output 
 * @returns 
 */
const checkLineEndings = (output: string): null | undefined | RegExp | string => {
    // check for crlf
    if (output.includes(LINE_END.CRLF)) {
        // check if both crlf and lf are present. this indicates mixed line endings.
        if (output.includes(LINE_END.LF) && !output.includes(LINE_END.CRLF)) {
            return undefined;
        }
        return CRLF;
    }

    // check for lf
    if (output.includes(LINE_END.LF)) {
        return LF;
    }

    return null;
};
