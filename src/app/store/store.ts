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
  reportSpotStepReducer,
  spotsListModeReducer,
  mapReducer
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
  nearbySpots?: NearbySpots;
  tutorial?: TutorialState;
  place?: Place;
  appMode?: AppModes;
  addSpotStep?: AddSpotSteps;
  reportStopStep?: ReportSpotSteps;
  spotsListMode?: SpotsListModes;
  map?: MapState;
  addSpotInfo?: Spot;
}

export const rootReducer = combineReducers<IAppState>({
  destination: destinationReducer,
  spots: spotsReducer,
  nearbySpots: nearbySpotsReducer,
  tutorial: tutorialReducer,
  place: placesReducer,
  appMode: appModeReducer,
  addSpotStep: addSpotStepReducer,
  addSpotInfo: addSpotInfoReducer,
  reportSpotStep: reportSpotStepReducer,
  spotsListMode: spotsListModeReducer,
  map: mapReducer
});
