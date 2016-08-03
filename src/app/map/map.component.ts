import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SpotApiService, MapLocationService } from '../services';

@Component({
  selector: 'main-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('googleMapsDiv') googleMapsDiv;
  map: any;

  constructor(
    private spotApi: SpotApiService,
    private mapLocation: MapLocationService
  ) {}

  ngOnInit() {}

  addSpots(): void {
    // Add spots to map from the spotApi
    this.spotApi.spots.forEach((spot) => {
      new window.google.maps.Marker({
        position: spot,
        map: this.map
      });
    });
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    // initialize google map div
    let mapDiv = this.googleMapsDiv.nativeElement;
    this.map = new window.google.maps.Map(mapDiv, { zoom: 15 });

    this.mapLocation.current.subscribe(res => {
      this.map.setCenter(res);
      this.addSpots();
    });
  }

}
