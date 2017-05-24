import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ReportSpotSteps, StepStates } from '~/util';

@Component({
  selector: 'pa-report-spot',
  templateUrl: './reportspot.component.html',
  styleUrls: ['./reportspot.component.scss']
})

export class ReportSpotComponent implements OnChanges {

  @Input() public opened: boolean;

  @Output() private close = new EventEmitter();

  onClose() {
    this.close.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const change in changes) {
      if (change === 'mode') {
        // 1
        const previousMode = changes[change].previousValue;

        // 2
        const currentMode = changes[change].currentValue;

        this[previousMode] = 'previous';
        this[currentMode] = 'current';
      }
    }
  }

  onStepChange() {
    console.log('StepChanged');
  }

  changeNumSpots(value) {
    console.log('CHANGE NUM SPOTS');
  }

  changeSpotType(value) {
    console.log('CHANGE SPOT TYPE');
  }
}
