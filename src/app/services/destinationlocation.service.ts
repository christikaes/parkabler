import { Injectable } from '@angular/core';
import { GeolocationService } from './geolocation.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Position } from '~/util';

@Injectable()
export class DestinationLocationService {
  private _lastPosition: Position;
  private _location: BehaviorSubject<Position> = new BehaviorSubject<Position>({lat: 42.3601, lng: -71.058 });
  public current: BehaviorSubject<Position> = this._location;

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
      })
      .catch(() => {
        // Could not find location
        console.log('Could not find Location');
      });
  }
}
