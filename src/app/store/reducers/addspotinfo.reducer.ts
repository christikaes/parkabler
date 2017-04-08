import { AddSpotInfoActions } from '~/actions';
import { Spot, Action } from '~/util';

const INITIAL_STATE: Spot = null;

export function addSpotInfoReducer(
    state: Spot = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {
        case AddSpotInfoActions.SET_INFO:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
