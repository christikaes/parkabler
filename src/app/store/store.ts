import { combineReducers } from 'redux';
import {
  destinationReducer,
  spotsReducer,
  nearbySpotsReducer,
  tutorialReducer,
  placesReducer,
  appModeReducer,
  addSpotStepReducer,
  reportSpotStepReducer,
  spotsListModeReducer,
  mapReducer
} from './reducers';

import {
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
}

export const rootReducer = combineReducers<IAppState>({
  destination: destinationReducer,
  spots: spotsReducer,
  nearbySpots: nearbySpotsReducer,
  tutorial: tutorialReducer,
  place: placesReducer,
  appMode: appModeReducer,
  addSpotStep: addSpotStepReducer,
  reportSpotStep: reportSpotStepReducer,
  spotsListMode: spotsListModeReducer,
  map: mapReducer
});
