import { SpotsReportActions } from '~/actions';
import { Action } from '~/util';

const turf = require('turf');
const turfMeta = require('@turf/meta');
const turfHelper = require('@turf/helpers');

// TODO hydrate this initial state from localstorage
// TODO-rangle: how do I do that?
const INITIAL_STATE = turfHelper.featureCollection([]);

export function spotsReportReducer(
    state: GeoJSON.FeatureCollection<GeoJSON.Point>  = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {

        case SpotsReportActions.ADD:
            let addSpotFeatures = [...state.features, action.payload];
            return turfHelper.featureCollection(addSpotFeatures);

        case SpotsReportActions.REMOVE:
            let removeSpotFeatures = state.features.filter((spot: GeoJSON.Feature<GeoJSON.Point>) => {
                return spot.geometry.coordinates !== action.payload.geometry.coordinates;
            });
            return turfHelper.featureCollection([...removeSpotFeatures]);

        default:
            return state;
    }
}
