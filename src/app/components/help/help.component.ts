import { Component } from '@angular/core';
import Animations from '~/animations';
import { defaultInfo, steps } from './help-data';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '~/store';
import { AppModes } from '~/util';

@Component({
  selector: 'pa-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  animations: Animations
})
export class HelpComponent {
  public open = true;
  public transparentBox = this.getDefaultTransparentBox();
  public info = defaultInfo;
  private step = -1;

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {
    this.open = this.ngRedux.getState().firstView;
  }

  private getDefaultTransparentBox() {
    return {
      top: 0,
      left: window.innerWidth / 2,
      width: 0,
      height: 0,
    };
  }

  private update() {
    if (!steps[this.step]) {
      this.info = defaultInfo;
      return;
    }
    const helpEl = <HTMLElement>document.querySelector('[data-help=' + steps[this.step].dataSelector + ']');
    if (helpEl) {
      const elBoundingRect = helpEl.getBoundingClientRect();
      const padding = 5;
      this.transparentBox = {
        top: Math.max(elBoundingRect.top - padding, 0),
        left: Math.max(elBoundingRect.left - padding, 0),
        width: elBoundingRect.width + padding * 2,
        height: elBoundingRect.height + padding * 2
      };
    } else {
      this.transparentBox = this.getDefaultTransparentBox();
    }
    this.info = steps[this.step];
  }

  public onNext() {
    this.step++;
    if (this.step === steps.length) {
      this.onClose();
      this.step = 0;
    }
    this.update();
  }

  public onClose() {
    this.open = false;
  }

  public onOpen() {
    // Switch to the right step depending on the appMode
    const appMode = this.ngRedux.getState().appMode;
    switch (appMode) {
      case AppModes.Home:
        this.step = -1;
        break;
      case AppModes.Add:
        this.step = 2;
        break;
      case AppModes.Edit:
        this.step = 3;
        break;
      case AppModes.Search:
        this.step = 0;
        break;
      case AppModes.Navigate:
        this.step = 1;
        break;
      default:
        this.step = -1;
        break;
    }

    this.update();
    this.open = true;
  }

}
