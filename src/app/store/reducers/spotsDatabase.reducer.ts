import { SpotsDatabaseActions } from '~/actions';
import { Action } from '~/util';

const turfHelper = require('@turf/helpers');

const INITIAL_STATE = turfHelper.featureCollection([]);

export function spotsDatabaseReducer(
    state: GeoJSON.FeatureCollection<GeoJSON.Point> = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {
        case SpotsDatabaseActions.UPDATE:
            return turfHelper.featureCollection(action.payload.features);

        default:
            return state;
    }
}
