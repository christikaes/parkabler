import { Component, OnInit } from '@angular/core';
import { DistanceService, SpotApiService, DestinationLocationService } from '../services';
import { Observable } from 'rxjs/Observable';
import { Position } from '../services/geolocation.service';

let distanceBetweenPoints = function(p1: Position, p2: Position) {
  if (!p1 || !p2) {
    return 0;
  }

  var R = 6371; // Radius of the Earth in km
  var dLat = (p2.lat - p1.lat) * Math.PI / 180;
  var dLon = (p2.lng - p1.lng) * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};


@Component({
  selector: 'spots-list',
  templateUrl: './spotslist.component.html',
  styleUrls: ['./spotslist.component.scss']
})
export class SpotsListComponent implements OnInit {
  private expanded: boolean;
  private numSpot: number;
  private spots: any[];
  private filteredSpots: any[];
  private distance: number;
  private enabled: boolean;

  private updateFilteredSpots = function() {
    let destination = this.destinationLocationService.getLastDestination();
    if (this.spots) {
      this.filteredSpots = this.spots.filter(function(spot){
        return distanceBetweenPoints(spot, destination) < 0.2;
      });
    }
    this.numSpot = this.filteredSpots.length;
    this.enabled = this.numSpot > 0;
  };

  constructor(
    private distanceService: DistanceService,
    private spotApiService: SpotApiService,
    private destinationLocationService: DestinationLocationService
  ) {
    this.expanded = false;
    this.enabled = false;
    this.numSpot = 100;
    this.filteredSpots = [];
    spotApiService.spots.subscribe(res => {
      this.spots = res.map(function(r){
        return {
          lat: r.lat,
          lng: r.lng
        }
      });
      this.updateFilteredSpots();
    });
    destinationLocationService.current.subscribe(res => {
      this.updateFilteredSpots();
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
    if(spotsPositions.length > 0){
      let me = this;
      this.distanceService.getDistanceToDestinationFrom(spotsPositions).then(function(distance){
        for (let i = 0; i < distance.length; i++) {
            me.filteredSpots[i].distanceToDest = distance[i];
        }
      }).catch(function(err){
        console.log(err)
      })
    }
  }
}
