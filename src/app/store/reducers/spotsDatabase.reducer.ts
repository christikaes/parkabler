import { SpotsDatabaseActions } from '~/actions';
import { Action } from '~/util';

const turf = require('turf');
const turfMeta = require('@turf/meta');
const turfHelper = require('@turf/helpers');

// TODO hydrate this initial state from localstorage
// TODO-rangle: how do I do that?
const INITIAL_STATE = turfHelper.featureCollection([]);

export function spotsDatabaseReducer(
    state: GeoJSON.FeatureCollection<GeoJSON.Point> = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {
        case SpotsDatabaseActions.UPDATE_SPOTS:
            return turfHelper.featureCollection(action.payload.features);

        default:
            return state;
    }
}
