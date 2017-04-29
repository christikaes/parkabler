import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '~/store';
import { AddSpotsService } from '~/services';

const turf = require('turf');
const turfHelper = require('@turf/helpers');


@Injectable()
export class SpotsAddActions {
    static ADD_SPOT = 'PA/SPOTS/ADD/ADD/SPOT';

    // TODO-rangle: Can one action call another action's reducer? or is it better if the action calls a function on another action?
    static REMOVE_SPOT = 'PA/SPOTS/ADD/REMOVE/SPOT';
    static UPDATE_SPOT = 'PA/SPOTS/ADD/UPDATE/SPOT';

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
            type: SpotsAddActions.ADD_SPOT,
            payload: spotFeature
        });

        this.addSpotsService.addSpot(spotFeature);
    }
}
