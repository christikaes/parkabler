import { NearbySpots, Action } from '~/util';
import { NearbySpotsActions } from '~/actions';

const turf = require('turf');
const turfMeta = require('@turf/meta');
const turfHelper = require('@turf/helpers');

// TODO hydrate this initial state from localstorage
// TODO-rangle: how do I do that?
const INITIAL_STATE = turfHelper.featureCollection([]);

export function nearbySpotsReducer(
    state: GeoJSON.FeatureCollection<GeoJSON.Point> = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {
        case NearbySpotsActions.UPDATE:
            return turfHelper.featureCollection(action.payload.features);

        default:
            return state;
    }
}
