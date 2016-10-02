import { Injectable } from '@angular/core';
// import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

// If the user is offline, use this data:
const data = require('./data/spots$.json');

@Injectable()
export class SpotApiService {
  private _spots: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(data.spots);
  public spots: Observable<any[]> = this._spots.asObservable();
  // constructor(af: AngularFire) {
    //  this.spots = af.database.list('spots');
  // }
}
