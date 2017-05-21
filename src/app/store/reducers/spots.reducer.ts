import { SpotsActions } from '~/actions';
import { Action } from '~/util';

const turfMeta = require('@turf/meta');
const turfHelper = require('@turf/helpers');

const INITIAL_STATE = turfHelper.featureCollection([]);


export function spotsReducer(
    state: GeoJSON.FeatureCollection<GeoJSON.Point> = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {
        case SpotsActions.UPDATE_SPOTS:
            return turfHelper.featureCollection(action.payload);

        default:
            return state;
    }
}
