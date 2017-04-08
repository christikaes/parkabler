import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AddSpotSteps, StepStates } from '~/util';

@Component({
  selector: 'pa-add-spot-drawer',
  templateUrl: './addspot-drawer.component.html'
})

export class AddSpotDrawerComponent {
  private addSpotInfo = {
    numSpots: null,
    spotType: null
  };

  @Input() public opened: boolean;
  @Input() public step = 0;

  @Output() private close = new EventEmitter();
  @Output() private submit = new EventEmitter();
  @Output() private setLocation = new EventEmitter();
  @Output() private stepChange = new EventEmitter();

  onClose() {
    this.close.emit();
  }

  onStepChange(step) {
    // Update global state if the step changed
    if (step !== this.step) {
      this.stepChange.emit(step);
    }
  }

  onSubmit() {
    this.submit.emit(this.addSpotInfo);
  }

  changeNumSpots(value) {
    this.addSpotInfo.numSpots = value;
  }

  changeSpotType(value) {
    this.addSpotInfo.spotType = value;
  }

  onSetLocation() {
    console.log('Before emit');
    this.setLocation.emit();
  }
}
