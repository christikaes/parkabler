import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '~/store';
import { GeolocationService } from '~/services';


@Injectable()
export class GeolocationActions {
  static SET = 'PA/GEOLOCATION/SET';
  static UPDATE_AVAILABILITY = 'PA/GEOLOCATION/UPDATE/AVAILABILITY';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private geolocationService: GeolocationService
  ) { }

  public watch() {
    this.geolocationService.watch();

    // Update the coordinates whenever the currentLocation changes
    let geolocationCoordinates$ = this.geolocationService.getCoordinates();
    geolocationCoordinates$.subscribe((coordinates) => {
        this.setGeolocation(coordinates);
    });

    // Update the availability whenever the the availability changes
    let geolocationAvailability$ = this.geolocationService.getAvailability();
    geolocationAvailability$.subscribe((isAvailable) => {
      this.setAvailability(isAvailable);
    });
  }

  public clearWatch() {
    this.geolocationService.clearWatch();
  }

  private setGeolocation(coordinates: GeoJSON.Position) {
    this.ngRedux.dispatch({
      type: GeolocationActions.SET,
      payload: coordinates
    });
  }

  private setAvailability(isAvailable) {
    this.ngRedux.dispatch({
      type: GeolocationActions.UPDATE_AVAILABILITY,
      payload: isAvailable
    });
  }
}
