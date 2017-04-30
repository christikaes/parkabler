import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
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
        let spot = this.ngRedux.getState().addSpotInfo;
        let spotFeature = turfHelper.feature({
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
