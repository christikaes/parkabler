import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MapLocationService, MapModes } from '../services';

@Component({
  selector: 'map-controls',
  templateUrl: './mapcontrols.component.html',
  styleUrls: ['./mapcontrols.component.scss']
})
export class MapControlsComponent implements OnInit {
  @Output() zoomChange = new EventEmitter();
  @Output() viewChange = new EventEmitter();

  constructor(private mapLocationService: MapLocationService) {
  }

  ngOnInit() {
  }

  changeView(v: MapModes): void {
    this.viewChange.emit(v);
  }

  changeZoom(z: number): void {
    this.zoomChange.emit(z);
  }
}
