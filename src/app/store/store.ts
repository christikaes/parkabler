import { combineReducers } from 'redux';
import {
  destinationReducer,
  spotsReducer,
  nearbySpotsReducer,
  tutorialReducer,
  placesReducer,
  appModeReducer,
  addSpotModeReducer,
  reportSpotModeReducer,
  spotsListModeReducer
} from './reducers';

import {
  Position,
  Spots,
  NearbySpots,
  Place,
  AppModes,
  AddSpotModes,
  ReportSpotModes,
  SpotsListModes,
  TutorialState
} from '~/util';

// 'assemble' the full store out of modules
export interface IAppState {
  destination?: Position;
  spots?: Spots;
  nearbySpots?: NearbySpots;
  tutorial?: TutorialState;
  place?: Place;
  appMode?: AppModes;
  addSpotMode?: AddSpotModes;
  reportSpotMode?: ReportSpotModes;
  spotsListMode?: SpotsListModes;
}

export const rootReducer = combineReducers<IAppState>({
  destination: destinationReducer,
  spots: spotsReducer,
  nearbySpots: nearbySpotsReducer,
  tutorial: tutorialReducer,
  place: placesReducer,
  appMode: appModeReducer,
  addSpotMode: addSpotModeReducer,
  reportSpotMode: reportSpotModeReducer,
  spotsListMode: spotsListModeReducer
});
