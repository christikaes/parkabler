import { DestinationActions } from './destination.actions';
import { SpotsActions } from './spots.actions';
import { PlacesActions } from './places.actions';
import { AppModeActions } from './appmode.actions';
import { GeolocationActions } from './geolocation.actions';
import { MapActions } from './map.actions';

export const ACTION_PROVIDERS = [
  SpotsActions,
  AppModeActions,
  GeolocationActions,
  MapActions,
  PlacesActions,
  DestinationActions
];

export {
  SpotsActions,
  AppModeActions,
  GeolocationActions,
  MapActions,
  PlacesActions,
  DestinationActions
};
