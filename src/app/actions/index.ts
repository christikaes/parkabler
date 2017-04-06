import { DestinationActions } from './destination.actions';
import { SpotsActions } from './spots.actions';
import { NearbySpotsActions } from './nearbyspots.actions';
import { TutorialActions } from './tutorial.actions';
import { PlacesActions } from './places.actions';
import { AppModeActions } from './appmode.actions';
import { AddSpotStepActions } from './addspotstep.actions';
import { ReportSpotStepActions } from './reportspotstep.actions';
import { SpotsListModeActions } from './spotslistmode.actions';
import { MapActions } from './map.actions';

export const ACTION_PROVIDERS = [
  DestinationActions,
  SpotsActions,
  NearbySpotsActions,
  PlacesActions,
  TutorialActions,
  AppModeActions,
  AddSpotStepActions,
  ReportSpotStepActions,
  SpotsListModeActions,
  MapActions
];

export {
  DestinationActions,
  SpotsActions,
  NearbySpotsActions,
  PlacesActions,
  TutorialActions,
  AppModeActions,
  AddSpotStepActions,
  ReportSpotStepActions,
  SpotsListModeActions,
  MapActions
};
