import * as vscode from 'vscode';
import * as ConfigType from '../type/configuration';
import * as Decoration from '../type/decoration';

type EventContext = {
    editor?: vscode.TextEditor
    configInfo: ConfigType.intf.ConfigReady
    decorationState: Decoration.type.DecorationStateType
}

type DecorationEventFunc = (context: EventContext) => vscode.Disposable