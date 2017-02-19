import { Input, Component, OnInit, NgZone } from '@angular/core';
import { EditSpotStateService, MapLocationService, States } from '~/services';
import { Position, NearbySpots, distanceBetween } from '~/util';
import { Observable } from 'rxjs';

@Component({
  selector: 'pa-spots-list',
  templateUrl: './spotslist.component.html',
  styleUrls: ['./spotslist.component.scss']
})
export class SpotsListComponent implements OnInit {
  @Input() private spots: NearbySpots;

  public expanded: boolean;
  public hidden: boolean;

  constructor(
    private editSpotStateService: EditSpotStateService,
    private mapLocationService: MapLocationService,
    private zone: NgZone
  ) {
    this.expanded = false;
    this.hidden = false;
  }

  get numSpot (): number {
    return this.spots ? this.spots.length : 0;
  }

  get enabled(): boolean {
    return this.numSpot > 0;
  }

  ngOnInit() {
    this.editSpotStateService.state.subscribe((res) => {
      if (res === 0) {
        this.hidden = false;
      } else {
        this.hidden = true;
      }
    });
  }

  toggleExapand() {
    this.expanded = !this.expanded;
  }

  onReport(position) {
    this.expanded = false;
    // this.mapLocationService.set(position);
    this.editSpotStateService.set(States.ReportDetails);
  }

  onClickSpot(position) {
    this.mapLocationService.setZoom(20);
    this.mapLocationService.set(position);
  }
}
