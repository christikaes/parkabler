import { DestinationActions } from './destination.actions';
import { SpotsActions } from './spots.actions';
import { NearbySpotsActions } from './nearbyspots.actions';
import { TutorialActions } from './tutorial.actions';
import { PlacesActions } from './places.actions';
import { AppModeActions } from './appmode.actions';
import { AddSpotStepActions } from './addspotstep.actions';
import { AddSpotInfoActions } from './addspotinfo.actions';
import { AddSpotsActions } from './addspots.actions';
import { ReportSpotStepActions } from './reportspotstep.actions';
import { SpotsListModeActions } from './spotslistmode.actions';
import { GeolocationActions } from './geolocation.actions';
import { MapActions } from './map.actions';

export const ACTION_PROVIDERS = [
  DestinationActions,
  SpotsActions,
  NearbySpotsActions,
  TutorialActions,
  AppModeActions,
  AddSpotStepActions,
  AddSpotInfoActions,
  AddSpotsActions,
  ReportSpotStepActions,
  SpotsListModeActions,
  GeolocationActions,
  MapActions,
  PlacesActions
];

export {
  DestinationActions,
  SpotsActions,
  NearbySpotsActions,
  TutorialActions,
  AppModeActions,
  AddSpotStepActions,
  AddSpotInfoActions,
  AddSpotsActions,
  ReportSpotStepActions,
  SpotsListModeActions,
  GeolocationActions,
  MapActions,
  PlacesActions
};
