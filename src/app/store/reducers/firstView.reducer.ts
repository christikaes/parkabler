import { MapActions } from '~/actions';
import { Action } from '~/util';

const INITIAL_STATE = true;

// Sets the firstView after the firs time the user interacts with the app
export function firstViewReducer(
    state: boolean = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {
        case MapActions.SET_CENTER:
            return false;

        default:
            return state;
    }
}
