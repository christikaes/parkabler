import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MapboxAccessTolken } from '~/util';
import { Observable } from 'rxjs';

@Injectable()
export class DistanceService {
  constructor (
    private http: Http
  ) { }

  public getWalkingDistances(originPoints: GeoJSON.FeatureCollection<GeoJSON.Point>, destinationPoint: GeoJSON.Feature<GeoJSON.Point>) {

    // For each one of the originPoints, get the walking distance between the origin and destinationPoint
    let getWalkingDistanceObservables = originPoints.features.map((originPoint) => {
        return this.getWalkingDistanceBetween2Points(originPoint, destinationPoint);
      });

    // Return an observable for when all of the distances have been gotten
    return Observable.forkJoin(getWalkingDistanceObservables);
  }

  private getWalkingDistanceBetween2Points(originPoint: GeoJSON.Feature<GeoJSON.Point>, destinationPoint: GeoJSON.Feature<GeoJSON.Point>){
      // Url to get
      let url = `https://api.mapbox.com/directions/v5/mapbox/walking/`
                + `${originPoint.geometry.coordinates[0]},${originPoint.geometry.coordinates[1]};`
                + `${destinationPoint.geometry.coordinates[0]},${destinationPoint.geometry.coordinates[1]}`
                + `?access_token=${MapboxAccessTolken}`;

      // Return an observable for when the request resolves
      return this.http.get(url)
        .map( (response: Response) => {
          let body = response.json();
          if (body.code !== 'Ok') {
          throw 'Mapbox Distance response not Ok';
          }
          if (!body.routes || !body.routes[0] || !body.routes[0].distance){
            throw 'Mapbox Distance response no distance';
          }
          return body.routes[0].distance;
        })
        .catch( (error: Response | any) => {
          // Catch any errors thrown by the service
          let errMsg: string;
          if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
          } else {
            errMsg = error.message ? error.message : error.toString();
          }
          console.error(errMsg);
          return Observable.throw(errMsg);
        });
  }
}
