import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SpotApiService, MapLocationService } from '../services';

@Component({
  selector: 'main-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('googleMapsDiv') googleMapsDiv;
  private map: any;
  // Holds a reference to all the markers on the map so we know what changes
  private markers = [];
  // Holds a reference to the markerClusterer so that we can update this on changes
  private markerClusterer: any;

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

    // initialize markerClusterer
    this.markerClusterer = new window.MarkerClusterer(this.map, this.markers);

    this.mapLocation.current.subscribe(res => {
      this.map.setCenter(res);
    });

    this.spotApi.spots.subscribe(newMarkers => {

      this.markers.forEach(function(marker, i){
        let newMarker = newMarkers.find(nm => nm.$key === marker.$key) ;
        if (!newMarker) {
          // Something was deleted
          this.markerClusterer.removeMarker(marker);
          marker.setMap(null);
          window.google.maps.event.clearInstanceListeners(marker);
          this.markers.splice(i, 1);
        } else if (marker.$lat !== newMarker.lat
                || marker.$lng !== newMarker.lng) {
          // Something was changed
          //  TODO: There is no updateMarker function in markerClusterer, so add and remove the marker
          this.markerClusterer.removeMarker(marker);
          marker.setPosition({lat: newMarker.lat, lng: newMarker.lng});
          // Update these for future comparasion
          marker.$lat = newMarker.lat;
          marker.$lng = newMarker.lng;
          this.markerClusterer.addMarker(marker);
        }
      }, this);

      // Check if anything was added
      newMarkers.forEach(function(newMarker){
        if (!this.markers.find(m => m.$key === newMarker.$key)) {
          // Something was added
          let addedMarker = new window.google.maps.Marker({
            position: {
              lat: newMarker.lat,
              lng: newMarker.lng
            },
            map: this.map,
            icon: 'img/marker.png',
            $key: newMarker.$key,
            $lat: newMarker.lat,
            $lng: newMarker.lng
          });
          this.markers.push(addedMarker);
          this.markerClusterer.addMarker(addedMarker);
        };
      }, this);

    });
  }

}
