import { combineReducers } from 'redux';
import {
  destinationReducer,
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
  mapReducer,
  geolocationReducers
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
  TutorialState,
  MapState
} from '~/util';

// 'assemble' the full store out of modules
export interface IAppState {
  destination?: GeoJSON.Position;
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
  geolocation?: GeoJSON.Position;
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
