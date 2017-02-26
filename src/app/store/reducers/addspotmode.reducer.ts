import { AddSpotModeActions } from '~/actions';
import { AddSpotModes, Action } from '~/util';

const INITIAL_STATE: AddSpotModes = 'closed';

export function addSpotModeReducer(
    state: AddSpotModes = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {
        case AddSpotModeActions.SET_MODE_OPEN:
            return 'open';

        case AddSpotModeActions.SET_MODE_CLOSED:
            return 'closed';

        case AddSpotModeActions.SET_MODE_SETLOCATION:
            return 'setlocation';

        case AddSpotModeActions.SET_MODE_SETDETAILS:
            return 'setdetails';

        case AddSpotModeActions.SET_MODE_SUBMITTED:
            return 'submitted';

        default:
            return state;
    }
}
