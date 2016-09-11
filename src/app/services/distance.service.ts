import { Injectable } from '@angular/core';
import { DestinationLocationService } from './destinationlocation.service';
import { Position } from './geolocation.service';
import { Http, Response, Headers, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DistanceService {
  constructor (
    private http: Http,
    private destinationLocationService: DestinationLocationService,
    private jsonp: Jsonp
  ) { }


  getDistanceToDestinationFrom(originPositions: Position[]): Promise<any> {
    return this.getDistance(originPositions, this.destinationLocationService.getLastDestination());
  }

  getDistance(originPositions: Position[], destinationPosition: Position): Promise<any> {
    return new Promise((resolve, reject) => {
      var service = new window.google.maps.DistanceMatrixService;
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
              if(data.status !== "OK"){
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
  private extractData(res: Response) {
    console.log("extractData")
    let body = res.json();
    console.log(body.data)
    return body.data || { };
  }
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
