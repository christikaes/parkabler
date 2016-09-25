import { Component, OnInit } from '@angular/core';
import { MdUniqueSelectionDispatcher } from '@angular2-material/core';

export enum States {
  Closed,
  AddLocation,
  AddDetails,
  Submitted
};

@Component({
  selector: 'edit-spot',
  templateUrl: './editspot.component.html',
  styleUrls: ['./editspot.component.scss'],
  providers: [MdUniqueSelectionDispatcher], // what's this?
})
export class EditSpotComponent implements OnInit {
  private states = States;
  private state: States;
  public enteringSpot: boolean;

  constructor() {
  }

  ngOnInit() {
    this.state = this.states.Closed;
  }

  addLocation() {
    this.state = this.states.AddLocation;
  }

  addDetails() {
    this.state = this.states.AddDetails;
  }

  submit() {
    this.state = this.states.Submitted;
    setTimeout(() => {
      this.state = this.states.Closed;
    }, 2000);
  }

  close() {
    this.state = this.states.Closed;
  }
}
