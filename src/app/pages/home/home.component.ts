import { Component, OnInit, HostListener } from '@angular/core';
import {
  PlacesActions,
  SpotsActions,
  SpotsDatabaseActions,
  SpotsNearbyActions,
  AppModeActions,
  GeolocationActions
} from '~/actions';
import { Place, AppModes } from '~/util';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'pa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public mode: AppModes;
  public appModes = AppModes;
  public placeValue: string;

  @select(['destination', 'coordinates']) private destination$: Observable<GeoJSON.Position>;
  @select() private spots$: Observable<GeoJSON.FeatureCollection<GeoJSON.Point>>;
  @select() public spotsNearby$: Observable<GeoJSON.FeatureCollection<GeoJSON.Point>>;
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
    private geolocationActions: GeolocationActions,
    private appModeActions: AppModeActions
  ) { }

  ngOnInit() {
    this.geolocationActions.watch();

    // Get spots from the database
    this.spotsDatabaseActions.getSpots();

    // This combines both destination$ & spots$ observables
    // We then use the latest values from both to get nearby spots
    this.destination$.combineLatest(
      this.spots$,
      (destination, spots) => ({ destination, spots })
    ).subscribe(({ destination, spots }) => {
      this.spotsNearbyActions.getNearbySpots(destination, spots);
    });

    this.place$.subscribe((place: Place) => {
      if (place && place.text) {
        this.placeValue = place.text;
      } else {
        this.placeValue = '';
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
