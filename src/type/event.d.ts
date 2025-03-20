import * as vscode from 'vscode';
import * as StatusType from './status.d';
import * as ConfigType from './configuration';
import * as DecorationType from './decoration.d';

type EventContext = {
    editor?: vscode.TextEditor
    indentInfo: StatusType.IndentType
    configInfo: ConfigType.ConfigInfoReadyType
    decorationState: DecorationType.DecorationStateType,
    decorationInfo?: DecorationType.DecorationInfoPropType;
}

type DecorationEventFunc = (context: EventContext) => vscode.Disposable