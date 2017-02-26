import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AddSpotModes, StepStates } from '~/util';
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
  @Output() private next = new EventEmitter();
  @Output() private previous = new EventEmitter();

  onClose() {
    this.close.emit();
  }

  onOpen() {
    this.open.emit();
  }

  onNext() {
    this.next.emit();
  }

  onPrevious() {
    this.previous.emit();
  }


  ngOnChanges(changes: SimpleChanges) {
    for (let change in changes) {
      if (change === 'mode') {

        // 1
        let previousMode = changes[change].previousValue;

        // 2
        let currentMode = changes[change].currentValue;



        this[previousMode] = 'previous';
        this[currentMode] = 'current';
      }
    }
  }

  onStepChange() {
    // Update global state
  }

  onDone(result) {
    // post results to server through action
    console.log(result);
  }
}
