import { SpotsAddActions } from '~/actions';
import { Action } from '~/util';

const turfMeta = require('@turf/meta');
const turfHelper = require('@turf/helpers');

const INITIAL_STATE = turfHelper.featureCollection([]);

export function spotsAddReducer(
    state: GeoJSON.FeatureCollection<GeoJSON.Point>  = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {

        case SpotsAddActions.ADD:
            const addSpotFeatures = [...state.features, action.payload];
            return turfHelper.featureCollection(addSpotFeatures);

        case SpotsAddActions.REMOVE:
            const removeSpotFeatures = state.features.filter((spot: GeoJSON.Feature<GeoJSON.Point>) => {
                return spot.geometry.coordinates !== action.payload.geometry.coordinates;
            });
            return turfHelper.featureCollection([...removeSpotFeatures]);

        case SpotsAddActions.UPDATE:
            const updateSpotFeatures = [];
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
