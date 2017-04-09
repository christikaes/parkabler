import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '~/store';

@Injectable()
export class DestinationActions {
  static SET = 'PA/DESTINATION/SET';
  static SET_IS_CURRENT_LOCATION = 'PA/DESTINATION/SET/ISCURRENTLOCATION';

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {}

  public setDestination(destination: GeoJSON.Position) {
    this.ngRedux.dispatch({
      type: DestinationActions.SET,
      payload: destination
    });
    this.setCurrentLocation(false);
  }

  public setToCurrentLocation() {
    let currentLocation = this.ngRedux.getState().geolocation.coordinates;
    this.ngRedux.dispatch({
      type: DestinationActions.SET,
      payload: currentLocation
    });
    this.setCurrentLocation(true);
  }

  private setCurrentLocation(isCurrentLocation: boolean) {
    this.ngRedux.dispatch({
      type: DestinationActions.SET_IS_CURRENT_LOCATION,
      payload: isCurrentLocation
    });
  }
}
