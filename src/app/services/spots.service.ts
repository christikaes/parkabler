import { Injectable } from '@angular/core';
// import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ISpots } from '../store/reducers';
import { GeolocationService, Position } from './geolocation.service';

// If the user is offline, use this data:
const data = require('./data/spots$.json');

@Injectable()
export class SpotsService {
  // Once you completely transition to redux
  // you won't need thse anymore.
  private _spots: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(data.spots);
  public spots: Observable<any[]> = this._spots.asObservable();

  constructor(
    /*af: AngularFire*/
    private geolocationService: GeolocationService
  ) {
    //  this.spots = af.database.list('spots');
  }

  get() {
    // Later switch to making an HTTP request
    // from the backend or firebase
    return Observable.of(data.spots);
  }

  filterByDistance(threshold: number) {
    return (destination: Position, spots: ISpots) => {
      return spots.filter(spot => (
        this.geolocationService.distanceBetween(spot, destination) < threshold
      ));
    };
  }
}
