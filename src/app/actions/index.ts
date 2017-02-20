import { DestinationActions } from './destination.actions';
import { SpotsActions } from './spots.actions';
import { NearbySpotsActions } from './nearbyspots.actions';
import { TutorialActions } from './tutorial.actions';
import { PlacesActions } from './places.actions';

export const ACTION_PROVIDERS = [
  DestinationActions,
  SpotsActions,
  NearbySpotsActions,
  TutorialActions,
  PlacesActions
];

export {
  DestinationActions,
  SpotsActions,
  NearbySpotsActions,
  TutorialActions,
  PlacesActions
};
