import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '~/store';


@Injectable()
export class DestinationActions {
  static SET = 'PA/DESTINATION/SET';

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {}

  public setDestination(destination: GeoJSON.Position) {
    this.ngRedux.dispatch({
      type: DestinationActions.SET,
      payload: destination
    });
  }
}
