import { combineReducers } from 'redux';
import {
  spotsReducer,
  spotsDatabaseReducer,
  spotsAddReducer,
  spotsReportReducer,
  spotsNearbyReducer,
  placesReducer,
  appModeReducer,
  addSpotStepReducer,
  addSpotInfoReducer,
  spotsListModeReducer,
  destinationReducer, DestinationState,
  mapReducer, MapState,
  geolocationReducers, GeolocationState
} from './reducers';

import {
  Spot,
  Place,
  AppModes,
  AddSpotSteps,
  SpotsListModes
} from '~/util';

// 'assemble' the full store out of modules
export interface IAppState {
  destination?: DestinationState;
  spots?: GeoJSON.FeatureCollection<GeoJSON.Point>;
  spotsAdd?: GeoJSON.FeatureCollection<GeoJSON.Point>;
  spotsDatabase?: GeoJSON.FeatureCollection<GeoJSON.Point>;
  spotsReport?: GeoJSON.FeatureCollection<GeoJSON.Point>;
  spotsNearby?: GeoJSON.FeatureCollection<GeoJSON.Point>;
  place?: Place;
  appMode?: AppModes;
  addSpotStep?: AddSpotSteps;
  spotsListMode?: SpotsListModes;
  map?: MapState;
  addSpotInfo?: Spot;
  geolocation?: GeolocationState;
}

export const rootReducer = combineReducers<IAppState>({
  destination: destinationReducer,
  spots: spotsReducer,
  spotsAdd: spotsAddReducer,
  spotsReport: spotsReportReducer,
  spotsDatabase: spotsDatabaseReducer,
  spotsNearby: spotsNearbyReducer,
  place: placesReducer,
  appMode: appModeReducer,
  addSpotStep: addSpotStepReducer,
  addSpotInfo: addSpotInfoReducer,
  spotsListMode: spotsListModeReducer,
  map: mapReducer,
  geolocation: geolocationReducers
});
