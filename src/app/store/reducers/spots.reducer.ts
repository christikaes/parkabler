import { SpotsActions } from '~/actions';
import { Spot, Spots, Action } from '~/util';

// TODO hydrate this initial state from localstorage
// TODO-rangle: how do I do that?
const INITIAL_STATE = [];

export function spotsReducer(
    state: Spots = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {

        case SpotsActions.UPDATE_SPOTS:
            return [...action.payload];

        case SpotsActions.ADD_SPOT:
            return [...state, action.payload];

        case SpotsActions.REMOVE_SPOT_BY_KEY:
            return state.filter((spot: Spot) => {
                return spot.key !== action.payload;
            });

        case SpotsActions.UPDATE_SPOT:
            return state.map((spot: Spot) => {
                return spot.key === action.payload.key ?
                    Object.assign({}, spot, action.payload)
                    : spot;
            });

        default:
            return state;
    }
}
