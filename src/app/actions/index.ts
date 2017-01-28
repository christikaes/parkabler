import { SpotsActions } from './spots.actions';
import { DestinationActions } from './destination.actions';
import { NearbySpotsActions } from './nearby-spots.actions';

export const ACTION_PROVIDERS = [
  SpotsActions,
  DestinationActions,
  NearbySpotsActions
];

export {
  SpotsActions,
  DestinationActions,
  NearbySpotsActions
};
