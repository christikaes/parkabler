import { Component } from '@angular/core';
import Animations from '~/animations';
import { defaultInfo, steps } from './help-data'

@Component({
  selector: 'pa-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  animations: Animations
})
export class HelpComponent {
  public open = true;
  public transparentBox = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  }
  public info = defaultInfo;
  private step = 0;

  public onNext() {
    const helpEl = <HTMLElement>document.querySelector('[data-help=' + steps[this.step].dataSelector + ']')
    const elBoundingRect = helpEl.getBoundingClientRect()
    const padding = 5;
    this.transparentBox = {
      top: Math.max(elBoundingRect.top - padding, 0),
      left: Math.max(elBoundingRect.left - padding, 0),
      width: elBoundingRect.width + padding * 2,
      height: elBoundingRect.height + padding * 2
    }
    this.info = steps[this.step];
    this.step++;
    if (steps.length === this.step) {
      this.onClose();
      this.step = 0;
    }
  }

  public onClose() {
    this.open = false;
  }

  public onOpen() {
    this.open = true;
  }

}
