import { Component, OnInit } from '@angular/core';
import { DestinationActions } from '~/actions';
import { Position } from '~/store';

@Component({
  selector: 'pa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private destinationActions: DestinationActions
  ) {}

  ngOnInit() {}

  onDestinationUpdate(newDestination: Position) {
    this.destinationActions.setDestination(newDestination);
  }
}
