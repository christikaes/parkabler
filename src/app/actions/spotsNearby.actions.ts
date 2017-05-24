import { Injectable } from '@angular/core';
import { IAppState } from '~/store';
import { NgRedux } from '@angular-redux/store';
import { DistanceService } from '~/services';
import { Observable } from 'rxjs';

const turf = require('turf');
const turfCircle = require('@turf/circle');
const turfWithin = require('@turf/within');
const turfHelper = require('@turf/helpers');
const turfMeta = require('@turf/meta');


@Injectable()
export class SpotsNearbyActions {
    static GET = 'PA/SPOTS/NEARBY/GET';
    static UPDATE = 'PA/SPOTS/NEARBY/UPDATE';

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private distanceService: DistanceService
    ) {}

    public getNearbySpots(destination: GeoJSON.Position, spots: GeoJSON.FeatureCollection<GeoJSON.Point>) {
        if (!destination || !spots) {
            this.setNearbySpots(turfHelper.featureCollection([]));
            return;
        }

        // Create a circle of 200m
        const nearbyBounds = turfHelper.featureCollection([turfCircle(turf.point(destination), 0.2)]);
        const filteredSpots = turfWithin(spots, nearbyBounds);
        this.setNearbySpots(filteredSpots);

        this.distanceService.getWalkingDistances(filteredSpots, turf.point(destination))
            .subscribe((distances) => {
                const nearbySpots = this.getSpotsWithDistances(filteredSpots, distances);
                this.setNearbySpots(nearbySpots);
            }, (error) => {
                console.log('Error: ' + error);
            });
    }

    private getSpotsWithDistances(
        spots: GeoJSON.FeatureCollection<GeoJSON.Point>,
        distances: number[]
    ): GeoJSON.FeatureCollection<GeoJSON.Point> {
        turfMeta.propEach(spots, (spotProp, i) => {
            spotProp.distanceToDestination = distances[i];
        });

        return spots;
    }

    private setNearbySpots(nearbySpots: GeoJSON.FeatureCollection<GeoJSON.Point>) {
        this.ngRedux.dispatch({
            type: SpotsNearbyActions.UPDATE,
            payload: nearbySpots
        });
    }
}
