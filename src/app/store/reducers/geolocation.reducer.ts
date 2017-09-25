import { GeolocationActions } from '~/actions';
import { Action } from '~/util';

export interface GeolocationState {
  isAvailable?: boolean;
  coordinates?: GeoJSON.Position;
}

const INITIAL_STATE = {
  isAvailable: false,
  coordinates: null
};

export function geolocationReducers(
  state: GeolocationState = INITIAL_STATE,
  action: Action
) {
  switch (action.type) {
    case GeolocationActions.SET:
      return Object.assign({}, state, { coordinates: action.payload });
    case GeolocationActions.UPDATE_AVAILABILITY:
      return Object.assign({}, state, { isAvailable: action.payload });
    default:
      return state;
  }
}
