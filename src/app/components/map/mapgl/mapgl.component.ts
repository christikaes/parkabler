import { Component, Input, OnInit, AfterViewInit, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { SpotApiService, MapLocationService, GeolocationService, DestinationLocationService, Position } from '~/services';
import { BaseMapComponent, MapModes } from '~/components/map';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

// Use this for the opensource maps:
// var mapstyle = require('./style.json');

@Component({
  selector: 'pa-map-gl',
  templateUrl: './mapgl.component.html',
  styleUrls: ['./mapgl.component.scss']
})
export class MapGLComponent extends BaseMapComponent {
  @ViewChild('MapDiv') MapDiv;
  private map: any;

  constructor(spotApiService: SpotApiService) {
    super(spotApiService);
  }

  initializeMap(): void {
    // TODO-rangle: how do i store this key safely?
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXN0aWthZXMiLCJhIjoiY2l6M2htYjB4MDV0aTMycHhvamVzenJwNSJ9.XJpbIPXuOhlu7T9riCD77g';
    let mapDiv = this.MapDiv.nativeElement;
    this.map = new mapboxgl.Map({
      container: mapDiv,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-71.06, 42.35],
      zoom: 15
    });
    // HACK: Not sure why canvas is set to absolute position, but it breaks styling:
    this.map.getCanvas().style.position = 'initial';
  }

  updateZoom(zoom: number) {
    this.map.zoomTo(zoom);
  }

  setMode(mode: MapModes) {
    switch (mode) {
      case 'satellite':
        this.map.setStyle('mapbox://styles/mapbox/satellite-streets-v9');
        break;
      case 'street':
        this.map.setStyle('mapbox://styles/mapbox/streets-v9');
        break;
      default:
        this.map.setStyle('mapbox://styles/mapbox/streets-v9');
        break;
    }
  }

  setCenter(center: Position) {
    this.map.flyTo({center: [center.lng, center.lat]});
  }

  addMarker($key: string, position: Position) {
    let el = document.createElement('div');
    el.className = 'marker';

    // TODO: pull this from redux store

    let marker = new mapboxgl.Marker(el)
      .setLngLat([position.lng, position.lat])
      .addTo(this.map);
  }

  removeMarker() {
    throw 'Not implemented';
  }

  updateMarker() {
    throw 'Not implemented';
  }

}
