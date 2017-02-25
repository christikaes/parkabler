import { ReportSpotModeActions } from '~/actions';
import { ReportSpotModes, Action } from '~/util';

const INITIAL_STATE: ReportSpotModes = 'closed';

export function reportSpotModeReducer(
    state: ReportSpotModes = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {
        case ReportSpotModeActions.SET_MODE_OPEN:
            return 'open';

        case ReportSpotModeActions.SET_MODE_CLOSED:
            return 'closed';

        case ReportSpotModeActions.SET_MODE_SETDETAILS:
            return 'setdetails';

        case ReportSpotModeActions.SET_MODE_SUBMITTED:
            return 'submitted';

        default:
            return state;
    }
}
