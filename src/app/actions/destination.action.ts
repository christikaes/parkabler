import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState, Position } from '~/store';
import { DestinationLocationService, GeolocationService } from '~/services';


@Injectable()
export class DestinationActions {
  static SET = 'PA/DESTINATION/SET';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private destinationLocationService: DestinationLocationService,
    private geoloationService: GeolocationService
  ) {}

  setDestination(destination: Position) {
    this.ngRedux.dispatch({
      type: DestinationActions.SET,
      payload: destination
    });
  }
}
