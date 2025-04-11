import * as vscode from 'vscode';
import * as ConfigType from '../type/configuration';
import * as DecorationType from '../type/decoration';

type EventContext = {
    editor?: vscode.TextEditor
    configInfo: ConfigType.ConfigInfoReadyType
    decorationState: DecorationType.DecorationStateType
}

type DecorationEventFunc = (context: EventContext) => vscode.Disposable