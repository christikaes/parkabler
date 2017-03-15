import { Injectable } from '@angular/core';
import { Position } from '~/util';

@Injectable()
export class GeolocationService {
  currentLocation(): Promise<Position> {
    return new Promise((resolve) => {
      window.navigator.geolocation.getCurrentPosition((p) => {
        resolve({
          lat: p.coords.latitude,
          lng: p.coords.longitude
        });
      }, () => {
        console.log('Error: LocationService: currentLocation failed, defaulting to Boston');
        resolve({
          lat: 42.3601,
          lng: -71.0589
        });
      });
    });
  }
}
