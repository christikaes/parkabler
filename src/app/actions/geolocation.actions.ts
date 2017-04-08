import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '~/store';
import { GeolocationService } from '~/services';


@Injectable()
export class GeolocationActions {
  static SET = 'PA/GEOLOCATION/SET';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private geolocationService: GeolocationService
  ) { }

  public watch() {
    this.geolocationService.watch();
    let geolocation$ = this.geolocationService.get();
    geolocation$.subscribe((coordinates) => {
        this.setGeolocation(coordinates);
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
}
