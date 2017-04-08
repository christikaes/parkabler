import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AddSpotSteps, StepStates } from '~/util';

@Component({
  selector: 'pa-add-spot-drawer',
  templateUrl: './addspot-drawer.component.html'
})

export class AddSpotDrawerComponent {
  private addSpotInfo;

  @Input() public opened: boolean;
  @Input() public step = 0;

  @Output() private close = new EventEmitter();
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

  onDone(result) {
    // post results to server through action
    console.log(result);
    console.log(this.changeNumSpots);
    console.log(this.changeSpotType);

    this.close.emit();
  }

  changeNumSpots(value) {
    this.addSpotInfo.numSpots = value;
    console.log(value);
  }

  changeSpotType(value) {
    this.addSpotInfo.spotType = value;
    console.log(value);
  }

  onLocationSet() {
    console.log('LOCATION SET');
  }
}
