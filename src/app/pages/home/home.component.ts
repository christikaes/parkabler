import { Component, OnInit } from '@angular/core';
import { DestinationActions, SpotsActions, NearbySpotsActions } from '~/actions';
import { Position, Spots, NearbySpots } from '~/util';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';

@Component({
  selector: 'pa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @select() private destination$: Observable<Position>;
  @select() private spots$: Observable<Spots>;
  @select() public nearbySpots$: Observable<NearbySpots>;

  constructor(
    private destinationActions: DestinationActions,
    private spotsActions: SpotsActions,
    private nearbySpotsActions: NearbySpotsActions
  ) {}

  ngOnInit() {
    this.spotsActions.getSpots();
  }

  onDestinationUpdate(newDestination: Position) {
    this.destinationActions.setDestination(newDestination);

    // This combines both destination$ & spots$ observables
    // We then use the latest values from both to get nearby spots
    this.destination$.combineLatest(
      this.spots$,
      (destination, spots) => ({destination, spots})
    ).subscribe(({destination, spots}) => {
      this.nearbySpotsActions.getNearbySpots(destination, spots);
    });

  }
}
