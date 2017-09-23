import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

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
    this.spots = db.list('spotsall');
  }

  // Gets all the spots from the database
  public get() {
    return this.spots;
  }
}
