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

      map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [[[-67.13734351262877, 45.137451890638886],
                        [-66.96466, 44.8097],
                        [-68.03252, 44.3252],
                        [-69.06, 43.98],
                        [-70.11617, 43.68405],
                        [-70.64573401557249, 43.090083319667144],
                        [-70.75102474636725, 43.08003225358635],
                        [-70.79761105007827, 43.21973948828747],
                        [-70.98176001655037, 43.36789581966826],
                        [-70.94416541205806, 43.46633942318431],
                        [-71.08482, 45.3052400000002],
                        [-70.6600225491012, 45.46022288673396],
                        [-70.30495378282376, 45.914794623389355],
                        [-70.00014034695016, 46.69317088478567],
                        [-69.23708614772835, 47.44777598732787],
                        [-68.90478084987546, 47.184794623394396],
                        [-68.23430497910454, 47.35462921812177],
                        [-67.79035274928509, 47.066248887716995],
                        [-67.79141211614706, 45.702585354182816],
                        [-67.13734351262877, 45.137451890638886]]]
                }
            }
        },
        'layout': {},
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
        }
    });


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
