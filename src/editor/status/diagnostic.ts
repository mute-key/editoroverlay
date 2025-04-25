import * as vscode from 'vscode';
import * as Type from '../../type/type';
import * as __0x from '../../constant/shared/numeric';
import * as __$ from '../../constant/shared/symbol';
import { createCursorRange } from '../range';
import { DIAGNOSTIC_CONTENT_TEXT, DIAGNOSTIC_GLYPH } from '../../constant/shared/object';
import { DECORATION_OPTION_CONFIG, DIAGNOSTIC_VISIBILITY_CONFIG } from '../../constant/config/object';
import { DIAGNOSTIC_CONTENT_TEXT_KEY } from '../../constant/config/enum';
import { updateDiagnostic } from '../../diagnostic/diagnostic';
import { resetDecoration } from '../editor';

const diagnosticContentText = {
    ...DIAGNOSTIC_CONTENT_TEXT
};

const lineGlyph = {
    ...DIAGNOSTIC_GLYPH
};

const diagnosticStatusBuffer = [] as (any | vscode.TextEditorDecorationType)[];

const composeRenderOption = (renderSignature: any, renderOptions: any[]) => {
    renderOptions.forEach(option => {
        if (typeof option.after.contentText === 'number' && Object.hasOwn(diagonosticReferenceTable, option.after.contentText)) {
            diagonosticReferenceTable[option.after.contentText] = option.after;
            diggnosticStateList.push(option.after.contentText);
        }

        diagnosticContentText[renderSignature].push([{
            get range() {
                return diagonosticReferenceTable.rangeReference;
            },
            renderOptions: option
        }]);
    });
};

const diagonosticReferenceTable = {
    rangeReference: undefined as any | vscode.Range,
    [__0x.editorWarningTotal]: undefined as any,
    [__0x.editorErrorTotal]: undefined as any,
    [__0x.workspaceWarningSource]: undefined as any,
    [__0x.workspaceWarningTotal]: undefined as any,
    [__0x.workspaceErrorSource]: undefined as any,
    [__0x.workspaceErrorTotal]: undefined as any,
};

const setDiagonosticTextbuffer = (length): void => {
    console.log(length);
    while (length--) {
        diagnosticStatusBuffer.push(vscode.window.createTextEditorDecorationType(decorationOptionBuffer));
    }
    console.log(diagnosticContentText);
};

const reloadContentText = (): void => {
    diagnosticStatusBuffer.forEach(decorationType => decorationType.dispose());
    diagnosticStatusBuffer.splice(0);
};

const diagnosticVisibility = { ...DIAGNOSTIC_VISIBILITY_CONFIG } as Type.DiagnosticVisibilityType;

const problemLineGlyph = (lineNumber: number[], line: number) => {
    const linePosition: any[] = [];
    let length = lineNumber.length;
    let up = false;
    let down = false;
    let equal = false;
    while (length--) {
        if (lineNumber[length] > line && !down) {
            down = true;
        } else if (lineNumber[length] < line && !up) {
            up = true;
        } else if (lineNumber[length] === line && !equal) {
            equal = true;
            down = false;
            up = false;
            break;
        }
        if (down && up) {
            break;
        }
    }
    linePosition.push(
        lineGlyph[__0x.openningBracket],
        equal ? lineGlyph[__0x.lineEqual] : "",
        up ? lineGlyph[__0x.lineUp] : "",
        down ? lineGlyph[__0x.lineDown] : "",
        lineGlyph[__0x.closingBracket]);
    return linePosition.join('');
};


const allOkOf = {
    allok: __0x.allOkHexKey
};

const problemOf = {
    editor: __0x.editorHexKey,
    workspace: __0x.workspaceHexKey
};

const notationOf = {
    pre: __$.prefixSymbol,
    post: __$.postfixSymbol
};

const diagnosticOf = {
    rangeFunction: createCursorRange,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_PROBLEM_CONTENT_TEXT]: problemOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_ALL_OK_CONTENT_TEXT]: allOkOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_ALL_CONTENT_TEXT]: notationOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_WORKSPACE_CONTENT_TEXT]: notationOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_EDITOR_CONTENT_TEXT]: notationOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_EDITOR_CONTENT_TEXT]: {
        ...notationOf,
        wrn: __0x.editorWarningTotal,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_EDITOR_CONTENT_TEXT]: {
        ...notationOf,
        err: __0x.editorErrorTotal,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_WORKSPACE_CONTENT_TEXT]: {
        ...notationOf,
        src: __0x.workspaceErrorSource,
        err: __0x.workspaceErrorTotal
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_WORKSPACE_CONTENT_TEXT]: {
        ...notationOf,
        src: __0x.workspaceWarningSource,
        wrn: __0x.workspaceWarningTotal,
    },
};

type DecorationRenderAfterOption = {
    contentText?: string | any,
    color?: string,
    backgroundColor?: string,
    fontWeight?: string,
    fontStyle?: string,
    textDecoration?: string,
    margin?: string
} & {}

type RenderOption = {
    isWholeLine?: boolean,
    rangeBehavior?: any,
    after: {
    } & DecorationRenderAfterOption
}

const decorationOptionBuffer: RenderOption = { ...DECORATION_OPTION_CONFIG };

const stateBuffer: (number | number[])[] = [0, 0, [], 0, [], 0, 0, 0, 0, 0];

const initializeStateBuffer = (digit: number) => {
    stateBuffer[0] = digit;
};

const diagnosticRenderSignature = (state: typeof stateBuffer): number => {
    const emask = (state[3] ? 1 << 1 : 0) | (state[5] ? 1 << 2 : 0);
    const wmask = (state[7] ? 1 << 1 : 0) | (state[9] ? 1 << 2 : 0);
    return (emask === 0 && wmask === 0) ? state[0] as number : ((emask ? emask << 5 : 1 << 5) | (wmask ? wmask << 2 : 1 << 2) | 0b10);
};

const refreshBuffer = () => {
    let idx = renderBuffer.diagnosticState.length;
    while (idx--) {
        stateBuffer[idx] = renderBuffer.diagnosticState[idx];
    }
};

const fnCollection: Record<number, any> = {
    [__0x.editorWarningTotal]: ({ state, line }) => String(state[3]) + problemLineGlyph(state[2], line),
    [__0x.editorErrorTotal]: ({ state, line }) => String(state[5]) + problemLineGlyph(state[4], line),
    [__0x.workspaceWarningSource]: ({ state }) => String(state[6]),
    [__0x.workspaceWarningTotal]: ({ state }) => String(state[7]),
    [__0x.workspaceErrorSource]: ({ state }) => String(state[8]),
    [__0x.workspaceErrorTotal]: ({ state }) => String(state[9])
};

const diggnosticStateList = [] as number[];

const updateDiagnosticState = (): void => {
    
    console.log('diagonosticReferenceTable', diagonosticReferenceTable);
    console.log('diggnosticStateList', diggnosticStateList);
    diggnosticStateList.forEach(hexKey => {
        diagonosticReferenceTable[hexKey].contentText = fnCollection[hexKey](renderBuffer.context);
    });
};

const renderBuffer = {
    signature: __0x.allOkOverride,
    diagnosticState: undefined as any,
    context: {
        line: 0,
        state: undefined as any
    }
};
const renderDiagnosticText = (setDecorations) => (options, idx: number) => {
    console.log('options', options);
    setDecorations(diagnosticStatusBuffer[idx], options);
};

const diagnosticInfo = (decorationState) => (editor: vscode.TextEditor): void => {

    if (decorationState.eventTrigger[0] === __0x.diagnosticChanged) {
        renderBuffer.diagnosticState = updateDiagnostic(editor.document.uri);
        refreshBuffer();
        updateDiagnosticState();
        renderBuffer.signature = diagnosticRenderSignature(stateBuffer);
    }
    
    diagonosticReferenceTable.rangeReference = diagnosticOf.rangeFunction(editor);
    renderBuffer.context.line = editor.selection.start.line;
    renderBuffer.context.state = stateBuffer;
    clearDiagnosticText(editor.setDecorations);
    diagnosticContentText[renderBuffer.signature].forEach(renderDiagnosticText(editor.setDecorations));
    decorationState.diagnosticSignature[0] = renderBuffer.signature;
};

const clearDiagnosticText = (setDecorations: vscode.TextEditor['setDecorations']): void => {
    diagnosticStatusBuffer.forEach(resetDecoration(setDecorations));
};



const bindDiagnosticContentTextState = () => {
    return {
        functionOf: diagnosticOf,
        textOf: {
            contentText: diagnosticContentText,
            glyphList: lineGlyph
        },
        configOf: diagnosticVisibility
    };
};

export {
    bindDiagnosticContentTextState,
    composeRenderOption,
    setDiagonosticTextbuffer,
    initializeStateBuffer,
    reloadContentText,
    clearDiagnosticText,
    diagnosticInfo,
};
