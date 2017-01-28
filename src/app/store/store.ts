import { combineReducers } from 'redux';
import {
  spotsReducer,
  nearbySpotsReducer,
  destinationReducer,
  ISpots,
  Position,
  INearbySpot,
  INearbySpots
} from './reducers';


/*
 * This is where we 'assemble' the
 * full store out of its modules.
 */
export interface IAppState {
  spots?: ISpots;
  destination?: Position;
  nearbySpots?: INearbySpots;
};

export const rootReducer = combineReducers<IAppState>({
  spots: spotsReducer,
  destination: destinationReducer,
  nearbySpots: nearbySpotsReducer
});
