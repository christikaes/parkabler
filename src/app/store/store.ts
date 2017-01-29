import { combineReducers } from 'redux';
import {
  destinationReducer,
  Position
} from './reducers';

// 'assemble' the full store out of modules
export interface IAppState {
  destination?: Position;
}

export const rootReducer = combineReducers<IAppState>({
  destination: destinationReducer
});
