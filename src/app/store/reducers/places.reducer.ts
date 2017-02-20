import { PlacesActions } from '~/actions';
import { Place, PlaceCollection, PlacesState, Action } from '~/util';

const INITIAL_STATE: PlacesState = {
    autocomplete: null,
    place: null
};

export function placesReducer(
  state: PlacesState = INITIAL_STATE,
  action: Action
) {
  switch (action.type) {

    case PlacesActions.GET_AUTOCOMPLETE:
      return Object.assign({}, state, {autocomplete: action.payload});

    case PlacesActions.SET:
      return Object.assign({}, state, {place: action.payload});

    default:
      return state;
  }
};
