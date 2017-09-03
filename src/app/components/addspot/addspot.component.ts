import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddSpotSteps, StepStates, AppModes } from '~/util';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '~/store';
import { AppModeActions, AddSpotStepActions, AddSpotInfoActions, SpotsAddActions } from '~/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'pa-add-spot',
  templateUrl: './addspot.component.html',
  styleUrls: ['./addspot.component.scss']
})

export class AddSpotComponent implements OnInit {
  public isAppMode: boolean;
  public addSpotStep: AddSpotSteps;
  public addSpotSteps = AddSpotSteps;
  public ramp: boolean;
  public timeRestrictions: boolean;
  public fee: boolean;
  public residential: boolean;
  public comments: boolean;

  public numSpots: number;

  @select() private appMode$: Observable<AppModes>;
  @select() private addSpotStep$: Observable<AddSpotSteps>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private appModeActions: AppModeActions,
    private addSpotStepActions: AddSpotStepActions,
    private addSpotInfoActions: AddSpotInfoActions,
    private spotsAddActions: SpotsAddActions
  ) { }

  ngOnInit() {
    this.appMode$.subscribe((mode: AppModes) => {
      this.isAppMode = mode === AppModes.AddSpot;
      console.log(this.isAppMode);
    });

    this.addSpotStep$.subscribe((step: AddSpotSteps) => {
      this.addSpotStep = step;
    });
  }

  onCloseAddSpot() {
    this.appModeActions.unsetModeAddSpot();
  }

  onAddSpotStepChange(step) {
    this.addSpotStepActions.setStep(step);
  }

  onSetLocation() {
    this.addSpotInfoActions.setLocation();
  }

  onSubmitAddSpot(state) {
    this.addSpotInfoActions.setInfo({
      numspots: this.numSpots
    });
    this.spotsAddActions.addSpot();
  }
}
