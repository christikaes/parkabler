import { AddSpotsActions } from '~/actions';
import { Spot, Spots, Action } from '~/util';

// TODO hydrate this initial state from localstorage
// TODO-rangle: how do I do that?
const INITIAL_STATE = [];

export function addSpotsReducer(
    state: Spots = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {
        case AddSpotsActions.ADD_SPOT:
            return [...state, action.payload];

        default:
            return state;
    }
}
