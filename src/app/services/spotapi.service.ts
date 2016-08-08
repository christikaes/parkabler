import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

// If the user is offline, use this data:
const data = require('./data.json');

@Injectable()
export class SpotApiService {
  spots: FirebaseListObservable<any[]>;

  constructor(af: AngularFire) {
     this.spots = af.database.list('spots');
  }
}
