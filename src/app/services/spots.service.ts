import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Position } from '~/util';

// If the user is offline, use this data:
const data = require('./data/spots$.json');

@Injectable()
export class SpotsService {
  private lastSpots: any[] = [];
  public spots: FirebaseListObservable<any[]>;

  constructor(
    private af: AngularFire
  ) {
    // this.spots = Observable.of(data.spots);
    this.spots = af.database.list('spots');
    // this.listenToChanges();
  }

  // private listenToChanges() {
  //   // Whenever the firebase database updates,
  //   // get the spots that were updated
  //   // dispatch add/remove/update actions accordingly
  //   this.spots.subscribe(newSpots => {
  //     this.lastSpots.forEach(function (spot, i) {
  //       let newSpot = newSpots.find(nm => nm.$key === spot.$key);
  //       if (!newSpot) {
  //         // Something was deleted
  //         this.spotsActions.removeSpotByKey(spot.$key);
  //         this.lastSpots.splice(i, 1);
  //       } else if (spot.$lat !== newSpot.lat ||
  //         spot.$lng !== newSpot.lng) {
  //         // Something was changed
  //         // Update these for future comparasion
  //         spot.lat = newSpot.lat;
  //         spot.lng = newSpot.lng;
  //         this.spotsActions.updateSpot(spot.$key, {
  //           lat: newSpot.lat,
  //           lng: newSpot.lng
  //         });
  //       }
  //     }, this);

  //     // Check if anything was added
  //     newSpots.forEach(function (newSpot) {
  //       if (!this.lastSpots.find(m => m.$key === newSpot.$key)) {
  //         // Something was added
  //         this.lastSpots.push(newSpot);
  //         this.spotsActions.addSpot(newSpot.$key, {
  //           lat: newSpot.lat,
  //           lng: newSpot.lng
  //         });
  //       };
  //     }, this);
  //   });
  // }

  // Gets all the spots from the database
  public get () {
    // If offline:
    // Observable.of(data.spots)
    return this.spots;
  }

  private distanceBetween(p1: Position, p2: Position): number {
    if (!p1 || !p2) {
      return 0;
    }

    let R = 6371; // Radius of the Earth in km
    let dLat = (p2.lat - p1.lat) * Math.PI / 180;
    let dLon = (p2.lng - p1.lng) * Math.PI / 180;
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
  }

  // Returns a function that will filter spots by the given distance
  public filterByDistance (threshold: number) {
    return (center: Position, spots: any[]) => {
      return spots.filter(spot => {
        return this.distanceBetween(spot.position, center) < threshold;
      });
    };
  }
}
