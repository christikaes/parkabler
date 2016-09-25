import { Injectable } from '@angular/core';

export interface Position {
  lat: number;
  lng: number;
}

@Injectable()
export class GeolocationService {
  currentLocation(): Promise<Position> {
    return new Promise((resolve, reject) => {
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
