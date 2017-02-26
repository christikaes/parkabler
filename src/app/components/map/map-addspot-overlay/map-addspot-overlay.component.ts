import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AddSpotSteps, StepStates } from '~/util';

@Component({
  selector: 'pa-map-addspot-overlay',
  templateUrl: './map-addspot-overlay.component.html',
  styleUrls: ['./map-addspot-overlay.component.scss']
})

export class AddSpotOverlayComponent {

  @Input() public open: boolean;

}
