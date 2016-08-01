import { Injectable } from '@angular/core';

export interface Position {
  latitude: number;
  longitude: number;
}

@Injectable()
export class GeolocationService {
  currentLocation(): Promise<Position> {
    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition((p) => {
        resolve({
          latitude: p.coords.latitude,
          longitude: p.coords.longitude
        });
      }, () => {
        throw new Error('LocationService: currentLocation failed');
      });
    });
  }
}
