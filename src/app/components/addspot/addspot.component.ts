import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddSpotSteps, StepStates, AppModes } from '~/util';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '~/store';
import { AppModeActions, AddSpotStepActions, AddSpotInfoActions } from '~/actions';
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

  @select() private appMode$: Observable<AppModes>;
  @select() private addSpotStep$: Observable<AddSpotSteps>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private appModeActions: AppModeActions,
    private addSpotStepActions: AddSpotStepActions,
    private addSpotInfoActions: AddSpotInfoActions
  ) {}

  ngOnInit() {
    this.appMode$.subscribe((mode: AppModes) => {
      this.isAppMode = mode === AppModes.AddSpot;
    });

    this.addSpotStep$.subscribe((step: AddSpotSteps) => {
      this.addSpotStep = step;
    });
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

  onSetLocation() {
    this.addSpotInfoActions.setLocation();
  }

  onSubmitAddSpot(state) {
    this.addSpotInfoActions.setInfo(state);
    // Actually add the spot
  }
}
