import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MapGLComponent } from './mapgl';
import { MapJSComponent } from './mapjs';
import { MapControlsComponent } from './mapcontrols';
import { MapModes } from './map';
import { GeolocationService, Position } from '~/services';
import { DestinationActions } from '~/actions';
// TODO-rangle: is there a better way to require this?
// Should i add this to vendor.js?
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

@Component({
  selector: 'pa-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private supportsGL : boolean;
  private zoom : number;
  private mode: MapModes;
  private center: Position;

  constructor(
    private geoLocation: GeolocationService,
    private destinationActions: DestinationActions
  ){
    this.zoom = 15;
    this.mode = "street";
    this.center = {lat: -71.06, lng: 42.35}
  }

  ngOnInit() {
    this.supportsGL = mapboxgl.supported();
  }

  zoomChange(z: number): void {
    this.zoom += z;
  }

  modeChange(v: MapModes): void {
    this.mode = v;
  }

  recenterChange(): void {
    // TODO-rangle: would it be better to get this from global state?
    this.geoLocation.currentLocation()
      .then((p: Position) => {
        this.center = p;
        this.zoom = 18;
        this.destinationActions.setDestination(p);
      })
      .catch(() => {
        console.log('Current Location Not found');
      });
  }

}
