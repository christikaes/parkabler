import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class GeolocationService {
  public geolocation$: Subject<GeoJSON.Position>;
  private watchId;


  constructor() {
    this.watch();
  }

  public get() {
    return this.geolocation$;
  }

  public watch() {
    this.geolocation$ = new Subject();
    window.navigator.geolocation.getCurrentPosition((p) => {
      this.geolocation$.next([p.coords.longitude, p.coords.latitude]);
    });
    this.watchId = window.navigator.geolocation.watchPosition((p) => {
      this.geolocation$.next([p.coords.longitude, p.coords.latitude]);
    });
  }

  public clearWatch() {
    window.navigator.geolocation.clearWatch(this.watchId);
  }

  public isAvailable() {
    return window.navigator.geolocation != null;
  }

}
