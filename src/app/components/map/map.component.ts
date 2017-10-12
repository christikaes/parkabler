import { Component, OnInit, AfterViewInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { GeolocationService } from '~/services';
import { DestinationActions, MapActions, SpotsActions, GeolocationActions } from '~/actions';
import { IAppState, Spots, Spot } from '~/store';
const turfHelper = require('@turf/helpers');

// TODO-rangle: is there a better way to require this?
// Should i add this to vendor.js?
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

@Component({
  selector: 'pa-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  public supportsGL: boolean;

  public zoom: number;
  public center: GeoJSON.Position;

  public currentLocation: GeoJSON.Position;
  public destination: GeoJSON.Position;
  public geolocationAvailable: boolean;

  public spots: GeoJSON.FeatureCollection<GeoJSON.Point>;

  @select(['destination', 'coordinates']) private destination$: Observable<GeoJSON.Position>;
  @select(['spots', 'compiled']) private spots$: Observable<Spots>;
  @select(['spots', 'active']) private active$: Observable<Spot>;
  @select(['geolocation', 'coordinates']) private geolocationCoordinates$: Observable<GeoJSON.Position>;
  @select(['geolocation', 'isAvailable']) private geolocationAvailable$: Observable<boolean>;
  @select(['map', 'zoom']) private zoom$: Observable<number>;
  @select(['map', 'center']) private center$: Observable<GeoJSON.Position>;
  @select(['map', 'interactable']) private interactable$: Observable<boolean>;
  @select(['map', 'addSpotOverlay']) private addSpotOverlay$: Observable<boolean>;

  constructor(
    private geoLocation: GeolocationService,
    private destinationActions: DestinationActions,
    private spotsActions: SpotsActions,
    private geolocationActions: GeolocationActions,
    private mapActions: MapActions,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngAfterViewInit() {
    this.supportsGL = mapboxgl.supported();

    // Listen to changes on the map state
    this.zoom$.subscribe((z: number) => {
      this.zoom = z;
    });
    this.center$.subscribe((c: GeoJSON.Position) => {
      this.center = c;
    });

    // Listen to changes in currentLocation
    this.geolocationCoordinates$.subscribe((location: GeoJSON.Position) => {
      this.currentLocation = location;

      // If it is the first view, then set the current center
      if (this.ngRedux.getState().firstView && location) {
        this.center = location;
      }
    });
    this.geolocationAvailable$.subscribe((isAvailable: boolean) => {
      this.geolocationAvailable = isAvailable;
    });

    // Listen to changes on destination
    this.destination$.subscribe((destination: GeoJSON.Position) => {
      this.destination = destination;
      if (destination !== null) {
        this.zoom = 15;
        this.center = destination;
      }
    });

    // Listen to changes on spots
    this.spots$.subscribe((spots: Spots) => {
      this.spots = turfHelper.featureCollection(spots);
    });

    // Listen to changes on the active spot
    this.active$.subscribe((spot: Spot) => {
      if (spot) {
        this.zoom = 15;
        this.center = spot.geometry.coordinates;
      }
    });
  }

  setZoom(z: number): void {
    this.mapActions.setZoom(z);
  }

  setCenter(c: GeoJSON.Position): void {
    this.mapActions.setCenter(c);
  }

  setSelectedSpot(spotId: string): void {
    this.spotsActions.setActiveSpotId(spotId);
  }

  recenterChange(): void {
    // If the geolocation is not found, then try to watch it
    if (!this.geolocationAvailable) {
      this.geolocationActions.watch();
    }

    // Set destination to current location
    this.destinationActions.setToCurrentLocation();
  }
}
