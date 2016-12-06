import { SpotsActions } from '../../actions';
import { Position } from '../../services/geolocation.service';


interface ISpot extends Position {
  $key: number;
}

type ISpots = ISpot[];

const INITIAL_STATE: ISpots = [];

export function spotsReducer(state: ISpots = INITIAL_STATE, action: any) {
  switch (action.type) {
    case SpotsActions.ADD_SPOTS:
      return [...action.payload];

    case SpotsActions.ADD_SPOT:
      return [...state, action.payload];

    case SpotsActions.REMOVE_SPOT:
      return state.filter(spot =>
        spot.$key !== action.payload
      );

    case SpotsActions.EDIT_SPOT:
      return state.map(spot => {
        return spot.$key === action.payload.$key ?
          Object.assign({}, spot, action.payload)
          : spot;
      });

    default:
      return state;
  }
}

export {
  ISpot,
  ISpots
};
