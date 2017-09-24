import { Action } from '~/util';
import { MapActions } from '~/actions';

export interface MapState {
    center: GeoJSON.Position;
    zoom: number;
    interactable: boolean;
    addSpotOverlay: boolean;
}

const INITIAL_STATE = {
    center: [-71.06, 42.36],
    zoom: 13,
    interactable: true,
    addSpotOverlay: false
};

export function mapReducer(
    state: MapState = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {
        case MapActions.SET_CENTER:
            return Object.assign({}, state, { center: action.payload });

        case MapActions.SET_ZOOM:
            return Object.assign({}, state, { zoom: action.payload });

        case MapActions.SET_INTERACTABLE:
            return Object.assign({}, state, { interactable: action.payload });

        case MapActions.SET_ADD_SPOT_OVERLAY:
            return Object.assign({}, state, { addSpotOverlay: action.payload });

        default:
            return state;
    }
}
