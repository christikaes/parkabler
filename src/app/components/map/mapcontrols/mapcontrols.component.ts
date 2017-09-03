import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pa-map-controls',
  templateUrl: './mapcontrols.component.html',
  styleUrls: ['./mapcontrols.component.scss']
})
export class MapControlsComponent {
  @Output() zoomChange = new EventEmitter();
  @Output() modeChange = new EventEmitter();
  @Output() recenterChange = new EventEmitter();
  @Input() recenterAvailable;

  constructor() { }

  changeZoom(z: number): void {
    this.zoomChange.emit(z);
  }

  recenter() {
    this.recenterChange.emit();
  }
}
