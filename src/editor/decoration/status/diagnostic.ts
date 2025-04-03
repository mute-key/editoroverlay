import * as vscode from 'vscode';
import * as Type from '../../../type/type';
import * as __0x from '../../../constant/shared/numeric';
import { createCursorRange, createLineRange } from '../../range';
import { DIAGNOSTIC_CONTENT_TEXT, DIAGNOSTIC_EDITOR_CONTENT_TEXT_KEYSET, DIAGNOSTIC_WORKSPACE_CONTENT_TEXT_KEYSET } from '../../../constant/shared/object';
import { DECORATION_OPTION_CONFIG, DIAGNOSTIC_VISIBILITY_CONFIG } from '../../../constant/config/object';
import { DIAGNOSTIC_BIOME, DIAGNOSTIC_CONTENT_TEXT_KEY } from '../../../constant/config/enum';
import { updateDiagnostic } from '../../../diagnostic/diagnostic';

const diagnosticContentText = {
    ...DIAGNOSTIC_CONTENT_TEXT
} as DiagnosticContentText;

interface DiagnosticContentText {
    layout: {
        problemPlaceholderContentText: {
            contentText: any[],
            override: {
                [key: number]: {
                    [key: string]: string
                }
            }
        },
        allOkPlaceholderContentText: {
            contentText: any[],
            override: {
                [key: number]: {
                    [key: string]: string
                }
            }
        },
    },
    editor: DiagonosticContentTextKindType,
    workspace: DiagonosticContentTextKindType
    all: DiagnosticContentTextState
}

const diagnosticTextBuffer = {
    [__0x.allOkPlaceholderContentText]: [] as any[],
    [__0x.problemPlaceholderContentText]: [] as any[],
    [__0x.okAllContentText]: [] as any[],
    [__0x.okEditorContentText]: [] as any[],
    [__0x.errorEditorContentText]: [] as any[], // dynamic
    [__0x.warningEditorContentText]: [] as any[], // dynamic
    [__0x.okWorkspaceContentText]: [] as any[],
    [__0x.warningWorkspaceContentText]: [] as any[], // dynamic
    [__0x.errorWorkspaceContentText]: [] as any[], // dynamic
}

const decorationOptionBuffer = { ...DECORATION_OPTION_CONFIG } as Type.DecorationRenderOptionType

// setSelectionTextbuffer(hexKey, textOftarget[hexKey].contentText.length);
const setDiagonosticTextbuffer = (hexKey: number) => {
    decorationOptionBuffer.isWholeLine = true;
    decorationOptionBuffer.rangeBehavior = vscode.DecorationRangeBehavior.ClosedClosed;
}

interface DiagnosticContentTextState {
    contentText: (string | any)[]
    notation: {
        prefix: string,
        postfix: string
    }
}

type DiagonosticContentTextKindType = {
    [k in DIAGNOSTIC_CONTENT_TEXT_KEY]: DiagnosticContentTextState;
}

const diagnosticVisibility = { ...DIAGNOSTIC_VISIBILITY_CONFIG } as Type.DiagnosticVisibilityType;

const allOkOf = {
    allok: __0x.allOkHexKey
};

const problemOf = {
    editor: __0x.editorHexKey,
    workspace: __0x.workspaceHexKey
};

const notationOf = {
    pre: ({ notation }) => notation.prefix,
    post: ({ notation }) => notation.postfix
};

const warningSourceOf = {
    src: ({ state }) => String(state.warning.source)
};
const warningCountOf = {
    wrn: ({ state }) => String(state.warning.total)
};
const errorSourceOf = {
    src: ({ state }) => String(state.error.source)
};
const errorCountOf = {
    err: ({ state }) => String(state.error.total)
};

interface DiagonosticTextContext {
    notation: {
        prefix?: string
        postfix?: string
    },
    state: typeof diagnosticContentText['workspace']
}

type DiagnosticOfType = {
    [k in DIAGNOSTIC_CONTENT_TEXT_KEY]: Record<string, number | ((context: DiagonosticTextContext) => string | number)>
}

const diagnosticOf: DiagnosticOfType = {
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_PROBLEM_CONTENT_TEXT]: problemOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_ALL_OK_CONTENT_TEXT]: allOkOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_ALL_CONTENT_TEXT]: notationOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_WORKSPACE_CONTENT_TEXT]: notationOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_EDITOR_CONTENT_TEXT]: notationOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_WORKSPACE_CONTENT_TEXT]: {
        ...notationOf,
        ...warningSourceOf,
        ...warningCountOf,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_EDITOR_CONTENT_TEXT]: {
        ...notationOf,
        ...warningCountOf,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_WORKSPACE_CONTENT_TEXT]: {
        ...notationOf,
        ...errorSourceOf,
        ...errorCountOf
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_EDITOR_CONTENT_TEXT]: {
        ...notationOf,
        ...errorCountOf,
    },
};

const diagonosticMultiStyleDecoration = (diagnosticState, diagnosticContentTextIs: any): Type.DecorationRenderOptionType[] => {
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
};

const diagnosticKind = ({ state, contentText, keySet }) => {
    return {
        ok: () => diagonosticMultiStyleDecoration(state, contentText[keySet[__0x.okContentText]]),
        warning: () => diagonosticMultiStyleDecoration(state, contentText[keySet[__0x.warningContentText]]),
        error: () => diagonosticMultiStyleDecoration(state, contentText[keySet[__0x.errorContentText]])
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

interface DiagnosticStateType {
    severity: number,
    editor: {
        warning: {
            total: number
        },
        error: {
            total: number
        }
    },
    workspace: {
        warning: {
            source: number,
            total: number
        },
        error: {
            source: number,
            total: number
        },
    }
}

const diagnosticBiomeSplit = (state: DiagnosticStateType['editor'] | DiagnosticStateType['workspace'], contentText) => {

    const context = {
        state: state,
        contentText: contentText
    };

    return {
        'workspace': () => diagnosticCounter({
            ...context,
            keySet: {
                ...DIAGNOSTIC_WORKSPACE_CONTENT_TEXT_KEYSET
            }
        }),
        'editor': () => diagnosticCounter({
            ...context,
            keySet: {
                ...DIAGNOSTIC_EDITOR_CONTENT_TEXT_KEYSET
            }
        }),
        'all': () => []
    };
};


const diagnosticLayoutAllOkOverride = (state: DiagnosticStateType, textState: DiagnosticContentText): Type.DecorationRenderOptionType[] => {
    return textState.layout[__0x.allOkPlaceholderContentText].contentText.map(decoration => {
        if (decoration.after.contentText == __0x.allOkHexKey) {
            return diagonosticMultiStyleDecoration(state, textState.all[__0x.okAllContentText]);
        }

        const overrideColor = textState.layout[__0x.allOkPlaceholderContentText]?.override;
        decoration.after.color = overrideColor ? overrideColor[DIAGNOSTIC_BIOME.OK].color : decoration.after.color;
        return decoration;
    }).flat();
};

const diagnosticLayoutDivided = (state: DiagnosticStateType, textState: DiagnosticContentText): Type.DecorationRenderOptionType[] => {
    return textState.layout[__0x.problemPlaceholderContentText].contentText.map(decoration => {
        if (decoration.after.contentText == __0x.workspaceHexKey) {
            return diagnosticBiomeSplit(state.workspace, textState.workspace).workspace();
        }

        if (decoration.after.contentText == __0x.editorHexKey) {
            return diagnosticBiomeSplit(state.editor, textState.editor).editor();
        }

        const overrideColor = textState.layout[__0x.problemPlaceholderContentText].override;
        decoration.after.color = overrideColor ? overrideColor[state.severity].color : decoration.after.color;
        return decoration;
    }).flat();
};




interface DiagnosticContext {
    state: DiagnosticStateType,
    textState: DiagnosticContentText,
    // diagnosticVisibility: DiagnosticContentTextType,
}

const buildDiagonosticDecorationLayout = (context: DiagnosticContext): any[] => {
    const { state, textState } = context;
    const diagnosticLayout = state.severity === DIAGNOSTIC_BIOME.OK ? diagnosticLayoutAllOkOverride : diagnosticLayoutDivided;
    return diagnosticLayout(state, textState);
};

const buffer: vscode.TextEditorDecorationType[] = [];

const diagnosticInfo = (editor: vscode.TextEditor): void => {

    const diagnosticState = updateDiagnostic();
    const context: DiagnosticContext = {
        state: diagnosticState,
        textState: diagnosticContentText,
        // diagnosticVisibility: diagnosticVisibility
    };

    buffer?.forEach(decoration => decoration.dispose())

    const range = createCursorRange(editor);

    buildDiagonosticDecorationLayout(context).forEach(decorationOption => {
        const decoration = vscode.window.createTextEditorDecorationType(decorationOption)
        editor.setDecorations(decoration, [range]);
        buffer.push(decoration);
    })
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
