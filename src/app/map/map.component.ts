import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SpotApiService, MapLocationService } from '../services';
// import 'lodash'_;

@Component({
  selector: 'main-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('googleMapsDiv') googleMapsDiv;
  map: any;
  // Holds a reference to all the markers on the map so we know what changes
  private markers = [];

  constructor(
    private spotApi: SpotApiService,
    private mapLocation: MapLocationService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    // initialize google map div
    let mapDiv = this.googleMapsDiv.nativeElement;
    this.map = new window.google.maps.Map(mapDiv, {
      zoom: 15,
      disableDefaultUI: true
    });

    this.mapLocation.current.subscribe(res => {
      this.map.setCenter(res);
    });

    this.spotApi.spots.subscribe(newMarkers => {

      this.markers.forEach(function(marker, i){
        let newMarker = newMarkers.find(nm => nm.$key === marker.$key) ;
        if (!newMarker) {
          // Something was deleted
          marker.setMap(null);
          window.google.maps.event.clearInstanceListeners(marker);
          this.markers.splice(i, 1);
          // delete marker?

        } else if (marker.$lat !== newMarker.lat
                || marker.$lng !== newMarker.lng) {
          // Something was changed
          marker.setPosition({lat: newMarker.lat, lng: newMarker.lng});
          // Update these for future comparasion
          marker.$lat = newMarker.lat;
          marker.$lng = newMarker.lng;
        }
      }, this);

      // Check if anything was added
      newMarkers.forEach(function(newMarker){
        if (!this.markers.find(m => m.$key === newMarker.$key)) {
          // Something was added
           this.markers.push(new window.google.maps.Marker({
             position: {
               lat: newMarker.lat,
               lng: newMarker.lng
             },
             map: this.map,
             $key: newMarker.$key,
             $lat: newMarker.lat,
             $lng: newMarker.lng
           }));
        };
      }, this);

    });
  }

}
