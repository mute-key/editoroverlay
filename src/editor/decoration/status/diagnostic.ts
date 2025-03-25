import * as vscode from 'vscode';
import * as Type from '../../../type/type';
import * as $ from '../../../constant/symbol';
import Range from '../../range';
import { DIAGNOSTIC_CONTENT_TEXT, DIAGNOSTIC_EDITOR_CONTENT_TEXT_KEYSET, DIAGNOSTIC_VISIBILITY_CONFIG, DIAGNOSTIC_WORKSPACE_CONTENT_TEXT_KEYSET } from '../../../constant/object';
import { DIAGNOSTIC_BIOME, DIAGNOSTIC_CONTENT_TEXT_KEY } from '../../../constant/enum';

const diagnosticContentText = { 
    ...DIAGNOSTIC_CONTENT_TEXT, 
    __proto__: null
} as Type.DiagnosticContentTextType;

const diagnosticVisibility = { ...DIAGNOSTIC_VISIBILITY_CONFIG } as Type.DiagnosticVisibilityType;

namespace Placeholder {
    export const editorSym = Symbol('editor');

    export const workspaceSym = Symbol('workspace');

    export const allOkSym = Symbol('allOk');

    export const allOkDiagnosticOf = {
        allok: allOkSym,
    };

    export const problemDiagnosticOf = {
        editor: editorSym,
        workspace: workspaceSym,
    };
}

namespace Notation {
    export const diagnosticOf = {
        pre: ({ notation }) => notation.prefix,
        post: ({ notation }) => notation.postfix,
    };
}

namespace Problem {
    export const warningSourceDiagnosticOf = {
        src: ({ state }) => String(state.warning.source),
    };

    export const warningCountDiagnosticOf = {
        wrn: ({ state }) => String(state.warning.total),
    };

    export const errorSourceDiagnosticOf = {
        src: ({ state }) => String(state.error.source),
    };

    export const errorCountDiagnosticOf = {
        err: ({ state }) => String(state.error.total)
    };
}

const diagnosticOf: Type.DiagnosticOfType = {
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_PROBLEM_CONTENT_TEXT]: Placeholder.problemDiagnosticOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_ALL_OK_CONTENT_TEXT]: Placeholder.allOkDiagnosticOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_ALL_CONTENT_TEXT]: Notation.diagnosticOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_WORKSPACE_CONTENT_TEXT]: Notation.diagnosticOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_EDITOR_CONTENT_TEXT]: Notation.diagnosticOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_WORKSPACE_CONTENT_TEXT]: {
        ...Notation.diagnosticOf,
        ...Problem.warningSourceDiagnosticOf,
        ...Problem.warningCountDiagnosticOf,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_EDITOR_CONTENT_TEXT]: {
        ...Notation.diagnosticOf,
        ...Problem.warningCountDiagnosticOf,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_WORKSPACE_CONTENT_TEXT]: {
        ...Notation.diagnosticOf,
        ...Problem.errorSourceDiagnosticOf,
        ...Problem.errorCountDiagnosticOf
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_EDITOR_CONTENT_TEXT]: {
        ...Notation.diagnosticOf,
        ...Problem.errorCountDiagnosticOf,
    },
};

function diagonosticMultiStyleDecoration(diagnosticState, diagnosticContentTextIs: Type.DiagnosticContentTextStateType): Type.DecorationRenderOptionType[] {
    if (diagnosticContentTextIs) {

        const context = {
            state: diagnosticState,
            notation: diagnosticContentTextIs.notation
        };

        return diagnosticContentTextIs.contentText.map(decorationOption => {
            if (typeof decorationOption.after.contentText !== 'string') {
                const decorationOptionFunc = { ...decorationOption };
                decorationOptionFunc.after = { ...decorationOption.after };
                decorationOptionFunc.after.contentText = decorationOption.after.contentText(context);
                return decorationOptionFunc;
            }
            return decorationOption;
        });
    }
    return [];
};

function diagnosticKind({ state, contentText, keySet }) {
    return {
        ok: () => diagonosticMultiStyleDecoration(state, contentText[keySet[$.okContentText]]),
        warning: () => diagonosticMultiStyleDecoration(state, contentText[keySet[$.warningContentText]]),
        error: () => diagonosticMultiStyleDecoration(state, contentText[keySet[$.errorContentText]])
    };
};

function diagnosticCounter(context) {

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
        contentText: contentText
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
function diagnosticLayoutAllOkOverride(state: Type.DiagnosticStateType, textState: Type.DiagnosticContentTextType): Type.DecorationRenderOptionType[] {
    return textState.layout[$.allOkPlaceholderContentText].contentText.map(decoration => {
        if (decoration.after.contentText === Placeholder.allOkSym) {
            return diagonosticMultiStyleDecoration(state, textState.all[$.okAllContentText]);
        }

        const overrideColor = textState.layout[$.allOkPlaceholderContentText]?.override;
        decoration.after.color = overrideColor ? overrideColor[DIAGNOSTIC_BIOME.OK].color : decoration.after.color;
        return decoration;
    }).flat();
};

function diagnosticLayoutDivided(state: Type.DiagnosticStateType, textState: Type.DiagnosticContentTextType): Type.DecorationRenderOptionType[]{
    return textState.layout[$.problemPlaceholderContentText].contentText.map(decoration => {
        if (decoration.after.contentText === Placeholder.workspaceSym) {
            return diagnosticBiomeSplit(state.workspace, textState.workspace).workspace();
        }

        if (decoration.after.contentText === Placeholder.editorSym) {
            return diagnosticBiomeSplit(state.editor, textState.editor).editor();
        }

        const overrideColor = textState.layout[$.problemPlaceholderContentText].override;
        decoration.after.color = overrideColor ? overrideColor[state.severity].color : decoration.after.color;
        return decoration;
    }).flat();
};


function buildDiagonosticDecorationLayout(context: Type.DiagnosticContext): any[] {
    const { state, textState } = context;
    const diagnosticLayout = state.severity === DIAGNOSTIC_BIOME.OK ? diagnosticLayoutAllOkOverride : diagnosticLayoutDivided;
    return diagnosticLayout(state, textState);
};


function diagnosticInfo(editor: vscode.TextEditor, diagnosticState: Type.DiagnosticStateType): Type.StatusTextInfoType[]{
    const context: Type.DiagnosticContext = {
        state: diagnosticState,
        textState: diagnosticContentText,
        diagnosticVisibility: diagnosticVisibility
    };

    return [{
        contentText: buildDiagonosticDecorationLayout(context) as Type.DecorationRenderOptionType[],
        range: Range.createCursorRange(editor)
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
