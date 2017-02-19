import { Component, OnInit } from '@angular/core';
import { DestinationActions, SpotsActions } from '~/actions';
import { Position } from '~/util';

@Component({
  selector: 'pa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private destinationActions: DestinationActions,
    private spotsActions: SpotsActions
  ) {}

  ngOnInit() {
    this.spotsActions.getSpots();
  }

  onDestinationUpdate(newDestination: Position) {
    this.destinationActions.setDestination(newDestination);
  }
}
