import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AddSpotSteps, StepStates } from '~/util';
import Animations from '~/animations';


@Component({
  selector: 'pa-add-spot',
  templateUrl: './addspot.component.html',
  styleUrls: ['./addspot.component.scss'],
  animations: Animations
})

export class AddSpotComponent implements OnChanges {

  @Input() public opened: boolean;
  @Input() private step: number;

  @Output() private open = new EventEmitter();
  @Output() private close = new EventEmitter();
  @Output() private stepChange = new EventEmitter();

  onClose() {
    this.close.emit();
  }

  onOpen() {
    this.open.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let change in changes) {
      if (change === 'step') {

      }
    }
  }

  onStepChange(step) {
    // Update global state
    this.stepChange.emit(step);
  }

  onDone(result) {
    // post results to server through action
    console.log(result);
  }

  changeNumSpots(value) {
    console.log(value);
  }

  changeSpotType(value) {
    console.log(value);
  }
}
