import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '~/store';
import { AddSpotsService } from '~/services';
import { Spot2 } from '~/util';

const turfHelper = require('@turf/helpers');

@Injectable()
export class SpotsAddActions {
    static ADD = 'PA/SPOTS/ADD/ADD';
    static REMOVE = 'PA/SPOTS/ADD/REMOVE';
    static UPDATE = 'PA/SPOTS/ADD/UPDATE';

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private addSpotsService: AddSpotsService
    ) { };

    public addSpot(newSpot: Spot2) {
        this.ngRedux.dispatch({
            type: SpotsAddActions.ADD,
            payload: newSpot
        });

        this.addSpotsService.addSpot(newSpot);
    }
}
