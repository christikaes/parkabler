import { AppModeActions } from '~/actions';
import { AppModes, Action } from '~/util';

const INITIAL_STATE: AppModes = AppModes.Home;

let previousMode = AppModes.Home;

export function  appModeReducer(
    state: AppModes = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {
        case AppModeActions.SET_MODE_HOME:
            previousMode = AppModes.Home;
            return AppModes.Home;

        case AppModeActions.SET_MODE_ADDSPOT:
            previousMode = state;
            return AppModes.AddSpot;

        case AppModeActions.SET_MODE_REPORTSPOT:
            previousMode = state;
            return AppModes.ReportSpot;

        case AppModeActions.SET_MODE_SPOTSLIST:
            previousMode = AppModes.Home;
            return AppModes.SpotsList;

        case AppModeActions.SET_MODE_PREVIOUS:
            return previousMode;

        default:
            return state;
    }
}
