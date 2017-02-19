import { DestinationActions } from './destination.actions';
import { SpotsActions } from './spots.actions';
import { NearbySpotsActions } from './nearbyspots.actions';

export const ACTION_PROVIDERS = [
  DestinationActions,
  SpotsActions,
  NearbySpotsActions
];

export {
  DestinationActions,
  SpotsActions,
  NearbySpotsActions
};
