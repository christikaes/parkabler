import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SpotApiService, MapLocationService, GeolocationService, DestinationLocationService, MapModes} from '~/services';

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('MapDiv') MapDiv;
  private map: any;
  // Holds a reference to all the markers on the map so we know what changes
  private markers = [];
  // Holds a reference to the markerClusterer so that we can update this on changes
  private markerClusterer: any;
  private infoWindow: any;
  private infoWindowTemplate: any;

  constructor(
    private spotApi: SpotApiService,
    private mapLocation: MapLocationService,
    private geoLocation: GeolocationService,
    private destinationLocation: DestinationLocationService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    let mapDiv = this.MapDiv.nativeElement;
    var map = new mapboxgl.Map({
      container: mapDiv,
      style: 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json',
      center: [-71.06, 42.35],
      zoom: 15
    });
    // HACK: Not sure why canvas is set to absolute position, but it breaks styling:
    map.getCanvas().style.position = "initial";
  }

  zoomChange(z: number): void {
    this.map.setZoom(this.map.getZoom() + z);
  }

  viewChange(v: MapModes): void {
    this.map.setMapTypeId(v);
  }
}
