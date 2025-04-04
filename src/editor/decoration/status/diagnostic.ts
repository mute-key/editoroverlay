import * as vscode from 'vscode';
import * as Type from '../../../type/type';
import * as __0x from '../../../constant/shared/numeric';
import * as __$ from '../../../constant/shared/symbol';
import { blankRange, createCursorRange, createLineRange } from '../../range';
import { DIAGNOSTIC_CONTENT_TEXT, DIAGNOSTIC_EDITOR_CONTENT_TEXT_KEYSET, DIAGNOSTIC_PROBLEM_LIST, DIAGNOSTIC_STATE, DIAGNOSTIC_WORKSPACE_CONTENT_TEXT_KEYSET } from '../../../constant/shared/object';
import { DECORATION_OPTION_CONFIG, DIAGNOSTIC_VISIBILITY_CONFIG } from '../../../constant/config/object';
import { DIAGNOSTIC_BIOME, DIAGNOSTIC_CONTENT_TEXT_KEY } from '../../../constant/config/enum';
import { DiagnosticState, updateDiagnostic } from '../../../diagnostic/diagnostic';
import { doesNotMatch } from 'assert';

const diagnosticContentText = {
    ...DIAGNOSTIC_CONTENT_TEXT
};

// export interface DiagnosticContentText {
//     [__0x.allOkOverride]: [];
//     [__0x.editorOkWorkspaceWarn]: [];
//     [__0x.editorOkWorkspaceErr]: [];
//     [__0x.editorOkWorkspaceWarnErr]: [];
//     [__0x.editorWarnWorkspaceWarn]: [];
//     [__0x.editorWarnWorkspaceErr]: [];
//     [__0x.editorWarnWorkspaceWarnErr]: [];
//     [__0x.editorErrWorkspaceErr]: [];
//     [__0x.editorErrWorkspaceWarnErr]: [];
//     [__0x.editorWarnErrWorkspaceWarn_err]: [];
//     // layout: {
//     //     problemPlaceholderContentText: {
//     //         contentText: any[],
//     //         override: {
//     //             [key: number]: {
//     //                 [key: string]: string
//     //             }
//     //         }
//     //     },
//     //     allOkPlaceholderContentText: {
//     //         contentText: any[],
//     //         override: {
//     //             [key: number]: {
//     //                 [key: string]: string
//     //             }
//     //         }
//     //     },
//     // },
//     // editor: DiagonosticContentTextKindType,
//     // workspace: DiagonosticContentTextKindType
//     // all: DiagnosticContentTextState
// }

const diagnosticTextBuffer = {
    [__0x.allOkOverride]: [] as any[],
    [__0x.editorOkWorkspaceWarn]: [] as any[],
    [__0x.editorOkWorkspaceErr]: [] as any[],
    [__0x.editorOkWorkspaceWarnErr]: [] as any[],
    [__0x.editorWarnWorkspaceWarn]: [] as any[],
    [__0x.editorWarnWorkspaceErr]: [] as any[],
    [__0x.editorWarnWorkspaceWarnErr]: [] as any[],
    [__0x.editorErrWorkspaceErr]: [] as any[],
    [__0x.editorErrWorkspaceWarnErr]: [] as any[],
    [__0x.editorWarnErrWorkspaceWarn_err]: [] as any[],
}

const decorationOptionBuffer = { ...DECORATION_OPTION_CONFIG } as Type.DecorationRenderOptionType

const setDiagonosticTextbuffer = (hexKey: number, decorationType) => {
    diagnosticTextBuffer[hexKey].push(...decorationType);
}

const sealDiagnosticTextBuffer = (): void => {
    DIAGNOSTIC_PROBLEM_LIST.forEach(hexKey => {
        Object.seal(diagnosticTextBuffer[hexKey])
    })
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
    pre: __$.prefixSymbol,
    post: __$.postfixSymbol
};

const editorWarningSourceOf = {
    wrn: ({ state }) => String(state.editor.warning.total)
};

const worksSacewarningSourceOf = {
    src: ({ state }) => String(state.workspace.warning.source)
};
const workspaceWarningCountOf = {
    wrn: ({ state }) => String(state.workspace.warning.total)
};


const editorErrorSourceOf = {
    err: ({ state }) => String(state.editor.error.total)
};

const workspaceErrorSourceOf = {
    src: ({ state }) => String(state.workspace.error.source)
};
const workspaceErrorCountOf = {
    err: ({ state }) => String(state.workspace.error.total)
};

interface DiagonosticTextContext {
    notation: {
        prefix?: string
        postfix?: string
    },
    // state: typeof diagnosticContentText['workspace']
}

type DiagnosticOfType = {
    [k in DIAGNOSTIC_CONTENT_TEXT_KEY]: Record<string, number | ((context: DiagonosticTextContext) => string | number)>
}

const diagnosticOf = {
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_PROBLEM_CONTENT_TEXT]: problemOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.PLACEHOLDER_ALL_OK_CONTENT_TEXT]: allOkOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_ALL_CONTENT_TEXT]: notationOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_WORKSPACE_CONTENT_TEXT]: notationOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.OK_EDITOR_CONTENT_TEXT]: notationOf,
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_EDITOR_CONTENT_TEXT]: {
        ...notationOf,
        ...editorWarningSourceOf,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.WARNING_WORKSPACE_CONTENT_TEXT]: {
        ...notationOf,
        ...worksSacewarningSourceOf,
        ...workspaceWarningCountOf,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_EDITOR_CONTENT_TEXT]: {
        ...notationOf,
        ...editorErrorSourceOf,
    },
    [DIAGNOSTIC_CONTENT_TEXT_KEY.ERROR_WORKSPACE_CONTENT_TEXT]: {
        ...notationOf,
        ...workspaceErrorSourceOf,
        ...workspaceErrorCountOf
    },
    
};

// const diagonosticMultiStyleDecoration = (diagnosticState, diagnosticContentTextIs: any): Type.DecorationRenderOptionType[] => {
//     const context = {
//         state: diagnosticState,
//         notation: diagnosticContentTextIs.notation
//     };

//     return diagnosticContentTextIs.contentText.map(decorationOption => {
//         if (typeof decorationOption.after.contentText !== 'string') {
//             const decorationOptionFunc = { ...decorationOption };
//             decorationOptionFunc.after = { ...decorationOption.after };
//             decorationOptionFunc.after.contentText = decorationOption.after.contentText(context);
//             return decorationOptionFunc;
//         }
//         return decorationOption;
//     });
// };

// const diagnosticKind = ({ state, contentText, keySet }) => {
//     return {
//         ok: () => diagonosticMultiStyleDecoration(state, contentText[keySet[__0x.okContentText]]),
//         warning: () => diagonosticMultiStyleDecoration(state, contentText[keySet[__0x.warningContentText]]),
//         error: () => diagonosticMultiStyleDecoration(state, contentText[keySet[__0x.errorContentText]])
//     };
// };

// const diagnosticCounter = (context) => {

//     if (context.state.warning.total + context.state.error.total === 0) {
//         return diagnosticKind(context).ok();
//     }

//     const diagnosticText: vscode.DecorationRenderOptions[] = [];

//     if (context.state.warning.total > 0) {
//         diagnosticText.push(...diagnosticKind(context).warning());
//     }

//     if (context.state.error.total > 0) {
//         diagnosticText.push(...diagnosticKind(context).error());
//     }

//     return diagnosticText;
// };

// const diagnosticBiomeSplit = (state: DiagnosticState['editor'] | DiagnosticState['workspace'], contentText) => {

//     const context = {
//         state: state,
//         contentText: contentText
//     };

//     return {
//         'workspace': () => diagnosticCounter({
//             ...context,
//             keySet: {
//                 ...DIAGNOSTIC_WORKSPACE_CONTENT_TEXT_KEYSET
//             }
//         }),
//         'editor': () => diagnosticCounter({
//             ...context,
//             keySet: {
//                 ...DIAGNOSTIC_EDITOR_CONTENT_TEXT_KEYSET
//             }
//         }),
//         'all': () => []
//     };
// };


// const diagnosticLayoutAllOkOverride = (state: DiagnosticState, textState: DiagnosticContentText): Type.DecorationRenderOptionType[] => {
//     return textState.layout[__0x.allOkPlaceholderContentText].contentText.map(decoration => {
//         if (decoration.after.contentText == __0x.allOkHexKey) {
//             return diagonosticMultiStyleDecoration(state, textState.all[__0x.okAllContentText]);
//         }

//         const overrideColor = textState.layout[__0x.allOkPlaceholderContentText]?.override;
//         decoration.after.color = overrideColor ? overrideColor[DIAGNOSTIC_BIOME.OK].color : decoration.after.color;
//         return decoration;
//     }).flat();
// };

// const diagnosticLayoutDivided = (state: DiagnosticState, textState: DiagnosticContentText): Type.DecorationRenderOptionType[] => {
//     return textState.layout[__0x.problemPlaceholderContentText].contentText.map(decoration => {
//         if (decoration.after.contentText == __0x.workspaceHexKey) {
//             return diagnosticBiomeSplit(state.workspace, textState.workspace).workspace();
//         }

//         if (decoration.after.contentText == __0x.editorHexKey) {
//             return diagnosticBiomeSplit(state.editor, textState.editor).editor();
//         }

//         const overrideColor = textState.layout[__0x.problemPlaceholderContentText].override;
//         decoration.after.color = overrideColor ? overrideColor[state.severity].color : decoration.after.color;
//         return decoration;
//     }).flat();
// };

interface DiagnosticContext {
    state: DiagnosticState,
    textState: typeof diagnosticContentText,
    // diagnosticVisibility: DiagnosticContentTextType,
}

// const buildDiagonosticDecorationLayout = (context: DiagnosticContext): any[] => {
//     const { state, textState } = context;
//     const diagnosticLayout = state.severity === DIAGNOSTIC_BIOME.OK ? diagnosticLayoutAllOkOverride : diagnosticLayoutDivided;
//     return diagnosticLayout(state, textState);
// };

const buffer: vscode.TextEditorDecorationType[] = [];


// ALL_OK_OVERRIDE         = 0b00100101
// ALL_OK_NO_OVERRIDE      = 0b00100110
// E_OK_W_WARN             = 0b00101010
// E_OK_W_ERR              = 0b00110010
// E_OK_W_WARN_ERR         = 0b00111010
// E_WARN_W_WARN           = 0b01001010
// E_WARN_W_ERR            = 0b01010010
// E_WARN_W_WARN_ERR       = 0b01011010
// E_ERR_W_ERR             = 0b10010010
// E_ERR_W_WARN_ERR        = 0b10011010
// E_WARN_ERR_W_WARN_ERR   = 0b11011010


const diagnosticRenderSignature = (state): any => {
    let emask = 0;
    let wmask = 0;
    if (state.editor.warning.total > 0) {
        emask |= 1 << 1
    }
    if (state.editor.error.total > 0) {
        emask |= 1 << 2
    }

    if (emask === 0) {
        emask = 1;
    }

    if (state.workspace.warning.total > 0) {
        wmask |= 1 << 1
    }
    if (state.workspace.error.total > 0) {
        wmask |= 1 << 2
    }

    if (wmask === 0) {
        wmask = 1;
    }

    console.log(emask, wmask)

    return (emask === 1 && wmask === 1) ? 0b00100101 : emask << 5 | wmask << 2 | 0b10;
}

let previousSignature = 0b00100101;

const diagnosticInfo = (editor: vscode.TextEditor): void => {

    const diagnosticState = updateDiagnostic(editor.document.uri);
    const signature = diagnosticRenderSignature(diagnosticState);
    console.log('signature', signature)
    console.log('diagnosticState', diagnosticState)

    const decorationOptionGrid = {
        range: createCursorRange(editor),
        renderOptions: {}
    }

    // console.log('diagnosticContentText', diagnosticContentText)
    // console.log('diagnosticTextBuffer', diagnosticTextBuffer)

    const context = {
        state: diagnosticState
    };

    diagnosticTextBuffer[previousSignature]?.forEach(decoration => editor.setDecorations(decoration, blankRange))

    diagnosticContentText[signature].forEach((decoration, idx) => {
        
        const options = { ...decorationOptionGrid }
        decorationOptionBuffer.after = { ...decoration.after }
        if (typeof decoration.after.contentText !== 'string') {
            // console.log('typeof', typeof decoration.after.contentText, decoration.after.contentText)
            // console.log(decorationOptionBuffer.after.contentText)
            decorationOptionBuffer.after.contentText = decoration.after.contentText(context)
        };
        options.renderOptions = decorationOptionBuffer;
        editor.setDecorations(diagnosticTextBuffer[signature][idx], [options as unknown as vscode.DecorationOptions]);
    })

    // previousSignature = signature;

    // const context: DiagnosticContext = {
    //     state: diagnosticState,
    //     textState: diagnosticContentText,
    //     // diagnosticVisibility: diagnosticVisibility
    // };

    // buffer?.forEach(decoration => editor.setDecorations(decoration, blankRange))

    // const range = createCursorRange(editor);

    // buildDiagonosticDecorationLayout(context).forEach(decorationOption => {
    //     editor.setDecorations(decoration, [range]);
    //     // const decoration = vscode.window.createTextEditorDecorationType(decorationOption)
    //     // buffer.push(decoration);
    // })
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
    bindDiagnosticContentTextState,
    setDiagonosticTextbuffer,
    sealDiagnosticTextBuffer
};
