import { SpotsReportActions } from '~/actions';
import { Action } from '~/util';

const turfHelper = require('@turf/helpers');

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
