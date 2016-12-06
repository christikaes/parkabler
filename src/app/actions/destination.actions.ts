import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState, Position } from '../store';
import { DestinationLocationService }
  from '../services/destinationlocation.service';
import { GeolocationService } from '../services/geolocation.service';


@Injectable()
export class DestinationActions {
  static SET = 'PA/DESTINATION/SET';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private destinationLocatioService: DestinationLocationService,
    private geolocationService: GeolocationService
  ) {}

  setDestination(destination: Position) {
    this.ngRedux.dispatch({
      type: DestinationActions.SET,
      payload: destination
    });
  }

  resetDestination() {
    this.geolocationService.currentLocation()
      .then((position: Position) => this.setDestination(position))
      .catch(() => {
        console.error('Could not find Location');
      });
  }
}
