import { NearbySpotsActions } from '../../actions';
import { Position } from '../../services/geolocation.service';

interface INearbySpot extends Position {
  $key: number;
  distanceToDest: number;
}

type INearbySpots = INearbySpot[];

const INITIAL_STATE: INearbySpots = [];

export function nearbySpotsReducer(
  state: INearbySpots = INITIAL_STATE,
  action: any
) {
  switch (action.type) {
    case NearbySpotsActions.UPDATE:
      return [...action.payload];

    default:
      return state;
  }
}

export {
  INearbySpot,
  INearbySpots
};
