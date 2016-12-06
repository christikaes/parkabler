import { Component, OnInit, NgZone, Input }
  from '@angular/core';
import { DistanceService, DestinationLocationService,
  EditSpotStateService, MapLocationService, States
} from '../../services';
import { Position } from '../../services/geolocation.service';
import { ISpots, ISpot } from '../../store/reducers';

@Component({
  selector: 'spots-list',
  templateUrl: './spotslist.component.html',
  styleUrls: ['./spotslist.component.scss']
})
export class SpotsListComponent implements OnInit {
  private hidden: boolean;
  private expanded: boolean;
  @Input() spots: ISpots = [];

  constructor(
    private distanceService: DistanceService,
    private destinationLocationService: DestinationLocationService,
    private editSpotStateService: EditSpotStateService,
    private mapLocationService: MapLocationService
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
