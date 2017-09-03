import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '~/store';


@Injectable()
export class MapActions {
  static SET_CENTER = 'PA/MAP/SET/CENTER';
  static SET_ZOOM = 'PA/MAP/SET/ZOOM';

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  public setZoom(zoom: number) {
    if (this.ngRedux.getState().map.zoom !== zoom) {
      this.ngRedux.dispatch({
        type: MapActions.SET_ZOOM,
        payload: zoom
      });
    }
  }

  public setCenter(center: GeoJSON.Position) {
    if (this.ngRedux.getState().map.center !== center) {
      this.ngRedux.dispatch({
        type: MapActions.SET_CENTER,
        payload: center
      });
    }
  }

}
