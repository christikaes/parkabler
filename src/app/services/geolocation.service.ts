import { Injectable } from '@angular/core';

@Injectable()
export class GeolocationService {
  currentLocation(): Promise<GeoJSON.Position> {
    return new Promise((resolve) => {
      window.navigator.geolocation.getCurrentPosition((p) => {
        resolve([p.coords.longitude, p.coords.latitude]);
      }, () => {
        console.log('Error: LocationService: currentLocation failed, defaulting to Boston');
        resolve([-71.0589, 42.3601]);
      });
    });
  }
}
