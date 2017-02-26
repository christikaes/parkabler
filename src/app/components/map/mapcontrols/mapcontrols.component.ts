import { Component, Output, EventEmitter } from '@angular/core';
import { MapModes } from '~/util';

@Component({
  selector: 'pa-map-controls',
  templateUrl: './mapcontrols.component.html',
  styleUrls: ['./mapcontrols.component.scss']
})
export class MapControlsComponent {
  @Output() zoomChange = new EventEmitter();
  @Output() modeChange = new EventEmitter();
  @Output() recenterChange = new EventEmitter();

  constructor() {}

  changeMode(v: MapModes): void {
    this.modeChange.emit(v);
  }

  changeZoom(z: number): void {
    this.zoomChange.emit(z);
  }

  recenter() {
    this.recenterChange.emit();
  }
}
