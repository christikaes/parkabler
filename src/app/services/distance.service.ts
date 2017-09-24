import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MapboxAccessTolken } from '~/util';
import { Observable } from 'rxjs/Observable';
import { Spots, Spot } from '~/store';

const turfHelper = require('@turf/helpers');
const turfCircle = require('@turf/circle');
const turfWithin = require('@turf/within');

@Injectable()
export class DistanceService {
  constructor(
    private http: Http
  ) { }

  public filterSpotsNearDestination(spots: Spots, destination: GeoJSON.Position, distance: number): Spots {
    if (!(destination && spots && distance)) {
      return [];
    }
    // Create a circle of 200m and get the spots within it
    const nearbyBounds = turfHelper.featureCollection([turfCircle(turfHelper.point(destination), 0.2)]);
    const searchSpots = turfHelper.featureCollection(spots);
    return turfWithin(searchSpots, nearbyBounds).features;
  }

  public getWalkingDistances(originPoints: Spots, destinationPoint: GeoJSON.Position) {
    // For each one of the originPoints, get the walking distance between the origin and destinationPoint
    const getWalkingDistanceObservables = originPoints.map((originPoint) => {
      return this.getWalkingDistanceBetween2Positions(originPoint.geometry.coordinates, destinationPoint);
    });

    // Return an observable for when all of the distances have been gotten
    return Observable.forkJoin(getWalkingDistanceObservables);
  }

  private getWalkingDistanceBetween2Positions(origin: GeoJSON.Position, destination: GeoJSON.Position) {
    // Url to get
    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/`
      + `${origin[0]},${origin[1]};`
      + `${destination[0]},${destination[1]}`
      + `?access_token=${MapboxAccessTolken}`;

    // Return an observable for when the request resolves
    return this.http.get(url)
      .map((response: Response) => {
        const body = response.json();
        if (body.code !== 'Ok') {
          throw new Error('Mapbox Distance response not Ok');
        }
        if (!body.routes || !body.routes[0] || !body.routes[0].distance) {
          throw new Error('Mapbox Distance response no distance');
        }
        return body.routes[0].distance;
      })
      .catch((error: Response | any) => {
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
