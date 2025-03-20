import * as vscode from 'vscode';
import * as Type from '../type/type';
import { DIAGNOSTIC_SEVERITY_TO_KEY, DIAGNOSTIC_STATE } from '../constant/object';
import { DIAGNOSTIC_BIOME } from '../constant/enum';

const diagnosticState: Type.DiagnosticStateType = { ...DIAGNOSTIC_STATE };

const diagnosticSource: Type.DiagnosticSourceType = {};

const resetEditorDiagnosticStatistics = (): void => {
    diagnosticState.editor.warning.total = 0;
    diagnosticState.editor.error.total = 0;
};

const resetWorkspaceDiagnosticStatistics = (): void => {
    diagnosticState.workspace.warning.source = 0;
    diagnosticState.workspace.warning.total = 0;
    diagnosticState.workspace.error.source = 0;
    diagnosticState.workspace.error.total = 0;
};

const parseDiagnostic = (diagnosticState, severity, fsPath: string, activeEditorfsPath: string | undefined = undefined): void => {
    Object.keys(severity).forEach(severityType => {

        if (severity[severityType].length > 0) {
            diagnosticState.workspace[severityType].source += 1;
            diagnosticState.workspace[severityType].total += severity[severityType].length;
        }

        if (fsPath === activeEditorfsPath) {
            diagnosticState.editor[severityType].total = 0;
            diagnosticState.editor[severityType].total = severity[severityType].length;
        }
    });
};

const buildDiagnostic = (source, diagnosticList, uri): void => {
    for (const diagnostic of diagnosticList) {
        if (diagnostic.severity <= vscode.DiagnosticSeverity.Warning) {

            if (typeof source[uri.fsPath] !== 'object') {
                source[uri.fsPath] = {};
            }

            const sevKey = DIAGNOSTIC_SEVERITY_TO_KEY[diagnostic.severity];

            if (!Array.isArray(source[uri.fsPath][sevKey])) {
                source[uri.fsPath][sevKey] = [];
            }

            source[uri.fsPath][sevKey].push(diagnostic);
        }
    }
};

const maxSeverity = (state: Type.DiagnosticStateType): number => {
    const ifEditorProblem = state.editor.error.total !== 0 || state.editor.warning.total !== 0;
    const ifWorkspaceProblem = state.workspace.error.total !== 0 || state.workspace.warning.total !== 0;

    if (!ifEditorProblem && !ifWorkspaceProblem) {
        return DIAGNOSTIC_BIOME.OK;
    }

    const editorSeverity = state.editor.warning.total <= state.editor.error.total ? DIAGNOSTIC_BIOME.ERR : DIAGNOSTIC_BIOME.WARN;
    const workspaceSeverity = state.workspace.warning.total <= state.workspace.error.total ? DIAGNOSTIC_BIOME.ERR : DIAGNOSTIC_BIOME.WARN;

    return Math.max(editorSeverity, workspaceSeverity);
};

const updateDiagnostic = (activeEditorUri: vscode.Uri | undefined = undefined): Type.DiagnosticStateType => {

    for (let fs in diagnosticSource) {
        delete diagnosticSource[fs];
    }

    resetWorkspaceDiagnosticStatistics();

    const diagnostics = vscode.languages.getDiagnostics();

    for (const [uri, diagnosticList] of diagnostics) {
        buildDiagnostic(diagnosticSource, diagnosticList, uri);
    }

    for (const [fsPath, severity] of Object.entries(diagnosticSource)) {
        parseDiagnostic(diagnosticState, severity, fsPath, activeEditorUri?.fsPath);
    };

    if (activeEditorUri && !Object.hasOwn(diagnosticSource, activeEditorUri.fsPath)) {
        resetEditorDiagnosticStatistics();
    }

    diagnosticState.severity = maxSeverity(diagnosticState);

    return diagnosticState;
};

export {
    updateDiagnostic,
    resetEditorDiagnosticStatistics
};