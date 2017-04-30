import { Injectable } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '~/store';
import { SpotsDatabaseService } from '~/services';
import { Observable } from 'rxjs';

const turfMeta = require('@turf/meta');
const turfHelper = require('@turf/helpers');


@Injectable()
export class SpotsActions {
    static UPDATE_SPOTS = 'PA/SPOTS/UPDATE';

    @select() private spotsAdd$: Observable<GeoJSON.FeatureCollection<GeoJSON.Point>>;
    @select() private spotsReport$: Observable<GeoJSON.FeatureCollection<GeoJSON.Point>>;
    @select() private spotsDatabase$: Observable<GeoJSON.FeatureCollection<GeoJSON.Point>>;

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private spotsService: SpotsDatabaseService
    ) {
        this.updateSpots();

        Observable.merge(this.spotsAdd$, this.spotsReport$, this.spotsDatabase$).subscribe(() => {
            this.updateSpots();
        });
    };

    private getUpdatedSpots(): Array<GeoJSON.Feature<GeoJSON.Point>> {

        let addSpots = this.ngRedux.getState().spotsAdd;
        let reportSpots = this.ngRedux.getState().spotsReport;
        let databaseSpots = this.ngRedux.getState().spotsDatabase;

        let spots: Array<GeoJSON.Feature<GeoJSON.Point>> = [];

        // For each one of the databaseSpots, add it to the spots
        turfMeta.featureEach(databaseSpots, (databaseSpot: GeoJSON.Feature<GeoJSON.Point>) => {
            spots.push(databaseSpot);
        });

        // For each one of the addSpots, add it to the spots
        turfMeta.featureEach(addSpots, (addSpot: GeoJSON.Feature<GeoJSON.Point>) => {
            spots.push(addSpot);
        });

        // For each one of the reportSpots, modify the spots
        turfMeta.featureEach(reportSpots, (reportSpot: GeoJSON.Feature<GeoJSON.Point>) => {
            spots.forEach((spot: GeoJSON.Feature<GeoJSON.Point>) => {
                if (spot.geometry.coordinates === reportSpot.geometry.coordinates) {
                    spot.properties = reportSpot.properties;
                }
            });
        });

        return spots;
    };

    private updateSpots() {
        let spots = this.getUpdatedSpots();
        this.ngRedux.dispatch({
            type: SpotsActions.UPDATE_SPOTS,
            payload: spots
        });
    }


}
