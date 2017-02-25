import { AppModeActions } from '~/actions';
import { AppModes, Action } from '~/util';

const INITIAL_STATE: AppModes = AppModes.Home;

export function appModeReducer(
    state: AppModes = INITIAL_STATE,
    action: Action
) {
    console.log(action.type);
    switch (action.type) {
        case AppModeActions.SET_MODE_HOME:
            return AppModes.Home;

        case AppModeActions.SET_MODE_ADDSPOT:
            return AppModes.AddSpot;

        default:
            return state;
    }
}
