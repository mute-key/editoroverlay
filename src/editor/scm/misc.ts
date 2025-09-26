import type * as D from '../../type/type';

import * as vscode from 'vscode';
import { WORKSPACE_OS } from "../../constant/shared/enum";
import { SCM_COMMAND_SET } from "../../constant/shared/enum";

export {
    scmSVGStyleObject,
    scmGlyphStyleObject,
    scmbaseStyleObject,
    currentBranchCommand,
    brnachStatusCommand,
    isDirectoryCommand,
    directoryList,
    gitStatus
};

const currentBranchCommand: Record<string, (path: string) => string> = {
    [WORKSPACE_OS.WIN32]: (path: string): string => `cd ${path} && ${SCM_COMMAND_SET.branchCurrent}`,
    [WORKSPACE_OS.POSIX]: (path: string): string => `cd ${path} && ${SCM_COMMAND_SET.branchCurrent}`,
    [WORKSPACE_OS.WSL]: (path: string): string => `wsl bash -c "cd ${path} && ${SCM_COMMAND_SET.branchCurrent}"`
};

const brnachStatusCommand: Record<string, (path: string) => string> = {
    [WORKSPACE_OS.WIN32]: (path: string): string => `cd ${path} && ${SCM_COMMAND_SET.branchStatus}`,
    [WORKSPACE_OS.POSIX]: (path: string): string => `cd ${path} && ${SCM_COMMAND_SET.branchStatus}`,
    [WORKSPACE_OS.WSL]: (path: string): string => `wsl bash -c "cd ${path} && ${SCM_COMMAND_SET.branchStatus}"`
};

const isDirectoryCommand: Record<string, (path: string) => string> = {
    // [WORKSPACE_OS.WIN32]:
    // [WORKSPACE_OS.POSIX]:
    [WORKSPACE_OS.WSL]: (path: string) => `wsl bash -c "[ -d ${path} ] && echo 1 || echo 0"`
};

const directoryList: Record<string, (path: string) => string> = {
    [WORKSPACE_OS.WSL]: (path: string) => `wsl bash -c "cd ${path} &&  ls -d */ .*/"`
};

const gitStatus = (output: string, lineBreak: RegExp): string => `* (${output.trim().split(lineBreak).length})`;

const transparency: string = "C7";

// ⌥, ⎇, ⍻
const svg = vscode.Uri.file('C:\\workbench\\editoroverlay\\resource\\Git-Icon-1788C.svg');

const scmSVGStyleObject: D.Scm.Intf.StyleObject = { //: D.Scm.Intf.StyleObject
    // contentIconPath: "",
    textDecoration: ";vertical-align:text-top;line-height:1.15;display:inline-block;margin-left:4px;font-size:12px;margin-top:2px;border-top-left-radius:2px;border-bottom-left-radius:2px;",
};

const scmGlyphStyleObject: D.Scm.Intf.StyleObject = { //: D.Scm.Intf.StyleObject
    contentText: "⌥",
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
