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
import { MapboxAccessTolken } from '~/util';

const turfcircle = require('@turf/circle');
const turfhelpers = require('@turf/helpers');
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
  @Input() center: GeoJSON.Position;
  @Output() centerChange = new EventEmitter<GeoJSON.Position>();
  @Input() spots: GeoJSON.FeatureCollection<GeoJSON.Point>;
  @Input() currentlocation: GeoJSON.Position;
  @Input() destination: GeoJSON.Position;
  @Input() showAddSpotOverlay: boolean;
  @Input() interactable: boolean;
  @Output() markerSelected = new EventEmitter<string>();

  private map: any;
  private initialized = false;
  private addSpotOverlayMarker;

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
        } else if (change === 'spots') {
          this.setSpots(changes[change].currentValue);
        } else if (change === 'currentlocation') {
          this.setCurrentLocation(changes[change].currentValue);
        } else if (change === 'destination') {
          this.setDestination(changes[change].currentValue);
        } else if (change === 'showAddSpotOverlay') {
          this.setAddSpotOverlay(changes[change].currentValue);
        } else if (change === 'interactable') {
          this.setInteractable(changes[change].currentValue);
        } else {
          throw new Error('Uncaught change: ' + change);
        }
      }
    }
  }

  initializeMap(): void {
    mapboxgl.accessToken = MapboxAccessTolken;
    const mapDiv = this.MapDiv.nativeElement;
    this.map = new mapboxgl.Map({
      container: mapDiv,
      style: mapstyle,
      center: this.center,
      zoom: this.zoom,
      attributionControl: false,
      logoPosition: 'top-left'
    });

    // Add compact attribution control
    this.map.addControl(new mapboxgl.AttributionControl({
      compact: true
    }), 'top-right');

    // HACK: Not sure why canvas is set to absolute position, but it breaks styling:
    this.map.getCanvas().style.position = 'initial';

    // To see all of the events:
    // console.log(this.map._listeners);

    // Signal that the map is loaded
    this.map.on('load', () => {
      // map.resize();
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', true, false);
      document.dispatchEvent(event);

      // Setup with initial spots
      this.setSpots(this.spots);
      this.setCenter(this.center);
      this.setCurrentLocation(this.currentlocation);
      this.setupAddSpotOverlay();

      this.initialized = true;
    });
  }

  addListeners() {
    this.map.on('moveend', () => {
      this.centerChange.emit([this.map.getCenter().lng, this.map.getCenter().lat]);
    });

    this.map.on('zoomend', () => {
      this.zoomChange.emit(this.map.getZoom());
    });

    // Set the active Spot on click
    const centerOnClick = (lngLat) => {
      const minZoom = this.map.getZoom();
      const maxZoom = 15;
      this.map.easeTo({
        center: [lngLat.lng, lngLat.lat],
        speed: 0.5,
        zoom: Math.max(minZoom, Math.min(minZoom + 1, maxZoom))
      });
    };

    this.map.on('click', function (e) {
      if (this.interactable) {
        this.markerSelected.emit(null);
      }
    }.bind(this));

    this.map.on('click', 'cluster-0', function (e) {
      if (this.interactable) {
        this.markerSelected.emit(null);
        centerOnClick(e.lngLat);
      }
    }.bind(this));

    this.map.on('click', 'unclustered-points', function (e) {
      if (this.interactable) {
        const unactiveFeature = e.features.find(f => !f.properties.active);
        if (unactiveFeature && this.map.getZoom() >= 15) {
          this.markerSelected.emit(unactiveFeature.properties.id);
        } else {
          this.markerSelected.emit(null);
        }
        centerOnClick(e.lngLat);
      }
    }.bind(this));

    this.map.on('move', () => {
      if (this.addSpotOverlayMarker) {
        this.addSpotOverlayMarker.setLngLat([this.map.getCenter().lng, this.map.getCenter().lat]);
      }
    });
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
      this.map.easeTo({ center: newCenter, zoom: this.zoom });
    }
  }

  setSpots(spots: any) {
    // HACK: There is a bug with MapboxGl cluster drops property id
    spots.features.forEach(spot => {
      const marker = spot.properties.active ? 'pin-active' : spot.properties.nearby ? 'pin-nearby' : 'pin-default';
      spot.properties = {
        ...spot.properties,
        id: spot.id,
        marker
      };
    });
    this.map.getSource('spots').setData(spots);
  }

  setCurrentLocation(location: GeoJSON.Position) {
    if (!location) {
      return;
    }
    const data = turfhelpers.featureCollection([
      turfhelpers.point(location)
    ]);
    this.map.getSource('currentLocation').setData(data);
  }

  setDestination(location: GeoJSON.Position) {
    let data = turfhelpers.featureCollection([]);
    if (location !== null) {
      data = turfhelpers.featureCollection([
        turfhelpers.point(location)
      ]);
    }
    this.map.getSource('destination').setData(data);
    this.setNearby(location);
  }

  setNearby(center: GeoJSON.Position) {
    let data = turfhelpers.featureCollection([]);
    if (center !== null) {
      data = turfhelpers.featureCollection([
        turfcircle(turfhelpers.point(center), 0.2)
      ]);
    }
    this.map.getSource('nearby').setData(data);
  }

  setupAddSpotOverlay() {
    const el = document.createElement('div');
    el.style.backgroundImage = 'url(assets/img/add_pin.svg)';
    el.style.backgroundSize = 'contain';
    el.style.backgroundColor = 'transparent';
    el.style.margin = '-50px -25px';
    el.style.width = '50px';
    el.style.height = '50px';

    this.addSpotOverlayMarker = new mapboxgl.Marker(el)
      .setLngLat([this.map.getCenter().lng, this.map.getCenter().lat]);
  }

  setAddSpotOverlay(show: boolean) {
    if (show) {
      this.addSpotOverlayMarker.addTo(this.map);
      this.map.setPaintProperty('addSpotOverlayBackground', 'background-opacity', 0.5);
    } else {
      this.addSpotOverlayMarker.remove();
      this.map.setPaintProperty('addSpotOverlayBackground', 'background-opacity', 0);
    }
  }

  setInteractable(interactable: boolean) {
    if (interactable) {
      this.map['dragPan'].enable();
      this.map['keyboard'].enable();
      if (this.showAddSpotOverlay) {
        this.map.setPaintProperty('addSpotOverlayBackground', 'background-opacity', 0.5);
      }
    } else {
      this.map['dragPan'].disable();
      this.map['keyboard'].disable();
      if (this.showAddSpotOverlay) {
        this.map.setPaintProperty('addSpotOverlayBackground', 'background-opacity', 0);
      }

    }
  }

}
