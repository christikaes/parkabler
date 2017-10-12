import { Component, OnInit, HostListener } from '@angular/core';
import {
  PlacesActions,
  SpotsActions,
  AppModeActions
} from '~/actions';
import { Place, AppModes } from '~/util';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Spots, Spot } from '~/store';

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
  @select(['spots', 'nearby']) public spotsNearby$: Observable<Spots>;
  @select(['spots', 'active']) public spotsActive$: Observable<Spot>;
  @select(['spots', 'database']) public spotsDatabase$: Observable<Spots>;
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
    private appModeActions: AppModeActions
  ) { }

  ngOnInit() {
    // Get spots from the database
    this.spotsActions.getDatabaseSpots();

    // TODO: MOVE THIS
    // This combines both destination$ & spots$ observables
    // We then use the latest values from both to get nearby spots
    this.destination$.combineLatest(
      this.spotsDatabase$,
      (destination, spots) => ({ destination, spots })
    ).subscribe(({ destination, spots }) => {
      this.spotsActions.getNearbySpots(destination, spots);
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
