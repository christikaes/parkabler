import { Component, OnInit } from '@angular/core';
// import { MdUniqueSelectionDispatcher } from '@angular2-material/core';
import { MapLocationService } from '../services';

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
  providers: [], // what's this?
})
export class EditSpotComponent implements OnInit {
  private states = States;
  private state: States;
  public enteringSpot: boolean;

  constructor(private mapLocationService: MapLocationService) {
  }

  ngOnInit() {
    this.state = this.states.Closed;
  }

  addLocation() {
    this.state = this.states.AddLocation;
    this.mapLocationService.setZoom(20);
    this.mapLocationService.setMode('satellite');
    this.mapLocationService.centerOnMe();
  }

  addDetails() {
    this.state = this.states.AddDetails;
  }

  submit() {
    this.state = this.states.Submitted;
    this.mapLocationService.setZoom(15);
    this.mapLocationService.setMode('roadmap');
    setTimeout(() => {
      this.state = this.states.Closed;
    }, 3000);
  }

  close() {
    this.state = this.states.Closed;
    this.mapLocationService.setZoom(15);
    this.mapLocationService.setMode('roadmap');
  }
}
