import { Component, Input, OnInit, AfterViewInit, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { BaseMapComponent } from '~/components/map';
import { MapModes, Position, Spots, convertToGeoJson } from '~/util';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

// Use this for the opensource maps:
// var mapstyle = require('./style.json');
const mapstyle = require('./style_parkabler.json');

@Component({
  selector: 'pa-map-gl',
  templateUrl: './mapgl.component.html',
  styleUrls: ['./mapgl.component.scss']
})
export class MapGLComponent extends BaseMapComponent {
  @ViewChild('MapDiv') MapDiv;
  private map: any;

  constructor() {
    super();
  }

  initializeMap(done: (boolean) => void): void {
    // TODO-rangle: how do i store this key safely?
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXN0aWthZXMiLCJhIjoiY2l6M2htYjB4MDV0aTMycHhvamVzenJwNSJ9.XJpbIPXuOhlu7T9riCD77g';
    let mapDiv = this.MapDiv.nativeElement;
    let map = new mapboxgl.Map({
      container: mapDiv,
      style: mapstyle,
      center: [-71.06, 42.35],
      zoom: 15
    });
    // HACK: Not sure why canvas is set to absolute position, but it breaks styling:
    map.getCanvas().style.position = 'initial';

    // Signal that the map is loaded
    map.on('load', () => {
      done(true);
    });

    this.map = map;
  }

  updateZoom(zoom: number) {
    this.map.zoomTo(zoom);
  }

  setMode(mode: MapModes) {
    switch (mode) {
      case 'satellite':
        this.map.setPaintProperty('satellite', 'raster-opacity', 1);
        break;
      case 'street':
        this.map.setPaintProperty('satellite', 'raster-opacity', 0);
        break;
      default:
        this.map.setPaintProperty('satellite', 'raster-opacity', 0);
        break;
    }
  }

  setCenter(center: Position) {
    this.map.flyTo({center: [center.lng, center.lat]});
  }

  setSpots(spots: Spots) {
    let spotsGeoJson = convertToGeoJson(spots);
    this.map.getSource('spots').setData(spotsGeoJson);
  }

}
