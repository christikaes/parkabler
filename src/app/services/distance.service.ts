import { Injectable } from '@angular/core';
import { DestinationLocationService } from './destinationlocation.service';
import { Position } from './geolocation.service';

@Injectable()
export class DistanceService {
  constructor (
    private destinationLocationService: DestinationLocationService,
  ) { }


  getDistanceToDestinationFrom(originPositions: Position[]): Promise<any> {
    return this.getDistance(originPositions, this.destinationLocationService.current.getValue());
  }

  getDistance(originPositions: Position[], destinationPosition: Position): Promise<any> {
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
