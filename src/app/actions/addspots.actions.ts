import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '~/store';
import { AddSpotsService } from '~/services';
import { Spots, Spot } from '~/util';
import { SpotsActions } from '~/actions';

@Injectable()
export class AddSpotsActions {
    static ADD_SPOT = 'PA/ADDSPOTS/ADD/SPOT';

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private addSpotsService: AddSpotsService
    ) {};

    public addSpot() {
        let spot = this.ngRedux.getState().addSpotInfo;
        this.ngRedux.dispatch({
            type: AddSpotsActions.ADD_SPOT,
            payload: spot
        });

        this.ngRedux.dispatch({
            type: SpotsActions.ADD_SPOT,
            payload: spot
        });

        this.addSpotsService.addSpot(spot);
    }
}
