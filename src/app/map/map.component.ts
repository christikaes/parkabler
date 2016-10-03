import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SpotApiService, MapLocationService, GeolocationService, DestinationLocationService, MapModes} from '../services';

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
    // initialize google map div
    let mapDiv = this.googleMapsDiv.nativeElement;
    this.map = new window.google.maps.Map(mapDiv, {
      zoom: 15,
      zoomControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      rotateControl: false,
      scaleControl: false,
      streetViewControl: false,
      tilt: 0
    });

    // initialize markerClusterer
    this.markerClusterer = new window.MarkerClusterer(this.map, this.markers);

    // initialize infoWindow
    this.infoWindow = new window.google.maps.InfoWindow();
    this.infoWindowTemplate = function(marker){
      return '<div>' +
                '<a md-raised-button color="primary" href="http://maps.google.com/maps?daddr=' +
                  marker.$lat + ',' + marker.$lng + '" target="_blank"> Navigate </a>' +
              '</div>';
    };

    // Update map center, zoom, or mapMode whenever the mapLocation is updated
    this.mapLocation.current.subscribe(res => {
      this.map.setCenter(res);
    });

    this.mapLocation.zoom.subscribe(res => {
      // Zoom the map smoothly
      function smoothZoom (map: any, targetZoom: number, currentZoom: number) {
        if (currentZoom !== targetZoom) {
            window.google.maps.event.addListenerOnce(map, 'zoom_changed', function (event) {
                smoothZoom(map, targetZoom, currentZoom + (targetZoom > currentZoom ? 1 : -1));
            });
            setTimeout(function(){ map.setZoom(currentZoom); }, 80);
        }
      };
      smoothZoom(this.map, res, this.map.getZoom());
    });

    this.mapLocation.mode.subscribe(res => {
      this.map.setMapTypeId(res);
    });

    // Update the spots whenever spots are updated
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
            label: {
              text: '1', // TODO: This should be newMarker.spots
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#FFF'
            },
            icon: {
                path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
                fillColor: '#009688',
                fillOpacity: 0.9,
                strokeColor: '#FFF',
                strokeWeight: 1.5,
                scale: 1,
                labelOrigin: new window.google.maps.Point(0, -29)
            },
            $key: newMarker.$key,
            $lat: newMarker.lat,
            $lng: newMarker.lng
          });
          // Open info window on marker click
          addedMarker.addListener('click', function(){
            this.infoWindow.setContent(this.infoWindowTemplate(addedMarker));
            this.infoWindow.open(this.map, addedMarker);
          }.bind(this));
          this.markers.push(addedMarker);
          this.markerClusterer.addMarker(addedMarker);
        };
      }, this);

    });
  }

  zoomChange(z: number): void {
    this.map.setZoom(this.map.getZoom() + z);
  }

  viewChange(v: MapModes): void {
    this.map.setMapTypeId(v);
  }
}
