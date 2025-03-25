import * as vscode from 'vscode';
import * as StatusType from './status.d';
import * as ConfigType from './configuration';
import * as DecorationType from './decoration.d';

type EventContext = {
    editor?: vscode.TextEditor
    configInfo: ConfigType.ConfigInfoReadyType
    decorationState: DecorationType.DecorationStateType,
    renderGroup: DecorationType.RenderGroupSetProperty,
    __proto__: null
}

type DecorationEventFunc = (context: EventContext) => vscode.Disposable