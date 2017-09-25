import { Input, Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
  @Input() public spots: Spots;
  @Input() public active: Spot;

  @select() private appMode$: Observable<AppModes>;

  public state = 'closed';
  public numSpot = 0;

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
      if (mode !== AppModes.Navigate) {
        this.state = 'closed';
      } else {
        if (this.numSpot > 0) {
          this.state = 'open';
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const change in changes) {
      if (change === 'spots') {
        const spots = changes[change].currentValue;
        this.numSpot = spots.length;
        if (this.numSpot > 0) {
          this.state = 'open';
          this.appModeActions.setModeSpotsList();
        } else {
          this.state = 'closed';
          if (this.appMode !== AppModes.Add) {
            this.appModeActions.setModeHome();
          }
        }
      } else if (change === 'active') {
        // TODO
      } else {
        throw new Error('Uncaught change: ' + change);
      }
    }
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
