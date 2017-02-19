import { Component, Input, OnInit, AfterViewInit, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { SpotsService } from '~/services';
import { Position, MapModes, Spots } from '~/util';

@Component({})
abstract class BaseMapComponent implements OnChanges, AfterViewInit {
  private initialized: boolean;

  constructor(
    private spotApi: SpotsService
  ) {
    this.initialized = false;
  }

  // ---------------------------------------------
  // Initialize the Map
  // Call the callback once the map is done being initialized
  abstract initializeMap(done: (boolean) => void): void;

  ngAfterViewInit(): void {
    this.initializeMap((initialized: boolean) => {
      this.initialized = initialized;
      this.setSpots(this.spots);
    });
    // this.listenToSpots();
  }

  // ---------------------------------------------
  // Update map view:
  // tslint:disable-next-line:member-ordering
  @Input() zoom: number;
  @Input() mode: MapModes;
  @Input() center: any;
  @Input() spots: any ; // TODO GeoJson

  // Increase or decrease the zoom by the given amount
  abstract updateZoom(zoom: number): void;

  // Change between mapModes
  abstract setMode(mode: MapModes): void;

  // Set the center of the map
  abstract setCenter(center: Position): void;

  // Set the spots with the given list of spots
  abstract setSpots(spots: Spots): void;

  ngOnChanges(changes: SimpleChanges) {
    // Only start listening to changes after the map is initialized
    if (this.initialized) {
      for (let change in changes) {
        if (change === 'zoom') {
          this.updateZoom(changes[change].currentValue);
        } else if ( change === 'mode') {
          this.setMode(changes[change].currentValue);
        } else if (change === 'center') {
          this.setCenter(changes[change].currentValue);
        } else if (change === 'spots') {
          console.log('map.ts');
          this.setSpots(changes[change].currentValue);
        } else {
          console.log('Uncaught change: ' + change);
        }
      }
    }
  }

  // ---------------------------------------------
  // Markers
  // tslint:disable-next-line:member-ordering
  private markers = [];
  abstract addMarker($key: string, position: Position): void;
  abstract updateMarker($key: string, position: Position): void;
  abstract removeMarker($key: string): void;

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
