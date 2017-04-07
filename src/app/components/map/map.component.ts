import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { MapModes, Position, Spots, AddSpotSteps, AppModes } from '~/util';
import { GeolocationService } from '~/services';
import { DestinationActions, MapActions } from '~/actions';
// TODO-rangle: is there a better way to require this?
// Should i add this to vendor.js?
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

@Component({
  selector: 'pa-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public supportsGL: boolean;

  public _zoom: number;
  public get zoom() {
    // console.log('get zoom: ' + this._zoom);
    return this._zoom;
  }
  public set zoom (z) {
    console.log('set zoom: ' + z);
    this._zoom = z;
    this.mapActions.setZoom(z);
  }

  private _mode: MapModes;
  public get mode() {
    return this._mode;
  }
  public set mode(m) {
    this._mode = m;
    this.mapActions.setMode(m);
  }

  private _center: GeoJSON.Position;
  public get center() {
    return this._center;
  }
  public set center (c) {
    this._center = c;
    this.mapActions.setCenter(c);
  }

  public spots: Spots;
  public showAddSpotOverlay: boolean;

  @select() private destination$: Observable<Position>;
  @select() private spots$: Observable<Spots>;
  @select() private addSpotStep$: Observable<AddSpotSteps>;
  @select() private appMode$: Observable<AppModes>;

  @select(['map', 'zoom']) zoom$: Observable<number>;
  @select(['map', 'center']) center$: Observable<GeoJSON.Position>;
  @select(['map', 'mode']) mode$: Observable<MapModes>;

  constructor(
    private geoLocation: GeolocationService,
    private destinationActions: DestinationActions,
    private mapActions: MapActions,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.supportsGL = mapboxgl.supported();


    // Listen to changes on the map state
    this.zoom$.subscribe((z: number) => {
      console.log('new zoom');
       this.zoom = z;
    });
    this.center$.subscribe((c: GeoJSON.Position) => {
      this.center = c;
    });
    this.mode$.subscribe((m: MapModes) => {
      this.mode = m;
    });

    // Listen to changes on destination
    this.destination$.subscribe((destination: Position) => {
      this.center = [destination.lng, destination.lat];
      this.zoom = 15;
    });

    // Listen to changes on spots
    this.spots$.subscribe((spots: Spots) => {
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

  zoomChange(z: number): void {
    console.log('zoomChange: ' + z);
    this.zoom += z;
  }

  modeChange(v: MapModes): void {
    console.log('MODECHANGE');
    this.mode = v;
  }

  recenterChange(): void {
    // TODO-rangle: would it be better to get this from global state?
    this.geoLocation.currentLocation()
      .then((p: Position) => {
        this.center = [p.lng, p.lat];
        this.zoom = 18;
        this.destinationActions.setDestination(p);
      })
      .catch(() => {
        console.log('Current Location Not found');
      });
  }
}
