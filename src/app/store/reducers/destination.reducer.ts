import { DestinationActions } from '~/actions';
import { Action } from '~/util';

export interface DestinationState {
  isCurrentLocation?: boolean;
  coordinates?: GeoJSON.Position;
}

const INITIAL_STATE: DestinationState = {
  isCurrentLocation: false,
  coordinates: null
};

export function destinationReducer(
  state: DestinationState = INITIAL_STATE,
  action: Action
) {
  switch (action.type) {
    case DestinationActions.SET:
      return Object.assign({}, state, {coordinates: action.payload});
    case DestinationActions.SET_IS_CURRENT_LOCATION:
      return Object.assign({}, state, {isCurrentLocation: action.payload});
    default:
      return state;
  }
};
