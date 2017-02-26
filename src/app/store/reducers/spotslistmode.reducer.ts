import { SpotsListModeActions } from '~/actions';
import { SpotsListModes, Action } from '~/util';

const INITIAL_STATE: SpotsListModes = 'closed';

export function spotsListModeReducer(
    state: SpotsListModes = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {
        case SpotsListModeActions.SET_MODE_OPEN:
            return 'open';

        case SpotsListModeActions.SET_MODE_CLOSED:
            return 'closed';

        case SpotsListModeActions.SET_MODE_EXPANDED:
            return 'expanded';

        default:
            return state;
    }
}
