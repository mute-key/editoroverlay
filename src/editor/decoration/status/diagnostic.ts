import * as vscode from 'vscode';
import * as Type from '../../../type/type';
import { DIAGNOSTIC_CONTENT_TEXT, DIAGNOSTIC_EDITOR_CONTENT_TEXT_KEYSET, DIAGNOSTIC_VISIBILITY_CONFIG, DIAGNOSTIC_WORKSPACE_CONTENT_TEXT_KEYSET } from '../../../constant/object';
import { DIAGNOSTIC_BIOME, DIAGNOSTIC_CONTENT_TEXT_KEY, DIAGNOSTIC_CONTENT_TEXT_KIND } from '../../../constant/enum';
import { createCursorRange } from '../../range';

const diagnosticContentText = { ...DIAGNOSTIC_CONTENT_TEXT } as Type.DiagnosticContentTextType;

const diagnosticVisibility = { ...DIAGNOSTIC_VISIBILITY_CONFIG } as Type.DiagnosticVisibilityType;

const editorSym = Symbol('editor');
const workspaceSym = Symbol('workspace');
const allOkSym = Symbol('allOk');

const allOkDiagnosticOf = {
    allok: allOkSym,
};

const problemDiagnosticOf = {
    editor: editorSym,
    workspace: workspaceSym,
};

const notationDiagnosticOf = {
    pre: ({ placeholder }) => placeholder.prefix,
    post: ({ placeholder }) => placeholder.postfix,
};

const warningSourceDiagnosticOf = {
    src: ({ state }) => String(state.warning.source),
};

const warningCountDiagnosticOf = {
    wrn: ({ state }) => String(state.warning.total),
};

const errorSourceDiagnosticOf = {
    src: ({ state }) => String(state.error.source),
};

const errorCountDiagnosticOf = {
    err: ({ state }) => String(state.error.total)
};


const diagnosticOf: Type.DiagnosticOfType = {
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_PROBLEM_CONTENT_TEXT]: problemDiagnosticOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_ALL_OK_CONTENT_TEXT]: allOkDiagnosticOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_ALL_CONTENT_TEXT]: notationDiagnosticOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_WORKSPACE_CONTENT_TEXT]: notationDiagnosticOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_EDITOR_CONTENT_TEXT]: notationDiagnosticOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_WORKSPACE_CONTENT_TEXT]: {
        ...notationDiagnosticOf,
        ...warningSourceDiagnosticOf,
        ...warningCountDiagnosticOf,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_EDITOR_CONTENT_TEXT]: {
        ...notationDiagnosticOf,
        ...warningCountDiagnosticOf,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_WORKSPACE_CONTENT_TEXT]: {
        ...notationDiagnosticOf,
        ...errorSourceDiagnosticOf,
        ...errorCountDiagnosticOf
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_EDITOR_CONTENT_TEXT]: {
        ...notationDiagnosticOf,
        ...errorCountDiagnosticOf,
    },
};

const diagonosticMultiStyleDecoration = (diagnosticState, diagnosticContentTextIs: Type.DiagnosticContentTextStateType): Type.DecorationRenderOptionType[] => {
    if (diagnosticContentTextIs) {

        const context = {
            state: diagnosticState,
            placeholder: diagnosticContentTextIs.placeholder
        };

        return diagnosticContentTextIs.contentText.map(decorationOption => {
            if (typeof decorationOption.after.contentText !== 'string') {
                // const decorationOptionFunc = Object.assign({}, decorationOption);
                const decorationOptionFunc = {...decorationOption};
                decorationOptionFunc.after = { ...decorationOption.after };
                decorationOptionFunc.after.contentText = decorationOption.after.contentText(context);
                return decorationOptionFunc;
            }
            return decorationOption;
        });
    }
    return [];
};

const diagnosticKind = ({ state, contentText, keySet }) => {
    return {
        'ok': () => diagonosticMultiStyleDecoration(state, contentText[keySet[DIAGNOSTIC_CONTENT_TEXT_KIND.OK_CONTENT_TEXT]]),
        'warning': () => diagonosticMultiStyleDecoration(state, contentText[keySet[DIAGNOSTIC_CONTENT_TEXT_KIND.WARNING_CONTENT_TEXT]]),
        'error': () => diagonosticMultiStyleDecoration(state, contentText[keySet[DIAGNOSTIC_CONTENT_TEXT_KIND.ERROR_CONTENT_TEXT]])
    };
};

const diagnosticCounter = (context) => {

    if (context.state.warning.total + context.state.error.total === 0) {
        return diagnosticKind(context).ok();
    }

    const diagnosticText: vscode.DecorationRenderOptions[] = [];

    if (context.state.warning.total > 0) {
        diagnosticText.push(...diagnosticKind(context).warning());
    }

    if (context.state.error.total > 0) {
        diagnosticText.push(...diagnosticKind(context).error());
    }

    return diagnosticText;
};

const diagnosticBiomeSplit = (state: Type.DiagnosticStateType['editor'] | Type.DiagnosticStateType['workspace'], contentText) => {

    const context = {
        state: state,
        contentText: contentText,
        keySet: {}
    };

    return {
        'workspace': () => diagnosticCounter({
            ...context,
            keySet: { ...DIAGNOSTIC_WORKSPACE_CONTENT_TEXT_KEYSET }
        }),
        'editor': () => diagnosticCounter({
            ...context,
            keySet: { ...DIAGNOSTIC_EDITOR_CONTENT_TEXT_KEYSET }
        }),
        'all': () => []
    };
};

const buildDiagonosticDecorationLayout: Type.BuildDiagonosticDecorationType = (context): any[] => {

    const { state, textState } = context;
    const highlightStyleList: vscode.DecorationRenderOptions[] = [];

    // all ok
    if ((state.workspace.warning.total + state.workspace.error.total + state.editor.error.total + state.editor.warning.total) === 0) {
        textState.layout.allOkPlaceholderContentText.contentText.forEach(decoration => {
            if (decoration.after.contentText === allOkSym) {
                highlightStyleList.push(...diagonosticMultiStyleDecoration(state, textState.all.okAllContentText));
            } 
            const overrideColor = textState.layout.allOkPlaceholderContentText?.override;
            decoration.after.color = overrideColor ? overrideColor[DIAGNOSTIC_BIOME.OK].color : decoration.after.color;
            highlightStyleList.push(decoration);
        });
        return highlightStyleList;
    }

    textState.layout.problemPlaceholderContentText.contentText.forEach(decoration => {
        if (decoration.after.contentText === workspaceSym) {
            highlightStyleList.push(...diagnosticBiomeSplit(state.workspace, textState.workspace)['workspace']());
            return;
        }

        if (decoration.after.contentText === editorSym) {
            highlightStyleList.push(...diagnosticBiomeSplit(state.editor, textState.editor)['editor']());
            return;
        }
        const overrideColor = textState.layout.problemPlaceholderContentText?.override;
        decoration.after.color = overrideColor ? overrideColor[state.severity].color : decoration.after.color;
        highlightStyleList.push(decoration);
    });
    return highlightStyleList;
};

const diagnosticInfo = (editor: vscode.TextEditor, diagnosticState: Type.DiagnosticStateType): Type.StatusTextInfoType[] => {
    const context: Type.DiagnosticContext = {
        state: diagnosticState,
        textState: diagnosticContentText,
        diagnosticVisibility: diagnosticVisibility
    };

    return [{
        contentText: buildDiagonosticDecorationLayout(context) as Type.DecorationRenderOptionType[],
        range: createCursorRange(editor)
    }];
};

const bindDiagnosticContentTextState = () => {
    return {
        functionOf: diagnosticOf,
        textOf: diagnosticContentText,
        configOf: diagnosticVisibility,
    };
};

export {
    diagnosticInfo,
    bindDiagnosticContentTextState
};
