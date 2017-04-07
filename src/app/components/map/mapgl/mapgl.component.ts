import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { MapModes, Position, Spots, convertToGeoJson, MapboxAccessTolken } from '~/util';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

// Use this for the opensource maps:
// var mapstyle = require('./style.json');
const mapstyle = require('./style_parkabler.json');

@Component({
  selector: 'pa-map-gl',
  templateUrl: './mapgl.component.html',
  styleUrls: ['./mapgl.component.scss']
})
export class MapGLComponent implements OnInit, OnChanges {
  @ViewChild('MapDiv') MapDiv;
  // TODO-rangle: How do I add the setTimeout
  // https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#parent-to-view-child

  @Input() zoom: number;
  @Output() zoomChange = new EventEmitter<number>();
  @Input() center: number;
  @Output() centerChange = new EventEmitter<GeoJSON.Position>();
  @Input() mode: MapModes;
  @Input() spots: any;

  private map: any;
  private initialized = false;

  ngOnInit(): void {
    this.initializeMap();
    this.addListeners();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Only start listening to changes after the map is initialized
    console.log('####');
    if (this.initialized) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      for (let change in changes) {
        if (change === 'zoom') {
          console.log('--');
          this.setZoom(changes[change].currentValue);
        } else if ( change === 'mode') {
          this.setMode(changes[change].currentValue);
        } else if (change === 'center') {
          let center = changes[change].currentValue;
          this.setCenter(center);
        } else if (change === 'spots') {
          this.setSpots(changes[change].currentValue);
        } else {
          throw 'Uncaught change: ' + change;
        }
      }
    }
  }

  initializeMap(): void {
    mapboxgl.accessToken = MapboxAccessTolken;
    let mapDiv = this.MapDiv.nativeElement;
    let map = new mapboxgl.Map({
      container: mapDiv,
      style: mapstyle,
      center: [-71.06, 42.35],
      zoom: 15
    });
    // HACK: Not sure why canvas is set to absolute position, but it breaks styling:
    map.getCanvas().style.position = 'initial';

    // To see all of the events:
    console.log(map._listeners);

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

      // map.resize();
      let event = document.createEvent('HTMLEvents');
      event.initEvent('resize', true, false);
      document.dispatchEvent(event);

      // Setup with initial spots
      // this.setSpots(this.spots);

      this.initialized = true;
    });

    this.map = map;
  }

  addListeners() {
    this.map.on('moveend', () => {
      this.centerChange.emit([this.map.getCenter().lng, this.map.getCenter().lng]);
    });

    this.map.on('zoom', () => {
      this.zoomChange.emit(this.map.getZoom());
    });
  }

  setZoom(zoom: number) {
    console.log('SET ZOOM');
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

  setCenter(center: GeoJSON.Position) {
    this.map.flyTo({center: center});
  }

  setSpots(spots: Spots) {
    let spotsGeoJson = convertToGeoJson(spots);
    this.map.getSource('spots').setData(spotsGeoJson);
  }
}
