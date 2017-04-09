import { combineReducers } from 'redux';
import {
  spotsReducer,
  nearbySpotsReducer,
  tutorialReducer,
  placesReducer,
  appModeReducer,
  addSpotStepReducer,
  addSpotInfoReducer,
  addSpotsReducer,
  reportSpotStepReducer,
  spotsListModeReducer,
  destinationReducer, DestinationState,
  mapReducer, MapState,
  geolocationReducers, GeolocationState
} from './reducers';

import {
  Spot,
  Spots,
  NearbySpots,
  Place,
  AppModes,
  AddSpotSteps,
  ReportSpotSteps,
  SpotsListModes,
  TutorialState
} from '~/util';

// 'assemble' the full store out of modules
export interface IAppState {
  destination?: DestinationState;
  spots?: Spots;
  addSpots?: Spots;
  nearbySpots?: NearbySpots;
  tutorial?: TutorialState;
  place?: Place;
  appMode?: AppModes;
  addSpotStep?: AddSpotSteps;
  reportStopStep?: ReportSpotSteps;
  spotsListMode?: SpotsListModes;
  map?: MapState;
  addSpotInfo?: Spot;
  geolocation?: GeolocationState;
}

export const rootReducer = combineReducers<IAppState>({
  destination: destinationReducer,
  spots: spotsReducer,
  addSpots: addSpotsReducer,
  nearbySpots: nearbySpotsReducer,
  tutorial: tutorialReducer,
  place: placesReducer,
  appMode: appModeReducer,
  addSpotStep: addSpotStepReducer,
  addSpotInfo: addSpotInfoReducer,
  reportSpotStep: reportSpotStepReducer,
  spotsListMode: spotsListModeReducer,
  map: mapReducer,
  geolocation: geolocationReducers
});
