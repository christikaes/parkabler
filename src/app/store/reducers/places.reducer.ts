import { PlacesActions } from '~/actions';
import { Place, PlaceCollection, Action } from '~/util';

const INITIAL_STATE: Place = null;

export function placesReducer(
  state: Place = INITIAL_STATE,
  action: Action
) {
  switch (action.type) {

    case PlacesActions.SET:
      return action.payload;

    default:
      return state;
  }
};
