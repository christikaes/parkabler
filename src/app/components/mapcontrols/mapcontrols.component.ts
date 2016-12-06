import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EditSpotStateService, MapModes, States } from '../../services';

@Component({
  selector: 'map-controls',
  templateUrl: './mapcontrols.component.html',
  styleUrls: ['./mapcontrols.component.scss']
})
export class MapControlsComponent implements OnInit {
  @Output() zoomChange = new EventEmitter();
  @Output() viewChange = new EventEmitter();

  private showAddSpot: boolean;

  constructor(private editSpotState: EditSpotStateService) {
  }

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

  changeView(v: MapModes): void {
    this.viewChange.emit(v);
  }

  changeZoom(z: number): void {
    this.zoomChange.emit(z);
  }

  addLocation(): void {
    this.editSpotState.set(States.AddLocation);
    this.showAddSpot = false;
  }
}
