import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EditSpotStateService, States } from '~/services';
import { MapModes } from '~/util';
import { AppModeActions } from '~/actions';

@Component({
  selector: 'pa-map-controls',
  templateUrl: './mapcontrols.component.html',
  styleUrls: ['./mapcontrols.component.scss']
})
export class MapControlsComponent implements OnInit {
  @Output() zoomChange = new EventEmitter();
  @Output() modeChange = new EventEmitter();
  @Output() recenterChange = new EventEmitter();

  private showAddSpot: boolean;

  constructor(
    private editSpotState: EditSpotStateService,
    private appModeActions: AppModeActions
  ) {}

  ngOnInit() {
    this.showAddSpot = true;
    this.editSpotState.state.subscribe((res) => {
      if (res === 0) {
        this.showAddSpot = true;
      } else {
        this.showAddSpot = false;
      }
    });
  }

  changeMode(v: MapModes): void {
    this.modeChange.emit(v);
  }

  changeZoom(z: number): void {
    this.zoomChange.emit(z);
  }

  addLocation(): void {
    this.appModeActions.setModeToAddSpot();
    // this.editSpotState.set(States.AddLocation);
    // this.showAddSpot = false;
  }

  recenter() {
    this.recenterChange.emit();
  }
}
