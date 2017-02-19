import { NearbySpots, Action } from '~/util';
import { NearbySpotsActions } from '~/actions';

const INITIAL_STATE = [];

export function nearbySpotsReducer(
    state: NearbySpots = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {
        case NearbySpotsActions.UPDATE:
            return [...action.payload];

        default:
            return state;
    }
}
