import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class GeolocationService {
  public geolocationCoordinates$ = new Subject<GeoJSON.Position>();
  public geolocationAvailability$ = new Subject<boolean>();
  private watchId;

  public getCoordinates() {
    return this.geolocationCoordinates$;
  }

  public getAvailability() {
    return this.geolocationAvailability$;
  }

  public watch() {
    const isAvailable = this.isAvailable();
    if (!isAvailable) {
      console.log('ERROR: geolocation not available');
      return;
    }

    if (this.watchId) {
      console.log('Already watching geolocation');
      return;
    }

    // Set initial position
    window.navigator.geolocation.getCurrentPosition((p) => {
      this.geolocationAvailability$.next(true);
      this.geolocationCoordinates$.next([p.coords.longitude, p.coords.latitude]);
    }, (err) => {
      console.log('ERROR: ' + err.message);
      this.geolocationAvailability$.next(false);
    });

    // Watch for changes
    this.watchId = window.navigator.geolocation.watchPosition((p) => {
      this.geolocationAvailability$.next(true);
      this.geolocationCoordinates$.next([p.coords.longitude, p.coords.latitude]);
    }, (err) => {
      console.log('ERROR: ' + err.message);
      this.geolocationAvailability$.next(false);
      this.clearWatch();
    });
  }

  public clearWatch() {
    window.navigator.geolocation.clearWatch(this.watchId);
    this.watchId = null;
  }

  public isAvailable() {
    const isSupported = window.navigator.geolocation != null;
    this.geolocationAvailability$.next(isSupported);
    return isSupported;
  }

}
