import * as vscode from 'vscode';
import * as Type from '../../type/type';
import {
    DIAGONOSTIC_STATE
} from '../../constant/object';
import { DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY } from '../../constant/enum';
import { applyDecoration, createEditorDecorationType, disposeDecoration } from './decoration';

/**
 * 플레이스 홀더, 
 * 
 */
const diagnosticState = { ...DIAGONOSTIC_STATE } as Type.DiagonosticState;

const okContentTextState: (string | (() => any))[] = [];
const warnContentTextState: (string | (() => any))[] = [];
const errContentTextState: (string | (() => any))[] = [];

const diagnosticTextState: Type.DiagnosticTextStateType = {
    [DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY.OK_CONTENT_TEXT]: (diagnosticContentText: Type.DiagnosticContentTextType) => {
        okContentTextState.splice(0);
        okContentTextState.push(diagnosticContentText[DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY.OK_CONTENT_TEXT].contentText);
    },
    [DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY.WARNING_CONTENT_TEXT]: (diagnosticContentText: Type.DiagnosticContentTextType) => {
        warnContentTextState.splice(0);
        warnContentTextState.push(...diagnosticContentText[DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY.WARNING_CONTENT_TEXT].contentText);
    },
    [DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY.ERROR_CONTENT_TEXT]: (diagnosticContentText: Type.DiagnosticContentTextType) => {
        errContentTextState.splice(0);
        errContentTextState.push(...diagnosticContentText[DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY.ERROR_CONTENT_TEXT].contentText);
    },
};

const diagnosticOf: Type.DiagnosticOfType = {
    [DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY.OK_CONTENT_TEXT]: {

    },
    [DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY.WARNING_CONTENT_TEXT]: {
        src: () => diagnosticState.source,
        wrn: () => diagnosticState.severity.warning
    },
    [DIAGNOSTIC_CONTENT_TEXT_CONFIG_KEY.ERROR_CONTENT_TEXT]: {
        src: () => diagnosticState.source,
        err: () => diagnosticState.severity.error
    },
};

const updateDiagonosticStateSplit = {
    [vscode.DiagnosticSeverity.Hint]: () => {
        diagnosticState.severity.hint += 1;
    },
    [vscode.DiagnosticSeverity.Information]: () => {
        diagnosticState.severity.info += 1;
    },
    [vscode.DiagnosticSeverity.Warning]: () => {
        diagnosticState.severity.warning += 1;
    },
    [vscode.DiagnosticSeverity.Error]: () => {
        diagnosticState.severity.error += 1;
    }
};

const resetDiagonosticState = () => {
    diagnosticState.total = 0;
    diagnosticState.source = 0;
    diagnosticState.severity.hint = 0;
    diagnosticState.severity.info = 0;
    diagnosticState.severity.warning = 0;
    diagnosticState.severity.error = 0;
};

const updateDiagonosticState = () => {

    resetDiagonosticState();

    const diagnostics = vscode.languages.getDiagnostics();
    for (const [uri, diagnosticList] of diagnostics) {
        diagnosticState.source += 1;
        for (const diagnostic of diagnosticList) {
            console.log(uri);
            diagnosticState.total += 1;
            updateDiagonosticStateSplit[diagnostic.severity]();
        }
    }
};

const updateDiagonosticDecoration = (editor: vscode.TextEditor, decorationState: Type.DecorationStateType) => {
    // updateDiagonosticState(editor);

    const diagonosticInfoList: vscode.TextEditorDecorationType[] = [];

    const warnContentText = warnContentTextState.map((e) => typeof e === 'string' ? e : e()).join('');
    const errContentText = errContentTextState.map((e) => typeof e === 'string' ? e : e()).join('');

    const deco = vscode.window.createTextEditorDecorationType({
        outline: 'dashed red',
        color: '#ff0000',
        backgroundColor: '#ffffff',
        opacity: '0.7',
        isWholeLine: false,
        rangeBehavior: vscode.DecorationRangeBehavior.OpenOpen,
        before: {
            contentText: `${warnContentText}/${errContentText}\n\n`,
            color: '#ff0000',
            backgroundColor: '#ffffff',
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'none',
            margin: '0 0 0 20px',
        } as const
    });

    disposeDecoration(decorationState.diagnosticText);

    applyDecoration(editor, deco, [new vscode.Range(new vscode.Position(editor.selection.active.line + 1, 0), new vscode.Position(editor.selection.active.line + 1, 0))]);

    console.log(deco);

    decorationState.diagnosticText = [deco];

    
    // let length: number = statusTextInfo.length;

    // while (length--) {
    //     const editorDecoration = createEditorDecorationType(statusDecorationType(statusTextInfo[length], statusInfo.statusDecoration));
    //     applyDecoration(editor, editorDecoration, [statusTextInfo[length].range]);
    //     statusInfoList.push(editorDecoration);
    // }

    // disposeStatusInfo(decorationState);

    // decorationState.statusText = statusInfoList;

    // console.log('okContentTextState', okContentTextState.join(''));
    // console.log('warnContentTextState', warnContentTextState.map((e) => typeof e === 'string' ? e : e()).join(''));
    // console.log('errContentTextState', errContentTextState.map((e) => typeof e === 'string' ? e : e()).join(''));
};

const bindDiagnosticContentTextState = (type: string): Type.BindDiagnosticContentTextStateType => {
    return {
        diagnosticOf: diagnosticOf[type],
        diagnosticTextState: diagnosticTextState[type]
    };
};

export {
    updateDiagonosticState,
    updateDiagonosticDecoration,
    resetDiagonosticState,
    bindDiagnosticContentTextState
};