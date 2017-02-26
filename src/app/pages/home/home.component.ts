import { Component, OnInit } from '@angular/core';
import { PlacesActions, SpotsActions, NearbySpotsActions, AppModeActions, AddSpotStepActions, ReportSpotStepActions } from '~/actions';
import { Position, Place, Spots, NearbySpots, AppModes, AddSpotSteps, ReportSpotSteps } from '~/util';
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
  public addSpotStep: AddSpotSteps;
  public reportSpotStep: ReportSpotSteps;

  @select() private destination$: Observable<Position>;
  @select() private spots$: Observable<Spots>;
  @select() public nearbySpots$: Observable<NearbySpots>;
  @select() private appMode$: Observable<AppModes>;
  @select() private addSpotStep$: Observable<AddSpotSteps>;
  @select() private reportSpotStep$: Observable<ReportSpotSteps>;

  constructor(
    private placesActions: PlacesActions,
    private spotsActions: SpotsActions,
    private nearbySpotsActions: NearbySpotsActions,
    private appModeActions: AppModeActions,
    private addSpotStepActions: AddSpotStepActions,
    private reportSpotStepActions: ReportSpotStepActions
  ) {}

  ngOnInit() {
    this.spotsActions.getSpots();

    // This combines both destination$ & spots$ observables
    // We then use the latest values from both to get nearby spots
    this.destination$.combineLatest(
      this.spots$,
      (destination, spots) => ({destination, spots})
    ).subscribe(({destination, spots}) => {
      this.nearbySpotsActions.getNearbySpots(destination, spots);
    });

    // Whenever the app mode changes, show/hide appropriate components
    this.appMode$.subscribe((mode: AppModes) => {
        this.mode = mode;
    });

    // Whenever the addspot/reportspot step changes, bubble to the components
    this.addSpotStep$.subscribe((step: AddSpotSteps) => {
      this.addSpotStep = step;
    });

    this.reportSpotStep$.subscribe((step: ReportSpotSteps) => {
      this.reportSpotStep = step;
    });
  }

  onPlaceUpdate(newPlace: Place) {
    this.placesActions.setPlace(newPlace);
  }

  onOpenAddSpot() {
    this.appModeActions.setModeAddSpot();
  }

  onCloseAddSpot() {
    this.appModeActions.unsetModeAddSpot();
  }

  onAddSpotStepChange(step) {
    this.addSpotStepActions.setStep(step);
  }
}
