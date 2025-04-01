import * as Type from '../../type/type';
import * as __0x from '../../constant/shared/numeric';
import { hightlightCoordinator } from './highlight/highlight';
import { renderGroupIs } from '../editor';



const clearDecorationState = (decorationState: Type.DecorationStateType) => {
    decorationState.appliedHighlight[0] = __0x.reset;
    // decorationState.selectionInfo = [];
    // decorationState.diagnosticInfo = [];
    // decorationState.statusText = [];
};

const renderDecorationOnEditor = ({ editor, decorationState }: Type.DecorationContext) => {

    // renderGroupIs(editor, decorationState.appliedHighlight[0]);

    // decorationState.appliedHighlight[0] = renderGroup.highlight;

    
};

export {
    clearDecorationState,
    renderDecorationOnEditor,

};
