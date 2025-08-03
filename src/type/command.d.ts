import * as vscode from 'vscode';

export type {
    Intf,
    Tp
};

declare namespace Intf {
    interface Context {
        package: vscode.ExtensionContext,
        configInfo: object
    }
}

declare namespace Tp {
    type DecorationEventFunc = (context: Intf.Context) => vscode.Disposable
}



