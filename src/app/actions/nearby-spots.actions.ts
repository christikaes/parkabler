import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState, ISpots, INearbySpots, Position } from '../store';
import { DistanceService } from '../services/distance.service';
import { SpotsService } from '../services/spots.service';

@Injectable()
export class NearbySpotsActions {
  static GET = 'PA/NEARBY_SPOTS/GET';
  static UPDATE = 'PA/NEARBY_SPOTS/UPDATE';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private distanceService: DistanceService,
    private spotsService: SpotsService
  ) {}

  updateNearbySpots(nearbySpots: INearbySpots) {
    this.ngRedux.dispatch({
      type: NearbySpotsActions.UPDATE,
      payload: nearbySpots
    });
  }

  getNearbySpots(destination: Position, spots: ISpots) {
    if (!spots || !destination) { return; }

    this.ngRedux.dispatch({ type: NearbySpotsActions.GET });

    const getFilteredSpots = this.spotsService.filterByDistance(0.2);
    const filteredSpots = getFilteredSpots(destination, spots);

    if (filteredSpots.length > 0) {
      this.distanceService.getDistance(filteredSpots, destination)
        .then(distances => this.spotsWithDistances(filteredSpots, distances))
        .then(nearbySpots => this.updateNearbySpots(nearbySpots))
        .catch(err => console.error(err));
    }
  }

  spotsWithDistances(spots: ISpots, distances) {
    return spots.map((spot, idx) => (
      Object.assign({}, spot, {
        distanceToDest: distances[idx]
      })
    ));
  }
}
