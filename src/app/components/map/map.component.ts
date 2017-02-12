import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MapGLComponent } from './mapgl';
import { MapJSComponent } from './mapjs';
import { MapControlsComponent } from './mapcontrols';
import { MapModes } from './map';
import { GeolocationService, Position } from '~/services';

@Component({
  selector: 'pa-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private supportsGL : boolean;
  private zoom : number;
  private view: MapModes;
  private center: Position;

  constructor(
    private geoLocation: GeolocationService
  ){}

  ngOnInit() {
    this.supportsGL = true;
  }

  zoomChange(z: number): void {
    this.zoom += z;
  }

  viewChange(v: MapModes): void {
    this.view = v;
  }

  recenterChange(): void {
    // TODO-rangle: would it be better to get this from global state?
    this.geoLocation.currentLocation()
      .then((p: Position) => {
        this.center = p;
        //this.destinationLocation.set(p);
        this.zoom = 18;
      })
      .catch(() => {
        console.log('Current Location Not found');
      });
  }

}
