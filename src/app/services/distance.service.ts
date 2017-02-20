import { Injectable } from '@angular/core';
import { Position, distanceBetween, Spots } from '~/util';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '~/store';

@Injectable()
export class DistanceService {
  constructor (
    private ngRedux: NgRedux<IAppState>
  ) { }

  // Returns a function that will filter spots by the given distance
  public filterByEuclideanDistance (threshold: number) {
    return (center: Position, spots: any[]) => {
      return spots.filter(spot => {
        return distanceBetween(spot.position, center) < threshold;
      });
    };
  }

  getDistanceToDestinationFrom(originSpots: Spots): Promise<any> {
    console.log('TEST');
    let { destination } = this.ngRedux.getState();
    console.log(destination);
    return this.getDistance(originSpots, destination);
  }

  getDistance(originSpots: Spots, destinationPosition: Position): Promise<any> {
    let originPositions = originSpots.map(spot => {
      return Object.assign({}, spot.position);
    });
    return new Promise((resolve, reject) => {
      let service = new window.google.maps.DistanceMatrixService;
      service.getDistanceMatrix({
        origins: originPositions,
        destinations: [destinationPosition],
        travelMode: 'WALKING',
        unitSystem: window.google.maps.UnitSystem.METRIC
      }, function(response, status) {
        if (status !== 'OK') {
          alert('Error was: ' + status);
          reject(status);
        } else {
          // The DistanceMatrixResponse object contains one row for each origin that was passed in the request.
          // Each row contains an element field for each pairing of that origin with the provided destination(s).
          let distances = response.rows.map(function(row){
            // For each row, get all of the pairings, and get the one with the shortest distance
            let rowData = row.elements;
            let rowDistances = rowData.map(function(data){
              if (data.status !== 'OK') {
                // If there was an error, set to inf
                return Infinity;
              }
              return data.distance.value;
            });
            return Math.min(...rowDistances);
          });
          resolve(distances);
        }
      });
    });
  }
}
