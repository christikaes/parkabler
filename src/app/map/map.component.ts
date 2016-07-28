import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'main-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('googleMapsDiv') googleMapsDiv;
  map: any;

  constructor() {
    // Do stuff
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    let mapDiv = this.googleMapsDiv.nativeElement;
    this.map = plugin.google.maps.Map.getMap(mapDiv);
    /*
    this.map.addEventListener(plugin.google.maps.event.MAP_READY, () => {
      this.map.getMyLocation((location) => {
        this.map.addMarker({
          "position": location.latLng
        }, (marker) => {
          marker.showInfoWindow();
        });
        this.map.setCenter(location.latLng);
        this.map.setZoom(17); // it looks good
      }, () => alert("location failure"));
    });
    */
  }

}
