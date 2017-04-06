import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '~/store';
import { MapModes } from '~/util';


@Injectable()
export class MapActions {
  static SET_CENTER = 'PA/MAP/SET/CENTER';
  static SET_ZOOM = 'PA/MAP/SET/ZOOM';
  static SET_MODE = 'PA/MAP/SET/MODE';

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {}

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

  public setMode(mode: MapModes) {
    if (this.ngRedux.getState().map.mode !== mode) {
      this.ngRedux.dispatch({
        type: MapActions.SET_MODE,
        payload: mode
      });
    }
  }
}
