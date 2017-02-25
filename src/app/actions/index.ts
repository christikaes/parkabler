import { DestinationActions } from './destination.actions';
import { SpotsActions } from './spots.actions';
import { NearbySpotsActions } from './nearbyspots.actions';
import { TutorialActions } from './tutorial.actions';
import { PlacesActions } from './places.actions';
import { AppModeActions } from './appmode.actions';
import { AddSpotModeActions } from './addspotmode.actions';
import { ReportSpotModeActions } from './reportspotmode.actions';
import { SpotsListModeActions } from './spotslistmode.actions';

export const ACTION_PROVIDERS = [
  DestinationActions,
  SpotsActions,
  NearbySpotsActions,
  PlacesActions,
  TutorialActions,
  AppModeActions,
  AddSpotModeActions,
  ReportSpotModeActions,
  SpotsListModeActions
];

export {
  DestinationActions,
  SpotsActions,
  NearbySpotsActions,
  PlacesActions,
  TutorialActions,
  AppModeActions,
  AddSpotModeActions,
  ReportSpotModeActions,
  SpotsListModeActions
};
