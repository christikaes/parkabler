import { DestinationActions } from '~/actions';
import { Action } from '~/util';

const INITIAL_STATE: GeoJSON.Position = [-71.059096, 42.350530];

export function destinationReducer(
  state: GeoJSON.Position = INITIAL_STATE,
  action: Action
) {
  switch (action.type) {
    case DestinationActions.SET:
      return [...action.payload];
    default:
      return state;
  }
};
