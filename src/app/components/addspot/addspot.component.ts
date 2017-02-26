import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AddSpotSteps, StepStates } from '~/util';
import Animations from '~/animations';


@Component({
  selector: 'pa-add-spot',
  templateUrl: './addspot.component.html',
  styleUrls: ['./addspot.component.scss'],
  animations: Animations
})

export class AddSpotComponent {

  @Input() public opened: boolean;
  @Input() public step = 0;

  @Output() private open = new EventEmitter();
  @Output() private close = new EventEmitter();
  @Output() private stepChange = new EventEmitter();

  onClose() {
    this.close.emit();
  }

  onOpen() {
    this.open.emit();
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

    this.close.emit();
  }

  changeNumSpots(value) {
    console.log(value);
  }

  changeSpotType(value) {
    console.log(value);
  }

  onLocationSet(){
    console.log('LOCATION SET');
  }
}
