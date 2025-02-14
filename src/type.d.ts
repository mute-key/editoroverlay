import * as vscode from 'vscode';

import { DecorationTypeMask } from './cursor';

type DecorationType = Record<string, vscode.TextEditorDecorationType[] | undefined>;

type DecorationInfoPropType = {
    key: string,
    mask: DecorationTypeMask
}

type DecorationInfoType = {
    reset: DecorationInfoPropType
    cursorOnly: DecorationInfoPropType
    singleLine: DecorationInfoPropType
    multiLine: DecorationInfoPropType
    multiCursor: DecorationInfoPropType
}

type loadFunc = (context: {
    decorationList: DecorationType,
    decorationInfo: DecorationInfoPropType
}) => boolean;

type UnsetDecorationFunctionType = (decorationList: DecorationType, editor?: vscode.TextEditor) => (decorationInfo: DecorationInfoPropType) => boolean;

type UnsetFunctionType = (decorationInfo: DecorationInfoPropType) => boolean

type DecorationWithRangeType = {
    decoration: vscode.TextEditorDecorationType,
    range: vscode.Range[]
}

type DecorationContext = {
    editor: vscode.TextEditor;
    decorationList: DecorationType;
    decorationInfo: DecorationInfoPropType;
};

type setDecorationOnEditorFunc = (context: DecorationContext) => void;

type decorationCoordinatorFunc = (context: DecorationContext) => DecorationWithRangeType[] | undefined;

type AppliedDecorationType = {
    applied: DecorationInfoPropType | undefined
}