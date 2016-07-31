import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SpotApiService } from '../shared';

declare var google: any;

@Component({
  selector: 'main-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('googleMapsDiv') googleMapsDiv;
  map: any;

  constructor(private spotApi: SpotApiService) {
    // Do stuff
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    let mapDiv = this.googleMapsDiv.nativeElement;
    this.map = new google.maps.Map(mapDiv, {
        center: {lat: 44.540, lng: -78.546},
        zoom: 8
    });
  }

}
