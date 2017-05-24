import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '~/store';
import { AddSpotsService } from '~/services';

const turfHelper = require('@turf/helpers');


@Injectable()
export class SpotsAddActions {
    static ADD = 'PA/SPOTS/ADD/ADD';

    // TODO-rangle: Can one action call another action's reducer? or is it better if the action calls a function on another action?
    static REMOVE = 'PA/SPOTS/ADD/REMOVE';
    static UPDATE = 'PA/SPOTS/ADD/UPDATE';

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private addSpotsService: AddSpotsService
    ) {};

    public addSpot() {
        const spot = this.ngRedux.getState().addSpotInfo;
        const spotFeature = turfHelper.feature({
            type: 'Point',
            coordinates: spot.coordinates
        }, {
            numspots: spot.numspots
        });

        this.ngRedux.dispatch({
            type: SpotsAddActions.ADD,
            payload: spotFeature
        });

        this.addSpotsService.addSpot(spotFeature);
    }
}
