import { Injectable } from '@angular/core';
import { GeolocationService } from './geolocation.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { MapModes, Position } from '~/util';

@Injectable()
export class MapLocationService {
  private _location: Subject<Position> = new Subject<Position>();
  public current: Observable<Position> = this._location.asObservable();
  private _zoom: Subject<number> = new Subject<number>();
  public zoom: Observable<number> = this._zoom.asObservable();
  private _mode: Subject<MapModes> = new Subject<MapModes>();
  public mode: Observable<MapModes> = this._mode.asObservable();

  constructor(private geolocation: GeolocationService) {
    // initialize with current location
    this.centerOnMe();
  }

  set(position: Position): void {
    this._location.next(position);
  }

  centerOnMe(): void {
    this.geolocation.currentLocation()
      .then((p: Position) => {
        this._location.next(p);
      })
      .catch(() => {
        // Could not find destination
        console.log('Could not find destination');
      });
  }

  setZoom(z: number): void {
    this._zoom.next(z);
  }

  setMode(m: MapModes): void {
    this._mode.next(m);
  }
}
