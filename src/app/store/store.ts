import { combineReducers } from 'redux';
import {
  destinationReducer,
  spotsReducer,
  nearbySpotsReducer
} from './reducers';

import { Position, Spots, NearbySpots } from '~/util';

// 'assemble' the full store out of modules
export interface IAppState {
  destination?: Position;
  spots?: Spots;
  nearbySpots?: NearbySpots;
}

export const rootReducer = combineReducers<IAppState>({
  destination: destinationReducer,
  spots: spotsReducer,
  nearbySpots: nearbySpotsReducer
});
