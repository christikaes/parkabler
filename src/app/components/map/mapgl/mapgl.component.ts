import { Component, Input, OnInit, AfterViewInit, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { SpotApiService, MapLocationService, GeolocationService, DestinationLocationService, Position} from '~/services';
import { BaseMapComponent, MapModes } from '~/components/map';
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
var mapstyle = require('./style.json');

@Component({
  selector: 'pa-map-gl',
  templateUrl: './mapgl.component.html',
  styleUrls: ['./mapgl.component.scss']
})
export class MapGLComponent extends BaseMapComponent {
  @ViewChild('MapDiv') MapDiv;
  private map: any;

  initializeMap(): void {
    let mapDiv = this.MapDiv.nativeElement;
    this.map = new mapboxgl.Map({
      container: mapDiv,
      style: mapstyle,
      center: [-71.06, 42.35],
      zoom: 15
    });
    // HACK: Not sure why canvas is set to absolute position, but it breaks styling:
    this.map.getCanvas().style.position = "initial";
  }

  updateZoom(zoom : number) {
    this.map.zoomTo(zoom);
  }

  setMode(mode: MapModes) {
    console.log("setMode");
  }

  addMarker($key: string, position: Position){
    var el = document.createElement('div');
    el.className = 'marker';

    // TODO: pull this from redux store

    var marker = new mapboxgl.Marker(el)
      .setLngLat([position.lng, position.lat])
      .addTo(this.map);
  }

  removeMarker(){
    console.log("To implement");
  }

  updateMarker(){
    console.log("To implement")
  }

}
