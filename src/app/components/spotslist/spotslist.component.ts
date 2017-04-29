import { Input, Component, OnInit } from '@angular/core';
import { NearbySpots } from '~/util';

@Component({
  selector: 'pa-spots-list',
  templateUrl: './spotslist.component.html',
  styleUrls: ['./spotslist.component.scss']
})
export class SpotsListComponent implements OnInit {
  @Input() private spots: GeoJSON.FeatureCollection<GeoJSON.Point>;

  public expanded: boolean;
  public hidden: boolean;

  constructor() {
    this.expanded = false;
    this.hidden = false;
  }

  get numSpot (): number {
    return this.spots.features ? this.spots.features.length : 0;
  }

  get enabled(): boolean {
    return this.numSpot > 0;
  }

  ngOnInit() {}

  toggleExapand() {
    this.expanded = !this.expanded;
  }

  onReport() {
    this.expanded = false;
    // set report state
  }

  onClickSpot() {
    // set map center and zoom
  }
}
