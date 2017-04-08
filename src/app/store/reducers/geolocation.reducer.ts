import { GeolocationActions } from '~/actions';
import { Action } from '~/util';

const INITIAL_STATE: GeoJSON.Position = null;

export function geolocationReducers(
  state: GeoJSON.Position = INITIAL_STATE,
  action: Action
) {
  switch (action.type) {
    case GeolocationActions.SET:
      return [...action.payload];
    default:
      return state;
  }
};
