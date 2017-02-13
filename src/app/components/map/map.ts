import { Component, Input, OnInit, AfterViewInit, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { SpotApiService, Position} from '~/services';

type MapModes = "street" | "satellite";

@Component({})
abstract class BaseMapComponent implements OnChanges, AfterViewInit {
  private initialized : boolean;

  constructor(
    private spotApi: SpotApiService
  ) {
    this.initialized = false;
  }

  // ---------------------------------------------
  // Initialize the Map
  abstract initializeMap(): void;

  ngAfterViewInit(): void {
    this.initializeMap();
    this.initialized = true;
    this.listenToSpots();
  }

  // ---------------------------------------------
  // Update map view:
  @Input() zoom : number;
  @Input() mode : MapModes;
  @Input() center: any;

  // Increase or decrease the zoom by the given amount
  abstract updateZoom(zoom : number): void;

  // Change between mapModes
  abstract setMode(mode: MapModes): void;

  ngOnChanges(changes: SimpleChanges) {
    // Only start listening to changes after the map is initialized
    if(this.initialized){
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

  // ---------------------------------------------
  // Markers
  private markers = [];
  abstract addMarker($key: string, position: Position): void;
  abstract updateMarker($key: string, position: Position): void;
  abstract removeMarker($key: string): void;

  // Update the markers whenever spots are updated
  private listenToSpots(){
    this.spotApi.spots.subscribe(newMarkers => {
      this.markers.forEach(function(marker, i){
        let newMarker = newMarkers.find(nm => nm.$key === marker.$key) ;
        if (!newMarker) {
          // Something was deleted
          this.removeMarker(marker.$key);
          this.markers.splice(i, 1);
        } else if (marker.$lat !== newMarker.lat
          || marker.$lng !== newMarker.lng) {
            // Something was changed
            // Update these for future comparasion
            marker.lat = newMarker.lat;
            marker.lng = newMarker.lng;
            this.updateMarker(marker.$key, {lat: newMarker.lat, lng: newMarker.lng});
          }
        }, this);

        // Check if anything was added
        newMarkers.forEach(function(newMarker){
          if (!this.markers.find(m => m.$key === newMarker.$key)) {
            // Something was added
            this.markers.push(newMarker);
            this.addMarker(newMarker.$key, {lat: newMarker.lat, lng: newMarker.lng});
          };
        }, this);
      })
  }
  // // Update the Destination
  // //   This will drop a destination marker on the map
  // //   If the destination is set to the current location,
  // //     update the destination as current location updates
  // //   If the destination is null, remove the marker
  // setDestination(destinationIsCurrentLocation: boolean, destination?: Position);
  //
  // // Update the user's current location
  // //   This will drop a user marker on the map
  // //   If it is null, it will remove the marker
  // setCurrentLocation(currentLocation?: Position);
  //
  // // Nearby Markers
  // setNearbyMarkers(nearbyMarkers: Position[]);
  //
  // // Set Add Spot Mode

}

export {BaseMapComponent, MapModes};
