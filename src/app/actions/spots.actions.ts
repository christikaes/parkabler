import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { ISpots, ISpot } from '../store/reducers';
import { SpotsService } from '../services/spots.service';

@Injectable()
export class SpotsActions {
  static REQUEST_SPOTS = 'PA/SPOTS/REQUEST';
  static ADD_SPOTS = 'PA/SPOTS/ADD/MULTIPLE';
  static ADD_SPOT = 'PA/SPOTS/ADD';
  static EDIT_SPOT = 'PA/SPOTS/EDIT';
  static REMOVE_SPOT = 'PA/SPOTS/REMOVE';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private SpotsService: SpotsService
  ) {}

  requestSpots() {
    this.ngRedux.dispatch({ type: SpotsActions.REQUEST_SPOTS });

    this.SpotsService.get()
      .subscribe((spots: ISpots) => {
        this.addSpots(spots);
      });
  }

  addSpots(spots: ISpots) {
    this.ngRedux.dispatch({
      type: SpotsActions.ADD_SPOTS,
      payload: spots
    });
  }

  addSpot(spot: ISpot) {
    this.ngRedux.dispatch({
      type: SpotsActions.ADD_SPOT,
      payload: spot
    });
  }

  removeSpot($key: number) {
    this.ngRedux.dispatch({
      type: SpotsActions.REMOVE_SPOT,
      payload: $key
    });
  }
}
