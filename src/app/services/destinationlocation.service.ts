import { Injectable } from '@angular/core';
import { Position, GeolocationService } from './geolocation.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DestinationLocationService {
  private _lastPosition: Position;
  private _location: Subject<Position> = new Subject<Position>();
  public current: Observable<Position> = this._location.asObservable();

  constructor(private geolocation: GeolocationService) {
    // initialize with current location
    this.current.subscribe(res => {
      this._lastPosition = res;
    });
    this.unset();
  }

  set(position: Position): void {
    this._location.next(position);
  }

  unset(): void {
    this.geolocation.currentLocation()
      .then((p: Position) => {
        this._location.next(p);
      });
  }

  getLastDestination(): Position {
    return this._lastPosition;
  }
}
