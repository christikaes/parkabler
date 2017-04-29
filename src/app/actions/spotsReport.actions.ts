import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '~/store';
import { AddSpotsService } from '~/services';
import { SpotsAddActions } from '~/actions';

const turf = require('turf');
const turfMeta = require('@turf/meta');
const turfHelper = require('@turf/helpers');

@Injectable()
export class SpotsReportActions {
    static ADD = 'PA/SPOTS/REPORT/ADD';
    static REMOVE = 'PA/SPOTS/REPORT/REMOVE';

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private reportSpotsService: AddSpotsService
    ) {};

    public addSpot(reportSpot) {
        const spotsAdd = this.ngRedux.getState().spotsAdd;

        // When the reportSpots update, we want to update the addSpots if the same point is updated
        turfMeta.featureEach(spotsAdd, (addSpot: GeoJSON.Feature<GeoJSON.Point>) => {
            // The spot reported was added by the user, modify the addedSpot
            if (reportSpot.geometry === addSpot.geometry) {
                this.ngRedux.dispatch({
                    type: SpotsAddActions.UPDATE,
                    payload: reportSpot
                });
            }
        });

        // Add to the reportSpot state
        this.ngRedux.dispatch({
            type: SpotsReportActions.ADD,
            payload: reportSpot
        });

        // Send the update to the server
        this.reportSpotsService.addSpot(reportSpot);
    }

}
