import type * as Config from './configuration';
import type * as Decoration from './decoration';

import * as vscode from 'vscode';

export type {
    Intf,
    Tp
};

declare namespace Intf {
    interface Context {
        editor?: vscode.TextEditor
        configInfo: Config.Intf.ConfigReady
        decorationState: Decoration.Intf.State
    }
}

declare namespace Tp {
    type DecorationEventFunc = (context: Intf.Context) => vscode.Disposable
}



