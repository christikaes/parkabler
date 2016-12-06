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
        // console.log('Error: LocationService: currentLocation failed, defaulting to Boston');
        // resolve({
        //   lat: 42.3601,
        //   lng: -71.0589
        // });
        console.log('Error: LocationService: currentLocation failed, defaulting to MadPow');
        resolve({
          lat: 42.350530,
          lng: -71.059096
        });
      });
    });
  }

  distanceBetween(p1: Position, p2: Position) {
    if (!p1 || !p2) {
      return 0;
    }

    let R = 6371; // Radius of the Earth in km
    let dLat = (p2.lat - p1.lat) * Math.PI / 180;
    let dLon = (p2.lng - p1.lng) * Math.PI / 180;
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
  };
}
