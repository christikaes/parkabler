import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '~/store';

@Injectable()
export class DestinationActions {
  static SET = 'PA/DESTINATION/SET';
  static SET_IS_CURRENT_LOCATION = 'PA/DESTINATION/SET/ISCURRENTLOCATION';

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  public setDestination(destination: GeoJSON.Position) {
    this.ngRedux.dispatch({
      type: DestinationActions.SET,
      payload: destination
    });
    this.setCurrentLocation(false);
  }

  public setToCurrentLocation() {
    const currentLocation = this.ngRedux.getState().geolocation.coordinates;
    this.setCurrentLocation(true);

    if (!currentLocation) {
      return;
    }

    this.ngRedux.dispatch({
      type: DestinationActions.SET,
      payload: currentLocation
    });

    // Update the places to reflect the destination
    this.ngRedux.dispatch({
      type: 'PA/PLACES/SET',
      payload: {
        text: 'me',
        place_name: 'Near me',
        geometry: {
          type: 'Point',
          coordinates: currentLocation
        },
        type: 'Feature',
        properties: null
      }
    });

    this.ngRedux.dispatch({
      type: 'PA/MAP/SET/CENTER',
      payload: currentLocation
    });

  }

  private setCurrentLocation(isCurrentLocation: boolean) {
    this.ngRedux.dispatch({
      type: DestinationActions.SET_IS_CURRENT_LOCATION,
      payload: isCurrentLocation
    });
  }
}
