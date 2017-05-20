import { Input, Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import Animations from '~/animations';

@Component({
  selector: 'pa-spots-list',
  templateUrl: './spotslist.component.html',
  styleUrls: ['./spotslist.component.scss'],
  animations: Animations
})
export class SpotsListComponent implements OnInit, OnChanges {
  @Input() private spots: GeoJSON.FeatureCollection<GeoJSON.Point>;
  public state = 'closed';
  public numSpot = 0;

  constructor() {
    this.state = 'closed';
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    for (let change in changes) {
      if (change === 'spots') {
        let spots = changes[change].currentValue;
        this.numSpot = spots.features ? spots.features.length : 0;
        this.state = this.numSpot > 0 ? 'peak' : 'closed';
      } else {
        throw 'Uncaught change: ' + change;
      }
    }
  }

  toggleExapand() {
    this.state = this.state === 'peak' ? 'open' : 'peak';
  }

  onReport() {
    this.state = 'closed';
    // set report state
  }

  onClickSpot() {
    // set map center and zoom
  }
}
