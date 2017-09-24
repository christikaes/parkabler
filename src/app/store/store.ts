import { combineReducers } from 'redux';
import {
  spotsReducer,
  spotsDatabaseReducer,
  spotsAddReducer,
  spotsReportReducer,
  spotsNearbyReducer,
  placesReducer,
  appModeReducer,
  destinationReducer, DestinationState,
  mapReducer, MapState,
  geolocationReducers, GeolocationState,
  userIDReducer,
  spotReducer
} from './reducers';

import {
  Spot,
  Spot2,
  Place,
  AppModes,
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
  map?: MapState;
  geolocation?: GeolocationState;
  userID?: string;
  spot?: string;
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
  map: mapReducer,
  geolocation: geolocationReducers,
  userID: userIDReducer,
  spot: spotReducer
});
