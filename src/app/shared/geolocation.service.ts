import { Injectable } from '@angular/core';

export interface Position {
  lat: number;
  lng: number;
}

export interface IMapLocation {
  get(): Position;
  set(position: Position);
  subscribe(callback: Function);
}

class MapLocation implements IMapLocation {
  private current: Position;
  private subscriptions: Array<Function>;

  constructor() {
    this.subscriptions = new Array<Function>();
  }

  set(position: Position) {
    this.current = position;
    this.subscriptions.forEach((cb) => cb(position));
  }

  get() {
    return this.current;
  }

  subscribe(callback: Function) {
    this.subscriptions.push(callback);
  }
}


@Injectable()
export class GeolocationService {
  mapLocation: IMapLocation;

  constructor() {
    this.mapLocation = new MapLocation();
  }

  currentLocation(): Promise<Position> {
    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition((p) => {
        resolve({
          lat: p.coords.latitude,
          lng: p.coords.longitude
        });
      }, () => {
        throw new Error('LocationService: currentLocation failed');
      });
    });
  }
}
