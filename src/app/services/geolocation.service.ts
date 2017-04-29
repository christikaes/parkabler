import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class GeolocationService {
  public geolocationCoordinates$ = new Subject<GeoJSON.Position>();
  public geolocationAvailability$ = new Subject<boolean>();
  private watchId;


  constructor() {
    this.watch();
  }

  public getCoordinates() {
    return this.geolocationCoordinates$;
  }

  public getAvailability() {
    return this.geolocationAvailability$;
  }

  public watch() {
    let isAvailable = this.isAvailable();
    if (isAvailable) {
      console.log('ERROR: geolocation not available');
    }

    // Set initial position
    window.navigator.geolocation.getCurrentPosition((p) => {
      this.geolocationAvailability$.next(true);
      this.geolocationCoordinates$.next([p.coords.longitude, p.coords.latitude]);
    }, ( err ) => {
      console.log('ERROR: ' + err.message);
      this.geolocationAvailability$.next(false);
    });

    // Watch for changes
    this.watchId = window.navigator.geolocation.watchPosition((p) => {
      this.geolocationAvailability$.next(true);
      this.geolocationCoordinates$.next([p.coords.longitude, p.coords.latitude]);
    }, ( err ) => {
      console.log('ERROR: ' + err.message);
      this.geolocationAvailability$.next(false);
    });
  }

  public clearWatch() {
    window.navigator.geolocation.clearWatch(this.watchId);
  }

  public isAvailable() {
    let isSupported = window.navigator.geolocation != null;
    this.geolocationAvailability$.next(isSupported);
    return isSupported;
  }

}
