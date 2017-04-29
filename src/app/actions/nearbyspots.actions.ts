import { Injectable } from '@angular/core';
import { IAppState } from '~/store';
import { NgRedux } from 'ng2-redux';
import { Spots, NearbySpots } from '~/util';
import { DistanceService } from '~/services';

const turf = require('turf');
const turfCircle = require('@turf/circle');
const turfWithin = require('@turf/within');
const turfHelper = require('@turf/helpers');
const turfMeta = require('@turf/meta');


@Injectable()
export class NearbySpotsActions {
    static GET = 'PA/NEARBY_SPOTS/GET';
    static UPDATE = 'PA/NEARBY_SPOTS/UPDATE';

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private distanceService: DistanceService
    ) {}

    public updateNearbySpots(nearbySpots: GeoJSON.FeatureCollection<GeoJSON.Point>) {
        this.ngRedux.dispatch({
            type: NearbySpotsActions.UPDATE,
            payload: nearbySpots
        });
    }

    public getNearbySpots(destination: GeoJSON.Position, spots: GeoJSON.FeatureCollection<GeoJSON.Point>) {
        if (!destination || !spots) {
            return;
        }

        // Create a circle of 200m
        const nearbyBounds = turfHelper.featureCollection([turfCircle(turf.point(destination), 0.2)]);
        const filteredSpots = turfWithin(spots, nearbyBounds);
        if (filteredSpots.features.length > 0) {
            this.distanceService.getDistance(filteredSpots, destination)
                .then( distances => this.spotsWithDistances(filteredSpots, distances) )
                .then( nearbySpots => this.updateNearbySpots(nearbySpots) )
                .catch( err => { throw err; });
        }
    }

    private spotsWithDistances(
        spots: GeoJSON.FeatureCollection<GeoJSON.Point>,
        distances: number[]
    ): GeoJSON.FeatureCollection<GeoJSON.Point> {
        turfMeta.propEach(spots, (spotProp, i) => {
            spotProp.distanceToDestination = distances[i];
        });

        return spots;
    }

}
