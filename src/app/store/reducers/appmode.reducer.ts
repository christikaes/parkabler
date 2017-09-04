import { AppModeActions } from '~/actions';
import { AppModes, Action } from '~/util';

const INITIAL_STATE: AppModes = AppModes.Home;

let previousMode = AppModes.Home;

export function appModeReducer(
    state: AppModes = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {
        case AppModeActions.SET_MODE_HOME:
            previousMode = AppModes.Home;
            return AppModes.Home;

        case AppModeActions.SET_MODE_ADD:
            previousMode = state;
            return AppModes.Add;

        case AppModeActions.SET_MODE_EDIT:
            previousMode = state;
            return AppModes.Edit;

        case AppModeActions.SET_MODE_SEARCH:
            previousMode = AppModes.Home;
            return AppModes.Search;

        case AppModeActions.SET_MODE_NAVIGATE:
            previousMode = AppModes.Home;
            return AppModes.Navigate;

        case AppModeActions.SET_MODE_INFO:
            previousMode = AppModes.Home;
            return AppModes.Info;

        case AppModeActions.SET_MODE_PREVIOUS:
            return previousMode;

        default:
            return state;
    }
}
