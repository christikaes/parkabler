import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'pa-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit, AfterViewInit {
  public transparentBox = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  }
  public message = 'Welcome to Parkabler'
  private steps = [
    {
      dataTutorial: 'help',
      message: 'This is some help'
    },
    {
      dataTutorial: 'rules',
      message: 'This is some rules'
    },
    {
      dataTutorial: 'map-controls',
      message: 'This is some stuff'
    },
    {
      dataTutorial: 'add-spot',
      message: 'Add spot controls'
    },
    {
      dataTutorial: 'places',
      message: 'Places'
    }
  ]
  private step = 0;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  public onNext() {
    const helpEl = <HTMLElement>document.querySelector('[data-tutorial=' + this.steps[this.step].dataTutorial + ']')
    this.transparentBox = {
      top: helpEl.offsetTop,
      left: helpEl.offsetLeft,
      width: helpEl.offsetWidth,
      height: helpEl.offsetHeight
    }
    this.message = this.steps[this.step].message;
    this.step++;
    if (this.steps.length === this.step){
      this.step = 0;
    }
  }

}
