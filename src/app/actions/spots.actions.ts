import { Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '~/store';
import { SpotsDatabaseService, DistanceService } from '~/services';
import { Spot, Spots } from '~/store';

@Injectable()
export class SpotsActions {
    static SET_DATABASE_SPOTS = 'PA/SPOTS/SET/DATABASE/SPOTS';
    static UPDATE_USER_SPOT = 'PA/SPOTS/UPDATE/USER/SPOT';
    static SET_NEARBY_SPOTS = 'PA/SPOTS/SET/NEARBY/SPOTS';
    static SET_ACTIVE_SPOT = 'PA/SPOTS/SET/ACTIVE/SPOT';

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private spotsDatabaseService: SpotsDatabaseService,
        private distanceService: DistanceService
    ) {
        this.getDatabaseSpots();
    }

    // Database Spots
    public getDatabaseSpots() {
        this.spotsDatabaseService.get()
            .subscribe((spots: Spots) => this.setDatabaseSpots(spots));
    }
    public setDatabaseSpots(spots: Spots) {
        this.ngRedux.dispatch({
            type: SpotsActions.SET_DATABASE_SPOTS,
            payload: spots
        });

        // Update the nearbySpots
        this.getNearbySpots(this.ngRedux.getState().destination.coordinates, this.ngRedux.getState().spots.compiled);
    }

    // User Spots
    public updateUserSpot(spot: Spot) {
        this.ngRedux.dispatch({
            type: SpotsActions.UPDATE_USER_SPOT,
            payload: spot
        });

        // Update the nearbySpots
        this.getNearbySpots(this.ngRedux.getState().destination.coordinates, this.ngRedux.getState().spots.compiled);

        this.spotsDatabaseService.addSpot(spot);
    }

    // Nearby Spots
    public getNearbySpots(destination: GeoJSON.Position, spots: Spots) {
        // Get the spots within 200 meters and set them
        const filteredSpots = this.distanceService.filterSpotsNearDestination(spots, destination, 0.2);
        this.setNearbySpots(filteredSpots);
        // Get the walking distances and async set them
        this.distanceService.getWalkingDistances(filteredSpots, destination)
            .subscribe((distances) => {
                filteredSpots.forEach((spot, i) => spot.properties.distanceToDestination = distances[i]);
                filteredSpots.sort((a, b) => a.properties.distanceToDestination - b.properties.distanceToDestination);
                this.setNearbySpots(filteredSpots);
            });
    }
    public setNearbySpots(nearbySpots: Spots) {
        this.ngRedux.dispatch({
            type: SpotsActions.SET_NEARBY_SPOTS,
            payload: nearbySpots
        });
    }

    // Active SpotId
    public setActiveSpotId(activeId: string) {
        const activeSpot = this.ngRedux.getState().spots.compiled.find(s => s.id === activeId);
        this.setActiveSpot(activeSpot);
    }
    public setActiveSpot(spot: Spot) {
        this.ngRedux.dispatch({
            type: SpotsActions.SET_ACTIVE_SPOT,
            payload: spot
        });
    }

}
