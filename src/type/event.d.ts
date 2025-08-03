import * as vscode from 'vscode';
import type * as Config from './configuration';
import type * as Highlight from './highlight';

export type {
    Intf,
    Tp
};

declare namespace Intf {
    interface EventContext {
        editor?: vscode.TextEditor
        configInfo: Config.Intf.ConfigReady
        decorationState: Highlight.Intf.DecorationState
    }
}

declare namespace Tp {
    type DecorationEventFunc = (context: Intf.EventContext) => vscode.Disposable
}



