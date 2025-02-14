/**
 * [config utilities]
 * 
 */
import * as vscode from 'vscode';

import { DECORATION_TYPE_MASK } from './constant';

const hasConfigChagned = (): boolean => {
    return false;
};

const createDecorationType = (
    isWholeLine: boolean,
    borderWidth: string,
    borderStyle: string,
    borderColor: string,
    borderRadius: string
): vscode.TextEditorDecorationType => {
    return vscode.window.createTextEditorDecorationType({
        isWholeLine: isWholeLine,
        borderWidth: borderWidth,
        borderStyle: `${borderStyle}`,
        borderColor: `${borderColor}`,
        borderRadius: borderRadius
    });
};

const createDecorationTypeBuilder = (decorationKindIs: DECORATION_TYPE_MASK): vscode.TextEditorDecorationType[] | undefined => {
    const config = vscode.workspace.getConfiguration("cursorlinehighlight");
    const borderWidth = config.get<string>("borderWidth", '2px');
    const borderColor = config.get<string>("borderColor", '#65EAB9');
    const borderStyle = config.get<string>("borderStyle", 'solid');
    let isWholeLine = false;
    let borderRadius = '';
    switch (decorationKindIs) {
        case DECORATION_TYPE_MASK.CURSOR_ONLY:
            isWholeLine = true;
            borderRadius = '0px';
            return [
                createDecorationType(isWholeLine, `0 0 ${borderWidth} 0`, borderStyle, borderColor, borderRadius)
            ];
        case DECORATION_TYPE_MASK.SINGLE_LINE:
            isWholeLine = false;
            borderRadius = '0px';
            return [
                createDecorationType(isWholeLine, `0 0 ${borderWidth} 0`, borderStyle, borderColor, borderRadius)
            ];
        case DECORATION_TYPE_MASK.MULTI_LINE:
            isWholeLine = true;
            borderRadius = '0px';
            return [
                createDecorationType(isWholeLine, `${borderWidth} 0 0 0`, borderStyle, borderColor, borderRadius),
                createDecorationType(isWholeLine, `0 0 ${borderWidth} 0`, borderStyle, borderColor, borderRadius)
            ];
        case DECORATION_TYPE_MASK.MULTI_CURSOR:
            isWholeLine = false;
            borderRadius = '0px';
            return [
                createDecorationType(isWholeLine, `${borderWidth} ${borderWidth} ${borderWidth} ${borderWidth}`, borderStyle, borderColor, borderRadius)
            ];
        default:
            break;
    }

    return;
};

export {
    hasConfigChagned,
    createDecorationTypeBuilder
};