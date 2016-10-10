import { Component, OnInit } from '@angular/core';
// import { MdUniqueSelectionDispatcher } from '@angular2-material/core';
import { MapLocationService, EditSpotStateService } from '../services';

export enum States {
  Closed,
  AddLocation,
  AddDetails,
  ReportDetails,
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

  constructor(
    private mapLocationService: MapLocationService,
    private editSpotStateService: EditSpotStateService
  ) {}

  ngOnInit() {
    this.state = this.states.Closed;

    this.editSpotStateService.state.subscribe(res => {
      switch (res) {
        case 1:
          this.addLocation();
          break;
        case 2:
          this.addDetails();
          break;
        case 3:
          this.reportDetails();
          break;
        default:
          this.submit();
          break;
      }
    });
  }

  addLocation() {
    this.state = this.states.AddLocation;
    this.mapLocationService.centerOnMe();
    this.mapLocationService.setZoom(20);
    // this.mapLocationService.setMode('satellite');
  }

  // TODO: Report in its own thing
  reportDetails() {
    this.state = this.states.ReportDetails;
    this.mapLocationService.setZoom(20);
    // this.mapLocationService.setMode('satellite');
  }

  addDetails() {
    this.state = this.states.AddDetails;
    this.mapLocationService.setZoom(20);
    // this.mapLocationService.setMode('satellite');
  }

  submit() {
    this.state = this.states.Submitted;
    this.mapLocationService.setZoom(15);
    // this.mapLocationService.setMode('roadmap');
    setTimeout(() => {
      this.state = this.states.Closed;
    }, 3000);
  }

  close() {
    this.state = this.states.Closed;
    this.mapLocationService.setZoom(15);
    // this.mapLocationService.setMode('roadmap');
  }
}
