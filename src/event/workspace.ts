import * as vscode from 'vscode';
import * as Type from '../type/type.d';
import * as update from '../configuration/update';
import Error from '../util/error';
import { prepareRenderGroup } from '../editor/editor';
import { CONFIG_SECTION_KEY } from '../constant/enum';
import { clearDecorationState } from '../editor/decoration/handler';
import { resetAllDecoration } from '../editor/decoration/decoration';

const configChanged: Type.DecorationEventFunc = ({ configInfo, decorationState}): vscode.Disposable => {
    return vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
        if (event) {
            
            const sectionName = update.sectionList.find(section => {
                return event.affectsConfiguration(configInfo.name + '.' + section);
            });

            if (sectionName) {
                console.log('????')
                update.sectionChanged()[sectionName](configInfo);
                update.sectionChanged()[CONFIG_SECTION_KEY.GENERAL](configInfo);
                prepareRenderGroup(configInfo);
                resetAllDecoration(decorationState);
                clearDecorationState(decorationState);
            }

            if (Error.check()) {
                Error.notify(2000);
            }
        }
    });
};

export {
    configChanged
};