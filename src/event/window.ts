import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import { DECORATION_INFO } from '../constant/object';
import { isDecorationChanged, resetAllDecoration } from '../editor/decoration/decoration';
import { setDecorationOnEditor } from '../editor/decoration/decoration';
import { updateIndentOption } from '../editor/editor';
import { getSelectionType } from '../editor/range';
import { fixConfiguration } from '../util/error';
import { resetEditorDiagnosticStatistics } from '../diagnostic/diagnostic';

const windowStateChanged: Type.DecorationEventFunc = ({ configInfo, indentInfo, decorationState }): vscode.Disposable => {
    return vscode.window.onDidChangeWindowState((event: vscode.WindowState) => {
        if (event.focused) {

            // apply decoration to active editor.
            if (vscode.window.activeTextEditor) {
                setDecorationOnEditor({
                    editor: vscode.window.activeTextEditor,
                    configInfo: configInfo,
                    indentInfo: indentInfo,
                    decorationState: decorationState,
                    decorationInfo: DECORATION_INFO.CURSOR_ONLY
                });
            }
        } else {
            // should reset all decoration on all editors 
            resetAllDecoration(decorationState);
        }

        if (!event.focused && !event.active) {
            console.log('idling');
        }
    });
};

const activeEditorChanged: Type.DecorationEventFunc = ({ configInfo, indentInfo, decorationState }): vscode.Disposable => {
    return vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
        // console.log('onDidChangeActiveTextEditor');
        if (editor) {

            if (configInfo.configError.length > 0) {
                fixConfiguration(configInfo.configError);
            }

            updateIndentOption(editor, indentInfo as Type.IndentReadyType);

            resetAllDecoration(decorationState);

            resetEditorDiagnosticStatistics();

            setDecorationOnEditor({
                editor: editor,
                configInfo: configInfo,
                indentInfo: indentInfo,
                decorationState: decorationState,
                decorationInfo: DECORATION_INFO.CURSOR_ONLY
            });
        }
    });
};


const editorOptionChanged = ({ indentInfo }): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorOptions((event: vscode.TextEditorOptionsChangeEvent) => {
        if (event.textEditor) {
            updateIndentOption(event.textEditor, indentInfo);
        }
    });
};

const selectionChanged: Type.DecorationEventFunc = ({ configInfo, indentInfo, decorationState }): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorSelection((event: vscode.TextEditorSelectionChangeEvent) => {
        if (event.selections) {

            const decorationInfo: Type.DecorationInfoPropType | undefined = getSelectionType(event.textEditor);

            if (!decorationInfo) {
                return;
            }

            isDecorationChanged(event.textEditor, decorationState, decorationInfo);

            setDecorationOnEditor({
                editor: event.textEditor,
                configInfo: configInfo,
                indentInfo: indentInfo,
                decorationState: decorationState,
                decorationInfo: decorationInfo
            });
        }
    });
};

const visibleRangeChanged = (): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorVisibleRanges((event: vscode.TextEditorVisibleRangesChangeEvent) => {
        if (event) {
            
        }
    });
};

export {
    windowStateChanged,
    activeEditorChanged,
    editorOptionChanged,
    selectionChanged,
    visibleRangeChanged
};
