import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { select, NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { MapModes, AddSpotSteps, AppModes } from '~/util';
import { GeolocationService } from '~/services';
import { DestinationActions, MapActions } from '~/actions';
import { IAppState } from '~/store';
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
  public mode: MapModes;
  public center: GeoJSON.Position;

  public currentLocation: GeoJSON.Position;
  public destination: GeoJSON.Position;
  public geolocationAvailable: boolean;

  public spots: GeoJSON.FeatureCollection<GeoJSON.Point>;
  public showAddSpotOverlay: boolean;

  @select(['destination', 'coordinates']) private destination$: Observable<GeoJSON.Position>;
  @select() private spots$: Observable<GeoJSON.FeatureCollection<GeoJSON.Point>>;
  @select() private addSpotStep$: Observable<AddSpotSteps>;
  @select() private appMode$: Observable<AppModes>;
  @select(['geolocation', 'coordinates']) private geolocationCoordinates$: Observable<GeoJSON.Position>;
  @select(['geolocation', 'isAvailable']) private geolocationAvailable$: Observable<boolean>;
  @select(['map', 'zoom']) private zoom$: Observable<number>;
  @select(['map', 'center']) private center$: Observable<GeoJSON.Position>;
  @select(['map', 'mode']) private mode$: Observable<MapModes>;

  constructor(
    private geoLocation: GeolocationService,
    private destinationActions: DestinationActions,
    private mapActions: MapActions,
    private ref: ChangeDetectorRef,
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
    this.mode$.subscribe((m: MapModes) => {
      this.mode = m;
    });

    // Listen to changes in currentLocation
    this.geolocationCoordinates$.subscribe((location: GeoJSON.Position) => {
      this.currentLocation = location;
    });
    this.geolocationAvailable$.subscribe((isAvailable: boolean) => {
      this.geolocationAvailable = isAvailable;
    });

    // Listen to changes on destination
    this.destination$.subscribe((destination: GeoJSON.Position) => {
      this.center = destination;
      this.destination = destination;
      this.zoom = 15;
    });

    // Listen to changes on spots
    this.spots$.subscribe((spots: GeoJSON.FeatureCollection<GeoJSON.Point>) => {
      this.spots = spots;
    });

    // Show the add spot overlay if in app spot mode, and on the location step
    this.addSpotStep$.combineLatest(
      this.appMode$,
      (addSpotStep: AddSpotSteps, appMode: AppModes) => ({addSpotStep, appMode})
    ).subscribe( ({addSpotStep, appMode}) => {
      this.showAddSpotOverlay = addSpotStep === AddSpotSteps.Location && appMode === AppModes.AddSpot;
    });
  }

  setMode(m: MapModes): void {
    this.mapActions.setMode(m);
  }

  setZoom(z: number): void {
    this.mapActions.setZoom(z);
  }

  setCenter(c: GeoJSON.Position): void {
    this.mapActions.setCenter(c);
  }

  recenterChange(): void {

    // Set destination to current location
    this.destinationActions.setToCurrentLocation();

    // // TODO-rangle: would it be better to get this from global state?
    // let currentLocation = this.ngRedux.getState().geolocation.coordinates;
    // if (!currentLocation) {
    //   console.log('Could not find current location');
    //   return;
    // }
    // this.mapActions.setCenter(currentLocation);
    // this.mapActions.setZoom(18);
    // this.destinationActions.setDestination(currentLocation);
  }
}
