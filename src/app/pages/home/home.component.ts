import { Component, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { ISpots, INearbySpots, Position } from '../../store/reducers';
import { SpotsActions, NearbySpotsActions } from '../../actions';
import { SpotsService } from '../../services/spots.service';

@Component({
  selector: 'pa-my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @select() private spots$: Observable<ISpots>;
  @select() private nearbySpots$: Observable<INearbySpots>;
  @select() private destination$: Observable<Position>;

  constructor(
    private spotsActions: SpotsActions,
    private spotsService: SpotsService,
    private nearbySpotsActions: NearbySpotsActions
  ) {}

  ngOnInit() {
    this.spotsActions.requestSpots();

    // This combines both destination$ & spots$ observables
    // We then use the latest values from both to get nearby spots
    this.destination$.combineLatest(
      this.spots$,
      (destination, spots) => ({ destination, spots })
    )
    .subscribe(({ destination, spots }) => {
      this.nearbySpotsActions.getNearbySpots(destination, spots);
    });
  }

}
