import { Injectable } from '@angular/core';
import { IAppState } from '~/store';
import { NgRedux } from 'ng2-redux';
import { Spots, Position, NearbySpots } from '~/util';
import { DistanceService } from '~/services';

@Injectable()
export class NearbySpotsActions {
    static GET = 'PA/NEARBY_SPOTS/GET';
    static UPDATE = 'PA/NEARBY_SPOTS/UPDATE';

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private distanceService: DistanceService
    ) {}

    public updateNearbySpots(nearbySpots: NearbySpots) {
        this.ngRedux.dispatch({
            type: NearbySpotsActions.UPDATE,
            payload: nearbySpots
        });
    }

    public getNearbySpots(destination: Position, spots: Spots) {
        if (!destination || !spots) {
            return;
        }

        this.ngRedux.dispatch({
            type: NearbySpotsActions.GET
        });

        const getFilteredSpots = this.distanceService.filterByEuclideanDistance(0.2);
        const filteredSpots = getFilteredSpots(destination, spots);

        if (filteredSpots.length > 0) {
            this.distanceService.getDistance(filteredSpots, destination)
                .then( distances => this.spotsWithDistances(filteredSpots, distances) )
                .then( nearbySpots => this.updateNearbySpots(nearbySpots) )
                .catch( err => { throw err; });
        }
    }

    private spotsWithDistances(spots: Spots, distances: number[]): NearbySpots {
        return spots.map((spot, i) => {
            return Object.assign({}, spot, {
                distanceToDestination: distances[i]
            });
        });
    }

}
