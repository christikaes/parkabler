import { combineReducers } from 'redux';
import {
  spotsReducer, Spots, Spot, SpotsState,
  placesReducer,
  appModeReducer,
  destinationReducer, DestinationState,
  mapReducer, MapState,
  geolocationReducers, GeolocationState,
  userIDReducer
} from './reducers';

export { Spots, Spot };

import {
  Place,
  AppModes,
} from '~/util';

// 'assemble' the full store out of modules
export interface IAppState {
  destination?: DestinationState;
  spots?: SpotsState;
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
  place: placesReducer,
  appMode: appModeReducer,
  map: mapReducer,
  geolocation: geolocationReducers,
  userID: userIDReducer
});
