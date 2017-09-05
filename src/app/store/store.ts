import { combineReducers } from 'redux';
import {
  spotsReducer,
  spotsDatabaseReducer,
  spotsAddReducer,
  spotsReportReducer,
  spotsNearbyReducer,
  placesReducer,
  appModeReducer,
  spotsListModeReducer,
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
  spotsListMode?: SpotsListModes;
  map?: MapState;
  geolocation?: GeolocationState;
  userID?: string;
  spot?: Spot2
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
  spotsListMode: spotsListModeReducer,
  map: mapReducer,
  geolocation: geolocationReducers,
  userID: userIDReducer,
  spot: spotReducer
});
