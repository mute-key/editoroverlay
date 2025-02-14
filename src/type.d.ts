/**
 * [type declarations]
 * 
 */
import * as vscode from 'vscode';

import { SELECTION_TYPE, DECORATION_TYPE_MASK } from './constant';

type DECORATION_TYPE_MASK_FIELD = number

type DecorationType = Record<string, vscode.TextEditorDecorationType[] | undefined>;

type DecorationInfoPropType = {
    key: string,
    mask: DECORATION_TYPE_MASK
}

type DecorationInfoType = {
    [SELECTION_TYPE.RESET]: DecorationInfoPropType
    [SELECTION_TYPE.CURSOR_ONLY]: DecorationInfoPropType
    [SELECTION_TYPE.SINGLE_LINE]: DecorationInfoPropType
    [SELECTION_TYPE.MULTI_LINE]: DecorationInfoPropType
    [SELECTION_TYPE.MULTI_CURSOR]: DecorationInfoPropType
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