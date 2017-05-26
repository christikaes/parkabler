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
import { MapModes, MapboxAccessTolken } from '~/util';
const turf = require('turf');
const turfcircle = require('@turf/circle');
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

// Use this for the opensource maps:
// var mapstyle = require('./style.json');
const mapstyle = require('./style_parkabler.json');
// const mapstyle = 'mapbox://styles/mapbox/basic-v9';

@Component({
  selector: 'pa-map-gl',
  templateUrl: './mapgl.component.html',
  styleUrls: ['./mapgl.component.scss']
})
export class MapGLComponent implements OnInit, OnChanges {
  @ViewChild('MapDiv') MapDiv;
  // KNOWNBUG There is a known issue with the map values unsyncing with the input
  // https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#parent-to-view-child

  @Input() zoom: number;
  @Output() zoomChange = new EventEmitter<number>();
  @Input() center: number;
  @Output() centerChange = new EventEmitter<GeoJSON.Position>();
  @Input() mode: MapModes;
  @Input() spots: GeoJSON.FeatureCollection<GeoJSON.Point>;
  @Input() currentlocation: GeoJSON.Position;
  @Input() destination: GeoJSON.Position;

  private map: any;
  private initialized = false;

  ngOnInit(): void {
    this.initializeMap();
    this.addListeners();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Only start listening to changes after the map is initialized
    if (this.initialized) {
      for (const change in changes) {
        if (change === 'zoom') {
          this.setZoom(changes[change].currentValue);
        } else if (change === 'center') {
          this.setCenter(changes[change].currentValue);
        } else if ( change === 'mode') {
          this.setMode(changes[change].currentValue);
        } else if (change === 'spots') {
          this.setSpots(changes[change].currentValue);
        } else if (change === 'currentlocation') {
          this.setCurrentLocation(changes[change].currentValue);
        } else if (change === 'destination') {
          this.setDestination(changes[change].currentValue);
        } else {
          throw new Error('Uncaught change: ' + change);
        }
      }
    }
  }

  initializeMap(): void {
    mapboxgl.accessToken = MapboxAccessTolken;
    const mapDiv = this.MapDiv.nativeElement;
    const map = new mapboxgl.Map({
      container: mapDiv,
      style: mapstyle,
      center: [-71.06, 42.35],
      zoom: 15
    });
    // HACK: Not sure why canvas is set to absolute position, but it breaks styling:
    map.getCanvas().style.position = 'initial';

    // To see all of the events:
    // console.log(map._listeners);

    // Signal that the map is loaded
    map.on('load', () => {
      // map.resize();
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', true, false);
      document.dispatchEvent(event);

      // Setup with initial spots
      this.setSpots(this.spots);
      this.setCurrentLocation(this.currentlocation);

      this.initialized = true;
    });

    this.map = map;
  }

  addListeners() {
    this.map.on('moveend', () => {
      this.centerChange.emit([this.map.getCenter().lng, this.map.getCenter().lat]);
    });

    this.map.on('zoomend', () => {
      this.zoomChange.emit(this.map.getZoom());
    });

    this.map.on('click', 'unclustered-points-v2', function (e) {
        new mapboxgl.Popup({offset: 25})
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML(`<a class="cta" href="http://maps.google.com/maps?daddr=${e.features[0].geometry.coordinates[1]},${e.features[0].geometry.coordinates[0]}" target="_blank">Navigate</a>`)
            .addTo(this.map);
    }.bind(this));

    this.map.on('click', 'unclustered-points-v3', function (e) {
        new mapboxgl.Popup({offset: 25})
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML(`<a class="cta" href="http://maps.google.com/maps?daddr=${e.features[0].geometry.coordinates[1]},${e.features[0].geometry.coordinates[0]}" target="_blank">Navigate</a>`)
            .addTo(this.map);
    }.bind(this));
  }

  setZoom(newZoom: number) {
    // Update zoom, if the new zoom is significantly different
    // ! Important so that this doesn't trigger an infinite loop due to rounding
    const zoom = this.map.getZoom();
    if (Math.abs(Math.round((zoom - newZoom) * 10)) > 0) {
      this.map.zoomTo(newZoom);
    }
  }

  setCenter(newCenter: GeoJSON.Position) {
    // Update center, if the new center is significantly different
    // ! Important so that this doesn't trigger an infinite loop due to rounding
    const center = [this.map.getCenter().lng, this.map.getCenter().lat];
    if ((Math.abs(Math.round((center[0] - newCenter[0]) * 1000)) > 0)
        || (Math.abs(Math.round((center[1] - newCenter[1]) * 1000)) > 0)) {
        this.map.flyTo({center: newCenter});
    }
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

  setSpots(spots: GeoJSON.FeatureCollection<GeoJSON.Point>) {
    this.map.getSource('spots').setData(spots);
  }

  setCurrentLocation(location: GeoJSON.Position) {
    const data = turf.featureCollection([
      turf.point(location)
    ]);
    this.map.getSource('currentLocation').setData(data);
  }

  setDestination(location: GeoJSON.Position) {
    let data = turf.featureCollection([]);
    if (location !== null) {
      data = turf.featureCollection([
        turf.point(location)
      ]);
    }
    this.map.getSource('destination').setData(data);
    this.setNearby(location);
  }

  setNearby(center: GeoJSON.Position) {
    let data = turf.featureCollection([]);
    if (center !== null) {
      data = turf.featureCollection([
        turfcircle(turf.point(center), 0.2)
      ]);
    }
    this.map.getSource('nearby').setData(data);
  }

}
