import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '~/store';


@Injectable()
export class MapActions {
  static SET_CENTER = 'PA/MAP/SET/CENTER';
  static SET_ZOOM = 'PA/MAP/SET/ZOOM';
  static SET_INTERACTABLE = 'PA/MAP/SET/INTERACTABLE';
  static SET_ADD_SPOT_OVERLAY = 'PA/MAP/SET/ADD_SPOT_OVERLAY'

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

  public setInteractable(interactable: boolean) {
    if (this.ngRedux.getState().map.interactable !== interactable) {
      this.ngRedux.dispatch({
        type: MapActions.SET_INTERACTABLE,
        payload: interactable
      });
    }
  }

  public setAddSpotOverlay(addSpotOverlay: boolean) {
    if (this.ngRedux.getState().map.addSpotOverlay !== addSpotOverlay) {
      this.ngRedux.dispatch({
        type: MapActions.SET_ADD_SPOT_OVERLAY,
        payload: addSpotOverlay
      });
    }
  }
}
