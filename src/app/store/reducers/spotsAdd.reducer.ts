import { SpotsAddActions } from '~/actions';
import { Action } from '~/util';

const turf = require('turf');
const turfMeta = require('@turf/meta');
const turfHelper = require('@turf/helpers');

// TODO hydrate this initial state from localstorage
// TODO-rangle: how do I do that?
const INITIAL_STATE = turfHelper.featureCollection([]);

export function spotsAddReducer(
    state: GeoJSON.FeatureCollection<GeoJSON.Point>  = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {

        case SpotsAddActions.ADD_SPOT:
            let addSpotFeatures = [...state.features, action.payload];
            return turfHelper.featureCollection(addSpotFeatures);

        case SpotsAddActions.REMOVE_SPOT:
            let removeSpotFeatures = state.features.filter((spot: GeoJSON.Feature<GeoJSON.Point>) => {
                return spot.geometry.coordinates !== action.payload.geometry.coordinates;
            });
            return turfHelper.featureCollection([...removeSpotFeatures]);

        case SpotsAddActions.UPDATE_SPOT:
            let updateSpotFeatures = [];
            state.features.forEach((spot: GeoJSON.Feature<GeoJSON.Point>) => {
                if (spot.geometry.coordinates === action.payload.geometry.coordinates) {
                    spot.properties = action.payload.properties;
                }
                updateSpotFeatures.push(spot);
            });
            return turfHelper.featureCollection([...updateSpotFeatures]);

        default:
            return state;
    }
}
