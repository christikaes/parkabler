import { combineReducers } from 'redux';
import {
  destinationReducer,
  spotsReducer
} from './reducers';

import { Position, Spots } from '~/util';

// 'assemble' the full store out of modules
export interface IAppState {
  destination?: Position;
  spots?: Spots;
}

export const rootReducer = combineReducers<IAppState>({
  destination: destinationReducer,
  spots: spotsReducer
});
