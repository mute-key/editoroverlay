
import * as vscode from 'vscode';

export type {
    Intf
};

declare namespace Intf {
    
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