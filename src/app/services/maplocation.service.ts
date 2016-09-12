import { Injectable } from '@angular/core';
import { Position, GeolocationService } from './geolocation.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MapLocationService {
  private _location: Subject<Position> = new Subject<Position>();
  public current: Observable<Position> = this._location.asObservable();

  constructor(private geolocation: GeolocationService) {
    // initialize with current location
    this.geolocation.currentLocation()
      .then((p: Position) => {
        this._location.next(p);
      })
      .catch(() => {
        // Could not find destination, setting to boston
        console.log('Could not find current location, redirecting to Boston');
        this._location.next({
          lat: 42.3601,
          lng: -71.0589
        });
      });
  }

  set(position: Position): void {
    this._location.next(position);
  }
}
