import { Component, OnInit } from '@angular/core';
// import { MdUniqueSelectionDispatcher } from '@angular2-material/core';
import { MapLocationService, EditSpotStateService } from '~/services';

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
        case 0:
          this.onClose();
          break;
        case 1:
          this.onAddLocation();
          break;
        case 2:
          this.onAddDetails();
          break;
        case 3:
          this.onReportDetails();
          break;
        default:
          this.onSubmit();
          break;
      }
    });
  }

  onAddLocation() {
    this.state = this.states.AddLocation;
    this.mapLocationService.centerOnMe();
    this.mapLocationService.setZoom(20);
    // this.mapLocationService.setMode('satellite');
  }

  // TODO: Report in its own thing
  onReportDetails() {
    this.state = this.states.ReportDetails;
    this.mapLocationService.setZoom(20);
    // this.mapLocationService.setMode('satellite');
  }

  onAddDetails() {
    this.state = this.states.AddDetails;
    this.mapLocationService.setZoom(20);
    // this.mapLocationService.setMode('satellite');
  }

  onSubmit() {
    this.state = this.states.Submitted;
    this.mapLocationService.setZoom(15);
    // this.mapLocationService.setMode('roadmap');
    setTimeout(() => {
      this.editSpotStateService.set(this.states.Closed);
    }, 3000);
  }

  onClose() {
    this.state = this.states.Closed;
    this.mapLocationService.setZoom(15);
    // this.mapLocationService.setMode('roadmap');
  }

  addLocation() {
    this.editSpotStateService.set(this.states.AddLocation);
  }

  // TODO: Report in its own thing
  reportDetails() {
    this.editSpotStateService.set(this.states.ReportDetails);
  }

  addDetails() {
    this.editSpotStateService.set(this.states.AddDetails);
  }

  submit() {
    this.editSpotStateService.set(this.states.Submitted);
  }

  close() {
    this.editSpotStateService.set(this.states.Closed);
  }
}
