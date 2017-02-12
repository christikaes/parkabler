import { Component, Input, OnInit, AfterViewInit, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { SpotApiService, MapLocationService, GeolocationService, DestinationLocationService, Position} from '~/services';
import { Map, MapModes } from '~/components/map';
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

@Component({
  selector: 'pa-map-gl',
  templateUrl: './mapgl.component.html',
  styleUrls: ['./mapgl.component.scss']
})
export class MapGLComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('MapDiv') MapDiv;
  @Input() zoom : number;
  @Input('view') mode : MapModes;
  @Input() center: any;
  private map: any;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    let mapDiv = this.MapDiv.nativeElement;
    this.map = new mapboxgl.Map({
      container: mapDiv,
      style: 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json',
      center: [-71.06, 42.35],
      zoom: 15
    });
    // HACK: Not sure why canvas is set to absolute position, but it breaks styling:
    this.map.getCanvas().style.position = "initial";
  }

  updateZoom(zoom : number) {
    console.log("updateZoom");
  }

  setMode(mode: MapModes) {
    console.log("setMode");
  }

  ngOnChanges(changes: SimpleChanges) {
      for(let change in changes){
        switch (change) {
          case "zoom":
            this.updateZoom(changes[change].currentValue);
            break;
          case "mode":
            this.setMode(changes[change].currentValue);
            break;
          default:
            console.log("Uncaught change: " + change);
            break;
        }
      }
  }

}
