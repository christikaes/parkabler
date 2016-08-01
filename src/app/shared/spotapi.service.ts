import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

const data = require('./data.json');

@Injectable()
export class SpotApiService {
  spots = data.spots;
  items: FirebaseListObservable<any[]>;

  constructor(af: AngularFire){
     this.items = af.database.list('spots');
  }
}
