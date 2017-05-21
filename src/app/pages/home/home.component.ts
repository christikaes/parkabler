import { Component, OnInit, HostListener } from '@angular/core';
import {
  PlacesActions,
  SpotsActions,
  SpotsDatabaseActions,
  SpotsNearbyActions,
  AppModeActions,
  AddSpotStepActions,
  ReportSpotStepActions,
  GeolocationActions
} from '~/actions';
import { Place, AppModes, AddSpotSteps, ReportSpotSteps } from '~/util';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';

@Component({
  selector: 'pa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public mode: AppModes;
  public appModes = AppModes;
  public reportSpotStep: ReportSpotSteps;
  public placeValue: string;

  @select(['destination', 'coordinates']) private destination$: Observable<GeoJSON.Position>;
  @select() private spots$: Observable<GeoJSON.FeatureCollection<GeoJSON.Point>>;
  @select() public spotsNearby$: Observable<GeoJSON.FeatureCollection<GeoJSON.Point>>;
  @select() private appMode$: Observable<AppModes>;
  @select() private reportSpotStep$: Observable<ReportSpotSteps>;
  @select() private place$: Observable<Place>;

  // Whenever the escape key is pressed go back to home mode
  @HostListener('document:keydown', ['$event'])
  keydown(e: KeyboardEvent) {
    if (e.keyCode === 27) {
      this.appModeActions.setModeHome();
    }
  }
  // Whenever the backbutton (cordova) is pressed go back to home mode
  @HostListener('document:backbutton', ['$event'])
  backbutton() {
    this.appModeActions.setModeHome();
  }

  constructor(
    private placesActions: PlacesActions,
    private spotsActions: SpotsActions,
    private spotsDatabaseActions: SpotsDatabaseActions,
    private spotsNearbyActions: SpotsNearbyActions,
    private reportSpotStepActions: ReportSpotStepActions,
    private geolocationActions: GeolocationActions,
    private appModeActions: AppModeActions
  ) {}

  ngOnInit() {
    this.geolocationActions.watch();

    // Get spots from the database
    this.spotsDatabaseActions.getSpots();

    // This combines both destination$ & spots$ observables
    // We then use the latest values from both to get nearby spots
    this.destination$.combineLatest(
      this.spots$,
      (destination, spots) => ({destination, spots})
    ).subscribe(({destination, spots}) => {
      this.spotsNearbyActions.getNearbySpots(destination, spots);
    });

    // Whenever the app mode changes, show/hide appropriate components
    this.appMode$.subscribe((mode: AppModes) => {
        this.mode = mode;
    });

    this.place$.subscribe((place: Place) => {
      if (place && place.text) {
        this.placeValue = place.text;
      }
    });
  }

  onPlaceUpdate(newPlace: Place) {
    this.placesActions.setPlace(newPlace);
  }

  onCloseReportSpot() {
    this.appModeActions.setModeHome();
  }
}
