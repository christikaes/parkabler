import { DestinationActions } from '~/actions';
import { Position } from '~/util';

const INITIAL_STATE: Position = {
  lat: 42.350530,
  lng: -71.059096
};

export function destinationReducer(
  state: Position = INITIAL_STATE,
  action: any
) {
  switch (action.type) {
    case DestinationActions.SET:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
