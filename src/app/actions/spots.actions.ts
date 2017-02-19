import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '~/store';
import { SpotsService } from '~/services';
import { Spots, Spot } from '~/util';

@Injectable()
export class SpotsActions {
    static GET_SPOTS = 'PA/SPOTS/GET/SPOTS';
    static UPDATE_SPOTS = 'PA/SPOTS/UPDATE/SPOTS';
    static ADD_SPOT = 'PA/SPOTS/ADD/SPOT';
    static UPDATE_SPOT = 'PA/SPOTS/UPDATE/SPOT';
    static REMOVE_SPOT_BY_KEY = 'PA/SPOTS/REMOVE/SPOT';

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private spotsService: SpotsService
    ) {};

    public getSpots() {
        this.ngRedux.dispatch({
            type: SpotsActions.GET_SPOTS
        });
        this.spotsService.get()
            .subscribe((spots: Spots) => {
                this.updateSpots(spots);
            });
    }

    public updateSpots(spots: Spots) {
        this.ngRedux.dispatch({
            type: SpotsActions.UPDATE_SPOTS,
            payload: spots
        });
    }

    public addSpot(spot: Spot) {
        this.ngRedux.dispatch({
            type: SpotsActions.ADD_SPOT,
            payload: spot
        });
    }

    public removeSpotByKey(key: string) {
        this.ngRedux.dispatch({
            type: SpotsActions.REMOVE_SPOT_BY_KEY,
            payload: key
        });
    }

    public updateSpot(spot: Spot) {
        this.ngRedux.dispatch({
            type: SpotsActions.UPDATE_SPOT,
            payload: spot
        });
    }
}
