import { Action, MapModes } from '~/util';
import { MapActions } from '~/actions';

export interface MapState {
    center: GeoJSON.Position;
    zoom: number;
    mode: string;
}

const INITIAL_STATE = {
    center: [42.35, -71.06],
    zoom: 15,
    mode: 'street'
};

export function mapReducer(
    state: MapState = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {
        case MapActions.SET_CENTER:
            return Object.assign({}, state, {center: action.payload});

        case MapActions.SET_ZOOM:
            return Object.assign({}, state, {zoom: action.payload});

        case MapActions.SET_MODE:
            return Object.assign({}, state, {mode: action.payload});

        default:
            return state;
    }
}
