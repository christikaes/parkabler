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
      });
  }

  set(position: Position): void {
    this._location.next(position);
  }
}
