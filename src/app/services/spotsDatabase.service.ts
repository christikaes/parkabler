import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

// If the user is offline, use this data:
const data = require('./data/spots$.json');

@Injectable()
export class SpotsDatabaseService {
  private lastSpots: any[] = [];
  public spots: FirebaseListObservable<any[]>;

  constructor(
    private db: AngularFireDatabase
  ) {
    // this.spots = Observable.of(data.spots);
    this.spots = db.list('spots');
  }

  // Gets all the spots from the database
  public get () {
    return this.spots;
  }
}
