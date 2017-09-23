import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '~/store';
import { SpotsDatabaseService } from '~/services';
import { Spot } from '~/util';
import { SpotsAddActions, SpotsReportActions } from '~/actions';

const turfMeta = require('@turf/meta');
const turfHelper = require('@turf/helpers');

@Injectable()
export class SpotsDatabaseActions {
    static GET = 'PA/SPOTS/DATABASE/GET';
    static UPDATE = 'PA/SPOTS/DATABASE/UPDATE';

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private spotsService: SpotsDatabaseService
    ) { }

    public getSpots() {
        this.ngRedux.dispatch({
            type: SpotsDatabaseActions.GET
        });
        this.spotsService.get()
            .subscribe((spots: any[]) => {
                // Save the key as a prop
                spots.forEach(spot => {
                    spot.id = spot.$key;
                });

                this.updateSpots(spots);
            });
    }

    private updateSpots(spots: GeoJSON.Feature<GeoJSON.Point>[]) {

        const spotsFeatureCollection = turfHelper.featureCollection(spots);

        this.databaseSpotsUpdated(
            spotsFeatureCollection,
            this.ngRedux.getState().spotsAdd,
            this.ngRedux.getState().spotsReport
        );

        this.ngRedux.dispatch({
            type: SpotsDatabaseActions.UPDATE,
            payload: spotsFeatureCollection
        });
    }

    // When the databaseSpots update, we need to sync up the addSpots and reportSpots
    private databaseSpotsUpdated = function (
        databaseSpots: GeoJSON.FeatureCollection<GeoJSON.Point>,
        addSpots: GeoJSON.FeatureCollection<GeoJSON.Point>,
        reportSpots: GeoJSON.FeatureCollection<GeoJSON.Point>
    ) {

        // For each one of the databaseSpots, check to see if there's an addSpot/reportSpot that can be removed
        // Check approximate lat/lng, and exact other props
        turfMeta.featureEach(databaseSpots, (databaseSpot: GeoJSON.Feature<GeoJSON.Point>) => {

            // Go through the addSpot to see if we can remove any AddedSpots because we have it in our db
            turfMeta.featureEach(addSpots, (addSpot: GeoJSON.Feature<GeoJSON.Point>) => {
                // Assume it is the same spot if it is approximately equal
                if ((databaseSpot.geometry.coordinates === addSpot.geometry.coordinates)
                    && (databaseSpot.properties === addSpot.properties)) {

                    // Let the user know that the spot they added has been added to our database
                    alert('Your spot has been added to our database, thankyou!');

                    // Remove the spot from the addSpots list
                    this.ngRedux.dispatch({
                        type: SpotsAddActions.REMOVE,
                        payload: addSpot
                    });
                }
            });

            // Go through the reportSpot to see if we can remove any reportedSpots because we have it in our db
            turfMeta.featureEach(reportSpots, (reportSpot: GeoJSON.Feature<GeoJSON.Point>) => {
                // Assume it is the same spot if it is approximately equal
                if ((databaseSpot.geometry.coordinates === reportSpot.geometry.coordinates)
                    && (databaseSpot.properties === reportSpot.properties)) {

                    // Let the user know that the spot they added has been added to our database
                    alert('Your report has been added to our database, thankyou!');

                    // Remove the spot from the reportSpots list
                    this.ngRedux.dispatch({
                        type: SpotsReportActions.REMOVE,
                        payload: reportSpot
                    });
                }
            });
        });
    };

}
