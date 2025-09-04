import type * as D from '../type/type';

/* eslint-disable semi */
import * as vscode from 'vscode';
import { DIAGNOSTIC_SEVERITY_TO_KEY } from '../constant/config/object';
import { DIAGNOSTIC_STATE } from '../constant/shared/object';
import { DIAGNOSTIC_BIOME } from '../constant/config/enum';

export {
    updateDiagnostic,
    resetEditorDiagnosticStatistics,
    resetWorkspaceDiagnosticStatistics,
    setOverrideDigit
};

const diagnosticState = { ...DIAGNOSTIC_STATE } as unknown as D.Diagnostic.Intf.State;

const resetEditorDiagnosticStatistics = (): void => {
    diagnosticState.editor.warning.line.splice(0);
    diagnosticState.editor.warning.total = 0;
    diagnosticState.editor.error.line.splice(0);
    diagnosticState.editor.error.total = 0;
};

const resetWorkspaceDiagnosticStatistics = (): void => {
    diagnosticState.workspace.warning.source = 0;
    diagnosticState.workspace.warning.total = 0;
    diagnosticState.workspace.error.source = 0;
    diagnosticState.workspace.error.total = 0;
};

const parseDiagnostic = (state: D.Diagnostic.Intf.State, severity: D.Diagnostic.Intf.DiagnosticFsBind, fsPath: string, activeEditorfsPath: string | undefined = undefined): void => {
    Object.keys(severity).forEach((severityType: string) => {
        if (fsPath === activeEditorfsPath) {
            state.editor[severityType].line = [
                ...new Set([
                    ...state.editor[severityType].line,
                    ...severity[severityType].map((problem: vscode.Diagnostic) => problem.range.start.line)
                ])
            ];
            state.editor[severityType].total = 0;
            state.editor[severityType].total = severity[severityType].length;
        }

        if (severity[severityType].length > 0) {
            state.workspace[severityType].source += 1;
            state.workspace[severityType].total += severity[severityType].length;
        }
    });
};

const buildDiagnostic = (source: D.Diagnostic.Intf.Source, diagnosticList: vscode.Diagnostic[], uri: vscode.Uri): void => {
    for (const diagnostic of diagnosticList) {
        if (diagnostic.severity <= vscode.DiagnosticSeverity.Warning) {
            if (typeof source[uri.fsPath] !== 'object') {
                source[uri.fsPath] = {};
            }
            const sevKey = DIAGNOSTIC_SEVERITY_TO_KEY[diagnostic.severity] as string;
            if (!Array.isArray(source[uri.fsPath][sevKey])) {
                source[uri.fsPath][sevKey] = [];
            }
            source[uri.fsPath][sevKey].push(diagnostic);
        }
    }
};

const maxSeverity = (state: D.Diagnostic.Intf.State): number => {
    const ifEditorProblem = state.editor.error.total !== 0 || state.editor.warning.total !== 0;
    const ifWorkspaceProblem = state.workspace.error.total !== 0 || state.workspace.warning.total !== 0;
    if (!ifEditorProblem && !ifWorkspaceProblem) {
        return DIAGNOSTIC_BIOME.OK;
    }
    const editorSeverity = (state.editor.warning.total <= state.editor.error.total) && ifEditorProblem ? DIAGNOSTIC_BIOME.ERR : DIAGNOSTIC_BIOME.WARN;
    const workspaceSeverity = (state.workspace.warning.total <= state.workspace.error.total) && ifWorkspaceProblem ? DIAGNOSTIC_BIOME.ERR : DIAGNOSTIC_BIOME.WARN;
    return Math.max(editorSeverity, workspaceSeverity);
};

const convertTo2DArray = (state: D.Diagnostic.Intf.State): (number | number[])[] => [
    state.override,
    state.severity,
    [...state.editor.warning.line],
    state.editor.warning.total,
    [...state.editor.error.line],
    state.editor.error.total,
    state.workspace.warning.source,
    state.workspace.warning.total,
    state.workspace.error.source,
    state.workspace.error.total,
];

const diagnosticSource: D.Diagnostic.Intf.Source = {};

const setOverrideDigit = (digit: number): void => {
    diagnosticState.override = digit;
}

const updateDiagnostic = (activeEditorUri: vscode.Uri | undefined = undefined): (number | number[])[] => {

    for (let fs in diagnosticSource) {
        delete diagnosticSource[fs];
    }

    resetWorkspaceDiagnosticStatistics();
    resetEditorDiagnosticStatistics();

    const diagnostics = vscode.languages.getDiagnostics();

    for (const [uri, diagnosticList] of diagnostics) {
        buildDiagnostic(diagnosticSource, diagnosticList, uri);
    }
    for (const [fsPath, severity] of Object.entries(diagnosticSource)) {
        parseDiagnostic(diagnosticState, severity, fsPath, activeEditorUri?.fsPath);
    };

    diagnosticState.severity = maxSeverity(diagnosticState);

    return convertTo2DArray(diagnosticState);
};