import { Component, OnInit, NgZone } from '@angular/core';
import { DistanceService, SpotApiService, DestinationLocationService, EditSpotStateService, States } from '../services';
import { Position } from '../services/geolocation.service';

let distanceBetweenPoints = function(p1: Position, p2: Position) {
  if (!p1 || !p2) {
    return 0;
  }

  let R = 6371; // Radius of the Earth in km
  let dLat = (p2.lat - p1.lat) * Math.PI / 180;
  let dLon = (p2.lng - p1.lng) * Math.PI / 180;
  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d;
};


@Component({
  selector: 'spots-list',
  templateUrl: './spotslist.component.html',
  styleUrls: ['./spotslist.component.scss']
})
export class SpotsListComponent implements OnInit {
  private enabled: boolean;
  private expanded: boolean;
  private numSpot: number;
  private spots: any[];
  private filteredSpots: any[];

  private updateFilteredSpots = function(destination) {
    if (this.spots) {
      this.filteredSpots = this.spots.filter(function(spot){
        return distanceBetweenPoints(spot, destination) < 0.2;
        // Alternative:
        // return Math.abs(destination.lat - spot.lat) < 0.001
        //     && Math.abs(destination.lng - spot.lng) < 0.001
      });
    }
    this.numSpot = this.filteredSpots.length;
    this.enabled = this.numSpot > 0;
  };

  constructor(
    private distanceService: DistanceService,
    private spotApiService: SpotApiService,
    private destinationLocationService: DestinationLocationService,
    private editSpotStateService: EditSpotStateService,
    private zone: NgZone
  ) {
    this.expanded = false;
    this.enabled = false;
    this.numSpot = 100;
    this.filteredSpots = [];
    spotApiService.spots.subscribe(res => {
      this.zone.run(() => {
        this.spots = res.map(function(r){
          return {
            lat: r.lat,
            lng: r.lng
          };
        });
        this.updateFilteredSpots(this.destinationLocationService.current.getValue());
      });
    });
    destinationLocationService.current.subscribe(res => {
      // Something in destinationLocationService is running outside of AngularZone, firebase?
      this.zone.run(() => {
        this.updateFilteredSpots(res);
      });
    });
  }

  ngOnInit() {}

  toggleExapand() {
    this.expanded = !this.expanded;
    let spotsPositions = this.filteredSpots.map(function(spot){
      return {
        lat: spot.lat,
        lng: spot.lng
      };
    });
    if (spotsPositions.length > 0) {
      let me = this;
      this.distanceService.getDistanceToDestinationFrom(spotsPositions).then(function(distance){
        for (let i = 0; i < distance.length; i++) {
            me.filteredSpots[i].distanceToDest = distance[i];
        }
      }).catch(function(err){
        console.log(err);
      });
    }
  }

  onReport(spot) {
    this.editSpotStateService.set(States.AddDetails);
  }
}
