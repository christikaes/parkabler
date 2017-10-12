import { Input, Component, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { select } from '@angular-redux/store';
import { AppModes } from '~/util';
import { Observable } from 'rxjs';
import { AppModeActions, SpotsActions } from '~/actions';
import { Spots, Spot } from '~/store';

import Animations from '~/animations';

@Component({
  selector: 'pa-spots-list',
  templateUrl: './spotslist.component.html',
  styleUrls: ['./spotslist.component.scss'],
  animations: Animations
})
export class SpotsListComponent implements OnInit, OnChanges {
  @Input() public nearby: Spots;
  @Input() public active: Spot;

  @ViewChild('spotsList') spotsList;

  @select() private appMode$: Observable<AppModes>;

  public state = 'closed';
  public numSpot = 0;
  public spots = [];

  private appMode;

  constructor(
    private appModeActions: AppModeActions,
    private spotsActions: SpotsActions
  ) {
    this.state = 'closed';
  }

  ngOnInit() {
    this.appMode$.subscribe((mode: AppModes) => {
      this.appMode = mode;
      if (mode !== AppModes.Navigate && !this.active) {
        this.state = 'closed';
      } else {
        if (this.spots.length > 0) {
          this.state = 'open';
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const change in changes) {
      if (change === 'nearby') {
        this.updateSpots();
      } else if (change === 'active') {
        this.updateSpots();
        // Open the drawer if there was a change in the active value
        const newActive = changes[change].currentValue;
        const prevActive = changes[change].previousValue;
        if ((newActive && prevActive && newActive.id !== prevActive.id)
          || (newActive && !prevActive)) {
          this.state = 'open';
        }
      } else {
        throw new Error('Uncaught change: ' + change);
      }
    }
  }

  private updateSpots() {
    // Update the spots
    this.spots = [...this.nearby];
    if (this.active && !this.nearby.map(s => s.id).includes(this.active.id)) {
      this.spots.push(this.active);
    }

    // Open the drawer as appropriate
    if (this.spots.length > 0) {
      if (this.state === 'closed') {
        this.state = 'open';
      }
      this.appModeActions.setModeSpotsList();
    } else {
      this.state = 'closed';
      if (this.appMode !== AppModes.Add && this.appMode !== AppModes.Edit) {
        this.appModeActions.setModeHome();
      }
    }

    // Scroll to the active element
    this.spotsList.scrollTop = 20;
  }

  toggleExapand() {
    this.state = this.state === 'peak' ? 'open' : 'peak';
  }

  onClickSpot(spot: Spot) {
    this.spotsActions.setActiveSpot(spot);
  }

  onPanDown(e) {
    this.state = 'peak';
  }

  onPanUp(e) {
    this.state = 'open';
  }
}
