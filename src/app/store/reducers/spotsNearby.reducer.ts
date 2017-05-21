import { Action } from '~/util';
import { SpotsNearbyActions } from '~/actions';

const turfHelper = require('@turf/helpers');

const INITIAL_STATE = turfHelper.featureCollection([]);

export function spotsNearbyReducer(
    state: GeoJSON.FeatureCollection<GeoJSON.Point> = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {
        case SpotsNearbyActions.UPDATE:
            return turfHelper.featureCollection(action.payload.features);

        default:
            return state;
    }
}
