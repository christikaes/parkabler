import { Component } from '@angular/core';
import { TutorialActions } from '~/actions';
import Animations from '~/animations';

@Component({
  selector: 'pa-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  animations: Animations
})
export class HelpComponent {
  public transparentBox = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  }
  public info = {
    title: 'Parkabler',
    message: 'Welcome to Parkabler! You can use this app to find and navigate to accessible parking spots.',
    img: '/assets/img/tutorial/tutorial.gif'
  }
  private steps = [
    {
      dataTutorial: 'places',
      title: 'Search',
      message: 'Get started by searching for your destination. You can also hit the near me to find parking near your location.',
      img: '/assets/img/tutorial/tutorial.gif'
    },
    {
      dataTutorial: 'navigate',
      title: 'Navigate',
      message: 'Spots near your destination will be listed here. You can navigate to the spot with your favorite map app.',
      img: '/assets/img/tutorial/tutorial.gif'
    },
    {
      dataTutorial: 'map-controls',
      title: 'Map Controls',
      message: 'Center the map on your location or zoom in and out using these controls.',
      img: '/assets/img/tutorial/tutorial.gif'
    },
    {
      dataTutorial: 'add-spot',
      title: 'Add/Edit Spots',
      message: 'Parkabler is powered by contributions from the community. You can also add new spots that we don\'t know about yet and edit spaces with incorrect information.',
      img: '/assets/img/tutorial/tutorial.gif'
    },
    {
      dataTutorial: 'rules',
      title: 'Info',
      message: 'Find information about parking rules in your city here. You can also find information about this app.',
      img: '/assets/img/tutorial/tutorial.gif'
    },
    {
      dataTutorial: 'help',
      title: 'Help',
      message: 'You can always open this help from here',
      img: '/assets/img/tutorial/tutorial.gif'
    }
  ]
  private step = 0;

  constructor(private tutorialActions: TutorialActions) {
  }

  public onNext() {
    const helpEl = <HTMLElement>document.querySelector('[data-tutorial=' + this.steps[this.step].dataTutorial + ']')
    const elBoundingRect = helpEl.getBoundingClientRect()
    const padding = 5;
    this.transparentBox = {
      top: Math.max(elBoundingRect.top - padding, 0),
      left: Math.max(elBoundingRect.left - padding, 0),
      width: elBoundingRect.width + padding * 2,
      height: elBoundingRect.height + padding * 2
    }
    this.info = this.steps[this.step];
    this.step++;
    if (this.steps.length === this.step) {
      this.tutorialActions.close();
      this.step = 0;
    }
  }

  public onSkip() {
    this.tutorialActions.close();
  }

}
