import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Spot } from '~/store';

// If the user is offline, use this data:
const data = require('./dataFinal/allSpots.json');

@Injectable()
export class SpotsDatabaseService {
  private lastSpots: any[] = [];
  public spots: Observable<GeoJSON.Feature<GeoJSON.Point>[]>;

  constructor(
    private db: AngularFireDatabase
  ) {
    // this.spots = Observable.of(data.spots);
    this.spots = db.list('compiled');
  }

  // Gets all the spots from the database
  public get() {
    return this.spots;
  }

  // Pushes the given spot the database
  public addSpot(spot: Spot) {
    this.db.list('addspots').push({
      id: spot.id,
      type: spot.type,
      geometry: spot.geometry,
      properties: {
        addedBy: spot.properties.addedBy,
        verified: spot.properties.verified,
        quantity: spot.properties.quantity,
        cost: spot.properties.cost
      }
    });
  }
}
